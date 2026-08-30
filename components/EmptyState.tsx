import { Sparkles } from "lucide-react";

export default function EmptyState({
  title,
  description,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
}: {
  title: string;
  description: string;
  primaryLabel: string;
  onPrimary: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
}) {
  return (
    <div className="rounded-3xl bg-cream-card p-12 flex flex-col items-center text-center gap-4">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-pink-soft">
        <Sparkles size={20} className="text-pink" />
      </div>
      <div className="max-w-sm">
        <h3 className="font-display text-lg font-semibold text-ink mb-1.5">{title}</h3>
        <p className="text-sm text-ink/50 leading-relaxed">{description}</p>
      </div>
      <div className="flex items-center gap-3 mt-2">
        <button
          onClick={onPrimary}
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink-soft transition-colors"
        >
          {primaryLabel}
        </button>
        {secondaryLabel && onSecondary && (
          <button
            onClick={onSecondary}
            className="rounded-full bg-cream px-5 py-2.5 text-sm font-semibold text-ink/60 hover:text-ink transition-colors"
          >
            {secondaryLabel}
          </button>
        )}
      </div>
    </div>
  );
}
