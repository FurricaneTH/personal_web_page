import { NextResponse } from "next/server";
import { fetchAndSummarizeNews } from "@/lib/news/agent";
import { getLatestNews, trimNews, upsertNews } from "@/lib/news/supabase";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET() {
  try { return NextResponse.json(await getLatestNews()); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Haberler alınamadı." }, { status: 500 }); }
}

export async function POST() {
  try {
    const items = await fetchAndSummarizeNews();
    await upsertNews(items);
    await trimNews(10);
    return NextResponse.json(await getLatestNews());
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Yeni haberler alınamadı." }, { status: 500 });
  }
}

