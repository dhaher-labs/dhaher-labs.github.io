'use client'

import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { FocusAreasSection } from '@/components/focus-areas-section'
import { ProjectsSection } from '@/components/projects-section'
import { ArticlesSection } from '@/components/articles-section'
import { InstagramSection } from '@/components/instagram-section'
import { DeveloperProgramsSection } from '@/components/developer-programs-section'
import { FounderSection } from '@/components/founder-section'
import { ContactSection } from '@/components/contact-section'
import { FooterSection } from '@/components/footer-section'
import { Chatbot } from '@/components/chatbot'
import { Navbar } from '@/components/navbar'

function SectionDivider() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="neon-line" />
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background auto-fit">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <FocusAreasSection />
        <SectionDivider />
        <ProjectsSection />
        <SectionDivider />
        <ArticlesSection />
        <SectionDivider />
        <InstagramSection />
        <SectionDivider />
        <DeveloperProgramsSection />
        <SectionDivider />
        <FounderSection />
        <SectionDivider />
        <ContactSection />
      </main>

      <FooterSection />

      {/* AI Agent Chatbot */}
      <Chatbot />
    </div>
  )
}
