import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { fetchAndSummarizeNews } from "@/lib/news/agent";
import { getLatestNews, trimNews, upsertNews } from "@/lib/news/supabase";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET() {
  try { return NextResponse.json(await getLatestNews(10)); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Haberler alınamadı." }, { status: 500 }); }
}

export async function POST() {
  try {
    const expected = process.env.NEWS_REFRESH_TOKEN;
    const provided = (await headers()).get("x-news-refresh-token");
    if (!expected || provided !== expected) return NextResponse.json({ error: "Yetkisiz istek." }, { status: 401 });
    const items = await fetchAndSummarizeNews();
    await upsertNews(items);
    await trimNews(10);
    return NextResponse.json(await getLatestNews());
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Yeni haberler alınamadı." }, { status: 500 });
  }
}
