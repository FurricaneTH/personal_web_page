"use client";

const items = [
  {
    type: "work",
    title: "Teknik Destek Mühendisi",
    org: "Trakya Üniversitesi",
    period: "Ara 2025 – Haz 2026",
    location: "Edirne · Yüz yüze · Yarı zamanlı",
    bullets: [
      "Veri girişi, temizleme ve analizi görevleri.",
      "Yazılım geliştirme süreçlerine destek.",
    ],
  },
  {
    type: "edu",
    title: "Bilgisayar Mühendisliği, Lisans",
    org: "Trakya Üniversitesi",
    period: "2023 – Devam Ediyor",
    location: "Edirne",
    bullets: [
      "Veri yapıları, algoritmalar, veritabanı sistemleri.",
      "Yapay zeka ve makine öğrenimi uygulamaları.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="deneyim" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-8">
          Deneyim & Eğitim
        </h2>

        <div className="space-y-8">
          {items.map((item, i) => (
            <div key={i} className="grid sm:grid-cols-[160px_1fr] gap-4 sm:gap-8">
              <div>
                <p className="text-xs text-gray-600 leading-relaxed">{item.period}</p>
                <p className="text-xs text-gray-700 mt-1">{item.location}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    item.type === "work"
                      ? "text-emerald-400/70 bg-emerald-400/10"
                      : "text-blue-400/70 bg-blue-400/10"
                  }`}>
                    {item.type === "work" ? "iş" : "eğitim"}
                  </span>
                </div>
                <p className="text-sm text-blue-400/80 mb-3">{item.org}</p>
                <ul className="space-y-1.5">
                  {item.bullets.map((b, j) => (
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
