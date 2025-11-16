'use client'

import { useState } from 'react'
import { menuItems } from '@/lib/data'
import { MenuItemCard } from '@/components/menu/menu-item-card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export default function MenuPage() {
  const categories = [
    'Pizza',
    'Breakfast',
    'Jollof Rice',
    'Fried Rice',
    'Wings',
    'Burgers',
    'French Fries/Chips',
    'Banku & Tilapia',
    'Sides',
    'Drinks',
  ]
  const [selectedCategory, setSelectedCategory] = useState(categories[0])

  const filteredItems = menuItems.filter(
    (item) => item.category === selectedCategory
  )

  return (
    <div className="container py-8">
      <header className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          Our Menu
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Explore our delicious offerings, crafted with the freshest ingredients.
        </p>
      </header>

      <div className="mb-8 flex justify-center">
        <ScrollArea className="w-full max-w-4xl whitespace-nowrap rounded-lg">
          <div className="mx-auto flex w-max items-center justify-center gap-2 rounded-full border bg-muted p-1">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'ghost'}
                size="sm"
                className={cn(
                  'rounded-full',
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground'
                )}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div
        className={cn(
          'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        )}
      >
        {filteredItems.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
