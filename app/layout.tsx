import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clean & Green Services | Window Cleaning & Lawn Care — Winnipeg",
  description:
    "Winnipeg's trusted window cleaning and lawn care company. Run by Idan & Tristin — local, reliable, and obsessed with the details. Serving residential properties across Winnipeg since 2023.",
  keywords: [
    "window cleaning Winnipeg",
    "lawn care Winnipeg",
    "exterior cleaning",
    "lawn mowing",
    "fertilizer application",
    "aeration",
    "spring cleanup Winnipeg",
  ],
  openGraph: {
    title: "Clean & Green Services — Winnipeg",
    description:
      "Clean windows. Perfect lawns. No hassle. Serving Winnipeg homeowners since 2023.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
