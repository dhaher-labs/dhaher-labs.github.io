'use client'

import { createContext, useContext, useState, useCallback, useSyncExternalStore, type ReactNode } from 'react'
import { translations, type Language, type TranslationKey } from '@/lib/translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
  availableLanguages: Array<{ code: Language; name: string; flag: string }>
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const AVAILABLE_LANGUAGES: Array<{ code: Language; name: string; flag: string }> = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'id', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
]

function detectBrowserLanguage(): Language {
  if (typeof navigator === 'undefined') return 'en'
  const lang = navigator.language.toLowerCase()
  if (lang.startsWith('id')) return 'id'
  if (lang.startsWith('ja')) return 'ja'
  if (lang.startsWith('zh')) return 'zh'
  if (lang.startsWith('ko')) return 'ko'
  if (lang.startsWith('ar')) return 'ar'
  return 'en'
}

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en'
  const saved = localStorage.getItem('dhaherlabs-lang')
  if (saved && ['en', 'id', 'ja', 'zh', 'ko', 'ar'].includes(saved)) return saved as Language
  return detectBrowserLanguage()
}

function subscribeLanguage(callback: () => void) {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

function getSnapshotLanguage(): Language {
  const saved = localStorage.getItem('dhaherlabs-lang')
  if (saved && ['en', 'id', 'ja', 'zh', 'ko', 'ar'].includes(saved)) return saved as Language
  return detectBrowserLanguage()
}

function getServerSnapshotLanguage(): Language {
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const detectedLanguage = useSyncExternalStore(
    subscribeLanguage,
    getSnapshotLanguage,
    getServerSnapshotLanguage
  )
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)
  const currentLanguage = language

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('dhaherlabs-lang', lang)
    if (typeof document !== 'undefined') {
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
      document.documentElement.lang = lang
    }
  }, [])

  const t = useCallback(
    (key: TranslationKey): string => {
      const lang = currentLanguage || detectedLanguage
      const langTranslations = translations[lang]
      if (langTranslations && langTranslations[key]) return langTranslations[key]
      if (translations.en[key]) return translations.en[key]
      return key
    },
    [currentLanguage, detectedLanguage]
  )

  return (
    <LanguageContext.Provider
      value={{
        language: currentLanguage || detectedLanguage,
        setLanguage,
        t,
        availableLanguages: AVAILABLE_LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
