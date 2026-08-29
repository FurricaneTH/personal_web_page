import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundTrees from "@/components/BackgroundTrees";
import NewsClient from "./NewsClient";
import { getLatestNews } from "@/lib/news/supabase";
import type { NewsItem } from "@/lib/news/types";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  let initialNews: NewsItem[] = [];
  try { initialNews = await getLatestNews(); } catch { /* The client displays a useful empty state. */ }
  return <main><BackgroundTrees /><Navbar /><NewsClient initialNews={initialNews} /><Footer /></main>;
}
