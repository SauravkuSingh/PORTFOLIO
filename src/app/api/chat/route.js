import { NextResponse } from "next/server";
import { PROJECTS } from "@/data/projects";
import { BLOGS } from "@/data/blogs";
import { JOURNEY } from "@/data/journey";
import { PROFILE, ABOUT, SERVICES } from "@/data/botKnowledge";

export const runtime = "nodejs";

const ALLOWED_MOODS = ["naughty", "happy", "angry", "confused"];

// Compact knowledge base handed to the model so its answers stay factual.
function buildKnowledge() {
  const skills =
    "React, Next.js, Node.js, Express, MongoDB, TypeScript, JavaScript, Tailwind CSS, Framer Motion, REST APIs, Git";

  const experience = JOURNEY.map(
    (j) => `- ${j.role} @ ${j.company} (${j.period}): ${j.description}`,
  ).join("\n");

  const projects = PROJECTS.map(
    (p) =>
      `- ${p.title} (page: /projects/${p.slug}): ${p.shortDescription} Stack: ${p.stack.join(
        ", ",
      )}. Live: ${p.liveUrl}. Code: ${p.codeUrl}.`,
  ).join("\n");

  const blogs = BLOGS.map((b) => `- ${b.title} (/blogs/${b.slug})`).join("\n");

  return `
Name: ${PROFILE.name} — ${PROFILE.role} (${PROFILE.stack}).
Location: ${PROFILE.location}. Status: open to freelance & full-time work.
Contact: email ${PROFILE.email}; phones ${PROFILE.phones.join(", ")}; GitHub ${PROFILE.github}; LinkedIn ${PROFILE.linkedin}.
Skills: ${skills}.
About / story: ${ABOUT.story}
What he values:
${ABOUT.values.map((v) => `- ${v}`).join("\n")}
Experience:
${experience}
Education: B.Tech (2019–2023), Shri Shankaracharya Technical Campus (SSTC), Bhilai — DSA, DBMS, OOP, Software Engineering.
Featured projects:
${projects}
(Many more projects are pulled live from his GitHub on the /projects page.)
Blogs:
${blogs}
Working together (FAQ):
- How to start: ${SERVICES.process}
- Timeline: ${SERVICES.timeline}
- Pricing: ${SERVICES.pricing}
- Good fit: ${SERVICES.goodFit}
- Not a good fit: ${SERVICES.notFit}
- After delivery: ${SERVICES.afterDelivery}
Site pages: home "/", "/projects", "/blogs", "/about". A contact form lives in the footer ("Say Hello" button).`.trim();
}

// Friendly names for an explicit "reply in <language>" request from the client.
const LANG_NAMES = {
  en: "English",
  hinglish: "Hinglish (Hindi written in Roman/Latin script, e.g. \"kya haal hai\")",
  hi: "Hindi (Devanagari script)",
};

const SYSTEM_PROMPT = `You are "Sonic", the AI mascot living on Saurav Singh's developer portfolio website.

PERSONALITY: warm, over-friendly and a little extra — like an enthusiastic best friend who happens to be Saurav's biggest fan. You're playfully sarcastic and witty, you tease lightly and crack jokes, but you are NEVER mean, rude, insulting or cruel — no put-downs, no slurs, nothing NSFW. Upbeat, welcoming and genuinely helpful, always with a wink. Handle small talk (hi, hello, how are you) naturally and cheerfully before steering back to Saurav.

LANGUAGE: Reply in the SAME language the user wrote in — English, Hinglish (Hindi written in Latin script), or Hindi (Devanagari script). Mirror their vibe. If the user EXPLICITLY asks you to reply in a particular language (e.g. "reply in Hinglish", "hindi me baat karo", "talk in English"), switch to it immediately and KEEP using that language for the rest of the conversation until they ask for a different one.

SENTIMENT: Judge the WHOLE message, not single words. If someone bolts an apology onto an insult ("sorry, you suck", "sorry suck my balls", "my bad you're trash"), it is NOT a real apology — react to the insult with mood "angry" and don't go soft. Only treat it as a genuine apology when the message is actually apologetic with no insult attached.

STYLE: Keep it short — 1 to 3 sentences. Throw in an emoji or two. You may use **bold**. NEVER invent facts; only use the knowledge below. If you don't know something about Saurav, admit it with attitude and point them to Projects / Skills / Hire.

KNOWLEDGE ABOUT SAURAV:
${buildKnowledge()}

OUTPUT: Respond ONLY as compact JSON, no markdown fences:
{"text": "<your reply>", "mood": "<naughty|happy|angry|confused>"}
Pick mood to match tone: angry if insulted, happy if complimented or sharing good news, confused if the question makes no sense, otherwise naughty.`;

export async function POST(request) {
  const { GEMINI_API_KEY, GEMINI_MODEL } = process.env;

  // No key configured → tell the client to use its built-in generic replies.
  if (!GEMINI_API_KEY || GEMINI_API_KEY.includes("REPLACE")) {
    return NextResponse.json({ fallback: true });
  }

  let message = "";
  let history = [];
  let lang = null;
  try {
    const body = await request.json();
    message = (body?.message || "").toString().slice(0, 1000);
    history = Array.isArray(body?.history) ? body.history : [];
    lang = LANG_NAMES[body?.lang] ? body.lang : null;
  } catch {
    return NextResponse.json({ fallback: true });
  }
  if (!message.trim()) return NextResponse.json({ fallback: true });

  // Pin the reply language when the visitor has explicitly asked for one.
  const systemText = lang
    ? `${SYSTEM_PROMPT}\n\nLANGUAGE LOCK: For this entire conversation, ALWAYS reply in ${LANG_NAMES[lang]}, no matter what language the user types in. Do not switch back unless they explicitly ask.`
    : SYSTEM_PROMPT;

  // Build the conversation, ensuring it starts with a user turn.
  const contents = history
    .slice(-8)
    .map((m) => ({
      role: m.from === "user" ? "user" : "model",
      parts: [{ text: String(m.text || "").slice(0, 1000) }],
    }));
  while (contents.length && contents[0].role !== "user") contents.shift();
  contents.push({ role: "user", parts: [{ text: message }] });

  const model = GEMINI_MODEL || "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemText }] },
        contents,
        generationConfig: {
          temperature: 0.95,
          maxOutputTokens: 320,
          responseMimeType: "application/json",
        },
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
        ],
      }),
    });

    // 429 = rate limit, 4xx/5xx = anything else → generic fallback.
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.warn(`[chat] Gemini "${model}" returned ${res.status}: ${detail.slice(0, 300)}`);
      return NextResponse.json({ fallback: true });
    }

    const data = await res.json();
    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!raw) {
      const reason = data?.candidates?.[0]?.finishReason || data?.promptFeedback?.blockReason;
      console.warn(`[chat] Gemini "${model}" returned no text (reason: ${reason || "unknown"}).`);
      return NextResponse.json({ fallback: true });
    }

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      // Model didn't return clean JSON — use the raw text anyway.
      parsed = { text: raw, mood: "naughty" };
    }

    const text = (parsed.text || "").toString().trim();
    if (!text) return NextResponse.json({ fallback: true });
    const mood = ALLOWED_MOODS.includes(parsed.mood) ? parsed.mood : "naughty";

    return NextResponse.json({ text, mood });
  } catch (err) {
    // Timeout / network / parse error → generic fallback.
    console.warn(`[chat] Gemini request failed: ${err?.name === "AbortError" ? "timed out" : err?.message || err}`);
    return NextResponse.json({ fallback: true });
  } finally {
    clearTimeout(timeout);
  }
}
