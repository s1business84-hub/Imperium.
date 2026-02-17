'use client'

import React from 'react'

export default function Disclaimer() {
  return (
    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-8">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg 
            className="h-8 w-8 text-red-600 mt-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" 
            />
          </svg>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-bold text-red-900 mb-4">
            ⚠️ IMPORTANT MEDICAL DISCLAIMER - READ CAREFULLY
          </h3>
          
          <div className="text-red-800 space-y-3 text-sm leading-relaxed">
            <p className="font-semibold">
              🩺 <strong>NOT MEDICAL ADVICE:</strong> This tool is for educational purposes only and does NOT provide medical diagnosis, treatment recommendations, or professional medical advice.
            </p>
            
            <p>
              🚨 <strong>EMERGENCY SITUATIONS:</strong> If you or someone else is experiencing a medical emergency, call emergency services immediately (911 in the US). Do not use this tool for urgent medical situations.
            </p>
            
            <p>
              👨‍⚕️ <strong>CONSULT HEALTHCARE PROVIDERS:</strong> Always consult qualified healthcare professionals for medical concerns. Only licensed medical professionals can provide diagnosis and treatment.
            </p>
            
            <p>
              📚 <strong>EDUCATIONAL USE ONLY:</strong> This tool presents general educational information about medical conditions that are sometimes associated with delayed recognition in clinical literature. It cannot replace clinical judgment.
            </p>
            
            <p>
              ⚠️ <strong>NO GUARANTEES:</strong> This tool may present incomplete information, omit important conditions, or surface considerations that are not relevant to any particular situation.
            </p>
            
            <p>
              🔒 <strong>PRIVACY:</strong> Do not enter real patient names, identification numbers, or other personally identifiable information. Use general symptom descriptions only.
            </p>
            
            <p className="font-semibold text-red-900 border-t border-red-300 pt-3 mt-4">
              By using this tool, you acknowledge that you understand these limitations and that this information is not intended to inform medical decisions of any kind.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}