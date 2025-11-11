import type { StatementsResponse, SummaryResponse } from "../entity/response";
import { snakeToCamel } from "../helper/helper";
import { api } from "./api";

export const getBalanceAPI = async (): Promise<SummaryResponse> => {
  const res = await api.get("/balance");
  return snakeToCamel(res?.data?.data) as SummaryResponse;
};

export const getIssuesAPI = async (): Promise<Array<StatementsResponse>> => {
  const res = await api.get("/issues");
  return snakeToCamel(res?.data?.data) as Array<StatementsResponse>;
};

export const uploadStatementAPI = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};
