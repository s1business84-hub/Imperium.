'use client'

import { useState } from 'react'
import Disclaimer from '@/components/Disclaimer'
import InputForm from '@/components/InputForm'
import ResultsPanel from '@/components/ResultsPanel'
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
    <main className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Imperium</h1>
        <p className="mt-2 text-sm text-slate-600">
          Educational clinical reasoning exploration — for educational purposes only.
        </p>
      </header>

      <Disclaimer />

      <section className="mt-8 space-y-8">
        <InputForm onSubmit={handleSubmit} isLoading={isLoading} />
        <ResultsPanel result={result} error={error} />
      </section>

      <footer className="mt-12 border-t border-slate-200 pt-6 text-center text-xs text-slate-500">
        <p>
          This tool is for educational purposes only. It does not constitute
          medical advice or treatment recommendations and is not intended to
          inform clinical decisions. Always consult a qualified healthcare
          provider for medical concerns.
        </p>
      </footer>
    </main>
  )
}
