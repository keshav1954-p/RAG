import { Icon } from "../components/Icon";
import { PageHeader } from "../components/PageHeader";
import { documents as docs } from "../utils/workspaceData";
import type { IconName, Page } from "../types/workspace";

export function OverviewPage({
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
        eyebrow="SAMPLE WORKSPACE OVERVIEW"
        title="Good morning, Keshav"
        description="Sample workspace metrics. Live usage and document-list endpoints are not available yet."
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
          <p className="muted-copy">
            Conversation activity will appear when the history API returns
            saved conversations.
          </p>
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
