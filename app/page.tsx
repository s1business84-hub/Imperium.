'use client'

import React, { useState } from 'react'
import Disclaimer from '@/components/Disclaimer'
import InputForm from '@/components/InputForm'
import ResultsPanel from '@/components/ResultsPanel'
import { DottedGlowBackground } from '@/components/ui/dotted-glow-background'
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
    <main className="relative mx-auto max-w-7xl px-4 py-10">
      <DottedGlowBackground
        className="pointer-events-none mask-radial-to-90% mask-radial-at-center opacity-20 dark:opacity-100"
        opacity={1}
        gap={10}
        radius={1.6}
        colorLightVar="--color-neutral-500"
        glowColorLightVar="--color-neutral-600"
        colorDarkVar="--color-neutral-500"
        glowColorDarkVar="--color-sky-800"
        backgroundOpacity={0}
        speedMin={0.3}
        speedMax={1.6}
        speedScale={1}
      />
      
      <div className="relative z-10 mb-12 flex items-center justify-center text-center">
        <p className="text-2xl font-light text-slate-700 sm:text-3xl">
          <EncryptedText text="Welcome to Imperium" className="font-semibold" />
        </p>
      </div>

      <header className="relative z-10 mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-900">Imperium</h1>
        <p className="mt-2 text-base text-slate-600">
          Educational clinical reasoning exploration — for educational purposes only.
        </p>
      </header>

      <div className="relative z-10 mx-auto max-w-3xl">
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
      </div>
    </main>
  )
}
