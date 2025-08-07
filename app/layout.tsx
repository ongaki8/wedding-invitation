import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wedding of Kimberly & Anesu',
  description: 'Kimberly and Anesu Wedding Invitation',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Wedding of Kimberly & Anesu',
    description: 'You are invited to celebrate the love of Kimberly and Anesu.',
    url: 'https://yourdomain.com',
    siteName: 'Kimberly & Anesu Wedding',
    images: [
      {
        url: '/seo-image.webp',
        width: 1200,
        height: 630,
        alt: 'Kimberly & Anesu Wedding Invitation',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wedding of Kimberly & Anesu',
    description: 'You are invited to the wedding of Kimberly and Anesu.',
    images: ['/seo-image.webp'],
  },
};

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