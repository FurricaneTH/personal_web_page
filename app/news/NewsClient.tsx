"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import type { NewsItem } from "@/lib/news/types";

export function NewsCards({ items }: { items: NewsItem[] }) {
  const { language } = useLanguage();
  const copy = language === "tr" ? { hn: "Hacker News", empty: "Henüz haber bulunmuyor.", read: "Özeti oku" } : { hn: "Hacker News", empty: "No stories yet.", read: "Read summary" };
  if (!items.length) return <div className="rounded-xl border border-slate-200 dark:border-white/10 p-8 text-slate-600 dark:text-gray-400">{copy.empty}</div>;
  return <div className="space-y-3">{items.map((item) => <article key={item.id} className="rounded-xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/[0.03] p-5 sm:p-6 transition-colors hover:border-slate-400 dark:hover:border-slate-500"><div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3"><time dateTime={item.published_at ?? item.created_at}>{new Intl.DateTimeFormat(language === "tr" ? "tr-TR" : "en-US", { dateStyle: "medium" }).format(new Date(item.published_at ?? item.created_at))}</time><span>·</span><span>{copy.hn}</span></div><Link href={`/news/${item.id}`} className="group flex items-center justify-between gap-4"><h2 className="text-xl font-medium text-slate-900 dark:text-gray-100 leading-snug group-hover:underline">{item.title}</h2><ArrowUpRight size={19} className="shrink-0 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link><p className="mt-3 text-xs font-medium text-slate-500 dark:text-slate-400">{copy.read}</p></article>)}</div>;
}

export default function NewsClient({ initialNews }: { initialNews: NewsItem[] }) {
  const { language } = useLanguage(); const [news, setNews] = useState(initialNews); const [error, setError] = useState("");
  useEffect(() => { if (initialNews.length) return; fetch("/api/news").then((res) => res.ok ? res.json() : Promise.reject()).then(setNews).catch(() => setError(language === "tr" ? "Haberler yüklenemedi." : "Could not load news.")); }, [initialNews.length, language]);
  const copy = language === "tr" ? { eyebrow: "GÜNCEL AKIŞ", title: "Haberler", intro: "Hacker News gündeminden AI ve teknoloji odaklı seçkiler." } : { eyebrow: "THE LATEST", title: "News", intro: "AI and technology stories selected from the Hacker News stream." };
  return <section className="min-h-screen pt-28 pb-20 px-6"><div className="max-w-4xl mx-auto"><div className="mb-12"><p className="text-xs tracking-[0.25em] text-slate-500 dark:text-slate-400 mb-4">{copy.eyebrow}</p><h1 className="text-5xl sm:text-6xl font-semibold tracking-tight text-slate-900 dark:text-gray-100">{copy.title}</h1><p className="mt-4 text-slate-600 dark:text-gray-400 max-w-xl">{copy.intro}</p></div>{error && <p className="mb-6 text-sm text-red-700 dark:text-red-300">{error}</p>}<NewsCards items={news} /></div></section>;
}
