'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Disclaimer from '@/components/Disclaimer'
import InputForm from '@/components/InputForm'
import ResultsPanel from '@/components/ResultsPanel'
import type { MedicalInput, MedicalOutput } from '@/lib/schemas'

const Globe3D = dynamic(() => import('@/components/ui/3d-globe').then(mod => ({ default: mod.Globe3D })), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full animate-pulse rounded-xl bg-slate-100" />
})

const globalMarkers = [
  { lat: 40.7128, lng: -74.006, src: "", label: "New York" },
  { lat: 51.5074, lng: -0.1278, src: "", label: "London" },
  { lat: 35.6762, lng: 139.6503, src: "", label: "Tokyo" },
  { lat: 25.2048, lng: 55.2708, src: "", label: "Dubai" },
  { lat: -33.8688, lng: 151.2093, src: "", label: "Sydney" },
  { lat: 48.8566, lng: 2.3522, src: "", label: "Paris" },
]

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
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-900">Imperium</h1>
        <p className="mt-2 text-base text-slate-600">
          Educational clinical reasoning exploration — for educational purposes only.
        </p>
      </header>

      <div className="mb-12 h-[400px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-lg">
        <Globe3D
          markers={globalMarkers}
          config={{
            atmosphereColor: "#3b82f6",
            atmosphereIntensity: 15,
            bumpScale: 3,
            autoRotateSpeed: 0.5,
          }}
        />
      </div>

      <div className="mx-auto max-w-3xl">
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
