
'use client'

import { useState, useMemo, useEffect } from 'react'
import { menuItems } from '@/lib/data'
import { MenuItemCard } from '@/components/menu/menu-item-card'
import { cn, formatCurrency } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'

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
  
  const maxPrice = 1000;
  const [priceRange, setPriceRange] = useState([0, maxPrice])
  const [sortOption, setSortOption] = useState('name-asc')

  useEffect(() => {
    const categoryMaxPrice = Math.ceil(Math.max(...menuItems.filter(item => item.category === selectedCategory).map(item => item.price), 0));
    setPriceRange([0, Math.min(categoryMaxPrice, maxPrice) > 0 ? Math.min(categoryMaxPrice, maxPrice) : maxPrice]);
  }, [selectedCategory])


  const filteredItems = useMemo(() => {
    let items = menuItems
      .filter((item) => item.category === selectedCategory)
      .filter((item) => item.price >= priceRange[0] && item.price <= priceRange[1])

    switch (sortOption) {
      case 'price-asc':
        items.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        items.sort((a, b) => b.price - a.price)
        break
      case 'name-asc':
        items.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'name-desc':
        items.sort((a, b) => b.name.localeCompare(a.name))
        break
    }

    return items
  }, [selectedCategory, priceRange, sortOption])

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
        <div className="flex flex-wrap justify-center gap-2 rounded-full border bg-muted p-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                'relative rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
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
      </div>
      
      <Card className='mb-8'>
        <CardContent className='pt-6'>
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3">
            <div className="space-y-4 md:col-span-2">
              <div className='flex justify-between items-center'>
                 <Label>Price Range</Label>
                 <span className='text-sm font-medium'>{formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}</span>
              </div>
              <Slider
                min={0}
                max={maxPrice}
                step={1}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Sort By</Label>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className='bg-background'>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">Name: A-Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z-A</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>


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
