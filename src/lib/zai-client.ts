/**
 * Browser-compatible ZAI API client for static deployment (GitHub Pages).
 * Replaces the server-side z-ai-web-dev-sdk which requires Node.js fs/path/os.
 * Makes direct fetch calls to the ZAI chat completions API.
 */

const ZAI_BASE_URL = process.env.NEXT_PUBLIC_ZAI_BASE_URL || 'https://internal-api.z.ai/v1'
const ZAI_API_KEY = process.env.NEXT_PUBLIC_ZAI_API_KEY || 'Z.ai'
const ZAI_CHAT_ID = process.env.NEXT_PUBLIC_ZAI_CHAT_ID || 'chat-56496d93-9f2f-4257-87d8-9c1f8bc85f8a'
const ZAI_TOKEN = process.env.NEXT_PUBLIC_ZAI_TOKEN || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMWIyOGZmYWItYmI1OC00MGM3LWJhMjctYTIwZGZiZmQwMDdhIiwiY2hhdF9pZCI6ImNoYXQtNTY0OTZkOTMtOWYyZi00MjU3LTg3ZDgtOWMxZjhiYzg1ZjhhIiwicGxhdGZvcm0iOiJ6YWkifQ.AYNovVNpX5ieus9RL5uLNq1G21g7UseY5ZFZv5x4hUM'
const ZAI_USER_ID = process.env.NEXT_PUBLIC_ZAI_USER_ID || '1b28ffab-bb58-40c7-ba27-a20dfbfd007a'

interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface ChatCompletionResponse {
  choices?: Array<{
    message?: {
      content?: string
    }
  }>
}

export async function createChatCompletion(messages: ChatMessage[]): Promise<string> {
  const url = `${ZAI_BASE_URL}/chat/completions`

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ZAI_API_KEY}`,
    'X-Z-AI-From': 'Z',
  }

  if (ZAI_CHAT_ID) {
    headers['X-Chat-Id'] = ZAI_CHAT_ID
  }
  if (ZAI_USER_ID) {
    headers['X-User-Id'] = ZAI_USER_ID
  }
  if (ZAI_TOKEN) {
    headers['X-Token'] = ZAI_TOKEN
  }

  const requestBody = {
    messages,
    thinking: { type: 'disabled' as const },
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(requestBody),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`ZAI API error (${response.status}): ${errorBody}`)
  }

  const data: ChatCompletionResponse = await response.json()
  return data.choices?.[0]?.message?.content || ''
}
