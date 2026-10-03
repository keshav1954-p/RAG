import type { Document } from "../types/document";
import type { NavigationItem } from "../types/workspace";

export const documents: Document[] = [
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

export const navigationItems: NavigationItem[] = [
  { label: "Overview", icon: "grid" },
  { label: "Chat", icon: "chat" },
  { label: "RAG Playground", icon: "spark" },
  { label: "Documents", icon: "file" },
  { label: "Collections", icon: "folder" },
  { label: "History", icon: "clock" },
  { label: "Analytics", icon: "chart" },
];
