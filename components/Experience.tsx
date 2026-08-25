"use client";
import { useLanguage } from "@/components/LanguageProvider";

const items = [
  {
    type: "work",
    title: "Teknik Destek Mühendisi",
    titleEn: "Technical Support Engineer",
    org: "Trakya Üniversitesi",
    period: "Ara 2025 – Haz 2026",
    periodEn: "Dec 2025 – Jun 2026",
    location: "Edirne · Yüz yüze · Yarı zamanlı",
    locationEn: "Edirne · On-site · Part-time",
    bullets: [
      "Veri girişi, temizleme ve analizi görevleri.",
      "Yazılım geliştirme süreçlerine destek.",
    ],
    bulletsEn: ["Data entry, cleaning, and analysis tasks.", "Supported software development workflows."],
  },
  {
    type: "edu",
    title: "Bilgisayar Mühendisliği, Lisans",
    titleEn: "BSc in Computer Engineering",
    org: "Trakya Üniversitesi",
    period: "2023 – Devam Ediyor",
    periodEn: "2023 – Present",
    location: "Edirne",
    bullets: [
      "Veri yapıları, algoritmalar, veritabanı sistemleri.",
      "Yapay zeka ve makine öğrenimi uygulamaları.",
    ],
    bulletsEn: ["Data structures, algorithms, and database systems.", "AI and machine learning applications."],
  },
];

export default function Experience() {
  const { language } = useLanguage();
  const isTr = language === "tr";
  return (
    <section id="deneyim" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-widest mb-8">
          {isTr ? "Deneyim & Eğitim" : "Experience & Education"}
        </h2>

        <div className="space-y-8">
          {items.map((item, i) => (
            <div key={i} className="grid sm:grid-cols-[160px_1fr] gap-4 sm:gap-8">
              <div>
                <p className="text-xs text-gray-600 leading-relaxed">{isTr ? item.period : item.periodEn}</p>
                <p className="text-xs text-gray-700 mt-1">{isTr ? item.location : item.locationEn}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-white">{isTr ? item.title : item.titleEn}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    item.type === "work"
                      ? "text-slate-300/80 bg-slate-400/10"
                      : "text-slate-300/80 bg-slate-400/10"
                  }`}>
                    {item.type === "work" ? (isTr ? "iş" : "work") : (isTr ? "eğitim" : "education")}
                  </span>
                </div>
                <p className="text-sm text-slate-300/80 mb-3">{item.org}</p>
                <ul className="space-y-1.5">
                  {(isTr ? item.bullets : item.bulletsEn).map((b, j) => (
                    <li key={j} className="text-sm text-gray-500 flex items-start gap-2">
                      <span className="text-gray-700 mt-1.5 text-xs">—</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
