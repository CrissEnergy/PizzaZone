'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { menuItems } from '@/lib/data'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import { notFound } from 'next/navigation'
import { formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/cart-context'
import { useToast } from '@/hooks/use-toast'
import { CustomPizzaDialog } from '@/components/menu/custom-pizza-dialog'
import { MenuItemCard } from '@/components/menu/menu-item-card'
import { ArrowLeft, Plus, Star } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const mockReviews = [
    { id: 1, author: 'Ama Serwaa', rating: 5, comment: 'Absolutely delicious! The best pizza in town, hands down.' },
    { id: 2, author: 'Kofi Mensah', rating: 4, comment: 'Great taste and fast delivery. The crust was perfect.' },
    { id: 3, author: 'Adwoa Boateng', rating: 5, comment: 'My family loved it. We will definitely be ordering again soon.' },
]

export default function MenuItemDetailPage() {
  const params = useParams()
  const { id } = params
  const { addItem } = useCart()
  const { toast } = useToast()
  
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')


  const item = menuItems.find((item) => item.id === id)

  const relatedFoodsPlugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )
  const drinksPlugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: true })
  )

  if (!item) {
    notFound()
  }

  const image = PlaceHolderImages.find((img) => img.id === item.imageId)

  const relatedFoods = menuItems.filter(
    (relatedItem) =>
      relatedItem.category === item.category && relatedItem.id !== item.id
  )

  const suggestedDrinks = menuItems.filter(
    (drinkItem) => drinkItem.category === 'Drinks'
  )

  const handleAddToCart = () => {
    addItem(item)
    toast({
      title: 'Added to cart',
      description: `${item.name} has been added to your cart.`,
    })
  }

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if(rating === 0 || !name || !comment) {
      toast({
        variant: 'destructive',
        title: 'Missing information',
        description: 'Please provide a name, rating, and comment.'
      })
      return;
    }
    console.log({ name, rating, comment })
    toast({
        title: 'Review submitted',
        description: 'Thank you for your feedback!'
    })
    setName('')
    setComment('')
    setRating(0)
  }

  const averageRating = mockReviews.reduce((acc, review) => acc + review.rating, 0) / mockReviews.length;

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-8">
        <Button variant="ghost" asChild>
          <Link href="/menu">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Menu
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          {image && (
            <div className="relative mb-6 h-96 w-full overflow-hidden rounded-lg">
              <Image
                src={image.imageUrl}
                alt={item.name}
                fill
                className="object-cover"
                data-ai-hint={image.imageHint}
                priority
              />
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center">
           <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                      key={star}
                      className={`h-5 w-5 ${
                          star <= Math.round(averageRating) ? 'text-primary fill-primary' : 'text-muted-foreground'
                      }`}
                      />
                  ))}
              </div>
              <span className='text-muted-foreground'>({mockReviews.length} reviews)</span>
          </div>
          <h1 className="font-headline text-4xl font-bold">{item.name}</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {item.description}
          </p>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-3xl font-bold text-primary">
              {formatCurrency(item.price)}
            </p>
            {item.isCustomizable ? (
              <CustomPizzaDialog item={item} />
            ) : (
              <Button size="lg" onClick={handleAddToCart}>
                <Plus className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-16">
        <Separator />
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 mt-12">
            <div>
                 <h2 className="mb-6 font-headline text-3xl font-bold">
                    Reviews
                </h2>
                <div className="space-y-6">
                    {mockReviews.map(review => (
                        <Card key={review.id}>
                            <CardHeader className='pb-2'>
                                <div className="flex items-center justify-between">
                                    <h3 className='font-semibold'>{review.author}</h3>
                                    <div className="flex items-center">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                            key={star}
                                            className={`h-4 w-4 ${
                                                star <= review.rating ? 'text-primary fill-primary' : 'text-muted-foreground'
                                            }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className='text-muted-foreground'>{review.comment}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
            <div>
                 <h2 className="mb-6 font-headline text-3xl font-bold">
                    Leave a Review
                </h2>
                <Card>
                    <CardContent className="p-6">
                        <form onSubmit={handleReviewSubmit} className='space-y-4'>
                            <Input 
                                placeholder='Your Name' 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                            />
                             <div className="flex items-center gap-2">
                                <span className='text-sm text-muted-foreground'>Your Rating:</span>
                                <div className="flex items-center">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                        key={star}
                                        className={`h-5 w-5 cursor-pointer ${
                                            star <= (hoverRating || rating) ? 'text-primary fill-primary' : 'text-muted-foreground'
                                        }`}
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        />
                                    ))}
                                </div>
                            </div>
                            <Textarea 
                                placeholder='Share your thoughts...' 
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows={4}
                            />
                            <Button type='submit'>Submit Review</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>

      {relatedFoods.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-8 text-center font-headline text-3xl font-bold">
            Related Dishes
          </h2>
          <Carousel
            plugins={[relatedFoodsPlugin.current]}
            opts={{ align: 'start', loop: true }}
            className="w-full"
            onMouseEnter={relatedFoodsPlugin.current.stop}
            onMouseLeave={relatedFoodsPlugin.current.reset}
          >
            <CarouselContent className="-ml-2">
              {relatedFoods.map((relatedItem) => (
                <CarouselItem
                  key={relatedItem.id}
                  className="basis-full pl-4 sm:basis-1/2 lg:basis-1/4"
                >
                  <div className="p-1">
                    <MenuItemCard item={relatedItem} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-12 hidden sm:flex" />
            <CarouselNext className="mr-12 hidden sm:flex" />
          </Carousel>
        </div>
      )}

      {suggestedDrinks.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-8 text-center font-headline text-3xl font-bold">
            Goes Great With
          </h2>
          <Carousel
            plugins={[drinksPlugin.current]}
            opts={{ align: 'start', loop: true }}
            className="w-full"
            onMouseEnter={drinksPlugin.current.stop}
            onMouseLeave={drinksPlugin.current.reset}
          >
            <CarouselContent className="-ml-2">
              {suggestedDrinks.map((drinkItem) => (
                <CarouselItem
                  key={drinkItem.id}
                  className="basis-full pl-4 sm:basis-1/2 lg:basis-1/4"
                >
                  <div className="p-1">
                    <MenuItemCard item={drinkItem} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-12 hidden sm:flex" />
            <CarouselNext className="mr-12 hidden sm:flex" />
          </Carousel>
        </div>
      )}
    </div>
  )
}
