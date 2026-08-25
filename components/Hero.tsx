"use client";

import { Mail } from "lucide-react";
import { Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import Logo from "@/components/Logo";
import { useLanguage } from "@/components/LanguageProvider";

export default function Hero() {
  const { language } = useLanguage();
  const isTr = language === "tr";

  return (
    <section
      id="anasayfa"
      className="min-h-screen flex items-center justify-center px-6 relative"
    >
      <div className="text-center max-w-2xl mx-auto">
        {/* Logo */}
        <div className="fade-up flex justify-center mb-8">
          <Logo size={124} />
        </div>

        {/* Name */}
        <h1 className="fade-up delay-1 text-5xl sm:text-6xl font-bold text-white tracking-tight mb-3">
          Furkan Çatak
        </h1>

        {/* Title */}
        <p className="fade-up delay-2 text-lg text-slate-300 font-medium mb-2 tracking-wide">
          {isTr ? "Bilgisayar Mühendisliği Öğrencisi" : "Computer Engineering Student"}
        </p>

        {/* Bio */}
        <p className="fade-up delay-3 text-gray-400 text-sm leading-relaxed max-w-lg mx-auto mb-5">
          {isTr
            ? "Yapay zeka, veri analizi ve LLM/RAG sistemleri üzerine çalışan; karmaşık problemleri sade, kullanılabilir yazılımlara dönüştürmeyi seven bir problem çözücüyüm."
            : "I am a problem solver working across AI, data analysis, and LLM/RAG systems, turning complex challenges into clear, useful software."
          }
        </p>

        {/* Location */}
        <p className="fade-up delay-3 text-xs text-gray-600 mb-9">
          {isTr ? "Edirne, Türkiye · Staj ve iş birliği fırsatlarına açığım" : "Edirne, Türkiye · Open to internships and collaborations"}
        </p>

        {/* Social Links */}
        <div className="fade-up delay-4 flex flex-col items-center gap-5">
          <div className="flex items-center justify-center gap-7">
          <a
            href="mailto:fcatak91@gmail.com"
            className="text-gray-500 hover:text-slate-200 transition-colors"
            aria-label="E-posta"
          >
            <Mail size={20} />
          </a>
          <a
            href="https://github.com/FurricaneTH"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-slate-200 transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href="https://linkedin.com/in/furkan-çatak-3b734b31b/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-slate-200 transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={20} />
          </a>
          </div>
          <div className="flex items-center justify-center gap-3">
            <a
              href="/Muhammed-Furkan-Catak-CV-TR.pdf"
              download
              className="inline-flex items-center gap-2 rounded-md border border-slate-400/40 bg-slate-400/10 px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-400/20"
            >
              <Download size={15} /> CV (TR)
            </a>
            <a
              href="/Muhammed-Furkan-Catak-CV.pdf"
              download
              className="inline-flex items-center gap-2 rounded-md border border-slate-400/40 bg-slate-400/10 px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-400/20"
            >
              <Download size={15} /> CV (EN)
            </a>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="fade-up delay-5 mt-16">
          <button
            onClick={() => {
              document.getElementById("hakkimda")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-gray-700 hover:text-gray-500 transition-colors text-xs tracking-widest uppercase"
          >
            ↓ scroll
          </button>
        </div>
      </div>
    </section>
  );
}
