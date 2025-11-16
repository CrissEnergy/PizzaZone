'use client'

import Image from 'next/image'
import { Plus } from 'lucide-react'

import type { MenuItem } from '@/lib/data'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import { formatCurrency } from '@/lib/utils'
import { useCart } from '@/contexts/cart-context'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { CustomPizzaDialog } from './custom-pizza-dialog'

interface MenuItemCardProps {
  item: MenuItem
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const image = PlaceHolderImages.find((img) => img.id === item.imageId)

  const handleAddToCart = () => {
    addItem(item)
    toast({
      title: 'Added to cart',
      description: `${item.name} has been added to your cart.`,
    })
  }

  return (
    <Card className="flex h-full transform flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {image && (
        <div className="relative h-48 w-full">
          <Image
            src={image.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            data-ai-hint={image.imageHint}
          />
        </div>
      )}
      <CardHeader className="pb-4">
        <CardTitle className="font-headline">{item.name}</CardTitle>
        <CardDescription className="flex-grow">{item.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow" />
      <CardFooter className="flex items-center justify-between">
        <p className="text-xl font-bold text-primary">
          {formatCurrency(item.price)}
        </p>
        {item.isCustomizable ? (
          <CustomPizzaDialog item={item} />
        ) : (
          <Button onClick={handleAddToCart}>
            <Plus className="mr-2 h-4 w-4" /> Add
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
