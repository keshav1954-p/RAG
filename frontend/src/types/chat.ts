export interface ChatSource {
  id: string;
  title: string;
  type: string;
  detail?: string;
  page?: number;
  similarity?: number;
  chunk?: string;
}

export interface RetrievalDetails {
  query?: string;
  chunks: unknown[];
  latencyMs?: number;
  context?: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  sources?: ChatSource[];
  retrieval?: RetrievalDetails;
}

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
}

export interface ChatResponse {
  message: string;
  question: string;
  answer?: string;
  sources?: ChatSource[];
  retrieval?: RetrievalDetails;
}