import { PROJECTS } from "@/data/projects";

// Your GitHub handle — repos here are pulled in automatically.
const GH_USER = "SauravkuSingh";

// Repos to never list (the portfolio itself + ones excluded by request).
const EXCLUDE = new Set(["portfolio", "weather-app", "dms_flowdocs", "tailwebs"]);

// Gradient palette cycled across auto-pulled cards.
const ACCENTS = [
  "from-sky-500/40 via-blue-500/30 to-indigo-600/40",
  "from-rose-400/40 via-pink-500/30 to-fuchsia-600/40",
  "from-emerald-400/40 via-teal-500/30 to-cyan-600/40",
  "from-amber-400/40 via-orange-500/30 to-red-600/40",
  "from-violet-500/40 via-purple-500/30 to-indigo-600/40",
  "from-lime-400/40 via-green-500/30 to-emerald-600/40",
];

// Display name -> detector. Order = the order techs are listed in.
const TECH_SIGNATURES = [
  ["Next.js", /next\.?js/i],
  ["React Router", /react[-\s]?router/i],
  ["React", /\breact\b/i],
  ["Vite", /\bvite\b/i],
  ["Tailwind CSS", /tailwind/i],
  ["TypeScript", /\btypescript\b/i],
  ["Node.js", /\bnode(?:\.js|js)?\b/i],
  ["Express", /\bexpress(?:\.js)?\b/i],
  ["MongoDB", /\bmongo(?:db| atlas|ose)?\b/i],
  ["PostgreSQL", /\bpostgres(?:ql)?\b/i],
  ["MySQL", /\bmysql\b/i],
  ["Prisma", /\bprisma\b/i],
  ["Firebase", /\bfirebase\b/i],
  ["Supabase", /\bsupabase\b/i],
  ["JWT", /\bjwt\b/i],
  ["Recharts", /\brecharts\b/i],
  ["Cloudinary", /\bcloudinary\b/i],
  ["Framer Motion", /framer[-\s]?motion/i],
  ["GSAP", /\bgsap\b/i],
  ["Redux", /\bredux\b/i],
  ["Axios", /\baxios\b/i],
  ["ShadCN UI", /shadcn/i],
  ["Lucide", /lucide/i],
  ["JavaScript", /\bjavascript\b/i],
  ["HTML", /\bhtml5?\b/i],
  ["CSS", /\bcss3?\b/i],
];

// Techs that imply a server / database — i.e. a full-stack project.
const BACKEND_TECH = new Set([
  "Node.js", "Express", "MongoDB", "PostgreSQL", "MySQL",
  "Prisma", "Firebase", "Supabase",
]);

const repoNameFromUrl = (url) =>
  (url || "").replace(/\/+$/, "").split("/").pop().toLowerCase();

// "Taskmaster-todo-" -> "Taskmaster Todo", "PasswordGenerator" -> "Password Generator"
const prettify = (name) =>
  name
    .replace(/[-_]+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .trim()
    .split(/\s+/)
    .map((w) =>
      /[a-z]/.test(w) && w === w.toLowerCase()
        ? w[0].toUpperCase() + w.slice(1)
        : w,
    )
    .join(" ");

const hostOf = (url) => {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return (url || "").replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  }
};

// Strip markdown inline syntax down to plain text.
const cleanInline = (s) =>
  s
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // links -> text
    .replace(/`([^`]+)`/g, "$1") // inline code
    .replace(/[*]{1,3}([^*]+)[*]{1,3}/g, "$1") // **bold** / *italic*
    .replace(/<[^>]+>/g, "") // html tags
    .replace(/\s+/g, " ")
    .trim();

const truncate = (s, max) => {
  if (!s || s.length <= max) return s;
  const cut = s.slice(0, max);
  const lastStop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("! "), cut.lastIndexOf("? "));
  if (lastStop > max * 0.5) return cut.slice(0, lastStop + 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trim() + "…";
};

const firstSentence = (s) => {
  const m = (s || "").match(/^.*?[.!?](\s|$)/);
  return (m ? m[0] : s || "").trim();
};

// A README that's really just the framework scaffold tells us nothing useful.
const isBoilerplate = (md) =>
  /This template provides a minimal setup to get React working in Vite/i.test(md) ||
  /Get started with Create React App/i.test(md) ||
  /Getting Started with Create React App/i.test(md);

// Pull the meaningful prose paragraphs out of a README (skip headings, badges,
// images, tables, code blocks, lists).
function readmeParagraphs(md) {
  const lines = md.split("\n");
  const paras = [];
  let cur = [];
  let inFence = false;
  const flush = () => {
    if (cur.length) {
      const p = cleanInline(cur.join(" "));
      if (p) paras.push(p);
      cur = [];
    }
  };
  for (const raw of lines) {
    const t = raw.trim();
    if (/^(```|~~~)/.test(t)) {
      inFence = !inFence;
      flush();
      continue;
    }
    if (inFence) continue;
    if (
      t === "" ||
      /^#{1,6}\s/.test(t) || // heading
      /^([-*_])\1{2,}$/.test(t) || // horizontal rule
      /^\|/.test(t) || // table row
      /^[-*+]\s/.test(t) || // bullet
      /^\d+\.\s/.test(t) // numbered list
    ) {
      flush();
      continue;
    }
    // line that's only an image/badge
    if (t.replace(/!?\[[^\]]*\]\([^)]*\)/g, "").trim() === "") {
      flush();
      continue;
    }
    cur.push(t.replace(/^>\s?/, ""));
  }
  flush();
  return paras;
}

// Top-level bullets under a "Features" heading.
function readmeFeatures(md) {
  const lines = md.split("\n");
  const feats = [];
  let inFeatures = false;
  let inFence = false;
  for (const raw of lines) {
    const t = raw.trim();
    if (/^(```|~~~)/.test(t)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    if (/^#{1,6}\s/.test(t)) {
      inFeatures = /features/i.test(t);
      continue;
    }
    if (!inFeatures) continue;
    // Only top-level bullets (no indentation), so we skip nested detail.
    if (/^[-*+]\s+/.test(raw)) {
      let f = cleanInline(t.replace(/^[-*+]\s+/, ""));
      f = f.replace(/^[^\w(]+/, ""); // strip leading emoji/punctuation
      f = f.replace(/:\s*$/, "");
      if (f) feats.push(f);
    }
  }
  return feats.slice(0, 6);
}

// Collect known technologies mentioned across README + metadata, in canonical order.
function detectTech(haystack, language, topics) {
  const found = [];
  for (const [name, re] of TECH_SIGNATURES) {
    if (re.test(haystack) && !found.includes(name)) found.push(name);
  }
  // Express/Mongoose strongly imply a Node runtime.
  if ((found.includes("Express") || found.includes("MongoDB")) && !found.includes("Node.js")) {
    found.unshift("Node.js");
  }
  if (language && !found.some((t) => t.toLowerCase() === language.toLowerCase())) {
    found.push(language);
  }
  (topics || []).forEach((tp) => {
    if (!found.some((t) => t.toLowerCase() === tp.toLowerCase())) found.push(prettify(tp));
  });
  return found.slice(0, 9);
}

function classify({ language, tech, md, name, description }) {
  const lang = (language || "").toLowerCase();
  const hasBackend =
    tech.some((t) => BACKEND_TECH.has(t)) ||
    /(^|\n)#{1,6}\s.*back[\s-]?end/i.test(md) ||
    /\/api\/\w+/.test(md);
  const hasFrontendFw = tech.some((t) =>
    ["React", "Next.js", "Vite", "Tailwind CSS"].includes(t),
  );
  const frontendKw =
    /(calculator|clock|calendar|calender|password|generator|portfolio|landing|clone|animation|\bui\b)/i.test(
      `${name} ${description}`,
    );

  if (hasBackend) return "Full Stack";
  if (["html", "css", "scss"].includes(lang)) return "Frontend";
  if (hasFrontendFw) return "Frontend";
  if (frontendKw) return "Frontend";
  return "Web Apps";
}

function toProject(repo, i, md) {
  const live = repo.homepage.trim();
  const host = hostOf(live);
  const usableReadme = md && !isBoilerplate(md) ? md : "";
  const repoDesc = (repo.description || "").trim();

  const paras = usableReadme ? readmeParagraphs(usableReadme) : [];
  const substantial = paras.find((p) => p.length >= 80);

  // --- Overview (the long paragraph shown on the detail page) ---
  let overview =
    substantial ||
    paras[0] ||
    repoDesc ||
    `${prettify(repo.name)} — a project deployed live at ${host}.`;
  // Drop a trailing "...:" clause that just introduces a list/table.
  overview = overview.replace(/\s+[^.!?\n]*:\s*$/, "").trim();
  overview = truncate(overview, 600);

  // --- Tagline / short description ---
  const firstPara = paras[0] || repoDesc || "";
  let tagline =
    firstPara && firstPara.length <= 120
      ? firstPara
      : firstSentence(overview) || repoDesc || `Project deployed at ${host}.`;
  tagline = truncate(tagline.replace(/:\s*$/, ""), 130);

  const shortDescription = truncate(repoDesc || tagline, 150);

  // --- Tech stack ---
  const haystack = `${usableReadme} ${repoDesc} ${repo.name}`;
  const fullStack = detectTech(haystack, repo.language || "JavaScript", repo.topics);

  // --- Category (driven by real backend detection) ---
  const category = classify({
    language: repo.language,
    tech: fullStack,
    md: usableReadme,
    name: repo.name,
    description: repoDesc,
  });

  // --- Features ---
  let features = usableReadme ? readmeFeatures(usableReadme) : [];
  if (features.length < 2) {
    features = [
      `Built with ${fullStack.slice(0, 3).join(", ") || repo.language || "modern web tech"}`,
      "Deployed and live on the web",
      "Source code openly available on GitHub",
    ];
  }

  return {
    slug: `gh-${repo.name.toLowerCase()}`,
    title: prettify(repo.name),
    tagline,
    category,
    shortDescription,
    description: overview,
    stack: fullStack.slice(0, 4),
    fullStack,
    url: host,
    liveUrl: live,
    codeUrl: repo.html_url,
    // GitHub's auto-generated social preview — degrades to the gradient if it fails.
    image: `https://opengraph.githubassets.com/1/${repo.full_name}`,
    screenshots: [],
    accent: ACCENTS[i % ACCENTS.length],
    overview,
    features,
    info: {
      Category: category,
      Role: category === "Full Stack" ? "Full Stack Developer" : "Frontend Developer",
      Client: "Personal Project",
      Date: repo.created_at ? repo.created_at.slice(0, 4) : "—",
      Source: "GitHub",
    },
    source: "github",
  };
}

// Fetch the README from raw.githubusercontent.com (the CDN), NOT the REST API —
// raw isn't subject to the 60 req/hr unauthenticated API limit. HEAD resolves to
// the repo's default branch.
async function fetchReadme(fullName) {
  const candidates = ["README.md", "readme.md", "Readme.md", "README.MD", "README"];
  for (const file of candidates) {
    try {
      const res = await fetch(
        `https://raw.githubusercontent.com/${fullName}/HEAD/${file}`,
        { next: { revalidate: 3600 } },
      );
      if (res.ok) {
        const text = await res.text();
        if (text && text.trim()) return text;
      }
    } catch {
      // try the next candidate
    }
  }
  return null;
}

/**
 * Fetch public repos that have a live link (homepage) set and turn each into a
 * full project object — pulling the real description, features and tech stack
 * from each repo's README where one exists (falling back to GitHub metadata
 * otherwise). Curated repos, forks, archived repos and the portfolio itself are
 * skipped. Revalidates hourly so newly published repos show up automatically
 * without a redeploy. Fails soft to [] on any error.
 */
export async function getGithubProjects() {
  const curated = new Set(
    PROJECTS.map((p) => repoNameFromUrl(p.codeUrl)).filter(Boolean),
  );

  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio",
  };
  // Optional — raises the 60 req/hr unauthenticated rate limit if provided.
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  let repos;
  try {
    const res = await fetch(
      `https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=updated`,
      { headers, next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];
    repos = await res.json();
    if (!Array.isArray(repos)) return [];
  } catch {
    return [];
  }

  const eligible = repos.filter(
    (r) =>
      !r.fork &&
      !r.archived &&
      !r.private &&
      typeof r.homepage === "string" &&
      /^https?:\/\//i.test(r.homepage.trim()) &&
      !EXCLUDE.has(r.name.toLowerCase()) &&
      !curated.has(r.name.toLowerCase()),
  );

  return Promise.all(
    eligible.map(async (repo, i) => {
      const md = await fetchReadme(repo.full_name);
      return toProject(repo, i, md);
    }),
  );
}

// Resolve a single auto-pulled project by its slug (for the detail page).
export async function getGithubProjectBySlug(slug) {
  if (!slug || !slug.startsWith("gh-")) return null;
  const all = await getGithubProjects();
  return all.find((p) => p.slug === slug) || null;
}
