import { LucideIcon } from "lucide-react";
import clsx from "clsx";

export default function StatCard({
  icon: Icon,
  label,
  value,
  caption,
  delta,
  tone,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  caption: string;
  delta?: { value: string; positive: boolean };
  tone: "pink" | "periwinkle" | "butter" | "mint" | "coral";
}) {
  const toneClasses: Record<string, string> = {
    pink: "bg-pink-soft",
    periwinkle: "bg-periwinkle-soft",
    butter: "bg-butter-soft",
    mint: "bg-mint-soft",
    coral: "bg-coral-soft",
  };
  const iconToneClasses: Record<string, string> = {
    pink: "bg-pink text-white",
    periwinkle: "bg-periwinkle text-white",
    butter: "bg-butter text-ink",
    mint: "bg-mint text-white",
    coral: "bg-coral text-white",
  };

  return (
    <div className={clsx("rounded-3xl p-5 flex flex-col gap-4", toneClasses[tone])}>
      <div className="flex items-center justify-between">
        <div className={clsx("grid h-9 w-9 place-items-center rounded-full", iconToneClasses[tone])}>
          <Icon size={16} strokeWidth={2.4} />
        </div>
        {delta && (
          <span
            className={clsx(
              "rounded-full px-2.5 py-1 text-xs font-semibold",
              delta.positive ? "bg-ink text-white" : "bg-white/60 text-ink/70"
            )}
          >
            {delta.positive ? "↑" : "↓"} {delta.value}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-ink/70">{label}</p>
        <p className="font-display text-[26px] font-semibold tracking-tight text-ink tabular">
          {value}
        </p>
        <p className="text-xs text-ink/50 mt-0.5">{caption}</p>
      </div>
    </div>
  );
}
