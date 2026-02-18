'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { 
  IconArrowLeft, 
  IconSend, 
  IconUser, 
  IconGenderBigender,
  IconHeartbeat,
  IconClock,
  IconTestPipe,
  IconSparkles,
  IconAlertTriangle
} from '@tabler/icons-react'
import { AgeRangeValues, SexAtBirthValues, type MedicalInput, type MedicalOutput } from '@/lib/schemas'

const MAX_SYMPTOMS_LENGTH = 2000
const MAX_LABS_LENGTH = 1000

export default function AnalyzePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<MedicalOutput | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  
  // Form state
  const [age, setAge] = useState<MedicalInput['age']>('18-29')
  const [sex, setSex] = useState<MedicalInput['sex']>('prefer_not_to_say')
  const [symptoms, setSymptoms] = useState('')
  const [duration, setDuration] = useState('')
  const [labs, setLabs] = useState('')
  const [formError, setFormError] = useState<string | null>(null)

  const isDisabled = useMemo(() => {
    return isLoading || symptoms.trim().length < 10 || duration.trim().length === 0
  }, [duration, isLoading, symptoms])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)
    setError(null)
    setResult(null)

    if (symptoms.trim().length < 10) {
      setFormError('Please provide at least 10 characters in symptoms.')
      return
    }

    if (!duration.trim()) {
      setFormError('Please provide a duration.')
      return
    }

    const payload: MedicalInput = {
      age,
      sex,
      symptoms: symptoms.trim(),
      duration: duration.trim(),
      labs: labs.trim() ? labs.trim() : undefined,
    }

    setIsLoading(true)

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
      setStep(2)
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 border-b border-white/10 backdrop-blur-xl bg-white/5"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            href="/"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
          >
            <IconArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <h1 className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Clinical Analysis
          </h1>
          <div className="w-24" /> {/* Spacer for centering */}
        </div>
      </motion.header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* Progress indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${step === 1 ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-white/40'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 1 ? 'bg-cyan-500 text-white' : 'bg-white/20 text-white/60'}`}>1</div>
            <span className="text-sm font-medium">Input</span>
          </div>
          <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-500/50 to-blue-500/50 rounded" />
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${step === 2 ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-white/40'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 2 ? 'bg-blue-500 text-white' : 'bg-white/20 text-white/60'}`}>2</div>
            <span className="text-sm font-medium">Results</span>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Form Section */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left: Form */}
                <motion.form 
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6"
                >
                  <div className="rounded-3xl backdrop-blur-2xl bg-white/10 border border-white/20 p-8 shadow-2xl">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <IconSparkles className="w-7 h-7 text-cyan-400" />
                      Clinical Presentation
                    </h2>

                    {/* Age & Sex Grid */}
                    <div className="grid sm:grid-cols-2 gap-5 mb-6">
                      <div className="group">
                        <label className="flex items-center gap-2 mb-3 text-sm font-semibold text-white/90">
                          <IconUser className="w-4 h-4 text-cyan-400" />
                          Age Range
                        </label>
                        <div className="relative">
                          <select
                            className="w-full appearance-none rounded-2xl backdrop-blur-md bg-white/5 border border-white/20 px-5 py-4 text-white focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 focus:ring-2 focus:ring-cyan-400/20 transition-all cursor-pointer"
                            value={age}
                            onChange={(e) => setAge(e.target.value as MedicalInput['age'])}
                            required
                          >
                            {AgeRangeValues.map((value) => (
                              <option key={value} value={value} className="bg-slate-900 text-white">
                                {value}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="group">
                        <label className="flex items-center gap-2 mb-3 text-sm font-semibold text-white/90">
                          <IconGenderBigender className="w-4 h-4 text-cyan-400" />
                          Sex at Birth
                        </label>
                        <div className="relative">
                          <select
                            className="w-full appearance-none rounded-2xl backdrop-blur-md bg-white/5 border border-white/20 px-5 py-4 text-white focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 focus:ring-2 focus:ring-cyan-400/20 transition-all cursor-pointer"
                            value={sex ?? 'prefer_not_to_say'}
                            onChange={(e) => setSex(e.target.value as MedicalInput['sex'])}
                          >
                            {SexAtBirthValues.map((value) => (
                              <option key={value} value={value} className="bg-slate-900 text-white">
                                {value.replace(/_/g, ' ')}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Symptoms */}
                    <div className="mb-6">
                      <label className="flex items-center gap-2 mb-3 text-sm font-semibold text-white/90">
                        <IconHeartbeat className="w-4 h-4 text-cyan-400" />
                        Symptoms
                      </label>
                      <textarea
                        className="w-full min-h-32 rounded-2xl backdrop-blur-md bg-white/5 border border-white/20 px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none"
                        placeholder="Describe symptoms in plain language. Avoid names or ID numbers..."
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value.slice(0, MAX_SYMPTOMS_LENGTH))}
                        required
                      />
                      <div className="flex justify-between mt-2 text-xs text-white/50">
                        <span>Minimum 10 characters required</span>
                        <span>{symptoms.length}/{MAX_SYMPTOMS_LENGTH}</span>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="mb-6">
                      <label className="flex items-center gap-2 mb-3 text-sm font-semibold text-white/90">
                        <IconClock className="w-4 h-4 text-cyan-400" />
                        Duration
                      </label>
                      <input
                        className="w-full rounded-2xl backdrop-blur-md bg-white/5 border border-white/20 px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        placeholder="e.g., 5 days, 2 weeks, intermittent for 3 months"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required
                      />
                    </div>

                    {/* Labs */}
                    <div className="mb-6">
                      <label className="flex items-center gap-2 mb-3 text-sm font-semibold text-white/90">
                        <IconTestPipe className="w-4 h-4 text-cyan-400" />
                        Labs or Findings
                        <span className="text-white/40 font-normal">(optional)</span>
                      </label>
                      <textarea
                        className="w-full min-h-24 rounded-2xl backdrop-blur-md bg-white/5 border border-white/20 px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none"
                        placeholder="Share any non-identifying lab results or prior findings..."
                        value={labs}
                        onChange={(e) => setLabs(e.target.value.slice(0, MAX_LABS_LENGTH))}
                      />
                      <div className="flex justify-end mt-2 text-xs text-white/50">
                        <span>{labs.length}/{MAX_LABS_LENGTH}</span>
                      </div>
                    </div>

                    {formError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 p-4 rounded-xl bg-red-500/20 border border-red-400/30 text-red-300 text-sm mb-6"
                      >
                        <IconAlertTriangle className="w-5 h-5 shrink-0" />
                        {formError}
                      </motion.div>
                    )}

                    <button
                      type="submit"
                      disabled={isDisabled}
                      className="w-full relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/30 hover:from-cyan-400 hover:to-blue-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none transition-all duration-300 group"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isLoading ? (
                          <>
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <IconSend className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            Generate Considerations
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </div>
                </motion.form>

                {/* Right: Info Panel */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-6"
                >
                  <div className="rounded-3xl backdrop-blur-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-white/20 p-8">
                    <h3 className="text-xl font-bold text-white mb-4">How It Works</h3>
                    <div className="space-y-4">
                      {[
                        { step: '1', text: 'Enter clinical presentation details' },
                        { step: '2', text: 'AI analyzes patterns and possibilities' },
                        { step: '3', text: 'Receive educational considerations' },
                        { step: '4', text: 'Use for learning, not diagnosis' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-sm font-bold text-white">
                            {item.step}
                          </div>
                          <span className="text-white/80">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl backdrop-blur-2xl bg-amber-500/10 border border-amber-400/30 p-8">
                    <h3 className="text-xl font-bold text-amber-300 mb-3 flex items-center gap-2">
                      <IconAlertTriangle className="w-5 h-5" />
                      Educational Notice
                    </h3>
                    <p className="text-amber-100/80 text-sm leading-relaxed">
                      This tool is designed exclusively for medical education and training purposes. 
                      It does not provide medical advice, diagnosis, or treatment recommendations. 
                      Always consult qualified healthcare professionals for medical concerns.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
            >
              <ResultsSection 
                result={result} 
                error={error} 
                onBack={() => setStep(1)} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-12">
        <div className="max-w-5xl mx-auto px-6 py-6 text-center text-xs text-white/50">
          This tool is for educational purposes only. It does not constitute medical advice.
        </div>
      </footer>
    </div>
  )
}

// Results Section Component
function ResultsSection({ 
  result, 
  error, 
  onBack 
}: { 
  result: MedicalOutput | null
  error: string | null
  onBack: () => void 
}) {
  const [visibleCount, setVisibleCount] = useState(0)

  // Animate considerations appearing one by one
  useState(() => {
    if (!result) return

    let index = 0
    const timer = setInterval(() => {
      if (index < result.considerations.length) {
        setVisibleCount(index + 1)
        index++
      } else {
        clearInterval(timer)
      }
    }, 600)

    return () => clearInterval(timer)
  })

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl backdrop-blur-2xl bg-red-500/20 border border-red-400/30 p-8 text-center"
        >
          <IconAlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-red-300 mb-2">Unable to Process Request</h2>
          <p className="text-red-200/80 mb-6">{error}</p>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <IconArrowLeft className="w-4 h-4" />
            Try Again
          </button>
        </motion.div>
      </div>
    )
  }

  if (!result) return null

  return (
    <div className="space-y-6">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
      >
        <IconArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">New Analysis</span>
      </button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl backdrop-blur-2xl bg-gradient-to-br from-cyan-500/15 to-blue-500/15 border border-white/20 p-8"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
          Educational Considerations
        </h2>
        <p className="text-white/80 leading-relaxed">{result.educational_note}</p>
      </motion.div>

      {/* Considerations Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {result.considerations.map((item, index) => (
          <motion.article
            key={`${item.condition}-${index}`}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={
              index < visibleCount
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 30, scale: 0.95 }
            }
            transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
            className="rounded-3xl backdrop-blur-2xl bg-white/10 border border-white/20 p-6 hover:bg-white/15 transition-colors group"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 text-lg font-bold text-white shadow-lg shadow-cyan-500/20">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors">
                  {item.condition}
                </h3>
              </div>
            </div>
            
            <div className="mt-4 space-y-3 pl-14">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-cyan-400/80">Reasoning</span>
                <p className="mt-1 text-sm text-white/80 leading-relaxed">{item.reasoning}</p>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-blue-400/80">Often Missed</span>
                <p className="mt-1 text-sm text-white/80 leading-relaxed">{item.why_often_missed}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Cognitive Checkpoint */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="rounded-3xl backdrop-blur-2xl bg-gradient-to-br from-amber-500/15 to-orange-500/15 border border-amber-400/30 p-8"
      >
        <h3 className="text-xl font-bold text-amber-300 mb-3">Cognitive Checkpoint</h3>
        <p className="text-amber-100/80 leading-relaxed">{result.cognitive_checkpoint}</p>
      </motion.div>
    </div>
  )
}
