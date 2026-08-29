import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundTrees from "@/components/BackgroundTrees";
import NewsClient from "./NewsClient";
import { getLatestNews } from "@/lib/news/supabase";
import type { NewsItem } from "@/lib/news/types";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  let initialNews: NewsItem[] = [];
  try {
    const latest = await getLatestNews();
    const cutoff = Date.now() - 48 * 60 * 60 * 1000;
    initialNews = latest.filter((item) => new Date(item.published_at ?? item.created_at).getTime() >= cutoff);
  } catch { /* The client displays a useful empty state. */ }
  return <main><BackgroundTrees /><Navbar /><NewsClient initialNews={initialNews} /><Footer /></main>;
}
