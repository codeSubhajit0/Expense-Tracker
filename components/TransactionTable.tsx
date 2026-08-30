"use client";

import { Category, Transaction } from "@/lib/types";
import { formatCurrency, formatDateShort } from "@/lib/format";
import { getCategoryIcon } from "@/lib/icons";
import { PALETTE } from "@/lib/palette";
import { Pencil } from "lucide-react";
import clsx from "clsx";

export default function TransactionTable({
  transactions,
  categories,
  onEdit,
  emptyMessage = "Nothing here yet.",
}: {
  transactions: Transaction[];
  categories: Category[];
  onEdit: (t: Transaction) => void;
  emptyMessage?: string;
}) {
  const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c]));

  if (transactions.length === 0) {
    return (
      <div className="rounded-3xl bg-cream-card p-10 text-center">
        <p className="text-sm text-ink/45">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-cream-card overflow-hidden">
      <div className="hidden sm:grid grid-cols-[1fr_140px_120px_110px_44px] gap-2 px-6 py-3 text-xs font-medium uppercase tracking-wide text-ink/35">
        <span>Description</span>
        <span>Category</span>
        <span>Date</span>
        <span className="text-right">Amount</span>
        <span />
      </div>
      <div className="divide-y divide-black/5">
        {transactions.map((t) => {
          const cat = categoryMap[t.categoryId];
          const Icon = getCategoryIcon(cat?.icon ?? "Tag");
          const palette = PALETTE[(cat?.color ?? "pink") as keyof typeof PALETTE];
          const isIncome = t.type === "income";
          return (
            <button
              key={t.id}
              onClick={() => onEdit(t)}
              className="w-full text-left grid grid-cols-2 sm:grid-cols-[1fr_140px_120px_110px_44px] items-center gap-2 px-6 py-3.5 hover:bg-black/[0.02] transition-colors group"
            >
              <div className="flex items-center gap-3 col-span-2 sm:col-span-1 min-w-0">
                <span
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
                  style={{ backgroundColor: palette?.softHex }}
                >
                  <Icon size={15} strokeWidth={2.2} style={{ color: palette?.hex }} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink truncate">{t.description}</p>
                  <p className="text-xs text-ink/40 sm:hidden">{cat?.name ?? "Uncategorized"}</p>
                </div>
              </div>
              <span className="hidden sm:inline-block text-sm text-ink/60">
                {cat?.name ?? "Uncategorized"}
              </span>
              <span className="hidden sm:inline-block text-sm text-ink/50">
                {formatDateShort(t.date)}
              </span>
              <span
                className={clsx(
                  "text-sm font-semibold text-right tabular",
                  isIncome ? "text-mint" : "text-ink"
                )}
              >
                {isIncome ? "+" : "−"}
                {formatCurrency(t.amount)}
              </span>
              <span className="hidden sm:grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Pencil size={14} className="text-ink/40" />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
