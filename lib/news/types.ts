export type NewsItem = {
  id: string;
  hacker_news_id: number;
  title: string;
  summary: string;
  summary_en: string | null;
  published_at: string | null;
  hn_url: string;
  article_url: string;
  created_at: string;
};
