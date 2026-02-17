'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import Disclaimer from '@/components/Disclaimer'
import InputForm from '@/components/InputForm'
import ResultsPanel from '@/components/ResultsPanel'
import { FeaturesSection } from '@/components/FeaturesSection'
import { EncryptedText } from '@/components/ui/encrypted-text'
import { BackgroundLines } from '@/components/ui/background-lines'
import type { MedicalInput, MedicalOutput } from '@/lib/schemas'

const MacbookScroll = dynamic(
  () => import('@/components/ui/macbook-scroll').then((mod) => mod.MacbookScroll),
  { ssr: false }
)

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<MedicalOutput | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)

  async function handleSubmit(payload: MedicalInput) {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error ?? 'An unexpected error occurred.')
        return
      }

      setResult(data as MedicalOutput)
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <BackgroundLines className="relative">
      <main className="mx-auto max-w-7xl px-4 py-10">
        {/* Hero: Welcome + Nav */}
        <div className="mb-12 flex items-center justify-center text-center">
          <p className="text-2xl font-light sm:text-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            <EncryptedText text="Welcome to Imperium" className="font-semibold" />
          </p>
        </div>

        <header className="mb-8 text-center">
          <nav className="mt-4 flex items-center justify-center gap-4">
            <a
              href="/about"
              className="inline-flex items-center text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
            >
              About Us →
            </a>
            <a
              href="/get-started"
              className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Get Started
            </a>
          </nav>
        </header>

        {/* MacbookScroll Section */}
        <div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full">
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

        {/* About Link */}
        <div className="mt-8 flex justify-center">
          <a
            href="/about"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-md transition-all duration-200 hover:bg-slate-50 hover:shadow-lg"
          >
            Learn More About Us →
          </a>
        </div>

        {/* Start Exploring Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:bg-blue-700 hover:shadow-xl"
          >
            Start Exploring Now
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>

        {/* Form - Only shown after clicking Start Exploring */}
        {showForm && (
          <div className="mx-auto max-w-3xl" id="explore">
            <section className="mt-12 space-y-8">
              <InputForm onSubmit={handleSubmit} isLoading={isLoading} />
              <ResultsPanel result={result} error={error} />
            </section>

            {/* Disclaimer */}
            <div className="mt-12">
              <Disclaimer />
            </div>
          </div>
        )}

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
