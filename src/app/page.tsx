import Image from 'next/image'
import Link from 'next/link'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { menuItems } from '@/lib/data'
import { MenuItemCard } from '@/components/menu/menu-item-card'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-pizza')
  const featuredPizzas = menuItems.filter(
    (item) =>
      item.category === 'Pizza' &&
      ['margherita', 'pepperoni', 'veggie-deluxe', 'hawaiian'].includes(item.id)
  )

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full pt-16 md:pt-24">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center gap-6 px-4 text-center text-white">
          <h1 className="font-headline text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Slice into Happiness
          </h1>
          <p className="max-w-2xl font-body text-lg text-neutral-200 md:text-xl">
            Authentic flavors, fresh ingredients, and speedy delivery. Your
            perfect pizza is just a click away.
          </p>
          <Button asChild size="lg" className="font-bold">
            <Link href="/menu">
              Order Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="w-full">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-center font-headline text-3xl font-bold tracking-tight md:text-4xl">
            Our Featured Pizzas
          </h2>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {featuredPizzas.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <MenuItemCard item={item} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-12" />
            <CarouselNext className="mr-12" />
          </Carousel>
        </div>
      </section>
    </div>
  )
}
