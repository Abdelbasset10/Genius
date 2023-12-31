import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ClerkProvider } from '@clerk/nextjs'
import { Providers } from '@/redux/provider'
import ProModal from '@/components/dashboard/modals/ProModal'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Genius',
  description: 'Sass AI platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Providers>
            <ProModal />
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
