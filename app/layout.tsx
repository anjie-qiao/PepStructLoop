import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
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
  return <html lang="en"><body className={`${geist.variable} ${mono.variable}`}>{children}</body></html>;
}
