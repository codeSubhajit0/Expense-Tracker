"use client";

import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto flex max-w-[1400px] gap-4 px-4 py-4 lg:px-6">
        <Sidebar />
        <main className="min-w-0 flex-1 pb-24 lg:pb-4">{children}</main>
      </div>
      <MobileNav />
    </div>
  );
}
