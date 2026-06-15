'use client'

import { motion } from 'framer-motion'
import { Instagram, ExternalLink, Heart, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/providers/language-provider'

const INSTA_POSTS = [
  {
    id: 1,
    gradient: 'from-amber-500/20 to-orange-600/20',
    title: 'ProxyGateLLM',
    desc: 'Multi-LLM Gateway — 22 providers, 350+ models',
    likes: 42,
    comments: 8,
  },
  {
    id: 2,
    gradient: 'from-cyan-500/20 to-teal-600/20',
    title: 'Quant-Nanggroe-AI',
    desc: 'Trading Research Dashboard',
    likes: 35,
    comments: 5,
  },
  {
    id: 3,
    gradient: 'from-violet-500/20 to-purple-600/20',
    title: 'OpenCode-Android',
    desc: 'Native Android coding assistant',
    likes: 67,
    comments: 12,
  },
  {
    id: 4,
    gradient: 'from-emerald-500/20 to-green-600/20',
    title: 'Nanggroe-IoT',
    desc: 'IoT infrastructure for sensor management',
    likes: 28,
    comments: 3,
  },
  {
    id: 5,
    gradient: 'from-rose-500/20 to-pink-600/20',
    title: 'GlowPilot',
    desc: 'Skincare advisor with LLM + voice',
    likes: 54,
    comments: 9,
  },
  {
    id: 6,
    gradient: 'from-emerald-500/20 to-green-600/20',
    title: 'KALEN',
    desc: 'Workflow orchestration system',
    likes: 31,
    comments: 6,
  },
]

export function InstagramSection() {
  const { t } = useLanguage()

  return (
    <section id="instagram" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background orbs */}
      <div className="ambient-orb w-[300px] h-[300px] bg-rose top-[20%] left-[10%]" style={{ animationDelay: '2s' }} />

      <div className="container-glass">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Instagram className="h-4 w-4 text-primary" />
            <span className="text-xs font-mono text-primary tracking-wider uppercase">{t('instagram.label')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-3">
            <span className="insta-gradient">{t('instagram.title')}</span>
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
            {t('instagram.desc')}
          </p>
        </motion.div>

        {/* Instagram-style grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
          {INSTA_POSTS.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="insta-card liquid-glass iridescent-border rounded-xl aspect-square relative cursor-pointer group"
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${post.gradient} grid-pattern`} />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-[1]">
                <h4 className="text-sm font-bold text-foreground mb-1">{post.title}</h4>
                <p className="text-[10px] text-muted-foreground line-clamp-2">{post.desc}</p>
              </div>

              {/* Hover overlay */}
              <div className="insta-overlay">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-white text-xs font-medium">
                    <Heart className="h-3.5 w-3.5" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1 text-white text-xs font-medium">
                    <MessageCircle className="h-3.5 w-3.5" /> {post.comments}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild className="glass-button bg-primary hover:bg-primary/90 text-primary-foreground glow-gold">
            <a
              href="https://instagram.com/dhaherlabs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-4 w-4 mr-2" />
              {t('instagram.cta')}
            </a>
          </Button>
          <div className="mt-4">
            <a
              href="https://instagram.com/dhaherlabs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="h-3 w-3" />
              instagram.com/dhaherlabs
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
