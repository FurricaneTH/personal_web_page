"use client";

export default function About() {
  return (
    <section id="hakkimda" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-8">
          Hakkımda
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-gray-300 leading-relaxed text-base mb-4">
              Trakya Üniversitesi Bilgisayar Mühendisliği 3. sınıf öğrencisiyim.
              Yapay zeka, veritabanı sistemleri ve yazılım geliştirme alanlarında
              tutkuyla çalışıyorum.
            </p>
            <p className="text-gray-500 leading-relaxed text-base">
              Pratik projeler üretmek ve makine öğrenimi uygulamalarında deneyim
              kazanmak istiyorum. Dinamik ortamlarda takım çalışması deneyimi
              edinmeyi hedefliyorum.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <span className="text-sm text-gray-600">Üniversite</span>
              <span className="text-sm text-gray-300">Trakya Üniversitesi</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <span className="text-sm text-gray-600">Bölüm</span>
              <span className="text-sm text-gray-300">Bilgisayar Mühendisliği</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <span className="text-sm text-gray-600">Başlangıç</span>
              <span className="text-sm text-gray-300">2023</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <span className="text-sm text-gray-600">Konum</span>
              <span className="text-sm text-gray-300">Edirne, Türkiye</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-gray-600">İlgi Alanları</span>
              <span className="text-sm text-gray-300">AI · Veri · Web</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
