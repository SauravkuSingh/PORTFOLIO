"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, HelpCircle } from "lucide-react";

const FAQS = [
  {
    q: "How do we start working together?",
    a: [
      {
        type: "p",
        text: "Pretty simple. You drop me a message with what you're trying to build — the more context the better. We hop on a 20–30 minute call to align on scope, timeline, and goals. If it's a fit, I send a proposal with deliverables, milestones, and pricing. Once that's signed and the deposit is in, we kick off — usually within a week.",
      },
    ],
  },
  {
    q: "What's your typical project timeline?",
    a: [
      {
        type: "p",
        text: "It depends on scope, but a rough guide: landing pages and marketing sites take 1–2 weeks. Mid-size web apps or dashboards take 4–8 weeks. Larger product builds or revamps run longer and I usually break them into phases so you see progress every couple of weeks instead of waiting months for a big reveal.",
      },
    ],
  },
  {
    q: "How do you price your work?",
    a: [
      { type: "p", text: "Three models depending on the project:" },
      {
        type: "ul",
        items: [
          "Fixed price for well-scoped projects where the requirements are clear upfront.",
          "Hourly for smaller tasks, bug fixes, or work where scope is still evolving.",
          "Monthly retainer for ongoing partnerships — ideal if you need consistent frontend support without re-negotiating every time.",
        ],
      },
      {
        type: "p",
        text: "Most projects start at [₹XX,XXX]. I'm happy to share a ballpark on our first call once I understand what you need.",
      },
    ],
  },
  {
    q: "What kind of projects aren't a good fit?",
    a: [
      {
        type: "p",
        text: "Being honest saves us both time. I'm probably not your person if you're looking for:",
      },
      {
        type: "ul",
        items: [
          "WordPress, Wix, or no-code site builds",
          "Native iOS / Android apps",
          "Pure graphic or brand design",
          "Projects with no clear scope or decision-maker",
        ],
      },
      {
        type: "p",
        text: "If you're building a modern web product, revamping an existing one, or need a reliable frontend partner — that's exactly the work I do best.",
      },
    ],
  },
  {
    q: "What happens after the project is delivered?",
    a: [
      {
        type: "p",
        text: "Every project includes a [2-week] post-launch window where I fix any bugs that come up at no extra cost. After that, I offer optional maintenance retainers if you want ongoing support, updates, or new features. You also get clean handover docs, a tidy repo, and full access to everything — no lock-in.",
      },
    ],
  },
];

// Build a plain-text version of each answer for FAQPage JSON-LD
const answerToPlainText = (blocks) =>
  blocks
    .map((b) => {
      if (b.type === "p") return b.text;
      if (b.type === "ul") return b.items.map((i) => `• ${i}`).join(" ");
      return "";
    })
    .join(" ");

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: answerToPlainText(f.a),
    },
  })),
};

const renderBlocks = (blocks) =>
  blocks.map((block, i) => {
    if (block.type === "p") {
      return (
        <p key={i} className="text-sm sm:text-base text-gray-400 leading-relaxed">
          {block.text}
        </p>
      );
    }
    if (block.type === "ul") {
      return (
        <ul
          key={i}
          className="space-y-1.5 list-disc list-inside marker:text-violet-400 text-sm sm:text-base text-gray-400 leading-relaxed"
        >
          {block.items.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      );
    }
    return null;
  });

const FaqItem = ({ q, a, isOpen, onToggle, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{
      duration: 0.5,
      delay: index * 0.05,
      ease: [0.16, 1, 0.3, 1],
    }}
    className={`rounded-2xl border backdrop-blur-xl shadow-lg overflow-hidden transition-colors ${
      isOpen
        ? "border-violet-400/30 bg-[#0a0a0a]/80"
        : "border-white/10 bg-[#0a0a0a]/60 hover:border-white/20"
    }`}
  >
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
    >
      <span
        className={`text-base sm:text-lg font-semibold tracking-tight transition-colors ${
          isOpen ? "text-white" : "text-gray-100"
        }`}
      >
        {q}
      </span>
      <motion.span
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
        className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
          isOpen
            ? "bg-violet-500/20 border-violet-400/40 text-violet-300"
            : "bg-white/5 border-white/10 text-gray-300"
        }`}
      >
        <Plus className="w-4 h-4" />
      </motion.span>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <div className="px-5 sm:px-6 pb-6 space-y-3">
            {renderBlocks(a)}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative z-2 px-6 sm:px-10 py-12 lg:py-20 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] bg-violet-600/10 rounded-full blur-[140px]" />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg mb-6"
          >
            <HelpCircle className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs font-medium text-gray-300 tracking-wide">
              FAQ
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white leading-[1.05]"
          >
            Questions,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 animate-gradient">
              answered
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-gray-400 max-w-xl mt-5 leading-relaxed"
          >
            Everything you might want to know before we start working together.
            If something's missing, just ask.
          </motion.p>
        </div>

        {/* List */}
        <div className="space-y-3">
          {FAQS.map((item, i) => (
            <FaqItem
              key={i}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              {...item}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
