import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { loginUser } from "../api/authApi";
import { askQuestion } from "../api/chatApi";
import { getApiHealth } from "../api/healthApi";
import {
  uploadDocument as uploadDocumentRequest,
  type UploadResponse,
} from "../api/uploadApi";
import type { ChatMessage, Conversation } from "../types/chat";
import type { Page } from "../types/workspace";
import { WorkspaceContext } from "./workspaceContext";

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "An unexpected error occurred.";
}

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(
    () => localStorage.getItem("rag-auth") === "true",
  );
  const [page, setPage] = useState<Page>("Overview");
  const [dark, setDark] = useState(
    () => localStorage.getItem("rag-theme") !== "light",
  );
  const [query, setQuery] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);
  const [isThinking, setIsThinking] = useState(false);
  const [chatError, setChatError] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [apiHealth, setApiHealth] = useState<
    "checking" | "healthy" | "unavailable"
  >("checking");
  const [scope, setScope] = useState("Entire Knowledge Base");
  const [collection, setCollection] = useState("All collections");
  const messages =
    conversations.find(
      (conversation) => conversation.id === activeConversationId,
    )?.messages ?? [];

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("rag-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    let active = true;
    getApiHealth()
      .then((response) => {
        if (active) {
          setApiHealth(response.status === "healthy" ? "healthy" : "unavailable");
        }
      })
      .catch(() => {
        if (active) setApiHealth("unavailable");
      });
    return () => {
      active = false;
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    if (isSigningIn) return;
    setIsSigningIn(true);
    setAuthError("");
    try {
      await loginUser({ email, password });
      localStorage.setItem("rag-auth", "true");
      setAuthenticated(true);
    } catch (error) {
      setAuthError(getErrorMessage(error));
    } finally {
      setIsSigningIn(false);
    }
  }, [isSigningIn]);

  const ask = useCallback(async () => {
    const prompt = query.trim();
    if (!prompt || isThinking) return;

    const conversationId = activeConversationId ?? crypto.randomUUID();
    if (!activeConversationId) setActiveConversationId(conversationId);
    setQuery("");
    setChatError("");
    setConversations((current) => {
      const conversation = current.find((item) => item.id === conversationId);
      if (!conversation) {
        return [
          ...current,
          {
            id: conversationId,
            title: prompt,
            messages: [{ role: "user", content: prompt }],
          },
        ];
      }
      return current.map((item) =>
        item.id === conversationId
          ? {
              ...item,
              title: item.title === "New conversation" ? prompt : item.title,
              messages: [...item.messages, { role: "user", content: prompt }],
            }
          : item,
      );
    });
    setIsThinking(true);
    try {
      const response = await askQuestion(prompt);
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: response.answer ?? response.message,
      };
      if (response.sources) assistantMessage.sources = response.sources;
      if (response.retrieval) assistantMessage.retrieval = response.retrieval;
      setConversations((current) =>
        current.map((item) =>
          item.id === conversationId
            ? { ...item, messages: [...item.messages, assistantMessage] }
            : item,
        ),
      );
    } catch (error) {
      setChatError(getErrorMessage(error));
    } finally {
      setIsThinking(false);
    }
  }, [activeConversationId, isThinking, query]);

  const uploadFile = useCallback(async (file: File) => {
    if (isUploading) return;
    setIsUploading(true);
    setUploadError("");
    setUploadMessage("");
    try {
      const response: UploadResponse = await uploadDocumentRequest(file);
      setUploadMessage(`${response.message}: ${response.filename}`);
    } catch (error) {
      setUploadError(getErrorMessage(error));
    } finally {
      setIsUploading(false);
    }
  }, [isUploading]);

  const newConversation = useCallback(() => {
    const id = crypto.randomUUID();
    setConversations((current) => {
      const emptyConversationCount = current.filter(
        (conversation) =>
          conversation.title === "New conversation" ||
          /^New conversation \d+$/.test(conversation.title),
      ).length;
      const title =
        emptyConversationCount === 0
          ? "New conversation"
          : `New conversation ${emptyConversationCount + 1}`;
      return [...current, { id, title, messages: [] }];
    });
    setActiveConversationId(id);
    setQuery("");
    setChatError("");
  }, []);

  const selectConversation = useCallback(
    (id: string) => {
      if (conversations.some((conversation) => conversation.id === id)) {
        setActiveConversationId(id);
        setQuery("");
        setChatError("");
      }
    },
    [conversations],
  );

  return (
    <WorkspaceContext.Provider
      value={{
        authenticated,
        signIn,
        isSigningIn,
        authError,
        page,
        setPage,
        dark,
        setDark,
        query,
        setQuery,
        messages,
        conversations,
        activeConversationId,
        selectConversation,
        isThinking,
        chatError,
        scope,
        setScope,
        collection,
        setCollection,
        ask,
        newConversation,
        uploadFile,
        isUploading,
        uploadMessage,
        uploadError,
        apiHealth,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}
