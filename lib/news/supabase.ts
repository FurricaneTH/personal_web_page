import type { NewsItem } from "./types";

function config() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY tanımlı değil.");
  return { url: url.replace(/\/$/, ""), key };
}

async function request(path: string, init: RequestInit = {}) {
  const { url, key } = config();
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Supabase isteği başarısız (${response.status}): ${await response.text()}`);
  return response;
}

export async function getLatestNews(limit = 10): Promise<NewsItem[]> {
  const response = await request(`news?select=*&order=created_at.desc&limit=${limit}`);
  return response.json();
}

export async function upsertNews(items: Omit<NewsItem, "id" | "created_at">[]) {
  if (!items.length) return;
  await request("news?on_conflict=hacker_news_id", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify(items),
  });
}

export async function trimNews(limit = 10) {
  const all = await getLatestNews(100);
  const old = all.slice(limit);
  if (!old.length) return;
  const ids = old.map((item) => item.id).join(",");
  await request(`news?id=in.(${ids})`, { method: "DELETE" });
}
