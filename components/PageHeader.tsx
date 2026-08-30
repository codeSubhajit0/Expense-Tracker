import { Search } from "lucide-react";

export default function PageHeader({
  eyebrow,
  title,
  action,
  onSearch,
  searchValue,
  searchPlaceholder,
}: {
  eyebrow?: string;
  title: string;
  action?: React.ReactNode;
  onSearch?: (value: string) => void;
  searchValue?: string;
  searchPlaceholder?: string;
}) {
  return (
    <header className="mb-6 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 rounded-full bg-cream-card px-4 py-2.5 shadow-soft w-full max-w-md">
          <Search size={16} className="text-ink/35 shrink-0" />
          {onSearch ? (
            <input
              value={searchValue}
              onChange={(e) => onSearch(e.target.value)}
              placeholder={searchPlaceholder ?? "Search"}
              className="w-full bg-transparent text-sm text-ink placeholder:text-ink/35 focus:outline-none"
            />
          ) : (
            <span className="text-sm text-ink/35">{searchPlaceholder ?? "Search"}</span>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden sm:grid h-10 w-10 place-items-center rounded-full bg-cream-card shadow-soft">
            <span className="h-2 w-2 rounded-full bg-mint" />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          {eyebrow && (
            <p className="text-xs font-medium uppercase tracking-wider text-ink/40 mb-1">
              {eyebrow}
            </p>
          )}
          <h1 className="font-display text-[28px] sm:text-[32px] font-semibold tracking-tight text-ink">
            {title}
          </h1>
        </div>
        {action}
      </div>
    </header>
  );
}
