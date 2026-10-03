import { useState } from "react";
import { Icon } from "../components/Icon";
import { PageHeader } from "../components/PageHeader";

export function PlaygroundPage() {
  const [prompt, setPrompt] = useState(
    "Compare retrieval quality with and without reranking",
  );
  return (
    <>
      <PageHeader
        eyebrow="EVALUATION LAB"
        title="RAG Playground"
        description="Evaluation controls are ready, but the API does not expose an evaluation endpoint yet."
      />
      <section className="playground-grid">
        <div className="card playground-controls">
          <label>
            Test prompt
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </label>
          <label>
            Retrieval strategy
            <select>
              <option>Hybrid search + reranking</option>
              <option>Vector search</option>
              <option>Keyword search</option>
            </select>
          </label>
          <label>
            Top K<input type="range" min="1" max="10" defaultValue="5" />
          </label>
          <button
            className="button primary"
            type="button"
            disabled
            title="Evaluation is not available from the current API"
          >
            Evaluation unavailable <Icon name="info" size={15} />
          </button>
        </div>
        <div className="card playground-result">
          <span className="eyebrow">NO EVALUATION RUN</span>
          <h2>Retrieval preview unavailable</h2>
          <p className="muted-copy">
            This API currently has no evaluation or retrieval endpoint, so no
            confidence scores or retrieved chunks are available.
          </p>
        </div>
      </section>
    </>
  );
}
