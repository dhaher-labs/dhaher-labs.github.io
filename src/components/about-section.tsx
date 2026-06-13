'use client'

import { motion } from 'framer-motion'
import { Beaker, ExternalLink, Target, Lightbulb, Shield, Code2 } from 'lucide-react'
import { useLanguage } from '@/providers/language-provider'

export function AboutSection() {
  const { t } = useLanguage()

  const missionItems = [
    { key: 'p1', icon: Lightbulb, color: '#D9A441' },
    { key: 'p2', icon: Target, color: '#00D1C7' },
    { key: 'p3', icon: Code2, color: '#A78BFA' },
    { key: 'p4', icon: Shield, color: '#34D399' },
  ]

  return (
    <section id="about" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Subtle background orbs */}
      <div className="ambient-orb w-[300px] h-[300px] bg-gold top-[10%] right-[10%]" style={{ animationDelay: '5s' }} />

      <div className="container-glass">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-2">
            <Beaker className="h-4 w-4 text-primary" />
            <span className="text-xs font-mono text-primary tracking-wider uppercase">{t('about.label')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">{t('about.title')}</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* What is Dhaher Labs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <div className="glass-card glass-card-hover rounded-xl p-6 space-y-4">
              <p className="text-muted-foreground leading-relaxed">{t('about.p1')}</p>
              <p className="text-muted-foreground leading-relaxed">{t('about.p2')}</p>
              <p className="text-muted-foreground leading-relaxed">{t('about.p3')}</p>
            </div>
            <a
              href="https://mulkymalikuldhaher.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline mt-2 glass-button px-3 py-1.5 rounded-lg border border-primary/20"
            >
              <ExternalLink className="h-3 w-3" />
              mulkymalikuldhaher.github.io
            </a>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-foreground">{t('about.mission.title')}</h3>
            <div className="space-y-3">
              {missionItems.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    className="glass-card glass-card-hover rounded-xl p-4 flex items-start gap-3"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${item.color}15` }}
                    >
                      <Icon className="h-4 w-4" style={{ color: item.color }} />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t(`about.mission.${item.key}`)}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
