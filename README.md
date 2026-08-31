# Furkan Çatak — Personal Portfolio

Personal portfolio website for Furkan Çatak, a computer engineering student interested in artificial intelligence, data analysis, LLM/RAG systems, and practical software development.

## Stack

- Next.js 16 (App Router)
- React and TypeScript
- Tailwind CSS
- Supabase (news storage)
- Hacker News API
- OpenAI Responses API (server-side summaries)
- Vercel deployment

## Features

- Responsive personal portfolio with Home, About, Projects, Experience, and Contact sections
- Turkish and English language switcher
- Light and dark themes with smooth transitions
- Turkish and English CV downloads
- GitHub, LinkedIn, and email links
- Custom logo, favicon, and subtle brand-inspired background elements
- AI-focused Hacker News digest
- Separate news list and article detail pages
- Protected news management page for triggering refreshes

## News workflow

The public news page is available at `/news`. Visitors can browse the latest ten stored stories and open each title to read its full summary at `/news/[id]`.

The private management page is available at `/news/manage`. It requires the `NEWS_REFRESH_TOKEN` and is intended only for the site owner.

When a refresh is triggered, the server:

1. Reads the first 30 Hacker News stories.
2. Prioritizes stories directly related to AI, LLMs, RAG, generative AI, machine learning, agents, and related developments.
3. Avoids unrelated stories and selects the five strongest matches.
4. Fetches the original article content where available.
5. Generates adaptive, educational Turkish and English summaries, omitting filler and explaining important context and terminology when useful.
6. Stores the results in Supabase and keeps only the latest ten stories.

OpenAI and Supabase secret keys are used only in server-side code. They are never exposed to the browser.

## Local development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful checks:

```bash
npm run lint
npm run build
```

## Supabase setup

1. Create a Supabase project.
2. Open **SQL Editor**.
3. Run the contents of [`supabase/schema.sql`](./supabase/schema.sql).
4. If the project was created before bilingual summaries were added, also run:

```sql
alter table public.news
add column if not exists summary_en text;
```

The schema creates the `news` table, its timestamp index, and enables Row Level Security. The application accesses the table through the server-side service-role key.

## Environment variables

Create a `.env.local` file for local development or add these variables in Vercel Project Settings → Environment Variables:

```env
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-5.6-luna
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEWS_REFRESH_TOKEN=your_private_refresh_token
```

Never commit `.env.local` or expose `OPENAI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, or `NEWS_REFRESH_TOKEN` in client-side code.

## Deployment

The project is connected to GitHub and Vercel. Pushes to the `main` branch trigger a production deployment automatically.

```bash
git add .
git commit -m "Describe your change"
git push origin main
```

Production site: [furkancatak.com](https://furkancatak.com)

## Project structure

```text
app/
  api/news/       # Server-side news API
  news/           # Public news page, detail pages, and management page
components/      # Portfolio UI and shared providers
lib/news/         # Hacker News agent and Supabase REST helpers
supabase/         # Database schema
public/           # Logo, favicon, CV files, and static assets
```
