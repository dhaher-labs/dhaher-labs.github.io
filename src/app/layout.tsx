import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import { LanguageProvider } from '@/providers/language-provider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Dhaher Labs — AI • Quant • Automated Workflows • Open Source',
  description: 'A small lab building practical AI systems, quantitative tools, and automated workflows. Not a company, not a startup — just a lab.',
  keywords: ['Dhaher Labs', 'AI', 'Quant', 'Automated Workflows', 'Open Source', 'Mulky Malikul Dhaher'],
  authors: [{ name: 'Mulky Malikul Dhaher' }],
  openGraph: {
    title: 'Dhaher Labs',
    description: 'AI • Quant • Automated Workflows • Open Source',
    url: 'https://dhaher-labs.github.io',
    siteName: 'Dhaher Labs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dhaher Labs',
    description: 'AI • Quant • Automated Workflows • Open Source',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
