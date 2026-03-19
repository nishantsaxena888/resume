/* eslint-disable @typescript-eslint/no-unused-vars */
// /store/cart.ts
"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ProductType = {
  id: string;
  name: string;
  image: string;
  quantity: number; // quantity in cart
  price: number;
  weight: number;
};

type Store = {
  cart_list: ProductType[];
  add_to_cart: (prop: ProductType) => void; // adds or increases quantity
  remove_one: (id: string) => void; // decrease by 1 (remove if 0)
  remove_item: (id: string) => void; // remove whole line
  clear_cart: () => void; // empty cart
};

export const useCart = create<Store>()(
  persist(
    (set, _get) => ({
      cart_list: [],

      add_to_cart: (prop) =>
        set((state) => {
          console.log({ prop });
          const existing = state.cart_list.find((p) => p.id === prop.id);

          if (existing) {
            return {
              cart_list: state.cart_list.map((p) =>
                p.id === prop.id ? { ...p, quantity: p.quantity + 1 } : p
              ),
            };
          }

          return {
            cart_list: [...state.cart_list, { ...prop, quantity: 1 }],
          };
        }),

      remove_one: (id) =>
        set((state) => {
          const existing = state.cart_list.find((p) => p.id === id);
          if (!existing) return state;

          if (existing.quantity <= 1) {
            return { cart_list: state.cart_list.filter((p) => p.id !== id) };
          }

          return {
            cart_list: state.cart_list.map((p) =>
              p.id === id ? { ...p, quantity: p.quantity - 1 } : p
            ),
          };
        }),

      remove_item: (id) =>
        set((state) => ({
          cart_list: state.cart_list.filter((p) => p.id !== id),
        })),

      clear_cart: () => set({ cart_list: [] }),
    }),
    {
      name: "cart-store", // localStorage key
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : (undefined as any)
      ),
      // only persist cart_list (functions are not persisted)
      partialize: (state) => ({ cart_list: state.cart_list }),
      version: 1,
    }
  )
);

// ---------- Reactive selectors (totals) ----------
export const useTotalQuantity = () =>
  useCart((s) => s.cart_list.reduce((sum, p) => sum + p.quantity, 0));

export const useTotalPrice = () =>
  useCart((s) => s.cart_list.reduce((sum, p) => sum + p.quantity * p.price, 0));
