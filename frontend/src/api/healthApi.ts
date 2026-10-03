import { apiRequest } from "./client";

export interface HealthResponse {
  status: "healthy" | string;
  service: string;
}

export function getApiHealth(): Promise<HealthResponse> {
  return apiRequest<HealthResponse>("/health/");
}
