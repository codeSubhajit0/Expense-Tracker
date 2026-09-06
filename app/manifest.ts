import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Expense Tracker",
    short_name: "Ledger",
    description:
      "An app that helps users keep track of their expenses and set budgets.",
    start_url: "/",
    display: "standalone",
    background_color: "#F4EFE3",
    theme_color: "#F4EFE3",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
