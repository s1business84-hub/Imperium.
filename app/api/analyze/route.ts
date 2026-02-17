import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import {
  MedicalInputSchema,
  MedicalOutputSchema,
  sanitizeMedicalInput,
  parseModelJson,
  type MedicalOutput,
} from '@/lib/schemas'
import { SYSTEM_PROMPT, buildUserPrompt } from '@/lib/systemPrompt'

/* ------------------------------------------------------------------ */
/*  Basic in-memory rate limiter (per-IP, resets every 60 s)          */
/* ------------------------------------------------------------------ */
const rateBucket = new Map<string, { count: number; reset: number }>()
const RATE_LIMIT = 10 // max requests per window
const RATE_WINDOW_MS = 60_000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateBucket.get(ip)

  if (!entry || now > entry.reset) {
    rateBucket.set(ip, { count: 1, reset: now + RATE_WINDOW_MS })
    return false
  }

  entry.count++
  return entry.count > RATE_LIMIT
}

/* ------------------------------------------------------------------ */
/*  POST /api/analyze                                                 */
/* ------------------------------------------------------------------ */
export async function POST(req: NextRequest) {
  // --- Rate limiting ---
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a moment and try again.' },
      { status: 429 }
    )
  }

  // --- Parse & validate input ---
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const inputResult = MedicalInputSchema.safeParse(body)
  if (!inputResult.success) {
    return NextResponse.json(
      { error: 'Invalid input.', details: inputResult.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  // --- Sanitize (strip PII) ---
  const sanitized = sanitizeMedicalInput(inputResult.data)

  // --- Ensure API key is configured ---
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Service is not configured. Please contact the administrator.' },
      { status: 503 }
    )
  }

  // --- Call OpenAI (single stateless call, no logging) ---
  const client = new OpenAI({ apiKey })

  let rawText: string
  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4o',
      temperature: 0.4,
      max_tokens: 4096,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: buildUserPrompt(sanitized) },
      ],
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      throw new Error('Model returned empty content.')
    }
    rawText = content
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown model error'
    return NextResponse.json(
      { error: `Model request failed: ${msg}` },
      { status: 502 }
    )
  }

  // --- Extract JSON and validate against schema ---
  let parsed: MedicalOutput
  try {
    const raw = parseModelJson(rawText)
    const outputResult = MedicalOutputSchema.safeParse(raw)

    if (!outputResult.success) {
      return NextResponse.json(
        {
          error: 'Model output did not meet the required structure. Please try again.',
          details: outputResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    parsed = outputResult.data
  } catch {
    return NextResponse.json(
      { error: 'Failed to parse structured output from model. Please try again.' },
      { status: 400 }
    )
  }

  // --- Return validated output ---
  return NextResponse.json(parsed)
}
