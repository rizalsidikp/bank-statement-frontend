export interface SummaryResponse {
  totalCredit: number;
  totalDebit: number;
  totalBalance: number;
};

export interface StatementsResponse{
  id: string;
  timestamp: number;
  name: string;
  type: "DEBIT" | "CREDIT";
  amount: number;
  status: "PENDING" | "SUCCESS" | "FAILED";
  description: string;
}