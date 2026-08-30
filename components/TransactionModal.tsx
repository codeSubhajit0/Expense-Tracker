"use client";

import { useEffect, useState } from "react";
import { X, Trash2 } from "lucide-react";
import clsx from "clsx";
import { useExpenseStore } from "@/lib/store";
import { Transaction, TransactionType } from "@/lib/types";
import { getCategoryIcon } from "@/lib/icons";
import { PALETTE } from "@/lib/palette";

export default function TransactionModal({
  open,
  onClose,
  editing,
}: {
  open: boolean;
  onClose: () => void;
  editing?: Transaction | null;
}) {
  const categories = useExpenseStore((s) => s.categories);
  const addTransaction = useExpenseStore((s) => s.addTransaction);
  const updateTransaction = useExpenseStore((s) => s.updateTransaction);
  const deleteTransaction = useExpenseStore((s) => s.deleteTransaction);

  const [type, setType] = useState<TransactionType>("expense");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0]?.id ?? "");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    if (editing) {
      setType(editing.type);
      setDescription(editing.description);
      setAmount(String(editing.amount));
      setCategoryId(editing.categoryId);
      setDate(editing.date);
    } else {
      setType("expense");
      setDescription("");
      setAmount("");
      setCategoryId(categories[0]?.id ?? "");
      setDate(new Date().toISOString().slice(0, 10));
    }
    setError(null);
  }, [open, editing, categories]);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = parseFloat(amount);
    if (!description.trim()) {
      setError("Give this transaction a short description.");
      return;
    }
    if (!parsed || parsed <= 0) {
      setError("Enter an amount greater than zero.");
      return;
    }
    if (!categoryId) {
      setError("Choose a category.");
      return;
    }
    const payload = {
      description: description.trim(),
      amount: parsed,
      type,
      categoryId,
      date,
    };
    if (editing) {
      updateTransaction(editing.id, payload);
    } else {
      addTransaction(payload);
    }
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink/40 backdrop-blur-sm px-0 sm:px-4">
      <div className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl bg-cream-card p-6 shadow-soft max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-xl font-semibold text-ink">
            {editing ? "Edit transaction" : "Add transaction"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-8 w-8 place-items-center rounded-full hover:bg-ink/5"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex rounded-full bg-cream p-1">
            {(["expense", "income"] as TransactionType[]).map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => setType(t)}
                className={clsx(
                  "flex-1 rounded-full py-2 text-sm font-medium capitalize transition-colors",
                  type === t ? "bg-ink text-white" : "text-ink/50"
                )}
              >
                {t}
              </button>
            ))}
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-ink/50">Description</span>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Grocery run"
              className="rounded-xl bg-cream px-4 py-2.5 text-sm text-ink placeholder:text-ink/35 focus:outline-none"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-ink/50">Amount</span>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                inputMode="decimal"
                placeholder="0.00"
                className="rounded-xl bg-cream px-4 py-2.5 text-sm text-ink placeholder:text-ink/35 focus:outline-none tabular"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-ink/50">Date</span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="rounded-xl bg-cream px-4 py-2.5 text-sm text-ink focus:outline-none"
              />
            </label>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-ink/50">Category</span>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const Icon = getCategoryIcon(cat.icon);
                const active = categoryId === cat.id;
                const palette = PALETTE[cat.color as keyof typeof PALETTE];
                return (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => setCategoryId(cat.id)}
                    className={clsx(
                      "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border transition-colors",
                      active
                        ? "border-ink bg-ink text-white"
                        : "border-transparent bg-cream text-ink/60"
                    )}
                  >
                    <span
                      className="grid h-4 w-4 place-items-center rounded-full"
                      style={{ backgroundColor: active ? "white" : palette?.hex }}
                    >
                      <Icon size={10} strokeWidth={2.5} color={active ? palette?.hex : "white"} />
                    </span>
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {error && <p className="text-xs font-medium text-coral">{error}</p>}

          <div className="flex items-center gap-2 pt-2">
            {editing && (
              <button
                type="button"
                onClick={() => {
                  deleteTransaction(editing.id);
                  onClose();
                }}
                className="grid h-11 w-11 place-items-center rounded-full bg-coral-soft text-coral hover:bg-coral hover:text-white transition-colors"
                aria-label="Delete transaction"
              >
                <Trash2 size={17} />
              </button>
            )}
            <button
              type="submit"
              className="flex-1 rounded-full bg-ink py-3 text-sm font-semibold text-white hover:bg-ink-soft transition-colors"
            >
              {editing ? "Save changes" : "Add transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
