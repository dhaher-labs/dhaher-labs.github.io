'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Monitor, Globe, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { useLanguage } from '@/providers/language-provider'

const NAV_ITEMS = [
  { key: 'nav.about', href: '#about' },
  { key: 'nav.focus', href: '#focus' },
  { key: 'nav.projects', href: '#projects' },
  { key: 'nav.articles', href: '#articles' },
  { key: 'nav.instagram', href: '#instagram' },
  { key: 'nav.devprograms', href: '#devprograms' },
  { key: 'nav.founder', href: '#founder' },
  { key: 'nav.contact', href: '#contact' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { t, language, setLanguage, availableLanguages } = useLanguage()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark')
    else if (theme === 'dark') setTheme('system')
    else setTheme('light')
  }

  const ThemeIcon = theme === 'dark' ? Moon : theme === 'light' ? Sun : Monitor

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-500 ${
        scrolled ? 'py-2' : 'py-3'
      }`}
    >
      <div className="container-glass flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center glass-button border border-primary/20 overflow-hidden group-hover:border-primary/40 transition-colors">
            <Image
              src="/dhaherlabs-logo.png"
              alt="Dhaher Labs"
              width={28}
              height={28}
              className="object-contain"
            />
          </div>
          <span className="font-bold text-foreground text-sm tracking-wider group-hover:text-primary transition-colors">
            DHAHER LABS
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-all duration-300"
            >
              {t(item.key)}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          {/* Portfolio link */}
          <a
            href="https://mulkymalikuldhaher.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-[10px] text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary/30 transition-all duration-300"
          >
            <ExternalLink className="h-3 w-3" />
            Portfolio
          </a>

          {/* Language toggle */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 lang-switch"
              title="Language"
              onClick={() => setLangOpen(!langOpen)}
            >
              <Globe className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 py-1.5 rounded-xl glass-card min-w-[160px] z-50"
                >
                  {availableLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code)
                        setLangOpen(false)
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center gap-2.5 hover:bg-secondary/30 transition-colors ${
                        language === lang.code ? 'text-primary font-medium' : 'text-foreground'
                      }`}
                    >
                      <span className="text-sm">{lang.flag}</span>
                      <span>{lang.name}</span>
                      {language === lang.code && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme toggle */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={cycleTheme}
              className="h-8 w-8 theme-switch"
              title={`Theme: ${theme}`}
            >
              <ThemeIcon className="h-3.5 w-3.5 text-gold" />
            </Button>
          )}

          {/* Mobile menu */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border/20 mt-2"
          >
            <div className="container-glass py-4 flex flex-col gap-1 max-h-80 overflow-y-auto">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/30 rounded-lg transition-all"
                >
                  {t(item.key)}
                </a>
              ))}
              <div className="h-px bg-border/20 my-2" />
              <a
                href="https://mulkymalikuldhaher.github.io"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 text-sm text-primary hover:bg-secondary/30 rounded-lg transition-all flex items-center gap-2"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Portfolio
              </a>
              {/* Language selector in mobile */}
              <div className="px-4 py-2">
                <p className="text-[10px] text-muted-foreground mb-2 uppercase tracking-wider font-mono">Language</p>
                <div className="flex flex-wrap gap-1.5">
                  {availableLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`px-2.5 py-1 rounded-md text-xs flex items-center gap-1.5 transition-all ${
                        language === lang.code
                          ? 'bg-primary/10 text-primary border border-primary/20'
                          : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30 border border-transparent'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
