"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const navLinks = [
  { href: "#anasayfa", tr: "Anasayfa", en: "Home" },
  { href: "#hakkimda", tr: "Hakkımda", en: "About" },
  { href: "#projeler", tr: "Projeler", en: "Projects" },
  { href: "#deneyim", tr: "Deneyim", en: "Experience" },
  { href: "#iletisim", tr: "İletişim", en: "Contact" },
];

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollAnimation = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (scrollAnimation.current !== null) cancelAnimationFrame(scrollAnimation.current);
    };
  }, []);

  const go = (href: string) => {
    setMenuOpen(false);
    const target = document.querySelector(href) as HTMLElement | null;
    if (!target) return;

    if (scrollAnimation.current !== null) cancelAnimationFrame(scrollAnimation.current);
    const start = window.scrollY;
    const end = Math.max(0, target.getBoundingClientRect().top + start - 36);
    const distance = end - start;
    const duration = 1050;
    const startedAt = performance.now();
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    const animate = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 0.5 - Math.cos(progress * Math.PI) / 2;
      window.scrollTo({ top: start + distance * eased, behavior: "auto" });
      if (progress < 1) {
        scrollAnimation.current = requestAnimationFrame(animate);
      } else {
        scrollAnimation.current = null;
        root.style.scrollBehavior = previousScrollBehavior;
      }
    };

    scrollAnimation.current = requestAnimationFrame(animate);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? "bg-white/90 dark:bg-[#0c0c0c]/95 border-b border-black/10 dark:border-white/5 backdrop-blur-md"
        : "bg-transparent"
    }`}>
      <div className="max-w-4xl mx-auto px-6 flex items-center justify-center h-14 relative">
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className="px-3 py-1.5 text-sm text-slate-700 dark:text-gray-100 hover:text-slate-900 dark:hover:text-white transition-colors rounded-md hover:bg-white/5"
            >
              {language === "tr" ? l.tr : l.en}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 md:absolute md:right-6">
          {mounted && (
            <button
              onClick={toggleLanguage}
              className="px-2 py-1.5 rounded-md text-xs font-semibold text-slate-700 dark:text-gray-100 hover:text-slate-900 dark:hover:text-white hover:bg-white/5 transition-colors"
              aria-label={language === "tr" ? "Switch to English" : "Türkçeye geç"}
            >
              {language === "tr" ? "EN" : "TR"}
            </button>
          )}
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="p-2 rounded-md text-slate-700 dark:text-gray-100 hover:text-slate-900 dark:hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Tema değiştir"
            >
              {resolvedTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-md text-slate-700 dark:text-gray-100 hover:text-slate-900 dark:hover:text-white hover:bg-white/5 transition-colors"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-white/5 bg-white/95 dark:bg-[#0c0c0c]/95 backdrop-blur-md">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className="block w-full text-left px-6 py-3 text-sm text-gray-200 dark:text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              {language === "tr" ? l.tr : l.en}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
