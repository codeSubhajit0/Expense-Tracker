"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import clsx from "clsx";
import PageHeader from "@/components/PageHeader";
import TransactionTable from "@/components/TransactionTable";
import TransactionModal from "@/components/TransactionModal";
import EmptyState from "@/components/EmptyState";
import { useExpenseStore } from "@/lib/store";
import { Transaction } from "@/lib/types";

type FilterType = "all" | "expense" | "income";

export default function TransactionsPage() {
  const transactions = useExpenseStore((s) => s.transactions);
  const categories = useExpenseStore((s) => s.categories);
  const loadSampleData = useExpenseStore((s) => s.loadSampleData);

  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<FilterType>("all");
  const [categoryFilter, setCategoryFilter] = useState<string | "all">("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);

  const filtered = useMemo(() => {
    return [...transactions]
      .filter((t) => (typeFilter === "all" ? true : t.type === typeFilter))
      .filter((t) => (categoryFilter === "all" ? true : t.categoryId === categoryFilter))
      .filter((t) => t.description.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [transactions, typeFilter, categoryFilter, query]);

  function openAdd() {
    setEditing(null);
    setModalOpen(true);
  }
  function openEdit(t: Transaction) {
    setEditing(t);
    setModalOpen(true);
  }

  return (
    <>
      <PageHeader
        eyebrow="Activity"
        title="Transactions"
        onSearch={setQuery}
        searchValue={query}
        searchPlaceholder="Search transactions"
        action={
          <button
            onClick={openAdd}
            className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink-soft transition-colors"
          >
            <Plus size={16} strokeWidth={2.5} />
            Add transaction
          </button>
        }
      />

      <div className="flex flex-wrap items-center gap-2 mb-4">
        {(["all", "expense", "income"] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setTypeFilter(f)}
            className={clsx(
              "rounded-full px-4 py-2 text-xs font-semibold capitalize transition-colors",
              typeFilter === f ? "bg-ink text-white" : "bg-cream-card text-ink/50"
            )}
          >
            {f}
          </button>
        ))}
        <span className="w-px h-5 bg-black/10 mx-1" />
        <button
          onClick={() => setCategoryFilter("all")}
          className={clsx(
            "rounded-full px-4 py-2 text-xs font-semibold transition-colors",
            categoryFilter === "all" ? "bg-ink text-white" : "bg-cream-card text-ink/50"
          )}
        >
          All categories
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategoryFilter(c.id)}
            className={clsx(
              "rounded-full px-4 py-2 text-xs font-semibold transition-colors",
              categoryFilter === c.id ? "bg-ink text-white" : "bg-cream-card text-ink/50"
            )}
          >
            {c.name}
          </button>
        ))}
      </div>

      {transactions.length === 0 ? (
        <EmptyState
          title="No transactions yet"
          description="Add your first expense or income entry to start tracking, or load a few sample transactions to see how everything looks."
          primaryLabel="Add transaction"
          onPrimary={openAdd}
          secondaryLabel="Load sample data"
          onSecondary={loadSampleData}
        />
      ) : (
        <TransactionTable
          transactions={filtered}
          categories={categories}
          onEdit={openEdit}
          emptyMessage="No transactions match your filters."
        />
      )}

      <TransactionModal open={modalOpen} onClose={() => setModalOpen(false)} editing={editing} />
    </>
  );
}
