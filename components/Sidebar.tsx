"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Receipt, Tags, Settings, Wallet } from "lucide-react";
import clsx from "clsx";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: LayoutGrid },
  { href: "/transactions", label: "Transactions", icon: Receipt },
  { href: "/categories", label: "Categories", icon: Tags },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-[248px] shrink-0 flex-col bg-ink text-cream/90 rounded-3xl p-5 h-[calc(100vh-2rem)] sticky top-4">
      <div className="flex items-center gap-2 px-2 pb-8 pt-1">
        <div className="grid h-8 w-8 place-items-center rounded-full bg-pink">
          <Wallet size={16} className="text-ink" strokeWidth={2.5} />
        </div>
        <span className="font-display text-lg font-semibold tracking-tight text-white">
          ledger
        </span>
      </div>

      <p className="px-3 pb-2 text-[11px] font-medium uppercase tracking-wider text-cream/40">
        Overview
      </p>
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-white/[0.08] text-white"
                  : "text-cream/55 hover:bg-white/[0.05] hover:text-white"
              )}
            >
              <Icon size={17} strokeWidth={2} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl bg-white/[0.06] p-4">
        <p className="text-xs text-cream/50 leading-relaxed">
          All your data stays on this device — nothing is sent to a server.
        </p>
      </div>
    </aside>
  );
}
