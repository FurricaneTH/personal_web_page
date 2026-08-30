"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import type { NewsItem } from "@/lib/news/types";

export function NewsCards({ items }: { items: NewsItem[] }) {
  const { language } = useLanguage();
  const [openId, setOpenId] = useState<string | null>(null);
  const copy = language === "tr" ? { hn: "Hacker News", original: "Orijinal makale", empty: "Henüz son 48 saat içinde yeni haber bulunmuyor." } : { hn: "Hacker News", original: "Original article", empty: "No new stories from the last 48 hours yet." };
  if (!items.length) return <div className="rounded-xl border border-slate-200 dark:border-white/10 p-8 text-slate-600 dark:text-gray-400">{copy.empty}</div>;
  return <div className="space-y-3">{items.map((item) => { const open = openId === item.id; const summary = language === "tr" ? item.summary : (item.summary_en || item.summary); return <article key={item.id} className={`rounded-xl border bg-white/60 dark:bg-white/[0.03] transition-colors ${open ? "border-slate-400 dark:border-slate-500" : "border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-slate-500"}`}><button type="button" onClick={() => setOpenId(open ? null : item.id)} aria-expanded={open} className="w-full text-left p-5 sm:p-6"><div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3"><time dateTime={item.published_at ?? item.created_at}>{new Intl.DateTimeFormat(language === "tr" ? "tr-TR" : "en-US", { dateStyle: "medium" }).format(new Date(item.published_at ?? item.created_at))}</time><span>·</span><span>{copy.hn}</span><span className="ml-auto text-lg leading-none text-slate-400 transition-transform duration-300">{open ? "−" : "+"}</span></div><h2 className="text-xl font-medium text-slate-900 dark:text-gray-100 leading-snug">{item.title}</h2>{open && <div className="mt-4 border-t border-slate-200 dark:border-white/10 pt-4"><p className="text-sm leading-7 text-slate-600 dark:text-gray-400">{summary}</p><div className="mt-4 flex flex-wrap gap-4"><a href={item.hn_url} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()} className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:underline">{copy.hn}<ExternalLink size={14} /></a><a href={item.article_url} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()} className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:underline">{copy.original}<ExternalLink size={14} /></a></div></div>}</button></article>; })}</div>;
}

export default function NewsClient({ initialNews }: { initialNews: NewsItem[] }) {
  const { language } = useLanguage();
  const [news, setNews] = useState(initialNews);
  const [error, setError] = useState("");
  useEffect(() => { if (initialNews.length) return; fetch("/api/news").then((res) => res.ok ? res.json() : Promise.reject()).then(setNews).catch(() => setError(language === "tr" ? "Haberler yüklenemedi." : "Could not load news.")); }, [initialNews.length, language]);
  const copy = language === "tr" ? { eyebrow: "GÜNCEL AKIŞ", title: "Haberler", intro: "Hacker News gündeminden AI ve teknoloji odaklı seçkiler." } : { eyebrow: "THE LATEST", title: "News", intro: "AI and technology stories selected from the Hacker News stream." };
  return <section className="min-h-screen pt-28 pb-20 px-6"><div className="max-w-4xl mx-auto"><div className="mb-12"><p className="text-xs tracking-[0.25em] text-slate-500 dark:text-slate-400 mb-4">{copy.eyebrow}</p><h1 className="text-5xl sm:text-6xl font-semibold tracking-tight text-slate-900 dark:text-gray-100">{copy.title}</h1><p className="mt-4 text-slate-600 dark:text-gray-400 max-w-xl">{copy.intro}</p></div>{error && <p className="mb-6 rounded-lg border border-red-300/50 bg-red-50/70 dark:bg-red-950/20 px-4 py-3 text-sm text-red-700 dark:text-red-300">{error}</p>}<NewsCards items={news} /></div></section>;
}
