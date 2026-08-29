"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import type { NewsItem } from "@/lib/news/types";

export function NewsCards({ items }: { items: NewsItem[] }) {
  const { language } = useLanguage();
  const copy = language === "tr" ? { hn: "Hacker News", original: "Orijinal makale", empty: "Henüz son 48 saat içinde yeni haber bulunmuyor." } : { hn: "Hacker News", original: "Original article", empty: "No new stories from the last 48 hours yet." };
  if (!items.length) return <div className="rounded-xl border border-slate-200 dark:border-white/10 p-8 text-slate-600 dark:text-gray-400">{copy.empty}</div>;
  return <div className="space-y-4">{items.map((item) => <article key={item.id} className="rounded-xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/[0.03] p-5 sm:p-6 transition-colors hover:border-slate-400 dark:hover:border-slate-500"><div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3"><time dateTime={item.published_at ?? item.created_at}>{new Intl.DateTimeFormat(language === "tr" ? "tr-TR" : "en-US", { dateStyle: "medium" }).format(new Date(item.published_at ?? item.created_at))}</time><span>·</span><a href={item.hn_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-slate-900 dark:hover:text-white">{copy.hn}<ExternalLink size={12} /></a></div><h2 className="text-xl font-medium text-slate-900 dark:text-gray-100 leading-snug">{item.title}</h2><p className="mt-3 text-sm leading-6 text-slate-600 dark:text-gray-400">{item.summary}</p><a href={item.article_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:underline">{copy.original}<ExternalLink size={14} /></a></article>)}</div>;
}

export default function NewsClient({ initialNews }: { initialNews: NewsItem[] }) {
  const { language } = useLanguage();
  const [news, setNews] = useState(initialNews);
  const [error, setError] = useState("");
  useEffect(() => { if (initialNews.length) return; fetch("/api/news").then((res) => res.ok ? res.json() : Promise.reject()).then(setNews).catch(() => setError(language === "tr" ? "Haberler yüklenemedi." : "Could not load news.")); }, [initialNews.length, language]);
  const copy = language === "tr" ? { eyebrow: "GÜNCEL AKIŞ", title: "Haberler", intro: "Hacker News gündeminden AI ve teknoloji odaklı seçkiler." } : { eyebrow: "THE LATEST", title: "News", intro: "AI and technology stories selected from the Hacker News stream." };
  return <section className="min-h-screen pt-28 pb-20 px-6"><div className="max-w-4xl mx-auto"><div className="mb-12"><p className="text-xs tracking-[0.25em] text-slate-500 dark:text-slate-400 mb-4">{copy.eyebrow}</p><h1 className="text-5xl sm:text-6xl font-semibold tracking-tight text-slate-900 dark:text-gray-100">{copy.title}</h1><p className="mt-4 text-slate-600 dark:text-gray-400 max-w-xl">{copy.intro}</p></div>{error && <p className="mb-6 rounded-lg border border-red-300/50 bg-red-50/70 dark:bg-red-950/20 px-4 py-3 text-sm text-red-700 dark:text-red-300">{error}</p>}<NewsCards items={news} /></div></section>;
}

