'use client'

import Image from 'next/image'
import { Github, Instagram, ExternalLink, Heart, BookOpen, Award } from 'lucide-react'
import { useLanguage } from '@/providers/language-provider'

export function FooterSection() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-border/20 py-8 mt-auto relative overflow-hidden">
      <div className="container-glass">
        <div className="flex flex-col gap-6">
          {/* Main row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Left - Brand */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 overflow-hidden">
                <Image
                  src="/dhaherlabs-logo-dark.png"
                  alt="Dhaher Labs"
                  width={24}
                  height={24}
                  className="object-contain dark:hidden"
                />
                <Image
                  src="/dhaherlabs-logo-light.png"
                  alt="Dhaher Labs"
                  width={24}
                  height={24}
                  className="object-contain hidden dark:block"
                />
              </div>
              <div>
                <span className="text-xs font-bold text-foreground tracking-wider">DHAHER LABS</span>
                <p className="text-[10px] text-muted-foreground">{t('footer.rights')}</p>
              </div>
            </div>

            {/* Center - Links */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              <a
                href="#articles"
                className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
              >
                <BookOpen className="h-3 w-3" />
                {t('footer.articles')}
              </a>
              <a
                href="#devprograms"
                className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
              >
                <Award className="h-3 w-3" />
                {t('footer.devprograms')}
              </a>
              <a
                href="https://mulkymalikuldhaher.github.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 cross-link"
              >
                <ExternalLink className="h-3 w-3" />
                {t('footer.portfolio')}
              </a>
              <a
                href="https://github.com/dhaher-labs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
              >
                <Github className="h-3 w-3" />
                {t('footer.github')}
              </a>
              <a
                href="https://instagram.com/dhaherlabs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
              >
                <Instagram className="h-3 w-3" />
                {t('footer.instagram')}
              </a>
            </div>

            {/* Right - Built with */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span>{t('footer.built')}</span>
              <Heart className="h-3 w-3 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
