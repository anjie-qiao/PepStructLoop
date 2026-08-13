import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });
const display = Space_Grotesk({ variable: "--font-display", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PepStructLoop — Sequence–Structure Closed-loop Peptide Design",
  description: "A de novo AI pipeline for NTSR1-targeting peptide design across sequence and structure space.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "PepStructLoop",
    description: "From sequence universe to molecular interface.",
    images: [{ url: "/pepstructloop-social.png", width: 1536, height: 1024 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PepStructLoop",
    description: "Sequence intelligence explores. Structure intelligence decides.",
    images: ["/pepstructloop-social.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${inter.variable} ${display.variable} ${mono.variable}`}>{children}</body></html>;
}
