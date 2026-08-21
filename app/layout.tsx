import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });
const display = Space_Grotesk({ variable: "--font-display", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PepStructLoop — Gradient-driven NTSR1 Peptide Design",
  description: "A de novo NTSR1 peptide design framework connecting sequence space, structure space and gradient-guided optimization.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "PepStructLoop",
    description: "From sequence space to a molecular hypothesis.",
    images: [{ url: "https://anjie-qiao.github.io/PepStructLoop/og.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PepStructLoop",
    description: "Sequence space × structure space × gradient optimization.",
    images: ["https://anjie-qiao.github.io/PepStructLoop/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${inter.variable} ${display.variable} ${mono.variable}`}>{children}</body></html>;
}
