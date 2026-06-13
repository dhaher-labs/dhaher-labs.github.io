'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, GitFork, ExternalLink, Github, RefreshCw, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useLanguage } from '@/providers/language-provider'
import { useGithubRepos } from '@/hooks/use-github-repos'

// Featured projects that get holographic borders
const FEATURED_REPOS = ['ProxyGateLLM', 'OpenCode-Android', 'Quant-Nanggroe-AI']

function ProjectCard({
  project,
  index,
  label,
}: {
  project: {
    name: string
    displayName: string
    description: string
    badges: string[]
    accent: string
    href: string
    stars: number
    forks: number
  }
  index: number
  label: string
}) {
  const isFeatured = FEATURED_REPOS.includes(project.name)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`glass-card glass-card-hover rounded-xl p-5 flex flex-col ${
        isFeatured ? 'holo-border holo-border-always glow-pulse' : ''
      }`}
    >
      {/* Featured badge */}
      {isFeatured && (
        <div className="mb-3 flex items-center gap-1.5">
          <span className="badge-shimmer px-2 py-0.5 rounded-md text-[9px] font-mono text-primary border border-primary/20 bg-primary/5">
            ★ Featured
          </span>
        </div>
      )}

      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${project.accent}15` }}
          >
            <Github className="h-4 w-4" style={{ color: project.accent }} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">{project.displayName}</h3>
            <span className="text-[10px] text-muted-foreground font-mono">{label}</span>
          </div>
        </div>
        {(project.stars > 0 || project.forks > 0) && (
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            {project.stars > 0 && (
              <span className="flex items-center gap-0.5">
                <Star className="h-3 w-3 text-gold" /> {project.stars}
              </span>
            )}
            {project.forks > 0 && (
              <span className="flex items-center gap-0.5">
                <GitFork className="h-3 w-3" /> {project.forks}
              </span>
            )}
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed mb-3 flex-1">{project.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {project.badges.map((badge) => (
            <Badge key={badge} variant="secondary" className="text-[9px] px-1.5 py-0 h-5">
              {badge}
            </Badge>
          ))}
        </div>
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </motion.div>
  )
}

function ProjectSkeleton() {
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <Skeleton className="w-8 h-8 rounded-lg" />
        <div>
          <Skeleton className="h-4 w-24 mb-1" />
          <Skeleton className="h-2 w-16" />
        </div>
      </div>
      <Skeleton className="h-3 w-full mb-2" />
      <Skeleton className="h-3 w-3/4 mb-3" />
      <div className="flex gap-1">
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-5 w-14" />
      </div>
    </div>
  )
}

export function ProjectsSection() {
  const { t } = useLanguage()
  const { orgProjects, crossProjects, loading } = useGithubRepos()
  const [lastSync, setLastSync] = useState<string>('')

  // Set last sync time
  useEffect(() => {
    if (!loading) {
      setLastSync(new Date().toLocaleTimeString())
    }
  }, [loading])

  return (
    <section id="projects" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background orbs */}
      <div className="ambient-orb w-[300px] h-[300px] bg-violet top-[20%] right-[5%]" style={{ animationDelay: '3s' }} />

      <div className="container-glass">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="text-xs font-mono text-primary tracking-wider uppercase">{t('projects.label')}</span>
              <h2 className="text-3xl sm:text-4xl font-bold mt-2">{t('projects.title')}</h2>
            </div>
            <div className="flex items-center gap-3">
              {lastSync && (
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
                  <Clock className="h-3 w-3" />
                  {lastSync}
                </span>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                title="Refresh"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="h-3.5 w-3.5 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProjectSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            {/* Org projects */}
            {orgProjects.length > 0 && (
              <div className="mb-12">
                <h3 className="text-sm font-mono text-muted-foreground mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {t('projects.org')} — dhaher-labs
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {orgProjects.map((project, i) => (
                    <ProjectCard key={project.name} project={project} index={i} label="dhaher-labs" />
                  ))}
                </div>
              </div>
            )}

            {/* Cross-linked projects */}
            {crossProjects.length > 0 && (
              <div>
                <h3 className="text-sm font-mono text-muted-foreground mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  {t('projects.cross')} — mulkymalikuldhaher
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {crossProjects.map((project, i) => (
                    <ProjectCard key={project.name} project={project} index={i} label="mulkymalikuldhaher" />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        <div className="text-center mt-8">
          <a href="https://github.com/dhaher-labs" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="glass-button border-border/30">
              <Github className="h-4 w-4 mr-2" />
              {t('projects.view')}
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
