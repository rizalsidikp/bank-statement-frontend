import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

// mock semua API
import * as statementService from "./services/statement";
import type { StatementsResponse } from "./entity/response";

describe("App Component", () => {
    const mockBalance = {
        totalCredit: 12000000,
        totalDebit: 250000,
        totalBalance: 11750000,
    };

    const mockIssues: Array<StatementsResponse> = [
        {
            id: "1",
            timestamp: 1624608052,
            name: "E-COMMERCE A",
            type: "DEBIT",
            amount: 150000,
            status: "FAILED",
            description: "clothes",
        },
    ];

    beforeEach(() => {
        vi.clearAllMocks();

        vi.spyOn(statementService, "getBalanceAPI").mockResolvedValue(mockBalance);
        vi.spyOn(statementService, "getIssuesAPI").mockResolvedValue(mockIssues);
        vi.spyOn(statementService, "uploadStatementAPI").mockResolvedValue({});
        vi.spyOn(globalThis, "alert").mockImplementation(() => { });
    });

    it("renders and fetches balance + statements", async () => {
        render(<App />);

        // pastikan judul muncul
        expect(screen.getByText(/Bank Statement/i)).toBeInTheDocument();

        // pastikan loading state awalnya true
        // (kita bisa ngecek lewat presence dari teks atau skeleton)
        await waitFor(() =>
            expect(statementService.getBalanceAPI).toHaveBeenCalledTimes(1)
        );
        await waitFor(() =>
            expect(statementService.getIssuesAPI).toHaveBeenCalledTimes(1)
        );

        // pastikan hasil balance tampil
        expect(await screen.findByText(/Total Credit/i)).toBeInTheDocument();
        expect(await screen.findByText(/Total Debit/i)).toBeInTheDocument();
        expect(await screen.findByText(/End Balance/i)).toBeInTheDocument();
    });

    it("shows error state if API fails", async () => {
        vi.spyOn(statementService, "getBalanceAPI").mockRejectedValue(
            new Error("Balance error")
        );
        vi.spyOn(statementService, "getIssuesAPI").mockRejectedValue(
            new Error("Issues error")
        );

        render(<App />);

        await waitFor(() =>
            expect(screen.getByText(/Balance error/i)).toBeInTheDocument()
        );
    });

    it("shows default error message if error is not an instance of Error", async () => {
        vi.spyOn(statementService, "getBalanceAPI").mockRejectedValue("some string error");
        vi.spyOn(statementService, "getIssuesAPI").mockRejectedValue("another error");

        render(<App />);

        await waitFor(() =>
            expect(screen.getByText(/Failed to fetch balance/i)).toBeInTheDocument()
        );
    });

    it("calls upload API and refreshes data after file upload", async () => {
        render(<App />);

        globalThis.alert = vi.fn();
        globalThis.confirm = vi.fn(() => true);

        const file = new File(['dummy content'], 'example.csv', { type: 'text/csv' });
        fireEvent.change(screen.getByTestId('file-input'), {
            target: { files: [file] },
        });

        await waitFor(() =>
            expect(statementService.uploadStatementAPI).toHaveBeenCalledTimes(1)
        );

        expect(statementService.getBalanceAPI).toHaveBeenCalled();
        expect(statementService.getIssuesAPI).toHaveBeenCalled();
        expect(globalThis.alert).toHaveBeenCalledWith(
            "File processed successfully."
        );
    });

    it("shows error alert when upload fails", async () => {
        vi.spyOn(statementService, "uploadStatementAPI").mockRejectedValue(
            new Error("Upload failed")
        );
        render(<App />);
        
        globalThis.alert = vi.fn();
        globalThis.confirm = vi.fn(() => true);

        const file = new File(['dummy content'], 'example.csv', { type: 'text/csv' });
        fireEvent.change(screen.getByTestId('file-input'), {
            target: { files: [file] },
        });

        await waitFor(() =>
            expect(globalThis.alert).toHaveBeenCalledWith(
                "Error processing file : Upload failed"
            )
        );
    });

    it("shows correct error message for string error on upload", async () => {
        vi.spyOn(statementService, "uploadStatementAPI").mockRejectedValue("string error");
        render(<App />);
        
        globalThis.alert = vi.fn();
        globalThis.confirm = vi.fn(() => true);

        const file = new File(['dummy content'], 'example.csv', { type: 'text/csv' });
        fireEvent.change(screen.getByTestId('file-input'), {
            target: { files: [file] },
        });

        await waitFor(() =>
            expect(globalThis.alert).toHaveBeenCalledWith(
                "Error processing file : string error"
            )
        );
    });
});
