'use client'

import { useEffect, useState } from 'react'
import { getPersonalizedPizzaRecommendations } from '@/ai/flows/personalized-pizza-recommendations'
import { menuItems } from '@/lib/data'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'
import { MenuItemCard } from '@/components/menu/menu-item-card'
import { Card, CardContent } from '../ui/card'

const mockOrderHistory = ['Margherita', 'Pepperoni']
const mockCurrentTrends = ['BBQ Chicken', 'Hawaiian']

export function Recommendations() {
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setLoading(true)
        const result = await getPersonalizedPizzaRecommendations({
          orderHistory: mockOrderHistory,
          currentTrends: mockCurrentTrends,
        })
        setRecommendations(result.recommendations)
      } catch (error) {
        console.error('Failed to fetch recommendations:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchRecommendations()
  }, [])

  const recommendedItems = recommendations
    .map((rec) =>
      menuItems.find((item) => item.name.toLowerCase() === rec.toLowerCase())
    )
    .filter(Boolean)

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="mt-4 h-6 w-3/4" />
              <Skeleton className="mt-2 h-4 w-full" />
              <Skeleton className="mt-4 h-10 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (recommendedItems.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        Could not load recommendations at this time.
      </div>
    )
  }
  
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full"
    >
      <CarouselContent>
        {recommendedItems.map((item) => (
          item && <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
            <div className="p-1">
              <MenuItemCard item={item} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-12" />
      <CarouselNext className="mr-12" />
    </Carousel>
  )
}
