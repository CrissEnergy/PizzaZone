'use client'

import Link from 'next/link'
import { Pizza, Menu } from 'lucide-react'
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
    <header className="sticky top-0 z-50 w-full md:top-4 md:mx-auto md:w-[95%] max-w-7xl">
      <div className="container flex h-16 items-center border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:rounded-[20px] md:border">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Pizza className="h-6 w-6 text-primary" />
          <span className="hidden font-headline text-xl font-bold sm:inline-block">
            Pizza Zone
          </span>
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
                  <Pizza className="h-6 w-6 text-primary" />
                  <span className="font-headline text-xl font-bold">
                    Pizza Zone
                  </span>
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
