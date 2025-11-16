'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Image from 'next/image'
import { useCart } from '@/contexts/cart-context'
import { formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useToast } from '@/hooks/use-toast'
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import { Separator } from '@/components/ui/separator'
import { CreditCard, Smartphone, Truck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  address: z.string().min(10, { message: 'Please enter a valid address.' }),
  paymentMethod: z.enum(['cash', 'mobile-money'], {
    required_error: 'You need to select a payment method.',
  }),
})

export default function OrderPage() {
  const { toast } = useToast()
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      paymentMethod: 'cash',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({
      customer: values,
      order: items,
      total: totalPrice,
    })
    toast({
      title: 'Order Placed!',
      description: 'Thank you for your order. We will be in touch shortly.',
    })
    clearCart()
    router.push('/')
  }
  
  if (items.length === 0) {
    return (
        <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
            <h1 className="text-3xl font-bold tracking-tight">Your Cart is Empty</h1>
            <p className="mt-4 text-muted-foreground">You don't have any items in your cart. Let's fix that!</p>
            <Button asChild className="mt-6">
                <Link href="/menu">Browse Menu</Link>
            </Button>
        </div>
    )
  }

  return (
    <div className="container py-12 md:py-16">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          Checkout
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
          You're just a few steps away from a delicious meal.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline flex items-center gap-2"><Truck className='h-6 w-6' /> Delivery Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="024 123 4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Delivery Address</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Mampong, near the post office" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-headline flex items-center gap-2"><CreditCard className='h-6 w-6' /> Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-2"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <RadioGroupItem value="cash" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Pay with Cash on Delivery
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <RadioGroupItem value="mobile-money" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Pay with Mobile Money
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Button type="submit" size="lg" className="w-full">
                Place Order - {formatCurrency(totalPrice)}
              </Button>
            </form>
          </Form>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Order Summary</CardTitle>
              <CardDescription>
                You have {items.length} item(s) in your cart.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="max-h-80 overflow-y-auto pr-2 space-y-4">
                {items.map((item) => {
                    const image = PlaceHolderImages.find((img) => img.id === item.imageId)
                    return (
                        <div key={item.id} className="flex items-center gap-4">
                            {image && (
                                <Image
                                    src={image.imageUrl}
                                    alt={item.name}
                                    width={64}
                                    height={64}
                                    className="rounded-md object-cover"
                                    data-ai-hint={image.imageHint}
                                />
                            )}
                            <div className="flex-1 text-sm">
                                <p className="font-medium">{item.name}</p>
                                <p className="text-muted-foreground">{item.quantity} x {formatCurrency(item.price)}</p>
                            </div>
                            <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                        </div>
                    )
                })}
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
