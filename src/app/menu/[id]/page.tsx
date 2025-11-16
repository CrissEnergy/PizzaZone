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
import { ArrowLeft, Plus } from 'lucide-react'

export default function MenuItemDetailPage() {
  const params = useParams()
  const { id } = params
  const { addItem } = useCart()
  const { toast } = useToast()

  const item = menuItems.find((item) => item.id === id)

  if (!item) {
    notFound()
  }

  const image = PlaceHolderImages.find((img) => img.id === item.imageId)

  const relatedFoods = menuItems.filter(
    (relatedItem) =>
      relatedItem.category === item.category && relatedItem.id !== item.id
  ).slice(0, 4)

  const suggestedDrinks = menuItems.filter(
    (drinkItem) => drinkItem.category === 'Drinks'
  ).slice(0, 4)

  const handleAddToCart = () => {
    addItem(item)
    toast({
      title: 'Added to cart',
      description: `${item.name} has been added to your cart.`,
    })
  }

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

      {relatedFoods.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-8 text-center font-headline text-3xl font-bold">
            Related Dishes
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedFoods.map((relatedItem) => (
              <MenuItemCard key={relatedItem.id} item={relatedItem} />
            ))}
          </div>
        </div>
      )}

      {suggestedDrinks.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-8 text-center font-headline text-3xl font-bold">
            Goes Great With
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {suggestedDrinks.map((drinkItem) => (
              <MenuItemCard key={drinkItem.id} item={drinkItem} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
