'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/cart-context'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import { formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'

export function CartSheet() {
  const {
    items,
    totalPrice,
    totalItems,
    updateItemQuantity,
    removeItem,
  } = useCart()

  return (
    <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
      <SheetHeader className="px-6">
        <SheetTitle>My Cart ({totalItems})</SheetTitle>
      </SheetHeader>
      <Separator />
      {items.length > 0 ? (
        <>
          <ScrollArea className="flex-1">
            <div className="flex flex-col gap-6 px-6 py-4">
              {items.map((item) => {
                const image = PlaceHolderImages.find(
                  (img) => img.id === item.imageId
                )
                return (
                  <div key={item.id} className="flex items-start gap-4">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-md object-cover"
                        data-ai-hint={image.imageHint}
                      />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(item.price)}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() =>
                              updateItemQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-6 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() =>
                              updateItemQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-muted-foreground"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollArea>
          <SheetFooter className="bg-background px-6 py-4">
            <div className="w-full space-y-4">
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Subtotal</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
              <SheetClose asChild>
                <Button asChild size="lg" className="w-full">
                  <Link href="/order">Proceed to Checkout</Link>
                </Button>
              </SheetClose>
            </div>
          </SheetFooter>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
          <ShoppingBag className="h-24 w-24 text-muted-foreground/30" />
          <h3 className="font-headline text-xl font-semibold">Your cart is empty</h3>
          <p className="text-muted-foreground">
            Looks like you haven't added anything to your cart yet.
          </p>
          <SheetClose asChild>
            <Button asChild>
              <Link href="/menu">Browse Menu</Link>
            </Button>
          </SheetClose>
        </div>
      )}
    </SheetContent>
  )
}
