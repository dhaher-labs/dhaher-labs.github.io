'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Send,
  Bot,
  User,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Download,
  Trash2,
  ScanSearch,
  Code2,
  Loader2,
  Cpu,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useLanguage } from '@/providers/language-provider'
import { fetchSingleRepo, fetchRepoReadme } from '@/lib/github'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  mode?: string
}

type ChatMode = 'agent' | 'scan' | 'code'

// Static knowledge base for fast responses
const knowledgeBase: Array<{ patterns: string[]; response: string }> = [
  {
    patterns: ['who is mulky', 'about mulky', 'tell me about mulky', 'who built this', 'who made this'],
    response: "Mulky Malikul Dhaher is building Dhaher Labs — a small personal lab where he builds practical AI systems, quantitative tools, and autonomous workflows. By day, he's an industrial maintenance technician and panel control operator at a cement packing plant in Lhokseumawe, Aceh. By night, he codes. He studies Sistem Informasi at Universitas Terbuka.",
  },
  {
    patterns: ['dhaher labs', 'what is dhaher labs', 'about the lab'],
    response: "Dhaher Labs is a small personal lab — not a company or startup — building practical AI systems, quantitative tools, and autonomous workflows. Focus areas: AI Systems, Quant Intelligence, Autonomous Workflows, and Open Source. Email: dhaher-labs@email.com | Instagram: @dhaherlabs | GitHub: dhaher-labs",
  },
  {
    patterns: ['proxygate', 'llm gateway', 'llm proxy'],
    response: "**ProxyGateLLM** — Multi-LLM API Gateway supporting 22 LLM providers (350+ models). OpenAI-compatible API, Docker-ready. Built with Node.js/Express. [GitHub](https://github.com/dhaher-labs/ProxyGateLLM)",
  },
  {
    patterns: ['opencode', 'android', 'coding agent'],
    response: "**OpenCode-Android** — Native Android AI coding agent with Material Design 3 and SSE streaming for real-time code generation. Built with Kotlin. [GitHub](https://github.com/dhaher-labs/OpenCode-Android)",
  },
  {
    patterns: ['quant', 'nanggroe', 'trading'],
    response: "**Quant-Nanggroe-AI** — Trading Research Dashboard for market analysis and data visualization. Built with React, TypeScript, and Tailwind CSS. [GitHub](https://github.com/dhaher-labs/Quant-Nanggroe-AI)",
  },
  {
    patterns: ['blackhornet', 'reconnaissance', 'data recon'],
    response: "**blackhornet** — Autonomous data reconnaissance system for automated data collection and analysis. Built with AI and Rust. [GitHub](https://github.com/dhaher-labs/blackhornet)",
  },
  {
    patterns: ['kalen', 'workflow', 'orchestration'],
    response: "**KALEN-Autonomous-Workflow** — Workflow orchestration system for task automation and process management. Built with TypeScript/Node.js. [GitHub](https://github.com/dhaher-labs/KALEN-Autonomous-Workflow)",
  },
  {
    patterns: ['mnemosyne', 'memory', 'ai agent memory'],
    response: "**Mnemosyne-AI** — Memory and context management system for AI agents, enabling persistent context across conversations. Built with Python. [GitHub](https://github.com/dhaher-labs/Mnemosyne-AI)",
  },
  {
    patterns: ['multicolony', 'multi-agent', 'colony'],
    response: "**AI-MultiColony-Ecosystem** — Multi-agent orchestration framework for coordinating multiple AI agents on complex tasks. Built with Python. [GitHub](https://github.com/dhaher-labs/AI-MultiColony-Ecosystem)",
  },
  {
    patterns: ['ghoststudio', 'creative studio', 'ghost studio'],
    response: "**GhostStudio-AI** — AI-powered creative studio for content generation using LLM integration. Built with TypeScript. [GitHub](https://github.com/dhaher-labs/GhostStudio-AI)",
  },
  {
    patterns: ['contact', 'email', 'reach'],
    response: "Email: dhaher-labs@email.com | Instagram: @dhaherlabs | GitHub: dhaher-labs | Portfolio: mulkymalikuldhaher.github.io | Personal email: mulkymalikuldhaher@mail.com",
  },
  {
    patterns: ['instagram', 'ig', 'social'],
    response: "Dhaher Labs: [@dhaherlabs](https://instagram.com/dhaherlabs) | Personal: [@mulkymalikuldhaher](https://instagram.com/mulkymalikuldhaher)",
  },
  {
    patterns: ['misi', 'screener', 'market intelligence'],
    response: "**Misi-Screener** — Market intelligence engine with agent-based architecture for real-time market data screening. Built with Python and FastAPI. [GitHub](https://github.com/dhaher-labs/Misi-Screener)",
  },
  {
    patterns: ['glowpilot', 'skincare'],
    response: "**GlowPilot-AI** — AI skincare advisor with LLM-powered analysis and voice support. Built with TypeScript and LLM. [GitHub](https://github.com/dhaher-labs/GlowPilot-AI)",
  },
  {
    patterns: ['iot', 'nanggroe-iot'],
    response: "**Nanggroe-IoT** — IoT infrastructure project for connected devices and sensor data management. Built with Python. [GitHub](https://github.com/dhaher-labs/Nanggroe-IoT)",
  },
  {
    patterns: ['repos migrated', 'account', 'old account', 'stars', 'forks', 'migrated'],
    response: "All repositories were recently migrated from a previous GitHub account to the current account (mulkymalikuldhaher). As a result, stars and forks are at 0 — this is expected after account migration. The source code and commit history are preserved.",
  },
  {
    patterns: ['education', 'university', 'school', 'study'],
    response: "**Current:** S1 Sistem Informasi, Universitas Terbuka (2025 – Present)\n**Previous:** Teknik Informatika — Prodi Multimedia, SMK Negeri 2 Lhokseumawe (2012 – 2015)",
  },
]

function matchKnowledgeBase(input: string): string | null {
  const lower = input.toLowerCase()
  for (const entry of knowledgeBase) {
    if (entry.patterns.some(p => lower.includes(p))) {
      return entry.response
    }
  }
  return null
}

function formatMessage(content: string): string {
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1</a>')
    .replace(/\n/g, '<br/>')
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState<ChatMode>('agent')
  const [ttsEnabled, setTtsEnabled] = useState(false)
  const [micEnabled, setMicEnabled] = useState(false)
  const [scanInput, setScanInput] = useState('')
  const [codeInput, setCodeInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { t, language } = useLanguage()

  // Load chat history
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dhaherlabs-chat-history')
      if (saved) {
        try { setMessages(JSON.parse(saved)) } catch { /* ignore */ }
      }
    }
  }, [])

  // Save chat history
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('dhaherlabs-chat-history', JSON.stringify(messages.slice(-50)))
    }
  }, [messages])

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: t('chat.welcome'),
        timestamp: Date.now(),
        mode: 'agent',
      }])
    }
  }, [isOpen, messages.length, t])

  // TTS
  const speak = useCallback((text: string) => {
    if (!ttsEnabled || typeof window === 'undefined') return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text.replace(/<[^>]*>/g, '').replace(/\*\*/g, ''))
    utterance.lang = language === 'id' ? 'id-ID' : language === 'ja' ? 'ja-JP' : language === 'zh' ? 'zh-CN' : language === 'ko' ? 'ko-KR' : language === 'ar' ? 'ar-SA' : 'en-US'
    window.speechSynthesis.speak(utterance)
  }, [ttsEnabled, language])

  // Send to API
  const sendToAPI = useCallback(async (
    userMessages: Array<{ role: 'user' | 'assistant'; content: string }>,
    apiMode: string,
    repoData?: string
  ) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: userMessages, mode: apiMode, repoData }),
      })
      if (!response.ok) throw new Error('API error')

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let fullContent = ''

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value, { stream: true })
          fullContent += chunk

          setMessages(prev => {
            const updated = [...prev]
            const lastMsg = updated[updated.length - 1]
            if (lastMsg && lastMsg.role === 'assistant') {
              return [...updated.slice(0, -1), { ...lastMsg, content: fullContent }]
            }
            return [...updated, {
              id: `resp-${Date.now()}`,
              role: 'assistant' as const,
              content: fullContent,
              timestamp: Date.now(),
              mode: apiMode,
            }]
          })
        }
      }

      speak(fullContent)
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: Date.now(),
        mode: apiMode,
      }])
    } finally {
      setIsLoading(false)
    }
  }, [speak])

  // Handle chat submit
  const handleSubmit = useCallback(async () => {
    const text = input.trim()
    if (!text || isLoading) return

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
      mode,
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')

    const kbMatch = matchKnowledgeBase(text)
    if (kbMatch && mode === 'agent') {
      setMessages(prev => [...prev, {
        id: `kb-${Date.now()}`,
        role: 'assistant',
        content: kbMatch,
        timestamp: Date.now(),
        mode: 'agent',
      }])
      speak(kbMatch)
      return
    }

    const apiMessages = [...messages.filter(m => m.role === 'user' || m.role === 'assistant'), { role: 'user' as const, content: text }]
    await sendToAPI(apiMessages, mode === 'scan' ? 'repo-scan' : mode === 'code' ? 'code-analysis' : 'chat')
  }, [input, isLoading, messages, mode, sendToAPI, speak])

  // Handle repo scan
  const handleScanRepo = useCallback(async () => {
    const repoName = scanInput.trim()
    if (!repoName || isLoading) return

    setMessages(prev => [...prev, {
      id: `scan-${Date.now()}`,
      role: 'user',
      content: `Scan repository: ${repoName}`,
      timestamp: Date.now(),
      mode: 'scan',
    }])
    setScanInput('')

    try {
      let owner = 'dhaher-labs'
      let repo = repoName
      if (repoName.includes('/')) {
        const parts = repoName.split('/')
        owner = parts[0]
        repo = parts[1]
      }
      if (repoName.startsWith('https://github.com/')) {
        const parts = repoName.replace('https://github.com/', '').split('/')
        owner = parts[0]
        repo = parts[1]
      }

      setIsLoading(true)
      const [repoData, readmeData] = await Promise.all([
        fetchSingleRepo(owner, repo),
        fetchRepoReadme(owner, repo),
      ])

      let repoContext = ''
      if (repoData) {
        repoContext = `Repository: ${repoData.full_name}\nDescription: ${repoData.description || 'None'}\nLanguage: ${repoData.language || 'Unknown'}\nStars: ${repoData.stargazers_count}\nForks: ${repoData.forks_count}\nTopics: ${repoData.topics?.join(', ') || 'None'}\nLast updated: ${repoData.updated_at}\nDefault branch: ${repoData.default_branch}\nSize: ${repoData.size}KB`
      } else {
        repoContext = `Could not fetch repository data for ${owner}/${repo}. The repository may not exist or may be private.`
      }
      if (readmeData) {
        repoContext += `\n\nREADME (first 3000 chars):\n${readmeData}`
      }

      const apiMessages = [
        { role: 'assistant' as const, content: 'I am a repository analysis agent for Dhaher Labs.' },
        { role: 'user' as const, content: `Please analyze this repository: ${owner}/${repo}\n\n${repoContext}` },
      ]
      await sendToAPI(apiMessages, 'repo-scan', repoContext)
    } catch {
      setMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Failed to scan repository. Please check the repository name and try again.',
        timestamp: Date.now(),
        mode: 'scan',
      }])
      setIsLoading(false)
    }
  }, [scanInput, isLoading, sendToAPI])

  // Handle code analysis
  const handleCodeAnalysis = useCallback(async () => {
    const code = codeInput.trim()
    if (!code || isLoading) return

    setMessages(prev => [...prev, {
      id: `code-${Date.now()}`,
      role: 'user',
      content: `Analyze code:\n\`\`\`\n${code.slice(0, 200)}...\n\`\`\``,
      timestamp: Date.now(),
      mode: 'code',
    }])
    setCodeInput('')

    const apiMessages = [
      { role: 'assistant' as const, content: 'I am a code review agent for Dhaher Labs.' },
      { role: 'user' as const, content: `Please analyze this code:\n\n${code}` },
    ]
    await sendToAPI(apiMessages, 'code-analysis')
  }, [codeInput, isLoading, sendToAPI])

  // Export chat
  const exportChat = () => {
    const data = JSON.stringify(messages, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `dhaherlabs-chat-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Clear chat
  const clearChat = () => {
    setMessages([])
    localStorage.removeItem('dhaherlabs-chat-history')
    setMessages([{
      id: 'welcome',
      role: 'assistant',
      content: t('chat.welcome'),
      timestamp: Date.now(),
      mode: 'agent',
    }])
  }

  // Voice input
  const toggleMic = () => {
    if (micEnabled) { setMicEnabled(false); return }
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) return
    const SpeechRecognitionConstructor = ((window as unknown as Record<string, unknown>).SpeechRecognition || (window as unknown as Record<string, unknown>).webkitSpeechRecognition) as new () => any
    const recognition = new SpeechRecognitionConstructor()
    recognition.lang = language === 'id' ? 'id-ID' : language === 'ja' ? 'ja-JP' : language === 'zh' ? 'zh-CN' : 'en-US'
    recognition.continuous = false
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setInput(prev => prev + transcript)
      setMicEnabled(false)
    }
    recognition.onerror = () => setMicEnabled(false)
    recognition.onend = () => setMicEnabled(false)
    setMicEnabled(true)
    recognition.start()
  }

  const modeConfig = {
    agent: { icon: Cpu, color: '#D9A441', label: t('chat.mode.agent') },
    scan: { icon: ScanSearch, color: '#00D1C7', label: t('chat.mode.scan') },
    code: { icon: Code2, color: '#A78BFA', label: t('chat.mode.code') },
  }

  return (
    <>
      {/* Floating trigger button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            id="chat"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-xl bg-primary text-primary-foreground shadow-[0_4px_24px_rgba(217,164,65,0.3)] flex items-center justify-center glass-button safe-bottom glow-gold"
            aria-label="Open AI Agent"
          >
            <Sparkles className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 z-50 w-[calc(100%-2rem)] sm:w-96 h-[min(70vh,560px)] rounded-xl glass-chat flex flex-col overflow-hidden safe-bottom"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Cpu className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-foreground text-xs font-semibold">{t('chat.title')}</p>
                  <p className="text-muted-foreground/50 text-[9px] font-mono">{t('chat.agent.capability')}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={() => setTtsEnabled(!ttsEnabled)} className="h-7 w-7 rounded-md hover:bg-secondary/50" title={ttsEnabled ? t('chat.tts.off') : t('chat.tts.on')}>
                  {ttsEnabled ? <Volume2 className="h-3.5 w-3.5 text-primary" /> : <VolumeX className="h-3.5 w-3.5 text-muted-foreground" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={exportChat} className="h-7 w-7 rounded-md hover:bg-secondary/50" title={t('chat.export')}>
                  <Download className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="icon" onClick={clearChat} className="h-7 w-7 rounded-md hover:bg-secondary/50" title={t('chat.clear')}>
                  <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-7 w-7 rounded-md hover:bg-secondary/50">
                  <X className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </div>
            </div>

            {/* Mode tabs */}
            <div className="flex items-center gap-1 px-3 py-2 border-b border-border/20">
              {(Object.entries(modeConfig) as [ChatMode, typeof modeConfig.agent][]).map(([key, config]) => {
                const Icon = config.icon
                return (
                  <button
                    key={key}
                    onClick={() => setMode(key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono tracking-wide transition-all duration-300 ${
                      mode === key
                        ? 'bg-primary/10 text-primary border border-primary/20'
                        : 'text-muted-foreground hover:bg-secondary/30 border border-transparent'
                    }`}
                  >
                    <Icon className="h-3 w-3" style={{ color: mode === key ? config.color : undefined }} />
                    {config.label}
                  </button>
                )
              })}
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-0 max-h-96">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} message-animate`}>
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="h-3 w-3 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg text-xs leading-relaxed ${
                      msg.role === 'user' ? 'bg-primary/10 text-foreground' : 'bg-secondary/30 text-foreground'
                    }`}
                    dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                  />
                  {msg.role === 'user' && (
                    <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User className="h-3 w-3 text-accent" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
                <div className="flex gap-2 justify-start message-animate">
                  <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-3 w-3 text-primary" />
                  </div>
                  <div className="px-3 py-2 rounded-lg bg-secondary/30">
                    <div className="flex items-center gap-1">
                      <span className="typing-dot-1 w-1.5 h-1.5 rounded-full bg-primary/50" />
                      <span className="typing-dot-2 w-1.5 h-1.5 rounded-full bg-primary/50" />
                      <span className="typing-dot-3 w-1.5 h-1.5 rounded-full bg-primary/50" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="border-t border-border/30 px-3 py-2">
              {mode === 'agent' && (
                <div className="flex items-center gap-2">
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSubmit()}
                    placeholder={t('chat.placeholder')}
                    className="h-9 text-xs bg-secondary/20 border-border/30"
                    disabled={isLoading}
                  />
                  <Button variant="ghost" size="icon" onClick={toggleMic} className={`h-8 w-8 rounded-lg flex-shrink-0 ${micEnabled ? 'pulse-mic' : ''}`} title={micEnabled ? t('chat.mic.on') : t('chat.mic.off')}>
                    {micEnabled ? <Mic className="h-3.5 w-3.5 text-accent" /> : <MicOff className="h-3.5 w-3.5 text-muted-foreground" />}
                  </Button>
                  <Button size="icon" onClick={handleSubmit} disabled={!input.trim() || isLoading} className="h-8 w-8 rounded-lg bg-primary hover:bg-primary/90 flex-shrink-0">
                    <Send className="h-3.5 w-3.5 text-primary-foreground" />
                  </Button>
                </div>
              )}

              {mode === 'scan' && (
                <div className="flex items-center gap-2">
                  <Input value={scanInput} onChange={(e) => setScanInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleScanRepo()} placeholder={t('chat.scan.placeholder')} className="h-9 text-xs bg-secondary/20 border-border/30" disabled={isLoading} />
                  <Button size="sm" onClick={handleScanRepo} disabled={!scanInput.trim() || isLoading} className="h-8 px-3 bg-accent hover:bg-accent/90 text-accent-foreground text-xs">
                    {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ScanSearch className="h-3.5 w-3.5" />}
                  </Button>
                </div>
              )}

              {mode === 'code' && (
                <div className="space-y-2">
                  <Textarea value={codeInput} onChange={(e) => setCodeInput(e.target.value)} placeholder={t('chat.code.placeholder')} className="min-h-[60px] max-h-[100px] text-xs bg-secondary/20 border-border/30 resize-none" disabled={isLoading} />
                  <Button size="sm" onClick={handleCodeAnalysis} disabled={!codeInput.trim() || isLoading} className="h-8 px-3 bg-violet hover:bg-violet/90 text-white text-xs">
                    {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" /> : <Code2 className="h-3.5 w-3.5 mr-1" />}
                    {t('chat.code.button')}
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
