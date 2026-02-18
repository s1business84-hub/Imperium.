'use client'

import { useMemo, useState } from 'react'
import { AgeRangeValues, SexAtBirthValues, type MedicalInput } from '@/lib/schemas'

type InputFormProps = {
  onSubmit: (payload: MedicalInput) => Promise<void>
  isLoading: boolean
}

const MAX_SYMPTOMS_LENGTH = 2000
const MAX_LABS_LENGTH = 1000

export default function InputForm({ onSubmit, isLoading }: InputFormProps) {
  const [age, setAge] = useState<MedicalInput['age']>('18-29')
  const [sex, setSex] = useState<MedicalInput['sex']>('prefer_not_to_say')
  const [symptoms, setSymptoms] = useState('')
  const [duration, setDuration] = useState('')
  const [labs, setLabs] = useState('')
  const [error, setError] = useState<string | null>(null)

  const isDisabled = useMemo(() => {
    return isLoading || symptoms.trim().length < 10 || duration.trim().length === 0
  }, [duration, isLoading, symptoms])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    if (symptoms.trim().length < 10) {
      setError('Please provide at least 10 characters in symptoms.')
      return
    }

    if (!duration.trim()) {
      setError('Please provide a duration.')
      return
    }

    const payload: MedicalInput = {
      age,
      sex,
      symptoms: symptoms.trim(),
      duration: duration.trim(),
      labs: labs.trim() ? labs.trim() : undefined,
    }

    await onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl backdrop-blur-xl bg-white/20 border border-white/30 p-8 shadow-2xl">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Clinical Presentation</h2>
      
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-white/90">Age range</span>
          <select
            className="w-full rounded-xl backdrop-blur-md bg-white/10 border border-white/30 px-4 py-2.5 text-sm text-white placeholder-white/50 focus:outline-none focus:border-cyan-400/50 focus:bg-white/20 transition"
            value={age}
            onChange={(event) => setAge(event.target.value as MedicalInput['age'])}
            required
          >
            {AgeRangeValues.map((value) => (
              <option key={value} value={value} className="bg-slate-900 text-white">
                {value}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-white/90">Sex assigned at birth (optional)</span>
          <select
            className="w-full rounded-xl backdrop-blur-md bg-white/10 border border-white/30 px-4 py-2.5 text-sm text-white placeholder-white/50 focus:outline-none focus:border-cyan-400/50 focus:bg-white/20 transition"
            value={sex ?? 'prefer_not_to_say'}
            onChange={(event) => setSex(event.target.value as MedicalInput['sex'])}
          >
            {SexAtBirthValues.map((value) => (
              <option key={value} value={value} className="bg-slate-900 text-white">
                {value.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-white/90">Symptoms</span>
        <textarea
          className="min-h-28 w-full rounded-xl backdrop-blur-md bg-white/10 border border-white/30 px-4 py-2.5 text-sm text-white placeholder-white/50 focus:outline-none focus:border-cyan-400/50 focus:bg-white/20 transition resize-none"
          placeholder="Describe symptoms in plain language. Avoid names or ID numbers."
          value={symptoms}
          onChange={(event) => setSymptoms(event.target.value.slice(0, MAX_SYMPTOMS_LENGTH))}
          required
        />
        <span className="mt-1 block text-xs text-white/60">{symptoms.length}/{MAX_SYMPTOMS_LENGTH}</span>
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-white/90">Duration</span>
        <input
          className="w-full rounded-xl backdrop-blur-md bg-white/10 border border-white/30 px-4 py-2.5 text-sm text-white placeholder-white/50 focus:outline-none focus:border-cyan-400/50 focus:bg-white/20 transition"
          placeholder="e.g., 5 days, 2 weeks, intermittent for 3 months"
          value={duration}
          onChange={(event) => setDuration(event.target.value)}
          required
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-white/90">Labs or prior findings (optional)</span>
        <textarea
          className="min-h-24 w-full rounded-xl backdrop-blur-md bg-white/10 border border-white/30 px-4 py-2.5 text-sm text-white placeholder-white/50 focus:outline-none focus:border-cyan-400/50 focus:bg-white/20 transition resize-none"
          placeholder="Optional. Share only non-identifying findings."
          value={labs}
          onChange={(event) => setLabs(event.target.value.slice(0, MAX_LABS_LENGTH))}
        />
        <span className="mt-1 block text-xs text-white/60">{labs.length}/{MAX_LABS_LENGTH}</span>
      </label>

      {error ? <p className="text-sm text-red-300">{error}</p> : null}

      <button
        type="submit"
        disabled={isDisabled}
        className="w-full mt-6 relative inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:from-cyan-300 hover:to-blue-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none transition duration-200"
      >
        {isLoading ? 'Analyzing…' : 'Generate educational considerations'}
      </button>
    </form>
  )
}
