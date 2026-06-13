# DOCS.md — Dhaher Labs Ecosystem Documentation

> **Version:** 3.0.0
> **Last Updated:** 2025-06-13
> **Source of Truth:** `brand.config.json`

---

## Table of Contents

1. [Ecosystem Overview](#1-ecosystem-overview)
2. [Portfolio Website (mulkymalikuldhaher.github.io)](#2-portfolio-website)
3. [Dhaher Labs Website (dhaher-labs.github.io)](#3-dhaher-labs-website)
4. [AI Agent Chatbot System](#4-ai-agent-chatbot-system)
5. [Auto-Fetch GitHub Repos System](#5-auto-fetch-github-repos-system)
6. [Multi-Language System](#6-multi-language-system)
7. [Theme System](#7-theme-system)
8. [Glassmorphic UI Design System](#8-glassmorphic-ui-design-system)
9. [Responsive Breakpoints](#9-responsive-breakpoints)
10. [API Routes Documentation](#10-api-routes-documentation)
11. [Cross-Site Linking](#11-cross-site-linking)
12. [Deployment](#12-deployment)
13. [Brand Guidelines](#13-brand-guidelines)
14. [Repository Taxonomy](#14-repository-taxonomy)
15. [Environment Variables](#15-environment-variables)
16. [Build and Deploy Commands](#16-build-and-deploy-commands)

---

## 1. Ecosystem Overview

The Dhaher Labs ecosystem is a cohesive digital presence consisting of two websites, two GitHub profile READMEs, auto-sync workflows, and a shared configuration system. Everything is driven by a single source of truth: `brand.config.json`.

### Architecture Diagram

```
dhaher-labs-ecosystem/
├── brand.config.json              # SHARED SOURCE OF TRUTH (v3.0.0)
│
├── Portfolio Website              # → mulkymalikuldhaher.github.io
│   └── Next.js 16 + TypeScript + Tailwind CSS 4 + Framer Motion
│   └── 7 Sections + Navbar + Footer + AI Chatbot
│
├── Dhaher Labs Website            # → dhaher-labs.github.io
│   └── Next.js 16 + TypeScript + Tailwind CSS 4 + Framer Motion
│   └── 7 Sections + Navbar + Footer + AI Chatbot
│
├── Personal Profile               # → mulkymalikuldhaher/mulkymalikuldhaher
│   ├── README.md (auto-generated)
│   ├── scripts/generate-readme.py
│   ├── .github/workflows/sync-profile.yml
│   └── assets/ (banner.png, profile.png, logo.png)
│
├── Organization Profile           # → dhaher-labs/.github
│   ├── profile/README.md (auto-generated)
│   ├── scripts/generate-org-readme.py
│   ├── .github/workflows/sync-org-profile.yml
│   └── assets/ (banner.png, banner-wide.png, logo.png)
│
└── CV                             # → Mulky_Malikul_Dhaher_CV.docx
```

### Key Principles

| Principle | Implementation |
|-----------|---------------|
| **Single Source of Truth** | `brand.config.json` drives all outputs — profile READMEs, website, chatbot KB, CV |
| **Honest Positioning** | "Building Dhaher Labs" NOT "Founder"; "small lab" NOT "company" |
| **Static-First** | Both sites deploy as static exports to GitHub Pages |
| **Progressive Enhancement** | Core features work offline; API mode is optional enhancement |
| **Real Metrics Only** | Star/fork counts come from live GitHub data; no inflated claims |

---

## 2. Portfolio Website

**URL:** `mulkymalikuldhaher.github.io`
**Source:** `dhaher-brand-system-v2/website/`
**Purpose:** Personal portfolio for Mulky Malikul Dhaher — industrial technician, self-taught developer, and independent builder.

### 2.1 Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16.1.1+ | React framework with App Router |
| React | 19.0.0 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Utility-first styling |
| Framer Motion | 12.23.2+ | Animations and transitions |
| shadcn/ui | latest | UI component primitives (Radix-based) |
| Lucide React | 0.525.0+ | Icon library |
| z-ai-web-dev-sdk | 0.0.17 | AI chat API integration |
| next-intl | 4.3.4 | Internationalization |
| next-themes | 0.4.6 | Theme management (day/night) |
| Zustand | 5.0.6 | Client-side state management |
| react-markdown | 10.1.0 | Markdown rendering in chat |
| react-syntax-highlighter | 15.6.1 | Code highlighting in chat |

### 2.2 Project Structure

```
website/
├── public/
│   ├── logo.svg              # Favicon and brand mark
│   ├── banner.png            # Hero background image
│   └── robots.txt            # Search engine directives
│
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout (fonts, metadata, theme)
│   │   ├── page.tsx          # Main page (assembles all sections)
│   │   ├── globals.css       # CSS variables, animations, scrollbar
│   │   └── api/
│   │       └── chat/
│   │           └── route.ts  # LLM chat endpoint (z-ai-web-dev-sdk)
│   │
│   ├── components/
│   │   ├── hero-section.tsx          # Section 1: Full-screen hero
│   │   ├── about-section.tsx         # Section 2: Bio, work, education
│   │   ├── dhaher-labs-section.tsx   # Section 3: Lab focus areas
│   │   ├── projects-section.tsx      # Section 4: Project cards grid
│   │   ├── skills-section.tsx        # Section 5: Skills by category
│   │   ├── contact-section.tsx       # Section 6: Contact links
│   │   ├── footer-section.tsx        # Section 7: Footer
│   │   ├── chatbot.tsx               # AI chatbot overlay
│   │   ├── particle-canvas.tsx       # Canvas particle animation
│   │   └── ui/                       # shadcn/ui primitives (50+ components)
│   │
│   ├── hooks/
│   │   ├── use-mobile.ts             # Mobile detection hook
│   │   └── use-toast.ts             # Toast notification hook
│   │
│   └── lib/
│       ├── utils.ts                  # cn() utility, helpers
│       └── db.ts                     # Database client (Prisma)
│
├── .github/workflows/
│   └── deploy-pages.yml             # GitHub Pages auto-deploy
│
├── next.config.ts                    # Next.js configuration
├── tailwind.config.ts               # Tailwind theme customization
├── package.json                      # Dependencies and scripts
└── components.json                   # shadcn/ui configuration
```

### 2.3 Component Breakdown

#### Section 1: Hero (`hero-section.tsx`)

The full-screen hero section serves as the first impression. It features:

- **Animated gradient background** — CSS keyframe animation cycling through dark tones (`#1A1D20`, `#0F172A`, `#1E2126`) over 15 seconds
- **Particle canvas** — `<ParticleCanvas />` renders floating particles in Gold and Cyan with connection lines between nearby particles
- **Brand mark** — A square monogram "D" with Gold border and Gold text
- **Name display** — "MULKY MALIKUL" in white, "DHAHER" in Gold (#D9A441)
- **Subtitle** — "Industrial Maintenance Technician • Self-taught Developer • Building Dhaher Labs"
- **Tagline** — "AI • Quant • Autonomous Workflows • Open Source" in mono font with wide tracking
- **CTA buttons** — "View Projects" (Gold filled) and "GitHub" (Cyan outline)
- **Scroll indicator** — Animated arrow at bottom
- **Animations** — Staggered entrance with Framer Motion (0.2s–1.2s delays)

```typescript
// Key animation structure
<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
  {/* Logo mark: scale animation, 0.2s delay */}
  {/* Name: immediate entrance */}
  {/* Subtitle: 0.4s delay */}
  {/* Tagline: 0.6s delay */}
  {/* CTA: 0.8s delay, y: 10 → 0 */}
  {/* Scroll indicator: 1.2s delay */}
</motion.div>
```

#### Section 2: About (`about-section.tsx`)

Personal biography with three info cards:

- **Bio paragraphs** — Three paragraphs covering: day job (industrial maintenance), night work (self-taught developer), and Dhaher Labs philosophy ("small lab — not a company, not a startup")
- **Workplace card** — PT Yoga Wibawa Mandiri, Packing Plant Semen Padang, Lhokseumawe, Aceh (Gold accent)
- **Education card** — Sistem Informasi (S1) at Universitas Terbuka + Multimedia at SMK Negeri 2 Lhokseumawe (Cyan accent)
- **Languages card** — Indonesian (Native), Malay (High Proficiency), English (Intermediate) (Gold accent)
- **Layout** — Responsive 3-column grid on sm+ screens, single column on mobile

#### Section 3: Dhaher Labs (`dhaher-labs-section.tsx`)

Showcases the lab's four focus areas:

| Focus Area | Icon | Accent | Description |
|-----------|------|--------|-------------|
| AI Systems | Brain | Cyan | Practical AI tools, LLM integrations, agent architectures |
| Quant Intelligence | BarChart3 | Gold | Market research, data pipelines, quantitative analysis |
| Autonomous Workflows | Cpu | Cyan | Automation, multi-agent systems, self-operating tools |
| Open Source | Code2 | Gold | Community tools, shared infrastructure, transparent code |

- **Header** — "DHAHER LABS" in large bold text (4xl–6xl), with "LABS" in Gold
- **Description** — "A small lab building practical AI systems..."
- **Card interactions** — Hover lifts card 4px, accent line expands from 8px to 12px width, glow effect activates

#### Section 4: Projects (`projects-section.tsx`)

Grid of 8 project cards displayed in a responsive 3-column layout:

| Project | Tech | Accent | Stars |
|---------|------|--------|-------|
| ProxyGateLLM | Node.js, Express, Puter.js SDK | Gold | — |
| Quant-Nanggroe-AI | React 19, TypeScript, Tailwind | Cyan | — |
| MiSi Screener | Python, FastAPI, AI Agents | Gold | — |
| SolSniperX | JavaScript, Solana, Blockchain | Cyan | — |
| WiFiHunterX | TypeScript, AI Assistant, Security | Gold | — |
| GlowPilot Copilot | TypeScript, LLM, Voice | Cyan | — |
| AI Multi Agent Autonomous | Python3, Multi-Agent, Experimental | Gold | — |
| Personal OS Dashboard | Spreadsheet Logic, Productivity, Ongoing | Cyan | — |

Each card features:
- Accent color dot indicator
- Monospace project name
- Description text
- Tech stack badges (shadcn Badge component)
- Star/fork counts (when available)
- External link icon (appears on hover)
- Hover: lifts 4px, border brightens

#### Section 5: Skills (`skills-section.tsx`)

Three-column skill category display:

| Category | Icon | Accent | Skills |
|----------|------|--------|--------|
| Development | Code2 | Cyan | Python, JavaScript, TypeScript, Node.js, HTML, CSS, SQL, Express.js, React, Git, GitHub, Docker, Linux, API Integration, Web Scraping, AI-assisted Dev |
| Industrial | Wrench | Gold | Maintenance & Troubleshooting, Control Panel Operation, Electrical Systems, Mechanical Systems, Safety Protocols, Process Optimization, Spreadsheet Automation |
| Design | Palette | Cyan | Multimedia Design, Visual Communication, Data Entry & Recapitulation |

Skills rendered as inline-flex pills with monospace font, hover effects.

#### Section 6: Contact (`contact-section.tsx`)

Four contact cards in a 2-column grid:

| Channel | Value | Accent |
|---------|-------|--------|
| Email | mulkymalikuldhaher@mail.com | Gold |
| Instagram | @mulkymalikuldhr | Cyan |
| GitHub | mulkymalikuldhaher | Gold |
| Portfolio | portomulky.vercel.app | Cyan |

Plus an org link at bottom: `github.com/dhaher-labs`

Each card is a clickable `<a>` with hover lift effect and arrow icon.

#### Section 7: Footer (`footer-section.tsx`)

Minimal footer with:
- "DHAHER LABS" in Gold
- "AI • QUANT • AUTONOMOUS WORKFLOWS • OPEN SOURCE" in muted mono
- "© 2025 Dhaher Labs. All rights reserved."

#### Particle Canvas (`particle-canvas.tsx`)

Custom HTML5 Canvas animation:
- **Particle count** — `floor(width × height / 18000)` (responsive)
- **Particle properties** — Random position, velocity (±0.25), size (0.5–2px), opacity (0.1–0.45), color (Gold or Cyan 50/50)
- **Connection lines** — Drawn between particles within 120px distance, opacity fading with distance
- **Animation** — `requestAnimationFrame` loop, particles wrap at canvas edges
- **Resize handling** — Recreates particles on window resize
- **Cleanup** — Cancels animation frame on unmount

#### Section Dividers

Between each section, a subtle horizontal divider:
```html
<div class="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
```
Max width 6xl, centered with responsive padding.

### 2.4 Root Layout (`layout.tsx`)

```typescript
// Fonts loaded via next/font/google
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

// CSS variables applied to body
className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#1A1D20] text-[#E6EDF3]`}
```

**Metadata:**
- Title: "Mulky Malikul Dhaher — Independent Builder | Dhaher Labs"
- Description: "Industrial Maintenance Technician, Self-taught Developer, Building Dhaher Labs..."
- Keywords: Mulky Malikul Dhaher, Dhaher Labs, AI, Quantitative Intelligence, Autonomous Systems
- OpenGraph and Twitter card metadata included
- Favicon: `/logo.svg`

### 2.5 Page Composition (`page.tsx`)

All sections are assembled in a single-page layout:

```
<main>
  <HeroSection />
  ── divider ──
  <AboutSection />
  ── divider ──
  <DhaherLabsSection />
  ── divider ──
  <ProjectsSection />
  ── divider ──
  <SkillsSection />
  ── divider ──
  <ContactSection />
</main>
<FooterSection />
<Chatbot />
```

The page is a `'use client'` component because all sections use Framer Motion animations.

### 2.6 CSS Architecture (`globals.css`)

**Design Token System (CSS Custom Properties):**

```css
:root {
  --radius: 0.625rem;
  --background: #1A1D20;          /* Base Dark */
  --foreground: #E6EDF3;          /* Primary text */
  --card: #22262B;                /* Card backgrounds */
  --card-foreground: #E6EDF3;
  --primary: #D9A441;             /* Gold accent */
  --primary-foreground: #1A1D20;
  --secondary: #2A2E33;
  --secondary-foreground: #E6EDF3;
  --muted: #2A2E33;
  --muted-foreground: #8B949E;    /* Muted text */
  --accent: #00D1C7;              /* Cyan accent */
  --accent-foreground: #1A1D20;
  --destructive: #F85149;
  --border: rgba(255, 255, 255, 0.08);
  --input: rgba(255, 255, 255, 0.12);
  --ring: #D9A441;
  --sidebar: #0F172A;             /* Deep Dark */
}
```

**Custom Animations:**

| Class | Animation | Duration | Purpose |
|-------|-----------|----------|---------|
| `.hero-gradient` | Background position cycle | 15s infinite | Hero background shimmer |
| `.glow-gold` | Box-shadow gold | Static | Gold glow on hover |
| `.glow-cyan` | Box-shadow cyan | Static | Cyan glow on hover |
| `.message-animate` | Slide up + fade in | 0.3s | Chat message entrance |
| `.typing-dot-1/2/3` | Dot bounce | 1.4s infinite | Typing indicator |
| `.pulse-mic` | Cyan ring pulse | 1.5s infinite | Voice input active |
| `.pulse-speak` | Gold ring pulse | 1.2s infinite | TTS active |

**Custom Scrollbar:**
- 6px width, transparent track
- Thumb: `rgba(255,255,255,0.12)` with 3px border-radius
- Hover: `rgba(255,255,255,0.2)`

**Selection Color:**
- Background: `rgba(217,164,65,0.3)` (Gold with transparency)
- Text: `#E6EDF3`

---

## 3. Dhaher Labs Website

**URL:** `dhaher-labs.github.io`
**Source:** `dhaher-brand-system/website/`
**Purpose:** Organization landing page for Dhaher Labs — a small lab building practical AI systems.

### 3.1 Technology Stack

Identical to the Portfolio Website:
- Next.js 16 + TypeScript + Tailwind CSS 4 + Framer Motion + shadcn/ui

### 3.2 Component Breakdown

The Dhaher Labs Website has a different section structure focused on the organization rather than the individual:

#### Section 1: Hero (`hero-section.tsx`)

- **Brand mark** — Same "D" monogram as portfolio
- **Title** — "DHAHER" (white) + "LABS" (Gold), larger scale (5xl–8xl)
- **Tagline** — "AI • Quantitative Intelligence • Autonomous Systems • Research"
- **Sub-tagline** — "Building practical AI systems that compound human capability"
- **CTA buttons** — "Explore Projects" (Gold) and "GitHub" linking to `github.com/dhaher-labs` (Cyan outline)
- **Particle canvas** — Embedded directly in hero component (higher density: `/ 15000` vs `/ 18000`)
- **Animations** — Same staggered entrance pattern

#### Section 2: Mission (`mission-section.tsx`)

Organization mission statement with powerful quote block:

> "We build systems. Not hype.
> We build leverage. **Not trends.**"

Followed by three description paragraphs covering:
- Intersection of AI, quantitative research, and autonomous systems
- Every system solves a real problem; every model serves a measurable outcome
- Precision and pragmatism from multi-agent orchestration to quantitative analysis

#### Section 3: Focus Areas (`focus-areas.tsx`)

Four focus area cards:

| Focus Area | Icon | Accent | Description |
|-----------|------|--------|-------------|
| AI Systems | Brain | Cyan | Agents, LLMs, Multi-Agent Systems |
| Quant Intelligence | BarChart3 | Gold | Data, Models, Quantitative Research |
| Autonomous Tools | Cpu | Cyan | Automation, Workflows, Orchestration |
| Research Lab | FlaskConical | Gold | Exploration, Experimentation, Innovation |

Cards have the same hover interaction pattern as the portfolio (lift, accent line expand, glow).

#### Section 4: Projects (`projects-section.tsx`)

Same project grid as the portfolio website, with GitHub links pointing to the `dhaher-labs` organization.

#### Section 5: Founder (`founder-section.tsx`)

Dedicated section about the person behind the lab:
- **Avatar placeholder** — Circle with "MD" monogram and Gold border
- **Name** — "Mulky Malikul Dhaher"
- **Title** — "Founder of Dhaher Labs" (displayed as Gold mono text)
- **Description** — Bio text about building and research
- **Links** — GitHub, Email, Instagram
- **Layout** — Responsive flex row (image left, text right on sm+)

> **Note:** The brand guidelines specify using "Independent Builder" or "Building Dhaher Labs" rather than "Founder" as a primary headline. This component uses "Founder" as a section label only, not as the main positioning.

#### Section 6: Contact (`contact-section.tsx`)

Three contact cards (no Portfolio link — that's specific to the personal site):

| Channel | Value | Accent |
|---------|-------|--------|
| Email | mulkymalikuldhaher@mail.com | Gold |
| Instagram | @mulkymalikuldhr | Cyan |
| GitHub | github.com/dhaher-labs | Gold |

#### Section 7: Footer (`footer-section.tsx`)

Same minimal footer as portfolio.

### 3.3 Cross-Linking to Portfolio

The Dhaher Labs website links to the personal portfolio through:
- Founder section: GitHub link to `mulkymalikuldhaher`
- Chatbot knowledge base: References personal portfolio URL
- Contact section: Personal GitHub and Instagram

### 3.4 Instagram Integration

The Dhaher Labs Instagram account is integrated across the ecosystem:
- **Instagram handle:** `@dhaherlabs`
- **Personal Instagram:** `@mulkymalikuldhr`
- **Display locations:** Contact sections, chatbot knowledge base, profile READMEs
- **Links:** Direct links to `https://instagram.com/dhaherlabs` and `https://instagram.com/mulkymalikuldhr`

### 3.5 Email

- **Organization email:** `dhaher-labs@email.com`
- **Personal email:** `mulkymalikuldhaher@mail.com`
- Both are referenced in chatbot knowledge base and contact sections

### 3.6 Page Composition

```
<main>
  <HeroSection />
  ── divider ──
  <MissionSection />
  ── divider ──
  <FocusAreasSection />
  ── divider ──
  <ProjectsSection />
  ── divider ──
  <FounderSection />
  ── divider ──
  <ContactSection />
</main>
<FooterSection />
<Chatbot />
```

### 3.7 Root Layout Metadata

```typescript
title: "Dhaher Labs — AI • Quantitative Intelligence • Autonomous Systems"
description: "Building practical AI systems that compound human capability."
keywords: ["Dhaher Labs", "AI", "Quantitative Intelligence", "Autonomous Systems", "Research", "LLMs", "Multi-Agent Systems"]
```

---

## 4. AI Agent Chatbot System

The chatbot is a core feature of both websites, providing an AI-powered assistant that can answer questions about Mulky Malikul Dhaher, Dhaher Labs, and the project portfolio.

### 4.1 Three Chatbot Modes

The chatbot operates in three distinct modes:

#### Mode 1: Agent (Static Knowledge Base)

**Default mode. Works offline. No server required.**

- **Mechanism:** Pattern matching against a static knowledge base embedded in the component
- **Knowledge base:** 17 pattern-response pairs covering identity, projects, skills, contact, education, work, and greetings
- **Latency:** Simulated 500–1000ms delay for natural feel
- **Fallback:** Default response when no pattern matches
- **Deployment:** Works on GitHub Pages (static export)

```typescript
// Knowledge base structure
const knowledgeBase: Array<{ patterns: string[]; response: string }> = [
  {
    patterns: ['who is mulky', 'about mulky', 'tell me about mulky', ...],
    response: "Mulky Malikul Dhaher is an industrial maintenance technician..."
  },
  // ... 16 more entries
]

// Pattern matching algorithm
function findResponse(input: string): string {
  const lower = input.toLowerCase().trim()
  for (const entry of knowledgeBase) {
    for (const pattern of entry.patterns) {
      if (lower.includes(pattern)) return entry.response
    }
  }
  return "I don't have specific information about that. Try asking about..."
}
```

**Knowledge Base Coverage:**

| Topic | Pattern Keywords | Response Content |
|-------|-----------------|------------------|
| Identity | who is mulky, about mulky, who are you | Full bio with role, workplace, education |
| Dhaher Labs | what is dhaher labs, about the lab | Lab description, focus areas, "not a company" |
| ProxyGateLLM | jsputer, proxy, ai proxy, llm proxy | AI Proxy Server details, 30 stars |
| Quant-Nanggroe-AI | quant, nangroe, trading, dashboard | Trading dashboard description |
| MiSi Screener | misi, screener, market intelligence | Market Intelligence Engine details |
| SolSniperX | solsniper, blockchain, solana | Blockchain bot, learning project |
| WiFiHunterX | wifi, hunter, cybersecurity | Cybersecurity dashboard |
| GlowPilot | glowpilot, dermatology, skincare | AI skincare advisor |
| Multi Agent | multi agent, autonomous agent | Distributed agent system |
| Personal OS | personal os, dashboard, productivity | Life tracker |
| All Projects | projects, all projects, portfolio | Summary of all 8 projects |
| Skills | skills, tech stack, technologies | All three skill categories |
| Contact | contact, email, reach | All contact channels |
| Education | education, study, university | Current and past education |
| Work | work, job, career | Current employment |
| Languages | languages, speak | Three languages |
| Greetings | hello, hi, hey | Welcome message |
| Thanks | thank, thanks | Polite acknowledgment |

#### Mode 2: Repo Scan (Future / API-Enhanced)

**API mode. Requires backend. Labeled as "API MODE" when active.**

- **Mechanism:** Sends conversation to `/api/chat` endpoint for LLM-powered responses
- **API:** Uses `z-ai-web-dev-sdk` to generate intelligent responses
- **Streaming:** Response is streamed word-by-word (3 words per 30ms chunk) for typewriter effect
- **Fallback:** Automatically falls back to static knowledge base if API is unavailable
- **Status indicator:** Header shows "API MODE" (cyan) or "OFFLINE MODE" (muted)

```typescript
// API mode flow
if (useApiMode) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ messages: chatMessages }),
  })
  // Stream reading with TextDecoder
  const reader = response.body?.getReader()
  // Accumulate chunks and update UI progressively
}
```

**Toggle behavior:**
- Click "API" button in chatbot header to enable/disable
- Visual state: Cyan background when active, muted when inactive
- Clear feedback in header: "API MODE" vs "OFFLINE MODE"

#### Mode 3: Code Review (Future / Planned)

The Code Review mode is designed as a future capability that would:
- Accept repository URLs or code snippets
- Provide AI-powered code analysis
- Offer suggestions for improvement
- Scan for security vulnerabilities
- Generate documentation

This mode is architecturally prepared through the API infrastructure but not yet implemented in the UI.

### 4.2 System Prompts and AI Configuration

#### Portfolio Website System Prompt

```
You are the Dhaher Labs AI assistant. You answer questions about Mulky Malikul
Dhaher and Dhaher Labs. Be concise, honest, and helpful.

Key facts about Mulky Malikul Dhaher:
- Role: Industrial Maintenance Technician / Panel Control Operator / Self-taught Developer / Vibe Coder
- Workplace: PT Yoga Wibawa Mandiri (Packing Plant Semen Padang), Lhokseumawe, Aceh, Apr 2021 – Present
- Education: Sistem Informasi (S1), Universitas Terbuka, 2025 – Present; Multimedia, SMK Negeri 2 Lhokseumawe, 2012-2015
- Languages: Indonesian (Native), English (Intermediate), Malay (High Proficiency)
- Contact: mulkymalikuldhaher@mail.com, Instagram: @mulkymalikuldhr, GitHub: github.com/mulkymalikuldhaher
- He is NOT a "founder" in the traditional sense — he's an independent builder creating tools and systems. Use terms like "builder", "independent builder", "self-taught developer", "building Dhaher Labs"

About Dhaher Labs:
- A small personal lab, NOT a company or startup
- Building practical AI systems, quantitative tools, and autonomous workflows
- Focus areas: AI Systems, Quant Intelligence, Autonomous Workflows, Open Source
- GitHub org: github.com/dhaher-labs

Key Projects: [8 projects with details]

Skills: [3 categories with full lists]

Keep responses focused, honest, and actionable. Never inflate or exaggerate.
```

#### Dhaher Labs Website System Prompt

```
You are the Dhaher Labs AI assistant. You answer questions about Dhaher Labs,
its projects, and its founder Mulky Malikul Dhaher. Be concise, professional,
and helpful. Dhaher Labs focuses on AI, quantitative intelligence, autonomous
systems, and research. Contact: mulkymalikuldhaher@mail.com,
GitHub: github.com/dhaher-labs, Instagram: @mulkymalikuldhr.
Key projects: quant-nangroe-ai, blackhornet, ai-colony, research-systems,
open-source-tools. Mulky Malikul Dhaher is the founder.
Keep responses focused and actionable.
```

### 4.3 z-ai-web-dev-sdk Integration

The chatbot API route uses the `z-ai-web-dev-sdk` package for LLM capabilities:

```typescript
import ZAI from 'z-ai-web-dev-sdk'

export async function POST(request: Request) {
  const zai = await ZAI.create()

  const response = await zai.chat.completions.create({
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages,  // User conversation history
    ],
  })

  const content = response.choices?.[0]?.message?.content || '...'
  // Streamed response via ReadableStream
}
```

**Response Streaming Architecture:**
1. LLM generates complete response
2. Response is split into words
3. Words are sent in chunks of 3 with 30ms intervals
4. Client accumulates chunks and updates UI progressively
5. Typewriter effect creates natural reading experience

```typescript
const stream = new ReadableStream({
  start(controller) {
    const words = content.split(' ')
    let sent = 0
    const sendChunk = () => {
      if (sent >= words.length) { controller.close(); return }
      const chunkSize = Math.min(3, words.length - sent)
      const chunk = words.slice(sent, sent + chunkSize).join(' ') + ' '
      controller.enqueue(encoder.encode(chunk))
      sent += chunkSize
      setTimeout(sendChunk, 30)
    }
    sendChunk()
  }
})
```

### 4.4 TTS (Text-to-Speech)

The chatbot integrates browser-native TTS via the Web Speech API (`SpeechSynthesis`):

**Features:**
- Per-message "Read Aloud" button on assistant messages
- Volume2 icon (inactive) / VolumeX icon (active speaking)
- Pulsing Gold ring animation when speaking (`.pulse-speak`)
- Automatic voice selection: Prefers Google English voice, falls back to any English voice
- Speech parameters: rate=1, pitch=1, volume=0.8

**Voice Mode:**
- Toggle "VOICE" button in chatbot header
- When active, every assistant response is automatically read aloud
- Visual indicator: Gold background on VOICE button when active

```typescript
const speakMessage = useCallback((text: string, messageId: string) => {
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.rate = 1
  utterance.pitch = 1
  utterance.volume = 0.8

  const voices = window.speechSynthesis.getVoices()
  const englishVoice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Google'))
    || voices.find(v => v.lang.startsWith('en'))
  if (englishVoice) utterance.voice = englishVoice

  window.speechSynthesis.speak(utterance)
}, [speakingMessageId])
```

**TTS Cleanup:**
- Speech cancelled on component unmount
- Speech cancelled when chatbot panel is closed
- Speech cancelled when a new message starts speaking

### 4.5 Voice Input

Browser-native speech recognition via `SpeechRecognition` / `webkitSpeechRecognition` API:

**Features:**
- Microphone button in chat input area
- Pulsing Cyan ring animation when listening (`.pulse-mic`)
- MicOff icon when active, Mic icon when inactive
- Recognized text fills the input field
- Configuration: `continuous: false`, `interimResults: false`, `lang: 'en-US'`

```typescript
const toggleListening = useCallback(() => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  if (!SpeechRecognition) return

  const recognition = new SpeechRecognition()
  recognition.continuous = false
  recognition.interimResults = false
  recognition.lang = 'en-US'

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript
    setInput(transcript)
    setIsListening(false)
  }

  recognition.start()
  setIsListening(true)
}, [isListening])
```

**Browser Compatibility:**
- Chrome: Full support (webkitSpeechRecognition)
- Edge: Full support
- Safari: Partial support
- Firefox: Not supported (graceful degradation — button hidden/non-functional)

### 4.6 Chat History Persistence

Chat messages are stored in React state during the session. The chatbot currently does **not** persist messages to `localStorage` — this is a future enhancement.

**Current state management:**
```typescript
const [messages, setMessages] = useState<Message[]>([
  {
    id: 'welcome',
    role: 'assistant',
    content: "Welcome! I'm the Dhaher Labs assistant..."
  }
])
```

**Planned features (from worklog):**
- Chat logs stored in `localStorage`
- Export chat history as JSON
- Clear chat logs functionality

### 4.7 Chatbot UI Specifications

| Element | Specification |
|---------|--------------|
| **Floating button** | Fixed bottom-6 right-6, 56×56px, Gold background, shadow-lg |
| **Panel** | Fixed bottom-24 right-6, 400px wide (100vw-3rem on mobile), 520px tall, max 75vh |
| **Panel background** | `#1A1D20/95` with `backdrop-blur-xl` |
| **Panel border** | `rgba(255,255,255,0.08)` |
| **Header** | Bot icon + "Dhaher Labs AI" + mode indicator + VOICE/API toggles |
| **Messages area** | Scrollable with thin custom scrollbar |
| **User avatar** | 28px circle, Cyan background (10% opacity), User icon |
| **Bot avatar** | 28px circle, Gold background (10% opacity), Bot icon |
| **User bubble** | `#00D1C7/10` background, `#E6EDF3` text, rounded-tr-sm |
| **Bot bubble** | `#22262B` background, `#8B949E` text, `rgba(255,255,255,0.04)` border, rounded-tl-sm |
| **TTS button** | 12px, appears below bot bubbles, Gold when active |
| **Input** | 40px height, `#22262B` background, Gold focus border |
| **Send button** | 40×40px, Gold background |
| **Mic button** | 40×40px, `#22262B` background, Cyan when active |
| **Typing indicator** | Three Gold dots with staggered bounce animation |

### 4.8 Chatbot on Dhaher Labs Website

The Dhaher Labs website (`dhaher-brand-system`) has a simpler chatbot:
- **No static knowledge base** — API-only mode
- **No TTS** — No read-aloud functionality
- **No voice input** — No microphone button
- **No mode toggles** — No VOICE/API toggle buttons
- **Header:** Shows "Dhaher Labs AI" with "ASSISTANT" label
- **Fallback:** Shows error message: "Connection interrupted. I'm currently offline."
- **Smaller panel:** 380px wide (vs 400px), 500px tall (vs 520px)

---

## 5. Auto-Fetch GitHub Repos System

### 5.1 Architecture

The ecosystem uses Python generator scripts to automatically fetch and display live GitHub repository data:

```
brand.config.json  ──→  generate-readme.py  ──→  README.md (personal)
brand.config.json  ──→  generate-org-readme.py  ──→  README.md (org)
```

### 5.2 Personal Profile Generator (`generate-readme.py`)

**Location:** `personal-profile/scripts/generate-readme.py`

**Process:**
1. Read `brand.config.json` for identity, projects, skills, and contact data
2. Fetch live GitHub data via GitHub API (with `GITHUB_TOKEN` for higher rate limits)
3. Populate `<!-- FEATURED_REPOS_START -->` ... `<!-- FEATURED_REPOS_END -->` sections
4. Generate shield.io badges for tech stack
5. Include GitHub stats cards (readme-stats, streak-stats, activity-graph)
6. Write the final README.md

**Configuration Methods:**

| Method | How |
|--------|-----|
| Edit script | Modify `MANUAL_FEATURED` list in `generate-readme.py` |
| Workflow input | Set `featured_repos` parameter when triggering manually |
| Environment variable | `FEATURED_REPOS=repo1,repo2 python3 scripts/generate-readme.py` |

### 5.3 Organization Profile Generator (`generate-org-readme.py`)

**Location:** `org-profile/scripts/generate-org-readme.py`

Same architecture as personal generator, but outputs to `org-profile/profile/README.md` with org-specific branding.

### 5.4 GitHub Actions Auto-Sync

Both profiles use GitHub Actions workflows that run on a schedule:

**Personal Profile Workflow** (`sync-profile.yml`):
- **Schedule:** Every 6 hours
- **Trigger:** Manual dispatch with optional `featured_repos` input
- **Steps:** Checkout → Run generator → Commit and push if changed

**Organization Profile Workflow** (`sync-org-profile.yml`):
- Same schedule and structure as personal workflow
- Uses `PROFILE_SYNC_TOKEN` secret for authentication

**State Tracking:**
- `.github/repo-state.json` — Caches the last known state of repositories
- Prevents unnecessary commits when nothing has changed

---

## 6. Multi-Language System

### 6.1 Architecture

The ecosystem includes internationalization support via `next-intl` (v4.3.4):

**Supported Languages:**

| Code | Language | Direction |
|------|----------|-----------|
| `en` | English | LTR |
| `id` | Indonesian (Bahasa) | LTR |
| `ja` | Japanese | LTR |
| `zh` | Chinese (Simplified) | LTR |
| `ko` | Korean | LTR |
| `ar` | Arabic | RTL |

### 6.2 Auto-Detection

Language detection follows this priority:
1. **User preference** — Stored in localStorage after manual selection
2. **Browser language** — `navigator.language` or `navigator.languages`
3. **Default fallback** — English (`en`)

### 6.3 Implementation

```typescript
// next-intl configuration
// middleware.ts handles locale detection and routing
// messages/ directory contains translation files
//   ├── en.json
//   ├── id.json
//   ├── ja.json
//   ├── zh.json
//   ├── ko.json
//   └── ar.json
```

### 6.4 RTL Support

Arabic (`ar`) uses right-to-left layout:
- `dir="rtl"` attribute on `<html>` element
- Flex direction reversals
- Text alignment adjustments
- Chatbot bubble positioning (user on left, bot on right)

### 6.5 Translation Scope

All user-facing strings are translation keys:
- Section headers and labels
- Button text
- Chatbot messages
- Placeholder text
- ARIA labels
- Footer text
- Error messages

---

## 7. Theme System

### 7.1 Auto Day/Night Detection

The theme system uses `next-themes` (v0.4.6) for automatic day/night mode switching:

```typescript
import { ThemeProvider } from 'next-themes'

// Wraps the application
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  {children}
</ThemeProvider>
```

**Detection Logic:**
1. Check `prefers-color-scheme` media query
2. If `dark` → Apply dark theme (default for this ecosystem)
3. If `light` → Apply light theme
4. Manual override takes precedence

### 7.2 Manual Toggle

Users can manually toggle between:
- **System** — Follows OS preference
- **Dark** — Forced dark mode (default, matches brand)
- **Light** — Forced light mode

The toggle is accessible via a theme switcher component in the navigation bar.

### 7.3 Theme CSS Variables

Dark mode (default):
```css
:root {
  --background: #1A1D20;
  --foreground: #E6EDF3;
  --card: #22262B;
  --primary: #D9A441;
  --accent: #00D1C7;
}
```

Light mode:
```css
.light {
  --background: #FFFFFF;
  --foreground: #1A1D20;
  --card: #F6F8FA;
  --primary: #B8860B;
  --accent: #009B93;
}
```

> **Note:** The Dhaher Labs brand is fundamentally dark-themed. Light mode is provided as an accessibility option but the dark theme is the canonical brand experience.

---

## 8. Glassmorphic UI Design System

### 8.1 Design Philosophy

**Industrial Cyberpunk Minimalist** — Dark, silent, precise, tactical, premium.

The UI system uses glassmorphism as its primary card/surface treatment:

### 8.2 Glass Card Pattern

Every card and elevated surface uses the same base pattern:

```css
.glass-card {
  background: rgba(34, 38, 43, 0.6);     /* #22262B at 60% */
  backdrop-filter: blur(8px);              /* backdrop-blur-sm */
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 0.5rem;
}
```

**Tailwind classes:**
```
border border-white/[0.06] bg-[#22262B]/60 backdrop-blur-sm rounded-lg
```

### 8.3 Elevation Levels

| Level | Background | Blur | Border | Usage |
|-------|-----------|------|--------|-------|
| Level 0 (Base) | `#1A1D20` | None | None | Page background |
| Level 1 (Surface) | `#22262B/60` | `blur-sm` (8px) | `white/[0.06]` | Cards, info panels |
| Level 2 (Elevated) | `#1A1D20/95` | `blur-xl` (24px) | `white/[0.08]` | Chatbot panel, modals |
| Level 3 (Overlay) | `#0F172A` | `blur-xl` (24px) | `white/[0.08]` | Hero overlays, sidebar |

### 8.4 Interaction States

| State | Effect | Duration |
|-------|--------|----------|
| Hover (cards) | Lift 4px (`whileHover={{ y: -4 }}`) | 300ms |
| Hover (border) | Brightens to `white/[0.12]` | 300ms |
| Hover (accent line) | Expands from 8px to 12px width | 300ms |
| Hover (glow) | `.glow-gold` or `.glow-cyan` activates | 300ms |
| Focus (input) | Gold border at 30% opacity, Gold ring at 20% | 200ms |
| Active (buttons) | Slight scale reduction | 100ms |

### 8.5 Color Accent System

Two accent colors with defined roles:

**Gold (#D9A441) — Authority & Identity**
- Used for: Name highlights, CTAs, brand marks, section labels, primary buttons
- Glow: `box-shadow: 0 0 20px rgba(217, 164, 65, 0.15)`
- Background tint: `#D9A441/10` (10% opacity for icon backgrounds)
- Text emphasis: Direct color application on important text

**Cyan (#00D1C7) — Technology & Interaction**
- Used for: Links, tech badges, secondary buttons, interactive elements, system status
- Glow: `box-shadow: 0 0 20px rgba(0, 209, 199, 0.15)`
- Background tint: `#00D1C7/10` (for icon backgrounds)
- Active indicators: Pulse animation for system status

**Rules:**
1. Never use both accents on the same element unless deliberate
2. Gold = first read, Cyan = second read
3. Alternating accents create visual rhythm in grid layouts
4. No indigo, no blue, no neon overload, no rainbow gradients

### 8.6 Typography System

| Level | Font | Weight | Size | Color | Tracking |
|-------|------|--------|------|-------|----------|
| H1 (Name) | Geist Sans | 700–800 | 3rem–7rem | White + Gold | Tight |
| H2 (Section) | Geist Sans | 700 | 1.75rem–4rem | White | Normal |
| H3 (Card) | Geist Sans | 600 | 1.25rem | White/Accent | Normal |
| Body | Geist Sans | 400 | 1rem | #8B949E | Normal |
| Label | Geist Sans | 600 | 0.875rem | White | Normal |
| Mono | Geist Mono | 400 | 0.75rem–1rem | Accent/Muted | Wide |
| Tagline | Geist Mono | 400 | 0.75rem–1rem | Muted/60% | 0.2em |

**Font Loading:**
```typescript
import { Geist, Geist_Mono } from 'next/font/google'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })
```

**Decorative Code Elements:**
- `> whoami` — Identity section marker
- `// STATUS` — System status indicator
- `// mission` — Mission section marker
- These are decorative, not executable

---

## 9. Responsive Breakpoints

### 9.1 Breakpoint System

The sites follow a mobile-first approach using Tailwind CSS default breakpoints:

| Breakpoint | Min Width | Target Devices |
|-----------|-----------|----------------|
| Default | 0px | Mobile phones |
| `sm` | 640px | Large phones, small tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large screens |

### 9.2 Responsive Patterns

**Max Content Width:** `max-w-6xl` (1152px) for most sections, `max-w-4xl` (896px) for text-heavy sections

**Horizontal Padding:** `px-4 sm:px-6` (16px mobile, 24px tablet+)

**Section Vertical Padding:** `py-24 sm:py-32` (96px mobile, 128px tablet+)

**Grid Layouts:**

| Section | Mobile | sm+ | md+ | lg+ |
|---------|--------|-----|-----|-----|
| About cards | 1 col | 3 col | 3 col | 3 col |
| Focus areas | 1 col | 2 col | 2 col | 2 col |
| Projects | 1 col | 1 col | 2 col | 3 col |
| Skills | 1 col | 1 col | 1 col | 3 col |
| Contact | 1 col | 2 col | 2 col | 2 col |

**Hero Typography Scale:**

| Element | Mobile | sm | md |
|---------|--------|-----|-----|
| Name (H1) | 4xl (2.25rem) | 6xl (3.75rem) | 7xl (4.5rem) |
| Subtitle | sm (0.875rem) | base (1rem) | lg (1.125rem) |
| Tagline | xs (0.75rem) | sm (0.875rem) | sm (0.875rem) |

**Chatbot:**
- Mobile: `w-[calc(100vw-3rem)]` (full width minus padding)
- Desktop: `w-[400px]` fixed

**CTA Buttons:**
- Mobile: `flex-col` (stacked)
- sm+: `flex-row` (side by side)

### 9.3 Mobile-First Approach

All styles are written mobile-first with progressive enhancement:
1. Base styles target the smallest screens
2. `sm:`, `md:`, `lg:` prefixes add complexity for larger screens
3. Touch targets are minimum 44×44px
4. Chatbot panel adapts width on mobile
5. Particle count reduces on smaller screens (density formula)

### 9.4 Mobile Detection Hook

```typescript
// src/hooks/use-mobile.ts
// Provides a boolean hook for mobile-specific behavior
const isMobile = useMobile() // Returns true for viewport < 768px
```

---

## 10. API Routes Documentation

### 10.1 Chat API — `POST /api/chat`

**Purpose:** LLM-powered chat completions for the AI chatbot

**Request:**

```typescript
POST /api/chat
Content-Type: application/json

{
  "messages": [
    { "role": "user", "content": "What is ProxyGateLLM?" },
    { "role": "assistant", "content": "ProxyGateLLM is a multi-LLM API gateway..." },
    { "role": "user", "content": "How many providers does it support?" }
  ]
}
```

**Response (Success):**

```typescript
HTTP 200 OK
Content-Type: text/plain; charset=utf-8
Cache-Control: no-cache
Connection: keep-alive

// Streamed response with word-by-word chunks
"ProxyGateLLM supports " "22 LLM providers " "with 350+ models "
```

**Response (Error):**

```typescript
HTTP 500 Internal Server Error
Content-Type: application/json

{
  "error": "Failed to process request. The AI assistant is currently unavailable."
}
```

**Response (Bad Request):**

```typescript
HTTP 400 Bad Request
Content-Type: application/json

{
  "error": "Messages array is required"
}
```

**System Prompt:** Full context about Mulky, Dhaher Labs, projects, skills, and contact info is injected as the first message with `role: 'system'`.

**SDK:** `z-ai-web-dev-sdk` v0.0.17

**Streaming:** Pseudo-streaming implementation — LLM generates complete response, then streams it word-by-word (3 words per 30ms chunk).

### 10.2 API Compatibility on GitHub Pages

| Feature | Works on GitHub Pages | Notes |
|---------|-----------------------|-------|
| Static Knowledge Base | Yes | Default mode, pattern matching |
| TTS (Read Aloud) | Yes | Browser-native SpeechSynthesis |
| Voice Input | Yes | Browser-native SpeechRecognition |
| Chat Logs (localStorage) | Yes | Client-side storage |
| Export Chat JSON | Yes | Client-side generation |
| API Mode (LLM) | No | Requires backend server |
| Code Review Mode | No | Future feature |

The API route only functions when the site is served with a backend (e.g., during development with `next dev` or deployed to a platform with server-side rendering like Vercel). On GitHub Pages, the static knowledge base handles all chat interactions.

---

## 11. Cross-Site Linking

### 11.1 Link Map

```
Portfolio (mulkymalikuldhaher.github.io)
├── Links TO Dhaher Labs Website
│   ├── Contact section: "github.com/dhaher-labs" link
│   ├── Dhaher Labs section: Focus area cards reference org
│   └── Chatbot KB: References org GitHub URL
│
├── Links TO Personal GitHub
│   ├── Hero: GitHub button → github.com/mulkymalikuldhaher
│   ├── Contact: GitHub card → github.com/mulkymalikuldhaher
│   └── Projects: Card links to personal repos
│
└── Links TO Social
    ├── Email: mailto:mulkymalikuldhaher@mail.com
    ├── Instagram: instagram.com/mulkymalikuldhr
    └── Portfolio: portomulky.vercel.app (legacy, redirects to GitHub Pages)

Dhaher Labs Website (dhaher-labs.github.io)
├── Links TO Portfolio
│   ├── Founder section: GitHub link → github.com/mulkymalikuldhaher
│   ├── Founder section: Instagram link → instagram.com/mulkymalikuldhr
│   └── Chatbot KB: References personal portfolio URL
│
├── Links TO Organization GitHub
│   ├── Hero: GitHub button → github.com/dhaher-labs
│   ├── Contact: GitHub card → github.com/dhaher-labs
│   └── Projects: Card links to org repos
│
└── Links TO Social
    ├── Email: mailto:mulkymalikuldhaher@mail.com
    └── Instagram: instagram.com/mulkymalikuldhr
```

### 11.2 Cross-Linking Strategy

| From | To | Method |
|------|----|--------|
| Portfolio → Labs | Footer org link, contact section org link | `<a>` tags |
| Labs → Portfolio | Founder section personal links | `<a>` tags |
| Both → GitHub | Hero CTA buttons, contact cards | `<a>` tags with `target="_blank"` |
| Both → Instagram | Contact section cards | `<a>` tags with `target="_blank"` |
| Both → Email | Contact section cards | `mailto:` links |
| Profile READMEs → Website | Markdown links | Badge links |

---

## 12. Deployment

### 12.1 GitHub Pages Deployment

Both websites deploy as static exports to GitHub Pages.

**Portfolio Website:**
- Repository: `mulkymalikuldhaher/mulkymalikuldhaher.github.io`
- URL: `mulkymalikuldhaher.github.io`

**Dhaher Labs Website:**
- Repository: `dhaher-labs/dhaher-labs.github.io`
- URL: `dhaher-labs.github.io`

### 12.2 Build Configuration

**next.config.ts** must include for static export:

```typescript
const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: false,
}
```

> **Note:** The current `next.config.ts` does not include `output: 'export'` because the dev server uses API routes. Add it only for production builds targeting GitHub Pages.

### 12.3 GitHub Actions Workflow

**File:** `.github/workflows/deploy-pages.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Build static site
        run: npx next build
        env:
          NEXT_OUTPUT: export

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Deployment Flow:**
1. Push to `main` branch triggers workflow
2. Node.js 20 environment spins up
3. Dependencies installed with `npm ci`
4. Static site built with `NEXT_OUTPUT=export`
5. Output uploaded as GitHub Pages artifact
6. Deployed to GitHub Pages via `actions/deploy-pages@v4`

### 12.4 Manual Deployment

```bash
# Build static export
cd website/
NEXT_OUTPUT=export npm run build
# Output goes to out/

# Push to GitHub Pages repo
cd out/
git init
git remote add origin https://github.com/dhaher-labs/dhaher-labs.github.io.git
git add .
git commit -m "deploy: static site"
git branch -M main
git push -u origin main
```

### 12.5 Custom Domain Setup

**Recommended domains (from brand.config.json):**

| Priority | Domain | Feel |
|----------|--------|------|
| 1 | dhaherlabs.com | Professional, clean, brand-focused |
| 2 | dhaher.dev | Developer-focused, premium |
| 3 | mulky.dev | Personal developer identity |
| 4 | mulkydhaher.com | Personal brand |

**DNS Configuration:**

1. In GitHub repo Settings → Pages → Custom domain, enter your domain
2. Add DNS records at your registrar:
   - **CNAME:** `www` → `dhaher-labs.github.io`
   - **A records** (apex domain):
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
3. Create `CNAME` file in `public/` directory:
   ```
   dhaherlabs.com
   ```
4. Wait for DNS propagation (up to 24 hours)
5. Enable "Enforce HTTPS" in Pages settings

---

## 13. Brand Guidelines

### 13.1 Brand Philosophy

**Industrial Cyberpunk Minimalist** — Dark, silent, precise, tactical, premium.

The brand communicates calm intelligence, not noisy hype. It signals competence through restraint. Every element earns its place.

**Core vibe:** Silent operator. Strategic builder. Dark, minimal, premium.

### 13.2 Color System

#### Primary Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Base Dark | `#1A1D20` | 26, 29, 32 | Primary background, cards, page surface |
| Deep Dark | `#0F172A` | 15, 23, 42 | Hero overlays, shadows, secondary bg, sidebar |
| Text White | `#FFFFFF` | 255, 255, 255 | Headings, high-emphasis text |
| Text Muted | `#8B949E` | 139, 148, 158 | Body text, descriptions, secondary labels |
| Card Surface | `#22262B` | 34, 38, 43 | Card backgrounds, input fields |

#### Accent Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Gold | `#D9A441` | 217, 164, 65 | Primary accent — CTAs, highlights, name emphasis, brand marks |
| Cyan | `#00D1C7` | 0, 209, 199 | Secondary accent — links, tech badges, interactive elements |

#### Color Rules

1. Gold = authority, warmth, identity (name, CTAs, brand marks)
2. Cyan = technology, clarity, action (links, badges, system status)
3. Never use both accents on the same element unless deliberate
4. Background is always dark (`#1A1D20` or `#0F172A`)
5. Text is white or muted — no colored body text
6. No indigo, no blue, no neon overload, no rainbow gradients

#### CSS Custom Properties

```css
:root {
  --primary: #D9A441;           /* Gold */
  --accent: #00D1C7;            /* Cyan */
  --background: #1A1D20;        /* Base Dark */
  --foreground: #E6EDF3;        /* Text */
  --muted-foreground: #8B949E;  /* Muted Text */
  --card: #22262B;              /* Cards */
  --border: rgba(255,255,255,0.08);
  --ring: #D9A441;              /* Focus ring */
}
```

### 13.3 Typography

| Level | Font | Weight | Size | Color |
|-------|------|--------|------|-------|
| H1 (Brand) | Geist Sans | 800 | 3rem+ | White + Gold |
| H2 (Section) | Geist Sans | 700 | 1.75rem | White |
| H3 (Card) | Geist Sans | 600 | 1.25rem | White or Accent |
| Body | Geist Sans | 400 | 1rem | #8B949E |
| Code/CLI | Geist Mono | 400 | 0.9rem | Cyan or Muted |
| Label | Geist Sans | 600 | 0.875rem | White |
| Tagline | Geist Mono | 400 | 0.75rem | Muted/60% |

**Font Stack:**
- Primary: Geist Sans (loaded via `next/font/google`)
- Mono: Geist Mono (loaded via `next/font/google`)
- Fallback: system sans-serif / system monospace

### 13.4 Voice & Tone

#### Positioning Rules (CRITICAL)

| DO | DO NOT |
|----|--------|
| "Independent Builder" | "Founder of Dhaher Labs" (as primary headline) |
| "Building Dhaher Labs" | Present Dhaher Labs as a large company |
| "Self-taught Developer" | "Visionary" or "Thought Leader" |
| "Small lab" | "Enterprise" or "Corporation" |
| "Practical AI systems" | "Cutting-edge AI" or "Revolutionary" |
| "Currently building" | "Industry-leading" |
| "Teknik Informatika — Prodi Multimedia" | "Computer Science" |
| Mark skills as "(learning)" | Claim expertise where learning |
| Use real star/fork counts | Fake metrics or inflated contributions |

#### Written Voice

- Professional, not casual
- Precise, not vague
- Confident, not arrogant
- Quiet, not loud
- Technical when appropriate

#### Taglines

- "AI • Quantitative Intelligence • Autonomous Workflows • Open Source"
- "Work by day. Build by night. Ship what matters."
- "We build tools, not hype. Practical systems, not promises."
- "Research • Build • Automate • Ship"

#### What We Never Say

- "AGI" (unless specifically implemented)
- "Fully autonomous" (unless actually autonomous)
- "Enterprise" (it's a small lab)
- "Game-changer" (meaningless)
- "World-changing" (overclaiming)
- "Founder" as primary headline (use "Independent Builder" or "Building Dhaher Labs")
- Any fake metrics, inflated claims, or misleading language

### 13.5 Animation Rules

| Animation | Usage | Duration |
|-----------|-------|----------|
| Fade in | Section reveals | 300ms |
| Slide up | Card entrances | 400ms |
| Lift on hover | Cards, buttons | 200ms |
| Pulse | Voice/listening indicators | 1.5s–2s loop |

**Forbidden:** bouncing, spinning, shaking, rainbow cycling, parallax abuse, endless looping.

### 13.6 Consistency Checklist

- [ ] Background is `#1A1D20` or `#0F172A`
- [ ] Accents are Gold `#D9A441` and Cyan `#00D1C7` only
- [ ] No blue or indigo
- [ ] No "Founder of Dhaher Labs" as primary headline
- [ ] Dhaher Labs framed as a small lab, not a company
- [ ] Positioning is honest and credible
- [ ] No overclaimed capabilities
- [ ] Contact info consistent: `mulkymalikuldhaher@mail.com`, `@mulkymalikuldhr`
- [ ] Animations are subtle and purposeful
- [ ] Skills marked as "(learning)" where appropriate
- [ ] Real star/fork counts only — no inflated metrics

---

## 14. Repository Taxonomy

All 21 projects are categorized into three tiers based on maturity, credibility, and brand alignment.

### 14.1 Featured (8 Repos)

Surface prominently in profile READMEs, org page, and portfolio site.

| Repo | Description | Tech | Stars | Forks |
|------|-------------|------|-------|-------|
| ProxyGateLLM | Multi-LLM API Gateway, 22 providers, 350+ models, OpenAI-compatible | Node.js, Express, Puter.js SDK, Docker | 34 | 15 |
| OpenCode-Android | Native Android AI coding agent, Material Design 3, SSE streaming | Kotlin, Material Design 3, SSE | 27 | 2 |
| Quant-Nanggroe-AI | Trading Research Dashboard, quantitative research interface | React 19, TypeScript, Tailwind CSS | — | — |
| blackhornet | Stealth autonomous system for reconnaissance and tactical intelligence | AI, Autonomous, Rust | — | — |
| K.A.L.E.N | Autonomous workflow orchestration system | TypeScript, Node.js | — | — |
| Mnemosyne | Memory and context management system for AI agents | Python, AI | — | — |
| AI-MultiColony-Ecosystem | Multi-agent orchestration, collaborative AI agents | Python, Multi-Agent | — | — |
| GhostStudio-AI | AI-powered creative studio tool | TypeScript, AI, LLM | — | — |

**Suggested org repos:** ProxyGateLLM, Quant-Nanggroe-AI, blackhornet, AI-MultiColony-Ecosystem → `dhaher-labs`

**Suggested personal repos:** K.A.L.E.N, Mnemosyne, GhostStudio-AI, OpenCode-Android → `mulkymalikuldhaher`

### 14.2 Supporting (9 Repos)

Include but de-emphasize. Solid projects but not primary brand signals.

| Repo | Description | Tech | Stars |
|------|-------------|------|-------|
| Nanggroe-IoT | IoT infrastructure for Nanggroe ecosystem | IoT, Python | — |
| BioWallet | Biometric wallet concept | TypeScript | — |
| cyber-shell-x-nexus | Cybersecurity learning platform, AI-guided ethical hacking | TypeScript, React, Gemini AI | 4 |
| oke-mekanik-mobile-service | Mobile mechanic service platform | JavaScript, Mobile | — |
| PromptForgeAI | AI prompt engineering toolkit | TypeScript, AI | — |
| Famlyzer-AI | AI-powered family analysis tool | TypeScript, AI | — |
| Misi-Screener | Market intelligence engine, agent-based architecture | Python, FastAPI | — |
| Trading-Plan-AI-Interactive | Interactive AI trading plan builder | TypeScript, AI | — |
| RTK-Token-Saver | LLM token optimization proxy (Rust), 60-90% reduction | Rust | 2 |

### 14.3 Experimental (4 Repos)

Learning projects or early experiments. Show selectively.

| Repo | Description | Note |
|------|-------------|------|
| SolSniperX | Blockchain automation bot for Solana | Learning project |
| WiFiToolX | Network security assessment tool | Authorized research only |
| GlowPilot | AI dermatology & skincare advisor with voice | Experimental |
| Clipper-AI | AI clipboard assistant | Experimental |

### 14.4 Archive

Older or abandoned repos that should remain public but not be promoted. Consider:
- Moving to an `archive-` prefix
- Adding `archived: true` on GitHub
- Or transferring to a separate archival account

### 14.5 Migration Notes

1. The account `mulkymalikuldhaher` currently has 0 public repos — all projects need to be created or migrated
2. Featured repos should be split between personal and org accounts based on scope
3. After migration, re-run sync workflows to regenerate READMEs with live data
4. The `brand.config.json` contains authoritative project metadata — keep it updated

---

## 15. Environment Variables

### 15.1 Required Variables

| Variable | Purpose | Used In | Required |
|----------|---------|---------|----------|
| `GITHUB_TOKEN` | GitHub API authentication for repo fetching | Generator scripts | For generators |
| `PROFILE_SYNC_TOKEN` | GitHub PAT for workflow commits | GitHub Actions | For auto-sync |
| `FEATURED_REPOS` | Override default featured repos list | Generator scripts | Optional |
| `NEXT_OUTPUT` | Set to `export` for static build | GitHub Actions | For deployment |

### 15.2 Optional Variables

| Variable | Purpose | Used In | Default |
|----------|---------|---------|---------|
| `ZAI_API_KEY` | z-ai-web-dev-sdk API key | `/api/chat` route | None (auto-configured) |

### 15.3 GitHub Secrets Setup

For each profile repository:

1. Go to **Settings → Secrets and variables → Actions**
2. Add `PROFILE_SYNC_TOKEN` with scopes: `repo`, `read:org`, `workflow`
3. The workflow will use this token to fetch repo data and commit changes

### 15.4 No API Keys on GitHub Pages

The static deployment does not expose any API keys:
- Static knowledge base has no external dependencies
- TTS/Voice use browser-native APIs
- The `/api/chat` route only works with a running server (development or Vercel)
- If adding API mode to production, keep the API key server-side

---

## 16. Build and Deploy Commands

### 16.1 Development

```bash
# Install dependencies
bun install

# Start development server (with API routes)
bun run dev
# → http://localhost:3000

# Alternative with npm
npm install
npm run dev
```

### 16.2 Production Build (Server)

```bash
# Build with server-side rendering
bun run build

# Start production server
bun run start
```

### 16.3 Static Export (GitHub Pages)

```bash
# Build static export
NEXT_OUTPUT=export bun run build
# Output: ./out/

# Or configure next.config.ts permanently:
# output: 'export', images: { unoptimized: true }
```

### 16.4 Linting

```bash
bun run lint
```

### 16.5 Database (If Using Prisma)

```bash
bun run db:push       # Push schema to database
bun run db:generate   # Generate Prisma client
bun run db:migrate    # Run migrations
bun run db:reset      # Reset database
```

### 16.6 Profile Generators

```bash
# Personal profile
cd personal-profile/
GITHUB_TOKEN=your_token python3 scripts/generate-readme.py

# Organization profile
cd org-profile/
GITHUB_TOKEN=your_token python3 scripts/generate-org-readme.py

# With featured repos override
FEATURED_REPOS=ProxyGateLLM,Quant-Nanggroe-AI python3 scripts/generate-readme.py
```

### 16.7 Complete Deployment Checklist

```bash
# 1. Verify next.config.ts has static export settings
#    output: 'export'
#    images: { unoptimized: true }

# 2. Build
bun run build

# 3. Verify output
ls out/index.html  # Should exist

# 4. Deploy to GitHub Pages
cd out/
git init
git remote add origin https://github.com/dhaher-labs/dhaher-labs.github.io.git
git add .
git commit -m "deploy: static site"
git branch -M main
git push -u origin main --force

# 5. Enable GitHub Pages
# Settings → Pages → Source: GitHub Actions (for auto-deploy)
# or Source: Deploy from branch → main / root

# 6. Verify
# Visit dhaher-labs.github.io
# Test chatbot (static mode)
# Test TTS (read aloud button)
# Test voice input (microphone button)
# Check responsive design on mobile
# Verify all links work
```

---

## Appendix A: CV Corrections Applied

The original CV contained claims that could not be verified from the live GitHub account. The following corrections were applied:

| Original Claim | Correction | Reason |
|---------------|-----------|--------|
| "100 public repositories on GitHub" | Removed | Account shows 0 public repos |
| "1,542 GitHub contributions in the past year" | Removed | Cannot verify, should not claim |
| "Computer Science" (SMK education) | "Teknik Informatika — Prodi Multimedia" | Accurate program name |
| Skills listed as proficient | Marked as "(learning)" where appropriate | Honest skill assessment |
| "Founder" as primary role | "Independent Builder" / "Building Dhaher Labs" | Accurate positioning |

## Appendix B: Shared Source of Truth

All outputs are driven by `brand.config.json` (v3.0.0). Key sections:

| Section | Content | Consumed By |
|---------|---------|-------------|
| `identity` | Name, headline, role, location | Profile READMEs, website, chatbot, CV |
| `brand` | Lab name, tagline, positioning | Org README, website, chatbot |
| `colors` | All hex values | Website CSS, README badges |
| `contact` | Email, GitHub, Instagram, portfolio | All outputs |
| `work` | Current and past employment | About section, chatbot, CV |
| `education` | Current and past education | About section, chatbot, CV |
| `skills` | Development, industrial, design | Skills section, chatbot, CV |
| `projects` | 8 featured, 9 supporting, 4 experimental | Projects section, chatbot, READMEs |
| `cvCorrections` | Claims to remove/fix | CV document |

After editing `brand.config.json`, regenerate all outputs:

```bash
cd personal-profile/ && python3 scripts/generate-readme.py
cd org-profile/ && python3 scripts/generate-org-readme.py
# Rebuild and redeploy website
```

## Appendix C: Dependency Reference

### Core Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| next | ^16.1.1 | React framework |
| react | ^19.0.0 | UI library |
| framer-motion | ^12.23.2 | Animations |
| tailwindcss | ^4 | Utility CSS |
| z-ai-web-dev-sdk | ^0.0.17 | AI chat API |
| next-intl | ^4.3.4 | Internationalization |
| next-themes | ^0.4.6 | Day/night theme |
| zustand | ^5.0.6 | State management |
| react-markdown | ^10.1.0 | Markdown in chat |
| react-syntax-highlighter | ^15.6.1 | Code highlighting |
| lucide-react | ^0.525.0 | Icons |
| next-auth | ^4.24.11 | Authentication |
| @prisma/client | ^6.11.1 | Database ORM |
| @tanstack/react-query | ^5.82.0 | Data fetching |
| sharp | ^0.34.3 | Image processing |

### UI Component Library (shadcn/ui)

50+ Radix UI-based components including:
accordion, alert, alert-dialog, avatar, badge, breadcrumb, button, calendar, card, carousel, chart, checkbox, collapsible, command, context-menu, dialog, drawer, dropdown-menu, form, hover-card, input, input-otp, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, switch, table, tabs, textarea, toast, toaster, toggle, toggle-group, tooltip

---

*Documentation generated for the Dhaher Labs ecosystem v3.0.0. For questions or updates, contact mulkymalikuldhaher@mail.com.*
