import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Imperium Clinical Reasoning Support',
  description: 'Educational clinical reasoning support tool with conservative safety framing.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
