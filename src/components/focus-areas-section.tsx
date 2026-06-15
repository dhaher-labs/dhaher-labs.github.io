'use client'

import { motion } from 'framer-motion'
import { Brain, TrendingUp, Workflow, Code2 } from 'lucide-react'
import { useLanguage } from '@/providers/language-provider'

const FOCUS_AREAS = [
  {
    icon: Brain,
    titleKey: 'focus.ai.title',
    descKey: 'focus.ai.desc',
    accent: '#D9A441',
    glow: 'glow-gold',
    tags: ['LLM Gateways', 'LLM Tools', 'Memory Systems'],
  },
  {
    icon: TrendingUp,
    titleKey: 'focus.quant.title',
    descKey: 'focus.quant.desc',
    accent: '#00D1C7',
    glow: 'glow-cyan',
    tags: ['Trading Dashboards', 'Market Screening', 'Quant Tools'],
  },
  {
    icon: Workflow,
    titleKey: 'focus.auto.title',
    descKey: 'focus.auto.desc',
    accent: '#A78BFA',
    glow: 'glow-violet',
    tags: ['Orchestration', 'Data Recon', 'Task Pipelines'],
  },
  {
    icon: Code2,
    titleKey: 'focus.open.title',
    descKey: 'focus.open.desc',
    accent: '#34D399',
    glow: '',
    tags: ['Android Agents', 'Creative Studios', 'IoT'],
  },
]

export function FocusAreasSection() {
  const { t } = useLanguage()

  return (
    <section id="focus" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Subtle background orbs */}
      <div className="ambient-orb w-[250px] h-[250px] bg-cyan bottom-[10%] left-[5%]" style={{ animationDelay: '8s' }} />

      <div className="container-glass">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-xs font-mono text-primary tracking-wider uppercase">{t('focus.label')}</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2">{t('focus.title')}</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {FOCUS_AREAS.map((area, i) => {
            const Icon = area.icon
            return (
              <motion.div
                key={area.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`glass-card glass-card-hover tilt-card rounded-xl p-6 ${area.glow}`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${area.accent}15` }}
                >
                  <Icon className="h-6 w-6" style={{ color: area.accent }} />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{t(area.titleKey)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{t(area.descKey)}</p>
                <div className="flex flex-wrap gap-1.5">
                  {area.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono"
                      style={{
                        backgroundColor: `${area.accent}10`,
                        color: area.accent,
                        border: `1px solid ${area.accent}20`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
