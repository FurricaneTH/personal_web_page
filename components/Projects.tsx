"use client";

import { GithubIcon } from "@/components/Icons";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Wings of Westeros",
    description:
      "Game of Thrones evreninde geçen, Vanilla JavaScript ve HTML5 Canvas ile geliştirilmiş ejderha arcade oyunu. Fizik motoru, çarpışma algılama, ateş topu sistemi ve boss savaşları içeriyor.",
    tags: ["JavaScript", "HTML5 Canvas", "CSS3", "Web Audio API"],
    github: "https://github.com/furkanCAT88/wings-of-westeros",
    demo: null,
    featured: true,
  },
  {
    title: "IMDB Rating Prediction",
    description:
      "Linear Regression ve Ridge Regression kullanarak IMDB film puanlarını tahmin eden makine öğrenimi modeli. scikit-learn ile veri ön işleme ve model karşılaştırması.",
    tags: ["Python", "scikit-learn", "Pandas"],
    github: "https://github.com/furkanCAT88/imdb-rating-prediction",
    demo: null,
    featured: true,
  },
  {
    title: "Netflix Data Analysis",
    description:
      "Python ve Pandas ile Netflix veri setleri üzerinde veri temizleme, manipülasyon ve görselleştirme analizi.",
    tags: ["Python", "Pandas"],
    github: "https://github.com/furkanCAT88/netflix_analysis",
    demo: null,
    featured: false,
  },
];

export default function Projects() {
  return (
    <section id="projeler" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xs font-semibold text-blue-400 uppercase tracking-widest">
            Projeler
          </h2>
          <a
            href="https://github.com/furkanCAT88"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-600 hover:text-gray-400 transition-colors flex items-center gap-1"
          >
            GitHub&apos;da Gör <GithubIcon size={12} />
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
                  {p.featured && (
                    <span className="text-xs text-blue-400/70 bg-blue-400/10 px-2 py-0.5 rounded-full">
                      öne çıkan
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">
                  {p.description}
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
