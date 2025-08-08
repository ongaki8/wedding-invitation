import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wedding of Kimberly & Anesu',
  description: 'Celebrate the union of Kimberly and Anesu. Find wedding details, venue information, dress code suggestions, and RSVP online for this special day filled with love and joy.',
  keywords: ['wedding', 'Kimberly', 'Anesu', 'wedding invitation', 'RSVP', 'wedding details'],
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Wedding of Kimberly & Anesu',
    description: 'Celebrate the union of Kimberly and Anesu. Find wedding details, venue information, dress code suggestions, and RSVP online for this special day filled with love and joy.',
    url: 'https://kim-anesu.vercel.app',
    siteName: 'Wedding of Kimberly & Anesu',
    images: [
      {
        url: 'https://i.ibb.co/7tPS4BwJ/seo-image.webp',
        width: 1200,
        height: 630,
        alt: 'Wedding of Kimberly & Anesu',
        type: 'image/webp',
      },
      {
        url: 'https://i.ibb.co/k2tMspDd/seo-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Wedding of Kimberly & Anesu',
        type: 'image/jpeg',
      }
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wedding of Kimberly & Anesu',
    description: 'Celebrate the union of Kimberly and Anesu. Find wedding details, venue information, dress code suggestions, and RSVP online for this special day filled with love and joy.',
    images: [
      'https://i.ibb.co/k2tMspDd/seo-image.jpg',
      'https://i.ibb.co/7tPS4BwJ/seo-image.webp'
    ],
  },
  other: {
    // WhatsApp specific tags
    'og:image:secure_url': 'https://i.ibb.co/k2tMspDd/seo-image.jpg',
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': 'Wedding of Kimberly & Anesu',
    'og:updated_time': new Date().toISOString(),
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