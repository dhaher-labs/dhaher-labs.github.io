'use client'

import { motion } from 'framer-motion'
import { Clock, Tag, Sparkles, ArrowRight, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/providers/language-provider'
import { articles } from '@/data/articles'

export function ArticlesSection() {
  const { t } = useLanguage()

  const featuredArticles = articles.filter((a) => a.featured).slice(0, 3)
  const recentArticles = articles.filter((a) => !a.featured).slice(0, 3)

  return (
    <section id="articles" className="py-20 relative overflow-hidden">
      {/* Ambient orbs */}
      <div className="ambient-orb w-[400px] h-[400px] bg-gold top-[10%] right-[5%]" style={{ animationDelay: '2s' }} />
      <div className="ambient-orb w-[350px] h-[350px] bg-cyan bottom-[10%] left-[10%]" style={{ animationDelay: '8s' }} />

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
            <BookOpen className="h-3 w-3 text-gold" />
            {t('articles.title')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mb-3">
            <span className="gradient-text">{t('articles.title')}</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            {t('articles.subtitle')}
          </p>
        </motion.div>

        {/* Featured Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {featuredArticles.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="article-card glass-card holo-border-always rounded-2xl p-6 group cursor-pointer"
              onClick={() => window.location.href = `/articles?id=${article.id}`}
            >
              {/* Category & AI Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="category-tag px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase">
                  {article.category}
                </span>
                {article.aiGenerated && (
                  <span className="inline-flex items-center gap-1 text-[9px] text-muted-foreground font-mono">
                    <Sparkles className="h-2.5 w-2.5 text-gold" />
                    {t('articles.aiGenerated')}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </h3>

              {/* Summary */}
              <p className="text-xs text-muted-foreground mb-4 line-clamp-3">
                {article.summary}
              </p>

              {/* Meta */}
              <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Clock className="h-2.5 w-2.5" />
                    {article.readTime}
                  </span>
                  <span>{article.date}</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {article.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-secondary/50 text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Articles Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {recentArticles.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="article-card glass-card rounded-xl p-4 group cursor-pointer hover:border-primary/20"
              onClick={() => window.location.href = `/articles?id=${article.id}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="category-tag px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase">
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-[9px] text-muted-foreground font-mono">
                  <Clock className="h-2 w-2" />
                  {article.readTime}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </h4>
              <p className="text-[11px] text-muted-foreground line-clamp-2">{article.summary}</p>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button asChild variant="outline" className="glass-button border-border/30 h-9 px-6 text-xs">
            <a href="/articles">
              <Tag className="h-3 w-3 mr-2" />
              {t('articles.readMore')}
              <ArrowRight className="h-3 w-3 ml-2" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
