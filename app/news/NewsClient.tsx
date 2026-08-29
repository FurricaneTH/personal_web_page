"use client";

import { useEffect, useState } from "react";
import { ExternalLink, RefreshCw } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import type { NewsItem } from "@/lib/news/types";

export default function NewsClient({ initialNews }: { initialNews: NewsItem[] }) {
  const { language } = useLanguage();
  const [news, setNews] = useState(initialNews);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialNews.length) return;
    fetch("/api/news").then((res) => res.ok ? res.json() : Promise.reject()).then(setNews).catch(() => setError(language === "tr" ? "Haberler yüklenemedi." : "Could not load news."));
  }, [initialNews.length, language]);

  const refresh = async () => {
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/news", { method: "POST" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setNews(data);
    } catch (err) { setError(err instanceof Error ? err.message : (language === "tr" ? "Yeni haberler alınamadı." : "Could not fetch new stories.")); }
    finally { setLoading(false); }
  };

  const copy = language === "tr" ? {
    eyebrow: "GÜNCEL AKIŞ", title: "Haberler", intro: "Hacker News gündeminden AI ve teknoloji odaklı seçkiler.", refresh: "Yeni haberleri getir", loading: "Haberler taranıyor…", empty: "Henüz haber yok. Yeni haberleri getirerek ilk seçkiyi oluşturun.", hn: "Hacker News", original: "Orijinal makale",
  } : {
    eyebrow: "THE LATEST", title: "News", intro: "AI and technology stories selected from the Hacker News stream.", refresh: "Fetch new stories", loading: "Scanning the latest stories…", empty: "No stories yet. Fetch the latest stories to create your first digest.", hn: "Hacker News", original: "Original article",
  };

  return <section className="min-h-screen pt-28 pb-20 px-6">
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
        <div><p className="text-xs tracking-[0.25em] text-slate-500 dark:text-slate-400 mb-4">{copy.eyebrow}</p><h1 className="text-5xl sm:text-6xl font-semibold tracking-tight text-slate-900 dark:text-gray-100">{copy.title}</h1><p className="mt-4 text-slate-600 dark:text-gray-400 max-w-xl">{copy.intro}</p></div>
        <button onClick={refresh} disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 dark:border-slate-600 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors disabled:opacity-50"><RefreshCw size={16} className={loading ? "animate-spin" : ""} />{loading ? copy.loading : copy.refresh}</button>
      </div>
      {error && <p className="mb-6 rounded-lg border border-red-300/50 bg-red-50/70 dark:bg-red-950/20 px-4 py-3 text-sm text-red-700 dark:text-red-300">{error}</p>}
      {!news.length && !loading ? <div className="rounded-xl border border-slate-200 dark:border-white/10 p-8 text-slate-600 dark:text-gray-400">{copy.empty}</div> : <div className="space-y-4">{news.map((item) => <article key={item.id} className="rounded-xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/[0.03] p-5 sm:p-6 transition-colors hover:border-slate-400 dark:hover:border-slate-500"><div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3"><time dateTime={item.published_at ?? item.created_at}>{new Intl.DateTimeFormat(language === "tr" ? "tr-TR" : "en-US", { dateStyle: "medium" }).format(new Date(item.published_at ?? item.created_at))}</time><span>·</span><a href={item.hn_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-slate-900 dark:hover:text-white">{copy.hn}<ExternalLink size={12} /></a></div><h2 className="text-xl font-medium text-slate-900 dark:text-gray-100 leading-snug">{item.title}</h2><p className="mt-3 text-sm leading-6 text-slate-600 dark:text-gray-400">{item.summary}</p><a href={item.article_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:underline">{copy.original}<ExternalLink size={14} /></a></article>)}</div>}
    </div>
  </section>;
}

