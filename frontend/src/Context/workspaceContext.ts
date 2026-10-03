import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { ChatMessage, Conversation } from "../types/chat";
import type { Page } from "../types/workspace";

export type WorkspaceContextValue = {
  authenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  isSigningIn: boolean;
  authError: string;
  page: Page;
  setPage: Dispatch<SetStateAction<Page>>;
  dark: boolean;
  setDark: Dispatch<SetStateAction<boolean>>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  messages: ChatMessage[];
  conversations: Conversation[];
  activeConversationId: string | null;
  selectConversation: (id: string) => void;
  isThinking: boolean;
  chatError: string;
  scope: string;
  setScope: Dispatch<SetStateAction<string>>;
  collection: string;
  setCollection: Dispatch<SetStateAction<string>>;
  ask: () => Promise<void>;
  newConversation: () => void;
  uploadFile: (file: File) => Promise<void>;
  isUploading: boolean;
  uploadMessage: string;
  uploadError: string;
  apiHealth: "checking" | "healthy" | "unavailable";
};

export const WorkspaceContext = createContext<WorkspaceContextValue | null>(
  null,
);
