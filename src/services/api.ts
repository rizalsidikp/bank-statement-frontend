import axios from "axios";
import type { StatementsResponse, SummaryResponse } from "../entity/response";
import { snakeToCamel } from "../helper/helper";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

// resuable instance of axios
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);


export const getBalanceAPI = async () : Promise<SummaryResponse> => {
  const res = await api.get("/balance");
  return snakeToCamel(res?.data?.data) as SummaryResponse;
};

export const getIssuesAPI = async () : Promise<Array<StatementsResponse>> => {
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