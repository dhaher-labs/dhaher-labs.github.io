import { NextRequest, NextResponse } from 'next/server'

// ── Rate Limiter (in-memory, 10 req/min per IP) ──
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW = 60_000 // 1 minute
const RATE_LIMIT_MAX = 10

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return false
  }
  entry.count++
  return entry.count > RATE_LIMIT_MAX
}

// ── Input Sanitization ──
function sanitize(input: string, maxLength: number = 500): string {
  return input
    .slice(0, maxLength)
    .replace(/<[^>]*>/g, '') // strip HTML tags
    .replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g, '') // strip control chars
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

// ── Valid actions whitelist ──
const VALID_ACTIONS = ['get', 'update', 'addTopic', 'addInsight', 'addContext', 'setLanguage'] as const
type ValidAction = (typeof VALID_ACTIONS)[number]

interface SemanticMemory {
  userLanguage: string
  lastTopics: string[]
  projectContext: string[]
  agentInsights: string[]
  lastUpdated: string
}

const DEFAULT_MEMORY: SemanticMemory = {
  userLanguage: 'en',
  lastTopics: [],
  projectContext: [],
  agentInsights: [],
  lastUpdated: new Date().toISOString(),
}

// In-memory store for server-side access (client uses localStorage)
let serverMemory: SemanticMemory = { ...DEFAULT_MEMORY }

export async function GET(request: NextRequest) {
  // ── Rate limiting ──
  const clientIp = getClientIp(request)
  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later.' },
      { status: 429 }
    )
  }

  return NextResponse.json({
    memory: serverMemory,
    storageKey: 'dhaher-semantic-memory',
  })
}

export async function POST(request: NextRequest) {
  try {
    // ── Rate limiting ──
    const clientIp = getClientIp(request)
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      )
    }

    // ── Request size validation ──
    const contentLength = request.headers.get('content-length')
    if (contentLength && parseInt(contentLength, 10) > 10 * 1024) {
      return NextResponse.json(
        { error: 'Request body too large. Maximum 10KB allowed.' },
        { status: 413 }
      )
    }

    const body = await request.json()
    const { action, data } = body as {
      action: string
      data?: Record<string, unknown>
    }

    // ── Validate action ──
    if (!action || typeof action !== 'string' || !VALID_ACTIONS.includes(action as ValidAction)) {
      return NextResponse.json(
        { error: `Invalid action. Must be one of: ${VALID_ACTIONS.join(', ')}` },
        { status: 400 }
      )
    }

    const validAction = action as ValidAction

    switch (validAction) {
      case 'get':
        return NextResponse.json({
          memory: serverMemory,
          storageKey: 'dhaher-semantic-memory',
        })

      case 'update':
        if (data) {
          // Validate and sanitize update fields
          const sanitizedUpdate: Partial<SemanticMemory> = {}
          if (typeof data.userLanguage === 'string') {
            sanitizedUpdate.userLanguage = sanitize(data.userLanguage, 10)
          }
          if (Array.isArray(data.lastTopics)) {
            sanitizedUpdate.lastTopics = (data.lastTopics as string[])
              .filter((t: unknown) => typeof t === 'string')
              .map((t: string) => sanitize(t, 200))
              .slice(0, 10)
          }
          if (Array.isArray(data.projectContext)) {
            sanitizedUpdate.projectContext = (data.projectContext as string[])
              .filter((c: unknown) => typeof c === 'string')
              .map((c: string) => sanitize(c, 500))
              .slice(0, 15)
          }
          if (Array.isArray(data.agentInsights)) {
            sanitizedUpdate.agentInsights = (data.agentInsights as string[])
              .filter((i: unknown) => typeof i === 'string')
              .map((i: string) => sanitize(i, 500))
              .slice(0, 20)
          }
          serverMemory = {
            ...serverMemory,
            ...sanitizedUpdate,
            lastUpdated: new Date().toISOString(),
          }
        }
        return NextResponse.json({ success: true, memory: serverMemory })

      case 'addTopic': {
        if (!data || typeof data.topic !== 'string') {
          return NextResponse.json(
            { error: 'Topic must be a string' },
            { status: 400 }
          )
        }
        const topic = sanitize(data.topic as string, 200)
        serverMemory.lastTopics = [
          topic,
          ...serverMemory.lastTopics.filter((t) => t !== topic),
        ].slice(0, 10)
        serverMemory.lastUpdated = new Date().toISOString()
        return NextResponse.json({ success: true, memory: serverMemory })
      }

      case 'addInsight': {
        if (!data || typeof data.insight !== 'string') {
          return NextResponse.json(
            { error: 'Insight must be a string' },
            { status: 400 }
          )
        }
        const insight = sanitize(data.insight as string, 500)
        serverMemory.agentInsights = [
          insight,
          ...serverMemory.agentInsights.filter((i) => i !== insight),
        ].slice(0, 20)
        serverMemory.lastUpdated = new Date().toISOString()
        return NextResponse.json({ success: true, memory: serverMemory })
      }

      case 'addContext': {
        if (!data || typeof data.context !== 'string') {
          return NextResponse.json(
            { error: 'Context must be a string' },
            { status: 400 }
          )
        }
        const ctx = sanitize(data.context as string, 500)
        serverMemory.projectContext = [
          ctx,
          ...serverMemory.projectContext.filter((c) => c !== ctx),
        ].slice(0, 15)
        serverMemory.lastUpdated = new Date().toISOString()
        return NextResponse.json({ success: true, memory: serverMemory })
      }

      case 'setLanguage': {
        if (!data || typeof data.language !== 'string') {
          return NextResponse.json(
            { error: 'Language must be a string' },
            { status: 400 }
          )
        }
        const lang = sanitize(data.language as string, 10)
        serverMemory.userLanguage = lang
        serverMemory.lastUpdated = new Date().toISOString()
        return NextResponse.json({ success: true, memory: serverMemory })
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Memory API error:', error)
    return NextResponse.json(
      { error: 'Failed to process memory request' },
      { status: 500 }
    )
  }
}
