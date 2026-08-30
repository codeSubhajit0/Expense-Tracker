# Ledger — Expense Tracker

A frontend-only expense tracker built with Next.js (App Router), TypeScript,
Tailwind CSS, and Zustand. All data — transactions and categories — is
persisted to the browser's `localStorage` via Zustand's `persist` middleware.
There is no backend or API: everything runs client-side.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What's included

- **Dashboard** (`/`) — a segmented ring chart of spending by category, income
  / expense / net-balance summary cards, and a recent-activity feed.
- **Transactions** (`/transactions`) — full list with search and filters by
  type/category; add, edit, and delete transactions from a single modal.
- **Categories** (`/categories`) — manage categories with a name, color, and
  icon; each card shows the month-to-date spend for that category.
- **Settings** (`/settings`) — export all data to a JSON file, import it back
  in, or clear all transactions.

## Data & storage

- State lives in `lib/store.ts` (Zustand + `persist`), under the
  localStorage key `expense-tracker-storage`.
- Nothing leaves the browser. Clearing site data/localStorage will remove all
  transactions and categories — use **Settings → Export data** to keep a
  backup.
- From the dashboard's empty state you can click **Load sample data** to see
  the app populated with a handful of example transactions.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** for styling, with a small custom design-token palette in
  `tailwind.config.ts`
- **Zustand** for state management and localStorage persistence
- **lucide-react** for icons
- Self-hosted **Inter** / **Space Grotesk** fonts via `@fontsource`

## Project structure

```
app/
  page.tsx                 Dashboard
  transactions/page.tsx    Transactions list
  categories/page.tsx      Category manager
  settings/page.tsx        Export / import / reset
components/
  Sidebar.tsx, MobileNav.tsx, AppShell.tsx   Navigation shell
  SpendRing.tsx             Segmented donut chart
  StatCard.tsx              Colored summary cards
  TransactionTable.tsx      Shared transaction list/table
  TransactionModal.tsx      Add/edit transaction form
  CategoryModal.tsx         Add/edit category form
  EmptyState.tsx, PageHeader.tsx
lib/
  store.ts                  Zustand store + persistence
  types.ts                  Shared TypeScript types
  format.ts                 Currency/date formatting helpers
  palette.ts                Color-token lookup
  icons.ts                  Category icon lookup
```

## Next steps (not included)

This is intentionally frontend-only, per the brief. If you later want a
backend: swap the Zustand `persist` storage adapter for API calls (the store
already centralizes every read/write, so this is a small, contained change),
add auth, and sync categories/transactions server-side.
