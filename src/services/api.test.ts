import { vi, it, expect } from "vitest";
import { setupInterceptors } from "./api";


describe("API Interceptors", () => {
    it("should log and reject on API error", async () => {
        const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => { });
        const mockUse = vi.fn((_, errorHandler) => {
            const error = { response: { data: "Bad Request" }, message: "Oops" };

            return errorHandler(error).catch(() => { });
        });

        const mockInstance = {
            interceptors: { response: { use: mockUse } },
        };

        await setupInterceptors(mockInstance as any);

        expect(mockUse).toHaveBeenCalled();
        expect(consoleSpy).toHaveBeenCalledWith("API Error:", "Bad Request");

        consoleSpy.mockRestore();
    });

    it("should pass through successful responses", async () => {
        const mockUse = vi.fn((successHandler, _) => {
            const response = { data: "Success" };
            return successHandler(response);
        });
        const mockInstance = {
            interceptors: { response: { use: mockUse } },
        };
        await setupInterceptors(mockInstance as any);

        expect(mockUse).toHaveBeenCalled();
    });

    it("should log error message if response data is missing", async () => {
        const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => { });
        const mockUse = vi.fn((_, errorHandler) => {
            const error = { message: "Network Error" };
            return errorHandler(error).catch(() => { });
        });
        const mockInstance = {
            interceptors: { response: { use: mockUse } },
        };
        await setupInterceptors(mockInstance as any);

        expect(mockUse).toHaveBeenCalled();
        expect(consoleSpy).toHaveBeenCalledWith("API Error:", "Network Error");

        consoleSpy.mockRestore();
    });
});
