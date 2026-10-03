import { ChatPage } from "./Pages/ChatPage";
import { DocumentsPage } from "./Pages/DocumentsPage";
import { LoginPage } from "./Pages/LoginPage";
import { OverviewPage } from "./Pages/OverviewPage";
import { PlaceholderPage } from "./Pages/PlaceholderPage";
import { PlaygroundPage } from "./Pages/PlaygroundPage";
import { HistoryPage } from "./Pages/HistoryPage";
import { WorkspaceLayout } from "./Layouts/WorkspaceLayout";
import { useWorkspace } from "./hooks/useWorkspace";

function App() {
  const {
    authenticated,
    signIn,
    isSigningIn,
    authError,
    page,
    setPage,
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
  } = useWorkspace();

  if (!authenticated) {
    return (
      <LoginPage
        onSignIn={signIn}
        isSigningIn={isSigningIn}
        error={authError}
      />
    );
  }

  return (
    <WorkspaceLayout>
      {page === "Overview" && (
        <OverviewPage
          onNavigate={setPage}
          onAsk={(text) => {
            setPage("Chat");
            setQuery(text);
          }}
        />
      )}
      {page === "Chat" && (
        <ChatPage
          messages={messages}
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={selectConversation}
          error={chatError}
          query={query}
          setQuery={setQuery}
          isThinking={isThinking}
          ask={ask}
          scope={scope}
          setScope={setScope}
          onNewConversation={newConversation}
        />
      )}
      {page === "RAG Playground" && <PlaygroundPage />}
      {page === "Documents" && (
        <DocumentsPage
          collection={collection}
          setCollection={setCollection}
          onUpload={uploadFile}
          isUploading={isUploading}
          uploadMessage={uploadMessage}
          uploadError={uploadError}
        />
      )}
      {page === "Collections" && (
        <PlaceholderPage
          title="Collections"
          description="Organize trusted knowledge by team and topic."
        />
      )}
      {page === "History" && (
        <HistoryPage />
      )}
      {page === "Analytics" && (
        <PlaceholderPage
          title="Analytics"
          description="Understand how your team searches."
        />
      )}
      {page === "Settings" && (
        <PlaceholderPage
          title="Settings"
          description="Manage workspace preferences and appearance."
        />
      )}
    </WorkspaceLayout>
  );
}

export default App;
