import { NextRequest, NextResponse } from 'next/server'
import { articles as staticArticles } from '@/data/articles'
import fs from 'fs'
import path from 'path'

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
function sanitize(input: string, maxLength: number = 200): string {
  return input
    .slice(0, maxLength)
    .replace(/<[^>]*>/g, '') // strip HTML tags
    .replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g, '') // strip control chars
}

// ── Article Cap ──
const MAX_ARTICLES = 50

const DATA_DIR = path.join(process.cwd(), 'src', 'data')
const GENERATED_FILE = path.join(DATA_DIR, 'generated-articles.json')

interface GeneratedArticle {
  id: string
  title: string
  summary: string
  content: string[]
  date: string
  category: string
  readTime: string
  featured: boolean
  tags: string[]
  aiGenerated: boolean
}

function getGeneratedArticles(): GeneratedArticle[] {
  try {
    if (fs.existsSync(GENERATED_FILE)) {
      const data = fs.readFileSync(GENERATED_FILE, 'utf-8')
      return JSON.parse(data)
    }
  } catch {
    // ignore read errors
  }
  return []
}

function saveGeneratedArticles(articleList: GeneratedArticle[]) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    // Cap at MAX_ARTICLES
    const capped = articleList.slice(0, MAX_ARTICLES)
    fs.writeFileSync(GENERATED_FILE, JSON.stringify(capped, null, 2))
  } catch {
    // ignore write errors
  }
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

export async function GET(request: NextRequest) {
  // ── Rate limiting ──
  const clientIp = getClientIp(request)
  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later.' },
      { status: 429 }
    )
  }

  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  const generated = getGeneratedArticles()
  const allArticles = [...staticArticles, ...generated]

  let filtered = allArticles
  if (category && category !== 'All') {
    filtered = filtered.filter((a) => a.category === category)
  }

  return NextResponse.json({ articles: filtered })
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

    // ── Article count cap ──
    const existing = getGeneratedArticles()
    if (existing.length >= MAX_ARTICLES) {
      return NextResponse.json(
        { error: `Maximum article limit reached (${MAX_ARTICLES}). Cannot generate more articles.` },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { topic, category } = body as { topic?: string; category?: string }

    if (!topic || typeof topic !== 'string') {
      return NextResponse.json(
        { error: 'Topic is required and must be a string' },
        { status: 400 }
      )
    }

    // ── Sanitize inputs ──
    const safeTopic = sanitize(topic, 200)
    const safeCategory = category ? sanitize(category, 50) : 'AI'

    const ZAI = (await import('z-ai-web-dev-sdk')).default
    const zai = await ZAI.create()

    const prompt = `Write a technical article about: "${safeTopic}"

Category: ${safeCategory}

Return ONLY a valid JSON object with this exact structure (no markdown, no code fences):
{
  "id": "slug-version-of-title",
  "title": "Article Title",
  "summary": "2-3 sentence summary",
  "content": ["paragraph1", "paragraph2", "paragraph3", "paragraph4", "paragraph5"],
  "category": "${safeCategory}",
  "readTime": "X min read",
  "featured": false,
  "tags": ["tag1", "tag2", "tag3"],
  "aiGenerated": true
}

The article should be:
- Factually accurate and honest
- Practical and useful for developers
- 5 paragraphs in the content array
- Each paragraph should be 3-5 sentences
- No hype or exaggeration
- Today's date for the date field`

    const response = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'You are a technical writer for Dhaher Labs. Write honest, practical, factually accurate articles. Return only valid JSON.',
        },
        { role: 'user', content: prompt },
      ],
    })

    const content =
      response.choices?.[0]?.message?.content || ''

    let article: GeneratedArticle
    try {
      // Try to parse JSON from the response, handling potential markdown fences
      const jsonStr = content
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim()
      article = JSON.parse(jsonStr)
    } catch {
      return NextResponse.json(
        { error: 'Failed to generate article. Please try again.' },
        { status: 500 }
      )
    }

    // Add date
    article.date = new Date().toISOString().split('T')[0]
    article.aiGenerated = true
    article.featured = false
    // Sanitize article fields
    article.id = sanitize(article.id, 100)
    article.title = sanitize(article.title, 200)
    article.summary = sanitize(article.summary, 500)
    article.category = sanitize(article.category, 50)

    // Save to generated articles file (with cap)
    existing.unshift(article)
    saveGeneratedArticles(existing)

    return NextResponse.json({ article })
  } catch (error) {
    console.error('Articles API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate article' },
      { status: 500 }
    )
  }
}
