import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manish Parajuli | Full-Stack Developer & AI Engineer | Sydney",
  description:
    "Production portfolio of Manish Parajuli. Full-stack developer at NMI in Sydney building enterprise solutions with React, Next.js, and NestJS. Master of IT (Artificial Intelligence) candidate at Macquarie University.",
  keywords: [
    "Manish Parajuli",
    "Full-Stack Developer",
    "Sydney",
    "React.js",
    "Next.js",
    "NestJS",
    "TypeScript",
    "LangGraph",
    "RAG",
    "Docker",
    "SAP REX Integration",
    "Shopify Storefront",
    "Macquarie University",
  ],
  authors: [{ name: "Manish Parajuli", url: "https://github.com/parajulimanish07" }],
  creator: "Manish Parajuli",
  metadataBase: new URL("https://manishparajuli.com"),
  openGraph: {
    title: "Manish Parajuli | Full-Stack Developer & AI Engineer",
    description:
      "Full-stack developer building enterprise solutions with React, Next.js, and NestJS at NMI Sydney. Master of IT (AI) at Macquarie University.",
    url: "https://manishparajuli.com",
    siteName: "Manish Parajuli Portfolio",
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manish Parajuli | Full-Stack Developer & AI Engineer",
    description:
      "Full-stack developer building enterprise solutions with React, Next.js, and NestJS at NMI Sydney.",
    creator: "@parajulimanish",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-[#faf7f2] text-stone-900 antialiased selection:bg-amber-200/60 selection:text-stone-900">
        {children}
      </body>
    </html>
  );
}
