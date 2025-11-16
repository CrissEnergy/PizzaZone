'use client'
import { useState } from 'react'
import { useCart } from '@/contexts/cart-context'
import type { MenuItem, Crust, Topping } from '@/lib/data'
import { crusts, toppings as allToppings } from '@/lib/data'
import { formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'

interface CustomPizzaDialogProps {
  item: MenuItem
}

export function CustomPizzaDialog({ item }: CustomPizzaDialogProps) {
  const [selectedCrust, setSelectedCrust] = useState<Crust>(crusts[0])
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([])
  const { addItem } = useCart()
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)

  const handleToppingChange = (topping: Topping, checked: boolean | string) => {
    if (checked) {
      setSelectedToppings((prev) => [...prev, topping])
    } else {
      setSelectedToppings((prev) => prev.filter((t) => t.id !== topping.id))
    }
  }

  const calculateTotalPrice = () => {
    const toppingsPrice = selectedToppings.reduce(
      (sum, t) => sum + t.price,
      0
    )
    return item.price + selectedCrust.price + toppingsPrice
  }

  const handleAddToCart = () => {
    addItem(item, {
      crust: selectedCrust,
      toppings: selectedToppings,
    })
    toast({
      title: 'Added to cart',
      description: `Your custom ${item.name} has been added.`,
    })
    setIsOpen(false) // Close dialog
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Customize</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline">Customize your {item.name}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-6 py-4 md:grid-cols-2">
          {/* Crust Selection */}
          <div>
            <h3 className="mb-4 font-semibold">Choose Your Crust</h3>
            <RadioGroup
              defaultValue={selectedCrust.id}
              onValueChange={(value) =>
                setSelectedCrust(crusts.find((c) => c.id === value) || crusts[0])
              }
            >
              {crusts.map((crust) => (
                <div key={crust.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={crust.id} id={`crust-${crust.id}`} />
                  <Label htmlFor={`crust-${crust.id}`} className="flex-1">
                    {crust.name}
                  </Label>
                  <span className="text-sm text-muted-foreground">
                    + {formatCurrency(crust.price)}
                  </span>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Toppings Selection */}
          <div className="flex flex-col">
            <h3 className="mb-4 font-semibold">Add Toppings</h3>
            <ScrollArea className="h-64 rounded-md border">
              <div className="p-4">
                {allToppings.map((topping) => (
                  <div
                    key={topping.id}
                    className="mb-2 flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`topping-${topping.id}`}
                      onCheckedChange={(checked) =>
                        handleToppingChange(topping, checked)
                      }
                    />
                    <Label
                      htmlFor={`topping-${topping.id}`}
                      className="flex-1"
                    >
                      {topping.name}
                    </Label>
                    <span className="text-sm text-muted-foreground">
                      + {formatCurrency(topping.price)}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
        <Separator />
        <DialogFooter className="sm:justify-between">
          <div className="text-xl font-bold">
            Total: {formatCurrency(calculateTotalPrice())}
          </div>
          <Button onClick={handleAddToCart}>Add to Cart</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
