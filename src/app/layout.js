import './globals.css'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Guess the Lines',
  description:
    'A game where you can guess the lines of NBA games to try and predict the nba betting market'
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={inter.className}>{children}</body>
      <Analytics />
    </html>
  )
}
