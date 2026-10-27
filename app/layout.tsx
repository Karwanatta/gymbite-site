import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://gymbite-site.vercel.app'),
  title: 'GymBite — AI Food Calorie Scanner, Restaurant Macro Lookup & Gym Tracker',
  description: 'GymBite is a free AI fitness app that counts calories and protein from meal photos, provides 5,000+ restaurant macro guides & TDEE calculators, and tracks daily gym workouts.',
  alternates: {
    canonical: 'https://gymbite-site.vercel.app/',
  },
  openGraph: {
    type: 'website',
    url: 'https://gymbite-site.vercel.app/',
    siteName: 'GymBite',
    title: 'GymBite — AI Food Calorie Scanner, Restaurant Macro Lookup & Gym Tracker',
    description: 'Scan meals with AI, look up high-protein restaurant orders (Chipotle, Chick-fil-A, McDonald’s, Taco Bell, Starbucks), calculate TDEE, and log workouts.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GymBite — AI Food Calorie Scanner & Macro Tracker',
    description: 'Free AI food photo scanner, 5,000+ restaurant macro guides, TDEE calculator, and daily workout tracker.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#1769ff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
