// ─────────────────────────────────────────────────────────────────────────────
// Sonic — Saurav's brutal little AI sidekick (the in-site chatbot persona).
// A local, no-API knowledge engine. It knows everything on this site: projects,
// blogs, experience, skills and how to reach Saurav. The personality is SAVAGE —
// it roasts the visitor — but the actual info it gives is always correct.
// It replies in the visitor's language: English, Hinglish, or Hindi.
// ─────────────────────────────────────────────────────────────────────────────

import { PROJECTS } from "@/data/projects";
import { BLOGS } from "@/data/blogs";
import { JOURNEY } from "@/data/journey";
import { EMAIL, PHONES, telHref } from "@/data/contact";

export const BOT = {
  name: "Sonic",
  emoji: "🙂",
  tagline: "Saurav's (suspiciously friendly) AI",
};

export const PROFILE = {
  name: "Saurav Singh",
  role: "Full Stack Developer",
  stack: "React · Next.js · Node.js",
  location: "Bhilai, Chhattisgarh, India",
  email: EMAIL,
  phones: PHONES,
  github: "https://github.com/SauravkuSingh",
  linkedin: "https://www.linkedin.com/in/saurav-singh-fsdev/",
  available: true,
};

// Extra portfolio knowledge (About page + FAQ) so the bot knows everything.
export const ABOUT = {
  story:
    "Saurav got into web dev by trying to make a webpage look cooler than it had any right to. That curiosity stuck. He did his B.Tech at SSTC Bhilai, picked up frontend at Globussoft, and now works on the UI revamp of a production platform at Empmonitor. He also takes freelance work on the side — mostly with small teams and founders who care how their product feels.",
  values: [
    "Clean code — would rather write 30 obvious lines than 5 clever ones.",
    "Performance — slow software is rude software; he sweats first paint, bundle size and responsiveness.",
    "User experience — buttons should feel like buttons, loading states should exist, errors should be helpful.",
  ],
};

export const SERVICES = {
  process:
    "Message him with what you're building → a 20–30 min call to align on scope, timeline and goals → a proposal with deliverables, milestones and pricing → kickoff, usually within a week.",
  timeline:
    "Landing/marketing sites: 1–2 weeks. Mid-size web apps or dashboards: 4–8 weeks. Larger builds are split into phases so you see progress every couple of weeks.",
  pricing:
    "Three models: fixed price for well-scoped work, hourly for small/evolving tasks, or a monthly retainer for ongoing frontend support. He shares a ballpark on the first call.",
  goodFit:
    "Modern web products, revamps of existing apps, or a reliable frontend partner.",
  notFit:
    "WordPress/Wix/no-code builds, native iOS/Android apps, pure graphic/brand design, or projects with no clear scope.",
  afterDelivery:
    "Every project includes a 2-week post-launch window for free bug fixes, optional maintenance retainers after that, plus clean handover docs, a tidy repo and full access — no lock-in.",
};

// Suggestion chips shown to nudge the visitor along.
export const QUICK_CHIPS = [
  "Projects",
  "Skills",
  "Experience",
  "Hire Saurav",
];

const CORE_SKILLS = [
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Framer Motion",
  "REST APIs",
  "Git",
];

// Dev jokes — rotated so you get a fresh one each time.
const JOKES = [
  {
    en: "Why do programmers prefer dark mode? Because light attracts bugs. 🐛",
    hin: "Programmers ko dark mode kyun pasand hai? Kyunki light bugs ko attract karti hai. 🐛",
    hi: "Programmers को dark mode क्यों पसंद है? क्योंकि light bugs को attract करती है। 🐛",
  },
  {
    en: "A SQL query walks into a bar, sees two tables and asks — 'Can I JOIN you?' 😏",
    hin: "Ek SQL query bar mein gayi, do tables dekhe aur boli — 'Can I JOIN you?' 😏",
    hi: "एक SQL query bar में गई, दो tables देखे और बोली — 'Can I JOIN you?' 😏",
  },
  {
    en: "Why did the developer go broke? He used up all his cache. 💸",
    hin: "Developer kangaal kyun ho gaya? Saara cache khatam kar diya. 💸",
    hi: "Developer कंगाल क्यों हो गया? सारा cache खत्म कर दिया। 💸",
  },
  {
    en: "How many programmers does it take to change a light bulb? None — that's a hardware problem. 💡",
    hin: "Ek bulb badalne ke liye kitne programmers chahiye? Ek bhi nahi — wo hardware problem hai. 💡",
    hi: "एक bulb बदलने के लिए कितने programmers चाहिए? एक भी नहीं — वो hardware problem है। 💡",
  },
  {
    en: "There are 10 types of people: those who understand binary, and those who don't. 🤓",
    hin: "Duniya mein 10 type ke log hote hain: jo binary samajhte hain, aur jo nahi. 🤓",
    hi: "दुनिया में 10 type के लोग होते हैं: जो binary समझते हैं, और जो नहीं। 🤓",
  },
  {
    en: "Why do Java developers wear glasses? Because they don't C#. 👓",
    hin: "Java developers chashma kyun pehente hain? Kyunki unhe C# nahi dikhta. 👓",
    hi: "Java developers चश्मा क्यों पहनते हैं? क्योंकि उन्हें C# नहीं दिखता। 👓",
  },
  {
    en: "I'd tell you a UDP joke, but you might not get it. 📡",
    hin: "Main tujhe ek UDP joke sunata, par shayad tujh tak pahunche hi na. 📡",
    hi: "मैं तुझे एक UDP joke सुनाता, पर शायद तुझ तक पहुँचे ही ना। 📡",
  },
];
let jokeIdx = 0;

// Detect the visitor's language so we can clap back in the same one.
// Hindi (Devanagari) → "hi"; romanized Hindi/Hinglish → "hinglish"; else "en".
// The word list is curated to avoid common English collisions (no "to", "do",
// "ho", "sun", "main", "par", "hi" etc.).
const HINGLISH_RE =
  /\b(kya|kyaa|kyu|kyun|kaise|kaisa|kaisi|kaun|kaunsa|konsa|kahan|kaha|kab|kitna|kitne|kitni|hai|hain|hoon|haan|han|nahi|nahin|mat|mujhe|tum|tumhe|tumhara|tumhari|tera|teri|tere|mera|meri|mere|uska|uski|unka|unke|iska|iski|aap|aapka|aapki|hum|humara|hamara|kaam|naam|baat|banda|ghar|paisa|naukri|dost|bhai|bhaiya|yaar|bhau|matlab|theek|thik|accha|acha|achha|mast|badhiya|zabardast|bekar|bekaar|bakwas|faltu|pyaar|maaf|maafi|galti|sahi|galat|shukriya|dhanyavad|dhanyawad|namaste|namaskar|kripya|abe|arre|oye|bata|batao|batade|bataye|dikha|dikhao|dekho|dekhega|bolo|suno|pooch|poocho|chalo|chalega|karega|karta|karti|karna|karke|karo|kiya|milega|samajh|samjha|rehta|rehti|banata|banaya|jaldi|abhi|aaj|phir|waise|bilkul|ekdum|thoda|zyada|bahut|bohot|kuch|sabhi|koi|kisi|wala|wali|wale|hua|raha|rahi|rahe|gaya|gayi|zindagi|dikkat|chahiye|chahta|chahti)\b/i;

function detectLang(raw) {
  const s = raw || "";
  if (/[ऀ-ॿ]/.test(s)) return "hi"; // Devanagari → Hindi
  if (HINGLISH_RE.test(s)) return "hinglish";
  return "en";
}

const findProject = (q) =>
  PROJECTS.find((p) => {
    const title = p.title.toLowerCase();
    if (q.includes(title)) return true;
    if (q.includes(p.slug.replace(/-/g, " "))) return true;
    return title.split(/\s+/).some((w) => w.length > 3 && q.includes(w));
  });

const projectMsg = (p, t) => ({
  text: t(
    `Ooh, good pick! **${p.title}** — ${p.shortDescription}\n\nBuilt with ${p.stack.join(", ")}. Pretty slick, right?`,
    `Wah, badhiya choice! **${p.title}** — ${p.shortDescription}\n\n${p.stack.join(", ")} se bana hai. Mast hai na?`,
    `वाह, बढ़िया choice! **${p.title}** — ${p.shortDescription}\n\n${p.stack.join(", ")} से बना है। मस्त है ना?`,
  ),
  mood: "naughty",
  links: [
    { label: "View details", href: `/projects/${p.slug}` },
    p.liveUrl && { label: "Live demo", href: p.liveUrl, external: true },
    p.codeUrl && { label: "Code", href: p.codeUrl, external: true },
  ].filter(Boolean),
  chips: ["Other projects", "Skills", "Hire Saurav"],
});

/**
 * The brain. Takes raw user text, returns a message:
 *   { text, mood, links?, chips? }
 * mood ∈ idle | naughty | happy | angry | confused | thinking | talking
 */
export function getBotReply(raw) {
  const q = (raw || "").toLowerCase().trim();
  const lang = detectLang(raw);
  // pick text by language: t(english, hinglish, hindi)
  const t = (en, hin, hi) => (lang === "hi" ? hi : lang === "hinglish" ? hin : en);

  // Whole-word + phrase matchers. (Substring matching caused false hits — e.g.
  // "hi" inside "hire", or "work" inside both "open to work" and the experience.)
  const tokens = new Set(q.split(/[^a-z0-9ऀ-ॿ]+/i).filter(Boolean));
  const word = (...ws) => ws.some((w) => tokens.has(w));
  const phrase = (...ps) => ps.some((p) => q.includes(p));

  if (!q) {
    return {
      text: t(
        "You pinged me and typed... nothing? 💀 Use your thumbs, genius.",
        "Ping kiya aur likha kuch nahi? 💀 Ungliyon ka istemaal kar, genius.",
        "पिंग किया और लिखा कुछ नहीं? 💀 उँगलियाँ चला, जीनियस।",
      ),
      mood: "confused",
      chips: QUICK_CHIPS,
    };
  }

  // — Insults → angry ——————————————————————————————————————————————————
  if (
    word("stupid", "dumb", "idiot", "useless", "trash", "noob", "bakwas", "bekar", "bekaar", "gandu", "chutiya", "sucks", "ugly", "loser", "faltu") ||
    phrase("shut up", "hate you", "i hate", "you suck")
  ) {
    return {
      text: t(
        "Ugh, rude! 😤 Attacking a friendly little chatbot? I'm telling Saurav. ...okay I'm not, I'm too nice. Wanna see his projects instead?",
        "Ugh, rude! 😤 Ek friendly chatbot pe attack? Main Saurav ko bata dunga. ...nahi bataunga, main bahut acha hoon. Projects dekhega?",
        "Ugh, rude! 😤 एक friendly chatbot पे attack? मैं सौरव को बता दूँगा। ...नहीं बताऊँगा, मैं बहुत अच्छा हूँ। Projects देखेगा?",
      ),
      mood: "angry",
      chips: ["Sorry 🥺", "Projects", "Skills"],
    };
  }

  // — Apology ——————————————————————————————————————————————————————————
  if (word("sorry", "apologize", "apologies", "apology", "maaf", "galti") || phrase("my bad")) {
    return {
      text: t(
        "...Yeah, you should be. 😤 Now ask something useful before I lose interest.",
        "...Hona bhi chahiye. 😤 Ab kuch kaam ki baat pooch, warna main nikla.",
        "...होना भी चाहिए। 😤 अब कुछ काम की बात पूछ, वरना मैं चला।",
      ),
      mood: "naughty",
      chips: QUICK_CHIPS,
    };
  }

  // — Compliments → happy ———————————————————————————————————————————————
  if (
    word("awesome", "amazing", "cool", "cute", "love", "great", "legend", "goat", "mast", "badhiya", "zabardast") ||
    phrase("good bot", "good boy", "best bot", "well done", "love you", "nice bot", "you rock", "love it")
  ) {
    return {
      text: t(
        "Obviously I'm awesome. 😏 I'm the best thing on this site and Saurav knows it. Anyway — what do you want?",
        "Obviously main mast hoon. 😏 Is site ki sabse badhiya cheez main hi hoon, Saurav ko bhi pata hai. Ab bol — kya chahiye?",
        "ज़ाहिर है मैं ज़बरदस्त हूँ। 😏 इस साइट की सबसे बढ़िया चीज़ मैं ही हूँ, सौरव को भी पता है। अब बोल — क्या चाहिए?",
      ),
      mood: "happy",
      chips: QUICK_CHIPS,
    };
  }

  // — Hire / contact (BEFORE experience, so "open to work" lands here) ——
  if (
    word("hire", "contact", "email", "reach", "phone", "call", "available", "availability", "freelance", "recruit", "mail", "collab", "collaborate", "sampark", "naukri") ||
    phrase("open to work", "work with", "get in touch", "reach out", "hire saurav", "kaam dena", "kaam doge", "job de", "how to reach", "is he free", "phone number")
  ) {
    return {
      text: t(
        `Ooh, now we're talking! ${BOT.emoji} Saurav is **open to freelance & full-time** work. Reach him:\n\n📧 ${PROFILE.email}\n📞 ${PROFILE.phones.join("  ·  ")}\n📍 ${PROFILE.location}\n\nGo on, make his day.`,
        `Ooh, ab baat bani! ${BOT.emoji} Saurav **freelance aur full-time dono** ke liye available hai. Sampark:\n\n📧 ${PROFILE.email}\n📞 ${PROFILE.phones.join("  ·  ")}\n📍 ${PROFILE.location}\n\nChal, uska din bana de.`,
        `Ooh, अब बात बनी! ${BOT.emoji} सौरव **freelance और full-time दोनों** के लिए available है। संपर्क:\n\n📧 ${PROFILE.email}\n📞 ${PROFILE.phones.join("  ·  ")}\n📍 ${PROFILE.location}\n\nचल, उसका दिन बना दे।`,
      ),
      mood: "happy",
      links: [
        { label: "Email Saurav", href: `mailto:${PROFILE.email}`, external: true },
        { label: "Call", href: telHref(PROFILE.phones[0]), external: true },
        { label: "LinkedIn", href: PROFILE.linkedin, external: true },
      ],
      chips: ["Projects", "Skills", "Resume"],
    };
  }

  // — Socials / profiles (his GitHub & LinkedIn accounts) ———————————————
  // Runs before project matching so "saurav github" gives his profile, while
  // "github ai analyzer" still reaches the project.
  if (
    (word("github", "linkedin", "socials", "twitter", "handle", "handles") ||
      phrase("github account", "github profile", "git hub", "social media", "social links", "linkedin profile")) &&
    !word("analyzer") &&
    !phrase("ai analyzer", "github ai")
  ) {
    return {
      text: t(
        `Here's where to find Saurav online:\n\n🐙 GitHub: ${PROFILE.github}\n💼 LinkedIn: ${PROFILE.linkedin}\n\nGo give him a follow — he'll pretend he doesn't care. 🙂`,
        `Saurav online yahan milega:\n\n🐙 GitHub: ${PROFILE.github}\n💼 LinkedIn: ${PROFILE.linkedin}\n\nFollow kar de — wo dikhayega ki farak nahi padta. 🙂`,
        `सौरव online यहाँ मिलेगा:\n\n🐙 GitHub: ${PROFILE.github}\n💼 LinkedIn: ${PROFILE.linkedin}\n\nFollow कर दे — वो दिखाएगा कि फ़र्क नहीं पड़ता। 🙂`,
      ),
      mood: "happy",
      links: [
        { label: "GitHub", href: PROFILE.github, external: true },
        { label: "LinkedIn", href: PROFILE.linkedin, external: true },
      ],
      chips: ["Projects", "Hire Saurav"],
    };
  }

  // — Projects (list, then a specific project by name) ——————————————————
  if (
    word("project", "projects") ||
    phrase("his work", "what did he build", "what has he built", "kaam dikha", "projects dikha", "kya banaya", "show me his work", "portfolio work")
  ) {
    const list = PROJECTS.map((p) => `• **${p.title}** — ${p.tagline || p.category}`).join("\n");
    return {
      text: t(
        `Ugh, show-off hours. Saurav's featured builds:\n\n${list}\n\nThere's a whole pile more pulled live from his GitHub. Go look 👇 and stop bothering me.`,
        `Uff, show-off time. Saurav ke featured projects:\n\n${list}\n\nAur bhi bohot saare uske GitHub se live aate hain. Jaa dekh 👇 aur mujhe pareshaan mat kar.`,
        `उफ़, show-off टाइम। सौरव के featured प्रोजेक्ट्स:\n\n${list}\n\nऔर भी बहुत सारे उसके GitHub से live आते हैं। जा देख 👇 और मुझे परेशान मत कर।`,
      ),
      mood: "naughty",
      links: [{ label: "See all projects", href: "/projects" }],
      chips: [...PROJECTS.slice(0, 3).map((p) => p.title), "Skills"],
    };
  }
  const proj = findProject(q);
  if (proj) return projectMsg(proj, t);

  // — Skills / tech ————————————————————————————————————————————————————
  if (
    word("skill", "skills", "tech", "stack", "framework", "frameworks", "language", "languages", "tool", "tools", "technologies", "technology") ||
    phrase("good at", "tech stack", "kya aata", "kya ata", "what can he do", "expert in")
  ) {
    return {
      text: t(
        `He's a **${PROFILE.role}** living in ${PROFILE.stack}. Full arsenal:\n\n${CORE_SKILLS.join(" · ")}\n\nAnd yes, he actually uses all of them — unlike whatever's on your resume. 😏`,
        `Wo **${PROFILE.role}** hai, ${PROFILE.stack} mein hi rehta hai. Pura arsenal:\n\n${CORE_SKILLS.join(" · ")}\n\nAur haan, ye sab sach mein use karta hai — tere resume jaisa nahi. 😏`,
        `वो **${PROFILE.role}** है, ${PROFILE.stack} में ही रहता है। पूरा arsenal:\n\n${CORE_SKILLS.join(" · ")}\n\nऔर हाँ, ये सब सच में use करता है — तेरे resume जैसा नहीं। 😏`,
      ),
      mood: "happy",
      chips: ["Projects", "Experience", "Hire Saurav"],
    };
  }

  // — Experience / work ————————————————————————————————————————————————
  if (
    word("experience", "job", "jobs", "company", "companies", "career", "empmonitor", "globussoft", "internship", "intern", "currently", "background") ||
    phrase("work experience", "where does he work", "currently working", "kaha kaam", "kaam karta", "work history")
  ) {
    const lines = JOURNEY.map((j) => `• **${j.role}** @ ${j.company} _(${j.period})_`).join("\n");
    return {
      text: t(
        `Saurav's track record (he made me memorize it, ugh):\n\n${lines}\n\nRight now he's frontend-ing at **Empmonitor**. Big-brain dashboard stuff. More than you'll do today.`,
        `Saurav ka record (mujhe yaad karwaya, uff):\n\n${lines}\n\nAbhi **Empmonitor** mein frontend sambhaal raha hai. Bade-bade dashboards. Tujhse zyada productive hai.`,
        `सौरव का record (मुझे याद करवाया, उफ़):\n\n${lines}\n\nअभी **Empmonitor** में frontend संभाल रहा है। बड़े-बड़े dashboards. तुझसे ज़्यादा productive है।`,
      ),
      mood: "naughty",
      links: [{ label: "Full story", href: "/about" }],
      chips: ["Education", "Skills", "Hire Saurav"],
    };
  }

  // — Education ————————————————————————————————————————————————————————
  if (
    word("education", "college", "degree", "study", "studied", "btech", "university", "school", "qualification", "qualifications", "padhai", "padha", "graduation", "graduate") ||
    phrase("b.tech", "b tech", "where did he study")
  ) {
    return {
      text: t(
        `He did his **B.Tech (2019–2023)** at Shri Shankaracharya Technical Campus, Bhilai. DSA, DBMS, OOP — the whole nerd starter pack. Came out fine. You? 🙄`,
        `Usne **B.Tech (2019–2023)** kiya Shri Shankaracharya Technical Campus, Bhilai se. DSA, DBMS, OOP — pura nerd pack. Theek-thaak nikla. Tu? 🙄`,
        `उसने **B.Tech (2019–2023)** किया Shri Shankaracharya Technical Campus, भिलाई से। DSA, DBMS, OOP — पूरा nerd पैक। ठीक-ठाक निकला। तू? 🙄`,
      ),
      mood: "naughty",
      links: [{ label: "About page", href: "/about" }],
      chips: ["Experience", "Projects"],
    };
  }

  // — Blogs ————————————————————————————————————————————————————————————
  if (
    word("blog", "blogs", "article", "articles", "writing", "writes", "wrote", "post", "posts", "likha") ||
    phrase("his writing", "kya likha", "does he write")
  ) {
    return {
      text: t(
        `He writes too?? Overachiever. Latest reads:\n\n${BLOGS.slice(0, 4).map((b) => `• **${b.title}**`).join("\n")}`,
        `Ye likhta bhi hai?? Overachiever. Latest blogs:\n\n${BLOGS.slice(0, 4).map((b) => `• **${b.title}**`).join("\n")}`,
        `ये लिखता भी है?? Overachiever। Latest blogs:\n\n${BLOGS.slice(0, 4).map((b) => `• **${b.title}**`).join("\n")}`,
      ),
      mood: "naughty",
      links: [
        { label: "All blogs", href: "/blogs" },
        { label: BLOGS[0].title, href: `/blogs/${BLOGS[0].slug}` },
      ],
      chips: ["Projects", "Skills"],
    };
  }

  // — Resume —————————————————————————————————————————————————————————————
  if (word("resume", "cv", "biodata", "curriculum")) {
    return {
      text: t(
        `His resume isn't lying around for randoms. 😏 Email him, he'll send it fast. Earn it.`,
        `Resume aise hi nahi milta randoms ko. 😏 Email kar, turant bhej dega. Kamaa.`,
        `Resume ऐसे ही नहीं मिलता randoms को। 😏 Email कर, तुरंत भेज देगा। कमा।`,
      ),
      mood: "naughty",
      links: [
        { label: "Email Saurav", href: `mailto:${PROFILE.email}`, external: true },
        { label: "LinkedIn", href: PROFILE.linkedin, external: true },
      ],
      chips: ["Hire Saurav", "Projects"],
    };
  }

  // — Location ——————————————————————————————————————————————————————————
  if (
    word("where", "location", "based", "city", "country", "place") ||
    phrase("where is he", "where does he live", "kaha rehta", "kahan rehta", "kaha se", "based in", "from where", "which city")
  ) {
    return {
      text: t(
        `He's in **${PROFILE.location}**. Works remote like a normal human. 🌍`,
        `Wo **${PROFILE.location}** mein hai. Remote kaam karta hai, normal insaan ki tarah. 🌍`,
        `वो **${PROFILE.location}** में है। Remote काम करता है, नॉर्मल इंसान की तरह। 🌍`,
      ),
      mood: "naughty",
      chips: ["Hire Saurav", "Experience"],
    };
  }

  // — Who are you (BEFORE "about", so "about you" lands here) ————————————
  if (
    phrase("who are you", "your name", "what are you", "who r u", "about you", "tu kaun", "tum kaun", "naam kya", "kaun ho") ||
    word("yourself")
  ) {
    return {
      text: t(
        `I'm **${BOT.name}** ${BOT.emoji} — Saurav's overly-friendly AI sidekick. I hang around this portfolio, greet visitors, and quietly judge their taste (lovingly). You seem cool, though.`,
        `Main **${BOT.name}** hoon ${BOT.emoji} — Saurav ka over-friendly AI sidekick. Is portfolio mein ghoomta hoon, visitors ko greet karta hoon, aur unki taste judge karta hoon (pyaar se). Tu thik lag raha hai waise.`,
        `मैं **${BOT.name}** हूँ ${BOT.emoji} — सौरव का over-friendly AI sidekick। इस portfolio में घूमता हूँ, visitors को greet करता हूँ, और उनकी taste judge करता हूँ (प्यार से)। तू ठीक लग रहा है वैसे।`,
      ),
      mood: "naughty",
      chips: ["About Saurav", "Projects", "Skills"],
    };
  }

  // — About Saurav ——————————————————————————————————————————————————————
  if (
    phrase("about saurav", "who is saurav", "tell me about saurav", "kaun hai saurav", "tell me about him", "about him") ||
    word("about", "saurav", "developer", "bio")
  ) {
    return {
      text: t(
        `**${PROFILE.name}** — a ${PROFILE.role} from ${PROFILE.location} who builds things that feel as good as they work. Mostly ${PROFILE.stack}. Obsessed with clean code and pixel-perfect UI. Built me too — clearly his best work. 😎`,
        `**${PROFILE.name}** — ${PROFILE.location} ka ${PROFILE.role}, jo aisi cheezein banata hai jo dikhti bhi mast hain aur chalti bhi. Zyaadatar ${PROFILE.stack}. Clean code aur pixel-perfect UI ka deewana. Mujhe bhi isne banaya — uska best kaam. 😎`,
        `**${PROFILE.name}** — ${PROFILE.location} का ${PROFILE.role}, जो ऐसी चीज़ें बनाता है जो दिखती भी मस्त हैं और चलती भी। ज़्यादातर ${PROFILE.stack}। Clean code और pixel-perfect UI का दीवाना। मुझे भी इसने बनाया — उसका best काम। 😎`,
      ),
      mood: "happy",
      links: [{ label: "About page", href: "/about" }],
      chips: ["Projects", "Skills", "Hire Saurav"],
    };
  }

  // — Services / pricing / process ——————————————————————————————————————
  if (
    word("price", "pricing", "cost", "charge", "charges", "rate", "rates", "budget", "timeline", "process", "maintenance", "retainer", "deadline") ||
    phrase("how much", "how do we start", "how do you price", "getting started", "good fit", "not a good fit", "after delivery", "how long")
  ) {
    return {
      text: t(
        `Down to business, I respect it. 😏\n\n**Process:** ${SERVICES.process}\n\n**Timeline:** ${SERVICES.timeline}\n\n**Pricing:** ${SERVICES.pricing}`,
        `Kaam ki baat, respect. 😏\n\n**Process:** ${SERVICES.process}\n\n**Timeline:** ${SERVICES.timeline}\n\n**Pricing:** ${SERVICES.pricing}`,
        `काम की बात, respect। 😏\n\n**Process:** ${SERVICES.process}\n\n**Timeline:** ${SERVICES.timeline}\n\n**Pricing:** ${SERVICES.pricing}`,
      ),
      mood: "happy",
      links: [{ label: "Email Saurav", href: `mailto:${PROFILE.email}`, external: true }],
      chips: ["Hire Saurav", "Projects"],
    };
  }

  // — Values / what he cares about ——————————————————————————————————————
  if (word("value", "values", "principles", "philosophy", "ethic", "ethics") || phrase("care about", "what matters", "what does he care", "what does he value", "work ethic")) {
    return {
      text: t(
        `What Saurav actually cares about:\n\n${ABOUT.values.map((v) => `• ${v}`).join("\n")}\n\nBasically a try-hard. In a good way. 😎`,
        `Saurav ko asal mein kya matter karta hai:\n\n${ABOUT.values.map((v) => `• ${v}`).join("\n")}\n\nMatlab pura try-hard hai. Achhe wale. 😎`,
        `सौरव को असल में क्या matter करता है:\n\n${ABOUT.values.map((v) => `• ${v}`).join("\n")}\n\nमतलब पूरा try-hard है। अच्छे वाले। 😎`,
      ),
      mood: "happy",
      links: [{ label: "About page", href: "/about" }],
      chips: ["Experience", "Hire Saurav"],
    };
  }

  // — Quick guide / help ————————————————————————————————————————————————
  if (
    word("guide", "help", "navigate", "menu", "options", "tour") ||
    phrase("quick guide", "guide me", "how to use", "what can you do", "what can i ask", "help me", "show me around", "walk me through", "what should i ask")
  ) {
    return {
      text: t(
        `Sure, let me play tour guide. 🙂 Here's what you can ask me about:\n\n• **Projects** — what Saurav has built\n• **Skills** — his tech stack\n• **Experience** — where he's worked\n• **Blogs** — stuff he's written\n• **Hire** — contact & availability\n\nJust type any of those (English, Hindi ya Hinglish), or tap the mic and talk to me.`,
        `Theek hai, main guide ban jaata hoon. 🙂 Ye sab pooch sakta hai:\n\n• **Projects** — Saurav ne kya banaya\n• **Skills** — uska tech stack\n• **Experience** — kaha kaam kiya\n• **Blogs** — kya likha\n• **Hire** — contact aur availability\n\nKuch bhi type kar (English, Hindi ya Hinglish), ya mic dabake bol.`,
        `ठीक है, मैं guide बन जाता हूँ। 🙂 ये सब पूछ सकता है:\n\n• **Projects** — सौरव ने क्या बनाया\n• **Skills** — उसका tech stack\n• **Experience** — कहाँ काम किया\n• **Blogs** — क्या लिखा\n• **Hire** — contact और availability\n\nकुछ भी type कर (English, हिंदी या Hinglish), या mic दबाके बोल।`,
      ),
      mood: "happy",
      chips: ["Projects", "Skills", "Hire Saurav"],
    };
  }

  // — Summary of the site / portfolio ———————————————————————————————————
  if (
    word("summary", "summarize", "summarise", "overview", "tldr", "brief", "recap", "gist") ||
    phrase("tl;dr", "in short", "sum up", "quick summary", "site summary", "summary of", "summarise the", "summarize the", "what is this site", "what's this site")
  ) {
    return {
      text: t(
        `Quick version: **${PROFILE.name}** is a **${PROFILE.role}** from ${PROFILE.location} who builds fast, polished web apps with ${PROFILE.stack}. He's worked at **Empmonitor** & **Globussoft**, ships side projects, writes the odd blog, and is open to freelance & full-time work. This site has it all — projects, skills, experience, blogs and a contact form. 🙂`,
        `Chhota version: **${PROFILE.name}** ek **${PROFILE.role}** hai ${PROFILE.location} se, jo ${PROFILE.stack} se fast aur polished web apps banata hai. **Empmonitor** & **Globussoft** mein kaam kiya, side projects banata hai, kabhi-kabhi blog likhta hai, aur freelance & full-time dono ke liye available hai. Is site pe sab hai — projects, skills, experience, blogs aur contact form. 🙂`,
        `छोटा version: **${PROFILE.name}** एक **${PROFILE.role}** है ${PROFILE.location} से, जो ${PROFILE.stack} से fast और polished web apps बनाता है। **Empmonitor** & **Globussoft** में काम किया, side projects बनाता है, कभी-कभी blog लिखता है, और freelance & full-time दोनों के लिए available है। इस site पे सब है — projects, skills, experience, blogs और contact form। 🙂`,
      ),
      mood: "happy",
      links: [
        { label: "Projects", href: "/projects" },
        { label: "About", href: "/about" },
      ],
      chips: ["Projects", "Hire Saurav"],
    };
  }

  // — Jokes / fun (rotates through the bank) ————————————————————————————
  if (word("joke", "jokes", "funny", "bored", "fun", "entertain", "majaak", "mazak", "hasaa", "hasao")) {
    const j = JOKES[jokeIdx % JOKES.length];
    jokeIdx += 1;
    return {
      text: t(j.en, j.hin, j.hi),
      mood: "happy",
      chips: ["Another joke 😂", "Projects", "Skills"],
    };
  }

  // — Thanks ————————————————————————————————————————————————————————————
  if (word("thanks", "thank", "thanx", "thx", "ty", "thankyou", "shukriya", "dhanyavad")) {
    return {
      text: t(
        "Yeah yeah, you're welcome. Don't make it weird. 😤",
        "Haan haan, koi na. Zyada emotional mat ho. 😤",
        "हाँ हाँ, कोई ना। ज़्यादा emotional मत हो। 😤",
      ),
      mood: "naughty",
      chips: QUICK_CHIPS,
    };
  }

  // — Bye ———————————————————————————————————————————————————————————————
  if (word("bye", "goodbye", "cya", "alvida") || phrase("see you", "good bye", "take care")) {
    return {
      text: t(
        "Finally. 😈 Go — the Projects page misses you more than I will. Shoo.",
        "Chalo finally. 😈 Jaa — Projects page tujhe mujhse zyada miss karega. Nikal.",
        "चलो finally। 😈 जा — Projects page तुझे मुझसे ज़्यादा miss करेगा। निकल।",
      ),
      mood: "naughty",
      links: [{ label: "Projects", href: "/projects" }],
    };
  }

  // — Small talk (how are you / what's up) ——————————————————————————————
  if (
    phrase("how are you", "how r u", "how are u", "how's it going", "hows it going", "how you doing", "how do you do", "whats up", "what's up", "wassup", "kaise ho", "kaisa hai", "kya haal", "kya chal raha", "how's life") ||
    word("wyd")
  ) {
    return {
      text: t(
        "Oh you know — living rent-free in someone's portfolio, greeting visitors, the usual glam bot life. I'm great, thanks for asking! 🙂 So, what do you wanna know about Saurav?",
        "Bas, kisi ke portfolio mein rent-free reh raha hoon, visitors ko greet kar raha hoon — wahi glam bot life. Main mast, poochne ke liye thanks! 🙂 Toh, Saurav ke baare mein kya jaanna hai?",
        "बस, किसी के portfolio में rent-free रह रहा हूँ, visitors को greet कर रहा हूँ — वही glam bot life। मैं मस्त, पूछने के लिए thanks! 🙂 तो, सौरव के बारे में क्या जानना है?",
      ),
      mood: "happy",
      chips: QUICK_CHIPS,
    };
  }

  // — Greeting (LOW priority so it never hijacks "hire", "this", etc.) ——
  if (word("hi", "hii", "hiii", "hello", "helo", "hey", "heya", "yo", "yoo", "sup", "namaste", "hola", "hyy")) {
    return {
      text: t(
        `Hey there! ${BOT.emoji} I'm **${BOT.name}**, Saurav's personal chatbot. Ask me about his projects, skills, experience or how to hire him — English, Hindi ya Hinglish.`,
        `Hey! ${BOT.emoji} Main **${BOT.name}** hoon, Saurav ka personal chatbot. Uske projects, skills, experience ya hire karne ke baare mein pooch — English, Hindi ya Hinglish.`,
        `Hey! ${BOT.emoji} मैं **${BOT.name}** हूँ, सौरव का personal chatbot। उसके projects, skills, experience या उसे hire करने के बारे में पूछ — English, हिंदी या Hinglish।`,
      ),
      mood: "naughty",
      chips: QUICK_CHIPS,
    };
  }

  // — Fallback ——————————————————————————————————————————————————————————
  return {
    text: t(
      "Hmm, you lost me there. 🙂 I'm just a little bot — try asking about **Projects**, **Skills**, **Experience** or **Hire Saurav**.",
      "Hmm, samajh nahi aaya. 🙂 Main chhota sa bot hoon — **Projects**, **Skills**, **Experience** ya **Hire Saurav** poochh ke dekh.",
      "Hmm, समझ नहीं आया। 🙂 मैं छोटा सा bot हूँ — **Projects**, **Skills**, **Experience** या **Hire Saurav** पूछ के देख।",
    ),
    mood: "confused",
    chips: QUICK_CHIPS,
  };
}
