"use client";

import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import Logo from "@/components/Logo";

export default function Hero() {
  return (
    <section
      id="anasayfa"
      className="min-h-screen flex items-center justify-center px-6 relative"
    >
      <div className="text-center max-w-2xl mx-auto">
        {/* Logo */}
        <div className="fade-up flex justify-center mb-8">
          <Logo size={56} />
        </div>

        {/* Name */}
        <h1 className="fade-up delay-1 text-5xl sm:text-6xl font-bold text-white tracking-tight mb-3">
          Furkan Çatak
        </h1>

        {/* Title */}
        <p className="fade-up delay-2 text-base text-blue-400 font-medium mb-5 tracking-wide">
          Software Engineer
        </p>

        {/* Bio */}
        <p className="fade-up delay-3 text-gray-400 text-sm leading-relaxed max-w-lg mx-auto mb-3">
          Trakya Üniversitesi Bilgisayar Mühendisliği öğrencisi.
          Yapay zeka, veri analizi ve yazılım geliştirme alanlarında projeler üretiyorum.
        </p>

        {/* Location */}
        <p className="fade-up delay-3 text-xs text-gray-600 mb-9">
          Edirne, Türkiye · Staj ve iş birliği fırsatlarına açığım
        </p>

        {/* Social Links */}
        <div className="fade-up delay-4 flex items-center justify-center gap-6">
          <a
            href="mailto:fcatak91@gmail.com"
            className="text-gray-500 hover:text-blue-400 transition-colors"
            aria-label="E-posta"
          >
            <Mail size={20} />
          </a>
          <a
            href="https://github.com/furkanCAT88"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-400 transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href="https://linkedin.com/in/furkan-çatak-3b734b31b/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-400 transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={20} />
          </a>
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
