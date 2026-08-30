import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundTrees from "@/components/BackgroundTrees";
import NewsDetailText from "./NewsDetailText";
import { getNewsById } from "@/lib/news/supabase";
import type { NewsItem } from "@/lib/news/types";

export const dynamic = "force-dynamic";

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let item: NewsItem | null = null;
  try { item = await getNewsById(id); } catch { item = null; }
  if (!item) notFound();
  return <main><BackgroundTrees /><Navbar /><section className="min-h-screen pt-28 pb-20 px-6"><div className="max-w-3xl mx-auto"><Link href="/news" className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-10"><ArrowLeft size={16} /> <NewsDetailText tr="Haberlere dön" en="Back to news" /></Link><div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-5"><time dateTime={item.published_at ?? item.created_at}>{new Intl.DateTimeFormat("tr-TR", { dateStyle: "long" }).format(new Date(item.published_at ?? item.created_at))}</time><span>·</span><span>Hacker News</span></div><h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight text-slate-900 dark:text-gray-100">{item.title}</h1><div className="mt-10 border-t border-slate-200 dark:border-white/10 pt-8"><NewsDetailText tr={item.summary} en={item.summary_en || item.summary} /></div><div className="mt-10 flex flex-wrap gap-5"><a href={item.hn_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:underline">Hacker News <ExternalLink size={14} /></a><a href={item.article_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:underline"><NewsDetailText tr="Orijinal makale" en="Original article" /> <ExternalLink size={14} /></a></div></div></section><Footer /></main>;
}
