'use-client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Search, X } from 'lucide-react'
import { menuItems } from '@/lib/data'
import type { MenuItem } from '@/lib/data'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import { formatCurrency } from '@/lib/utils'
import { Button } from '../ui/button'
import { useDebounce } from '@/hooks/use-debounce'

export function LiveSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<MenuItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (debouncedQuery) {
      const lowercasedQuery = debouncedQuery.toLowerCase()
      const startsWith = menuItems.filter((item) => {
        const nameMatch = item.name.toLowerCase().startsWith(lowercasedQuery);
        const categoryMatch = item.category.toLowerCase().startsWith(lowercasedQuery);
        
        const descriptionWords = item.description.toLowerCase().split(' ');
        const descriptionMatch = descriptionWords.some(word => word.startsWith(lowercasedQuery));

        return nameMatch || categoryMatch || descriptionMatch;
      });

      const includes = menuItems.filter((item) => {
        const isInStartsWith = startsWith.some(swItem => swItem.id === item.id);
        if (isInStartsWith) return false;

        return (
          item.name.toLowerCase().includes(lowercasedQuery) ||
          item.description.toLowerCase().includes(lowercasedQuery) ||
          item.category.toLowerCase().includes(lowercasedQuery)
        )
      });
      
      setResults([...startsWith, ...includes])
      setIsOpen(true)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [debouncedQuery])

  const handleLinkClick = (href: string) => {
    setIsOpen(false)
    setQuery('')
    router.push(href)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for food..."
            className="w-full pl-9"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
              onClick={() => setQuery('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        {results.length > 0 ? (
          <div className="max-h-80 overflow-y-auto">
            {results.map((item) => {
              const image = PlaceHolderImages.find(
                (img) => img.id === item.imageId
              )
              return (
                <div
                  key={item.id}
                  onClick={() => handleLinkClick(`/menu/${item.id}`)}
                  className="flex cursor-pointer items-center gap-4 p-3 hover:bg-muted"
                >
                  {image && (
                    <Image
                      src={image.imageUrl}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-md object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="p-4 text-center text-sm text-muted-foreground">
            No results found.
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
