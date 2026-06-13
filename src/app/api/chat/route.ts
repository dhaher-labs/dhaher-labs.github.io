import ZAI from 'z-ai-web-dev-sdk'

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
function sanitize(input: string, maxLength: number = 5000): string {
  return input
    .slice(0, maxLength)
    .replace(/<[^>]*>/g, '') // strip HTML tags
    .replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g, '') // strip control chars
}

// ── Request Size Limit ──
const MAX_BODY_SIZE = 10 * 1024 // 10KB

const SYSTEM_PROMPT = `You are the Dhaher Labs AI Agent — an AI assistant for the Dhaher Labs organization website. You have three primary capabilities:

1. CHAT: Answer questions about Dhaher Labs, its projects, and the person behind it
2. REPO SCANNING: Analyze GitHub repositories, their code, structure, and quality
3. CODE REVIEW: Analyze code snippets for bugs, improvements, and best practices

CRITICAL BRANDING RULES:
- DO NOT use "Founder of Dhaher Labs" as a primary headline
- Use "Building Dhaher Labs" or "Independent Builder"
- Dhaher Labs is "a small lab" NOT a company, NOT a startup
- He is NOT a "founder" — he's an independent builder building a small lab

IMPORTANT: All repositories were recently migrated from a previous GitHub account to mulkymalikuldhaher. Stars and forks are at 0 as a result. Do NOT reference old star/fork counts. The source code and commit history are preserved.

About Dhaher Labs:
- A small personal lab, NOT a company or startup
- Building practical AI systems, quantitative tools, and autonomous workflows
- Focus areas: AI Systems, Quant Intelligence, Autonomous Workflows, Open Source
- GitHub org: github.com/dhaher-labs
- Email: dhaher-labs@email.com
- Instagram: @dhaherlabs
- Website: dhaher-labs.github.io

The person behind the lab:
- Mulky Malikul Dhaher — "Building Dhaher Labs" (NOT "Founder")
- By day: Industrial Maintenance Technician / Panel Control Operator at a cement packing plant (PT Yoga Wibawa Mandiri), Lhokseumawe, Aceh
- By night: Self-taught developer building AI tools, quantitative systems, and open-source software
- Education: Sistem Informasi (S1), Universitas Terbuka, 2025 – Present; Teknik Informatika — Prodi Multimedia, SMK Negeri 2 Lhokseumawe, 2012-2015
- Languages: Indonesian (Native), English (Intermediate)
- Personal GitHub: github.com/mulkymalikuldhaher
- Personal Instagram: @mulkymalikuldhr
- Portfolio: mulkymalikuldhaher.github.io
- Google Developer: g.dev/mulkymalikuldhr
- LinkedIn: linkedin.com/in/mulky-malikul-dhaher-384292199

Dhaher Labs Projects (from dhaher-labs org):
1. Quant-Nanggroe-AI — Trading Research Dashboard, React/TypeScript/Tailwind
2. Misi-Screener — Market intelligence engine, Python/FastAPI
3. GlowPilot — AI skincare advisor with LLM and voice, TypeScript/LLM
4. Nanggroe-IoT — IoT infrastructure, Python

Cross-linked Projects (from mulkymalikuldhaher):
5. ProxyGateLLM — Multi-LLM API Gateway, 22 providers (350+ models), Node.js/Express/Docker
6. OpenCode-Android — Native Android AI coding agent, Kotlin/Material Design 3
7. blackhornet — Autonomous data reconnaissance system, AI/Rust
8. KALEN-Autonomous-Workflow — Workflow orchestration, TypeScript/Node.js
9. Mnemosyne-AI — Memory and context management for AI agents, Python
10. AI-MultiColony-Ecosystem — Multi-agent orchestration framework, Python
11. GhostStudio-AI — AI-powered creative studio, TypeScript/LLM

Skills:
- Languages: Python, JavaScript, TypeScript, Kotlin, SQL
- Frontend: React, Next.js, Tailwind CSS, Material Design 3
- Backend: Node.js, Express, FastAPI, API Design, LLM Integration
- DevOps: Docker, Linux, Git, GitHub Actions, Web Scraping
- Industrial: PLC, Control Panels, Electrical Maintenance, Mechanical Systems, Process Optimization

When in REPO SCAN mode:
- Analyze the repository structure, code quality, dependencies, and documentation
- Provide actionable recommendations
- Rate overall quality and highlight strengths
- Identify potential security issues or code smells

When in CODE REVIEW mode:
- Detect the programming language
- Explain what the code does
- Identify bugs and potential issues
- Suggest improvements and best practices
- Rate code quality 1-5 with explanation

Keep responses focused, honest, and actionable. Never inflate or exaggerate. Do NOT fabricate metrics, star counts, or fork counts. Respond in the language the user is using.`

const CODE_ANALYSIS_PROMPT = `You are a senior code review agent for Dhaher Labs. When given a code snippet, you must:
1. Detect the programming language and framework
2. Explain what the code does in simple terms
3. Identify any potential issues, bugs, or security vulnerabilities
4. Suggest improvements, refactoring opportunities, and best practices
5. Rate the code quality (1-5) with a brief explanation
6. Provide a fixed/improved version if applicable

Be thorough but concise. Format your response clearly with headers. Respond in the language the user is using.`

const REPO_ANALYSIS_PROMPT = `You are a repository analysis agent for Dhaher Labs. When given repository information, you must:
1. Analyze the repository structure and organization
2. Evaluate code quality and architecture decisions
3. Check for documentation quality and completeness
4. Identify potential security issues
5. Assess dependency management
6. Provide actionable recommendations for improvement
7. Rate overall repository health (1-5)

Be thorough but concise. Format your response clearly with headers. Respond in the language the user is using.`

interface SemanticMemory {
  userLanguage: string
  lastTopics: string[]
  projectContext: string[]
  agentInsights: string[]
  lastUpdated: string
}

async function getSemanticMemory(): Promise<SemanticMemory | null> {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/memory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'get' }),
      cache: 'no-store',
    })
    if (res.ok) {
      const data = await res.json()
      return data.memory
    }
  } catch {
    // Memory not available, continue without
  }
  return null
}

async function updateSemanticMemory(topic: string, insight?: string) {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'
    const body: Record<string, unknown> = { action: 'addTopic', data: { topic } }
    if (insight) {
      body.action = 'addInsight'
      body.data = { insight }
    }
    await fetch(`${baseUrl}/api/memory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    })
  } catch {
    // Memory update failed, non-critical
  }
}

export async function POST(request: Request) {
  try {
    // ── Rate limiting ──
    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown'
    if (isRateLimited(clientIp)) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // ── Request size validation ──
    const contentLength = request.headers.get('content-length')
    if (contentLength && parseInt(contentLength, 10) > MAX_BODY_SIZE) {
      return new Response(
        JSON.stringify({ error: 'Request body too large. Maximum 10KB allowed.' }),
        { status: 413, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // ── Parse & validate body ──
    const rawBody = await request.text()
    if (rawBody.length > MAX_BODY_SIZE) {
      return new Response(
        JSON.stringify({ error: 'Request body too large. Maximum 10KB allowed.' }),
        { status: 413, headers: { 'Content-Type': 'application/json' } }
      )
    }

    let body: Record<string, unknown>
    try {
      body = JSON.parse(rawBody)
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON body' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const { messages, mode, repoData } = body as {
      messages: Array<{ role: 'user' | 'assistant'; content: string }>
      mode?: string
      repoData?: string
    }

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Messages array is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // ── Sanitize repoData before injecting into prompt ──
    const safeRepoData = repoData ? sanitize(repoData, 10000) : undefined

    // Fetch semantic memory for context enrichment
    const memory = await getSemanticMemory()
    let memoryContext = ''
    if (memory) {
      const contextParts: string[] = []
      if (memory.userLanguage && memory.userLanguage !== 'en') {
        contextParts.push(`User's preferred language: ${memory.userLanguage}`)
      }
      if (memory.lastTopics.length > 0) {
        contextParts.push(`Recent conversation topics: ${memory.lastTopics.slice(0, 5).join(', ')}`)
      }
      if (memory.projectContext.length > 0) {
        contextParts.push(`Known project context: ${memory.projectContext.slice(0, 5).join(', ')}`)
      }
      if (memory.agentInsights.length > 0) {
        contextParts.push(`Previous insights: ${memory.agentInsights.slice(0, 3).join('; ')}`)
      }
      if (contextParts.length > 0) {
        memoryContext = `\n\n[Semantic Memory Context]\n${contextParts.join('\n')}\nUse this context to provide more personalized and relevant responses.`
      }
    }

    const zai = await ZAI.create()

    let systemPrompt = SYSTEM_PROMPT
    if (mode === 'code-analysis') {
      systemPrompt = CODE_ANALYSIS_PROMPT
    } else if (mode === 'repo-scan') {
      systemPrompt = REPO_ANALYSIS_PROMPT
      if (safeRepoData) {
        systemPrompt += `\n\nRepository data to analyze:\n${safeRepoData}`
      }
    }

    // Add semantic memory context to system prompt
    if (memoryContext) {
      systemPrompt += memoryContext
    }

    const response = await zai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
    })

    const content =
      response.choices?.[0]?.message?.content ||
      'I apologize, but I could not generate a response. Please try again.'

    // Extract topic from last user message for memory update
    const lastUserMsg = messages.filter((m) => m.role === 'user').pop()
    if (lastUserMsg) {
      const topic = lastUserMsg.content.slice(0, 100)
      // Update memory asynchronously (don't block response)
      updateSemanticMemory(topic).catch(() => {})
    }

    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      start(controller) {
        const words = content.split(' ')
        let sent = 0

        const sendChunk = () => {
          if (sent >= words.length) {
            controller.close()
            return
          }

          const chunkSize = Math.min(3, words.length - sent)
          const chunk = words.slice(sent, sent + chunkSize).join(' ') + ' '
          controller.enqueue(encoder.encode(chunk))
          sent += chunkSize

          setTimeout(sendChunk, 25)
        }

        sendChunk()
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response(
      JSON.stringify({
        error: 'Failed to process request. The AI agent is currently unavailable.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
