import type { Metadata } from 'next'
import './globals.css'
import { Poppins, Inter, Montserrat } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Toaster } from '@/components/ui/toaster'
import { CartProvider } from '@/contexts/cart-context'

const fontBody = Inter({ subsets: ['latin'], variable: '--font-body' })
const fontHeadline = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-headline',
})
const fontDecorative = Montserrat({
  subsets: ['latin'],
  variable: '--font-decorative',
})

export const metadata: Metadata = {
  title: 'Pizza Zone Online',
  description: 'Modern food ordering website for Pizza Zone & Restaurant',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background antialiased',
          fontBody.variable,
          fontHeadline.variable,
          fontDecorative.variable
        )}
      >
        <CartProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  )
}
