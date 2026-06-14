'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Github, Sparkles, Zap } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/providers/language-provider'
import { ParticleCanvas } from '@/components/particle-canvas'

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
      {/* Particle background */}
      <ParticleCanvas />

      {/* Ambient orbs */}
      <div className="ambient-orb w-[500px] h-[500px] bg-gold top-[5%] left-[5%]" style={{ animationDelay: '0s' }} />
      <div className="ambient-orb w-[400px] h-[400px] bg-cyan top-[40%] right-[5%]" style={{ animationDelay: '7s' }} />
      <div className="ambient-orb w-[350px] h-[350px] bg-violet bottom-[10%] left-[25%]" style={{ animationDelay: '14s' }} />
      <div className="ambient-orb w-[300px] h-[300px] bg-emerald bottom-[30%] right-[20%]" style={{ animationDelay: '3s' }} />

      {/* Aurora bands */}
      <div className="aurora-band top-[20%]" style={{ animationDelay: '0s' }} />
      <div className="aurora-band top-[50%]" style={{ animationDelay: '3s' }} />
      <div className="aurora-band top-[80%]" style={{ animationDelay: '6s' }} />

      {/* Morphing blobs */}
      <div className="absolute top-[15%] right-[15%] w-24 h-24 bg-primary/5 morph-blob" style={{ animationDelay: '0s' }} />
      <div className="absolute bottom-[20%] left-[10%] w-20 h-20 bg-accent/5 morph-blob" style={{ animationDelay: '4s' }} />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6">
        {/* Org badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs font-mono text-muted-foreground">
            <Zap className="h-3 w-3 text-gold" />
            <span>Practical AI & Research Lab</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
          </span>
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mb-6 flex justify-center"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl glass-card p-2 border border-primary/20 glow-pulse">
            <Image
              src="/dhaherlabs-logo.png"
              alt="Dhaher Labs Logo"
              width={80}
              height={80}
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight mb-4"
        >
          <span className="gradient-text">{t('hero.name')}</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl font-mono text-muted-foreground tracking-wide mb-4"
        >
          {t('hero.tagline')}
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm sm:text-base text-muted-foreground/70 max-w-2xl mx-auto mb-8"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <a href="#projects">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground glass-button glow-gold h-10 px-6">
              {t('hero.cta.projects')}
            </Button>
          </a>
          <a href="https://github.com/dhaher-labs" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="glass-button border-border/30 h-10 px-6">
              <Github className="h-4 w-4 mr-2" />
              {t('hero.cta.github')}
            </Button>
          </a>
          <a href="#chat">
            <Button variant="ghost" className="glass-button text-accent hover:text-accent/80 h-10 px-6">
              <Sparkles className="h-4 w-4 mr-2" />
              {t('hero.cta.chat')}
            </Button>
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="h-5 w-5 text-muted-foreground/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
