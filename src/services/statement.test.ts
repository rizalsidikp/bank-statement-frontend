import axios from "axios";
import { vi } from "vitest";
import { getBalanceAPI, getIssuesAPI, uploadStatementAPI } from "./statement";
import type { StatementsResponse } from "../entity/response";

vi.mock("axios", () => {
    const mockGet = vi.fn();
    const mockPost = vi.fn();
    return {
        default: {
            create: vi.fn(() => ({
                get: mockGet,
                post: mockPost,
                interceptors: {
                    response: {
                        use: vi.fn(),
                    },
                },
            })),
        },
    };
});

describe('Get Balance API', () => {
    it('fetches balance data successfully', async () => {
        const mockData = {
            totalBalance: 1000,
            totalCredit: 1500,
            totalDebit: 500
        };
        // ambil instance mock axios yang tadi dibuat di vi.mock
        const mockedAxios = (axios as any).create();

        // mock hasil dari get
        mockedAxios.get.mockResolvedValue({ data: { data: mockData } });

        const result = await getBalanceAPI();

        expect(mockedAxios.get).toHaveBeenCalledWith("/balance");
        expect(result).toEqual(mockData);
    });
});

describe('Get Issues API', () => {
    it('fetches issues data successfully', async () => {
        const mockData: Array<StatementsResponse> = [
            { id: "1", timestamp: 1627935600, name: 'Deposit', type: 'CREDIT', amount: 100, status: 'PENDING', description: 'Salary' },
            { id: "2", timestamp: 1627935600, name: 'Withdrawal', type: 'DEBIT', amount: -50, status: 'FAILED', description: 'Groceries' },
        ];
        // ambil instance mock axios yang tadi dibuat di vi.mock
        const mockedAxios = (axios as any).create();

        // mock hasil dari get
        mockedAxios.get.mockResolvedValue({ data: { data: mockData } });

        const result = await getIssuesAPI();

        expect(mockedAxios.get).toHaveBeenCalledWith("/issues");
        expect(result).toEqual(mockData);
    });
});

describe('Post Upload Statement API', () => {
    it('uploads file successfully', async () => {
        const mockResponse = { message: "File uploaded successfully" };
        const mockedAxios = (axios as any).create();

        mockedAxios.post.mockResolvedValue({ data: mockResponse });
        const file = new File(["dummy content"], "statement.csv", { type: "text/csv" });

        await uploadStatementAPI(file);

        expect(mockedAxios.post).toHaveBeenCalledWith("/upload", expect.any(FormData), {
            headers: { "Content-Type": "multipart/form-data" },
        });
        expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    });
});
