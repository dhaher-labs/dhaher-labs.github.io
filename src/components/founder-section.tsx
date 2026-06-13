'use client'

import { motion } from 'framer-motion'
import { User, ExternalLink, Github, Instagram, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/providers/language-provider'

export function FounderSection() {
  const { t } = useLanguage()

  return (
    <section id="founder" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background orbs */}
      <div className="ambient-orb w-[250px] h-[250px] bg-gold bottom-[20%] right-[15%]" style={{ animationDelay: '4s' }} />

      <div className="container-glass">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-xs font-mono text-primary tracking-wider uppercase">{t('founder.label')}</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2">{t('founder.title')}</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card glass-card-hover holo-border rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20 glow-gold">
              <User className="h-10 w-10 text-primary" />
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground">{t('founder.name')}</h3>
              <p className="text-sm font-mono cyber-gradient mb-3">{t('founder.role')}</p>

              <div className="space-y-2 mb-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{t('founder.bio1')}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{t('founder.bio2')}</p>
              </div>

              {/* Quick links */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <a
                  href="https://github.com/mulkymalikuldhaher"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-all glass-button border border-transparent hover:border-border/30"
                >
                  <Github className="h-3 w-3" />
                  mulkymalikuldhaher
                </a>
                <a
                  href="https://instagram.com/mulkymalikuldhr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-all glass-button border border-transparent hover:border-border/30"
                >
                  <Instagram className="h-3 w-3" />
                  @mulkymalikuldhr
                </a>
                <a
                  href="mailto:mulkymalikuldhaher@mail.com"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-all glass-button border border-transparent hover:border-border/30"
                >
                  <Mail className="h-3 w-3" />
                  Email
                </a>
              </div>

              <a
                href="https://mulkymalikuldhaher.github.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="glass-button border-border/30 text-xs h-9" size="sm">
                  <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                  {t('founder.cta')}
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
