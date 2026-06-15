'use client'

import { motion } from 'framer-motion'
import { Mail, Instagram, Github, ExternalLink } from 'lucide-react'
import { useLanguage } from '@/providers/language-provider'

const CONTACT_ITEMS = [
  {
    icon: Mail,
    labelKey: 'contact.email',
    value: 'dhaher-labs@email.com',
    href: 'mailto:dhaher-labs@email.com',
    accent: '#D9A441',
    desc: 'Reach out to us',
  },
  {
    icon: Instagram,
    labelKey: 'contact.instagram',
    value: '@dhaherlabs',
    href: 'https://instagram.com/dhaherlabs',
    accent: '#E1306C',
    desc: 'Follow our journey',
  },
  {
    icon: Github,
    labelKey: 'contact.github',
    value: 'dhaher-labs',
    href: 'https://github.com/dhaher-labs',
    accent: '#00D1C7',
    desc: 'Open source code',
  },
  {
    icon: ExternalLink,
    labelKey: 'contact.portfolio',
    value: 'Portfolio',
    href: 'https://mulkymalikuldhaher.github.io',
    accent: '#A78BFA',
    desc: 'Personal portfolio',
  },
]

export function ContactSection() {
  const { t } = useLanguage()

  return (
    <section id="contact" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background orbs */}
      <div className="ambient-orb w-[300px] h-[300px] bg-cyan top-[10%] right-[10%]" style={{ animationDelay: '6s' }} />

      <div className="container-glass">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-xs font-mono text-primary tracking-wider uppercase">{t('contact.label')}</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2">{t('contact.title')}</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CONTACT_ITEMS.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.a
                key={item.labelKey}
                href={item.href}
                target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="liquid-glass iridescent-border rounded-xl p-6 flex flex-col items-center text-center group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${item.accent}15` }}
                >
                  <Icon className="h-5 w-5" style={{ color: item.accent }} />
                </div>
                <span className="text-xs text-muted-foreground mb-1">{t(item.labelKey)}</span>
                <span className="text-sm font-medium text-foreground mb-1">{item.value}</span>
                <span className="text-[10px] text-muted-foreground/50">{item.desc}</span>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
