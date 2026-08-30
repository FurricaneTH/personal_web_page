import type { NewsItem } from "./types";

type HackerStory = { id: number; title: string; url?: string; time?: number; score?: number };

const HN_API = "https://hacker-news.firebaseio.com/v0";
const topicWeights: Record<string, number> = {
  ai: 8, "artificial intelligence": 9, llm: 10, rag: 10, genai: 10,
  "machine learning": 8, openai: 8, model: 5, neural: 6, agent: 6,
  robotics: 4, data: 2, software: 1,
};

async function hn<T>(path: string): Promise<T> {
  const response = await fetch(`${HN_API}/${path}`, { cache: "no-store" });
  if (!response.ok) throw new Error(`Hacker News isteği başarısız (${response.status})`);
  return response.json();
}

function keywordScore(title: string) {
  const lower = title.toLowerCase();
  return Object.entries(topicWeights).reduce((score, [word, weight]) => score + (lower.includes(word) ? weight : 0), 0);
}

function textFromHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/&quot;/gi, '"').replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ").trim().slice(0, 14000);
}

async function articleText(url: string) {
  try {
    const response = await fetch(url, { headers: { "User-Agent": "FurkanCatakNews/1.0" }, signal: AbortSignal.timeout(9000), cache: "no-store" });
    if (!response.ok) return "";
    return textFromHtml(await response.text());
  } catch { return ""; }
}

async function openAI(input: string): Promise<string> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OPENAI_API_KEY tanımlı değil.");
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: process.env.OPENAI_MODEL || "gpt-5.6-luna", input }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`OpenAI isteği başarısız (${response.status})`);
  const data = await response.json();
  return data.output_text || data.output?.flatMap((item: { content?: { text?: string }[] }) => item.content ?? []).map((item: { text?: string }) => item.text ?? "").join(" ") || "Özet oluşturulamadı.";
}

async function aiRank(stories: HackerStory[]): Promise<number[]> {
  try {
    const prompt = `Aşağıdaki Hacker News başlıklarından AI, LLM, RAG, generative AI ve makine öğrenmesiyle en ilgili 5 tanesini seç. Yalnızca seçtiğin haberlerin ID'lerini JSON dizi olarak döndür (örnek: [123,456]). Genel teknoloji haberlerini ancak AI bağlantısı varsa seç.\n${stories.map((s) => `${s.id}: ${s.title}`).join("\n")}`;
    const raw = await openAI(prompt);
    const ids = JSON.parse(raw.match(/\[[\s\S]*?\]/)?.[0] || "[]");
    const valid = ids.filter((id: unknown): id is number => typeof id === "number" && stories.some((s) => s.id === id));
    if (valid.length >= 3) {
      const remaining = [...stories]
        .sort((a, b) => keywordScore(b.title) - keywordScore(a.title) || (b.score ?? 0) - (a.score ?? 0))
        .filter((story) => !valid.includes(story.id))
        .map((story) => story.id);
      return [...valid, ...remaining].slice(0, 5);
    }
  } catch { /* deterministic fallback below */ }
  return [...stories].sort((a, b) => keywordScore(b.title) - keywordScore(a.title) || (b.score ?? 0) - (a.score ?? 0)).slice(0, 5).map((s) => s.id);
}

export async function fetchAndSummarizeNews(): Promise<Omit<NewsItem, "id" | "created_at">[]> {
  const ids = (await hn<number[]>("topstories.json")).slice(0, 30);
  const stories = (await Promise.all(ids.map((id) => hn<HackerStory>(`item/${id}.json`)))).filter((story) => story?.title);
  const selectedIds = await aiRank(stories);
  const selected = selectedIds.map((id) => stories.find((story) => story.id === id)).filter(Boolean) as HackerStory[];
  const sourceTexts = await Promise.all(selected.map((story) => articleText(story.url || `https://news.ycombinator.com/item?id=${story.id}`)));
  return Promise.all(selected.map(async (story, index) => {
    const articleUrl = story.url || `https://news.ycombinator.com/item?id=${story.id}`;
    let summary = `Bu haber, ${story.title} başlığıyla güncel bir teknoloji gelişmesini ele alıyor. Haberin temel konusu ve olası etkileri hakkında daha fazla bağlam için orijinal makaleyi inceleyebilirsiniz. Ayrıntılar, kaynak makaledeki teknik açıklamalara göre değişebilir.`;
    let summaryEn = `This story covers a current technology development titled “${story.title}”. See the original article for additional context and technical details.`;
    try {
      const bilingual = await openAI(`Bu teknoloji haberini iki dilde özetle. Yalnızca geçerli JSON döndür: {"tr":"Türkçe özet", "en":"English summary"}. Her iki özet de 80-120 kelime ve yaklaşık 4-6 cümle olsun; tarafsız, anlaşılır ve haberin bağlamını, ana gelişmesini, teknik/pratik önemini ve varsa etkilerini anlatsın. Başlık, madde işareti, kaynak veya metinde olmayan ayrıntılar ekleme.\nBaşlık: ${story.title}\nMakale metni:\n${sourceTexts[index] || "Makale metni alınamadı; başlıktan güvenli ve temkinli bir özet çıkar."}`);
      const parsed = JSON.parse(bilingual.match(/\{[\s\S]*\}/)?.[0] || "{}");
      if (typeof parsed.tr === "string") summary = parsed.tr;
      if (typeof parsed.en === "string") summaryEn = parsed.en;
    } catch { /* keep fallback summary */ }
    return {
      hacker_news_id: story.id,
      title: story.title,
      summary: summary.trim(),
      summary_en: summaryEn.trim(),
      published_at: story.time ? new Date(story.time * 1000).toISOString() : null,
      hn_url: `https://news.ycombinator.com/item?id=${story.id}`,
      article_url: articleUrl,
    };
  }));
}
