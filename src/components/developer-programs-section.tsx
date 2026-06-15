'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Award } from 'lucide-react'
import { useLanguage } from '@/providers/language-provider'

const programs = [
  {
    key: 'github',
    href: 'https://github.com/mulkymalikuldhaher',
    color: '#8B949E',
    icon: '🐙',
    label: 'GitHub Developer',
  },
  {
    key: 'googdev',
    href: 'https://g.dev/mulkymalikuldhaher',
    color: '#4285F4',
    icon: '🌐',
    label: 'Google Developer',
  },
  {
    key: 'copilot',
    href: 'https://github.com/features/copilot',
    color: '#6E40C9',
    icon: '🤖',
    label: 'GitHub Copilot',
  },
  {
    key: 'android',
    href: 'https://developer.android.com',
    color: '#3DDC84',
    icon: '📱',
    label: 'Android Developer',
  },
  {
    key: 'firebase',
    href: 'https://firebase.google.com',
    color: '#FFCA28',
    icon: '🔥',
    label: 'Firebase Developer',
  },
  {
    key: 'cloud',
    href: 'https://cloud.google.com',
    color: '#4285F4',
    icon: '☁️',
    label: 'Google Cloud',
  },
  {
    key: 'web',
    href: 'https://web.dev',
    color: '#4285F4',
    icon: '🌍',
    label: 'Web Developer',
  },
  {
    key: 'ai',
    href: 'https://ai.google',
    color: '#D9A441',
    icon: '🧠',
    label: 'Google AI',
  },
  {
    key: 'actions',
    href: 'https://github.com/features/actions',
    color: '#2088FC',
    icon: '⚡',
    label: 'GitHub Actions',
  },
  {
    key: 'codespaces',
    href: 'https://github.com/features/codespaces',
    color: '#2088FC',
    icon: '💻',
    label: 'GitHub Codespaces',
  },
  {
    key: 'security',
    href: 'https://github.com/features/security',
    color: '#2088FC',
    icon: '🔒',
    label: 'GitHub Security',
  },
  {
    key: 'tensorflow',
    href: 'https://www.tensorflow.org',
    color: '#FF6F00',
    icon: '📊',
    label: 'TensorFlow',
  },
  {
    key: 'chrome',
    href: 'https://developer.chrome.com',
    color: '#4285F4',
    icon: '🌐',
    label: 'Chrome Developer',
  },
  {
    key: 'flutter',
    href: 'https://flutter.dev',
    color: '#02569B',
    icon: '🦋',
    label: 'Flutter Developer',
  },
  {
    key: 'angular',
    href: 'https://angular.dev',
    color: '#DD0031',
    icon: '🔴',
    label: 'Angular Developer',
  },
]

export function DeveloperProgramsSection() {
  const { t } = useLanguage()

  return (
    <section id="devprograms" className="py-20 relative overflow-hidden">
      {/* Ambient orbs */}
      <div className="ambient-orb w-[350px] h-[350px] bg-emerald top-[15%] left-[8%]" style={{ animationDelay: '5s' }} />
      <div className="ambient-orb w-[300px] h-[300px] bg-gold bottom-[15%] right-[10%]" style={{ animationDelay: '10s' }} />

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

        {/* Program Cards - Google Programs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-sm font-mono text-muted-foreground mb-4 uppercase tracking-wider">Google Developer Ecosystem</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {programs.filter(p => ['googdev', 'android', 'firebase', 'cloud', 'web', 'ai', 'tensorflow', 'chrome', 'flutter', 'angular'].includes(p.key)).map((program, idx) => (
              <motion.a
                key={program.key}
                href={program.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="glass-card rounded-xl p-3 text-center group border border-transparent hover:border-primary/20 transition-all duration-300"
              >
                <div className="text-2xl mb-1.5">{program.icon}</div>
                <p className="text-[10px] font-medium text-muted-foreground group-hover:text-foreground transition-colors leading-tight">{program.label}</p>
                <ExternalLink className="h-2.5 w-2.5 text-primary/40 group-hover:text-primary mx-auto mt-1.5 transition-colors" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* GitHub Programs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-sm font-mono text-muted-foreground mb-4 uppercase tracking-wider">GitHub Ecosystem</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {programs.filter(p => ['github', 'copilot', 'actions', 'codespaces', 'security'].includes(p.key)).map((program, idx) => (
              <motion.a
                key={program.key}
                href={program.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="glass-card rounded-xl p-4 text-center group border border-transparent hover:border-primary/20 transition-all duration-300"
              >
                <div className="text-2xl mb-1.5">{program.icon}</div>
                <p className="text-[10px] font-medium text-muted-foreground group-hover:text-foreground transition-colors leading-tight">{program.label}</p>
                <ExternalLink className="h-2.5 w-2.5 text-primary/40 group-hover:text-primary mx-auto mt-1.5 transition-colors" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
