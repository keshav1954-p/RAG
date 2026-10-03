import { apiRequest } from "./client";

export interface UploadResponse {
  message: string;
  filename: string;
  content_type: string;
}

export function uploadDocument(file: File) {
  const formData = new FormData();

  formData.append("file", file);

  return apiRequest<UploadResponse>("/upload/", {
    method: "POST",
    body: formData,
  });
}