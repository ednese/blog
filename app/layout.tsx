import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Newsreader } from 'next/font/google'
import { Navbar } from './components/nav'
import { baseUrl } from './sitemap'

const serif = Newsreader({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Evan Sende',
    template: '%s | Evan Sende',
  },
  description: 'Frontend engineer at Accor and founding frontend engineer at DAFi. React, Vue, Next.js, Nuxt, TypeScript and AI-native workflows. Moving to Toronto in January 2027.',
  keywords: ['Evan Sende', 'Frontend Engineer', 'React', 'React Native', 'Vue', 'Next.js', 'Nuxt', 'TypeScript', 'Toronto', 'DAFi', 'Accor'],
  authors: [{ name: 'Evan Sende' }],
  creator: 'Evan Sende',
  openGraph: {
    title: 'Evan Sende',
    description: 'Frontend engineer at Accor and founding frontend engineer at DAFi. Moving to Toronto in January 2027.',
    url: baseUrl,
    siteName: 'Evan Sende',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/profilepicture.jpeg',
        width: 1200,
        height: 630,
        alt: 'Evan Sende',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Evan Sende',
    description: 'Frontend engineer at Accor and founding frontend engineer at DAFi.',
    images: ['/profilepicture.jpeg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        GeistSans.variable,
        GeistMono.variable,
        serif.variable
      )}
    >
      <body className="antialiased">
        <Navbar />
        <main className="max-w-2xl mx-4 md:mx-auto min-w-0 flex flex-col px-2 md:px-0">
          {children}
          {/* <Footer /> */}
        </main>
      </body>
    </html>
  )
}
