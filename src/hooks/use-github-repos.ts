'use client'

import { useState, useEffect } from 'react'
import { ORG_PROJECTS, CROSS_LINKED_PROJECTS, fetchOrgRepos, fetchUserRepos, type GitHubRepo } from '@/lib/github'

interface ProjectData {
  name: string
  displayName: string
  description: string
  badges: string[]
  accent: string
  href: string
  stars: number
  forks: number
  source: 'org' | 'cross'
}

export function useGithubRepos() {
  const [orgProjects, setOrgProjects] = useState<ProjectData[]>([])
  const [crossProjects, setCrossProjects] = useState<ProjectData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        // Try to fetch live data
        const [orgRepos, userRepos] = await Promise.all([fetchOrgRepos(), fetchUserRepos()])

        if (orgRepos.length > 0) {
          setOrgProjects(
            orgRepos.map((repo: GitHubRepo) => ({
              name: repo.name,
              displayName: repo.name,
              description: repo.description || 'No description',
              badges: [repo.language || 'Code', ...repo.topics.slice(0, 2)],
              accent: Math.random() > 0.5 ? '#D9A441' : '#00D1C7',
              href: repo.html_url,
              stars: repo.stargazers_count,
              forks: repo.forks_count,
              source: 'org' as const,
            }))
          )
        } else {
          // Use fallback
          setOrgProjects(ORG_PROJECTS.map((p) => ({ ...p, source: 'org' as const })))
        }

        // Cross-linked featured repos from mulkymalikuldhaher
        const featuredNames = [
          'ProxyGateLLM',
          'OpenCode-Android',
          'blackhornet',
          'K.A.L.E.N',
          'Mnemosyne',
          'AI-MultiColony-Ecosystem',
          'GhostStudio-AI',
        ]

        if (userRepos.length > 0) {
          const crossRepos = userRepos.filter((r: GitHubRepo) => featuredNames.includes(r.name))
          if (crossRepos.length > 0) {
            setCrossProjects(
              crossRepos.map((repo: GitHubRepo) => {
                const fallback = CROSS_LINKED_PROJECTS.find((p) => p.name === repo.name)
                return {
                  name: repo.name,
                  displayName: fallback?.displayName || repo.name,
                  description: repo.description || fallback?.description || 'No description',
                  badges: [repo.language || 'Code', ...repo.topics.slice(0, 2)],
                  accent: fallback?.accent || '#D9A441',
                  href: repo.html_url,
                  stars: repo.stargazers_count,
                  forks: repo.forks_count,
                  source: 'cross' as const,
                }
              })
            )
          } else {
            setCrossProjects(CROSS_LINKED_PROJECTS.map((p) => ({ ...p, source: 'cross' as const })))
          }
        } else {
          setCrossProjects(CROSS_LINKED_PROJECTS.map((p) => ({ ...p, source: 'cross' as const })))
        }
      } catch {
        // Fallback to static data
        setOrgProjects(ORG_PROJECTS.map((p) => ({ ...p, source: 'org' as const })))
        setCrossProjects(CROSS_LINKED_PROJECTS.map((p) => ({ ...p, source: 'cross' as const })))
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return { orgProjects, crossProjects, loading }
}
