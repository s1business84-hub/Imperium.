'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'motion/react'
import { FeaturesSection } from '@/components/FeaturesSection'
import { EncryptedText } from '@/components/ui/encrypted-text'
import { LampContainer } from '@/components/ui/lamp'
import { BackgroundLines } from '@/components/ui/background-lines'

const MacbookScroll = dynamic(
  () => import('@/components/ui/macbook-scroll').then((mod) => mod.MacbookScroll),
  { ssr: false }
)

export default function HomePage() {

  return (
    <BackgroundLines className="relative" svgOptions={{ duration: 5 }}>
      <main className="mx-auto max-w-7xl px-4 py-4">
        {/* Hero: Welcome */}
        <div className="mb-4 flex items-center justify-center text-center">
          <p className="text-2xl font-light sm:text-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            <EncryptedText text="Welcome to Imperium" className="font-semibold" />
          </p>
        </div>

      {/* MacbookScroll Section */}
      <div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full -mt-8">
        <MacbookScroll
          title={
            <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 bg-clip-text text-transparent dark:text-white">
              Clinical Reasoning, <br /> <span className="bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent">Reimagined.</span>
            </span>
          }
          showGradient={false}
          src="/cards-screenshot.png"
        />
      </div>

      {/* Feature Cards */}
      <FeaturesSection />

      {/* Start Exploring Button with Lamp Effect */}
      <div className="mt-12">
        <LampContainer className="rounded-xl">
          <motion.div
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center"
          >
            <h2 className="mb-6 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-3xl font-medium tracking-tight text-transparent md:text-5xl">
              Ready to explore?
            </h2>
            <Link
              href="/analyze"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-10 py-5 text-lg font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/30 hover:from-cyan-400 hover:to-blue-500 group"
            >
              Start Exploring Now
              <svg className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>
        </LampContainer>
      </div>

      {/* Footer */}
      <div className="mx-auto max-w-3xl">
        <footer className="mt-8 border-t border-slate-200 pt-6 text-center text-xs text-slate-500">
          <p>
            This tool is for educational purposes only. It does not constitute
            medical advice or treatment recommendations and is not intended to
            inform clinical decisions. Always consult a qualified healthcare
            provider for medical concerns.
          </p>
        </footer>

        {/* Page Navigation */}
        <div className="mt-8 flex justify-end">
          <a
            href="/about"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg"
          >
            Next: About Us
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
      </main>
    </BackgroundLines>
  )
}
