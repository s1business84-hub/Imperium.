'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import type { MedicalOutput } from '@/lib/schemas'

type ResultsPanelProps = {
  result: MedicalOutput | null
  error: string | null
}

export default function ResultsPanel({ result, error }: ResultsPanelProps) {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    if (!result) {
      setVisibleCount(0)
      return
    }

    let index = 0
    const timer = setInterval(() => {
      if (index < result.considerations.length) {
        setVisibleCount(index + 1)
        index++
      } else {
        clearInterval(timer)
      }
    }, 800)

    return () => clearInterval(timer)
  }, [result])

  if (error) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl backdrop-blur-xl bg-red-500/20 border border-red-300/50 p-6"
      >
        <h2 className="text-lg font-semibold text-red-200">Unable to process request</h2>
        <p className="mt-2 text-sm text-red-100">{error}</p>
      </motion.section>
    )
  }

  if (!result) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl backdrop-blur-xl bg-white/10 border border-white/30 p-6"
      >
        <h2 className="text-lg font-semibold text-white">Output preview</h2>
        <p className="mt-2 text-sm text-white/70">
          Submit a described presentation to see general educational considerations and reflective questions.
        </p>
      </motion.section>
    )
  }

  return (
    <motion.section className="space-y-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl backdrop-blur-xl bg-white/10 border border-white/30 p-6"
      >
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Educational Considerations
        </h2>
        <p className="mt-3 text-sm text-white/80">{result.educational_note}</p>
      </motion.div>

      {/* Animated Considerations */}
      <div className="space-y-4">
        {result.considerations.map((item, index) => (
          <motion.article
            key={`${item.condition}-${index}`}
            initial={{ opacity: 0, x: -20 }}
            animate={
              index < visibleCount
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: -20 }
            }
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="rounded-2xl backdrop-blur-xl bg-white/10 border border-white/30 p-6 shadow-lg"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-sm font-bold text-white">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-cyan-300">{item.condition}</h3>
                <p className="mt-3 text-sm text-white/80">
                  <span className="font-semibold text-cyan-200">Reasoning:</span> {item.reasoning}
                </p>
                <p className="mt-2 text-sm text-white/80">
                  <span className="font-semibold text-cyan-200">Why often missed:</span> {item.why_often_missed}
                </p>
                <div className="mt-3">
                  <span className="font-semibold text-cyan-200 text-sm">Suggested questions:</span>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/70">
                    {item.suggested_questions.map((question, questionIndex) => (
                      <li key={`${index}-${questionIndex}`}>{question}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Cognitive Checkpoint */}
      {visibleCount === result.considerations.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl backdrop-blur-xl bg-amber-500/20 border border-amber-300/50 p-6"
        >
          <h3 className="font-bold text-amber-200">🧠 Cognitive Checkpoint</h3>
          <p className="mt-3 text-sm text-amber-100">{result.cognitive_checkpoint}</p>
        </motion.div>
      )}
    </motion.section>
  )
}
