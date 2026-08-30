import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F4EFE3",
          card: "#FBF8F0",
          deep: "#EAE3D2",
        },
        ink: {
          DEFAULT: "#18181B",
          soft: "#3A3833",
          faint: "#8B8579",
        },
        pink: {
          DEFAULT: "#FF6FA5",
          soft: "#FCD8E6",
        },
        butter: {
          DEFAULT: "#F4CD46",
          soft: "#FBEBB5",
        },
        periwinkle: {
          DEFAULT: "#8FA0F0",
          soft: "#D9E0FA",
        },
        mint: {
          DEFAULT: "#31B67D",
          soft: "#CBEFDC",
        },
        coral: {
          DEFAULT: "#F0714A",
          soft: "#FBDBCC",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.5rem",
        xl3: "2rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(24,24,27,0.04), 0 8px 24px -12px rgba(24,24,27,0.10)",
      },
    },
  },
  plugins: [],
};
export default config;
