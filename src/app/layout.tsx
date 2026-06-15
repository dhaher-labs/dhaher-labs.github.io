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
  title: 'Dhaher Labs — LLM Tools • Quant • Automated Workflows • Open Source',
  description: 'A small lab in Aceh building LLM tools, quant research dashboards, and automated workflows. Not a company, not a startup — just a lab.',
  keywords: ['Dhaher Labs', 'LLM Tools', 'Quant', 'Automated Workflows', 'Open Source', 'Mulky Malikul Dhaher', 'Aceh'],
  authors: [{ name: 'Mulky Malikul Dhaher' }],
  metadataBase: new URL('https://dhaher-labs.github.io'),
  alternates: {
    canonical: 'https://dhaher-labs.github.io',
  },
  openGraph: {
    title: 'Dhaher Labs',
    description: 'LLM Tools • Quant • Automated Workflows • Open Source — a small lab in Aceh',
    url: 'https://dhaher-labs.github.io',
    siteName: 'Dhaher Labs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dhaher Labs',
    description: 'LLM Tools • Quant • Automated Workflows • Open Source — a small lab in Aceh',
  },
}

function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Dhaher Labs',
    url: 'https://dhaher-labs.github.io',
    logo: 'https://dhaher-labs.github.io/dhaherlabs-logo-dark.png',
    description: 'A small lab in Aceh building LLM tools, quant research dashboards, and automated workflows.',
    founder: {
      '@type': 'Person',
      name: 'Mulky Malikul Dhaher',
      url: 'https://mulkymalikuldhaher.github.io',
    },
    sameAs: [
      'https://github.com/dhaher-labs',
      'https://instagram.com/dhaherlabs',
      'https://g.dev/mulkymalikuldhaher',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="monetag" content="fb7c89909ef8053d0efc70f52a4345b0" />
        <link rel="canonical" href="https://dhaher-labs.github.io" />
        <JsonLd />
      </head>
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
