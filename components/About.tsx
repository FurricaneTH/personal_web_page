"use client";
import { useLanguage } from "@/components/LanguageProvider";

export default function About() {
  const { language } = useLanguage();
  const isTr = language === "tr";
  return (
    <section id="hakkimda" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-widest mb-8">
          {isTr ? "Hakkımda" : "About"}
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-gray-300 leading-relaxed text-base mb-4">
              {isTr
                ? "Bilgisayar mühendisliği öğrencisi olarak yapay zeka, veri analizi ve yazılım geliştirme alanlarında üretmeyi seviyorum. Özellikle makine öğrenmesi ve LLM/RAG tabanlı uygulamalar üzerine kendimi geliştiriyorum."
                : "As a computer engineering student, I enjoy building in AI, data analysis, and software development. I am especially focused on growing through machine learning and LLM/RAG applications."
              }
            </p>
            <p className="text-gray-500 leading-relaxed text-base">
              {isTr
                ? "Problemleri parçalara ayırıp anlaşılır, sürdürülebilir çözümler üretmeye odaklanıyorum. Yeni araçları hızlı öğrenen, geri bildirimle gelişen ve ekip içinde sorumluluk almaktan çekinmeyen bir problem çözücüyüm."
                : "I focus on breaking problems down into clear, maintainable solutions. I learn new tools quickly, improve through feedback, and enjoy taking ownership in collaborative teams."
              }
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <span className="text-sm text-gray-600">{isTr ? "Üniversite" : "University"}</span>
              <span className="text-sm text-gray-300">Trakya University</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <span className="text-sm text-gray-600">{isTr ? "Bölüm" : "Department"}</span>
              <span className="text-sm text-gray-300">{isTr ? "Bilgisayar Mühendisliği" : "Computer Engineering"}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <span className="text-sm text-gray-600">{isTr ? "Başlangıç" : "Started"}</span>
              <span className="text-sm text-gray-300">2023</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <span className="text-sm text-gray-600">{isTr ? "Konum" : "Location"}</span>
              <span className="text-sm text-gray-300">Edirne, Türkiye</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-gray-600">{isTr ? "İlgi Alanları" : "Focus"}</span>
              <span className="text-sm text-gray-300">AI · Data · LLM/RAG</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
