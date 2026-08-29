import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundTrees from "@/components/BackgroundTrees";
import ManageNewsClient from "./ManageNewsClient";
import { getLatestNews } from "@/lib/news/supabase";
import type { NewsItem } from "@/lib/news/types";

export const dynamic = "force-dynamic";

export default async function ManageNewsPage() {
  let initialNews: NewsItem[] = [];
  try { initialNews = await getLatestNews(); } catch { /* API can be configured after deployment. */ }
  return <main><BackgroundTrees /><Navbar /><ManageNewsClient initialNews={initialNews} /><Footer /></main>;
}

