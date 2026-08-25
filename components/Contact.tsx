"use client";

import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { useLanguage } from "@/components/LanguageProvider";

const links = [
  {
    label: "E-posta",
    labelEn: "Email",
    value: "fcatak91@gmail.com",
    href: "mailto:fcatak91@gmail.com",
    icon: <Mail size={16} />,
  },
  {
    label: "GitHub",
    labelEn: "GitHub",
    value: "FurricaneTH",
    href: "https://github.com/FurricaneTH",
    icon: <GithubIcon size={16} />,
  },
  {
    label: "LinkedIn",
    labelEn: "LinkedIn",
    value: "Furkan Çatak",
    href: "https://linkedin.com/in/furkan-çatak-3b734b31b/",
    icon: <LinkedinIcon size={16} />,
  },
];

export default function Contact() {
  const { language } = useLanguage();
  const isTr = language === "tr";
  return (
    <section id="iletisim" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-widest mb-2">
          {isTr ? "İletişim" : "Contact"}
        </h2>
        <p className="text-gray-500 text-sm mb-8">
          {isTr ? "Bir proje fikrin mi var ya da iş birliği yapmak mı istiyorsun? Ulaşabilirsin." : "Have a project idea or want to collaborate? Feel free to reach out."}
        </p>

        <div className="space-y-1">
          {links.map((l, i) => (
            <a
              key={i}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-4 py-4 border-b border-white/5 last:border-0 group hover:bg-white/[0.02] -mx-4 px-4 rounded-lg transition-colors"
            >
              <span className="text-gray-600 group-hover:text-gray-400 transition-colors">
                {l.icon}
              </span>
              <div className="flex-1 flex items-center justify-between">
                <span className="text-xs text-gray-600">{isTr ? l.label : l.labelEn}</span>
                <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                  {l.value}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Availability */}
        <div className="mt-10 flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-xs text-gray-600">
            {isTr ? "Staj ve part-time fırsatlarına açığım" : "Open to internship and part-time opportunities"}
          </span>
        </div>
      </div>
    </section>
  );
}
