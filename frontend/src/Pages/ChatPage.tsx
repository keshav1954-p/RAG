import { useState } from "react";
import { Icon } from "../components/Icon";
import { documents } from "../utils/workspaceData";
import type {
  ChatMessage,
  ChatSource,
  Conversation,
} from "../types/chat";

export function ChatPage({
  messages,
  conversations,
  activeConversationId,
  onSelectConversation,
  error,
  query,
  setQuery,
  ask,
  isThinking,
  scope,
  setScope,
  onNewConversation,
}: {
  messages: ChatMessage[];
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  error: string;
  query: string;
  setQuery: (value: string) => void;
  ask: () => void;
  isThinking: boolean;
  scope: string;
  setScope: (value: string) => void;
  onNewConversation: () => void;
}) {
  const [selectedDocument, setSelectedDocument] = useState("");
  const [modelProvider, setModelProvider] = useState<"API" | "Local">("API");
  const [modelVersion, setModelVersion] = useState("GPT-4o");
  const lastAssistantMessage = [...messages]
    .reverse()
    .find((message) => message.role === "assistant");
  const sources = lastAssistantMessage?.sources ?? [];
  const modelVersions =
    modelProvider === "API"
      ? ["GPT-4o", "GPT-4o mini", "Claude 3.5 Sonnet"]
      : ["Llama 3.1 8B", "Mistral 7B Instruct", "Phi-3 Mini"];
  const activeConversation = conversations.find(
    (conversation) => conversation.id === activeConversationId,
  );

  return (
    <div className="chat-layout">
      <section className="conversation-center">
        <header className="chat-toolbar">
          <div className="chat-title-row">
            <div>
              <span className="eyebrow">KNOWLEDGE CHAT</span>
              <h1>Ask your workspace</h1>
              <p>Search your workspace and explore the answers together.</p>
            </div>
            <button
              className="button secondary new-conversation-button"
              type="button"
              onClick={onNewConversation}
            >
              <Icon name="plus" size={15} />
              <span>New chat</span>
            </button>
          </div>

          <div className="chat-toolbar-menus">
            <label className="conversation-picker">
              <Icon name="chat" size={15} />
              <span className="visually-hidden">Select conversation</span>
              <select
                aria-label="Select conversation"
                value={activeConversationId ?? ""}
                onChange={(event) => onSelectConversation(event.target.value)}
              >
                <option value="" disabled>
                  Select a conversation
                </option>
                {conversations.map((conversation) => (
                  <option value={conversation.id} key={conversation.id}>
                    {conversation.title}
                  </option>
                ))}
              </select>
              <Icon name="chevron" size={14} />
            </label>

            <details className="chat-dropdown sources-dropdown">
              <summary aria-label={`Sources, ${sources.length} available`}>
                <Icon name="file" size={15} />
                <span>Sources</span>
                <b>{sources.length}</b>
                <Icon name="chevron" size={14} />
              </summary>
              <div className="chat-dropdown-panel sources-menu">
                <strong>Answer sources</strong>
                {sources.length > 0 ? (
                  sources.map((source) => (
                    <SourceCard source={source} key={source.id} />
                  ))
                ) : (
                  <p className="muted-copy">
                    Sources will appear here when the API returns them. The
                    current chat endpoint only returns a message.
                  </p>
                )}
                {lastAssistantMessage?.retrieval && (
                  <details className="retrieval-dropdown">
                    <summary>Retrieval details</summary>
                    <div className="retrieval-dropdown-content">
                      {lastAssistantMessage.retrieval.query && (
                        <p>
                          <strong>Query</strong>
                          {lastAssistantMessage.retrieval.query}
                        </p>
                      )}
                      <p>
                        <strong>Chunks</strong>
                        {lastAssistantMessage.retrieval.chunks.length}
                      </p>
                      {lastAssistantMessage.retrieval.latencyMs !== undefined && (
                        <p>
                          <strong>Latency</strong>
                          {lastAssistantMessage.retrieval.latencyMs} ms
                        </p>
                      )}
                      {lastAssistantMessage.retrieval.context && (
                        <p>{lastAssistantMessage.retrieval.context}</p>
                      )}
                    </div>
                  </details>
                )}
              </div>
            </details>

            <details className="chat-dropdown chat-settings-dropdown">
              <summary>
                <Icon name="sliders" size={15} />
                <span>Chat settings</span>
                <Icon name="chevron" size={14} />
              </summary>
              <div className="chat-dropdown-panel settings-menu">
                <p className="muted-copy">
                  Settings are for display only; the current API accepts a
                  question without scope or model options.
                </p>
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
                  <span>Document</span>
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
                    {documents
                      .filter((document) => document.status === "Indexed")
                      .map((document) => (
                        <option value={document.id} key={document.id}>
                          {document.name}
                        </option>
                      ))}
                  </select>
                </label>
                <div className="settings-select-row">
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
            </details>
          </div>
        </header>

        <div
          className={`message-list ${messages.length === 0 ? "empty" : ""}`}
          aria-live="polite"
        >
          {messages.length === 0 && (
            <div className="empty-chat">
              <div className="brand-mark">
                <Icon name="spark" size={20} />
              </div>
              <h2>
                {activeConversation?.title === "New conversation"
                  ? "Start a conversation"
                  : "What can I help you find?"}
              </h2>
              <p>
                Ask a question to get started. Your conversations stay
                available in the selector during this session.
              </p>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              className={`message ${message.role}`}
              key={`${activeConversationId}-${index}`}
            >
              <div className="message-role">
                {message.role === "user" ? "You" : "RAG assistant"}
              </div>
              <p>{message.content}</p>
              {message.role === "assistant" && (
                <div className="message-actions">
                  <button
                    type="button"
                    onClick={() => void navigator.clipboard.writeText(message.content)}
                  >
                    <Icon name="copy" size={14} /> Copy
                  </button>
                </div>
              )}
            </div>
          ))}
          {isThinking && (
            <div className="message assistant staged-loading">
              <div className="loading-stage">
                <i /> Sending question to the API
              </div>
              <div className="loading-stage">
                <i /> Waiting for a response
              </div>
            </div>
          )}
        </div>

        {error && (
          <p className="api-feedback error chat-error" role="alert">
            {error}
          </p>
        )}

        <div className="composer">
          <label className="composer-scope">
            <Icon name="folder" size={14} />
            <span>{scope}</span>
          </label>
          <textarea
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                ask();
              }
            }}
            placeholder="Message your workspace..."
            aria-label="Message your workspace"
            rows={1}
          />
          <button
            className="button primary send-button"
            onClick={ask}
            disabled={isThinking || !query.trim()}
            aria-label="Send message"
          >
            <Icon name="send" size={16} />
          </button>
          <small>Enter to send · Shift + Enter for a new line</small>
        </div>
      </section>
    </div>
  );
}

function SourceCard({ source }: { source: ChatSource }) {
  return (
    <article className="source-card">
      <div className="source-type">{source.type}</div>
      <div>
        <strong>{source.title}</strong>
        <span>
          {source.detail || "Source"}
          {source.page !== undefined ? ` · Page ${source.page}` : ""}
          {source.similarity !== undefined
            ? ` · ${source.similarity.toFixed(2)}`
            : ""}
        </span>
      </div>
    </article>
  );
}
