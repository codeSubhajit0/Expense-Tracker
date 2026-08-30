export type TransactionType = "expense" | "income";

export interface Category {
  id: string;
  name: string;
  color: string; // one of the palette keys below
  icon: string; // lucide icon name, stored as string key
}

export interface Transaction {
  id: string;
  description: string;
  amount: number; // always positive; sign is derived from `type`
  type: TransactionType;
  categoryId: string;
  date: string; // ISO date (yyyy-mm-dd)
  note?: string;
  createdAt: string;
}

export const PALETTE_KEYS = [
  "pink",
  "butter",
  "periwinkle",
  "mint",
  "coral",
] as const;

export type PaletteKey = (typeof PALETTE_KEYS)[number];
