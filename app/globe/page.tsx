"use client";
import React from "react";

export default function GlobePage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-16 bg-gradient-to-b from-slate-900 via-slate-900 to-black">
      <div className="flex flex-1 items-center justify-center">
        <div className="flex w-full flex-col items-center justify-between space-y-8 text-center md:flex-row md:space-y-0">
          <div>
            <h2 className="text-center text-4xl font-normal tracking-tight text-slate-300 sm:text-5xl md:text-left">
              Ready to explore{" "}
              <span className="font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Imperium</span>?
            </h2>
            <p className="mt-4 max-w-lg text-center text-base text-slate-500 md:text-left">
              Educational clinical reasoning exploration tool for learning and discovery.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="/analyze"
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-teal-600 to-cyan-600 px-8 py-3 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:shadow-teal-500/25 hover:scale-105"
            >
              Start Analyzing
            </a>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-8 py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-white/10 hover:text-white"
            >
              Back Home
            </a>
          </div>
        </div>
      </div>

      {/* Page Navigation */}
      <div className="mt-8 flex items-center justify-between">
        <a
          href="/about"
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-300 transition-all duration-200 hover:bg-white/10 hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous: About
        </a>
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
        >
          Back to Home
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </a>
      </div>
    </div>
  );
}
