import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import { baseUrl } from './sitemap'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Evan Sende',
    template: '%s | Evan Sende',
  },
  description: 'Software Engineer specializing in Web Development with React, Vue, and Node.js. Currently working at Accor, building performant and accessible applications. Sharing thoughts on IT, innovation, and entrepreneurship.',
  keywords: ['Evan Sende', 'Software Engineer', 'Web Developer', 'React', 'Vue', 'Node.js', 'Frontend Developer', 'IT Blog'],
  authors: [{ name: 'Evan Sende' }],
  creator: 'Evan Sende',
  openGraph: {
    title: 'Evan Sende',
    description: 'Software Engineer specializing in Web Development with React, Vue, and Node.js. Sharing thoughts on IT, innovation, and entrepreneurship.',
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
    description: 'Software Engineer specializing in Web Development with React, Vue, and Node.js.',
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
        'text-black bg-white dark:text-neutral-100 dark:bg-neutral-950',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          {/* <Footer /> */}
        </main>
      </body>
    </html>
  )
}
