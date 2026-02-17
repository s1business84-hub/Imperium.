'use client'

import React, { useState } from 'react'
import Disclaimer from '@/components/Disclaimer'
import InputForm from '@/components/InputForm'
import ResultsPanel from '@/components/ResultsPanel'
import { FeaturesSection } from '@/components/FeaturesSection'
import { EncryptedText } from '@/components/ui/encrypted-text'
import type { MedicalInput, MedicalOutput } from '@/lib/schemas'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<MedicalOutput | null>(null)
  const [error, setError] = useState<string | null>(null)

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
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-12 flex items-center justify-center text-center">
        <p className="text-2xl font-light text-slate-700 sm:text-3xl">
          <EncryptedText text="Welcome to Imperium" className="font-semibold" />
        </p>
      </div>

      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-900">Imperium</h1>
        <p className="mt-2 text-base text-slate-600">
          Educational clinical reasoning exploration — for educational purposes only.
        </p>
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

      {/* Features Section */}
      <FeaturesSection />

      <div className="mx-auto max-w-3xl">
        <section className="mt-8 space-y-8">
          <InputForm onSubmit={handleSubmit} isLoading={isLoading} />
          <ResultsPanel result={result} error={error} />
        </section>

        {/* Disclaimer at the end */}
        <div className="mt-12">
          <Disclaimer />
        </div>

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
  )
}
