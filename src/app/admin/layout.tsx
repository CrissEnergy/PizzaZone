'use client'

import { Home, Package, ShoppingCart, Settings } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  SidebarFooter,
} from '@/components/ui/sidebar'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'

const adminNavLinks = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <Sidebar side="left" collapsible="icon">
        <SidebarHeader className="h-16 items-center border-b justify-center flex p-2">
          <Link href="/" className="flex items-center group-data-[collapsible=icon]:justify-center">
            <Image
              src="https://lh3.googleusercontent.com/geougc-cs/AMBA38tBO7uZ4Uv4Au4YieFIwO7LbGTyD0NpXgL4u27vp7QCn3peI2OuEz92NjxmCRlKg3xRp4pTWdgUaJicrR4vRfw-4IyAeC8ZoryIg9wfc23O2GzaMM8wcJ3l4Gh6hl3HUe-QrRemQLGemVvI=w478-h269-p"
              alt="Pizza Zone Logo"
              width={120}
              height={32}
              className="h-10 w-auto group-data-[collapsible=icon]:hidden"
              priority
            />
             <Image
              src="https://lh3.googleusercontent.com/geougc-cs/AMBA38tBO7uZ4Uv4Au4YieFIwO7LbGTyD0NpXgL4u27vp7QCn3peI2OuEz92NjxmCRlKg3xRp4pTWdgUaJicrR4vRfw-4IyAeC8ZoryIg9wfc23O2GzaMM8wcJ3l4Gh6hl3HUe-QrRemQLGemVvI=w478-h269-p"
              alt="Pizza Zone Logo"
              width={40}
              height={40}
              className="h-8 w-auto hidden group-data-[collapsible=icon]:block"
              priority
            />
          </Link>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            {adminNavLinks.map((link) => (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === link.href}
                  tooltip={{
                    children: link.label,
                  }}
                >
                  <Link href={link.href}>
                    <link.icon />
                    <span>{link.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip={{
                  children: 'Settings',
                }}
              >
                <Link href="#">
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <SidebarTrigger className="flex md:hidden" />
          <div className="flex w-full items-center justify-end gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <Avatar>
                    <AvatarImage
                      src="https://picsum.photos/seed/admin/100/100"
                      alt="Admin"
                    />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
