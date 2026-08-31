"use client";
import { useLanguage } from "@/components/LanguageProvider";

export default function Footer() {
  const { language } = useLanguage();
  return (
    <footer className="py-8 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <p className="text-xs text-gray-700">
          © {new Date().getFullYear()} Furkan Çatak
        </p>
      </div>
    </footer>
  );
}
