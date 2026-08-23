"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import Logo from "@/components/Logo";

const navLinks = [
  { href: "#anasayfa", label: "Anasayfa" },
  { href: "#hakkimda", label: "Hakkımda" },
  { href: "#projeler", label: "Projeler" },
  { href: "#deneyim", label: "Deneyim" },
  { href: "#iletisim", label: "İletişim" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? "bg-[#0c0c0c]/95 dark:bg-[#0c0c0c]/95 border-b border-white/5 backdrop-blur-md"
        : "bg-transparent"
    }`}>
      <div className="max-w-4xl mx-auto px-6 flex items-center justify-between h-14">
        <button
          onClick={() => go("#anasayfa")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          aria-label="Anasayfa"
        >
          <Logo size={28} />
        </button>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className="px-3 py-1.5 text-sm text-gray-400 hover:text-white transition-colors rounded-md hover:bg-white/5"
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Tema değiştir"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-white/5 bg-[#0c0c0c]/95 backdrop-blur-md">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className="block w-full text-left px-6 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
