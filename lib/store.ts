"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuid } from "uuid";
import { Category, Transaction, TransactionType } from "./types";

const DEFAULT_CATEGORIES: Category[] = [
  { id: "cat-food", name: "Food & Drink", color: "coral", icon: "UtensilsCrossed" },
  { id: "cat-transport", name: "Transport", color: "periwinkle", icon: "Car" },
  { id: "cat-shopping", name: "Shopping", color: "pink", icon: "ShoppingBag" },
  { id: "cat-bills", name: "Bills & Utilities", color: "butter", icon: "Receipt" },
  { id: "cat-health", name: "Health", color: "mint", icon: "HeartPulse" },
  { id: "cat-income", name: "Income", color: "mint", icon: "Wallet" },
];

const SAMPLE_TRANSACTIONS: Omit<Transaction, "id" | "createdAt">[] = [
  { description: "Monthly salary", amount: 3200, type: "income", categoryId: "cat-income", date: isoDaysAgo(2) },
  { description: "Grocery run", amount: 64.2, type: "expense", categoryId: "cat-food", date: isoDaysAgo(1) },
  { description: "Metro pass", amount: 40, type: "expense", categoryId: "cat-transport", date: isoDaysAgo(3) },
  { description: "Electricity bill", amount: 78.5, type: "expense", categoryId: "cat-bills", date: isoDaysAgo(5) },
  { description: "New sneakers", amount: 89.99, type: "expense", categoryId: "cat-shopping", date: isoDaysAgo(6) },
  { description: "Pharmacy", amount: 22.3, type: "expense", categoryId: "cat-health", date: isoDaysAgo(8) },
  { description: "Coffee with Sam", amount: 8.4, type: "expense", categoryId: "cat-food", date: isoDaysAgo(9) },
  { description: "Freelance payment", amount: 450, type: "income", categoryId: "cat-income", date: isoDaysAgo(10) },
];

function isoDaysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

interface ExpenseState {
  transactions: Transaction[];
  categories: Category[];
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;

  addTransaction: (t: Omit<Transaction, "id" | "createdAt">) => void;
  updateTransaction: (id: string, t: Omit<Transaction, "id" | "createdAt">) => void;
  deleteTransaction: (id: string) => void;

  addCategory: (c: Omit<Category, "id">) => void;
  updateCategory: (id: string, c: Omit<Category, "id">) => void;
  deleteCategory: (id: string) => void;

  loadSampleData: () => void;
  clearAllData: () => void;
}

export const useExpenseStore = create<ExpenseState>()(
  persist(
    (set) => ({
      transactions: [],
      categories: DEFAULT_CATEGORIES,
      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),

      addTransaction: (t) =>
        set((state) => ({
          transactions: [
            { ...t, id: uuid(), createdAt: new Date().toISOString() },
            ...state.transactions,
          ],
        })),

      updateTransaction: (id, t) =>
        set((state) => ({
          transactions: state.transactions.map((tx) =>
            tx.id === id ? { ...tx, ...t } : tx
          ),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((tx) => tx.id !== id),
        })),

      addCategory: (c) =>
        set((state) => ({
          categories: [...state.categories, { ...c, id: uuid() }],
        })),

      updateCategory: (id, c) =>
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id === id ? { ...cat, ...c } : cat
          ),
        })),

      deleteCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((cat) => cat.id !== id),
          transactions: state.transactions.filter((tx) => tx.categoryId !== id),
        })),

      loadSampleData: () =>
        set((state) => ({
          transactions: [
            ...SAMPLE_TRANSACTIONS.map((t) => ({
              ...t,
              id: uuid(),
              createdAt: new Date().toISOString(),
            })),
            ...state.transactions,
          ],
        })),

      clearAllData: () => set({ transactions: [] }),
    }),
    {
      name: "expense-tracker-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export function typeSign(type: TransactionType): 1 | -1 {
  return type === "income" ? 1 : -1;
}
