import { useEffect, useState, type ReactNode } from "react";
import { Icon } from "../components/Icon";
import { useWorkspace } from "../hooks/useWorkspace";
import type { Page } from "../types/workspace";
import { navigationItems } from "../utils/workspaceData";

export function WorkspaceLayout({ children }: { children: ReactNode }) {
  const {
    page,
    setPage,
    dark,
    setDark,
    setCollection,
    apiHealth,
  } = useWorkspace();
  const [mobileNav, setMobileNav] = useState(false);
  const [palette, setPalette] = useState(false);
  const [notifications, setNotifications] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPalette(true);
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "n") {
        event.preventDefault();
        setPage("Chat");
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "u") {
        event.preventDefault();
        setPage("Documents");
      }
      if ((event.metaKey || event.ctrlKey) && event.key === "/") {
        event.preventDefault();
        setPage("Chat");
        window.setTimeout(
          () =>
            document
              .querySelector<HTMLTextAreaElement>(".composer textarea")
              ?.focus(),
          0,
        );
      }
      if (event.key === "Escape") {
        setPalette(false);
        setNotifications(false);
        setMobileNav(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setPage]);

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
          {navigationItems.map((item) => (
            <button
              key={item.label}
              className={`nav-item ${page === item.label ? "active" : ""}`}
              onClick={() => navigate(item.label)}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
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
            <span
              className={`api-health ${apiHealth}`}
              role="status"
              aria-live="polite"
              title={
                apiHealth === "healthy"
                  ? "Backend API is healthy"
                  : apiHealth === "unavailable"
                    ? "Backend API is unavailable"
                    : "Checking backend API"
              }
            >
              <i />
              {apiHealth === "healthy"
                ? "API connected"
                : apiHealth === "unavailable"
                  ? "API unavailable"
                  : "Checking API"}
            </span>
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
        <div
          className={`page-container ${page === "Chat" ? "chat-page-container" : ""}`}
        >
          {children}
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
                  const target = navigationItems.find((n) =>
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
            {navigationItems.map((n) => (
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
