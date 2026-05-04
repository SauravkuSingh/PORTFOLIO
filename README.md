# Saurav Singh — Portfolio

Personal portfolio of Saurav Singh, a full-stack developer based in Bhilai, India.

**Live:** [sauravksingh.in](https://www.sauravksingh.in)

Built as a Next.js App Router site with file-based routing, real-time blog likes via Supabase, a content-driven projects showcase, and a markdown-powered blog.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS 4 |
| Animation | Framer Motion 12 |
| Icons | Lucide, Simple Icons (`react-icons/si`) |
| Backend (likes) | Supabase (Postgres + Realtime via WebSocket) |
| Markdown | `react-markdown` + `remark-gfm` |
| 3D / Background | OGL (`DarkVeil`) |
| Hosting | Vercel |

---

## Features

- **File-based routes** — `/`, `/about`, `/projects`, `/projects/[slug]`, `/blogs`, `/blogs/[slug]`
- **Animated navbar** with active-tab indicator that slides between routes
- **Hero section** with gradient title, rotating text, animated stats (count-up + hover detail)
- **Tech marquee** — two infinite rows scrolling in opposite directions
- **Featured Projects** on home + dedicated `/projects` page with category filters (All / Web Apps / Full Stack / Frontend)
- **Project detail pages** with Magic UI–style Safari mockup, tech-stack icon grid, live demo + code links, and screenshot gallery
- **Blog system** — markdown-rendered posts with code blocks, tables, blockquotes, prev/next navigation, and breadcrumbs
- **Real-time likes** — like counts update live across browsers via Supabase Realtime channels (no polling)
- **Share menu** — LinkedIn, X, copy-link
- **SEO metadata** per route, sitemap, robots.txt
- **Empty states** — "Coming soon" notice when a category filter has no projects
- **Dark, glassmorphic aesthetic** with ambient gradient backgrounds throughout

---

## Project Structure

```
src/
├── app/
│   ├── layout.jsx           # Root layout (metadata + Shell wrapper)
│   ├── shell.jsx            # Client wrapper: Background + Navbar + main + Footer
│   ├── page.jsx             # Home (Hero + About + Tech + Featured Projects)
│   ├── about/page.jsx
│   ├── projects/
│   │   ├── page.jsx         # All projects + filters
│   │   └── [slug]/page.jsx  # Project detail
│   ├── blogs/
│   │   ├── page.jsx         # All blogs
│   │   └── [slug]/page.jsx  # Blog detail
│   ├── robots.js
│   └── sitemap.js
├── sections/                # Big page-level sections (Home, About, Tech, ...)
├── components/
│   ├── ProjectCard.jsx      # Single source of truth for project card design
│   ├── blog/
│   │   ├── LikeButton.jsx
│   │   └── ShareMenu.jsx
│   ├── ui/                  # Magic UI / shadcn primitives (Safari, Marquee, ShimmerButton, ...)
│   └── background/
├── data/
│   ├── projects.js          # All projects — edit to add/update
│   └── blogs.js             # All blog posts
├── hooks/
│   └── useBlogLikes.js      # Supabase Realtime hook
├── layout/
│   └── Navbar.jsx
└── lib/
    ├── supabase.js
    └── utils.js
supabase/
└── init.sql                 # One-time DB setup
```

---

## Getting Started

### 1. Install

```bash
npm install
```

### 2. Environment variables

Create `.env.local` in the project root:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxx
```

(`NEXT_PUBLIC_SUPABASE_ANON_KEY` is also accepted — the code reads either name.)

If these are missing, the site still works — the Like button just hides itself.

### 3. Supabase setup (one-time)

1. Create a free project at [supabase.com](https://supabase.com).
2. Open **SQL Editor → New query**, paste the contents of [`supabase/init.sql`](./supabase/init.sql), and run.
   - Creates the `blog_likes` table
   - Adds RLS policies (anon read, RPC-only writes)
   - Creates `increment_blog_likes(text)` and `decrement_blog_likes(text)` RPCs
   - Enables Realtime on the table
3. Copy your **Project URL** and **publishable (anon) key** from **Project Settings → API** into `.env.local`.

### 4. Dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Adding Content

### A new project

Append an object to `PROJECTS` in [`src/data/projects.js`](./src/data/projects.js):

```js
{
  slug: "my-project",
  title: "My Project",
  tagline: "One-line tagline",
  category: "Frontend",            // "Frontend" | "Full Stack" | "Web Apps"
  shortDescription: "Card subtitle",
  description: "Detail page intro paragraph",
  stack: ["React", "Vite", "Tailwind CSS"],
  fullStack: ["React", "Vite", "Tailwind CSS", "..."],
  url: "myproject.vercel.app",     // shown in Safari URL bar
  liveUrl: "https://...",
  codeUrl: "https://github.com/...",
  image: "/assets/projects/my-project.webp",
  screenshots: ["/assets/projects/my-project-1.webp"],
  accent: "from-violet-500/40 via-fuchsia-500/30 to-indigo-600/40",
  overview: "Detailed overview paragraph",
  features: ["Feature 1", "Feature 2"],
  info: {
    Category: "Web App",
    Duration: "1 week",
    Client: "Personal Project",
    Role: "Frontend Developer",
    Date: "2026",
  },
}
```

Drop screenshots in `public/assets/projects/`. The card and detail page render automatically.

### A new blog post

Append an object to `BLOGS` in [`src/data/blogs.js`](./src/data/blogs.js) with `slug`, `title`, `description`, `content` (markdown string), `date`, `readTime`, `category`, and optional `image`.

### A new tech-stack icon

If you add a tech name to a project's `fullStack` that's not in the icon map, the detail page renders a styled letter badge as a fallback. To use a real icon, add an entry to the `TECH` map in [`src/sections/ProjectDetail.jsx`](./src/sections/ProjectDetail.jsx).

---

## Scripts

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build
npm run start    # Run the production build
npm run lint     # Lint
```

---

## Deployment (Vercel)

1. Push to GitHub.
2. Import the repo on Vercel.
3. Add the same two env vars (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`) in **Project Settings → Environment Variables**.
4. Deploy.

---

## Contact

- LinkedIn: [linkedin.com/in/saurav-singh-fsdev](https://www.linkedin.com/in/saurav-singh-fsdev/)
- GitHub: [@SauravkuSingh](https://github.com/SauravkuSingh)
- Email: sauravksinghdev@gmail.com
