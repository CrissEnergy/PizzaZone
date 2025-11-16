'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import type { MenuItem, Crust, Topping } from '@/lib/data'

export interface CartItem {
  id: string
  menuItemId: string
  name: string
  quantity: number
  price: number
  customizations?: {
    crust?: Crust
    toppings?: Topping[]
  }
  imageId: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (
    item: MenuItem,
    customizations?: { crust?: Crust; toppings?: Topping[] }
  ) => void
  removeItem: (id: string) => void
  updateItemQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('pizza-zone-cart')
      if (storedCart) {
        setItems(JSON.parse(storedCart))
      }
    } catch (error) {
      console.error('Failed to parse cart from localStorage', error)
      setItems([])
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('pizza-zone-cart', JSON.stringify(items))
  }, [items])

  const generateCartItemId = (
    menuItemId: string,
    customizations?: { crust?: Crust; toppings?: Topping[] }
  ) => {
    let id = menuItemId
    if (customizations?.crust) {
      id += `_c${customizations.crust.id}`
    }
    if (customizations?.toppings && customizations.toppings.length > 0) {
      id +=
        '_t' +
        customizations.toppings
          .map((t) => t.id)
          .sort()
          .join('')
    }
    return id
  }
  
  const calculateItemPrice = (item: MenuItem, customizations?: { crust?: Crust; toppings?: Topping[] }) => {
    let price = item.price;
    if (customizations?.crust) {
        price += customizations.crust.price;
    }
    if (customizations?.toppings) {
        price += customizations.toppings.reduce((total, topping) => total + topping.price, 0);
    }
    return price;
  }

  const addItem = useCallback(
    (
      item: MenuItem,
      customizations?: { crust?: Crust; toppings?: Topping[] }
    ) => {
      setItems((prevItems) => {
        const cartItemId = generateCartItemId(item.id, customizations)
        const existingItem = prevItems.find((i) => i.id === cartItemId)

        if (existingItem) {
          return prevItems.map((i) =>
            i.id === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
          )
        } else {
          const name = customizations?.crust ? `${item.name} (${customizations.crust.name})` : item.name;
          const price = calculateItemPrice(item, customizations);
          
          const newItem: CartItem = {
            id: cartItemId,
            menuItemId: item.id,
            name,
            quantity: 1,
            price,
            customizations,
            imageId: item.imageId,
          }
          return [...prevItems, newItem]
        }
      })
    },
    []
  )

  const removeItem = useCallback((id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }, [])

  const updateItemQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
    } else {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      )
    }
  }, [removeItem])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateItemQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
