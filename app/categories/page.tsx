"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import CategoryModal from "@/components/CategoryModal";
import { useExpenseStore } from "@/lib/store";
import { getCategoryIcon } from "@/lib/icons";
import { PALETTE } from "@/lib/palette";
import { formatCurrency, isSameMonth } from "@/lib/format";
import { Category } from "@/lib/types";

export default function CategoriesPage() {
  const categories = useExpenseStore((s) => s.categories);
  const transactions = useExpenseStore((s) => s.transactions);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);

  const totals = useMemo(() => {
    const map = new Map<string, number>();
    transactions
      .filter((t) => t.type === "expense" && isSameMonth(t.date))
      .forEach((t) => map.set(t.categoryId, (map.get(t.categoryId) ?? 0) + t.amount));
    return map;
  }, [transactions]);

  function openAdd() {
    setEditing(null);
    setModalOpen(true);
  }
  function openEdit(c: Category) {
    setEditing(c);
    setModalOpen(true);
  }

  return (
    <>
      <PageHeader
        eyebrow="Organize"
        title="Categories"
        action={
          <button
            onClick={openAdd}
            className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink-soft transition-colors"
          >
            <Plus size={16} strokeWidth={2.5} />
            New category
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const Icon = getCategoryIcon(cat.icon);
          const palette = PALETTE[cat.color as keyof typeof PALETTE];
          const spent = totals.get(cat.id) ?? 0;
          return (
            <button
              key={cat.id}
              onClick={() => openEdit(cat)}
              className="text-left rounded-3xl p-5 flex flex-col gap-6 transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: palette.softHex }}
            >
              <span
                className="grid h-10 w-10 place-items-center rounded-full"
                style={{ backgroundColor: palette.hex }}
              >
                <Icon size={17} className="text-white" strokeWidth={2.2} />
              </span>
              <div>
                <p className="text-sm font-medium text-ink/70">{cat.name}</p>
                <p className="font-display text-xl font-semibold text-ink tabular">
                  {formatCurrency(spent)}
                </p>
                <p className="text-xs text-ink/45 mt-0.5">spent this month</p>
              </div>
            </button>
          );
        })}
      </div>

      <CategoryModal open={modalOpen} onClose={() => setModalOpen(false)} editing={editing} />
    </>
  );
}
