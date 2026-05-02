import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    { name: 'southern-spices-auth' }
  )
);

export interface CartItem {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  quantity: number;
  slug: string;
}

interface CartStore {
  userCarts: Record<string, CartItem[]>; // Map userId (or 'guest') to items
  addItem: (product: any, quantity?: number, userId?: string) => void;
  removeItem: (productId: number, userId?: string) => void;
  updateQuantity: (productId: number, quantity: number, userId?: string) => void;
  clearCart: (userId?: string) => void;
  mergeCarts: (fromUserId: string, toUserId: string) => void;
  getTotalItems: (userId?: string) => number;
  getTotalPrice: (userId?: string) => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      userCarts: { guest: [] },
      
      addItem: (product, quantity = 1, userId = 'guest') => {
        const carts = get().userCarts;
        const currentItems = carts[userId] || [];
        const existingItem = currentItems.find((item) => item.id === product.id);

        let newItems;
        if (existingItem) {
          newItems = currentItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          newItems = [
            ...currentItems,
            {
              id: product.id,
              name: product.name,
              price: product.price,
              imageUrl: (product.images?.[0]?.src && product.images[0].src !== 'image') ? product.images[0].src : '/placeholder.png',
              slug: product.slug,
              quantity,
            },
          ];
        }

        set({ userCarts: { ...carts, [userId]: newItems } });
      },

      removeItem: (productId, userId = 'guest') => {
        const carts = get().userCarts;
        const currentItems = carts[userId] || [];
        set({
          userCarts: {
            ...carts,
            [userId]: currentItems.filter((item) => item.id !== productId)
          }
        });
      },

      updateQuantity: (productId, quantity, userId = 'guest') => {
        if (quantity < 1) return;
        const carts = get().userCarts;
        const currentItems = carts[userId] || [];
        set({
          userCarts: {
            ...carts,
            [userId]: currentItems.map((item) =>
              item.id === productId ? { ...item, quantity } : item
            )
          }
        });
      },

      clearCart: (userId = 'guest') => {
        const carts = get().userCarts;
        set({ userCarts: { ...carts, [userId]: [] } });
      },
      
      mergeCarts: (fromUserId, toUserId) => {
        const carts = get().userCarts;
        const fromItems = carts[fromUserId] || [];
        if (fromItems.length === 0) return;
        
        const toItems = [...(carts[toUserId] || [])];
        
        fromItems.forEach(fromItem => {
          const existingIdx = toItems.findIndex(i => i.id === fromItem.id);
          if (existingIdx > -1) {
            toItems[existingIdx].quantity += fromItem.quantity;
          } else {
            toItems.push(fromItem);
          }
        });
        
        set({ 
          userCarts: { 
            ...carts, 
            [toUserId]: toItems,
            [fromUserId]: [] 
          } 
        });
      },

      getTotalItems: (userId = 'guest') => {
        const items = get().userCarts[userId] || [];
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: (userId = 'guest') => {
        const items = get().userCarts[userId] || [];
        return items.reduce(
          (total, item) => total + parseFloat(item.price) * item.quantity,
          0
        );
      },
    }),
    {
      name: 'southern-spices-cart-v2',
    }
  )
);

export interface WishlistItem {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  slug: string;
}

interface WishlistStore {
  userWishlists: Record<string, WishlistItem[]>;
  toggleItem: (product: any, userId?: string) => void;
  removeItem: (productId: number, userId?: string) => void;
  isInWishlist: (productId: number, userId?: string) => boolean;
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      userWishlists: { guest: [] },

      toggleItem: (product, userId = 'guest') => {
        const wishlists = get().userWishlists;
        const currentItems = wishlists[userId] || [];
        const isExist = currentItems.some((item) => item.id === product.id);

        let newItems;
        if (isExist) {
          newItems = currentItems.filter((item) => item.id !== product.id);
        } else {
          newItems = [
            ...currentItems,
            {
              id: product.id,
              name: product.name,
              price: product.price,
              imageUrl: (product.images?.[0]?.src && product.images[0].src !== 'image') ? product.images[0].src : (product.imageUrl && product.imageUrl !== 'image' ? product.imageUrl : '/placeholder.png'),
              slug: product.slug,
            },
          ];
        }

        set({ userWishlists: { ...wishlists, [userId]: newItems } });
      },

      removeItem: (productId, userId = 'guest') => {
        const wishlists = get().userWishlists;
        const currentItems = wishlists[userId] || [];
        set({
          userWishlists: {
            ...wishlists,
            [userId]: currentItems.filter((item) => item.id !== productId),
          },
        });
      },

      isInWishlist: (productId, userId = 'guest') => {
        const items = get().userWishlists[userId] || [];
        return items.some((item) => item.id === productId);
      },
    }),
    {
      name: 'southern-spices-wishlist',
    }
  )
);
