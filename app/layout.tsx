import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Muhammed Furkan Çatak | Yazılım Geliştirici",
  description: "Trakya Üniversitesi Bilgisayar Mühendisliği öğrencisi. Python, JavaScript, Yapay Zeka ve Yazılım Geliştirme alanlarında çalışmalar yapıyorum.",
  keywords: ["Furkan Çatak", "yazılım geliştirici", "bilgisayar mühendisliği", "portföy", "python", "javascript"],
  authors: [{ name: "Muhammed Furkan Çatak" }],
  openGraph: {
    title: "Muhammed Furkan Çatak | Yazılım Geliştirici",
    description: "Trakya Üniversitesi Bilgisayar Mühendisliği öğrencisi.",
    type: "website",
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
