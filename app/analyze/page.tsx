'use client'

import { useState, useMemo, useEffect } from 'react'
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
  IconAlertTriangle,
  IconHistory,
  IconPill,
  IconVirus,
  IconUsers,
  IconActivity,
  IconStethoscope,
  IconCheck,
  IconX,
  IconInfoCircle,
  IconBulb,
  IconChevronDown
} from '@tabler/icons-react'
import { AgeRangeValues, SexAtBirthValues, type MedicalInput, type MedicalOutput } from '@/lib/schemas'

// Sample case templates for quick start
const SAMPLE_CASES = [
  {
    title: "Chest Pain",
    symptoms: "Substernal chest pressure for 2 hours, radiating to left arm. Associated with diaphoresis and shortness of breath. Relieved partially with rest.",
    duration: "2 hours, sudden onset",
    age: "45-59" as const
  },
  {
    title: "Fatigue & Pallor",
    symptoms: "Progressive fatigue over 3 weeks, worse with exertion. Associated pallor noted by family. Mild dyspnea on climbing stairs. History of heavy menstrual periods.",
    duration: "3 weeks, progressive",
    age: "30-44" as const
  },
  {
    title: "Headache",
    symptoms: "Severe throbbing headache, unilateral, with photophobia and nausea. Visual aura preceded onset. History of similar episodes.",
    duration: "6 hours, recurrent over months",
    age: "18-29" as const
  }
]

export default function AnalyzePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<MedicalOutput | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [showSamples, setShowSamples] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  
  // Form state - Core fields
  const [age, setAge] = useState<MedicalInput['age']>('18-29')
  const [sex, setSex] = useState<MedicalInput['sex']>('prefer_not_to_say')
  const [symptoms, setSymptoms] = useState('')
  const [duration, setDuration] = useState('')
  const [labs, setLabs] = useState('')
  
  // Form state - Advanced fields
  const [medicalHistory, setMedicalHistory] = useState('')
  const [medications, setMedications] = useState('')
  const [allergies, setAllergies] = useState('')
  const [familyHistory, setFamilyHistory] = useState('')
  const [socialHistory, setSocialHistory] = useState('')
  const [vitalSigns, setVitalSigns] = useState('')
  const [physicalExam, setPhysicalExam] = useState('')
  
  const [formError, setFormError] = useState<string | null>(null)

  // Calculate form completion percentage
  const formProgress = useMemo(() => {
    let filled = 0
    let total = 3 // Required: symptoms, duration, age (always filled)
    
    if (symptoms.trim().length >= 5) filled++
    if (duration.trim().length > 0) filled++
    filled++ // age is always selected
    
    // Optional fields add to progress
    if (labs.trim()) { filled++; total++ }
    if (medicalHistory.trim()) { filled++; total++ }
    if (medications.trim()) { filled++; total++ }
    if (allergies.trim()) { filled++; total++ }
    if (familyHistory.trim()) { filled++; total++ }
    if (socialHistory.trim()) { filled++; total++ }
    if (vitalSigns.trim()) { filled++; total++ }
    if (physicalExam.trim()) { filled++; total++ }
    
    return Math.round((filled / total) * 100)
  }, [symptoms, duration, labs, medicalHistory, medications, allergies, familyHistory, socialHistory, vitalSigns, physicalExam])

  const isDisabled = useMemo(() => {
    return isLoading || symptoms.trim().length < 5 || duration.trim().length === 0
  }, [duration, isLoading, symptoms])

  const canSubmit = symptoms.trim().length >= 5 && duration.trim().length > 0

  // Load sample case
  const loadSampleCase = (sample: typeof SAMPLE_CASES[0]) => {
    setSymptoms(sample.symptoms)
    setDuration(sample.duration)
    setAge(sample.age)
    setShowSamples(false)
  }

  // Clear form
  const clearForm = () => {
    setSymptoms('')
    setDuration('')
    setLabs('')
    setMedicalHistory('')
    setMedications('')
    setAllergies('')
    setFamilyHistory('')
    setSocialHistory('')
    setVitalSigns('')
    setPhysicalExam('')
    setAge('18-29')
    setSex('prefer_not_to_say')
    setFormError(null)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)
    setError(null)
    setResult(null)

    if (symptoms.trim().length < 5) {
      setFormError('Please provide at least 5 characters in symptoms.')
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
      labs: labs.trim() || undefined,
      medicalHistory: medicalHistory.trim() || undefined,
      medications: medications.trim() || undefined,
      allergies: allergies.trim() || undefined,
      familyHistory: familyHistory.trim() || undefined,
      socialHistory: socialHistory.trim() || undefined,
      vitalSigns: vitalSigns.trim() || undefined,
      physicalExam: physicalExam.trim() || undefined,
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
        setStep(2)
        return
      }

      setResult(data as MedicalOutput)
      setStep(2)
    } catch {
      setError('Network error. Please check your connection and try again.')
      setStep(2)
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
                    {/* Header with Progress */}
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <IconSparkles className="w-7 h-7 text-cyan-400" />
                        Clinical Presentation
                      </h2>
                      <div className="flex items-center gap-3">
                        {/* Clear Button */}
                        {(symptoms || duration || labs) && (
                          <button
                            type="button"
                            onClick={clearForm}
                            className="text-xs text-white/50 hover:text-white/80 transition-colors flex items-center gap-1"
                          >
                            <IconX className="w-3 h-3" />
                            Clear
                          </button>
                        )}
                        {/* Progress Ring */}
                        <div className="relative w-12 h-12">
                          <svg className="w-12 h-12 -rotate-90">
                            <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                            <circle 
                              cx="24" cy="24" r="20" 
                              fill="none" 
                              stroke={canSubmit ? '#22d3ee' : '#fbbf24'}
                              strokeWidth="4" 
                              strokeLinecap="round"
                              strokeDasharray={`${formProgress * 1.26} 126`}
                              className="transition-all duration-500"
                            />
                          </svg>
                          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                            {formProgress}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Start Samples */}
                    <div className="mb-6">
                      <button
                        type="button"
                        onClick={() => setShowSamples(!showSamples)}
                        className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/20 hover:border-purple-400/40 transition-all group"
                      >
                        <span className="flex items-center gap-2 text-sm font-medium text-purple-300">
                          <IconBulb className="w-4 h-4" />
                          Quick Start: Load a sample case
                        </span>
                        <IconChevronDown className={`w-4 h-4 text-purple-400 transition-transform ${showSamples ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <AnimatePresence>
                        {showSamples && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="grid gap-2 pt-3">
                              {SAMPLE_CASES.map((sample, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => loadSampleCase(sample)}
                                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/30 transition-all text-left group"
                                >
                                  <span className="text-sm text-white/80 group-hover:text-white">{sample.title}</span>
                                  <span className="text-xs text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">Load →</span>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Age & Sex Grid */}
                    <div className="grid sm:grid-cols-2 gap-5 mb-6">
                      <div className="group">
                        <label className="flex items-center gap-2 mb-3 text-sm font-semibold text-white/90">
                          <IconUser className="w-4 h-4 text-cyan-400" />
                          Age Range
                          <IconCheck className={`w-3 h-3 ml-auto ${age ? 'text-green-400' : 'text-white/20'}`} />
                        </label>
                        <div className="relative">
                          <select
                            className="w-full appearance-none rounded-2xl backdrop-blur-md bg-white/5 border border-white/20 px-5 py-4 text-white focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 focus:ring-2 focus:ring-cyan-400/20 transition-all cursor-pointer hover:border-white/40"
                            value={age}
                            onChange={(e) => setAge(e.target.value as MedicalInput['age'])}
                            onFocus={() => setFocusedField('age')}
                            onBlur={() => setFocusedField(null)}
                            required
                          >
                            {AgeRangeValues.map((value) => (
                              <option key={value} value={value} className="bg-slate-900 text-white">
                                {value} years
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                            <IconChevronDown className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      <div className="group">
                        <label className="flex items-center gap-2 mb-3 text-sm font-semibold text-white/90">
                          <IconGenderBigender className="w-4 h-4 text-cyan-400" />
                          Sex at Birth
                          <span className="text-white/40 text-xs font-normal">(optional)</span>
                        </label>
                        <div className="relative">
                          <select
                            className="w-full appearance-none rounded-2xl backdrop-blur-md bg-white/5 border border-white/20 px-5 py-4 text-white focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 focus:ring-2 focus:ring-cyan-400/20 transition-all cursor-pointer hover:border-white/40"
                            value={sex ?? 'prefer_not_to_say'}
                            onChange={(e) => setSex(e.target.value as MedicalInput['sex'])}
                            onFocus={() => setFocusedField('sex')}
                            onBlur={() => setFocusedField(null)}
                          >
                            {SexAtBirthValues.map((value) => (
                              <option key={value} value={value} className="bg-slate-900 text-white">
                                {value.replace(/_/g, ' ')}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                            <IconChevronDown className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Symptoms */}
                    <div className="mb-6">
                      <label className="flex items-center gap-2 mb-3 text-sm font-semibold text-white/90">
                        <IconHeartbeat className="w-4 h-4 text-cyan-400" />
                        Symptoms & Chief Complaint
                        <span className="text-red-400 ml-1">*</span>
                        <IconCheck className={`w-3 h-3 ml-auto transition-colors ${symptoms.length >= 5 ? 'text-green-400' : 'text-white/20'}`} />
                      </label>
                      <div className={`relative rounded-2xl transition-all ${focusedField === 'symptoms' ? 'ring-2 ring-cyan-400/30' : ''}`}>
                        <textarea
                          className="w-full min-h-40 rounded-2xl backdrop-blur-md bg-white/5 border border-white/20 px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all resize-y hover:border-white/40"
                          placeholder="Describe symptoms in detail:

• What is the main complaint?
• Location, quality, severity (1-10)?
• What makes it better/worse?
• Any associated symptoms?"
                          value={symptoms}
                          onChange={(e) => setSymptoms(e.target.value)}
                          onFocus={() => setFocusedField('symptoms')}
                          onBlur={() => setFocusedField(null)}
                          required
                        />
                        {/* Character indicator */}
                        <div className="absolute bottom-3 right-3 flex items-center gap-2">
                          {symptoms.length > 0 && symptoms.length < 5 && (
                            <span className="text-xs text-amber-400 bg-amber-400/10 px-2 py-1 rounded-full">
                              {5 - symptoms.length} more needed
                            </span>
                          )}
                          {symptoms.length >= 5 && (
                            <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full flex items-center gap-1">
                              <IconCheck className="w-3 h-3" /> Ready
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="mb-6">
                      <label className="flex items-center gap-2 mb-3 text-sm font-semibold text-white/90">
                        <IconClock className="w-4 h-4 text-cyan-400" />
                        Duration & Onset
                        <span className="text-red-400 ml-1">*</span>
                        <IconCheck className={`w-3 h-3 ml-auto transition-colors ${duration.length > 0 ? 'text-green-400' : 'text-white/20'}`} />
                      </label>
                      <div className={`relative rounded-2xl transition-all ${focusedField === 'duration' ? 'ring-2 ring-cyan-400/30' : ''}`}>
                        <input
                          className="w-full rounded-2xl backdrop-blur-md bg-white/5 border border-white/20 px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all hover:border-white/40"
                          placeholder="e.g., 3 days - sudden onset, 2 weeks - gradual worsening"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          onFocus={() => setFocusedField('duration')}
                          onBlur={() => setFocusedField(null)}
                          required
                        />
                        {duration.length > 0 && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <IconCheck className="w-4 h-4 text-green-400" />
                          </div>
                        )}
                      </div>
                      {/* Quick duration chips */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {['Acute (hours)', 'Days', 'Weeks', 'Months', 'Chronic'].map((chip) => (
                          <button
                            key={chip}
                            type="button"
                            onClick={() => setDuration(prev => prev ? `${prev}, ${chip.toLowerCase()}` : chip.toLowerCase())}
                            className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/20 text-white/70 hover:bg-cyan-400/20 hover:border-cyan-400/30 hover:text-cyan-300 transition-all"
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Labs & Findings */}
                    <div className="mb-6">
                      <label className="flex items-center gap-2 mb-3 text-sm font-semibold text-white/90">
                        <IconTestPipe className="w-4 h-4 text-cyan-400" />
                        Labs & Diagnostic Findings
                        <span className="text-white/40 text-xs font-normal">(optional)</span>
                        {labs && <IconCheck className="w-3 h-3 ml-auto text-green-400" />}
                      </label>
                      <textarea
                        className="w-full min-h-24 rounded-2xl backdrop-blur-md bg-white/5 border border-white/20 px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all resize-y hover:border-white/40"
                        placeholder="CBC, BMP, imaging results, ECG findings..."
                        value={labs}
                        onChange={(e) => setLabs(e.target.value)}
                        onFocus={() => setFocusedField('labs')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>

                    {/* Advanced Fields Toggle */}
                    <button
                      type="button"
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className="w-full mb-6 flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border border-white/10 hover:border-cyan-400/30 transition-all group"
                    >
                      <span className="flex items-center gap-2 text-sm font-medium text-cyan-400">
                        <IconInfoCircle className="w-4 h-4" />
                        {showAdvanced ? 'Hide' : 'Show'} Advanced Fields
                        <span className="text-white/40 text-xs font-normal">(PMH, Meds, Social Hx...)</span>
                      </span>
                      <IconChevronDown className={`w-4 h-4 text-cyan-400 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Advanced Fields */}
                    <AnimatePresence>
                      {showAdvanced && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-5 mb-6 overflow-hidden"
                        >
                          {/* Medical History */}
                          <div>
                            <label className="flex items-center gap-2 mb-3 text-sm font-semibold text-white/90">
                              <IconHistory className="w-4 h-4 text-purple-400" />
                              Past Medical History
                            </label>
                            <textarea
                              className="w-full min-h-20 rounded-2xl backdrop-blur-md bg-white/5 border border-white/20 px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-purple-400/50 focus:bg-white/10 focus:ring-2 focus:ring-purple-400/20 transition-all resize-y"
                              placeholder="Chronic conditions, previous diagnoses, surgeries, hospitalizations..."
                              value={medicalHistory}
                              onChange={(e) => setMedicalHistory(e.target.value)}
                            />
                          </div>

                          {/* Medications */}
                          <div>
                            <label className="flex items-center gap-2 mb-3 text-sm font-semibold text-white/90">
                              <IconPill className="w-4 h-4 text-green-400" />
                              Current Medications
                            </label>
                            <textarea
                              className="w-full min-h-20 rounded-2xl backdrop-blur-md bg-white/5 border border-white/20 px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-green-400/50 focus:bg-white/10 focus:ring-2 focus:ring-green-400/20 transition-all resize-y"
                              placeholder="List current medications, supplements, recent changes..."
                              value={medications}
                              onChange={(e) => setMedications(e.target.value)}
                            />
                          </div>

                          {/* Allergies */}
                          <div>
                            <label className="flex items-center gap-2 mb-3 text-sm font-semibold text-white/90">
                              <IconVirus className="w-4 h-4 text-red-400" />
                              Allergies
                            </label>
                            <input
                              className="w-full rounded-2xl backdrop-blur-md bg-white/5 border border-white/20 px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-red-400/50 focus:bg-white/10 focus:ring-2 focus:ring-red-400/20 transition-all"
                              placeholder="Drug allergies, food allergies, environmental allergies..."
                              value={allergies}
                              onChange={(e) => setAllergies(e.target.value)}
                            />
                          </div>

                          {/* Family History */}
                          <div>
                            <label className="flex items-center gap-2 mb-3 text-sm font-semibold text-white/90">
                              <IconUsers className="w-4 h-4 text-amber-400" />
                              Family History
                            </label>
                            <textarea
                              className="w-full min-h-20 rounded-2xl backdrop-blur-md bg-white/5 border border-white/20 px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-amber-400/50 focus:bg-white/10 focus:ring-2 focus:ring-amber-400/20 transition-all resize-y"
                              placeholder="Relevant family medical history, hereditary conditions..."
                              value={familyHistory}
                              onChange={(e) => setFamilyHistory(e.target.value)}
                            />
                          </div>

                          {/* Social History */}
                          <div>
                            <label className="flex items-center gap-2 mb-3 text-sm font-semibold text-white/90">
                              <IconUsers className="w-4 h-4 text-blue-400" />
                              Social History
                            </label>
                            <textarea
                              className="w-full min-h-20 rounded-2xl backdrop-blur-md bg-white/5 border border-white/20 px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 focus:ring-2 focus:ring-blue-400/20 transition-all resize-y"
                              placeholder="Occupation, smoking, alcohol, recreational drugs, travel history, living situation..."
                              value={socialHistory}
                              onChange={(e) => setSocialHistory(e.target.value)}
                            />
                          </div>

                          {/* Vital Signs */}
                          <div>
                            <label className="flex items-center gap-2 mb-3 text-sm font-semibold text-white/90">
                              <IconActivity className="w-4 h-4 text-pink-400" />
                              Vital Signs
                            </label>
                            <input
                              className="w-full rounded-2xl backdrop-blur-md bg-white/5 border border-white/20 px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-pink-400/50 focus:bg-white/10 focus:ring-2 focus:ring-pink-400/20 transition-all"
                              placeholder="BP, HR, RR, Temp, SpO2, weight, BMI..."
                              value={vitalSigns}
                              onChange={(e) => setVitalSigns(e.target.value)}
                            />
                          </div>

                          {/* Physical Exam */}
                          <div>
                            <label className="flex items-center gap-2 mb-3 text-sm font-semibold text-white/90">
                              <IconStethoscope className="w-4 h-4 text-teal-400" />
                              Physical Examination Findings
                            </label>
                            <textarea
                              className="w-full min-h-24 rounded-2xl backdrop-blur-md bg-white/5 border border-white/20 px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-teal-400/50 focus:bg-white/10 focus:ring-2 focus:ring-teal-400/20 transition-all resize-y"
                              placeholder="Relevant physical exam findings by system..."
                              value={physicalExam}
                              onChange={(e) => setPhysicalExam(e.target.value)}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

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
                  className="space-y-6 lg:sticky lg:top-8 lg:self-start"
                >
                  {/* Status Card */}
                  <div className={`rounded-3xl backdrop-blur-2xl border p-6 transition-all ${canSubmit ? 'bg-green-500/10 border-green-400/30' : 'bg-amber-500/10 border-amber-400/30'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      {canSubmit ? (
                        <IconCheck className="w-6 h-6 text-green-400" />
                      ) : (
                        <IconInfoCircle className="w-6 h-6 text-amber-400" />
                      )}
                      <h3 className={`font-bold ${canSubmit ? 'text-green-300' : 'text-amber-300'}`}>
                        {canSubmit ? 'Ready to Analyze' : 'Complete Required Fields'}
                      </h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        {symptoms.length >= 5 ? (
                          <IconCheck className="w-4 h-4 text-green-400" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-amber-400" />
                        )}
                        <span className={symptoms.length >= 5 ? 'text-green-300/80' : 'text-amber-300/80'}>
                          Symptoms description
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {duration.length > 0 ? (
                          <IconCheck className="w-4 h-4 text-green-400" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-amber-400" />
                        )}
                        <span className={duration.length > 0 ? 'text-green-300/80' : 'text-amber-300/80'}>
                          Duration specified
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* How It Works */}
                  <div className="rounded-3xl backdrop-blur-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-white/20 p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <IconSparkles className="w-5 h-5 text-cyan-400" />
                      How It Works
                    </h3>
                    <div className="space-y-4">
                      {[
                        { step: '1', text: 'Enter clinical presentation', icon: '📝' },
                        { step: '2', text: 'AI analyzes patterns', icon: '🧠' },
                        { step: '3', text: 'Review considerations', icon: '📋' },
                        { step: '4', text: 'Learn, don\'t diagnose', icon: '🎓' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 group">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-white/10 flex items-center justify-center text-sm group-hover:scale-110 transition-transform">
                            {item.icon}
                          </div>
                          <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="rounded-3xl backdrop-blur-2xl bg-purple-500/10 border border-purple-400/20 p-6">
                    <h3 className="text-lg font-bold text-purple-300 mb-3 flex items-center gap-2">
                      <IconBulb className="w-5 h-5" />
                      Pro Tips
                    </h3>
                    <ul className="space-y-2 text-sm text-purple-200/70">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-0.5">•</span>
                        <span>More detail = better analysis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-0.5">•</span>
                        <span>Include pertinent negatives</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-0.5">•</span>
                        <span>Add labs if available</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-0.5">•</span>
                        <span>Use advanced fields for complex cases</span>
                      </li>
                    </ul>
                  </div>

                  {/* Educational Notice */}
                  <div className="rounded-3xl backdrop-blur-2xl bg-amber-500/10 border border-amber-400/30 p-6">
                    <h3 className="text-lg font-bold text-amber-300 mb-3 flex items-center gap-2">
                      <IconAlertTriangle className="w-5 h-5" />
                      Educational Only
                    </h3>
                    <p className="text-amber-100/70 text-sm leading-relaxed">
                      This tool is for learning only. Never use for real clinical decisions. 
                      Always consult qualified healthcare professionals.
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
  useEffect(() => {
    if (!result) {
      setVisibleCount(0)
      return
    }

    setVisibleCount(0)
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
  }, [result])

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

      {/* Considerations - Full Width Cards */}
      <div className="space-y-6">
        {result.considerations.map((item, index) => (
          <motion.article
            key={`${item.condition}-${index}`}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={
              index < visibleCount
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 30, scale: 0.98 }
            }
            transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.15 }}
            className="rounded-3xl backdrop-blur-2xl bg-white/10 border border-white/20 p-8 hover:bg-white/[0.12] transition-colors group"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 text-xl font-bold text-white shadow-lg shadow-cyan-500/20">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors">
                  {item.condition}
                </h3>
              </div>
            </div>
            
            <div className="space-y-5">
              {/* Reasoning */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs font-semibold uppercase tracking-wide text-cyan-400 flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Clinical Reasoning
                </span>
                <p className="text-sm text-white/85 leading-relaxed">{item.reasoning}</p>
              </div>

              {/* Key Features & Red Flags Grid */}
              {(item.key_features?.length || item.red_flags?.length) && (
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Key Features */}
                  {item.key_features && item.key_features.length > 0 && (
                    <div className="p-4 rounded-2xl bg-green-500/10 border border-green-400/20">
                      <span className="text-xs font-semibold uppercase tracking-wide text-green-400 flex items-center gap-2 mb-3">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Key Features
                      </span>
                      <ul className="space-y-1.5">
                        {item.key_features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start gap-2 text-sm text-green-100/80">
                            <span className="text-green-400 mt-1">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Red Flags */}
                  {item.red_flags && item.red_flags.length > 0 && (
                    <div className="p-4 rounded-2xl bg-red-500/10 border border-red-400/20">
                      <span className="text-xs font-semibold uppercase tracking-wide text-red-400 flex items-center gap-2 mb-3">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Red Flags
                      </span>
                      <ul className="space-y-1.5">
                        {item.red_flags.map((flag, rIndex) => (
                          <li key={rIndex} className="flex items-start gap-2 text-sm text-red-100/80">
                            <span className="text-red-400 mt-1">⚠</span>
                            <span>{flag}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Why Often Missed */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/20">
                <span className="text-xs font-semibold uppercase tracking-wide text-amber-400 flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Why This May Be Missed
                </span>
                <p className="text-sm text-amber-100/80 leading-relaxed">{item.why_often_missed}</p>
              </div>

              {/* Suggested Questions */}
              {item.suggested_questions && item.suggested_questions.length > 0 && (
                <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-400/20">
                  <span className="text-xs font-semibold uppercase tracking-wide text-blue-400 flex items-center gap-2 mb-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Questions to Consider
                  </span>
                  <ul className="space-y-2">
                    {item.suggested_questions.map((question, qIndex) => (
                      <li key={qIndex} className="flex items-start gap-2 text-sm text-blue-100/80">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>{question}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.article>
        ))}
      </div>

      {/* Differential Summary */}
      {result.differential_summary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-3xl backdrop-blur-2xl bg-gradient-to-br from-purple-500/15 to-pink-500/15 border border-purple-400/30 p-8"
        >
          <h3 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Differential Summary
          </h3>
          <p className="text-purple-100/90 leading-relaxed text-base">{result.differential_summary}</p>
        </motion.div>
      )}

      {/* Cognitive Checkpoint */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="rounded-3xl backdrop-blur-2xl bg-gradient-to-br from-amber-500/15 to-orange-500/15 border border-amber-400/30 p-8"
      >
        <h3 className="text-xl font-bold text-amber-300 mb-4 flex items-center gap-3">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Cognitive Checkpoint
        </h3>
        <p className="text-amber-100/90 leading-relaxed text-base">{result.cognitive_checkpoint}</p>
        <div className="mt-4 pt-4 border-t border-amber-400/20">
          <p className="text-xs text-amber-200/60 italic">
            Take a moment to reflect on your clinical reasoning. Consider whether any cognitive biases might be influencing your thinking.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
