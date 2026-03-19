"use client";

import type React from "react";
import { createContext, useContext, useReducer, useEffect } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  brand: string;
  rating: number;
  inStock: boolean;
}

export interface DashboardItem extends Product {
  quantity: number;
}

interface DashboardState {
  items: DashboardItem[];
  total: number;
  itemCount: number;
}

type DashboardAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_DASHBOARD" }
  | { type: "LOAD_DASHBOARD"; payload: DashboardState };

const DashboardContext = createContext<{
  state: DashboardState;
  dispatch: React.Dispatch<DashboardAction>;
} | null>(null);

function dashboardReducer(state: DashboardState, action: DashboardAction): DashboardState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        const total = updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        const itemCount = updatedItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );

        return { items: updatedItems, total, itemCount };
      }

      const newItems = [...state.items, { ...action.payload, quantity: 1 }];
      const total = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return { items: newItems, total, itemCount };
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.id !== action.payload);
      const total = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return { items: newItems, total, itemCount };
    }

    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return dashboardReducer(state, {
          type: "REMOVE_ITEM",
          payload: action.payload.id,
        });
      }

      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      const total = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const itemCount = updatedItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      return { items: updatedItems, total, itemCount };
    }

    case "CLEAR_DASHBOARD":
      return { items: [], total: 0, itemCount: 0 };

    case "LOAD_DASHBOARD":
      return action.payload;

    default:
      return state;
  }
}

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(dashboardReducer, {
    items: [],
    total: 0,
    itemCount: 0,
  });

  // Load dashboard from localStorage on mount
  useEffect(() => {
    const savedDashboard = localStorage.getItem("dashboard");
    if (savedDashboard) {
      try {
        const parsedDashboard = JSON.parse(savedDashboard);
        dispatch({ type: "LOAD_DASHBOARD", payload: parsedDashboard });
      } catch (error) {
        console.error("Error loading dashboard from localStorage:", error);
      }
    }
  }, []);

  // Save dashboard to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("dashboard", JSON.stringify(state));
  }, [state]);

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
