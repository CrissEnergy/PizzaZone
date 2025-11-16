import { menuItems } from '@/lib/data'
import { MenuItemCard } from '@/components/menu/menu-item-card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

export default function MenuPage() {
  const categories = [
    'Pizza',
    'Breakfast',
    'Jollof Rice',
    'Fried Rice',
    'Wings',
    'Burgers',
    'French Fries/Chips',
    'Banku & Tilapia',
    'Sides',
    'Drinks',
  ]

  return (
    <div className="container py-8">
      <header className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          Our Menu
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Explore our delicious offerings, crafted with the freshest ingredients.
        </p>
      </header>

      <Tabs defaultValue="Pizza" className="w-full">
        <div className="flex justify-center">
          <ScrollArea className="w-full max-w-4xl whitespace-nowrap rounded-lg">
            <TabsList className="grid-cols-auto mx-auto mb-8 grid w-max">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </ScrollArea>
        </div>
        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div
              className={cn(
                'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              )}
            >
              {menuItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
