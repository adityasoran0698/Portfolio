import { useState, useEffect, useRef, useCallback } from "react";
import backgroundImage from "./image.png";
import MyCV from "./CV.pdf";

/* ═══════════════════════════════════════════════════════════════════════════
   GLOBAL CSS
═══════════════════════════════════════════════════════════════════════════ */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&family=Syne:wght@400;600;700;800&family=Outfit:wght@400;600;700;800;900&display=swap');

  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior:smooth; }
  body { background:#160b00; overflow-x:hidden; }
  ::-webkit-scrollbar { width:5px; }
  ::-webkit-scrollbar-track { background:#160b00; }
  ::-webkit-scrollbar-thumb { background:#f26522; border-radius:3px; }

  @keyframes floatY       { 0%,100%{transform:translateY(0) rotate(var(--rot,0deg))} 50%{transform:translateY(-18px) rotate(var(--rot,0deg))} }
  @keyframes floatSlow    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes spinRing     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes spinRingRev  { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
  @keyframes fadeUp       { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulseGlow    { 0%,100%{box-shadow:0 8px 30px rgba(242,101,34,.4)} 50%{box-shadow:0 8px 55px rgba(242,101,34,.75)} }
  @keyframes loadFadeIn   { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  @keyframes netflixBgFade    { 0%{opacity:1} 80%{opacity:1} 100%{opacity:0} }
  @keyframes netflixLetterZoom{ 0%{transform:scale(.7);opacity:0} 12%{transform:scale(.85);opacity:1} 70%{transform:scale(7);opacity:1} 88%{transform:scale(12);opacity:0} 100%{transform:scale(14);opacity:0} }
  @keyframes netflixSoundWave { 0%,100%{height:4px} 50%{height:20px} }
  @keyframes netflixGlow      { 0%{text-shadow:0 0 20px rgba(242,101,34,.3)} 40%{text-shadow:0 0 60px rgba(242,101,34,.9),0 0 120px rgba(242,101,34,.5)} 70%{text-shadow:0 0 100px rgba(242,101,34,1),0 0 200px rgba(242,101,34,.7)} 100%{text-shadow:0 0 20px rgba(242,101,34,.1)} }
  @keyframes siteReveal   { from{opacity:0;transform:scale(1.04)} to{opacity:1;transform:scale(1)} }
  @keyframes abGlowFloat  { 0%,100%{transform:translateY(0) scale(1);opacity:.6} 50%{transform:translateY(-18px) scale(1.04);opacity:.9} }
  @keyframes sk2Up        { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes heroNavFade  { from{opacity:0;transform:translateY(-14px)} to{opacity:1;transform:translateY(0)} }
  @keyframes slideTrack   { 0%{transform:translateX(var(--from))} 100%{transform:translateX(var(--to))} }
  @keyframes lgPulse      { 0%,100%{box-shadow:0 0 0 1px rgba(242,101,34,.3),0 8px 40px rgba(0,0,0,.6),0 0 60px rgba(242,101,34,.08)} 50%{box-shadow:0 0 0 1px rgba(242,101,34,.6),0 8px 50px rgba(0,0,0,.7),0 0 80px rgba(242,101,34,.18)} }
  @keyframes shimmer      { 0%{background-position:200% center} 100%{background-position:-200% center} }
  @keyframes cardFlip     { from{opacity:0;transform:translateY(16px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes skillPop     { from{opacity:0;transform:scale(.88) translateY(8px)} to{opacity:1;transform:scale(1) translateY(0)} }
  @keyframes countUp      { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }

  .fu  { animation:fadeUp .6s ease both; }
  .fu1 { animation-delay:.05s; }
  .fu2 { animation-delay:.18s; }
  .fu3 { animation-delay:.32s; }
  .fu4 { animation-delay:.46s; }
  .site-enter { animation:siteReveal .8s ease both; }

  .btn-primary { animation:pulseGlow 2.5s ease-in-out infinite; transition:transform .2s ease,filter .2s ease; }
  .btn-primary:hover { transform:scale(1.06); filter:brightness(1.12); }
  .btn-ghost { transition:background .2s ease,border-color .2s ease; }
  .btn-ghost:hover { background:rgba(242,101,34,.1)!important; border-color:rgba(242,101,34,.7)!important; }

  .hn-link {
    padding:8px 18px; border-radius:50px;
    font-family:'Plus Jakarta Sans',sans-serif; font-size:13.5px; font-weight:600;
    letter-spacing:-0.01em; text-decoration:none; white-space:nowrap;
    transition:color .2s ease,background .2s ease,box-shadow .2s ease;
    cursor:pointer;
  }
  .hn-link:hover:not(.hn-active) { color:rgba(255,255,255,.95)!important; background:rgba(255,255,255,.09)!important; }
  .hn-active { background:linear-gradient(135deg,#f26522,#c04a00)!important; color:#fff!important; font-weight:700!important; box-shadow:0 4px 18px rgba(242,101,34,.45),inset 0 1px 0 rgba(255,255,255,.25); }
  .hn-cv { transition:background .22s,border-color .22s,transform .2s; }
  .hn-cv:hover { background:rgba(242,101,34,.1)!important; border-color:rgba(242,101,34,.6)!important; transform:translateY(-1px); }

  .lg-nav {
    animation: lgPulse 3.5s ease-in-out infinite;
    transition: transform 0.5s cubic-bezier(.34,1.28,.64,1), opacity 0.4s ease;
  }
  .lg-nav-link {
    position:relative; display:flex; align-items:center;
    padding:8px 16px; border-radius:50px;
    font-family:'Plus Jakarta Sans',sans-serif; font-size:12.5px; font-weight:600;
    letter-spacing:-0.01em; text-decoration:none; white-space:nowrap;
    transition:color .22s ease, background .22s ease, transform .22s cubic-bezier(.34,1.56,.64,1);
    cursor:pointer; overflow:hidden;
  }
  .lg-nav-link::before {
    content:''; position:absolute; inset:0; border-radius:50px;
    background:linear-gradient(135deg,rgba(255,255,255,.18),rgba(255,255,255,.04));
    opacity:0; transition:opacity .22s ease;
  }
  .lg-nav-link:hover::before { opacity:1; }
  .lg-nav-link:hover:not(.lg-active) { color:rgba(255,255,255,.9)!important; transform:translateY(-2px); }
  .lg-active {
    background:linear-gradient(135deg,rgba(242,101,34,.9),rgba(192,74,0,.85))!important;
    color:#fff!important;
    box-shadow:0 4px 20px rgba(242,101,34,.55),inset 0 1px 0 rgba(255,255,255,.3),inset 0 -1px 0 rgba(0,0,0,.15);
  }

  .ab-info-card { transition:transform .28s ease,box-shadow .28s ease,border-color .28s ease; cursor:default; }
  .ab-info-card:hover { transform:translateY(-6px); box-shadow:0 20px 50px rgba(242,101,34,.18)!important; border-color:rgba(242,101,34,.35)!important; }

  .sk-chip {
    transition: transform .22s cubic-bezier(.34,1.56,.64,1), box-shadow .22s ease, border-color .22s ease, background .22s ease;
  }
  .sk-chip:hover {
    transform: translateY(-3px) scale(1.05);
  }

  .sk-card { transition:transform .28s ease,box-shadow .28s ease,border-color .28s ease; }
  .sk-card:hover { transform:translateY(-5px); box-shadow:0 20px 48px rgba(242,101,34,.2)!important; border-color:rgba(242,101,34,.4)!important; }

  .proj-card-new { transition:transform .28s ease,box-shadow .28s ease; }
  .proj-card-new:hover { transform:translateY(-6px); box-shadow:0 24px 60px rgba(242,101,34,.22)!important; }
`;

/* ═══════════════════════════════════════════════════════════════════════════
   SVG ICONS — REAL BRAND/TECH ICONS (no emojis)
═══════════════════════════════════════════════════════════════════════════ */
const Icons = {
  React: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="3" fill="#61DAFB" />
      <ellipse
        cx="16"
        cy="16"
        rx="14"
        ry="5.5"
        stroke="#61DAFB"
        strokeWidth="1.5"
        fill="none"
      />
      <ellipse
        cx="16"
        cy="16"
        rx="14"
        ry="5.5"
        stroke="#61DAFB"
        strokeWidth="1.5"
        fill="none"
        transform="rotate(60 16 16)"
      />
      <ellipse
        cx="16"
        cy="16"
        rx="14"
        ry="5.5"
        stroke="#61DAFB"
        strokeWidth="1.5"
        fill="none"
        transform="rotate(120 16 16)"
      />
    </svg>
  ),
  Python: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path
        d="M15.9 3C10.6 3 11 5.4 11 5.4V8h5v1H7.5S3 8.5 3 14s4 5.5 4 5.5H9v-2.6S8.9 13 12 13h7s3-.05 3-3V6s.5-3-6.1-3zm-1.4 1.8a1.1 1.1 0 110 2.2 1.1 1.1 0 010-2.2z"
        fill="#3776AB"
      />
      <path
        d="M16.1 29c5.3 0 4.9-2.4 4.9-2.4V24h-5v-1h8.5S29 23.5 29 18s-4-5.5-4-5.5H23v2.6S23.1 19 20 19h-7s-3 .05-3 3v4s-.5 3 6.1 3zm1.4-1.8a1.1 1.1 0 110-2.2 1.1 1.1 0 010 2.2z"
        fill="#FFD43B"
      />
    </svg>
  ),
  MongoDB: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path
        d="M16 2C10 2 8 9.5 8 14c0 3.6 1.8 6.7 4.5 8.4L13 28h6l.5-5.6C22.2 20.7 24 17.6 24 14 24 9.5 22 2 16 2z"
        fill="#47A248"
      />
      <path
        d="M16 4v22"
        stroke="#fff"
        strokeWidth="1.5"
        opacity="0.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  SQL: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="6" fill="#00758F" />
      <ellipse cx="16" cy="9" rx="9" ry="4" fill="#F29111" opacity="0.9" />
      <path
        d="M7 9v5c0 2.2 4 4 9 4s9-1.8 9-4V9"
        stroke="#F29111"
        strokeWidth="1.5"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M7 14v5c0 2.2 4 4 9 4s9-1.8 9-4v-5"
        stroke="#F29111"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
    </svg>
  ),
  Robot: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect x="6" y="12" width="20" height="14" rx="4" fill="#A78BFA" />
      <rect x="10" y="16" width="4" height="4" rx="1" fill="white" />
      <rect x="18" y="16" width="4" height="4" rx="1" fill="white" />
      <rect
        x="12"
        y="22"
        width="8"
        height="2"
        rx="1"
        fill="white"
        opacity="0.6"
      />
      <rect x="14" y="8" width="4" height="5" rx="1" fill="#A78BFA" />
      <circle
        cx="16"
        cy="7"
        r="2.5"
        fill="#A78BFA"
        stroke="#7C3AED"
        strokeWidth="1"
      />
      <rect x="2" y="17" width="3" height="6" rx="1.5" fill="#A78BFA" />
      <rect x="27" y="17" width="3" height="6" rx="1.5" fill="#A78BFA" />
    </svg>
  ),
  Crystal: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <polygon
        points="16,3 26,10 26,22 16,29 6,22 6,10"
        fill="#34D399"
        opacity="0.9"
      />
      <polygon points="16,3 26,10 16,16" fill="#6EE7B7" opacity="0.7" />
      <polygon points="6,10 16,16 16,29" fill="#059669" opacity="0.8" />
      <polygon points="26,10 26,22 16,16" fill="#10B981" opacity="0.6" />
    </svg>
  ),
  Lightning: ({ size = 22, color = "#f26522" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M13 2L4.5 13.5H11L10 22L20.5 10H14L13 2z" />
    </svg>
  ),
  Mail: ({ size = 16 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  ),
  CV: ({ size = 15 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  ),
  // Real tech icons for skill badges
  LangChain: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#1C1C1C" />
      <path
        d="M8 16c0-4.4 3.6-8 8-8s8 3.6 8 8"
        stroke="#1DB954"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M8 16c0 4.4 3.6 8 8 8"
        stroke="#f26522"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="16" cy="16" r="2.5" fill="#1DB954" />
      <circle cx="8" cy="16" r="2" fill="#f26522" />
      <circle cx="24" cy="16" r="2" fill="#1DB954" />
    </svg>
  ),
  OpenAI: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#10a37f" />
      <path
        d="M22.3 13.1a5.5 5.5 0 00-.4-4.5 5.6 5.6 0 00-6-2.7A5.6 5.6 0 0011.7 4a5.6 5.6 0 00-5.3 3.8 5.5 5.5 0 00-3.7 2.7 5.6 5.6 0 00.7 6.6 5.5 5.5 0 00.4 4.5 5.6 5.6 0 006 2.7 5.6 5.6 0 004.2 1.9 5.6 5.6 0 005.3-3.9 5.5 5.5 0 003.7-2.7 5.6 5.6 0 00-.7-6.5z"
        fill="white"
        opacity="0.9"
      />
    </svg>
  ),
  VectorDB: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#0f172a" />
      <ellipse cx="16" cy="10" rx="9" ry="3.5" fill="#6366f1" opacity="0.8" />
      <path
        d="M7 10v6c0 1.9 4 3.5 9 3.5s9-1.6 9-3.5v-6"
        stroke="#6366f1"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M7 16v6c0 1.9 4 3.5 9 3.5s9-1.6 9-3.5v-6"
        stroke="#6366f1"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />
    </svg>
  ),
  LangGraph: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#1a0a2e" />
      <circle cx="16" cy="16" r="3" fill="#A78BFA" />
      <circle cx="8" cy="10" r="2.5" fill="#A78BFA" opacity="0.7" />
      <circle cx="24" cy="10" r="2.5" fill="#A78BFA" opacity="0.7" />
      <circle cx="8" cy="22" r="2.5" fill="#A78BFA" opacity="0.7" />
      <circle cx="24" cy="22" r="2.5" fill="#A78BFA" opacity="0.7" />
      <line
        x1="13"
        y1="15"
        x2="10"
        y2="11.5"
        stroke="#A78BFA"
        strokeWidth="1.2"
        opacity="0.5"
      />
      <line
        x1="19"
        y1="15"
        x2="22"
        y2="11.5"
        stroke="#A78BFA"
        strokeWidth="1.2"
        opacity="0.5"
      />
      <line
        x1="13"
        y1="17"
        x2="10"
        y2="20.5"
        stroke="#A78BFA"
        strokeWidth="1.2"
        opacity="0.5"
      />
      <line
        x1="19"
        y1="17"
        x2="22"
        y2="20.5"
        stroke="#A78BFA"
        strokeWidth="1.2"
        opacity="0.5"
      />
    </svg>
  ),
  NodeJS: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path
        d="M16 3L4 9.5v13L16 29l12-6.5v-13L16 3z"
        fill="#339933"
        opacity="0.15"
      />
      <path
        d="M16 5L5.5 10.7v10.6L16 27l10.5-5.7V10.7L16 5z"
        stroke="#339933"
        strokeWidth="1.5"
        fill="none"
      />
      <text
        x="10"
        y="21"
        fontFamily="monospace"
        fontSize="11"
        fontWeight="bold"
        fill="#339933"
      >
        JS
      </text>
    </svg>
  ),
  FastAPI: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#009688" opacity="0.15" />
      <rect
        width="32"
        height="32"
        rx="8"
        stroke="#009688"
        strokeWidth="1.5"
        fill="none"
      />
      <path d="M17 6l-8 12h7l-3 8 10-14h-7l1-6z" fill="#009688" />
    </svg>
  ),
  Docker: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#0db7ed" opacity="0.1" />
      <rect x="5" y="14" width="4" height="4" rx="1" fill="#0db7ed" />
      <rect x="10" y="14" width="4" height="4" rx="1" fill="#0db7ed" />
      <rect x="15" y="14" width="4" height="4" rx="1" fill="#0db7ed" />
      <rect x="10" y="9" width="4" height="4" rx="1" fill="#0db7ed" />
      <rect x="15" y="9" width="4" height="4" rx="1" fill="#0db7ed" />
      <path
        d="M26.5 16.5s-.5-2-2.5-1.5c0 0-.5-3-4-2.5"
        stroke="#0db7ed"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M3 19s1 4 7 3.5h10c3 0 5-2 5-4.5"
        stroke="#0db7ed"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  ),
  Git: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#F05032" opacity="0.1" />
      <path
        d="M29 14.6L17.4 3a1.7 1.7 0 00-2.4 0L12.7 5.3l3 3A2 2 0 0118 11v.3l2.9 2.9a2 2 0 012.6 2.6 2 2 0 01-2 2 2 2 0 01-2-2c0-.3 0-.5.1-.8L17 13.4V21a2 2 0 01.5 3.4 2 2 0 01-2.8-.7 2 2 0 01.7-2.7 2 2 0 011.1-.2v-7.8a2 2 0 01-1.3-2.6L12.3 8 3 17.3a1.7 1.7 0 000 2.4l11.6 11.6a1.7 1.7 0 002.4 0L29 17a1.7 1.7 0 000-2.4z"
        fill="#F05032"
      />
    </svg>
  ),
  Vercel: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="rgba(255,255,255,0.05)" />
      <path d="M16 6L28 26H4L16 6z" fill="white" />
    </svg>
  ),
  HuggingFace: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#FFD21E" opacity="0.15" />
      <circle cx="16" cy="17" r="10" fill="#FFD21E" opacity="0.8" />
      <circle cx="12" cy="15" r="1.8" fill="#333" />
      <circle cx="20" cy="15" r="1.8" fill="#333" />
      <path
        d="M11 21c1.2 1.5 3 2.5 5 2.5s3.8-1 5-2.5"
        stroke="#333"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M10 10c0-2 3-4 6-2"
        stroke="#FF6B6B"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M22 10c0-2-3-4-6-2"
        stroke="#FF6B6B"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  ),
  FAISS: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#1565C0" opacity="0.15" />
      <rect
        x="6"
        y="6"
        width="8"
        height="8"
        rx="2"
        fill="#1565C0"
        opacity="0.8"
      />
      <rect
        x="18"
        y="6"
        width="8"
        height="8"
        rx="2"
        fill="#1565C0"
        opacity="0.5"
      />
      <rect
        x="6"
        y="18"
        width="8"
        height="8"
        rx="2"
        fill="#1565C0"
        opacity="0.5"
      />
      <rect
        x="18"
        y="18"
        width="8"
        height="8"
        rx="2"
        fill="#1565C0"
        opacity="0.8"
      />
      <line
        x1="14"
        y1="10"
        x2="18"
        y2="10"
        stroke="#1565C0"
        strokeWidth="1.5"
      />
      <line
        x1="10"
        y1="14"
        x2="10"
        y2="18"
        stroke="#1565C0"
        strokeWidth="1.5"
      />
      <line
        x1="14"
        y1="22"
        x2="18"
        y2="22"
        stroke="#1565C0"
        strokeWidth="1.5"
      />
      <line
        x1="22"
        y1="14"
        x2="22"
        y2="18"
        stroke="#1565C0"
        strokeWidth="1.5"
      />
    </svg>
  ),
  Chroma: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#FF6B35" opacity="0.1" />
      <circle
        cx="16"
        cy="16"
        r="9"
        stroke="#FF6B35"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="16" cy="16" r="5" fill="#FF6B35" opacity="0.6" />
      <circle cx="16" cy="16" r="2" fill="#FF6B35" />
    </svg>
  ),
  Postman: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#FF6C37" opacity="0.1" />
      <circle
        cx="16"
        cy="16"
        r="10"
        stroke="#FF6C37"
        strokeWidth="1.5"
        fill="none"
      />
      <path d="M16 10l4 6-4 6-4-6 4-6z" fill="#FF6C37" opacity="0.7" />
    </svg>
  ),
  Ollama: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="rgba(255,255,255,0.05)" />
      <circle
        cx="16"
        cy="14"
        r="7"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
        opacity="0.8"
      />
      <circle cx="13" cy="13" r="1.5" fill="white" opacity="0.8" />
      <circle cx="19" cy="13" r="1.5" fill="white" opacity="0.8" />
      <path
        d="M12 18c1 2 7 2 8 0"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M10 21h12"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M12 24h8"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  ),
  PubMed: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#2E86AB" opacity="0.15" />
      <path d="M8 8h16v3H8z" fill="#2E86AB" opacity="0.8" rx="1" />
      <path d="M8 13h12v2H8z" fill="#2E86AB" opacity="0.6" />
      <path d="M8 17h14v2H8z" fill="#2E86AB" opacity="0.6" />
      <path d="M8 21h10v2H8z" fill="#2E86AB" opacity="0.4" />
      <circle cx="24" cy="22" r="5" fill="#2E86AB" opacity="0.9" />
      <path
        d="M22 22h4M24 20v4"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
};

/* ═══════════════════════════════════════════════════════════════════════════
   NETFLIX INTRO
═══════════════════════════════════════════════════════════════════════════ */
function NetflixIntro({ onComplete }) {
  const [phase, setPhase] = useState("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let p = 0;
    const tick = () => {
      p = Math.min(p + Math.random() * 14 + 5, 100);
      setProgress(Math.round(p));
      if (p < 100) setTimeout(tick, 60 + Math.random() * 100);
      else {
        setTimeout(() => setPhase("intro"), 200);
        setTimeout(() => setPhase("out"), 2600);
        setTimeout(onComplete, 3200);
      }
    };
    setTimeout(tick, 150);
  }, []);

  if (phase === "loading")
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10000,
          background: "#160b00",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
        }}
      >
        <div
          style={{
            fontFamily: "Plus Jakarta Sans,sans-serif",
            fontSize: 34,
            fontWeight: 800,
            color: "#f5f0e8",
            animation: "loadFadeIn .5s ease both",
          }}
        >
          aditya<span style={{ color: "#f26522" }}>.</span>
        </div>
        <div
          style={{
            width: 260,
            height: 2.5,
            background: "rgba(255,255,255,.08)",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "linear-gradient(90deg,#f26522,#ff9a50)",
              borderRadius: 3,
              transition: "width .1s ease",
            }}
          />
        </div>
        <div
          style={{
            fontSize: 11,
            color: "#604030",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          {progress < 40
            ? "Initialising..."
            : progress < 75
              ? "Loading components..."
              : progress < 100
                ? "Almost ready..."
                : "Welcome"}
        </div>
        <div
          style={{
            fontFamily: "Plus Jakarta Sans,sans-serif",
            fontSize: 48,
            fontWeight: 800,
            color: "rgba(242,101,34,.15)",
            letterSpacing: "-0.04em",
            position: "absolute",
            bottom: 48,
          }}
        >
          {String(progress).padStart(2, "0")}%
        </div>
      </div>
    );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: phase === "out" ? "netflixBgFade .6s ease forwards" : "none",
      }}
    >
      <div
        style={{
          fontFamily: "Plus Jakarta Sans,sans-serif",
          fontSize: "26vw",
          fontWeight: 800,
          color: "#f26522",
          lineHeight: 1,
          animation:
            "netflixLetterZoom 2.4s cubic-bezier(.33,1,.68,1) forwards, netflixGlow 2.4s ease forwards",
          letterSpacing: "-0.05em",
          userSelect: "none",
        }}
      >
        {"</>"}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "22%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 4,
          alignItems: "flex-end",
        }}
      >
        {[0, 0.1, 0.2, 0.3, 0.4, 0.3, 0.2, 0.1, 0].map((d, i) => (
          <div
            key={i}
            style={{
              width: 3,
              background: "#f26522",
              borderRadius: 2,
              opacity: 0.7,
              animation: `netflixSoundWave .8s ease-in-out infinite`,
              animationDelay: `${d}s`,
              height: 4,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   AVATAR
═══════════════════════════════════════════════════════════════════════════ */
function Avatar3D({ photoUrl }) {
  const badges = [
    {
      Icon: Icons.Python,
      bg: "#242000",
      border: "#FFD43B",
      t: "16%",
      l: "2%",
      d: "0s",
      r: "0deg",
    },
    {
      Icon: Icons.React,
      bg: "#001c24",
      border: "#61dafb",
      t: "52%",
      l: "-15%",
      d: "0.7s",
      r: "-8deg",
    },
    {
      Icon: Icons.MongoDB,
      bg: "#0a1f0a",
      border: "#47A248",
      t: "75%",
      l: "6%",
      d: "1.4s",
      r: "5deg",
    },
    {
      Icon: Icons.SQL,
      bg: "#001a20",
      border: "#00758F",
      t: "12%",
      rr: "4%",
      d: "0.35s",
      r: "10deg",
    },
    {
      Icon: Icons.Robot,
      bg: "#12062a",
      border: "#a78bfa",
      t: "56%",
      rr: "0%",
      d: "1.1s",
      r: "-6deg",
    },
    {
      Icon: Icons.Crystal,
      bg: "#031a10",
      border: "#34d399",
      t: "80%",
      rr: "8%",
      d: "1.8s",
      r: "4deg",
    },
  ];
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 380,
            height: 380,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(242,101,34,.18) 0%,transparent 70%)",
            filter: "blur(30px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 460,
            height: 460,
            border: "1.5px solid rgba(242,101,34,.13)",
            borderRadius: "50%",
            animation: "spinRing 22s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 330,
            height: 330,
            border: "1px solid rgba(242,101,34,.09)",
            borderRadius: "50%",
            animation: "spinRingRev 15s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 210,
            height: 210,
            border: "1px dashed rgba(242,101,34,.06)",
            borderRadius: "50%",
            animation: "spinRing 10s linear infinite",
          }}
        />
      </div>
      {badges.map(({ Icon, bg, border, t, l, rr, d, r }, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: t,
            left: l,
            right: rr,
            width: 50,
            height: 50,
            borderRadius: 13,
            background: bg,
            border: `1.5px solid ${border}35`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20,
            boxShadow: `0 0 22px ${border}28,0 4px 18px rgba(0,0,0,.55)`,
            "--rot": r,
            animation: "floatY 3s ease-in-out infinite",
            animationDelay: d,
            backdropFilter: "blur(6px)",
          }}
        >
          <Icon size={26} />
        </div>
      ))}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          filter:
            "drop-shadow(0 40px 60px rgba(242,101,34,.45)) drop-shadow(0 20px 30px rgba(0,0,0,.6))",
          marginBottom: -8,
        }}
      >
        <div style={{ animation: "floatSlow 4s ease-in-out infinite" }}>
          <img
            src={photoUrl}
            alt="Aditya"
            style={{
              width: 520,
              height: "auto",
              marginBottom: -40,
              marginLeft: -50,
              objectFit: "contain",
              transform: "translate(-35px,10px)",
              filter: "drop-shadow(0 30px 60px rgba(242,101,34,.5))",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO NAVBAR
═══════════════════════════════════════════════════════════════════════════ */
function HeroNav({ visible, activeSection, onNavClick, cvUrl }) {
  const [scrolled, setScrolled] = useState(false);
  const NAV = ["Home", "About", "Skills", "Projects", "Connect"];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.35s ease",
        width: "100%",
        height: scrolled ? 60 : 72,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 52px",
        background: scrolled ? "rgba(14,6,0,0.75)" : "transparent",
        backdropFilter: scrolled ? "blur(28px) saturate(200%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(28px) saturate(200%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,.05)" : "none",
        animation: "heroNavFade .5s ease both",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 52,
          fontFamily: "Plus Jakarta Sans,sans-serif",
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: "-0.01em",
          color: "#f5f0e8",
        }}
      >
        aditya<span style={{ color: "#f26522" }}>.</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          padding: "5px 6px",
          borderRadius: 50,
          background: "rgba(255,255,255,.07)",
          backdropFilter: "blur(40px) saturate(220%)",
          WebkitBackdropFilter: "blur(40px) saturate(220%)",
          border: "1px solid rgba(255,255,255,.15)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,.2),inset 0 -1px 0 rgba(0,0,0,.15),0 8px 32px rgba(0,0,0,.45)",
        }}
      >
        {NAV.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className={`hn-link${activeSection === item ? " hn-active" : ""}`}
            onClick={() => onNavClick(item)}
            style={{
              color: activeSection === item ? "#fff" : "rgba(255,255,255,.65)",
            }}
          >
            {item}
          </a>
        ))}
      </div>
      {cvUrl && (
        <a
          href={cvUrl}
          target="_blank"
          rel="noreferrer"
          className="hn-cv"
          style={{
            position: "absolute",
            right: 52,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 18px",
            borderRadius: 50,
            background: "rgba(255,255,255,.05)",
            border: "1px solid rgba(255,255,255,.1)",
            backdropFilter: "blur(16px)",
            color: "#f5f0e8",
            fontSize: 13,
            fontWeight: 600,
            textDecoration: "none",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,.15)",
          }}
        >
          <Icons.CV size={15} /> Download CV
        </a>
      )}
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FLOATING NAV
═══════════════════════════════════════════════════════════════════════════ */
function FloatingNav({ visible, activeSection, onNavClick }) {
  const NAV = ["Home", "About", "Skills", "Projects", "Connect"];
  return (
    <div
      className="lg-nav"
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: visible
          ? "translateX(-50%) translateY(0px)"
          : "translateX(-50%) translateY(90px)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        zIndex: 500,
        display: "flex",
        alignItems: "center",
        gap: 2,
        padding: "5px 6px",
        borderRadius: 50,
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 50%, rgba(242,101,34,0.08) 100%)",
        backdropFilter: "blur(40px) saturate(280%) brightness(1.1)",
        WebkitBackdropFilter: "blur(40px) saturate(280%) brightness(1.1)",
        border: "1px solid rgba(255,255,255,0.18)",
        boxShadow: [
          "0 0 0 1px rgba(242,101,34,.35)",
          "0 8px 40px rgba(0,0,0,.6)",
          "0 0 60px rgba(242,101,34,.1)",
          "inset 0 1px 0 rgba(255,255,255,.25)",
          "inset 0 -1px 0 rgba(0,0,0,.2)",
          "inset 1px 0 0 rgba(255,255,255,.1)",
          "inset -1px 0 0 rgba(255,255,255,.1)",
        ].join(","),
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "15%",
          right: "15%",
          height: 1,
          background:
            "linear-gradient(90deg,transparent,rgba(255,255,255,.55),rgba(242,101,34,.5),transparent)",
          borderRadius: "0 0 4px 4px",
          pointerEvents: "none",
        }}
      />
      {NAV.map((item) => {
        const isActive = activeSection === item;
        return (
          <a
            key={item}
            href={"#" + item.toLowerCase()}
            onClick={() => onNavClick(item)}
            className={`lg-nav-link${isActive ? " lg-active" : ""}`}
            style={{ color: isActive ? "#fff" : "rgba(255,255,255,.55)" }}
          >
            {item}
          </a>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   DUAL NAVBAR CONTROLLER
═══════════════════════════════════════════════════════════════════════════ */
function DualNavbar({ cvUrl }) {
  const [pastHero, setPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const NAV = ["Home", "About", "Skills", "Projects", "Connect"];

  useEffect(() => {
    const handler = () => setPastHero(window.scrollY > 80);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV.map((n) =>
        document.getElementById(n.toLowerCase()),
      ).filter(Boolean);
      let current = "Home";
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          current = section.id;
        }
      });
      setActiveSection(current.charAt(0).toUpperCase() + current.slice(1));
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback((item) => setActiveSection(item), []);

  return (
    <>
      <HeroNav
        visible={!pastHero}
        activeSection={activeSection}
        onNavClick={handleNavClick}
        cvUrl={cvUrl}
      />
      <FloatingNav
        visible={pastHero}
        activeSection={activeSection}
        onNavClick={handleNavClick}
      />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ABOUT SECTION
═══════════════════════════════════════════════════════════════════════════ */
function AboutSection() {
  const sectionRef = useRef(null);
  const O = "#f26522",
    BG = "#160b00",
    FG = "#f5f0e8";

  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity = "1";
            e.target.style.transform = "translateY(0)";
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    sec.querySelectorAll(".ab-animate").forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      el.style.transition = `opacity .65s cubic-bezier(.22,1,.36,1) ${i * 0.1}s, transform .65s cubic-bezier(.22,1,.36,1) ${i * 0.1}s`;
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Replaced "My Journey" with "What I Bring" — a value-focused tab
  const valueProps = [
    {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#f26522"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
      label: "Speed to Production",
      detail:
        "From idea to deployed product. I don't get stuck in theory — I ship.",
    },
    {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#f26522"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4l3 3" />
        </svg>
      ),
      label: "Self-Taught & Self-Driven",
      detail:
        "No bootcamp, no hand-holding. Built every project by figuring things out from scratch.",
    },
    {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#f26522"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
      label: "End-to-End Ownership",
      detail:
        "I own every layer — LLM, backend, frontend, deployment. No gaps, no handoffs.",
    },
    {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#f26522"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
        </svg>
      ),
      label: "Real-World Focus",
      detail:
        "Every project I build is designed to solve a genuine problem, not just demo on localhost.",
    },
  ];

  // Replaced strength cards with clearer, sharper content
  const strengths = [
    {
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#f26522"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 3h6l2 9-3 2s1.5 3 4 3 4-3 4-3l-3-2 2-9h6" />
          <path d="M5 17c0 2 3.5 4 7 4s7-2 7-4" />
        </svg>
      ),
      title: "Prioritise What Matters",
      desc: "I work by impact, not by urgency. The feature that unblocks users ships first; the cosmetic polish waits. This keeps projects moving and stakeholders happy.",
    },
    {
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#f26522"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
          <path d="M11 8v3l2 2" />
        </svg>
      ),
      title: "Debug Like a Detective",
      desc: "When something breaks, I trace it to the root cause — not the symptom. I read logs, reproduce bugs methodically, and fix the actual problem, not just the error message.",
    },
    {
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#f26522"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
      title: "Learn Fast, Apply Faster",
      desc: "LangGraph, FAISS, tool-calling, multi-turn memory — I picked each up in days by building something real with it. I don't learn a skill in isolation; I learn it by shipping it.",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        background: BG,
        color: FG,
        fontFamily: "'DM Sans',sans-serif",
        padding: "96px 56px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient orbs */}
      {[
        { w: 500, h: 500, top: -100, right: -80, op: 0.1, dur: "9s" },
        { w: 340, h: 340, bottom: 60, left: -60, op: 0.07, dur: "12s" },
      ].map((g, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            borderRadius: "50%",
            pointerEvents: "none",
            width: g.w,
            height: g.h,
            top: g.top,
            right: g.right,
            bottom: g.bottom,
            left: g.left,
            background: `radial-gradient(circle,rgba(242,101,34,${g.op}) 0%,transparent 65%)`,
            animation: `abGlowFloat ${g.dur} ease-in-out infinite`,
          }}
        />
      ))}

      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div className="ab-animate" style={{ marginBottom: 56 }}>
          <div
            style={{
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: O,
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 28,
                height: 1,
                background: O,
              }}
            />
            About me
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 32,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                fontFamily: "'Outfit',sans-serif",
                fontSize: "clamp(52px,6vw,86px)",
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              <span style={{ color: FG }}>Aditya</span>{" "}
              <span
                style={{
                  WebkitTextStroke: "1.5px rgba(242,101,34,.45)",
                  color: "transparent",
                }}
              >
                Soran
              </span>
            </div>
            <div style={{ paddingBottom: 10, flex: "0 0 380px" }}>
              <p style={{ fontSize: 14.5, lineHeight: 1.85, color: "#907060" }}>
                <strong style={{ color: "#d4a080", fontWeight: 500 }}>
                  AI Developer
                </strong>{" "}
                focused on building complete, production-ready products {"->"}{" "}
                from the LLM layer to the user interface.
              </p>
            </div>
          </div>
        </div>

        {/* Two-column: Story + What I Bring */}
        <div
          className="ab-animate"
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: 20,
            marginBottom: 20,
          }}
        >
          {/* Story / Bio card */}
          <div
            className="ab-info-card"
            style={{
              background: "rgba(255,255,255,.02)",
              border: "1px solid rgba(242,101,34,.12)",
              borderRadius: 20,
              padding: "36px 32px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: `linear-gradient(90deg,${O},transparent)`,
              }}
            />
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: O,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              Who I am
            </div>
            <p
              style={{
                fontSize: 15,
                color: "#c0a090",
                lineHeight: 1.9,
                marginBottom: 18,
              }}
            >
              I'm a self-taught developer who got obsessed with AI when I
              realised LLMs weren't just chatbots — they were{" "}
              <span style={{ color: FG, fontWeight: 600 }}>
                platforms for building entirely new kinds of software
              </span>
              .
            </p>
            <p
              style={{
                fontSize: 14,
                color: "#907060",
                lineHeight: 1.85,
                marginBottom: 18,
              }}
            >
              Over the past two years I've gone deep on RAG pipelines, agentic
              workflows, and full-stack MERN products — always with the goal of
              shipping something a real user can actually open and use.
            </p>
            <p
              style={{
                fontSize: 14,
                color: "#907060",
                lineHeight: 1.85,
                marginBottom: 24,
              }}
            >
              I don't separate "AI developer" from "full-stack developer". To
              me, a good AI product needs a real backend, a real frontend, and a
              real user experience — not just a Colab notebook.
            </p>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 18px",
                borderRadius: 50,
                border: "1px solid rgba(242,101,34,.22)",
                background: "rgba(242,101,34,.05)",
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#22c55e",
                  boxShadow: "0 0 10px #22c55e",
                  animation: "fadeUp 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "'Outfit',sans-serif",
                  fontSize: 11.5,
                  fontWeight: 700,
                  color: O,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Open to Work — AI Development Roles
              </span>
            </div>
          </div>

          {/* What I Bring card — replaces My Journey */}
          <div
            className="ab-info-card"
            style={{
              background: "rgba(255,255,255,.02)",
              border: "1px solid rgba(242,101,34,.12)",
              borderRadius: 20,
              padding: "36px 28px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: `linear-gradient(90deg,transparent,${O},transparent)`,
              }}
            />
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: O,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: 24,
              }}
            >
              What I Bring
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {valueProps.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 14,
                    alignItems: "flex-start",
                    padding: "14px 16px",
                    borderRadius: 12,
                    background: "rgba(242,101,34,.03)",
                    border: "1px solid rgba(242,101,34,.08)",
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      background: "rgba(242,101,34,.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid rgba(242,101,34,.15)",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Outfit',sans-serif",
                        fontSize: 13.5,
                        fontWeight: 700,
                        color: FG,
                        marginBottom: 3,
                      }}
                    >
                      {item.label}
                    </div>
                    <p
                      style={{
                        fontSize: 12,
                        color: "#705040",
                        lineHeight: 1.65,
                      }}
                    >
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Strengths row — clearer content */}
        <div
          className="ab-animate"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 16,
          }}
        >
          {strengths.map((s, i) => (
            <div
              key={s.title}
              className="ab-info-card"
              style={{
                background: "rgba(255,255,255,.02)",
                border: "1px solid rgba(242,101,34,.1)",
                borderRadius: 18,
                padding: "26px 24px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(90deg,${O}${["bb", "80", "50"][i]},transparent)`,
                }}
              />
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 13,
                  background: "rgba(242,101,34,.08)",
                  border: "1px solid rgba(242,101,34,.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                {s.icon}
              </div>
              <div
                style={{
                  fontFamily: "'Outfit',sans-serif",
                  fontSize: 16,
                  fontWeight: 800,
                  color: FG,
                  marginBottom: 10,
                  letterSpacing: "-0.01em",
                }}
              >
                {s.title}
              </div>
              <p style={{ fontSize: 13, color: "#705040", lineHeight: 1.75 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SKILLS SECTION — Real icons, sharp copy
═══════════════════════════════════════════════════════════════════════════ */
const SKILL_GROUPS = [
  {
    id: "genai",
    label: "Generative AI",
    color: "#f26522",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#f26522"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2a10 10 0 110 20A10 10 0 0112 2z" />
        <path d="M12 8v4l3 3" />
        <path d="M8.5 14.5l7-7" />
      </svg>
    ),
    headline: "RAG & LLM Applications",
    desc: "I build RAG pipelines that retrieve the right context before the LLM ever speaks — so answers are grounded in your actual data, not the model's imagination.",
    skills: [
      { name: "RAG Systems", Icon: Icons.VectorDB },
      { name: "LangChain", Icon: Icons.LangChain },
      { name: "OpenAI API", Icon: Icons.OpenAI },
      {
        name: "Prompt Engineering",
        Icon: () => (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f26522"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        ),
      },
      { name: "ChromaDB", Icon: Icons.Chroma },
      {
        name: "Text Embeddings",
        Icon: () => (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f26522"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="3" width="20" height="4" rx="1" />
            <rect x="2" y="10" width="14" height="4" rx="1" />
            <rect x="2" y="17" width="18" height="4" rx="1" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "agentic",
    label: "Agentic AI",
    color: "#A78BFA",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#A78BFA"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
      </svg>
    ),
    headline: "AI Agents That Plan & Execute",
    desc: "I build agents that don't just answer questions — they reason through multi-step goals, call tools when needed, self-correct on failure, and carry context across turns.",
    skills: [
      { name: "LangGraph", Icon: Icons.LangGraph },
      {
        name: "Tool Calling",
        Icon: () => (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#A78BFA"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
          </svg>
        ),
      },
      {
        name: "Conversation Memory",
        Icon: () => (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#A78BFA"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        ),
      },
      {
        name: "ReAct Pattern",
        Icon: () => (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#A78BFA"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        ),
      },
      {
        name: "Multi-step Chains",
        Icon: () => (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#A78BFA"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
          </svg>
        ),
      },
      { name: "OpenAI Assistants", Icon: Icons.OpenAI },
    ],
  },
  {
    id: "fullstack",
    label: "Full Stack Dev",
    color: "#61DAFB",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#61DAFB"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 8l-3 2 3 2M17 8l3 2-3 2M13 7l-2 6" />
      </svg>
    ),
    headline: "MERN Apps — Front to Back",
    desc: "React frontends, Node/FastAPI backends, MongoDB, JWT auth — I build full products that are actually deployed and usable, not just running on localhost.",
    skills: [
      { name: "React.js", Icon: Icons.React },
      { name: "Node.js + Express", Icon: Icons.NodeJS },
      { name: "FastAPI", Icon: Icons.FastAPI },
      { name: "MongoDB", Icon: Icons.MongoDB },
      {
        name: "REST API Design",
        Icon: () => (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#61DAFB"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 20V10M12 20V4M6 20v-6" />
          </svg>
        ),
      },
      {
        name: "JWT Auth",
        Icon: () => (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#61DAFB"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "python",
    label: "Python",
    color: "#FFD43B",
    icon: <Icons.Python size={22} />,
    headline: "Python — My Primary Language",
    desc: "FastAPI services, async data pipelines, Pydantic validation, AI integrations. Python is the language I reach for first when speed and clarity both matter.",
    skills: [
      { name: "Python", Icon: Icons.Python },
      { name: "FastAPI", Icon: Icons.FastAPI },
      {
        name: "Async / Await",
        Icon: () => (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFD43B"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        ),
      },
      {
        name: "Pydantic",
        Icon: () => (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFD43B"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ),
      },
      {
        name: "Data Pipelines",
        Icon: () => (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFD43B"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        ),
      },
      { name: "FAISS", Icon: Icons.FAISS },
    ],
  },
];

function SkillChip({ skill, color, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const { Icon } = skill;

  return (
    <div
      ref={ref}
      className="sk-chip"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 9,
        padding: "11px 16px",
        borderRadius: 12,
        background: visible ? `${color}10` : "transparent",
        border: `1.5px solid ${color}28`,
        opacity: visible ? 1 : 0,
        transform: visible
          ? "scale(1) translateY(0)"
          : "scale(.88) translateY(8px)",
        transition: `opacity .5s ease ${delay}s, transform .5s cubic-bezier(.34,1.56,.64,1) ${delay}s, background .22s ease, border-color .22s ease`,
        cursor: "default",
        boxShadow: `0 2px 12px ${color}12`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = `${color}20`;
        e.currentTarget.style.borderColor = `${color}55`;
        e.currentTarget.style.boxShadow = `0 4px 20px ${color}30`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = `${color}10`;
        e.currentTarget.style.borderColor = `${color}28`;
        e.currentTarget.style.boxShadow = `0 2px 12px ${color}12`;
      }}
    >
      <div style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
        <Icon size={20} />
      </div>
      <span
        style={{
          fontFamily: "'Outfit',sans-serif",
          fontSize: 13.5,
          fontWeight: 700,
          color: "#e8ddd5",
          letterSpacing: "-0.01em",
        }}
      >
        {skill.name}
      </span>
    </div>
  );
}

function SkillsSection() {
  const [activeGroup, setActiveGroup] = useState("genai");
  const active = SKILL_GROUPS.find((g) => g.id === activeGroup);

  return (
    <section
      id="skills"
      style={{
        background: "#160b00",
        color: "#f5f0e8",
        padding: "96px 56px 100px",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'DM Sans',sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `repeating-linear-gradient(90deg,rgba(242,101,34,.025) 0px,rgba(242,101,34,.025) 1px,transparent 1px,transparent 72px),repeating-linear-gradient(0deg,rgba(242,101,34,.015) 0px,rgba(242,101,34,.015) 1px,transparent 1px,transparent 60px)`,
        }}
      />
      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 24,
            marginBottom: 56,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: 10.5,
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#f26522",
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 28,
                  height: 1,
                  background: "#f26522",
                }}
              />
              Tech Stack
            </div>
            <div
              style={{
                fontFamily: "'Outfit',sans-serif",
                fontSize: "clamp(44px,5.5vw,72px)",
                fontWeight: 900,
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
              }}
            >
              <div>Skill</div>
              <div style={{ color: "#f26522" }}>
                set<span style={{ color: "rgba(242,101,34,.28)" }}>.</span>
              </div>
            </div>
          </div>
          <div style={{ flex: "0 0 380px" }}>
            <p style={{ fontSize: 14.5, color: "#907060", lineHeight: 1.85 }}>
              Focused on{" "}
              <strong style={{ color: "#d4a080", fontWeight: 500 }}>
                AI development
              </strong>{" "}
              — from LLM pipelines and RAG systems to production MERN products.
              Select a domain to explore.
            </p>
          </div>
        </div>

        {/* Tab selector */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 40,
            flexWrap: "wrap",
          }}
        >
          {SKILL_GROUPS.map((g) => {
            const isActive = activeGroup === g.id;
            return (
              <button
                key={g.id}
                onClick={() => setActiveGroup(g.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 20px",
                  borderRadius: 50,
                  border: `1.5px solid ${isActive ? g.color : "rgba(242,101,34,.18)"}`,
                  background: isActive ? `${g.color}18` : "transparent",
                  color: isActive ? g.color : "#705040",
                  fontFamily: "'Outfit',sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                  cursor: "pointer",
                  transition: "all .22s ease",
                  boxShadow: isActive ? `0 4px 20px ${g.color}28` : "none",
                }}
              >
                <span style={{ display: "flex", alignItems: "center" }}>
                  {g.icon}
                </span>
                <span>{g.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active group */}
        <div key={activeGroup} style={{ animation: "cardFlip .35s ease both" }}>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
          >
            {/* Left: detail */}
            <div
              style={{
                background: "rgba(255,255,255,.02)",
                border: `1px solid ${active.color}22`,
                borderRadius: 20,
                padding: "36px 32px",
              }}
            >
              <div style={{ position: "relative", marginBottom: 32 }}>
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: `linear-gradient(90deg,${active.color},transparent)`,
                    borderRadius: 2,
                  }}
                />
                <div style={{ paddingTop: 16 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: `${active.color}15`,
                      border: `1px solid ${active.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 14,
                    }}
                  >
                    {active.icon}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Outfit',sans-serif",
                      fontSize: 24,
                      fontWeight: 800,
                      color: "#f5f0e8",
                      letterSpacing: "-0.02em",
                      marginBottom: 6,
                    }}
                  >
                    {active.headline}
                  </div>
                  <p
                    style={{
                      fontSize: 13.5,
                      color: "#907060",
                      lineHeight: 1.75,
                    }}
                  >
                    {active.desc}
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                {active.skills.map((sk, i) => (
                  <SkillChip
                    key={sk.name}
                    skill={sk}
                    color={active.color}
                    delay={i * 0.06}
                  />
                ))}
              </div>
            </div>

            {/* Right: other groups */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {SKILL_GROUPS.filter((g) => g.id !== activeGroup).map((g) => (
                <div
                  key={g.id}
                  className="sk-card"
                  onClick={() => setActiveGroup(g.id)}
                  style={{
                    background: "rgba(255,255,255,.02)",
                    border: "1px solid rgba(242,101,34,.1)",
                    borderRadius: 16,
                    padding: "20px 22px",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: `linear-gradient(90deg,${g.color},transparent)`,
                      opacity: 0.5,
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 10,
                        background: `${g.color}12`,
                        border: `1px solid ${g.color}25`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {g.icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "'Outfit',sans-serif",
                          fontSize: 15,
                          fontWeight: 700,
                          color: "#f5f0e8",
                        }}
                      >
                        {g.label}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: g.color,
                          fontWeight: 600,
                          letterSpacing: "0.05em",
                        }}
                      >
                        {g.headline}
                      </div>
                    </div>
                    <div
                      style={{
                        marginLeft: "auto",
                        fontSize: 14,
                        color: "rgba(242,101,34,.4)",
                      }}
                    >
                      →
                    </div>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {g.skills.slice(0, 4).map((sk) => (
                      <span
                        key={sk.name}
                        style={{
                          fontSize: 10,
                          padding: "3px 9px",
                          borderRadius: 6,
                          background: `${g.color}12`,
                          color: g.color,
                          fontWeight: 600,
                          border: `1px solid ${g.color}22`,
                        }}
                      >
                        {sk.name}
                      </span>
                    ))}
                    <span
                      style={{
                        fontSize: 10,
                        padding: "3px 8px",
                        borderRadius: 6,
                        background: "rgba(242,101,34,.04)",
                        color: "rgba(242,101,34,.4)",
                        fontWeight: 600,
                        border: "1px solid rgba(242,101,34,.1)",
                      }}
                    >
                      +{g.skills.length - 4} more
                    </span>
                  </div>
                </div>
              ))}

              {/* DevOps mini card */}
              <div
                style={{
                  background: "rgba(255,255,255,.02)",
                  border: "1px solid rgba(242,101,34,.1)",
                  borderRadius: 16,
                  padding: "20px 22px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      background: "rgba(249,115,22,.08)",
                      border: "1px solid rgba(249,115,22,.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icons.Docker size={22} />
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#F97316",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    DevOps & Tools
                  </div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {[
                    { name: "Docker", Icon: Icons.Docker },
                    { name: "Git / GitHub", Icon: Icons.Git },
                    { name: "Vercel", Icon: Icons.Vercel },
                    { name: "Postman", Icon: Icons.Postman },
                    { name: "Ollama", Icon: Icons.Ollama },
                    { name: "HuggingFace", Icon: Icons.HuggingFace },
                  ].map(({ name, Icon }) => (
                    <span
                      key={name}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        fontSize: 11,
                        padding: "5px 10px",
                        borderRadius: 8,
                        background: "rgba(249,115,22,.08)",
                        color: "#F97316",
                        fontWeight: 600,
                        border: "1px solid rgba(249,115,22,.2)",
                      }}
                    >
                      <Icon size={14} />
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PROJECTS SECTION
═══════════════════════════════════════════════════════════════════════════ */
const PROJECTS = [
  {
    number: "01",
    title: "AyurSutra",
    accentColor: "#34D399",
    tags: ["Full Stack", "AI", "NLP"],
    stack: "MERN · FastAPI · NLP · Sentiment Analysis · JWT",
    desc: "Full-stack Ayurveda therapy booking platform with role-based access, automated scheduling, and AI-powered sentiment analysis classifying feedback as positive, neutral, or negative.",
    live: "https://ayur-sutra-coral.vercel.app/",
    github: "https://github.com/adityasoran0698",
    status: "Live",
  },
  {
    number: "02",
    title: "CuraLink",
    accentColor: "#2E86AB",
    tags: ["Medical AI", "RAG", "Agentic AI", "OpenAI"],
    stack:
      "Python · LangChain · gpt-4o-mini · OpenAI Embeddings · FastAPI · React",
    desc: "AI Medical Research Assistant that queries PubMed, OpenAlex & ClinicalTrials.gov in parallel, ranks 50–300 results using OpenAI embeddings, and delivers source-backed answers via gpt model with multi-turn memory.",
    live: "https://lnkd.in/g2h6q9H7",
    github: "https://lnkd.in/gvvEdcNq",
    status: "Live",
  },
  {
    number: "03",
    title: "YouTube Chatbot",
    accentColor: "#f26522",
    tags: ["RAG", "LangChain", "OpenAI", "Vector DB"],
    stack:
      "Python · LangChain · Chroma · FastAPI · OpenAI Embeddings · React.js",
    desc: "End-to-end RAG pipeline ingesting YouTube transcripts, storing in ChromaDB for semantic retrieval, serving context-aware answers via a real-time React chat interface.",
    github: "https://github.com/adityasoran0698",
    status: "GitHub",
  },
  {
    number: "04",
    title: "AI Research Analyser",
    accentColor: "#818CF8",
    tags: ["Generative AI", "LangChain", "FastAPI"],
    stack: "React · Tailwind CSS · FastAPI · LangChain · OpenAI API",
    desc: "Enter any research paper title, pick an explanation style (Beginner / Technical / Code-Oriented / Mathematical) and get a structured LLM-generated breakdown instantly.",
    github: "https://github.com/adityasoran0698/ai-research-analyser",
    status: "GitHub",
  },
];

function ProjectCard({ project }) {
  const {
    number,
    title,
    accentColor,
    tags,
    stack,
    desc,
    live,
    github,
    status,
  } = project;
  const stackItems = stack.split(" · ");
  return (
    <div
      className="proj-card-new"
      style={{
        background: "rgba(14,6,0,.97)",
        border: `1px solid ${accentColor}22`,
        borderRadius: 22,
        overflow: "hidden",
        boxShadow: `0 4px 28px rgba(0,0,0,.5)`,
        position: "relative",
        padding: "32px 30px 28px",
        height: "100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -24,
          right: 10,
          fontFamily: "'Outfit',sans-serif",
          fontSize: 140,
          fontWeight: 900,
          color: `${accentColor}07`,
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        {number}
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg,${accentColor},${accentColor}40,transparent)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 100,
          height: 100,
          background: `radial-gradient(circle at 0% 0%,${accentColor}12 0%,transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
          position: "relative",
        }}
      >
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 10,
            fontWeight: 700,
            color: `${accentColor}50`,
            letterSpacing: "0.14em",
          }}
        >
          {number}
        </span>
        {status && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              background: `${accentColor}14`,
              border: `1px solid ${accentColor}35`,
              borderRadius: 50,
              padding: "3px 11px",
            }}
          >
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 5px #22c55e",
              }}
            />
            <span
              style={{
                fontSize: 9.5,
                fontWeight: 700,
                color: "#22c55e",
                letterSpacing: "0.06em",
              }}
            >
              {status}
            </span>
          </div>
        )}
      </div>
      <div
        style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}
      >
        {tags.map((t) => (
          <span
            key={t}
            style={{
              fontSize: 9.5,
              padding: "3px 10px",
              borderRadius: 20,
              background: `${accentColor}15`,
              color: accentColor,
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              border: `1px solid ${accentColor}25`,
            }}
          >
            {t}
          </span>
        ))}
      </div>
      <h3
        style={{
          fontFamily: "'Outfit',sans-serif",
          fontSize: 28,
          fontWeight: 800,
          color: "#f5f0e8",
          marginBottom: 8,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h3>
      <div
        style={{
          width: 48,
          height: 2,
          background: `linear-gradient(90deg,${accentColor},transparent)`,
          marginBottom: 12,
          borderRadius: 2,
        }}
      />
      <p
        style={{
          fontSize: 13.5,
          color: "#907060",
          lineHeight: 1.75,
          marginBottom: 20,
        }}
      >
        {desc}
      </p>
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}
      >
        {stackItems.map((s) => (
          <span
            key={s}
            style={{
              fontSize: 10,
              padding: "4px 10px",
              borderRadius: 6,
              background: "rgba(242,101,34,.06)",
              color: "#705040",
              fontWeight: 600,
              letterSpacing: "0.04em",
              border: "1px solid rgba(242,101,34,.12)",
              fontFamily: "monospace",
            }}
          >
            {s}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        {live && live !== "#" && (
          <a
            href={live}
            target="_blank"
            rel="noreferrer"
            style={{
              padding: "9px 22px",
              borderRadius: 50,
              background: `linear-gradient(135deg,${accentColor},${accentColor}bb)`,
              color: "white",
              fontSize: 12,
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: `0 4px 16px ${accentColor}35`,
            }}
          >
            Live Demo ↗
          </a>
        )}
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
            style={{
              padding: "9px 22px",
              borderRadius: 50,
              border: `1.5px solid ${accentColor}45`,
              color: accentColor,
              fontSize: 12,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            GitHub ↗
          </a>
        )}
      </div>
    </div>
  );
}

function ProjectsSection() {
  const CARDS_PER_VIEW = 3;

  const chunks = [];
  for (let i = 0; i < PROJECTS.length; i += CARDS_PER_VIEW) {
    chunks.push(PROJECTS.slice(i, i + CARDS_PER_VIEW));
  }

  const totalWindows = chunks.length;
  const canSlide = totalWindows > 1;

  const [windowIndex, setWindowIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [phase, setPhase] = useState("idle");
  const [slideDir, setSlideDir] = useState(null);

  const doSlide = (dir) => {
    if (phase !== "idle") return;
    const next =
      dir === "next"
        ? Math.min(windowIndex + 1, totalWindows - 1)
        : Math.max(windowIndex - 1, 0);
    if (next === windowIndex) return;

    setSlideDir(dir === "next" ? "left" : "right");
    setPhase("exit");

    setTimeout(() => {
      setDisplayIndex(next);
      setWindowIndex(next);
      setPhase("enter");
      setTimeout(() => setPhase("idle"), 340);
    }, 220);
  };

  const visibleChunk = chunks[displayIndex] || [];

  return (
    <section
      id="projects"
      style={{
        padding: "96px 52px",
        background: "#160b00",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'DM Sans',sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.4,
          backgroundImage: `radial-gradient(circle at 20% 50%,rgba(242,101,34,.04) 0%,transparent 50%),radial-gradient(circle at 80% 20%,rgba(167,139,250,.03) 0%,transparent 50%)`,
        }}
      />
      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative" }}>
        {/* Header — no arrows here anymore */}
        <div style={{ marginBottom: 48 }}>
          <p
            style={{
              color: "#f26522",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                width: 24,
                height: 1,
                background: "#f26522",
                display: "inline-block",
              }}
            />
            What I've built
          </p>
          <h2
            style={{
              fontFamily: "'Outfit','Plus Jakarta Sans',sans-serif",
              fontSize: "clamp(32px,4vw,52px)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "#f5f0e8",
            }}
          >
            Featured <span style={{ color: "#f26522" }}>Projects</span>
          </h2>
        </div>

        {/* Sliding track */}
        <div style={{ overflow: "hidden", position: "relative" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
              animation:
                phase === "exit"
                  ? `slideOut${slideDir === "left" ? "Left" : "Right"} .22s cubic-bezier(.4,0,.2,1) both`
                  : phase === "enter"
                    ? `slideIn${slideDir === "left" ? "Right" : "Left"} .34s cubic-bezier(.22,1,.36,1) both`
                    : "none",
            }}
          >
            {visibleChunk.length === 1 && <div />}
            {visibleChunk.map((p) => (
              <ProjectCard key={p.number} project={p} />
            ))}
            {visibleChunk.length === 1 && <div />}
            {visibleChunk.length === 2 && <div />}
          </div>
        </div>

        {/* Bottom controls — centered below cards */}
        {canSlide && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              marginTop: 40,
            }}
          >
            {/* Prev button */}
            <button
              onClick={() => doSlide("prev")}
              disabled={windowIndex === 0 || phase !== "idle"}
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                border: `1px solid ${windowIndex === 0 ? "rgba(242,101,34,.12)" : "rgba(242,101,34,.3)"}`,
                background: "transparent",
                color:
                  windowIndex === 0
                    ? "rgba(242,101,34,.2)"
                    : "rgba(242,101,34,.7)",
                fontSize: 16,
                cursor: windowIndex === 0 ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all .22s ease",
                backdropFilter: "blur(8px)",
              }}
              onMouseEnter={(e) => {
                if (windowIndex !== 0) {
                  e.currentTarget.style.background = "rgba(242,101,34,.08)";
                  e.currentTarget.style.borderColor = "rgba(242,101,34,.55)";
                  e.currentTarget.style.color = "#f26522";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor =
                  windowIndex === 0
                    ? "rgba(242,101,34,.12)"
                    : "rgba(242,101,34,.3)";
                e.currentTarget.style.color =
                  windowIndex === 0
                    ? "rgba(242,101,34,.2)"
                    : "rgba(242,101,34,.7)";
              }}
            >
              ←
            </button>

            {/* Dots + counter pill */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 20px",
                borderRadius: 50,
                background: "rgba(255,255,255,.03)",
                border: "1px solid rgba(242,101,34,.12)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Dots */}
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {Array.from({ length: totalWindows }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (phase !== "idle" || i === windowIndex) return;
                      const dir = i > windowIndex ? "left" : "right";
                      setSlideDir(dir);
                      setPhase("exit");
                      setTimeout(() => {
                        setDisplayIndex(i);
                        setWindowIndex(i);
                        setPhase("enter");
                        setTimeout(() => setPhase("idle"), 340);
                      }, 220);
                    }}
                    style={{
                      width: i === windowIndex ? 20 : 6,
                      height: 6,
                      borderRadius: 3,
                      border: "none",
                      background:
                        i === windowIndex ? "#f26522" : "rgba(242,101,34,.25)",
                      cursor: i === windowIndex ? "default" : "pointer",
                      padding: 0,
                      transition: "all .35s cubic-bezier(.34,1.56,.64,1)",
                    }}
                  />
                ))}
              </div>

              {/* Divider */}
              <div
                style={{
                  width: 1,
                  height: 14,
                  background: "rgba(242,101,34,.2)",
                  borderRadius: 1,
                }}
              />

              {/* Counter */}
              <span
                style={{
                  fontFamily: "'Outfit',sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "rgba(242,101,34,.6)",
                  letterSpacing: "0.08em",
                  userSelect: "none",
                }}
              >
                {windowIndex + 1}{" "}
                <span style={{ color: "rgba(242,101,34,.3)" }}>/</span>{" "}
                {totalWindows}
              </span>
            </div>

            {/* Next button */}
            <button
              onClick={() => doSlide("next")}
              disabled={windowIndex >= totalWindows - 1 || phase !== "idle"}
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                border: `1px solid ${windowIndex >= totalWindows - 1 ? "rgba(242,101,34,.12)" : "rgba(242,101,34,.3)"}`,
                background:
                  windowIndex < totalWindows - 1
                    ? "rgba(242,101,34,.06)"
                    : "transparent",
                color:
                  windowIndex >= totalWindows - 1
                    ? "rgba(242,101,34,.2)"
                    : "rgba(242,101,34,.7)",
                fontSize: 16,
                cursor:
                  windowIndex >= totalWindows - 1 ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all .22s ease",
                backdropFilter: "blur(8px)",
              }}
              onMouseEnter={(e) => {
                if (windowIndex < totalWindows - 1) {
                  e.currentTarget.style.background = "rgba(242,101,34,.12)";
                  e.currentTarget.style.borderColor = "rgba(242,101,34,.55)";
                  e.currentTarget.style.color = "#f26522";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  windowIndex < totalWindows - 1
                    ? "rgba(242,101,34,.06)"
                    : "transparent";
                e.currentTarget.style.borderColor =
                  windowIndex >= totalWindows - 1
                    ? "rgba(242,101,34,.12)"
                    : "rgba(242,101,34,.3)";
                e.currentTarget.style.color =
                  windowIndex >= totalWindows - 1
                    ? "rgba(242,101,34,.2)"
                    : "rgba(242,101,34,.7)";
              }}
            >
              →
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideOutLeft {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(-40px); }
        }
        @keyframes slideOutRight {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(40px); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(48px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-48px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN PORTFOLIO COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
export default function Portfolio() {
  const photoUrl = backgroundImage;
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef(null);
  const cursorDot = useRef(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
    const onMove = (e) => {
      if (cursorDot.current)
        cursorDot.current.style.transform = `translate(${e.clientX - 5}px,${e.clientY - 5}px)`;
    };
    document.addEventListener("mousemove", onMove);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.head.removeChild(style);
    };
  }, []);

  if (!loaded) return <NetflixIntro onComplete={() => setLoaded(true)} />;

  return (
    <>
      <div
        ref={cursorDot}
        style={{
          width: 10,
          height: 10,
          background: "#f26522",
          borderRadius: "50%",
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "screen",
          willChange: "transform",
          transition: "none",
        }}
      />
      <DualNavbar cvUrl={MyCV} />
      <div
        className="site-enter"
        style={{
          fontFamily: "'DM Sans',sans-serif",
          background: "#160b00",
          color: "#f5f0e8",
          minHeight: "100vh",
          cursor: "none",
        }}
      >
        {/* HERO */}
        <section
          id="home"
          ref={heroRef}
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            padding: "0 52px",
            background: `radial-gradient(ellipse 75% 55% at 68% 50%,rgba(180,65,0,.23) 0%,transparent 68%),radial-gradient(ellipse 50% 40% at 15% 75%,rgba(110,35,0,.18) 0%,transparent 55%),#160b00`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.028,
              backgroundImage:
                "radial-gradient(circle,#f26522 1px,transparent 1px)",
              backgroundSize: "38px 38px",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "6%",
              right: "1%",
              animation: "floatY 5.5s ease-in-out infinite",
              animationDelay: ".6s",
              opacity: 0.7,
              filter: "drop-shadow(0 0 30px #f26522)",
            }}
          >
            <Icons.Lightning size={90} color="#f26522" />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "10%",
              left: ".5%",
              animation: "floatY 4s ease-in-out infinite",
              animationDelay: "1.2s",
              opacity: 0.45,
              filter: "drop-shadow(0 0 20px #f26522)",
            }}
          >
            <Icons.Lightning size={60} color="#f26522" />
          </div>
          {[
            { c: "#f24e1e", s: 16, tr: "12%", ri: "14%" },
            { c: "#ff7262", s: 13, tr: "17%", ri: "11%" },
            { c: "#1abcfe", s: 15, tr: "10%", ri: "9%" },
            { c: "#0acf83", s: 13, tr: "15%", ri: "6%" },
          ].map((d, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: d.tr,
                right: d.ri,
                width: d.s,
                height: d.s,
                borderRadius: "50%",
                background: d.c,
                opacity: 0.8,
                filter: `drop-shadow(0 0 7px ${d.c})`,
                animation: `floatY ${3 + i * 0.4}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 32,
              maxWidth: 1260,
              margin: "0 auto",
            }}
          >
            <div style={{ flex: "0 0 55%", minWidth: 0 }}>
              <p
                className="fu fu1"
                style={{
                  fontSize: 18,
                  color: "#a08060",
                  marginBottom: 8,
                  fontWeight: 400,
                }}
              >
                Hey, I am{" "}
                <span style={{ color: "#f26522", fontWeight: 700 }}>
                  Aditya Soran
                </span>
              </p>
              <h1
                className="fu fu2"
                style={{
                  fontFamily: "Plus Jakarta Sans,sans-serif",
                  fontSize: "clamp(38px,4.4vw,64px)",
                  fontWeight: 800,
                  lineHeight: 1.06,
                  letterSpacing: "-0.02em",
                  color: "#f5f0e8",
                  marginBottom: 14,
                }}
              >
                AI {/* <br /> */}
                <span style={{ color: "#f26522" }}>Developer</span>
              </h1>
              <div
                className="fu fu2"
                style={{
                  width: 120,
                  height: 3,
                  borderRadius: 2,
                  marginBottom: 22,
                  background: "linear-gradient(90deg,#f26522,transparent)",
                }}
              />
              <p
                className="fu fu3"
                style={{
                  fontSize: 16.5,
                  color: "#907060",
                  lineHeight: 1.78,
                  maxWidth: 520,
                  marginBottom: 36,
                }}
              >
                Building real-world LLM applications, RAG systems &amp; Agentic
                AI workflows. Turning cutting-edge AI into production-ready
                full-stack products.
              </p>
              <div
                className="fu fu4"
                style={{ display: "flex", gap: 14, alignItems: "center" }}
              >
                <a
                  href="#connect"
                  className="btn-primary"
                  style={{
                    padding: "14px 38px",
                    borderRadius: 50,
                    fontSize: 16,
                    fontWeight: 700,
                    background: "linear-gradient(135deg,#f26522,#c04a00)",
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  Hire me
                </a>
                <a
                  href="mailto:adityasoran@gmail.com"
                  className="btn-ghost"
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    border: "1.5px solid rgba(242,101,34,.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#f26522",
                    textDecoration: "none",
                  }}
                >
                  <Icons.Mail size={20} />
                </a>
                <a
                  href="https://github.com/adityasoran0698"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                  style={{
                    padding: "14px 28px",
                    borderRadius: 50,
                    border: "1.5px solid rgba(242,101,34,.35)",
                    color: "#f26522",
                    fontSize: 14,
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  GitHub ↗
                </a>
              </div>
            </div>
            <div
              style={{ flex: "1 1 auto", height: 520, position: "relative" }}
            >
              <Avatar3D photoUrl={photoUrl} />
            </div>
          </div>
        </section>

        <AboutSection />
        <SkillsSection />
        <ProjectsSection />

        {/* CONNECT */}
        <section
          id="connect"
          style={{
            padding: "96px 52px 112px",
            textAlign: "center",
            background: `radial-gradient(ellipse 65% 55% at 50% 50%,rgba(180,65,0,.16) 0%,transparent 68%),#160b00`,
          }}
        >
          <div style={{ maxWidth: 620, margin: "0 auto" }}>
            <p
              style={{
                color: "#f26522",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Let's talk
            </p>
            <h2
              style={{
                fontFamily: "Plus Jakarta Sans,sans-serif",
                fontSize: "clamp(30px,3.8vw,50px)",
                fontWeight: 800,
                letterSpacing: "-0.01em",
                marginBottom: 14,
              }}
            >
              Ready to Build
              <br />
              <span style={{ color: "#f26522" }}>Something Great?</span>
            </h2>
            <p
              style={{
                color: "#907060",
                fontSize: 14.5,
                lineHeight: 1.72,
                marginBottom: 38,
              }}
            >
              Actively looking for Gen AI and full-stack opportunities. Whether
              it's a RAG pipeline, an agentic workflow, or a full product —
              let's connect.
            </p>
            <div
              style={{
                display: "flex",
                gap: 14,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a
                href="mailto:adityasoran@gmail.com"
                className="btn-primary"
                style={{
                  padding: "13px 30px",
                  borderRadius: 50,
                  background: "linear-gradient(135deg,#f26522,#c04a00)",
                  color: "white",
                  fontWeight: 700,
                  fontSize: 14.5,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Icons.Mail size={16} /> adityasoran@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/aditya-soran-297314361"
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
                style={{
                  padding: "13px 26px",
                  borderRadius: 50,
                  border: "1.5px solid rgba(242,101,34,.35)",
                  color: "#f26522",
                  fontWeight: 700,
                  fontSize: 14.5,
                  textDecoration: "none",
                }}
              >
                LinkedIn ↗
              </a>
              <a
                href="https://github.com/adityasoran0698"
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
                style={{
                  padding: "13px 26px",
                  borderRadius: 50,
                  border: "1.5px solid rgba(242,101,34,.35)",
                  color: "#f26522",
                  fontWeight: 700,
                  fontSize: 14.5,
                  textDecoration: "none",
                }}
              >
                GitHub ↗
              </a>
            </div>
            <p style={{ marginTop: 20, fontSize: 12.5, color: "#705040" }}>
              <svg
                style={{
                  display: "inline",
                  verticalAlign: "middle",
                  marginRight: 4,
                }}
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#705040"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Ghaziabad, Uttar Pradesh &nbsp;·&nbsp; +91 6396369163
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <div
          style={{
            borderTop: "1px solid rgba(242,101,34,.1)",
            padding: "20px 52px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "Plus Jakarta Sans,sans-serif",
              fontWeight: 800,
              fontSize: 16,
            }}
          >
            aditya<span style={{ color: "#f26522" }}>.</span>
          </span>
          <span style={{ fontSize: 12, color: "#604030" }}>
            © 2025 Aditya Soran &nbsp;·&nbsp; AI Developer
          </span>
        </div>
      </div>
    </>
  );
}
