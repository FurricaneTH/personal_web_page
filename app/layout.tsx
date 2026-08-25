import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Muhammed Furkan Çatak | Software Engineer",
  description: "Muhammed Furkan Çatak — Software Engineer, Computer Engineering student, and builder of thoughtful software and intelligent systems.",
  keywords: ["Furkan Çatak", "Software Engineer", "portfolio", "Python", "JavaScript", "AI"],
  authors: [{ name: "Muhammed Furkan Çatak" }],
  openGraph: {
    title: "Muhammed Furkan Çatak | Software Engineer",
    description: "Software Engineer building thoughtful software and intelligent systems.",
    type: "website",
  },
  icons: {
    icon: "/logo-gray.svg",
    shortcut: "/logo-gray.svg",
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
