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
    <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Age range</span>
          <select
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            value={age}
            onChange={(event) => setAge(event.target.value as MedicalInput['age'])}
            required
          >
            {AgeRangeValues.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Sex assigned at birth (optional)</span>
          <select
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            value={sex ?? 'prefer_not_to_say'}
            onChange={(event) => setSex(event.target.value as MedicalInput['sex'])}
          >
            {SexAtBirthValues.map((value) => (
              <option key={value} value={value}>
                {value.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-slate-700">Symptoms</span>
        <textarea
          className="min-h-28 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          placeholder="Describe symptoms in plain language. Avoid names or ID numbers."
          value={symptoms}
          onChange={(event) => setSymptoms(event.target.value.slice(0, MAX_SYMPTOMS_LENGTH))}
          required
        />
        <span className="mt-1 block text-xs text-slate-500">{symptoms.length}/{MAX_SYMPTOMS_LENGTH}</span>
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-slate-700">Duration</span>
        <input
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          placeholder="e.g., 5 days, 2 weeks, intermittent for 3 months"
          value={duration}
          onChange={(event) => setDuration(event.target.value)}
          required
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-slate-700">Labs or prior findings (optional)</span>
        <textarea
          className="min-h-24 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          placeholder="Optional. Share only non-identifying findings."
          value={labs}
          onChange={(event) => setLabs(event.target.value.slice(0, MAX_LABS_LENGTH))}
        />
        <span className="mt-1 block text-xs text-slate-500">{labs.length}/{MAX_LABS_LENGTH}</span>
      </label>

      {error ? <p className="text-sm text-red-700">{error}</p> : null}

      <button
        type="submit"
        disabled={isDisabled}
        className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? 'Analyzing…' : 'Generate educational considerations'}
      </button>
    </form>
  )
}
