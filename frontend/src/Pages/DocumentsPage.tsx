import { useRef, useState, type ChangeEvent } from "react";
import { Icon } from "../components/Icon";
import { PageHeader } from "../components/PageHeader";
import type { Document } from "../types/document";
import { documents as docs } from "../utils/workspaceData";

export function DocumentsPage({
  collection,
  setCollection,
  onUpload,
  isUploading,
  uploadMessage,
  uploadError,
}: {
  collection: string;
  setCollection: (v: string) => void;
  onUpload: (file: File) => Promise<void>;
  isUploading: boolean;
  uploadMessage: string;
  uploadError: string;
}) {
  const [selected, setSelected] = useState<Document>(docs[0]);
  const [pinned, setPinned] = useState<string[]>(["1"]);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) void onUpload(file);
    event.currentTarget.value = "";
  };

  return (
    <>
      <PageHeader
        eyebrow="KNOWLEDGE BASE"
        title="Documents"
        description="Upload, inspect, and curate the sources your assistant trusts."
        action={
          <button
            className="button primary"
            type="button"
            disabled={isUploading}
            onClick={() => fileInput.current?.click()}
          >
            <Icon name="upload" size={16} />
            {isUploading ? "Uploading..." : "Upload documents"}
          </button>
        }
      />
      <input
        ref={fileInput}
        type="file"
        accept=".pdf,.docx,.txt,.csv,.xlsx,.pptx"
        hidden
        onChange={handleFileChange}
        aria-label="Choose a document to upload"
      />
      {(uploadMessage || uploadError) && (
        <p
          className={`api-feedback ${uploadError ? "error" : "success"}`}
          role={uploadError ? "alert" : "status"}
        >
          {uploadError || uploadMessage}
        </p>
      )}
      <p className="muted-copy">
        The API currently accepts PDF uploads only. The document list below is
        sample UI data; this backend does not yet provide a document-list or
        parsed-content endpoint.
      </p>
      <div className="document-toolbar">
        <select
          value={collection}
          onChange={(e) => setCollection(e.target.value)}
        >
          <option>All collections</option>
          <option>Product</option>
          <option>Engineering</option>
          <option>Research</option>
        </select>
        <button className="button secondary">
          <Icon name="sliders" size={15} /> Filters
        </button>
      </div>
      <div className="documents-workspace">
        <section className="card document-list">
          <div className="card-heading">
            <h2>{docs.length} sample documents</h2>
          </div>
          {docs.map((doc) => (
            <button
              className={`document-row ${selected.id === doc.id ? "selected" : ""}`}
              key={doc.id}
              onClick={() => setSelected(doc)}
            >
              <div className={`file-badge ${doc.type.toLowerCase()}`}>
                {doc.type}
              </div>
              <div>
                <strong>{doc.name}</strong>
                <span>
                  {doc.collection} · {doc.size} · {doc.updated}
                </span>
              </div>
              <span className={`status ${doc.status.toLowerCase()}`}>
                {doc.status}
              </span>
            </button>
          ))}
        </section>
        <section className="card document-preview">
          <div className="preview-heading">
            <div>
              <span className="eyebrow">DOCUMENT PREVIEW</span>
              <h2>{selected.name}</h2>
              <p>
                {selected.collection} · {selected.size}
              </p>
            </div>
            <button
              className={`icon-button ${pinned.includes(selected.id) ? "pinned" : ""}`}
              onClick={() =>
                setPinned(
                  pinned.includes(selected.id)
                    ? pinned.filter((id) => id !== selected.id)
                    : [...pinned, selected.id],
                )
              }
            >
              <Icon name="pin" size={17} />
            </button>
          </div>
          <div className="preview-content">
            <h3>Document content preview unavailable</h3>
            <p className="muted-copy">
              The upload API confirms file receipt only. Parsed content and
              indexing details are not available yet.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
