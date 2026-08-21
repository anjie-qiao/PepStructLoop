import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });
const display = Space_Grotesk({ variable: "--font-display", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PepStructLoop — Closed-loop NTSR1 Peptide Design Results",
  description: "A completed sequence–structure–gradient optimization loop that narrowed 100,000 de novo sequences to 100 NTSR1 candidates.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "PepStructLoop",
    description: "From 100,000 de novo sequences to 100 structurally prioritized NTSR1 candidates.",
    images: [{ url: "/pepstructloop-social.png", width: 1536, height: 1024 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PepStructLoop",
    description: "Sequence intelligence explores. Structure intelligence selects. Gradients optimize.",
    images: ["/pepstructloop-social.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${inter.variable} ${display.variable} ${mono.variable}`}>{children}</body></html>;
}
