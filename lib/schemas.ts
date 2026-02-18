import { z } from 'zod'

export const AgeRangeValues = [
  '0-12',
  '13-17',
  '18-29',
  '30-44',
  '45-59',
  '60-74',
  '75+',
] as const

export const SexAtBirthValues = ['female', 'male', 'intersex', 'prefer_not_to_say'] as const

export const MedicalInputSchema = z.object({
  age: z.enum(AgeRangeValues),
  sex: z.enum(SexAtBirthValues).optional(),
  symptoms: z.string()
    .min(5, 'Please describe symptoms in more detail (minimum 5 characters)'),
  duration: z.string().min(1, 'Duration is required'),
  labs: z.string().optional(),
  medicalHistory: z.string().optional(),
  medications: z.string().optional(),
  allergies: z.string().optional(),
  familyHistory: z.string().optional(),
  socialHistory: z.string().optional(),
  vitalSigns: z.string().optional(),
  physicalExam: z.string().optional(),
})

export const MedicalOutputSchema = z.object({
  considerations: z.array(
    z.object({
      condition: z.string().min(1, 'Condition name required'),
      reasoning: z.string().min(10, 'Reasoning must be detailed'),
      why_often_missed: z.string().min(10, 'Missing rationale required'),
      key_features: z.array(z.string()).optional(),
      red_flags: z.array(z.string()).optional(),
      suggested_questions: z.array(z.string()).min(1, 'At least one question required'),
    })
  ).min(2, 'Minimum 2 considerations required').max(12, 'Maximum 12 considerations allowed'),
  cognitive_checkpoint: z.string().min(20, 'Cognitive checkpoint must be substantial'),
  differential_summary: z.string().optional(),
  educational_note: z.string().min(10, 'Educational disclaimer required'),
})

export type MedicalInput = z.infer<typeof MedicalInputSchema>
export type MedicalOutput = z.infer<typeof MedicalOutputSchema>
export type Consideration = MedicalOutput['considerations'][0]

export const PII_PATTERNS = [
  /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
  /\+?\d[\d\s().-]{7,}\d/g,
  /\b\d{7,}\b/g,
  /\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b/g,
  /\b\d{4}-\d{2}-\d{2}\b/g,
  /\b(?:mr|mrs|ms|dr)\.?\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?\b/g,
  /\b[A-Z][a-z]{1,20}\s+[A-Z][a-z]{1,20}\b/g,
]

export function sanitizeInput(text: string): string {
  let sanitized = text.trim()

  for (const pattern of PII_PATTERNS) {
    sanitized = sanitized.replace(pattern, '[REDACTED]')
  }

  return sanitized
}

export function sanitizeMedicalInput(input: MedicalInput): MedicalInput {
  return {
    ...input,
    symptoms: sanitizeInput(input.symptoms),
    duration: sanitizeInput(input.duration),
    labs: input.labs ? sanitizeInput(input.labs) : undefined,
    medicalHistory: input.medicalHistory ? sanitizeInput(input.medicalHistory) : undefined,
    medications: input.medications ? sanitizeInput(input.medications) : undefined,
    allergies: input.allergies ? sanitizeInput(input.allergies) : undefined,
    familyHistory: input.familyHistory ? sanitizeInput(input.familyHistory) : undefined,
    socialHistory: input.socialHistory ? sanitizeInput(input.socialHistory) : undefined,
    vitalSigns: input.vitalSigns ? sanitizeInput(input.vitalSigns) : undefined,
    physicalExam: input.physicalExam ? sanitizeInput(input.physicalExam) : undefined,
  }
}

export function parseModelJson(rawText: string): unknown {
  const codeFenceMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)```/i)
  const candidate = codeFenceMatch ? codeFenceMatch[1] : rawText
  const startIndex = candidate.indexOf('{')
  const endIndex = candidate.lastIndexOf('}')

  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    throw new Error('No valid JSON object found in model output.')
  }

  return JSON.parse(candidate.slice(startIndex, endIndex + 1))
}