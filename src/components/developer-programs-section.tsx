'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Award } from 'lucide-react'
import { useLanguage } from '@/providers/language-provider'

const GOOGLE_PROGRAMS = [
  {
    key: 'gde',
    href: 'https://developers.google.com/community/experts',
    color: '#4285F4',
    label: 'Google Developer Expert',
  },
  {
    key: 'gdg',
    href: 'https://developers.google.com/community/gdg',
    color: '#4285F4',
    label: 'Google Developer Groups',
  },
  {
    key: 'gdsc',
    href: 'https://developers.google.com/community/gdsc',
    color: '#34A853',
    label: 'Google Developer Student Clubs',
  },
  {
    key: 'wtm',
    href: 'https://developers.google.com/womentechmakers',
    color: '#E91E63',
    label: 'Women Techmakers',
  },
  {
    key: 'tfug',
    href: 'https://www.tensorflow.org/community',
    color: '#FF6F00',
    label: 'TensorFlow User Group',
  },
  {
    key: 'cloud-innovators',
    href: 'https://cloud.google.com/innovators',
    color: '#4285F4',
    label: 'Google Cloud Innovators',
  },
  {
    key: 'android-dev',
    href: 'https://developer.android.com',
    color: '#3DDC84',
    label: 'Android Developer',
  },
  {
    key: 'assistant-dev',
    href: 'https://developers.google.com/assistant',
    color: '#4285F4',
    label: 'Google Assistant Developer',
  },
  {
    key: 'maps-platform',
    href: 'https://developers.google.com/maps',
    color: '#34A853',
    label: 'Google Maps Platform',
  },
  {
    key: 'firebase-community',
    href: 'https://firebase.google.com/community',
    color: '#FFCA28',
    label: 'Firebase Community',
  },
  {
    key: 'angular-community',
    href: 'https://angular.dev',
    color: '#DD0031',
    label: 'Angular Community',
  },
  {
    key: 'flutter-community',
    href: 'https://flutter.dev/community',
    color: '#02569B',
    label: 'Flutter Community',
  },
  {
    key: 'gdev-cert',
    href: 'https://developers.google.com/certification',
    color: '#4285F4',
    label: 'Google Developer Certification',
  },
  {
    key: 'google-startups',
    href: 'https://startup.google.com',
    color: '#4285F4',
    label: 'Google for Startups',
  },
  {
    key: 'google-edu',
    href: 'https://edu.google.com',
    color: '#34A853',
    label: 'Google for Education',
  },
]

const GITHUB_PROGRAMS = [
  {
    key: 'github-campus',
    href: 'https://education.github.com/experts',
    color: '#8B949E',
    label: 'GitHub Campus Expert',
  },
  {
    key: 'github-stars',
    href: 'https://stars.github.com',
    color: '#F78166',
    label: 'GitHub Stars',
  },
  {
    key: 'arctic-vault',
    href: 'https://archiveprogram.github.com',
    color: '#8B949E',
    label: 'Arctic Code Vault Contributor',
  },
  {
    key: 'github-dev',
    href: 'https://github.com/mulkymalikuldhaher',
    color: '#8B949E',
    label: 'GitHub Developer',
  },
  {
    key: 'copilot',
    href: 'https://github.com/features/copilot',
    color: '#6E40C9',
    label: 'GitHub Copilot',
  },
  {
    key: 'actions',
    href: 'https://github.com/features/actions',
    color: '#2088FC',
    label: 'GitHub Actions',
  },
  {
    key: 'codespaces',
    href: 'https://github.com/features/codespaces',
    color: '#2088FC',
    label: 'GitHub Codespaces',
  },
  {
    key: 'security',
    href: 'https://github.com/features/security',
    color: '#2088FC',
    label: 'GitHub Security',
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
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass text-xs font-mono text-muted-foreground mb-4">
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

        {/* Google Developer Ecosystem */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h3 className="text-sm font-mono text-muted-foreground mb-4 uppercase tracking-wider">Google Developer Ecosystem</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {GOOGLE_PROGRAMS.map((program, idx) => (
              <motion.a
                key={program.key}
                href={program.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="liquid-glass iridescent-border rounded-xl p-3 text-center group transition-all duration-300"
              >
                <div
                  className="w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: program.color }}
                >
                  G
                </div>
                <p className="text-[10px] font-medium text-muted-foreground group-hover:text-foreground transition-colors leading-tight">{program.label}</p>
                <ExternalLink className="h-2.5 w-2.5 text-primary/40 group-hover:text-primary mx-auto mt-1.5 transition-colors" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* GitHub Ecosystem */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-sm font-mono text-muted-foreground mb-4 uppercase tracking-wider">GitHub Ecosystem</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3">
            {GITHUB_PROGRAMS.map((program, idx) => (
              <motion.a
                key={program.key}
                href={program.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="liquid-glass iridescent-border rounded-xl p-4 text-center group transition-all duration-300"
              >
                <div
                  className="w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: program.color }}
                >
                  GH
                </div>
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
