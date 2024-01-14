import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Guess the Lines',
  description:
    'A game where you can guess the lines of NBA games to try and predict the nba betting market'
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
