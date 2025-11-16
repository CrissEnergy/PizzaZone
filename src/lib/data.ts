export type Topping = {
  id: string
  name: string
  price: number
}

export type Crust = {
  id: string
  name: string
  price: number
}

export type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  category:
    | 'Pizza'
    | 'Sides'
    | 'Drinks'
    | 'Breakfast'
    | 'Jollof Rice'
    | 'Fried Rice'
    | 'Wings'
    | 'Burgers'
    | 'French Fries/Chips'
    | 'Banku & Tilapia'
  imageId: string
  isCustomizable: boolean
}

export const crusts: Crust[] = [
  { id: 'classic', name: 'Classic Hand-Tossed', price: 0 },
  { id: 'thin', name: 'Thin & Crispy', price: 1.5 },
  { id: 'stuffed', name: 'Cheese Stuffed Crust', price: 3 },
]

export const toppings: Topping[] = [
  { id: 'pepperoni', name: 'Pepperoni', price: 2 },
  { id: 'mushrooms', name: 'Mushrooms', price: 1.5 },
  { id: 'onions', name: 'Onions', price: 1 },
  { id: 'sausage', name: 'Sausage', price: 2.5 },
  { id: 'bacon', name: 'Bacon', price: 2.5 },
  { id: 'olives', name: 'Black Olives', price: 1.5 },
  { id: 'peppers', name: 'Green Peppers', price: 1 },
  { id: 'pineapple', name: 'Pineapple', price: 1.5 },
  { id: 'chicken', name: 'Grilled Chicken', price: 3 },
]

export const menuItems: MenuItem[] = [
  // Pizzas
  {
    id: 'margherita',
    name: 'Margherita',
    description: 'Classic delight with 100% real mozzarella cheese',
    price: 15.99,
    category: 'Pizza',
    imageId: 'margherita-pizza',
    isCustomizable: true,
  },
  {
    id: 'pepperoni',
    name: 'Pepperoni',
    description: 'A classic favorite with spicy pepperoni and mozzarella cheese',
    price: 17.99,
    category: 'Pizza',
    imageId: 'pepperoni-pizza',
    isCustomizable: true,
  },
  {
    id: 'veggie-deluxe',
    name: 'Veggie Deluxe',
    description: 'Onions, green peppers, mushrooms, and black olives',
    price: 18.99,
    category: 'Pizza',
    imageId: 'veggie-deluxe-pizza',
    isCustomizable: true,
  },
  {
    id: 'hawaiian',
    name: 'Hawaiian',
    description: 'A tropical treat with pineapple, ham, and cheese',
    price: 18.99,
    category: 'Pizza',
    imageId: 'hawaiian-pizza',
    isCustomizable: true,
  },
  {
    id: 'bbq-chicken',
    name: 'BBQ Chicken',
    description: 'Grilled chicken, onions, and BBQ sauce swirl',
    price: 20.99,
    category: 'Pizza',
    imageId: 'bbq-chicken-pizza',
    isCustomizable: true,
  },
  {
    id: 'supreme',
    name: 'Supreme',
    description: 'Pepperoni, sausage, onions, peppers, and mushrooms',
    price: 22.99,
    category: 'Pizza',
    imageId: 'supreme-pizza',
    isCustomizable: true,
  },
  // Sides
  {
    id: 'garlic-bread',
    name: 'Garlic Bread',
    description: 'Warm and buttery garlic bread, perfect for dipping',
    price: 5.99,
    category: 'Sides',
    imageId: 'garlic-bread',
    isCustomizable: false,
  },
  // Drinks
  {
    id: 'soda',
    name: 'Soda',
    description: 'Chilled can of your favorite soda',
    price: 2.5,
    category: 'Drinks',
    imageId: 'soda-can',
    isCustomizable: false,
  },
  {
    id: 'water',
    name: 'Bottled Water',
    description: 'Pure and refreshing bottled water',
    price: 2.0,
    category: 'Drinks',
    imageId: 'water-bottle',
    isCustomizable: false,
  },
  // New Items
  {
    id: 'english-breakfast',
    name: 'Full English Breakfast',
    description: 'Sausages, bacon, eggs, beans, tomatoes, and toast',
    price: 25.0,
    category: 'Breakfast',
    imageId: 'english-breakfast',
    isCustomizable: false,
  },
  {
    id: 'jollof-plain',
    name: 'Jollof Rice (Plain)',
    description: 'Smoky and flavorful West African style rice',
    price: 15.0,
    category: 'Jollof Rice',
    imageId: 'jollof-rice',
    isCustomizable: false,
  },
  {
    id: 'jollof-chicken',
    name: 'Jollof Rice with Chicken',
    description: 'Smoky jollof rice served with seasoned grilled chicken',
    price: 25.0,
    category: 'Jollof Rice',
    imageId: 'jollof-chicken',
    isCustomizable: false,
  },
  {
    id: 'fried-rice-plain',
    name: 'Fried Rice (Plain)',
    description: 'Classic fried rice with mixed vegetables',
    price: 15.0,
    category: 'Fried Rice',
    imageId: 'fried-rice',
    isCustomizable: false,
  },
  {
    id: 'fried-rice-chicken',
    name: 'Fried Rice with Chicken',
    description: 'Fried rice with mixed vegetables and grilled chicken',
    price: 25.0,
    category: 'Fried Rice',
    imageId: 'fried-rice-chicken',
    isCustomizable: false,
  },
  {
    id: 'hot-wings',
    name: 'Hot Wings',
    description: 'Spicy chicken wings, served with your choice of dip',
    price: 30.0,
    category: 'Wings',
    imageId: 'hot-wings',
    isCustomizable: false,
  },
  {
    id: 'bbq-wings',
    name: 'BBQ Wings',
    description: 'Sweet and smoky BBQ chicken wings',
    price: 30.0,
    category: 'Wings',
    imageId: 'bbq-wings',
    isCustomizable: false,
  },
  {
    id: 'classic-burger',
    name: 'Classic Beef Burger',
    description: 'Juicy beef patty with lettuce, tomato, and our special sauce',
    price: 28.0,
    category: 'Burgers',
    imageId: 'classic-burger',
    isCustomizable: false,
  },
  {
    id: 'chicken-burger',
    name: 'Chicken Burger',
    description: 'Crispy chicken fillet with mayo and lettuce',
    price: 25.0,
    category: 'Burgers',
    imageId: 'chicken-burger',
    isCustomizable: false,
  },
  {
    id: 'french-fries',
    name: 'French Fries',
    description: 'Golden and crispy potato fries',
    price: 10.0,
    category: 'French Fries/Chips',
    imageId: 'french-fries',
    isCustomizable: false,
  },
  {
    id: 'yam-chips',
    name: 'Yam Chips',
    description: 'Crispy fried yam chips, a local favorite',
    price: 12.0,
    category: 'French Fries/Chips',
    imageId: 'yam-chips',
    isCustomizable: false,
  },
  {
    id: 'banku-tilapia',
    name: 'Banku & Tilapia',
    description:
      'Grilled tilapia served with banku, shito, and fresh pepper sauce',
    price: 45.0,
    category: 'Banku & Tilapia',
    imageId: 'banku-tilapia',
    isCustomizable: false,
  },
  {
    id: 'fruit-juice',
    name: 'Fresh Fruit Juice',
    description: 'A blend of seasonal fresh fruits',
    price: 10.0,
    category: 'Drinks',
    imageId: 'fruit-juice',
    isCustomizable: false,
  },
]
