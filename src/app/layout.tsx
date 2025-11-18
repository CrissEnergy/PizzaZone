import type { Metadata } from 'next'
import './globals.css'
import { Poppins, Inter, Montserrat } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Toaster } from '@/components/ui/toaster'
import { CartProvider } from '@/contexts/cart-context'
import { SplashScreen } from '@/components/splash-screen'

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
          <SplashScreen />
          <div className="relative flex min-h-dvh flex-col overflow-x-hidden">
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
              <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" />
            </div>
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
