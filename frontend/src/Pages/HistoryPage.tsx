import { useEffect, useState } from "react";
import { getChatHistory } from "../api/historyApi";
import { PageHeader } from "../components/PageHeader";

export function HistoryPage() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getChatHistory()
      .then((response) => {
        if (active) setMessage(response.message);
      })
      .catch((requestError: unknown) => {
        if (active) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Unable to load conversation history.",
          );
        }
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <PageHeader
        title="History"
        description="Conversation records will appear when persistent history is available from the API."
      />
      <section className="card empty-section" aria-live="polite">
        <h2>{isLoading ? "Loading history..." : "Conversation history"}</h2>
        {error ? (
          <p className="api-feedback error" role="alert">
            {error}
          </p>
        ) : (
          <p>{message || "No history data was returned by the API."}</p>
        )}
      </section>
    </>
  );
}
