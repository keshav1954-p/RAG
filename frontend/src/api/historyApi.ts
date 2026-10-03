import { apiRequest } from "./client";

export interface HistoryResponse {
  message: string;
}

export function getChatHistory(): Promise<HistoryResponse> {
  return apiRequest<HistoryResponse>("/history/");
}