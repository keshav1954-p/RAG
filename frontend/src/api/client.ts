const API_BASE_URL = (import.meta.env.VITE_API_URL?.trim() || "/api").replace(
  /\/+$/,
  "",
);

type ApiErrorResponse = {
  error?: { message?: unknown };
  detail?: unknown;
  message?: unknown;
};

function responseErrorMessage(status: number): string {
  switch (status) {
    case 400:
      return "The request contains invalid data.";
    case 401:
      return "Authentication failed. Check your email and password.";
    case 403:
      return "You do not have permission to perform this action.";
    case 404:
      return "The requested API resource was not found.";
    case 500:
      return "The API encountered a server error. Please try again later.";
    default:
      return `The API request failed with status ${status}.`;
  }
}

function getBackendErrorMessage(
  payload: ApiErrorResponse | null,
  status: number,
): string {
  const isStackTrace = (message: string) =>
    /Traceback \(most recent call last\)|^\s*File ".+", line \d+/m.test(
      message,
    );
  const candidates = [payload?.error?.message, payload?.message];
  for (const candidate of candidates) {
    if (
      typeof candidate === "string" &&
      candidate.trim() &&
      !isStackTrace(candidate)
    ) {
      return candidate;
    }
  }

  const detail = payload?.detail;
  if (typeof detail === "string" && detail.trim()) {
    if (!isStackTrace(detail)) return detail;
  }
  if (Array.isArray(detail)) {
    const messages = detail
      .map((entry) => {
        if (
          typeof entry === "object" &&
          entry !== null &&
          "msg" in entry &&
          typeof entry.msg === "string"
        ) {
          return entry.msg;
        }
        return null;
      })
      .filter((message): message is string => message !== null);
    if (messages.length > 0) return messages.join(" ");
  }
  return responseErrorMessage(status);
}

async function readErrorPayload(
  response: Response,
): Promise<ApiErrorResponse | null> {
  try {
    const payload: unknown = await response.json();
    return typeof payload === "object" && payload !== null
      ? (payload as ApiErrorResponse)
      : null;
  } catch (error) {
    if (error instanceof SyntaxError) return null;
    throw new Error("Unable to read the API error response.", { cause: error });
  }
}

export async function apiRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const headers = new Headers(init.headers);
  if (typeof init.body === "string" && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, { ...init, headers });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error;
    }
    throw new Error(
      "Unable to reach the API. Check that the backend is running and try again.",
      { cause: error },
    );
  }

  if (!response.ok) {
    const payload = await readErrorPayload(response);
    throw new Error(getBackendErrorMessage(payload, response.status));
  }

  try {
    return (await response.json()) as T;
  } catch (error) {
    throw new Error("The API returned an invalid response.", { cause: error });
  }
}