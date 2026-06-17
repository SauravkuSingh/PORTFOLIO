"use client";

import { useId } from "react";
import { motion } from "framer-motion";

const SPRING = { type: "spring", stiffness: 260, damping: 16 };
const centerOrigin = { transformBox: "fill-box", transformOrigin: "center" };

// Eye expression per mood: [leftTilt, rightTilt] degrees, vertical squash, shift.
const EYE_CFG = {
  idle: { rot: [0, 0], sy: 1, dy: 0 },
  naughty: { rot: [0, 0], sy: 0.9, dy: 0 },
  angry: { rot: [22, -22], sy: 0.68, dy: 3 },
  confused: { rot: [-15, 7], sy: 1, dy: -1 },
  thinking: { rot: [0, 0], sy: 0.6, dy: -3 },
  talking: { rot: [0, 0], sy: 1, dy: 0 },
};

// Flame emojis that erupt upward from the head once anger boils over.
const ERUPT = [
  { x: 60, size: 22, delay: 0, rise: 30 },
  { x: 50, size: 17, delay: 0.28, rise: 24 },
  { x: 70, size: 17, delay: 0.48, rise: 24 },
  { x: 54, size: 14, delay: 0.66, rise: 34 },
  { x: 67, size: 14, delay: 0.86, rise: 34 },
  { x: 60, size: 19, delay: 0.16, rise: 38 },
];

function Eyes({ mood }) {
  if (mood === "happy") {
    // closed, smiling arcs ‿ ‿
    return (
      <g stroke="#fff" strokeWidth="7" strokeLinecap="round" fill="none">
        <path d="M45 61 Q52 52 59 61" />
        <path d="M61 61 Q68 52 75 61" />
      </g>
    );
  }
  const cfg = EYE_CFG[mood] || EYE_CFG.idle;
  return (
    <motion.g
      style={centerOrigin}
      animate={{ scaleY: [1, 1, 0.12, 1] }}
      transition={{ duration: 4.6, times: [0, 0.92, 0.96, 1], repeat: Infinity }}
    >
      <motion.rect
        x="48.5"
        y="52"
        width="7.5"
        height="16"
        rx="3.75"
        fill="#fff"
        style={centerOrigin}
        animate={{ rotate: cfg.rot[0], scaleY: cfg.sy, y: cfg.dy }}
        transition={SPRING}
      />
      <motion.rect
        x="64"
        y="52"
        width="7.5"
        height="16"
        rx="3.75"
        fill="#fff"
        style={centerOrigin}
        animate={{ rotate: cfg.rot[1], scaleY: cfg.sy, y: cfg.dy }}
        transition={SPRING}
      />
    </motion.g>
  );
}

/**
 * Sonic — a glossy, liquid gradient orb (Siri-style) with pill eyes.
 * @param {string} mood   idle|naughty|happy|angry|confused|thinking|talking
 * @param {number} level  anger level 0–10 → reddens & turns sun-like
 * @param {boolean} cooling  show the ice block / cool-down
 */
export default function Bot({ mood = "naughty", size = 64, className = "", level = 0, cooling = false }) {
  const uid = useId().replace(/:/g, "");
  const id = (n) => `${n}-${uid}`;

  // Effective anger level (mood "angry" counts as at least 1).
  const lvl = cooling ? 0 : Math.max(0, Math.min(10, Math.max(level, mood === "angry" ? 1 : 0)));
  const hot = lvl > 0;
  const redOpacity = Math.min(0.62, lvl * 0.07);
  const erupting = hot && lvl >= 3; // flames erupt after ~3 abuses
  const eruptCount = Math.min(ERUPT.length, Math.max(0, lvl - 2));
  const headFlameSize = 22 + Math.min(10, lvl) * 0.8;
  const shaking = !cooling && lvl >= 1;
  const shakeAmp = Math.min(2.8, 0.8 + lvl * 0.22);
  const eyeMood = cooling ? "happy" : hot ? "angry" : mood;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      aria-hidden="true"
      style={centerOrigin}
      animate={shaking ? { x: [0, -shakeAmp, shakeAmp, 0] } : { x: 0 }}
      transition={
        shaking
          ? { x: { duration: Math.max(0.1, 0.22 - lvl * 0.011), repeat: Infinity } }
          : { duration: 0.3 }
      }
    >
      <defs>
        <clipPath id={id("clip")}>
          <circle cx="60" cy="60" r="46" />
        </clipPath>
        <filter id={id("blur")} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <radialGradient id={id("base")} cx="50%" cy="38%" r="68%">
          <stop offset="0%" stopColor="#eaf6ff" />
          <stop offset="100%" stopColor="#cfe6fb" />
        </radialGradient>
        <radialGradient id={id("gloss")} cx="50%" cy="26%" r="42%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id("rim")} cx="50%" cy="50%" r="50%">
          <stop offset="80%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.18" />
        </radialGradient>
        <radialGradient id={id("sun")} cx="50%" cy="55%" r="62%">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="45%" stopColor="#fb5a33" />
          <stop offset="100%" stopColor="#dc2626" />
        </radialGradient>
      </defs>

      {/* faint dust particles */}
      <g fill={cooling ? "#bae6fd" : "#fcd34d"}>
        {[
          [16, 46], [24, 30], [40, 15], [60, 11], [80, 15], [98, 30],
          [106, 52], [101, 80], [82, 101], [58, 108], [34, 100], [15, 80],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 1.4 : 1} opacity="0.3" />
        ))}
      </g>

      {/* ORB */}
      <g clipPath={`url(#${id("clip")})`}>
        <circle cx="60" cy="60" r="46" fill={`url(#${id("base")})`} />

        {/* swirling colour blobs */}
        <motion.g
          filter={`url(#${id("blur")})`}
          style={centerOrigin}
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="42" cy="40" r="28" fill="#2f9bff" />
          <circle cx="32" cy="70" r="22" fill="#22d3ee" />
          <circle cx="86" cy="40" r="18" fill="#8b5cf6" />
          <circle cx="92" cy="64" r="28" fill="#ff5a33" />
          <circle cx="72" cy="80" r="18" fill="#f0529b" />
          <circle cx="54" cy="92" r="26" fill="#ec4899" />
        </motion.g>

        {/* glossy liquid highlights */}
        <g filter={`url(#${id("blur")})`}>
          <ellipse cx="46" cy="35" rx="20" ry="10" fill="#ffffff" opacity="0.7" />
          <ellipse cx="78" cy="52" rx="9" ry="20" fill="#ffffff" opacity="0.22" />
        </g>

        {/* anger heat wash — reddens & pulses harder with level */}
        {hot && (
          <motion.circle
            cx="60"
            cy="60"
            r="46"
            fill={`url(#${id("sun")})`}
            animate={{ opacity: [redOpacity * 0.7, redOpacity, redOpacity * 0.7] }}
            transition={{ duration: Math.max(0.3, 0.7 - lvl * 0.03), repeat: Infinity }}
          />
        )}

        {/* cool-down frost */}
        {cooling && <circle cx="60" cy="60" r="46" fill="#7dd3fc" opacity="0.4" />}

        <circle cx="60" cy="60" r="46" fill={`url(#${id("gloss")})`} />
        <circle cx="60" cy="60" r="46" fill={`url(#${id("rim")})`} />
      </g>

      {/* crisp rim */}
      <circle cx="60" cy="60" r="46" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1.2" />

      {/* eyes */}
      <Eyes mood={eyeMood} />

      {/* Flame emoji on the head when angry */}
      {hot && (
        <motion.text
          x="60"
          y="22"
          fontSize={headFlameSize}
          textAnchor="middle"
          style={centerOrigin}
          animate={{ rotate: [-7, 7, -7], scale: [1, 1.12, 0.96, 1.08, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
        >
          🔥
        </motion.text>
      )}

      {/* Flames erupt upward after a few abuses */}
      {erupting &&
        ERUPT.slice(0, eruptCount).map((e, i) => (
          <motion.text
            key={i}
            x={e.x}
            y="24"
            fontSize={e.size}
            textAnchor="middle"
            style={centerOrigin}
            animate={{ y: [0, -e.rise], opacity: [0, 1, 0], scale: [0.5, 1.1, 0.6] }}
            transition={{ duration: 0.95, repeat: Infinity, delay: e.delay, ease: "easeOut" }}
          >
            🔥
          </motion.text>
        ))}

      {/* ICE BLOCK on the head while cooling down */}
      {cooling && (
        <motion.g
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: [0, -2.5, 0], opacity: 1 }}
          transition={{
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 0.3 },
          }}
          style={centerOrigin}
        >
          <path d="M60 2 L80 14 L60 26 L40 14 Z" fill="#e0f2fe" />
          <path d="M40 14 L60 26 L60 44 L40 32 Z" fill="#7dd3fc" />
          <path d="M60 26 L80 14 L80 32 L60 44 Z" fill="#38bdf8" />
          <path d="M47 13 L60 7 L66 10.5" stroke="#ffffff" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.85" />
          <circle cx="33" cy="20" r="1.6" fill="#ffffff" />
          <circle cx="89" cy="22" r="1.4" fill="#ffffff" />
          <circle cx="70" cy="5" r="1.2" fill="#e0f2fe" />
        </motion.g>
      )}

      {/* confused floating ? */}
      {mood === "confused" && !cooling && !hot && (
        <motion.text
          x="100"
          y="30"
          fontSize="22"
          fontWeight="bold"
          fill="#7c3aed"
          textAnchor="middle"
          style={centerOrigin}
          animate={{ y: [0, -6, 0], rotate: [-6, 10, -6], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          ?
        </motion.text>
      )}
    </motion.svg>
  );
}
