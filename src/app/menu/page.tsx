'use client'

import { useState, useEffect } from 'react'
import { menuItems } from '@/lib/data'
import { MenuItemCard } from '@/components/menu/menu-item-card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

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
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

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
        {isClient && (
          <ScrollArea className="w-full max-w-full whitespace-nowrap rounded-lg pb-4">
            <div className="mx-auto flex w-max items-center justify-center rounded-full border bg-muted p-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    'relative rounded-full px-3 py-1.5 text-sm sm:px-4 sm:py-2 font-medium text-muted-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                    {
                      'text-primary-foreground': selectedCategory === category,
                    }
                  )}
                >
                  {selectedCategory === category && (
                    <motion.span
                      layoutId="category-highlight"
                      className="absolute inset-0 z-0 rounded-full bg-primary"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              ))}
            </div>
          </ScrollArea>
        )}
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
