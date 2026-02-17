"use client";
import React from "react";
import { EncryptedText } from "@/components/ui/encrypted-text";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-16">
        {/* Navigation */}
        <nav className="mb-12">
          <a
            href="/"
            className="inline-flex items-center text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            ← Back to Home
          </a>
        </nav>

        {/* About Us Section */}
        <section className="mb-20">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-5xl font-bold text-slate-900">
              <EncryptedText text="About Us" />
            </h1>
            <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
          </div>

          <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-slate-700">
            <p>
              Imperium is an innovative educational platform designed to support clinical reasoning
              exploration and learning. We leverage advanced artificial intelligence to help medical
              professionals, students, and researchers expand their diagnostic thinking patterns.
            </p>
            <p>
              Our mission is to democratize access to cutting-edge clinical reasoning tools while
              maintaining the highest standards of ethical AI use in healthcare education. We believe
              that technology should augment, not replace, human expertise and clinical judgment.
            </p>
            <p>
              Founded by a team of healthcare professionals and AI researchers, Imperium represents
              the convergence of medical knowledge and modern technology to create better learning
              experiences for the next generation of healthcare providers.
            </p>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-slate-900">
              <EncryptedText text="What We Do" />
            </h2>
            <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="mb-4 inline-flex rounded-lg bg-blue-100 p-3">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">Clinical Reasoning Support</h3>
              <p className="text-slate-600">
                Generate differential diagnoses and explore clinical reasoning patterns based on patient
                presentations, helping expand diagnostic thinking.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="mb-4 inline-flex rounded-lg bg-purple-100 p-3">
                <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">Educational Focus</h3>
              <p className="text-slate-600">
                Designed exclusively for learning and educational purposes, helping students and
                professionals develop stronger clinical reasoning skills.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="mb-4 inline-flex rounded-lg bg-green-100 p-3">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">Privacy & Safety</h3>
              <p className="text-slate-600">
                Built with privacy-first principles, PII sanitization, and regulatory-safe language
                to ensure responsible AI use in healthcare education.
              </p>
            </div>

            {/* Card 4 */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="mb-4 inline-flex rounded-lg bg-amber-100 p-3">
                <svg className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">AI-Powered Insights</h3>
              <p className="text-slate-600">
                Leveraging state-of-the-art language models to provide comprehensive considerations,
                cognitive checkpoints, and suggested follow-up questions.
              </p>
            </div>

            {/* Card 5 */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="mb-4 inline-flex rounded-lg bg-red-100 p-3">
                <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">Regulatory Compliance</h3>
              <p className="text-slate-600">
                Carefully designed to avoid diagnosis, treatment recommendations, and triage urgency,
                ensuring compliance with healthcare regulations.
              </p>
            </div>

            {/* Card 6 */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="mb-4 inline-flex rounded-lg bg-indigo-100 p-3">
                <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">Collaborative Learning</h3>
              <p className="text-slate-600">
                Supporting medical education by fostering critical thinking and encouraging discussion
                among healthcare professionals and students.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-12">
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-50 to-purple-50 p-12 text-center shadow-xl">
            <h2 className="mb-4 text-3xl font-bold text-slate-900">Ready to Get Started?</h2>
            <p className="mb-8 text-lg text-slate-600">
              Explore clinical reasoning with Imperium&apos;s educational AI platform.
            </p>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
            >
              Start Exploring
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
          <p>
            This tool is for educational purposes only. It does not constitute medical advice or
            treatment recommendations.
          </p>
        </footer>

        {/* Page Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-md transition-all duration-200 hover:bg-slate-50 hover:shadow-lg"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous: Home
          </a>
          <a
            href="/globe"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg"
          >
            Next: Globe
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </main>
  );
}
