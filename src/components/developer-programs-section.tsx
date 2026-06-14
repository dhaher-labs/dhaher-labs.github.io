'use client'

import { motion } from 'framer-motion'
import { Github, Chrome, Bot, Award, ExternalLink } from 'lucide-react'
import { useLanguage } from '@/providers/language-provider'

const programs = [
  {
    key: 'github',
    icon: Github,
    href: 'https://github.com/mulkymalikuldhaher',
    color: 'text-foreground',
    bgGlow: 'glow-gold',
    borderColor: 'border-foreground/20 hover:border-foreground/40',
  },
  {
    key: 'googdev',
    icon: Chrome,
    href: 'https://g.dev/mulkymalikuldhaher',
    color: 'text-blue-400',
    bgGlow: 'glow-cyan',
    borderColor: 'border-blue-400/20 hover:border-blue-400/40',
  },
  {
    key: 'copilot',
    icon: Bot,
    href: 'https://github.com/features/copilot',
    color: 'text-emerald',
    bgGlow: 'glow-emerald',
    borderColor: 'border-emerald/20 hover:border-emerald/40',
  },
]

export function DeveloperProgramsSection() {
  const { t } = useLanguage()

  return (
    <section id="devprograms" className="py-20 relative overflow-hidden">
      {/* Ambient orbs */}
      <div
        className="ambient-orb w-[350px] h-[350px] bg-emerald top-[15%] left-[8%]"
        style={{ animationDelay: '5s' }}
      />
      <div
        className="ambient-orb w-[300px] h-[300px] bg-gold bottom-[15%] right-[10%]"
        style={{ animationDelay: '10s' }}
      />

      <div className="container-glass relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-xs font-mono text-muted-foreground mb-4">
            <Award className="h-3 w-3 text-gold" />
            {t('devprograms.title')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mb-3">
            <span className="gradient-text">{t('devprograms.title')}</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            {t('devprograms.subtitle')}
          </p>
        </motion.div>

        {/* Program Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {programs.map((program, idx) => {
            const Icon = program.icon
            return (
              <motion.a
                key={program.key}
                href={program.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`floating-island glass-card tilt-card rounded-2xl p-6 text-center group border ${program.borderColor} transition-all duration-500`}
              >
                {/* Badge */}
                <div
                  className={`developer-badge w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center glass-button ${program.bgGlow}`}
                >
                  <Icon className={`h-7 w-7 ${program.color}`} />
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {t(`devprograms.${program.key}.title`)}
                </h3>

                {/* Description */}
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                  {t(`devprograms.${program.key}.desc`)}
                </p>

                {/* Link indicator */}
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-primary/70 group-hover:text-primary transition-colors">
                  <ExternalLink className="h-2.5 w-2.5" />
                  Visit
                </span>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
