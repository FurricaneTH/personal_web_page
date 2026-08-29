"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { NewsCards } from "@/app/news/NewsClient";
import type { NewsItem } from "@/lib/news/types";

export default function ManageNewsClient({ initialNews }: { initialNews: NewsItem[] }) {
  const { language } = useLanguage();
  const [news, setNews] = useState(initialNews); const [token, setToken] = useState(""); const [loading, setLoading] = useState(false); const [message, setMessage] = useState("");
  const tr = language === "tr";
  const refresh = async () => { setLoading(true); setMessage(""); try { const response = await fetch("/api/news", { method: "POST", headers: { "x-news-refresh-token": token } }); const data = await response.json(); if (!response.ok) throw new Error(data.error); setNews(data); setMessage(tr ? "Haberler güncellendi." : "News updated."); } catch (error) { setMessage(error instanceof Error ? error.message : (tr ? "Güncelleme başarısız." : "Update failed.")); } finally { setLoading(false); } };
  return <section className="min-h-screen pt-28 pb-20 px-6"><div className="max-w-4xl mx-auto"><div className="mb-10"><p className="text-xs tracking-[0.25em] text-slate-500 dark:text-slate-400 mb-4">{tr ? "YÖNETİM" : "MANAGEMENT"}</p><h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900 dark:text-gray-100">{tr ? "Haber akışını güncelle" : "Update news feed"}</h1><p className="mt-4 text-slate-600 dark:text-gray-400">{tr ? "Bu sayfa haber ajanını çalıştırman için kullanılır." : "Use this page to run your news agent."}</p></div><div className="mb-10 flex flex-col sm:flex-row gap-3"><input type="password" value={token} onChange={(event) => setToken(event.target.value)} placeholder={tr ? "Yönetim token’ı" : "Admin token"} className="flex-1 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-4 py-2.5 text-sm text-slate-900 dark:text-gray-100 outline-none focus:border-slate-500" /><button onClick={refresh} disabled={loading || !token} className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 dark:border-slate-600 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors disabled:opacity-50"><RefreshCw size={16} className={loading ? "animate-spin" : ""} />{loading ? (tr ? "Taranıyor…" : "Scanning…") : (tr ? "Yeni haberleri getir" : "Fetch new stories")}</button></div>{message && <p className="mb-6 text-sm text-slate-600 dark:text-gray-400">{message}</p>}<NewsCards items={news} /></div></section>;
}

