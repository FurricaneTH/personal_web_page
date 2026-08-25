"use client";

import { GithubIcon } from "@/components/Icons";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const projects = [
  {
    title: "Wings of Westeros",
    description:
      "Game of Thrones evreninde geçen, Vanilla JavaScript ve HTML5 Canvas ile geliştirilmiş ejderha arcade oyunu. Fizik motoru, çarpışma algılama, ateş topu sistemi ve boss savaşları içeriyor.",
    tags: ["JavaScript", "HTML5 Canvas", "CSS3", "Web Audio API"],
    github: "https://github.com/FurricaneTH/wings-of-westeros",
    demo: null,
    featured: true,
  },
  {
    title: "IMDB Rating Prediction",
    description:
      "Linear Regression ve Ridge Regression kullanarak IMDB film puanlarını tahmin eden makine öğrenimi modeli. scikit-learn ile veri ön işleme ve model karşılaştırması.",
    tags: ["Python", "scikit-learn", "Pandas"],
    github: "https://github.com/FurricaneTH/imdb-rating-prediction",
    demo: null,
    featured: true,
  },
  {
    title: "Netflix Data Analysis",
    description:
      "Python ve Pandas ile Netflix veri setleri üzerinde veri temizleme, manipülasyon ve görselleştirme analizi.",
    tags: ["Python", "Pandas"],
    github: "https://github.com/FurricaneTH/netflix_analysis",
    demo: null,
    featured: false,
  },
  {
    title: "Local Shot",
    description:
      "A lightweight local screenshot utility focused on quickly capturing, organizing, and reusing screen captures during development workflows.",
    descriptionTr:
      "Geliştirme akışlarında ekran görüntülerini hızlıca yakalamaya, düzenlemeye ve yeniden kullanmaya odaklanan hafif bir yerel ekran görüntüsü aracı.",
    tags: ["JavaScript", "Browser APIs", "Tooling"],
    github: "https://github.com/FurricaneTH/local-shot",
    demo: null,
    featured: false,
  },
  {
    title: "Simple Clone Add Blocker",
    description:
      "A focused ad-blocking browser extension clone that demonstrates request filtering, extension structure, and a simple user-facing control surface.",
    descriptionTr:
      "İstek filtreleme, tarayıcı eklentisi yapısı ve sade bir kullanıcı kontrol arayüzünü gösteren, reklam engelleme eklentisinin işlevsel bir klonu.",
    tags: ["JavaScript", "Browser Extension", "Filtering"],
    github: "https://github.com/FurricaneTH/simple-clone-add-blocker",
    demo: null,
    featured: false,
  },
];

export default function Projects() {
  const { language } = useLanguage();
  const isTr = language === "tr";
  return (
    <section id="projeler" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-widest">
            {isTr ? "Projeler" : "Projects"}
          </h2>
          <a
            href="https://github.com/FurricaneTH"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-600 hover:text-gray-400 transition-colors flex items-center gap-1"
          >
            {isTr ? "GitHub'da Gör" : "View on GitHub"} <GithubIcon size={12} />
          </a>
        </div>

        <div className="space-y-px">
          {projects.map((p, i) => (
            <div
              key={i}
              className="group flex flex-col sm:flex-row sm:items-start gap-4 py-5 border-b border-white/5 last:border-0 hover:bg-white/[0.02] -mx-4 px-4 rounded-lg transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="text-sm font-semibold text-white">{p.title}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">
                  {isTr && "descriptionTr" in p ? p.descriptionTr : p.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs text-gray-600 bg-white/5 px-2 py-0.5 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md text-gray-600 hover:text-white hover:bg-white/5 transition-colors"
                  aria-label="Kaynak kodu"
                >
                  <GithubIcon size={16} />
                </a>
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md text-gray-600 hover:text-white hover:bg-white/5 transition-colors"
                    aria-label="Demo"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
