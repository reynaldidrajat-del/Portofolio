import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Reynaldi Drajat — System Analyst & Business Analyst",
  description:
    "Visual portfolio of Reynaldi Drajat Ageng Perwira — Assistant Manager & Business Analyst delivering enterprise systems: LMS, HRIS, E-Procurement, property & asset management.",
  keywords: ["Reynaldi Drajat", "System Analyst", "Business Analyst", "Enterprise Systems", "Portfolio"],
  authors: [{ name: "Reynaldi Drajat Ageng Perwira" }],
  openGraph: {
    title: "Reynaldi Drajat — System Analyst & Business Analyst",
    description: "Enterprise systems, documented visually.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#fafafa",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
