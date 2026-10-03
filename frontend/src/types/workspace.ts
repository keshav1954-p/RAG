export type Page =
  | "Overview"
  | "Chat"
  | "RAG Playground"
  | "Documents"
  | "Collections"
  | "History"
  | "Analytics"
  | "Settings";

export type IconName =
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

export type NavigationItem = { label: Page; icon: IconName };
