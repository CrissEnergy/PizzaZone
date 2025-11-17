'use client'

import Link from 'next/link'
import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { CartButton } from './cart-button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from '@/components/ui/sheet'
import { LiveSearch } from '../search/live-search'
import Image from 'next/image'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Header() {
  const pathname = usePathname()
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center">
          <Image
            src="https://lh3.googleusercontent.com/geougc-cs/AMBA38tBO7uZ4Uv4Au4YieFIwO7LbGTyD0NpXgL4u27vp7QCn3peI2OuEz92NjxmCRlKg3xRp4pTWdgUaJicrR4vRfw-4IyAeC8ZoryIg9wfc23O2GzaMM8wcJ3l4Gh6hl3HUe-QrRemQLGemVvI=w478-h269-p"
            alt="Pizza Zone Logo"
            width={120}
            height={32}
            className="h-10 w-auto md:h-12"
            priority
          />
        </Link>
        <nav className="hidden gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === link.href
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2">
          <div className="hidden md:block">
            <LiveSearch />
          </div>
          <CartButton />
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetTitle>Menu</SheetTitle>
              <div className="flex flex-col gap-8 pt-8">
                <Link
                  href="/"
                  className="mr-6 flex items-center space-x-2"
                  onClick={() => setIsSheetOpen(false)}
                >
                  <Image
                    src="https://lh3.googleusercontent.com/geougc-cs/AMBA38tBO7uZ4Uv4Au4YieFIwO7LbGTyD0NpXgL4u27vp7QCn3peI2OuEz92NjxmCRlKg3xRp4pTWdgUaJicrR4vRfw-4IyAeC8ZoryIg9wfc23O2GzaMM8wcJ3l4Gh6hl3HUe-QrRemQLGemVvI=w478-h269-p"
                    alt="Pizza Zone Logo"
                    width={120}
                    height={32}
                    className="h-10 w-auto"
                  />
                </Link>

                <div className="mb-4">
                  <LiveSearch />
                </div>

                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <SheetClose key={link.href} asChild>
                      <Link
                        href={link.href}
                        className={cn(
                          'text-lg font-medium transition-colors hover:text-primary',
                          pathname === link.href
                            ? 'text-primary'
                            : 'text-foreground'
                        )}
                        onClick={() => setIsSheetOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
