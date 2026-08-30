"use client";

import { useEffect, useState } from "react";
import { X, Trash2 } from "lucide-react";
import clsx from "clsx";
import { useExpenseStore } from "@/lib/store";
import { Category, PALETTE_KEYS, PaletteKey } from "@/lib/types";
import { PALETTE } from "@/lib/palette";
import { ICON_OPTIONS } from "@/lib/icons";

export default function CategoryModal({
  open,
  onClose,
  editing,
}: {
  open: boolean;
  onClose: () => void;
  editing?: Category | null;
}) {
  const addCategory = useExpenseStore((s) => s.addCategory);
  const updateCategory = useExpenseStore((s) => s.updateCategory);
  const deleteCategory = useExpenseStore((s) => s.deleteCategory);

  const [name, setName] = useState("");
  const [color, setColor] = useState<PaletteKey>("pink");
  const [icon, setIcon] = useState(ICON_OPTIONS[0].key);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    if (editing) {
      setName(editing.name);
      setColor(editing.color as PaletteKey);
      setIcon(editing.icon);
    } else {
      setName("");
      setColor("pink");
      setIcon(ICON_OPTIONS[0].key);
    }
    setError(null);
  }, [open, editing]);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Give this category a name.");
      return;
    }
    const payload = { name: name.trim(), color, icon };
    if (editing) {
      updateCategory(editing.id, payload);
    } else {
      addCategory(payload);
    }
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink/40 backdrop-blur-sm px-0 sm:px-4">
      <div className="w-full sm:max-w-sm rounded-t-3xl sm:rounded-3xl bg-cream-card p-6 shadow-soft max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-xl font-semibold text-ink">
            {editing ? "Edit category" : "New category"}
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
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-ink/50">Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Subscriptions"
              className="rounded-xl bg-cream px-4 py-2.5 text-sm text-ink placeholder:text-ink/35 focus:outline-none"
            />
          </label>

          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-ink/50">Color</span>
            <div className="flex gap-2">
              {PALETTE_KEYS.map((key) => (
                <button
                  type="button"
                  key={key}
                  onClick={() => setColor(key)}
                  className={clsx(
                    "h-9 w-9 rounded-full transition-transform",
                    color === key && "ring-2 ring-offset-2 ring-ink scale-105"
                  )}
                  style={{ backgroundColor: PALETTE[key].hex }}
                  aria-label={key}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-ink/50">Icon</span>
            <div className="grid grid-cols-5 gap-2">
              {ICON_OPTIONS.map(({ key, icon: Icon }) => (
                <button
                  type="button"
                  key={key}
                  onClick={() => setIcon(key)}
                  className={clsx(
                    "grid h-10 w-10 place-items-center rounded-xl transition-colors",
                    icon === key ? "bg-ink text-white" : "bg-cream text-ink/50"
                  )}
                  aria-label={key}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-xs font-medium text-coral">{error}</p>}

          <div className="flex items-center gap-2 pt-2">
            {editing && (
              <button
                type="button"
                onClick={() => {
                  deleteCategory(editing.id);
                  onClose();
                }}
                className="grid h-11 w-11 place-items-center rounded-full bg-coral-soft text-coral hover:bg-coral hover:text-white transition-colors"
                aria-label="Delete category"
              >
                <Trash2 size={17} />
              </button>
            )}
            <button
              type="submit"
              className="flex-1 rounded-full bg-ink py-3 text-sm font-semibold text-white hover:bg-ink-soft transition-colors"
            >
              {editing ? "Save changes" : "Create category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
