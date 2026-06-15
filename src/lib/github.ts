export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  topics: string[]
  created_at: string
  updated_at: string
  pushed_at: string
  fork: boolean
  archived: boolean
  size: number
  default_branch: string
}

const GITHUB_ORG_API_URL = 'https://api.github.com/orgs/dhaher-labs/repos?sort=updated&per_page=100'
const GITHUB_USER_API_URL = 'https://api.github.com/users/mulkymalikuldhaher/repos?sort=updated&per_page=100'

export async function fetchOrgRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(GITHUB_ORG_API_URL, {
      headers: { Accept: 'application/vnd.github.v3+json' },
      next: { revalidate: 300 },
    })
    if (!response.ok) throw new Error(`GitHub API returned ${response.status}`)
    const repos: GitHubRepo[] = await response.json()
    return repos.filter((repo) => !repo.fork && !repo.archived)
  } catch (error) {
    console.error('Failed to fetch org repos:', error)
    return []
  }
}

export async function fetchUserRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(GITHUB_USER_API_URL, {
      headers: { Accept: 'application/vnd.github.v3+json' },
      next: { revalidate: 300 },
    })
    if (!response.ok) throw new Error(`GitHub API returned ${response.status}`)
    const repos: GitHubRepo[] = await response.json()
    return repos.filter((repo) => !repo.fork && !repo.archived)
  } catch (error) {
    console.error('Failed to fetch user repos:', error)
    return []
  }
}

export async function fetchSingleRepo(owner: string, repo: string): Promise<GitHubRepo | null> {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: { Accept: 'application/vnd.github.v3+json' },
    })
    if (!response.ok) return null
    return await response.json()
  } catch {
    return null
  }
}

export async function fetchRepoReadme(owner: string, repo: string): Promise<string | null> {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
      headers: { Accept: 'application/vnd.github.v3.raw' },
    })
    if (!response.ok) return null
    const text = await response.text()
    return text.slice(0, 3000)
  } catch {
    return null
  }
}

// Fallback static data for Dhaher Labs org projects
export const ORG_PROJECTS: Array<{
  name: string
  displayName: string
  description: string
  badges: string[]
  accent: string
  href: string
  stars: number
  forks: number
}> = [
  {
    name: 'Quant-Nanggroe-AI',
    displayName: 'Quant-Nanggroe-AI',
    description: 'Trading Research Dashboard — quantitative research interface for market analysis and data visualization.',
    badges: ['React 19', 'TypeScript', 'Tailwind'],
    accent: '#00D1C7',
    href: 'https://github.com/dhaher-labs/Quant-Nanggroe-AI',
    stars: 0,
    forks: 0,
  },
  {
    name: 'Misi-Screener',
    displayName: 'Misi-Screener',
    description: 'Market screening tool with configurable architecture for real-time market data filtering.',
    badges: ['Python', 'FastAPI'],
    accent: '#D9A441',
    href: 'https://github.com/dhaher-labs/Misi-Screener',
    stars: 0,
    forks: 0,
  },
  {
    name: 'GlowPilot-AI',
    displayName: 'GlowPilot-AI',
    description: 'AI skincare advisor — product recommendations with LLM-powered analysis and voice support.',
    badges: ['TypeScript', 'LLM', 'Voice'],
    accent: '#A78BFA',
    href: 'https://github.com/dhaher-labs/GlowPilot-AI',
    stars: 0,
    forks: 0,
  },
  {
    name: 'Nanggroe-IoT',
    displayName: 'Nanggroe-IoT',
    description: 'IoT infrastructure project. Connected devices and sensor data management system.',
    badges: ['IoT', 'Python'],
    accent: '#34D399',
    href: 'https://github.com/dhaher-labs/Nanggroe-IoT',
    stars: 0,
    forks: 0,
  },
]

// Fallback static data for cross-linked projects from mulkymalikuldhaher
export const CROSS_LINKED_PROJECTS: Array<{
  name: string
  displayName: string
  description: string
  badges: string[]
  accent: string
  href: string
  stars: number
  forks: number
}> = [
  {
    name: 'ProxyGateLLM',
    displayName: 'ProxyGateLLM',
    description: 'Multi-LLM API Gateway with unified proxy supporting 22 LLM providers (350+ models). OpenAI-compatible API, Docker-ready.',
    badges: ['Node.js', 'Express', 'Docker'],
    accent: '#D9A441',
    href: 'https://github.com/dhaher-labs/ProxyGateLLM',
    stars: 0,
    forks: 0,
  },
  {
    name: 'OpenCode-Android',
    displayName: 'OpenCode-Android',
    description: 'Native Android AI coding agent with Material Design 3 and SSE streaming for real-time code generation.',
    badges: ['Kotlin', 'Material Design 3', 'SSE'],
    accent: '#00D1C7',
    href: 'https://github.com/dhaher-labs/OpenCode-Android',
    stars: 0,
    forks: 0,
  },
  {
    name: 'blackhornet',
    displayName: 'blackhornet',
    description: 'Data reconnaissance toolkit. Research project exploring automated data collection and analysis patterns.',
    badges: ['AI', 'Rust'],
    accent: '#D9A441',
    href: 'https://github.com/dhaher-labs/blackhornet',
    stars: 0,
    forks: 0,
  },
  {
    name: 'K.A.L.E.N',
    displayName: 'K.A.L.E.N',
    description: 'Workflow orchestration system. Configurable task scheduling and execution pipeline for automated processes.',
    badges: ['TypeScript', 'Node.js'],
    accent: '#00D1C7',
    href: 'https://github.com/dhaher-labs/K.A.L.E.N',
    stars: 0,
    forks: 0,
  },
  {
    name: 'Mnemosyne',
    displayName: 'Mnemosyne',
    description: 'Memory and context management system for LLM conversations. Persistent context across conversations.',
    badges: ['Python', 'AI'],
    accent: '#A78BFA',
    href: 'https://github.com/dhaher-labs/Mnemosyne',
    stars: 0,
    forks: 0,
  },
  {
    name: 'AI-MultiColony-Ecosystem',
    displayName: 'AI-MultiColony-Ecosystem',
    description: 'Multi-agent coordination framework. Research project exploring how automated agents can communicate and collaborate.',
    badges: ['Python', 'Multi-Agent'],
    accent: '#D9A441',
    href: 'https://github.com/dhaher-labs/AI-MultiColony-Ecosystem',
    stars: 0,
    forks: 0,
  },
  {
    name: 'GhostStudio-AI',
    displayName: 'GhostStudio-AI',
    description: 'Creative studio tooling. Integrates with LLM APIs for content generation and creative assistance.',
    badges: ['TypeScript', 'LLM'],
    accent: '#00D1C7',
    href: 'https://github.com/dhaher-labs/GhostStudio-AI',
    stars: 0,
    forks: 0,
  },
]
