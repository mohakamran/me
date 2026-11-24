# SEO, AEO & GEO Report — kamranweb.vercel.app

_Last updated: 24 November 2026_

## 1. Lighthouse scores (before → after)

Measured locally with Lighthouse 12.2.1 (default throttling).

| Category | Mobile before | Mobile after | Desktop after |
|---|---|---|---|
| Performance | 52 | **93–95** | **100** |
| Accessibility | 94 | **97** | **100** |
| Best Practices | 100 | **100** | **100** |
| SEO | 100 | **100** | **100** |

Key mobile metrics after: First Contentful Paint 1.2–1.9 s, Largest Contentful Paint 2.7 s,
Total Blocking Time 150 ms, Cumulative Layout Shift 0.

Lighthouse's "SEO 100" only checks the technical basics (title, meta description, crawlable links,
`robots.txt`, valid `hreflang`, etc.). Ranking also depends on content, links pointing to the site and
time, so section 6 lists what still needs to happen off the site.

## 2. Keyword strategy

No paid keyword tool was used, so there is no search-volume data here. Keywords are chosen by
**search intent**: what a recruiter, client or AI assistant would type when looking for someone like you.

### Primary (brand) — must rank #1
- Muhammad Kamran
- Muhammad Kamran developer / engineer / portfolio
- mohakamran
- ムハンマド・カムラン

### Secondary (role + place) — realistic to rank for over time
- Full Stack Engineer Japan
- AI Engineer Japan / LLM Engineer Japan
- Full stack developer Fukuoka / Kitakyushu
- Laravel developer Japan
- React / Next.js developer Japan
- Python FastAPI developer Japan
- Foreign software engineer Japan (English & Japanese)
- フルスタックエンジニア 北九州 / 福岡
- AIエンジニア 福岡
- 外国人エンジニア 日本語 英語

### Long-tail (project & skill) — easiest wins
- local LLM research assistant Ollama
- private AI research assistant offline (Scholaria)
- RAG with page citations SQLite FTS5
- OpenAI structured outputs Pydantic Streamlit app
- AI Japanese tutor for English speakers
- Japanese résumé (履歴書 / 職務経歴書) generator AI
- multi-tenant gym management SaaS Laravel
- pharmacy ERP Laravel FEFO
- Japan take-home pay calculator 2026

### Question keywords (for AEO / AI answers)
- Who is Muhammad Kamran?
- What AI projects has Muhammad Kamran built?
- Is Muhammad Kamran available for hire?
- Which languages does Muhammad Kamran speak?
- What is Muhammad Kamran's tech stack?

## 3. On-page SEO (done)

| Item | Status |
|---|---|
| Title tag with name, role, location and core stack (EN + JA versions) | ✅ |
| Meta description with role, location, stack and AI keywords (EN + JA) | ✅ |
| Meta keywords, author, `robots` (large image previews allowed) | ✅ |
| Canonical URL `https://kamranweb.vercel.app/` | ✅ |
| One `<h1>` that includes your name and role | ✅ |
| Descriptive image `alt` text (projects, gallery, portrait) | ✅ |
| Open Graph + Twitter/X cards with a new 1200×630 share image | ✅ |
| Favicon (SVG), Apple touch icon, web manifest | ✅ |
| `sitemap.xml` with image entries, `robots.txt` | ✅ |
| Dead link removed (expertestores.com) | ✅ |
| Fast, stable page (Core Web Vitals pass, CLS 0) | ✅ |
| `vercel.json`: long caching for images and fonts, CV PDFs kept out of search results | ✅ |

## 4. AEO — Answer Engine Optimisation (done)

Answer engines (Google featured snippets and AI Overviews, Bing Copilot, voice assistants) prefer short,
direct answers in plain HTML with matching structured data.

- **New "Hiring me in 30 seconds" section** (`#faq`): a TL;DR card plus 6 questions with direct answers,
  in English and Japanese, written as plain HTML so crawlers can read it without running JavaScript.
- **`FAQPage` structured data** matching those questions word for word.
- **`Person` structured data** expanded: job title, location, education credential, MEXT award,
  `knowsAbout` (27 skills), what kind of role you're looking for, and all profiles (`sameAs`),
  including Instagram.
- **`ProfilePage`, `WebSite` and `ItemList`** (your 12 case studies as `SoftwareSourceCode`).

## 5. GEO — Generative Engine Optimisation (done)

GEO is about getting AI assistants (ChatGPT, Claude, Perplexity, Gemini) to find, understand and cite you.

- **`/llms.txt`**: a clean, factual summary of who you are, your key facts and all case studies with
  links. It's an emerging convention that AI tools read.
- **`robots.txt`** explicitly welcomes AI crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot,
  Claude-SearchBot, PerplexityBot, Google-Extended).
- **Consistent facts everywhere**: the same name, role, location, years of experience and numbers
  appear in the page text, structured data, `llms.txt` and the share image. AI systems trust facts that
  agree across sources.
- **Specific, checkable claims**: test counts, numbers and repository links make the content easy for
  an AI to quote accurately.

## 6. What you still need to do (off-page)

These need your own accounts, so I can't do them for you. They matter more than anything left on the page.

1. **Google Search Console**: add `https://kamranweb.vercel.app/`, verify it (HTML tag or DNS), then
   submit `sitemap.xml` and click **Request indexing** for the home page.
2. **Bing Webmaster Tools**: import from Search Console in one click. Bing also powers ChatGPT search
   and Copilot, so this helps GEO directly.
3. **Link to the site from every profile**: put `https://kamranweb.vercel.app` in the website field of
   LinkedIn, GitHub (profile and the `me` repository — it still shows the old `kamran-azure` address),
   X, Instagram and YouTube. These are the strongest early signals Google has.
4. **GitHub profile README**: pin Scholaria, Personal Doctor AI, Japanese AI Tutor, GymFlow, MediCore and
   PixelForge, and link back to the portfolio.
5. **Share the case studies**: a LinkedIn post per AI project linking to the site brings both visitors and
   links.
6. **A custom domain** (for example `muhammadkamran.dev` or `kamran.jp`, roughly ¥1,500–3,000 per year)
   looks more professional than `*.vercel.app` and is easier to remember. If you buy one, update the
   canonical URL, sitemap, `robots.txt`, `llms.txt` and structured data.

## 7. Recommended next steps on the site

- **One page per case study** (for example `/projects/scholaria`). Right now everything is on one URL,
  so each project can't rank on its own. Separate pages with their own title and description would let
  long-tail searches like "local LLM research assistant" find you.
- **A short blog / notes section**: 3–5 posts such as "Building a private RAG app on an 8 GB M1",
  "Job hunting in Japan as a foreign engineer" or "Structured outputs with Pydantic". Each targets a
  long-tail keyword and gives AI assistants more to cite.
- **Self-host or subset the icon font**: Font Awesome loads ~300 KB of fonts for ~60 icons. Swapping to
  inline SVG icons would be the next big performance gain.
- **Re-check scores after each deploy** with PageSpeed Insights:
  https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fkamranweb.vercel.app%2F
