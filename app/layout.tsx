import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wedding of Kimberly & Anesu',
  description: 'Celebrate the union of Kimberly and Anesu. Find wedding details, venue information, dress code suggestions, and RSVP online for this special day filled with love and joy.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Wedding of Kimberly & Anesu',
    description: 'Celebrate the union of Kimberly and Anesu. Find wedding details, venue information, dress code suggestions, and RSVP online for this special day filled with love and joy.',
    url: 'https://wedding-invitation-omega-drab.vercel.app',
    siteName: 'Wedding of Kimberly & Anesu',
    images: [
      {
        url: 'https://i.ibb.co/7tPS4BwJ/seo-image.webp',
        width: 1200,
        height: 630,
        alt: 'Wedding of Kimberly & Anesu',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wedding of Kimberly & Anesu',
    description: 'Celebrate the union of Kimberly and Anesu. Find wedding details, venue information, dress code suggestions, and RSVP online for this special day filled with love and joy.',
    images: ['https://i.ibb.co/7tPS4BwJ/seo-image.webp'],
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