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
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaCarouselType } from 'embla-carousel'


const heroImages = [
  {
    src: 'https://images.stockcake.com/public/9/4/a/94af3b0d-5f6e-4bd1-9ae0-f443c730e878_large/pizza-sharing-friends-stockcake.jpg',
    alt: 'Friends sharing pizza',
  },
  {
    src: 'https://img.pikbest.com/png-images/20241202/tasty-fresh-beef-burger-with-delicious-cheese-free-png-and-clipart_11160704.png!w700wp',
    alt: 'A tasty beef burger',
  },
  {
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQluGthmBz5hquEjbOhejZdGfoKJBIpLmaYQy9wjGvpz7LYQvwKquzcHxA-QhqMVmTLdj0&usqp=CAU',
    alt: 'A plate of Jollof rice',
  },
  {
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0J6J2Y5Yv-dwmwCmwiqL1-gMN_DDXIcsrQQ&s',
    alt: 'Banku and Tilapia',
  },
  {
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxDVqD8bdKuan3VZbdiKc8_ORBWP6ZpBNBw&s',
    alt: 'Fried rice with chicken',
  },
]

export default function Home() {
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

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ])
  
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = (api: EmblaCarouselType) => {
      setActiveIndex(api.selectedScrollSnap());
    };
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);


  return (
    <div className="flex flex-col gap-16 pb-16 md:gap-24">
      {/* Hero Section */}
      <section className="relative flex h-[70vh] w-full items-center justify-center py-24">
        <div className="overflow-hidden absolute inset-0" ref={emblaRef}>
            <div className="flex h-full">
                {heroImages.map((image, index) => (
                    <div className="relative flex-[0_0_100%] h-full" key={index}>
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className={cn(
                              'object-cover animate-zoom-in-out',
                            )}
                            priority={index === 0}
                        />
                    </div>
                ))}
            </div>
        </div>

        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent [mask-image:linear-gradient(to_bottom,transparent,black_20%)]" />
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-6 px-4 text-center text-white">
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
          <div className="mb-4 flex justify-center holographic-image">
            <Image
              src="https://lh3.googleusercontent.com/geougc-cs/AMBA38uOmXRmeig7oxlUmMWZfyqAJNn_3GCEC6wixEM1aoyp9cId70HxwbpzKVpa8S_jKfEmp1duI2idx2xFsO3mvzRzZazS3oPVw4UC76qulOe6rAJQC8vZN4_7bXOCDLuq1PQdvK9PjsOYgYNO=w478-h269-p"
              alt="Featured Items separator"
              width={478}
              height={269}
              className="h-auto mix-blend-multiply dark:mix-blend-lighten"
            />
          </div>
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
