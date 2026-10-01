const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

export type ProcessingStage = 'Uploading' | 'Extracting text' | 'Chunking' | 'Generating embeddings' | 'Indexing' | 'Ready'
export type Document = { id: string; name: string; type: string; size: string; updated: string; collection: string; status: 'Indexed' | 'Indexing'; pageCount?: number; chunks?: number; processingStage?: ProcessingStage }
export type Source = { id: string; title: string; type: string; detail?: string; page?: number; similarity?: number; chunk?: string; metadata?: string }
export type RetrievalDetails = { query: string; chunks: { label: string; similarity: number; text: string }[]; context: string; latencyMs: number }
export type ChatMessage = { role: 'user' | 'assistant'; content: string; sources?: Source[]; retrieval?: RetrievalDetails }

const sources: Source[] = [
  { id: '1', title: 'Product handbook.pdf', type: 'PDF', detail: 'Product · Updated 2h ago', page: 12, similarity: 0.89, chunk: 'Workspace owners can assign members to collections and manage trusted sources.', metadata: 'Product · section 4.2' },
  { id: '2', title: 'Q3 strategy notes.docx', type: 'DOCX', detail: 'Company · Updated yesterday', page: 7, similarity: 0.84, chunk: 'The next milestone prioritizes collection-level permissions and faster ingestion.', metadata: 'Company · strategy' },
  { id: '3', title: 'Customer interview synthesis.md', type: 'MD', detail: 'Research · Updated Sep 18', page: 4, similarity: 0.79, chunk: 'Customers want more visibility into how answers are sourced.', metadata: 'Research · interviews' },
]

export async function askQuestion(question: string): Promise<ChatMessage> {
  await new Promise((resolve) => window.setTimeout(resolve, 700))
  const lower = question.toLowerCase()
  const content = lower.includes('customer')
    ? 'The latest feedback is centered on faster setup, clearer workspace permissions, and better visibility into how answers are sourced [1]. Customers consistently value the assistant’s speed, but want more controls for curating trusted knowledge.'
    : lower.includes('on-call')
      ? 'The on-call process starts with the primary responder acknowledging an alert within 10 minutes. If there is no acknowledgement, it escalates to the secondary and then the engineering lead [1].'
      : 'Based on the product and strategy documents, the team is focused on making knowledge easier to discover, improving answer confidence, and giving workspace owners better controls over trusted sources [1][2].'
  return {
    role: 'assistant',
    content,
    sources,
    retrieval: {
      query: question.trim(),
      chunks: sources.map((source, index) => ({ label: `Chunk ${index + 1}`, similarity: source.similarity ?? 0.8, text: source.chunk ?? '' })),
      context: sources.map((source) => source.chunk).join(' '),
      latencyMs: 420,
    },
  }
}

export async function uploadDocument(file: File, onStage?: (stage: ProcessingStage) => void): Promise<Document> {
  const stages: ProcessingStage[] = ['Uploading', 'Extracting text', 'Chunking', 'Generating embeddings', 'Indexing', 'Ready']
  for (const stage of stages) {
    onStage?.(stage)
    await new Promise((resolve) => window.setTimeout(resolve, stage === 'Ready' ? 150 : 300))
  }
  return { id: crypto.randomUUID(), name: file.name, type: file.name.split('.').pop()?.toUpperCase() ?? 'FILE', size: `${Math.max(1, Math.round(file.size / 1024))} KB`, updated: 'Just now', collection: 'Unsorted', status: 'Indexed', processingStage: 'Ready' }
}

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, { ...init, headers: { 'Content-Type': 'application/json', ...init?.headers } })
  if (!response.ok) throw new Error(`API request failed: ${response.status}`)
  return response.json() as Promise<T>
}
