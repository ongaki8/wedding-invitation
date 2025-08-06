import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wedding of Kimberly & Anesu',
  description: 'Kimberly and Anesu Wedding Invitation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="h-screen w-screen overflow-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  )
}