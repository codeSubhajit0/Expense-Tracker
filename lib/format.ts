export function formatCurrency(value: number): string {
  const sign = value < 0 ? "-" : "";
  const abs = Math.abs(value);
  return `${sign}$${abs.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function formatCompact(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1000) {
    return `${value < 0 ? "-" : ""}${(abs / 1000).toFixed(1)}k`;
  }
  return formatCurrency(value);
}

export function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateShort(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function isSameMonth(iso: string, ref: Date = new Date()): boolean {
  const d = new Date(iso + "T00:00:00");
  return d.getMonth() === ref.getMonth() && d.getFullYear() === ref.getFullYear();
}
