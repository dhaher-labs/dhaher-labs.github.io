'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Wand2,
  Clock,
  Trash2,
  Copy,
  Twitter,
  Linkedin,
  ChevronRight,
  BookOpen,
  Loader2,
  Check,
  ArrowLeft,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/providers/language-provider'
import {
  generateArticle,
  saveArticleToStorage,
  getArticlesFromStorage,
  deleteArticleFromStorage,
  type GeneratedArticle,
  type ArticleCategory,
} from '@/lib/article-template'

const CATEGORIES: ArticleCategory[] = [
  'Technology',
  'Quant/Trading',
  'Development',
  'Security',
  'IoT',
  'Research',
]

// Ad slot component
function AdSlot({ position }: { position: 'after-first-paragraph' | 'end-of-article' }) {
  return (
    <div className="my-6 rounded-xl border border-border/20 bg-secondary/20 p-4 text-center">
      <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-muted-foreground/50">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />
        Advertisement
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />
      </div>
      <div className="mt-2 h-[60px] sm:h-[90px] rounded-lg bg-secondary/30 flex items-center justify-center">
        <span className="text-[9px] font-mono text-muted-foreground/30">
          {position === 'after-first-paragraph' ? '728×90' : '300×250'} Ad Slot
        </span>
      </div>
    </div>
  )
}

// Share buttons component
function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)
  const url = typeof window !== 'undefined' ? `${window.location.origin}/articles?article=${slug}` : ''

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [url])

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-card text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
      >
        {copied ? <Check className="h-3 w-3 text-emerald" /> : <Copy className="h-3 w-3" />}
        {copied ? t('articles.generate.copied') : t('articles.generate.copyLink')}
      </button>
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-card text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
      >
        <Twitter className="h-3 w-3" />
        Twitter
      </a>
      <a
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-card text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
      >
        <Linkedin className="h-3 w-3" />
        LinkedIn
      </a>
    </div>
  )
}

// Article detail view with streaming animation
function ArticleDetailView({
  article,
  isStreaming,
  streamedContent,
  onBack,
}: {
  article: GeneratedArticle
  isStreaming: boolean
  streamedContent: string[]
  onBack: () => void
}) {
  const { t } = useLanguage()
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isStreaming && contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight
    }
  }, [isStreaming, streamedContent])

  const displayContent = isStreaming ? streamedContent : article.content

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-3xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          {t('articles.all')} Articles
        </button>

        <div className="article-card glass-card rounded-2xl p-6 sm:p-8">
          {/* Category & AI Badge */}
          <div className="flex items-center gap-3 mb-4">
            <span className="category-tag px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase">
              {article.category}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
              <Sparkles className="h-2.5 w-2.5 text-gold" />
              {t('articles.aiGenerated')}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-black text-foreground mb-3">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono mb-6">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {article.readTime}
            </span>
            <span>{article.date}</span>
          </div>

          {/* JSON-LD Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(article.jsonLd),
            }}
          />

          {/* Content */}
          <div ref={contentRef} className="prose-sm text-foreground/80 space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
            {displayContent.map((paragraph, i) => (
              <div key={i}>
                <p className={`text-sm leading-relaxed ${i === 0 ? 'font-medium text-foreground/90' : ''}`}>
                  {paragraph}
                </p>
                {/* Ad slot after first paragraph */}
                {i === 0 && !isStreaming && <AdSlot position="after-first-paragraph" />}
              </div>
            ))}
            {isStreaming && (
              <span className="inline-block w-0.5 h-4 bg-primary animate-pulse" />
            )}
          </div>

          {/* End ad slot — only show when streaming is done */}
          {!isStreaming && <AdSlot position="end-of-article" />}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-border/20">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-md text-[10px] font-mono bg-secondary/50 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Share buttons */}
          {!isStreaming && (
            <div className="mt-4 pt-4 border-t border-border/20">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-muted-foreground">{t('articles.generate.share')}</span>
                <ShareButtons title={article.title} slug={article.slug} />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Generated article card
function GeneratedArticleCard({
  article,
  onClick,
  onDelete,
}: {
  article: GeneratedArticle
  onClick: () => void
  onDelete: () => void
}) {
  const { t } = useLanguage()
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="article-card glass-card rounded-2xl p-6 group cursor-pointer hover:border-primary/20 relative"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="category-tag px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase">
          {article.category}
        </span>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[9px] text-muted-foreground font-mono">
            <Sparkles className="h-2.5 w-2.5 text-gold" />
            {t('articles.aiGenerated')}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowConfirm(true)
            }}
            className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
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

      {/* Delete confirmation overlay */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-2xl glass-card flex items-center justify-center gap-3 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-xs text-muted-foreground font-mono">{t('articles.generate.deleteConfirm')}</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete()
                setShowConfirm(false)
              }}
              className="px-3 py-1 rounded-md bg-destructive/20 text-destructive text-xs font-mono hover:bg-destructive/30 transition-colors"
            >
              {t('articles.generate.deleteYes')}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowConfirm(false)
              }}
              className="px-3 py-1 rounded-md bg-secondary/30 text-muted-foreground text-xs font-mono hover:text-foreground transition-colors"
            >
              {t('articles.generate.deleteNo')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function ArticleGeneratorSection() {
  const { t } = useLanguage()
  const [topic, setTopic] = useState('')
  const [category, setCategory] = useState<ArticleCategory>('Technology')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedArticles, setGeneratedArticles] = useState<GeneratedArticle[]>(() => {
    if (typeof window === 'undefined') return []
    return getArticlesFromStorage()
  })
  const [selectedArticle, setSelectedArticle] = useState<GeneratedArticle | null>(null)
  const [streamedContent, setStreamedContent] = useState<string[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const streamIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const articleRef = useRef<GeneratedArticle | null>(null)

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (streamIntervalRef.current) {
        clearInterval(streamIntervalRef.current)
      }
    }
  }, [])

  const handleGenerate = useCallback(() => {
    if (!topic.trim() || isGenerating) return

    setIsGenerating(true)
    setSelectedArticle(null)
    setStreamedContent([])
    setIsStreaming(false)

    // Generate article
    const article = generateArticle(topic.trim(), category)
    articleRef.current = article

    // Start streaming simulation
    setIsStreaming(true)
    setSelectedArticle(article)

    const fullContent = article.content
    let currentParagraphIndex = 0
    let currentCharIndex = 0
    const streamedParagraphs: string[] = []

    // Add empty first paragraph to start
    streamedParagraphs.push('')
    setStreamedContent([...streamedParagraphs])

    streamIntervalRef.current = setInterval(() => {
      if (currentParagraphIndex >= fullContent.length) {
        // Streaming complete
        if (streamIntervalRef.current) clearInterval(streamIntervalRef.current)
        setIsStreaming(false)
        setIsGenerating(false)
        setStreamedContent(fullContent)

        // Save to localStorage
        saveArticleToStorage(article)
        setGeneratedArticles(getArticlesFromStorage())
        return
      }

      const currentParagraph = fullContent[currentParagraphIndex]
      const charsToAdd = 2 + Math.floor(Math.random() * 3) // 2-4 chars at a time for speed

      currentCharIndex += charsToAdd

      if (currentCharIndex >= currentParagraph.length) {
        // Move to next paragraph
        streamedParagraphs[currentParagraphIndex] = currentParagraph
        currentParagraphIndex++
        currentCharIndex = 0

        if (currentParagraphIndex < fullContent.length) {
          streamedParagraphs.push('')
        }
      } else {
        streamedParagraphs[currentParagraphIndex] = currentParagraph.slice(0, currentCharIndex)
      }

      setStreamedContent([...streamedParagraphs])
    }, 16) // ~60fps for smooth streaming
  }, [topic, category, isGenerating])

  const handleDeleteArticle = useCallback((articleId: string) => {
    deleteArticleFromStorage(articleId)
    setGeneratedArticles(getArticlesFromStorage())
  }, [])

  const handleSelectArticle = useCallback((article: GeneratedArticle) => {
    setSelectedArticle(article)
    setStreamedContent(article.content)
    setIsStreaming(false)
  }, [])

  return (
    <div className="space-y-8">
      {/* Generator Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="glass-card rounded-2xl p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
              <Wand2 className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">{t('articles.generate.title')}</h3>
              <p className="text-[10px] font-mono text-muted-foreground">{t('articles.generate.subtitle')}</p>
            </div>
          </div>

          {/* Topic Input */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-mono text-muted-foreground mb-1.5 block">{t('articles.generate.topic')}</label>
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={t('articles.generate.topicPlaceholder')}
                className="h-10 glass-card border-border/20 text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleGenerate()
                }}
              />
            </div>

            {/* Category Selector */}
            <div>
              <label className="text-xs font-mono text-muted-foreground mb-1.5 block">{t('articles.generate.category')}</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-300 ${
                      category === cat
                        ? 'bg-primary/15 text-primary border border-primary/30 glow-gold'
                        : 'glass-card text-muted-foreground hover:text-foreground border border-transparent'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={!topic.trim() || isGenerating}
              className="w-full h-11 glass-button border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-all"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  {t('articles.generate.generating')}
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  {t('articles.generate.button')}
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Article Detail or List */}
      <AnimatePresence mode="wait">
        {selectedArticle ? (
          <ArticleDetailView
            key={selectedArticle.id}
            article={selectedArticle}
            isStreaming={isStreaming}
            streamedContent={streamedContent}
            onBack={() => setSelectedArticle(null)}
          />
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Generated Articles List */}
            {generatedArticles.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-3.5 w-3.5 text-gold" />
                    <span className="text-sm font-bold text-foreground">{t('articles.generate.generated')}</span>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      ({generatedArticles.length})
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {generatedArticles.map((article) => (
                      <GeneratedArticleCard
                        key={article.id}
                        article={article}
                        onClick={() => handleSelectArticle(article)}
                        onDelete={() => handleDeleteArticle(article.id)}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Empty state */}
            {generatedArticles.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-secondary/30 mx-auto mb-4">
                  <Sparkles className="h-6 w-6 text-muted-foreground/40" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">{t('articles.generate.empty')}</p>
                <p className="text-[11px] text-muted-foreground/60 font-mono">
                  {t('articles.generate.emptyHint')}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
