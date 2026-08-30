"use client";

import { useRef, useState } from "react";
import { Download, Upload, Trash2, ShieldCheck } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { useExpenseStore } from "@/lib/store";

export default function SettingsPage() {
  const transactions = useExpenseStore((s) => s.transactions);
  const categories = useExpenseStore((s) => s.categories);
  const clearAllData = useExpenseStore((s) => s.clearAllData);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function handleExport() {
    const data = { transactions, categories, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ledger-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string);
        if (!Array.isArray(parsed.transactions) || !Array.isArray(parsed.categories)) {
          throw new Error("Invalid file shape");
        }
        useExpenseStore.setState({
          transactions: parsed.transactions,
          categories: parsed.categories,
        });
        setMessage("Data imported successfully.");
      } catch {
        setMessage("Couldn't read that file — make sure it's a Ledger export.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  return (
    <>
      <PageHeader eyebrow="Preferences" title="Settings" />

      <div className="flex flex-col gap-4 max-w-xl">
        <div className="rounded-3xl bg-cream-card p-6 flex items-start gap-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-mint-soft">
            <ShieldCheck size={18} className="text-mint" />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink">Your data stays local</p>
            <p className="text-sm text-ink/50 mt-1 leading-relaxed">
              Everything you add is saved to this browser's local storage only. Nothing is sent
              to a server, so clearing your browser data will remove it too — export a backup
              if you want to keep a copy.
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-cream-card p-6">
          <p className="text-sm font-semibold text-ink mb-1">Backup your data</p>
          <p className="text-sm text-ink/50 mb-4">
            Download a JSON file of everything, or restore from a previous export.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink-soft transition-colors"
            >
              <Download size={15} />
              Export data
            </button>
            <button
              onClick={handleImportClick}
              className="flex items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-sm font-semibold text-ink/70 hover:text-ink transition-colors"
            >
              <Upload size={15} />
              Import data
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              onChange={handleImportFile}
              className="hidden"
            />
          </div>
          {message && <p className="text-xs text-ink/50 mt-3">{message}</p>}
        </div>

        <div className="rounded-3xl bg-coral-soft p-6">
          <p className="text-sm font-semibold text-ink mb-1">Danger zone</p>
          <p className="text-sm text-ink/60 mb-4">
            Permanently remove every transaction from this device. Categories are kept.
          </p>
          {!confirmClear ? (
            <button
              onClick={() => setConfirmClear(true)}
              className="flex items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              <Trash2 size={15} />
              Clear all transactions
            </button>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-ink">Are you sure?</span>
              <button
                onClick={() => {
                  clearAllData();
                  setConfirmClear(false);
                  setMessage("All transactions cleared.");
                }}
                className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white"
              >
                Yes, clear everything
              </button>
              <button
                onClick={() => setConfirmClear(false)}
                className="rounded-full bg-white/60 px-4 py-2 text-xs font-semibold text-ink/60"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
