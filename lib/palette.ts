import { PaletteKey } from "./types";

interface PaletteClasses {
  bg: string; // solid background
  soft: string; // soft/tint background
  text: string; // solid text color (for use on soft bg)
  ring: string; // stroke color for svg (hex)
  hex: string;
  softHex: string;
}

export const PALETTE: Record<PaletteKey, PaletteClasses> = {
  pink: {
    bg: "bg-pink",
    soft: "bg-pink-soft",
    text: "text-pink",
    ring: "#FF6FA5",
    hex: "#FF6FA5",
    softHex: "#FCD8E6",
  },
  butter: {
    bg: "bg-butter",
    soft: "bg-butter-soft",
    text: "text-butter",
    ring: "#F4CD46",
    hex: "#F4CD46",
    softHex: "#FBEBB5",
  },
  periwinkle: {
    bg: "bg-periwinkle",
    soft: "bg-periwinkle-soft",
    text: "text-periwinkle",
    ring: "#8FA0F0",
    hex: "#8FA0F0",
    softHex: "#D9E0FA",
  },
  mint: {
    bg: "bg-mint",
    soft: "bg-mint-soft",
    text: "text-mint",
    ring: "#31B67D",
    hex: "#31B67D",
    softHex: "#CBEFDC",
  },
  coral: {
    bg: "bg-coral",
    soft: "bg-coral-soft",
    text: "text-coral",
    ring: "#F0714A",
    hex: "#F0714A",
    softHex: "#FBDBCC",
  },
};
