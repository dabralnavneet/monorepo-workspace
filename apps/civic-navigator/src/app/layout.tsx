import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Civic Navigator — Visualize India's Power Structure",
  description:
    "An interactive visual guide to the Indian Constitution's power structure. Explore the roles, responsibilities, eligibility, and powers of every position from the President to the Gram Panchayat.",
  keywords: [
    "Indian Constitution",
    "Government positions",
    "MLA",
    "MP",
    "IAS",
    "IPS",
    "Prime Minister",
    "President",
    "Judiciary",
    "Legislature",
    "Executive",
    "Panchayat",
    "UPSC",
    "Civic education",
  ],
  openGraph: {
    title: "Civic Navigator — Visualize India's Power Structure",
    description:
      "Explore the Indian government hierarchy interactively — from the Constitution to Gram Panchayats.",
    type: "website",
    locale: "en_IN",
    siteName: "Civic Navigator",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
