import {
  UtensilsCrossed,
  Car,
  ShoppingBag,
  Receipt,
  HeartPulse,
  Wallet,
  Home,
  Plane,
  GraduationCap,
  Gift,
  Popcorn,
  Dumbbell,
  PawPrint,
  Smartphone,
  Coffee,
  Tag,
  LucideIcon,
} from "lucide-react";

export const ICON_OPTIONS: { key: string; icon: LucideIcon }[] = [
  { key: "UtensilsCrossed", icon: UtensilsCrossed },
  { key: "Car", icon: Car },
  { key: "ShoppingBag", icon: ShoppingBag },
  { key: "Receipt", icon: Receipt },
  { key: "HeartPulse", icon: HeartPulse },
  { key: "Wallet", icon: Wallet },
  { key: "Home", icon: Home },
  { key: "Plane", icon: Plane },
  { key: "GraduationCap", icon: GraduationCap },
  { key: "Gift", icon: Gift },
  { key: "Popcorn", icon: Popcorn },
  { key: "Dumbbell", icon: Dumbbell },
  { key: "PawPrint", icon: PawPrint },
  { key: "Smartphone", icon: Smartphone },
  { key: "Coffee", icon: Coffee },
];

const MAP: Record<string, LucideIcon> = Object.fromEntries(
  ICON_OPTIONS.map((o) => [o.key, o.icon])
);

export function getCategoryIcon(key: string): LucideIcon {
  return MAP[key] ?? Tag;
}
