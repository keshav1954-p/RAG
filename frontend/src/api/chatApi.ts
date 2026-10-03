import { apiRequest } from "./client";
import type { ChatResponse } from "../types/chat";

export function askQuestion(
  question: string,
): Promise<ChatResponse> {
  return apiRequest<ChatResponse>("/chat/", {
    method: "POST",
    body: JSON.stringify({
      question,
    }),
  });
}