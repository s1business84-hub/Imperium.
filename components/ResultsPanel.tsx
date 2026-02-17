import type { MedicalOutput } from '@/lib/schemas'

type ResultsPanelProps = {
  result: MedicalOutput | null
  error: string | null
}

export default function ResultsPanel({ result, error }: ResultsPanelProps) {
  if (error) {
    return (
      <section className="rounded-xl border border-red-300 bg-red-50 p-5">
        <h2 className="text-base font-semibold text-red-800">Unable to process request</h2>
        <p className="mt-2 text-sm text-red-700">{error}</p>
      </section>
    )
  }

  if (!result) {
    return (
      <section className="rounded-xl border border-slate-200 bg-slate-50 p-5">
        <h2 className="text-base font-semibold text-slate-800">Output preview</h2>
        <p className="mt-2 text-sm text-slate-600">
          Submit a described presentation to see general educational considerations and reflective questions.
        </p>
      </section>
    )
  }

  return (
    <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Educational considerations</h2>
      <p className="text-sm text-slate-600">{result.educational_note}</p>

      <div className="space-y-4">
        {result.considerations.map((item, index) => (
          <article key={`${item.condition}-${index}`} className="rounded-lg border border-slate-200 p-4">
            <h3 className="text-base font-semibold text-slate-900">{index + 1}. {item.condition}</h3>
            <p className="mt-2 text-sm text-slate-700">
              <span className="font-medium">Reasoning:</span> {item.reasoning}
            </p>
            <p className="mt-2 text-sm text-slate-700">
              <span className="font-medium">Why often missed:</span> {item.why_often_missed}
            </p>
            <div className="mt-2 text-sm text-slate-700">
              <span className="font-medium">Suggested questions:</span>
              <ul className="mt-1 list-disc space-y-1 pl-5">
                {item.suggested_questions.map((question, questionIndex) => (
                  <li key={`${index}-${questionIndex}`}>{question}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className="rounded-md border border-amber-300 bg-amber-50 p-3">
        <h3 className="text-sm font-semibold text-amber-900">Cognitive checkpoint</h3>
        <p className="mt-1 text-sm text-amber-800">{result.cognitive_checkpoint}</p>
      </div>
    </section>
  )
}
