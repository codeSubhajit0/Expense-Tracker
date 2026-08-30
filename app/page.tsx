"use client";

import { useMemo, useState } from "react";
import { Plus, TrendingUp, TrendingDown, Scale, ChevronDown } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import SpendRing, { RingSegment } from "@/components/SpendRing";
import TransactionTable from "@/components/TransactionTable";
import TransactionModal from "@/components/TransactionModal";
import EmptyState from "@/components/EmptyState";
import { useExpenseStore } from "@/lib/store";
import { formatCurrency, isSameMonth } from "@/lib/format";
import { PALETTE } from "@/lib/palette";
import { Transaction } from "@/lib/types";
import clsx from "clsx";

type Period = "month" | "all";

export default function DashboardPage() {
  const transactions = useExpenseStore((s) => s.transactions);
  const categories = useExpenseStore((s) => s.categories);
  const hasHydrated = useExpenseStore((s) => s.hasHydrated);
  const loadSampleData = useExpenseStore((s) => s.loadSampleData);

  const [period, setPeriod] = useState<Period>("month");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [periodMenuOpen, setPeriodMenuOpen] = useState(false);

  const scoped = useMemo(
    () => (period === "month" ? transactions.filter((t) => isSameMonth(t.date)) : transactions),
    [transactions, period]
  );

  const income = scoped.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expense = scoped.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const net = income - expense;

  const categoryTotals = useMemo(() => {
    const map = new Map<string, number>();
    scoped
      .filter((t) => t.type === "expense")
      .forEach((t) => map.set(t.categoryId, (map.get(t.categoryId) ?? 0) + t.amount));
    return map;
  }, [scoped]);

  const segments: RingSegment[] = categories
    .map((c) => ({
      key: c.id,
      value: categoryTotals.get(c.id) ?? 0,
      color: PALETTE[c.color as keyof typeof PALETTE]?.hex ?? "#ccc",
      label: c.name,
    }))
    .filter((s) => s.value > 0)
    .sort((a, b) => b.value - a.value);

  const recent = [...transactions]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 6);

  function openAdd() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(t: Transaction) {
    setEditing(t);
    setModalOpen(true);
  }

  if (hasHydrated && transactions.length === 0) {
    return (
      <>
        <PageHeader eyebrow="Overview" title="Good to see you" />
        <EmptyState
          title="No transactions yet"
          description="Add your first expense or income entry to start tracking, or load a few sample transactions to see how everything looks."
          primaryLabel="Add transaction"
          onPrimary={openAdd}
          secondaryLabel="Load sample data"
          onSecondary={loadSampleData}
        />
        <TransactionModal open={modalOpen} onClose={() => setModalOpen(false)} editing={editing} />
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Overview"
        title="Good to see you"
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

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-4 rounded-3xl bg-cream-card p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-ink">Spending by category</p>
            <div className="relative">
              <button
                onClick={() => setPeriodMenuOpen((v) => !v)}
                className="flex items-center gap-1 rounded-full bg-cream px-3 py-1.5 text-xs font-medium text-ink/60"
              >
                {period === "month" ? "This month" : "All time"}
                <ChevronDown size={13} />
              </button>
              {periodMenuOpen && (
                <div className="absolute right-0 top-9 z-10 w-32 rounded-xl bg-white shadow-soft overflow-hidden">
                  {(["month", "all"] as Period[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        setPeriod(p);
                        setPeriodMenuOpen(false);
                      }}
                      className="block w-full px-3 py-2 text-left text-xs text-ink/70 hover:bg-cream"
                    >
                      {p === "month" ? "This month" : "All time"}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 grid place-items-center py-2">
            <SpendRing
              segments={segments.length > 0 ? segments : [{ key: "empty", value: 1, color: "#EAE3D2", label: "No spending" }]}
              centerValue={formatCurrency(expense)}
              centerLabel="total spent"
            />
          </div>

          <div className="flex flex-col gap-2.5 mt-2">
            {segments.length === 0 && (
              <p className="text-center text-xs text-ink/40">No expenses logged yet.</p>
            )}
            {segments.slice(0, 5).map((seg) => (
              <div key={seg.key} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-ink/70">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: seg.color }} />
                  {seg.label}
                </span>
                <span className="font-medium text-ink tabular">{formatCurrency(seg.value)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-8 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              icon={TrendingUp}
              label="Income"
              value={formatCurrency(income)}
              caption={period === "month" ? "This month" : "All time"}
              tone="mint"
            />
            <StatCard
              icon={TrendingDown}
              label="Expenses"
              value={formatCurrency(expense)}
              caption={period === "month" ? "This month" : "All time"}
              tone="coral"
            />
            <StatCard
              icon={Scale}
              label="Net balance"
              value={formatCurrency(net)}
              caption={net >= 0 ? "You're in the green" : "Spending more than earning"}
              tone={net >= 0 ? "periwinkle" : "butter"}
            />
          </div>

          <div className="rounded-3xl bg-cream-card p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-ink">Recent activity</p>
              <a href="/transactions" className="text-xs font-medium text-ink/45 hover:text-ink">
                View all
              </a>
            </div>
            <TransactionTable transactions={recent} categories={categories} onEdit={openEdit} />
          </div>
        </div>
      </div>

      <TransactionModal open={modalOpen} onClose={() => setModalOpen(false)} editing={editing} />
    </>
  );
}
