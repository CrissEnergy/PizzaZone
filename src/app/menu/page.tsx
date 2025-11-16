import { menuItems } from '@/lib/data'
import { MenuItemCard } from '@/components/menu/menu-item-card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

export default function MenuPage() {
  const categories = ['Pizza', 'Sides', 'Drinks']

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
        <TabsList className="mx-auto mb-8 grid w-full max-w-md grid-cols-3">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
