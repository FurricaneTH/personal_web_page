import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Furkan Çatak",
  description: "Furkan Çatak — Bilgisayar Mühendisliği öğrencisi, yapay zeka ve yazılım geliştirme alanlarında üretir.",
  keywords: ["Furkan Çatak", "Software Engineer", "portfolio", "Python", "JavaScript", "AI"],
  authors: [{ name: "Muhammed Furkan Çatak" }],
  openGraph: {
    title: "Furkan Çatak",
    description: "Furkan Çatak — Yapay zeka, veri analizi ve yazılım geliştirme.",
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
