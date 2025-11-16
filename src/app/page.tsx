'use client'

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
import Autoplay from 'embla-carousel-autoplay'
import React from 'react'
import { cn } from '@/lib/utils'

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-pizza')
  const featuredItems = menuItems.filter((item) =>
    [
      'margherita',
      'jollof-chicken',
      'classic-burger',
      'banku-tilapia',
    ].includes(item.id)
  )

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <div className="flex flex-col gap-16 pb-16 md:gap-24">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full pt-16 md:h-[60vh] md:pt-24">
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
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center gap-6 px-4 text-center text-white">
          <h1 className={cn("font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl", "holographic-text")}>
            Flavor for Every Moment
          </h1>
          <p className="max-w-2xl font-body text-base text-neutral-200 sm:text-lg md:text-xl">
            From sizzling pizzas to hearty local dishes, discover authentic flavors and fresh ingredients. Your perfect meal is just a click away.
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
        <div className="container px-4 sm:px-6">
          <h2 className="mb-8 text-center font-headline text-3xl font-bold tracking-tight md:text-4xl">
            Our Featured Items
          </h2>
          <Carousel
            plugins={[plugin.current]}
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="-ml-2">
              {featuredItems.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="basis-full pl-4 sm:basis-1/2 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <MenuItemCard item={item} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-12 hidden sm:flex" />
            <CarouselNext className="mr-12 hidden sm:flex" />
          </Carousel>
        </div>
      </section>
    </div>
  )
}
