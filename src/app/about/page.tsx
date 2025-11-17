import Image from 'next/image'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import { UtensilsCrossed, Heart, Smile } from 'lucide-react'

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find((img) => img.id === 'about-us')
  return (
    <div className="container py-12 md:py-16">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          Our Story
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
          From a humble kitchen in Mampong to the heart of the community.
        </p>
      </header>

      {aboutImage && (
        <div className="relative mx-auto mb-12 h-96 max-w-4xl overflow-hidden rounded-lg">
          <Image
            src={aboutImage.imageUrl}
            alt={aboutImage.description}
            fill
            className="object-cover"
            data-ai-hint={aboutImage.imageHint}
          />
        </div>
      )}

      <div className="mx-auto max-w-4xl space-y-8 text-lg">
        <p>
          Pizza Zone was born from a simple idea: to bring delicious, high-quality meals to our beloved town of Mampong. While pizza is in our name, our passion is great food. Our journey started with a desire to create a place where families and friends can gather to share a fantastic meal, whether it's a cheesy pizza, a hearty breakfast, or a flavorful local favorite like Jollof Rice or Banku with Tilapia.
        </p>
        <p>
          Every dish we make is a piece of our heart. We source our ingredients locally, from fresh vegetables to the highest quality meats and grains. We believe that the best food comes from the best ingredients, and we are committed to upholding this standard in every meal we serve.
        </p>
      </div>

      <div className="my-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="flex flex-col items-center gap-4 text-center">
          <UtensilsCrossed className="h-12 w-12 text-primary" />
          <h3 className="font-headline text-2xl font-semibold">
            Quality Ingredients
          </h3>
          <p className="text-muted-foreground">
            We use only the freshest, locally-sourced ingredients to craft our diverse dishes.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 text-center">
          <Heart className="h-12 w-12 text-primary" />
          <h3 className="font-headline text-2xl font-semibold">Made with Love</h3>
          <p className="text-muted-foreground">
            Each meal is handcrafted with passion and attention to detail by our expert chefs.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 text-center">
          <Smile className="h-12 w-12 text-primary" />
          <h3 className="font-headline text-2xl font-semibold">
            Customer Happiness
          </h3>
          <p className="text-muted-foreground">
            Your satisfaction is our priority. We strive to provide excellent service every time.
          </p>
        </div>
      </div>
    </div>
  )
}
