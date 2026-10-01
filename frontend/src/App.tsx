import { useEffect, useState, type ReactNode } from "react";
import {
  askQuestion,
  type ChatMessage,
  type Document,
  type Source,
} from "./services/mockApi";
import "./index.css";

type Page =
  | "Overview"
  | "Chat"
  | "RAG Playground"
  | "Documents"
  | "Collections"
  | "History"
  | "Analytics"
  | "Settings";
type IconName =
  | "grid"
  | "chat"
  | "file"
  | "folder"
  | "clock"
  | "chart"
  | "settings"
  | "search"
  | "plus"
  | "more"
  | "arrow"
  | "spark"
  | "upload"
  | "check"
  | "sun"
  | "moon"
  | "close"
  | "menu"
  | "send"
  | "chevron"
  | "bell"
  | "copy"
  | "external"
  | "pin"
  | "sliders"
  | "info";
const docs: Document[] = [
  {
    id: "1",
    name: "Product handbook.pdf",
    type: "PDF",
    size: "2.4 MB",
    updated: "2 hours ago",
    collection: "Product",
    status: "Indexed",
  },
  {
    id: "2",
    name: "Q3 strategy notes.docx",
    type: "DOCX",
    size: "840 KB",
    updated: "Yesterday",
    collection: "Company",
    status: "Indexed",
  },
  {
    id: "3",
    name: "Customer interview synthesis.md",
    type: "MD",
    size: "28 KB",
    updated: "Sep 18, 2024",
    collection: "Research",
    status: "Indexed",
  },
  {
    id: "4",
    name: "API reference v2.pdf",
    type: "PDF",
    size: "6.1 MB",
    updated: "Sep 15, 2024",
    collection: "Engineering",
    status: "Indexing",
  },
];
const recentChats = [
  "How do we handle workspace permissions?",
  "Summarize the Q3 customer themes",
  "What is our on-call escalation policy?",
];
const navItems: { label: Page; icon: IconName }[] = [
  { label: "Overview", icon: "grid" },
  { label: "Chat", icon: "chat" },
  { label: "RAG Playground", icon: "spark" },
  { label: "Documents", icon: "file" },
  { label: "Collections", icon: "folder" },
  { label: "History", icon: "clock" },
  { label: "Analytics", icon: "chart" },
];
function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, string> = {
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    chat: '<path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.7 8.7 0 0 1-3.5-.8L4 20l1.4-3.7A7 7 0 0 1 4 11.5a7.5 7.5 0 0 1 8-7.5 7.5 7.5 0 0 1 8 7.5Z"/>',
    file: '<path d="M13 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10Z"/><path d="M13 3v7h7M8 14h8M8 18h5"/>',
    folder:
      '<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2h6.5A2.5 2.5 0 0 1 21 9.5v8A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5Z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    chart: '<path d="M4 19V5M4 19h17"/><path d="m7 15 4-4 3 2 5-7"/>',
    settings:
      '<path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"/><path d="m19 15 .5.5a1.8 1.8 0 1 1-2.5 2.5l-.5-.5a1.8 1.8 0 0 0-3 1.3v.2a1.8 1.8 0 1 1-3.6 0V19a1.8 1.8 0 0 0-3-1.3l-.5.5A1.8 1.8 0 1 1 4 15.7l.5-.5a1.8 1.8 0 0 0-1.3-3H3a1.8 1.8 0 1 1 0-3.6h.2a1.8 1.8 0 0 0 1.3-3L4 6.3A1.8 1.8 0 1 1 6.5 3.8l.5.5a1.8 1.8 0 0 0 3-1.3v-.2a1.8 1.8 0 1 1 3.6 0V3a1.8 1.8 0 0 0 3 1.3l.5-.5A1.8 1.8 0 1 1 19.6 6l-.5.5a1.8 1.8 0 0 0 1.3 3h.2a1.8 1.8 0 1 1 0 3.6h-.2a1.8 1.8 0 0 0-1.3 3Z"/>',
    search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    spark:
      '<path d="m12 3 1.4 5.6L19 10l-5.6 1.4L12 17l-1.4-5.6L5 10l5.6-1.4Z"/>',
    upload: '<path d="M12 16V4m0 0L7 9m5-5 5 5M5 15v4h14v-4"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2"/>',
    moon: '<path d="M20 15.4A8.5 8.5 0 0 1 8.6 4 8.5 8.5 0 1 0 20 15.4Z"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
    copy: '<rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
    external:
      '<path d="M14 5h5v5M19 5l-8 8M19 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4"/>',
    pin: '<path d="m15 4 5 5-3 1-4 4v4l-2 2v-6l-4-4-2 1 3-3 4 4 4-4Z"/>',
    sliders:
      '<path d="M4 6h16M4 12h16M4 18h16"/><circle cx="8" cy="6" r="2"/><circle cx="16" cy="12" r="2"/><circle cx="10" cy="18" r="2"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  };
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: paths[name] }}
    />
  );
}
function Login({ onSignIn }: { onSignIn: () => void }) {
  return (
    <div className="login-page">
      <main className="login-card-wrap">
        <div className="login-card">
          <div className="login-mobile-brand">
            <div className="brand-mark">
              <Icon name="spark" size={17} />
            </div>
            <span>
              RAG<span className="brand-dot">.</span>
            </span>
          </div>
          <div className="login-heading">
            <h1>Welcome back</h1>
            <p>Sign in to continue to your workspace.</p>
          </div>
          <button className="sso-button" onClick={onSignIn}>
            Continue with Google
          </button>
          <div className="divider">
            <span>or continue with email</span>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSignIn();
            }}
          >
            <label>
              Email address
              <input type="email" defaultValue="keshav@RAG.app" required />
            </label>
            <label>
              Password
              <input type="password" defaultValue="demo" required />
            </label>
            <button className="button primary login-submit">
              Sign in <Icon name="arrow" size={16} />
            </button>
          </form>
          <p className="demo-note">
            <Icon name="spark" size={13} /> Demo mode is enabled — any
            credentials will work.
          </p>
        </div>
      </main>
    </div>
  );
}
function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="page-header">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  );
}
function Overview({
  onNavigate,
  onAsk,
}: {
  onNavigate: (p: Page) => void;
  onAsk: (q: string) => void;
}) {
  const prompts = [
    "What changed in our product strategy?",
    "Summarize the latest customer feedback",
    "How does our on-call process work?",
  ];
  return (
    <>
      <PageHeader
        eyebrow="MONDAY, SEPTEMBER 23, 2024"
        title="Good morning, Keshav"
        description="Your knowledge workspace at a glance."
        action={
          <button
            className="button primary"
            onClick={() => onNavigate("Documents")}
          >
            <Icon name="upload" size={16} /> Upload documents
          </button>
        }
      />
      <div className="stats-grid">
        <Stat label="Documents" value="48" change="+12%" icon="file" />
        <Stat label="Collections" value="6" change="+2" icon="folder" />
        <Stat label="Questions asked" value="127" change="+18%" icon="chat" />
        <Stat
          label="Avg. response time"
          value="1.2s"
          change="-0.3s"
          icon="chart"
        />
      </div>
      <div className="overview-main-grid">
        <section className="card ask-card">
          <div className="card-heading">
            <div>
              <div className="eyebrow">ASK YOUR KNOWLEDGE BASE</div>
              <h2>What would you like to know?</h2>
            </div>
            <span className="live-dot">
              <i /> Ready
            </span>
          </div>
          <div className="ask-input">
            <Icon name="spark" size={20} />
            <input
              placeholder="Ask a question about your workspace..."
              onKeyDown={(e) =>
                e.key === "Enter" && onAsk(e.currentTarget.value)
              }
            />
            <button
              aria-label="Ask your knowledge base"
              onClick={(e) =>
                onAsk(
                  (e.currentTarget.previousElementSibling as HTMLInputElement)
                    .value,
                )
              }
            >
              <Icon name="arrow" size={17} />
            </button>
          </div>
          <div className="suggestions">
            {prompts.map((p) => (
              <button key={p} onClick={() => onAsk(p)}>
                {p}
                <Icon name="arrow" size={14} />
              </button>
            ))}
          </div>
        </section>
        <section className="card recent-documents-card">
          <div className="card-heading">
            <div>
              <h2>Recent documents</h2>
              <p>Recently added to your knowledge base</p>
            </div>
            <button
              className="text-button"
              onClick={() => onNavigate("Documents")}
            >
              View all <Icon name="arrow" size={13} />
            </button>
          </div>
          <div className="recent-document-list">
            {docs.slice(0, 3).map((doc) => (
              <button
                className="recent-document-row"
                key={doc.id}
                onClick={() => onNavigate("Documents")}
              >
                <span className={`file-badge ${doc.type.toLowerCase()}`}>
                  {doc.type}
                </span>
                <span className="recent-document-name">
                  <strong>{doc.name}</strong>
                  <small>{doc.collection} · {doc.updated}</small>
                </span>
                <span className={`status ${doc.status.toLowerCase()}`}>
                  {doc.status === "Indexed" ? "Processed" : "Processing"}
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>
      <div className="section-heading">
        <div>
          <h2>Knowledge base health</h2>
          <p>Everything your assistant can use to answer questions.</p>
        </div>
        <button className="text-button" onClick={() => onNavigate("Documents")}>
          Manage documents <Icon name="arrow" size={14} />
        </button>
      </div>
      <div className="health-grid">
        <Health label="Indexed documents" value="45 / 48" progress={94} />
        <Health label="Freshness" value="92%" progress={92} />
        <Health label="Pinned knowledge" value="12 sources" progress={76} />
      </div>
      <div className="overview-lower-grid">
        <section className="card activity-card">
          <div className="card-heading">
            <h2>Recent activity</h2>
            <button className="text-button" onClick={() => onNavigate("History")}>
              View all
            </button>
          </div>
          {recentChats.map((chat) => (
            <button
              className="activity-row"
              key={chat}
              onClick={() => onNavigate("Chat")}
            >
              <div className="activity-icon">
                <Icon name="chat" size={16} />
              </div>
              <div>
                <strong>{chat}</strong>
                <span>Today · 5 sources</span>
              </div>
              <Icon name="arrow" size={15} />
            </button>
          ))}
        </section>
        <section className="card overview-collections">
          <div className="card-heading">
            <div>
              <h2>Top collections</h2>
              <p>Knowledge grouped by workspace</p>
            </div>
            <button
              className="text-button"
              onClick={() => onNavigate("Collections")}
            >
              View all <Icon name="arrow" size={13} />
            </button>
          </div>
          {[
            { name: "Product", count: 12, progress: 82 },
            { name: "Engineering", count: 24, progress: 68 },
            { name: "Research", count: 8, progress: 46 },
          ].map((item) => (
            <button
              className="collection-health-row"
              key={item.name}
              onClick={() => onNavigate("Collections")}
            >
              <span className="collection-dot purple" />
              <strong>{item.name}</strong>
              <small>{item.count} docs</small>
              <span className="collection-progress">
                <i style={{ width: `${item.progress}%` }} />
              </span>
            </button>
          ))}
        </section>
      </div>
    </>
  );
}
function Stat({
  label,
  value,
  change,
  icon,
}: {
  label: string;
  value: string;
  change: string;
  icon: IconName;
}) {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        <Icon name={icon} size={17} />
      </div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small className="positive">
        {change} <em>vs last month</em>
      </small>
    </div>
  );
}
function Health({
  label,
  value,
  progress,
}: {
  label: string;
  value: string;
  progress: number;
}) {
  return (
    <div className="card health-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <div className="progress">
        <i style={{ width: `${progress}%` }} />
      </div>
      <small>{progress >= 90 ? "Healthy" : "Needs attention"}</small>
    </div>
  );
}
function Chat({
  messages,
  query,
  setQuery,
  ask,
  isThinking,
  scope,
  setScope,
}: {
  messages: ChatMessage[];
  query: string;
  setQuery: (v: string) => void;
  ask: () => void;
  isThinking: boolean;
  scope: string;
  setScope: (v: string) => void;
}) {
  const [sourcesOpen, setSourcesOpen] = useState(true);
  const [details, setDetails] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(true);
  const [selectedDocument, setSelectedDocument] = useState("");
  const [modelProvider, setModelProvider] = useState<"API" | "Local">("API");
  const [modelVersion, setModelVersion] = useState("GPT-4o");
  const last = [...messages].reverse().find((m) => m.role === "assistant");
  const modelVersions =
    modelProvider === "API"
      ? ["GPT-4o", "GPT-4o mini", "Claude 3.5 Sonnet"]
      : ["Llama 3.1 8B", "Mistral 7B Instruct", "Phi-3 Mini"];
  return (
    <div className="chat-layout">
      <aside
        className={`conversation-history ${historyOpen ? "" : "collapsed"}`}
      >
        <div className="panel-title">
          <strong>Conversations</strong>
          <button
            className="icon-button"
            onClick={() => setHistoryOpen(!historyOpen)}
          >
            <Icon name="chevron" size={15} />
          </button>
        </div>
        {recentChats.map((chat) => (
          <button className="history-item" key={chat}>
            {chat}
            <small>Today · 5 messages</small>
          </button>
        ))}
        <button className="button secondary full">
          <Icon name="plus" size={15} /> New conversation
        </button>
      </aside>
      <section className="conversation-center">
        <div className="chat-toolbar">
          <div className="chat-toolbar-heading">
            <span className="eyebrow">KNOWLEDGE CHAT</span>
            <h1>Ask your workspace</h1>
            <small className="scope-label">Scope: {scope}</small>
          </div>
          <div className="chat-controls">
            <label className="chat-control">
              <span>Knowledge scope</span>
              <select
                value={scope}
                onChange={(event) => {
                  setScope(event.target.value);
                  if (event.target.value !== "Selected Documents") {
                    setSelectedDocument("");
                  }
                }}
              >
                <option>Entire Knowledge Base</option>
                <option>Collection: Product</option>
                <option>Collection: Engineering</option>
                <option>Collection: Research</option>
                <option>Selected Documents</option>
              </select>
            </label>
            <label className="chat-control">
              <span>Document selection</span>
              <select
                aria-label="Document selection"
                value={selectedDocument}
                onChange={(event) => {
                  setSelectedDocument(event.target.value);
                  setScope(
                    event.target.value
                      ? "Selected Documents"
                      : "Entire Knowledge Base",
                  );
                }}
              >
                <option value="">All documents in scope</option>
                {docs
                  .filter((doc) => doc.status === "Indexed")
                  .map((doc) => (
                    <option value={doc.id} key={doc.id}>
                      {doc.name}
                    </option>
                  ))}
              </select>
            </label>
            <label className="chat-control">
              <span>Model type</span>
              <select
                value={modelProvider}
                onChange={(event) => {
                  const provider =
                    event.target.value === "Local" ? "Local" : "API";
                  setModelProvider(provider);
                  setModelVersion(
                    provider === "API" ? "GPT-4o" : "Llama 3.1 8B",
                  );
                }}
              >
                <option value="API">API</option>
                <option value="Local">Local</option>
              </select>
            </label>
            <label className="chat-control">
              <span>Model version</span>
              <select
                value={modelVersion}
                onChange={(event) => setModelVersion(event.target.value)}
              >
                {modelVersions.map((version) => (
                  <option key={version}>{version}</option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <div className="message-list">
          {messages.length === 0 && (
            <div className="empty-chat">
              <div className="brand-mark">
                <Icon name="spark" size={20} />
              </div>
              <h2>What can I help you find?</h2>
              <p>Ask a question and I’ll search your trusted knowledge.</p>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              className={`message ${message.role}`}
              key={`${message.content}-${index}`}
            >
              <div className="message-role">
                {message.role === "user" ? "You" : "RAG assistant"}
              </div>
              <p>
                {message.content}
                {message.role === "assistant" && (
                  <sup className="citation">[1]</sup>
                )}
              </p>
              {message.role === "assistant" && (
                <div className="message-actions">
                  <button>
                    <Icon name="copy" size={14} /> Copy
                  </button>
                  <button>
                    <Icon name="external" size={14} /> Share
                  </button>
                </div>
              )}
            </div>
          ))}
          {isThinking && (
            <div className="message assistant staged-loading">
              <div className="loading-stage">
                <i /> Searching 48 documents
              </div>
              <div className="loading-stage">
                <i /> Reranking relevant chunks
              </div>
              <div className="loading-stage">
                <i /> Drafting a cited answer
              </div>
            </div>
          )}
        </div>
        <div className="composer">
          <div className="composer-scope">
            <Icon name="folder" size={14} /> {scope}
          </div>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                ask();
              }
            }}
            placeholder="Ask a follow-up question..."
            rows={1}
          />
          <button
            className="button primary send-button"
            onClick={ask}
            disabled={isThinking || !query.trim()}
          >
            <Icon name="send" size={16} />
          </button>
          <small>Enter to send · Shift + Enter for new line</small>
        </div>
      </section>
      <aside className={`sources-panel ${sourcesOpen ? "" : "sources-closed"}`}>
        <div className="panel-title">
          <strong>Sources</strong>
          <button
            className="icon-button"
            onClick={() => setSourcesOpen(!sourcesOpen)}
          >
            <Icon name="chevron" size={15} />
          </button>
        </div>
        {last?.sources?.map((source) => (
          <SourceCard source={source} key={source.id} />
        )) || (
          <p className="muted-copy">
            Sources will appear here after your first question.
          </p>
        )}{" "}
        {last && (
          <div className="retrieval-details">
            <button onClick={() => setDetails(!details)}>
              <Icon name="sliders" size={14} /> Retrieval details{" "}
              <Icon name="chevron" size={13} />
            </button>
            {details && (
              <div className="detail-body">
                <span>
                  Query <b>{last.retrieval?.query}</b>
                </span>
                <span>
                  Chunks <b>{last.retrieval?.chunks.length ?? 0}</b>
                </span>
                <span>
                  Latency <b>{last.retrieval?.latencyMs ?? 0}ms</b>
                </span>
                <p>{last.retrieval?.context}</p>
              </div>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
function SourceCard({ source }: { source: Source }) {
  return (
    <button
      className="source-card"
      onClick={() =>
        window.alert(
          `${source.title}\nPage ${source.page ?? "—"}\nSimilarity ${source.similarity?.toFixed(2) ?? "—"}\n\n${source.chunk ?? "Retrieved source chunk available from the document service."}`,
        )
      }
    >
      <div className="source-type">{source.type}</div>
      <div>
        <strong>{source.title}</strong>
        <span>
          {source.detail || "Indexed source"} · Page {source.page ?? "—"} ·{" "}
          {source.similarity?.toFixed(2) ?? "—"}
        </span>
      </div>
      <div className="source-actions">
        <span aria-label="Pin source">
          <Icon name="pin" size={13} />
        </span>
        <span aria-label="Open source">
          <Icon name="external" size={13} />
        </span>
      </div>
    </button>
  );
}
function Documents({
  collection,
  setCollection,
}: {
  collection: string;
  setCollection: (v: string) => void;
}) {
  const [selected, setSelected] = useState<Document>(docs[0]);
  const [pinned, setPinned] = useState<string[]>(["1"]);
  return (
    <>
      <PageHeader
        eyebrow="KNOWLEDGE BASE"
        title="Documents"
        description="Upload, inspect, and curate the sources your assistant trusts."
        action={
          <button className="button primary">
            <Icon name="upload" size={16} /> Upload documents
          </button>
        }
      />
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
            <h2>{docs.length} documents</h2>
            <span className="live-dot">
              <i /> Sync healthy
            </span>
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
          <div className="pipeline">
            <span className="done">
              <Icon name="check" size={13} /> Uploading
            </span>
            <span className="done">
              <Icon name="check" size={13} /> Extracting text
            </span>
            <span className="done">
              <Icon name="check" size={13} /> Chunking
            </span>
            <span className="done">
              <Icon name="check" size={13} /> Generating embeddings
            </span>
            <span className={selected.status === "Indexed" ? "done" : ""}>
              <Icon name="check" size={13} /> Indexing
            </span>
            <span className={selected.status === "Indexed" ? "done" : ""}>
              <Icon name="check" size={13} /> Ready
            </span>
          </div>
          <div className="preview-content">
            <h3>Chunk explorer</h3>
            {[1, 2, 3].map((chunk) => (
              <article className="chunk" key={chunk}>
                <span>
                  Chunk {chunk} · 0.{chunk + 7} relevance
                </span>
                <p>
                  {chunk === 1
                    ? "The product handbook defines workspace permissions, trusted sources, and controls for knowledge owners."
                    : "This section contains related context that can be retrieved when answering questions from the workspace."}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
function SimplePage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <PageHeader title={title} description={description} />
      <section className="card empty-section">
        <Icon name="spark" size={24} />
        <h2>Ready when you are</h2>
        <p>
          This workspace view uses mock data and keeps the service boundary
          ready for your API.
        </p>
      </section>
    </>
  );
}
function Playground() {
  const [prompt, setPrompt] = useState(
    "Compare retrieval quality with and without reranking",
  );
  return (
    <>
      <PageHeader
        eyebrow="EVALUATION LAB"
        title="RAG Playground"
        description="Test retrieval settings and inspect how answers are assembled."
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
          <button className="button primary">
            Run evaluation <Icon name="arrow" size={15} />
          </button>
        </div>
        <div className="card playground-result">
          <span className="eyebrow">LATEST RUN · 420MS</span>
          <h2>Retrieval preview</h2>
          <div className="metric-row">
            <strong>0.86</strong>
            <span>Answer confidence</span>
            <strong>5</strong>
            <span>Chunks retrieved</span>
          </div>
          <div className="result-bar">
            <i />
          </div>
          <p>
            Hybrid retrieval surfaced the Product handbook and Q3 strategy notes
            as the strongest supporting sources.
          </p>
        </div>
      </section>
    </>
  );
}
function App() {
  const [authenticated, setAuthenticated] = useState(
    () => localStorage.getItem("rag-auth") === "true",
  );
  const [page, setPage] = useState<Page>("Overview");
  const [mobileNav, setMobileNav] = useState(false);
  const [palette, setPalette] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [dark, setDark] = useState(
    () => localStorage.getItem("rag-theme") !== "light",
  );
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [scope, setScope] = useState("Entire Knowledge Base");
  const [collection, setCollection] = useState("All collections");
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("rag-theme", dark ? "dark" : "light");
  }, [dark]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "n") {
        e.preventDefault();
        setPage("Chat");
        setQuery("");
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "u") {
        e.preventDefault();
        setPage("Documents");
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "/") {
        e.preventDefault();
        setPage("Chat");
        window.setTimeout(
          () =>
            document
              .querySelector<HTMLTextAreaElement>(".composer textarea")
              ?.focus(),
          0,
        );
      }
      if (e.key === "Escape") {
        setPalette(false);
        setNotifications(false);
        setMobileNav(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  if (!authenticated)
    return (
      <Login
        onSignIn={() => {
          localStorage.setItem("rag-auth", "true");
          setAuthenticated(true);
        }}
      />
    );
  const ask = async () => {
    if (!query.trim() || isThinking) return;
    const prompt = query.trim();
    setQuery("");
    setMessages((m) => [...m, { role: "user", content: prompt }]);
    setIsThinking(true);
    const response = await askQuestion(prompt);
    setMessages((m) => [...m, response]);
    setIsThinking(false);
  };
  const navigate = (next: Page) => {
    setPage(next);
    setMobileNav(false);
  };
  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">
            <Icon name="spark" size={17} />
          </div>
          <span>
            RAG<span className="brand-dot">.</span>
          </span>
          <button className="mobile-close" onClick={() => setMobileNav(false)}>
            <Icon name="close" />
          </button>
        </div>
        <div className="workspace-switcher">
          <div className="workspace-avatar">N</div>
          <div>
            <strong>Nexus workspace</strong>
            <span>Personal workspace</span>
          </div>
          <Icon name="chevron" size={15} />
        </div>
        <div className="sidebar-section-label">Workspace</div>
        <nav>
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`nav-item ${page === item.label ? "active" : ""}`}
              onClick={() => navigate(item.label)}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
              {item.label === "Chat" && <span className="nav-badge">3</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-section-label collections-label">
          Collections{" "}
          <button onClick={() => navigate("Collections")}>
            <Icon name="plus" size={15} />
          </button>
        </div>
        <div className="mini-collections">
          {["Product", "Engineering", "Research"].map((name) => (
            <button
              key={name}
              onClick={() => {
                setCollection(name);
                navigate("Documents");
              }}
            >
              <i className="collection-dot purple" />
              {name}
              <span>
                {name === "Engineering" ? 24 : name === "Product" ? 12 : 8}
              </span>
            </button>
          ))}
        </div>
        <div className="sidebar-bottom">
          <button className="nav-item" onClick={() => navigate("Settings")}>
            <Icon name="settings" />
            <span>Settings</span>
          </button>
          <div className="user-card">
            <div className="avatar">KS</div>
            <div>
              <strong>Keshav Sharma</strong>
              <span>Free plan</span>
            </div>
          </div>
        </div>
      </aside>
      {mobileNav && (
        <button
          className="sidebar-backdrop"
          aria-label="Close navigation"
          onClick={() => setMobileNav(false)}
        />
      )}
      <main className="main-content">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileNav(true)}>
            <Icon name="menu" />
          </button>
          <div className="breadcrumbs">
            <span>Workspace</span>
            <span>/</span>
            <strong>{page}</strong>
          </div>
          <div className="topbar-actions">
            <button
              className="command-trigger"
              onClick={() => setPalette(true)}
            >
              <Icon name="search" size={16} />
              <span>Search anything...</span>
              <kbd>⌘ K</kbd>
            </button>
            <button
              className="icon-button theme-button"
              onClick={() => setDark(!dark)}
              aria-label="Toggle theme"
            >
              <Icon name={dark ? "sun" : "moon"} size={17} />
            </button>
            <div className="notification-wrap">
              <button
                className="icon-button"
                aria-label="Notifications"
                onClick={() => setNotifications(!notifications)}
              >
                <Icon name="bell" size={17} />
                <span className="notification-dot" />
              </button>
              {notifications && (
                <div className="notification-popover">
                  <strong>Notifications</strong>
                  <p>
                    <Icon name="check" size={14} /> API reference finished
                    indexing
                  </p>
                  <p>
                    <Icon name="info" size={14} /> 3 new questions in your
                    workspace
                  </p>
                </div>
              )}
            </div>
            <div className="avatar small">KS</div>
          </div>
        </header>
        <div className="page-container">
          {page === "Overview" && (
            <Overview
              onNavigate={navigate}
              onAsk={(text) => {
                setPage("Chat");
                setQuery(text);
              }}
            />
          )}
          {page === "Chat" && (
            <Chat
              messages={messages}
              query={query}
              setQuery={setQuery}
              isThinking={isThinking}
              ask={ask}
              scope={scope}
              setScope={setScope}
            />
          )}
          {page === "RAG Playground" && <Playground />}
          {page === "Documents" && (
            <Documents collection={collection} setCollection={setCollection} />
          )}
          {page === "Collections" && (
            <SimplePage
              title="Collections"
              description="Organize trusted knowledge by team and topic."
            />
          )}
          {page === "History" && (
            <SimplePage
              title="History"
              description="Review previous questions and cited answers."
            />
          )}
          {page === "Analytics" && (
            <SimplePage
              title="Analytics"
              description="Understand how your team searches."
            />
          )}
          {page === "Settings" && (
            <SimplePage
              title="Settings"
              description="Manage workspace preferences and appearance."
            />
          )}
        </div>
      </main>
      {palette && (
        <div className="palette-overlay" onClick={() => setPalette(false)}>
          <div className="command-palette" onClick={(e) => e.stopPropagation()}>
            <input
              autoFocus
              placeholder="Jump to..."
              onKeyDown={(e) => {
                const value = e.currentTarget.value.toLowerCase();
                if (e.key === "Enter") {
                  const target = navItems.find((n) =>
                    n.label.toLowerCase().includes(value),
                  );
                  if (target) {
                    navigate(target.label);
                    setPalette(false);
                  }
                }
              }}
            />
            <p>⌘ K to open · Esc to close</p>
            {navItems.map((n) => (
              <button
                key={n.label}
                onClick={() => {
                  navigate(n.label);
                  setPalette(false);
                }}
              >
                <Icon name={n.icon} size={15} />
                {n.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
