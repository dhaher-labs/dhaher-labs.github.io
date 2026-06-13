'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Clock,
  Sparkles,
  Search,
  X,
  ChevronRight,
  BookOpen,
} from 'lucide-react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/providers/language-provider'
import { articles, categories } from '@/data/articles'

export default function ArticlesPage() {
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null)

  const filteredArticles = useMemo(() => {
    let result = articles
    if (selectedCategory !== 'All') {
      result = result.filter((a) => a.category === selectedCategory)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.tags.some((tag) => tag.toLowerCase().includes(q))
      )
    }
    return result
  }, [selectedCategory, searchQuery])

  const activeArticle = selectedArticle
    ? articles.find((a) => a.id === selectedArticle)
    : null

  return (
    <div className="min-h-screen flex flex-col bg-background auto-fit">
      {/* Navbar-like header */}
      <header className="glass-nav sticky top-0 z-50 py-3">
        <div className="container-glass flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-xs font-mono">DHAHER LABS</span>
          </a>
          <div className="flex items-center gap-2">
            <Image
              src="/dhaherlabs-logo.png"
              alt="Dhaher Labs"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
        </div>
      </header>

      <main className="flex-1 py-12 relative overflow-hidden">
        {/* Ambient orbs */}
        <div
          className="ambient-orb w-[400px] h-[400px] bg-gold top-[10%] right-[5%]"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="ambient-orb w-[350px] h-[350px] bg-cyan bottom-[10%] left-[10%]"
          style={{ animationDelay: '8s' }}
        />

        <div className="container-glass relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-xs font-mono text-muted-foreground mb-4">
              <BookOpen className="h-3 w-3 text-gold" />
              {t('articles.title')}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black mb-3">
              <span className="gradient-text">{t('articles.title')}</span>
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              {t('articles.subtitle')}
            </p>
          </motion.div>

          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-8 space-y-4"
          >
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('articles.search')}
                className="pl-9 pr-8 h-10 glass-card border-border/20 text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground transition-colors" />
                </button>
              )}
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-primary/15 text-primary border border-primary/30 glow-gold'
                      : 'glass-card text-muted-foreground hover:text-foreground border border-transparent'
                  }`}
                >
                  {cat === 'All' ? t('articles.all') : cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Articles Grid or Detail View */}
          <AnimatePresence mode="wait">
            {activeArticle ? (
              <motion.div
                key="detail"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Article Detail */}
                <div className="max-w-3xl mx-auto">
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-6 transition-colors"
                  >
                    <ArrowLeft className="h-3 w-3" />
                    {t('articles.all')} Articles
                  </button>

                  <div className="article-card glass-card rounded-2xl p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="category-tag px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase">
                        {activeArticle.category}
                      </span>
                      {activeArticle.aiGenerated && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
                          <Sparkles className="h-2.5 w-2.5 text-gold" />
                          {t('articles.aiGenerated')}
                        </span>
                      )}
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-black text-foreground mb-3">
                      {activeArticle.title}
                    </h1>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono mb-6">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activeArticle.readTime}
                      </span>
                      <span>{activeArticle.date}</span>
                    </div>

                    <div className="prose-sm text-foreground/80 space-y-4">
                      {activeArticle.content.map((paragraph, i) => (
                        <p key={i} className="text-sm leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-border/20">
                      {activeArticle.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-md text-[10px] font-mono bg-secondary/50 text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filteredArticles.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-sm text-muted-foreground">
                      No articles found matching your search.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map((article, idx) => (
                      <motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.06 }}
                        className={`article-card glass-card rounded-2xl p-6 group cursor-pointer hover:border-primary/20 ${
                          article.featured ? 'article-featured' : ''
                        }`}
                        onClick={() => setSelectedArticle(article.id)}
                      >
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

                        <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                        </h3>

                        <p className="text-xs text-muted-foreground mb-4 line-clamp-3">
                          {article.summary}
                        </p>

                        <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Clock className="h-2.5 w-2.5" />
                              {article.readTime}
                            </span>
                            <span>{article.date}</span>
                          </div>
                          <ChevronRight className="h-3.5 w-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

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
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/20 py-6 mt-auto">
        <div className="container-glass flex items-center justify-center gap-4">
          <a
            href="/"
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            &larr; Back to Dhaher Labs
          </a>
          <span className="text-muted-foreground/30">|</span>
          <a
            href="https://github.com/dhaher-labs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  )
}
