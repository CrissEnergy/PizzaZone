import Link from 'next/link'
import { Facebook, Twitter, Instagram } from 'lucide-react'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="mt-auto border-t">
      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-start gap-4">
            <Link href="/" className="flex items-center">
              <Image
                src="https://lh3.googleusercontent.com/geougc-cs/AMBA38tBO7uZ4Uv4Au4YieFIwO7LbGTyD0NpXgL4u27vp7QCn3peI2OuEz92NjxmCRlKg3xRp4pTWdgUaJicrR4vRfw-4IyAeC8ZoryIg9wfc23O2GzaMM8wcJ3l4Gh6hl3HUe-QrRemQLGemVvI=w478-h269-p"
                alt="Pizza Zone Logo"
                width={120}
                height={32}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              Pizza Zone & Restaurant, Ash. Mampong. <br />
              The best food in town, made with love.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-3">
            <div>
              <h3 className="font-headline font-semibold">Quick Links</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link href="/menu" className="text-muted-foreground hover:text-primary">Menu</Link>
                </li>
                <li>
                  <Link href="/order" className="text-muted-foreground hover:text-primary">Order Online</Link>
                </li>
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-headline font-semibold">Contact</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>059 991 5537</li>
                <li>contact@pizzazone.com</li>
                <li>University Rd, Mampong</li>
              </ul>
            </div>
            <div>
              <h3 className="font-headline font-semibold">Follow Us</h3>
              <div className="mt-4 flex space-x-4">
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Instagram className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Pizza Zone. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
