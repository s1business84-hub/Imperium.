"use client";
import React from "react";
import { EncryptedText } from "@/components/ui/encrypted-text";
import {
  IconNumber1,
  IconNumber2,
  IconNumber3,
  IconNumber4,
  IconNumber5,
  IconArrowRight,
  IconAlertTriangle,
} from "@tabler/icons-react";

const steps = [
  {
    icon: <IconNumber1 className="h-8 w-8" />,
    title: "Select Age Range",
    description:
      "Choose the relevant age range from the dropdown. This helps the AI narrow down considerations appropriate for that demographic.",
    tip: "Age ranges include: 0–1, 2–12, 13–17, 18–30, 31–50, 51–70, and 71+.",
  },
  {
    icon: <IconNumber2 className="h-8 w-8" />,
    title: "Enter Symptoms",
    description:
      "Describe the symptoms you want to explore in detail. Include onset, duration, severity, and any associated factors for better results.",
    tip: "Be descriptive — e.g., 'persistent dry cough for 3 weeks, worse at night, no fever' yields better results than just 'cough'.",
  },
  {
    icon: <IconNumber3 className="h-8 w-8" />,
    title: "Add Duration & Labs (Optional)",
    description:
      "Specify the symptom duration and any relevant lab results or test findings. These fields are optional but improve the quality of reasoning.",
    tip: "Lab examples: 'CBC normal, elevated CRP, chest X-ray clear'.",
  },
  {
    icon: <IconNumber4 className="h-8 w-8" />,
    title: "Submit for Analysis",
    description:
      "Click the Analyze button. The AI will process your input and generate educational clinical reasoning considerations within seconds.",
    tip: "The analysis uses OpenAI GPT-4o with regulatory-safe prompting to ensure educational-only output.",
  },
  {
    icon: <IconNumber5 className="h-8 w-8" />,
    title: "Review Results",
    description:
      "Explore the generated considerations, including possible conditions, reasoning patterns, commonly missed diagnoses, and suggested follow-up questions.",
    tip: "Use the cognitive checkpoint section to reflect on potential reasoning biases.",
  },
];

export default function GetStartedPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-black">
      <div className="mx-auto max-w-5xl px-4 py-16">
        {/* Navigation */}
        <nav className="mb-12">
          <a
            href="/"
            className="inline-flex items-center text-sm font-medium text-slate-400 transition-colors hover:text-white"
          >
            ← Back to Home
          </a>
        </nav>

        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-5xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            <EncryptedText text="Get Started" />
          </h1>
          <div className="mx-auto mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Follow these simple steps to explore clinical reasoning with Imperium.
            This guide will walk you through the entire process.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-violet-500/30"
            >
              <div className="flex flex-col gap-6 sm:flex-row">
                <div className="flex-shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/20 text-violet-400 transition-colors group-hover:bg-violet-500/30">
                    {step.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mb-4 text-base leading-relaxed text-slate-400">
                    {step.description}
                  </p>
                  <div className="rounded-lg bg-violet-500/10 border border-violet-500/20 px-4 py-3">
                    <p className="text-sm text-violet-300">
                      <span className="font-semibold">💡 Tip:</span> {step.tip}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Important Notes */}
        <div className="mt-16 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-8 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <IconAlertTriangle className="mt-1 h-6 w-6 flex-shrink-0 text-amber-400" />
            <div>
              <h3 className="mb-3 text-lg font-bold text-amber-300">
                Important Reminders
              </h3>
              <ul className="space-y-2 text-sm text-amber-200/80">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400"></span>
                  This tool is for <strong>educational purposes only</strong> and does not provide medical advice.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400"></span>
                  Never use this tool for actual clinical decision-making or self-diagnosis.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400"></span>
                  Always consult a qualified healthcare provider for medical concerns.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400"></span>
                  Do not enter any personally identifiable information (PII) into the tool.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400"></span>
                  Rate limit: 10 requests per minute per user.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="/analyze"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 hover:shadow-violet-500/25"
          >
            Start Exploring Now
            <IconArrowRight className="h-5 w-5" />
          </a>
        </div>

        {/* Page Navigation */}
        <div className="mt-12 flex items-center justify-between">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-300 transition-all duration-200 hover:bg-white/10 hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </a>
          <a
            href="/about"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/25"
          >
            Next: About Us
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </main>
  );
}
