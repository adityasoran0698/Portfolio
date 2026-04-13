import { useState, useEffect, useRef } from "react";
import backgroundImage from "./image.png";
import MyCV from "./CV.pdf";
import AyurImage from "./ayur.png";
import YoutubeImage from "./Youtube.png";

/* ─────────────────────────────────────────────
   ABOUT SECTION — inject keyframes once
───────────────────────────────────────────── */
const ABOUT_STYLE_ID = "about-section-keyframes";
if (
  typeof document !== "undefined" &&
  !document.getElementById(ABOUT_STYLE_ID)
) {
  const s = document.createElement("style");
  s.id = ABOUT_STYLE_ID;
  s.textContent = `
    @keyframes ab-fadeUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
    @keyframes ab-fadeRight{ from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
    @keyframes ab-fadeLeft { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
    @keyframes ab-lineGrow { from{transform:scaleX(0)} to{transform:scaleX(1)} }
    @keyframes ab-chipIn   { from{opacity:0;transform:translateY(10px) scale(.9)} to{opacity:1;transform:translateY(0) scale(1)} }
    @keyframes ab-shimmer  { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
    @keyframes ab-pulseDot { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.4)} }
    @keyframes ab-glowFloat{ 0%,100%{transform:translateY(0) scale(1);opacity:.6} 50%{transform:translateY(-18px) scale(1.04);opacity:.9} }
    @keyframes ab-orbDrift { 0%,100%{transform:translate(0,0)} 33%{transform:translate(30px,-20px)} 66%{transform:translate(-20px,25px)} }


    .ab-section .ab-reveal        { opacity:0; transform:translateY(24px); transition:opacity .65s cubic-bezier(.22,1,.36,1), transform .65s cubic-bezier(.22,1,.36,1); }
    .ab-section .ab-reveal.ab-vis { opacity:1; transform:translateY(0); }

    .ab-card::after {
      content:''; position:absolute; top:0; left:0; right:0; height:2px;
      background:linear-gradient(90deg,#f26522,transparent);
      transform:scaleX(0); transform-origin:left;
      transition:transform .45s cubic-bezier(.22,1,.36,1);
    }
    .ab-card:hover::after { transform:scaleX(1); }
    .ab-card::before {
      content:''; position:absolute; top:-60%; left:-60%; width:60%; height:200%;
      background:linear-gradient(120deg,transparent,rgba(242,101,34,.07),transparent);
      transform:skewX(-20deg) translateX(-100%);
      transition:transform .55s ease; pointer-events:none;
    }
    .ab-card:hover::before { transform:skewX(-20deg) translateX(360%); }
    .ab-card:hover         { background:rgba(242,101,34,.04) !important; }
    .ab-card:hover .ab-card-num   { color:rgba(242,101,34,.6); }
    .ab-card:hover .ab-card-title { color:#fff; }
    .ab-card:hover .ab-card-body  { color:#906050; }
    .ab-card:hover .ab-card-icon  {
      border-color:rgba(242,101,34,.55);
      transform:rotate(-4deg) scale(1.08);
      box-shadow:0 0 16px rgba(242,101,34,.18);
    }

    .ab-trait::before {
      content:''; position:absolute; left:0; top:0; bottom:0; width:2px;
      background:#f26522; transform:scaleY(0);
      transition:transform .35s cubic-bezier(.22,1,.36,1);
    }
    .ab-trait:hover::before  { transform:scaleY(1); }
    .ab-trait:hover          { background:rgba(242,101,34,.025) !important; }
    .ab-trait:hover .ab-trait-title { color:#fff; }
    .ab-trait:hover .ab-trait-body  { color:#806050; }
    .ab-trait:hover .ab-trait-icon  {
      border-color:#f26522;
      background:rgba(242,101,34,.1);
      transform:scale(1.1);
    }

    .ab-chip-inner::before {
      content:''; position:absolute; inset:0;
      background:#f26522; transform:scaleX(0); transform-origin:left;
      transition:transform .28s ease; z-index:-1;
    }
    .ab-chip-inner:hover { color:#160b00 !important; border-color:#f26522 !important; transform:translateY(-2px); }
    .ab-chip-inner:hover::before { transform:scaleX(1); }

    .ab-divider::after {
      content:''; position:absolute; top:0; left:-40%; width:30%; height:100%;
      background:linear-gradient(90deg,transparent,rgba(242,101,34,.55),transparent);
      animation:ab-shimmer 3s linear infinite;
    }

    .ab-badge::after {
      content:''; position:absolute; inset:0;
      background:linear-gradient(90deg,transparent 0%,rgba(242,101,34,.08) 50%,transparent 100%);
      background-size:300% 100%; opacity:0;
      transition:opacity .3s; animation:ab-shimmer 2.5s linear infinite;
    }
    .ab-badge:hover { border-color:rgba(242,101,34,.5) !important; background:rgba(242,101,34,.09) !important; }
    .ab-badge:hover::after { opacity:1; }

    .ab-quote::after {
      content:''; position:absolute; bottom:0; left:20px; right:0;
      height:1px; background:linear-gradient(90deg,#f26522,transparent);
      transform:scaleX(0); transform-origin:left;
      transition:transform .5s ease;
    }
    .ab-left-col:hover .ab-quote::after { transform:scaleX(1); }
  `;
  document.head.appendChild(s);
}

/* ─────────────────────────────────────────────
   ABOUT SECTION — local SVG icons
───────────────────────────────────────────── */
const AbIconChat = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const AbIconMonitor = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);
const AbIconSearch = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);
const AbIconShield = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const AbIconInfo = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4M12 16h.01" />
  </svg>
);
const AbIconUsers = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const AbIconActivity = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

/* ─────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&family=Syne:wght@400;600;700;800&family=Instrument+Sans:ital,wght@0,400;0,500;1,400&display=swap');
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior:smooth; }
  body { background:#160b00; overflow-x:hidden; }
  ::-webkit-scrollbar { width:5px; }
  ::-webkit-scrollbar-track { background:#160b00; }
  ::-webkit-scrollbar-thumb { background:#f26522; border-radius:3px; }

  @keyframes floatY {
    0%,100% { transform: translateY(0px) rotate(var(--rot,0deg)); }
    50%      { transform: translateY(-18px) rotate(var(--rot,0deg)); }
  }
  @keyframes floatSlow {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-10px); }
  }
  @keyframes spinRing {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes spinRingRev {
    from { transform: rotate(0deg); }
    to   { transform: rotate(-360deg); }
  }
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(28px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes pulseGlow {
    0%,100% { box-shadow: 0 8px 30px rgba(242,101,34,0.4); }
    50%      { box-shadow: 0 8px 55px rgba(242,101,34,0.75); }
  }
  @keyframes loadFadeIn {
    from { opacity:0; transform: translateY(12px); }
    to   { opacity:1; transform: translateY(0); }
  }
  @keyframes netflixBgFade {
    0%   { opacity:1; }
    80%  { opacity:1; }
    100% { opacity:0; }
  }
  @keyframes netflixLetterZoom {
    0%   { transform: scale(0.7); opacity:0; }
    12%  { transform: scale(0.85); opacity:1; }
    70%  { transform: scale(7); opacity:1; }
    88%  { transform: scale(12); opacity:0; }
    100% { transform: scale(14); opacity:0; }
  }
  @keyframes netflixSoundWave {
    0%,100% { height: 4px; }
    50%     { height: 20px; }
  }
  @keyframes netflixGlow {
    0%   { text-shadow: 0 0 20px rgba(242,101,34,0.3); }
    40%  { text-shadow: 0 0 60px rgba(242,101,34,0.9), 0 0 120px rgba(242,101,34,0.5); }
    70%  { text-shadow: 0 0 100px rgba(242,101,34,1), 0 0 200px rgba(242,101,34,0.7); }
    100% { text-shadow: 0 0 20px rgba(242,101,34,0.1); }
  }
  @keyframes siteReveal {
    from { opacity:0; transform: scale(1.04); }
    to   { opacity:1; transform: scale(1); }
  }
  @keyframes skillTagFloat {
    0%,100% { transform: translateY(0); }
    50%     { transform: translateY(-4px); }
  }
  @keyframes abBlink {
    0%,100% { opacity:1; box-shadow: 0 0 6px #22c55e; }
    50%      { opacity:0.4; box-shadow: none; }
  }

  .fu  { animation: fadeUp 0.6s ease both; }
  .fu1 { animation-delay: 0.05s; }
  .fu2 { animation-delay: 0.18s; }
  .fu3 { animation-delay: 0.32s; }
  .fu4 { animation-delay: 0.46s; }

  .site-enter { animation: siteReveal 0.8s ease both; }

  .btn-primary {
    animation: pulseGlow 2.5s ease-in-out infinite;
    transition: transform 0.2s ease, filter 0.2s ease;
  }
  .btn-primary:hover { transform: scale(1.06); filter: brightness(1.12); }
  .btn-ghost { transition: background 0.2s ease, border-color 0.2s ease; }
  .btn-ghost:hover {
    background: rgba(242,101,34,0.1) !important;
    border-color: rgba(242,101,34,0.7) !important;
  }

  .nav-link { transition: all 0.22s ease; }

  .proj-card {
    transition: transform 0.28s ease, box-shadow 0.28s ease;
    cursor: pointer;
  }
  .proj-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 24px 60px rgba(242,101,34,0.22) !important;
  }
  .proj-card:hover .proj-img-overlay { opacity:1 !important; }
  .proj-card:hover .proj-img { transform: scale(1.06); }

  .skill-badge {
    transition: transform 0.18s ease, box-shadow 0.18s ease;
    cursor: default;
  }
  .skill-badge:hover { transform: translateY(-3px) scale(1.06); }
`;

/* ─────────────────────────────────────────────
   SVG ICONS
───────────────────────────────────────────── */
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
  OpenAI: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path
        d="M29.1 13.4a7.6 7.6 0 00-.65-6.23 7.7 7.7 0 00-8.3-3.7A7.7 7.7 0 0014.3 1a7.7 7.7 0 00-7.34 5.33A7.7 7.7 0 002.9 9.9a7.72 7.72 0 001 9.46 7.6 7.6 0 00.65 6.23 7.7 7.7 0 008.3 3.7A7.65 7.65 0 0017.7 31a7.7 7.7 0 007.35-5.34 7.7 7.7 0 004.07-3.57 7.72 7.72 0 00-1.01-9.46zM17.7 29.1a5.72 5.72 0 01-3.67-1.33l.18-.1 6.1-3.52a1 1 0 00.5-.87v-8.6l2.58 1.49v.07a5.77 5.77 0 01-5.7 6.36zM5.06 23.77a5.75 5.75 0 01-.69-3.86l.19.11 6.09 3.52a1 1 0 001 0l7.44-4.3v2.98l.01.06-6.16 3.56a5.77 5.77 0 01-7.88-2.07zm-.87-12.65a5.72 5.72 0 012.97-2.52v7.23a1 1 0 00.5.87l7.44 4.3-2.58 1.48h-.07L6.3 18.9a5.77 5.77 0 01-2.1-7.78zm21.25 4.96l-7.44-4.3 2.58-1.49h.07l6.15 3.55a5.77 5.77 0 01-.9 10.4v-7.23a1 1 0 00-.46-.93zm2.57-3.87l-.19-.11-6.09-3.52a1 1 0 00-1 0l-7.44 4.3V9.9l6.16-3.55a5.76 5.76 0 018.56 5.96zM11.7 17.46L9.12 16v-.07a5.77 5.77 0 015.7-6.36 5.72 5.72 0 013.66 1.33l-.18.1-6.1 3.52a1 1 0 00-.5.87v.07zm1.4-3.02l3.32-1.92 3.31 1.91v3.83L16.4 20.2l-3.31-1.92v-3.83z"
        fill="white"
      />
    </svg>
  ),
  FAISS: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="6" fill="#6366F1" />
      <circle cx="16" cy="16" r="4" fill="white" opacity="0.9" />
      <circle cx="8" cy="10" r="2.5" fill="white" opacity="0.6" />
      <circle cx="24" cy="10" r="2.5" fill="white" opacity="0.6" />
      <circle cx="8" cy="22" r="2.5" fill="white" opacity="0.6" />
      <circle cx="24" cy="22" r="2.5" fill="white" opacity="0.6" />
      <line
        x1="16"
        y1="12"
        x2="9.5"
        y2="11.5"
        stroke="white"
        strokeWidth="1"
        opacity="0.5"
      />
      <line
        x1="16"
        y1="12"
        x2="22.5"
        y2="11.5"
        stroke="white"
        strokeWidth="1"
        opacity="0.5"
      />
      <line
        x1="16"
        y1="20"
        x2="9.5"
        y2="20.5"
        stroke="white"
        strokeWidth="1"
        opacity="0.5"
      />
      <line
        x1="16"
        y1="20"
        x2="22.5"
        y2="20.5"
        stroke="white"
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  ),
  Docker: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path
        d="M13 14h3v3h-3zM17 14h3v3h-3zM17 10h3v3h-3zM13 10h3v3h-3zM9 14h3v3H9zM21 14h3v3h-3z"
        fill="#2496ED"
      />
      <path
        d="M29.6 15.3a5.5 5.5 0 00-3.4-.9h-.3c-.4-2.4-2-3.9-4.8-4.4l-.8-.2-.3.8c-.4 1-.5 2-.3 3-.4-.2-.9-.4-1.4-.4H2.8l-.1.5C2.4 15 2.5 17 3.5 18.5c1.2 1.7 2.9 2.5 5.5 2.5 5.2 0 9.1-2.4 10.9-6.7.7.1 2 .1 2.7-.6.5-.5.7-1 .8-1.3l.1-.4-.9-.7z"
        fill="#2496ED"
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
  LangChain: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="6" fill="#1C1C1C" />
      <path d="M6 12h8l2 4-2 4H6l2-4-2-4z" fill="#00D084" opacity="0.9" />
      <path d="M26 12h-8l-2 4 2 4h8l-2-4 2-4z" fill="#00D084" opacity="0.6" />
      <line x1="14" y1="16" x2="18" y2="16" stroke="#00D084" strokeWidth="2" />
    </svg>
  ),
  Lightning: ({ size = 22, color = "#f26522" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M13 2L4.5 13.5H11L10 22L20.5 10H14L13 2z" />
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
  FastAPI: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" fill="#009688" />
      <path d="M17 6l-7 11h6l-1 9 7-11h-6z" fill="white" />
    </svg>
  ),
  Tailwind: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path
        d="M9 13.5c1-4 3.5-6 7.5-6 6 0 6.75 4.5 9.75 5.25C28.5 13.5 30.5 12 32 10.5c-1 4-3.5 6-7.5 6-6 0-6.75-4.5-9.75-5.25C12.5 10.5 10.5 12 9 13.5zm-9 9c1-4 3.5-6 7.5-6 6 0 6.75 4.5 9.75 5.25C19.5 22.5 21.5 21 23 19.5c-1 4-3.5 6-7.5 6-6 0-6.75-4.5-9.75-5.25C3.5 19.5 1.5 21 0 22.5z"
        fill="#38BDF8"
      />
    </svg>
  ),
  JS: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="4" fill="#F7DF1E" />
      <path
        d="M9.5 25.5L12 24c.5 1 .9 1.8 2 1.8 1 0 1.7-.4 1.7-2V13h3v10.8c0 3.3-1.9 4.8-4.7 4.8-2.5 0-3.9-1.3-4.5-2.9z"
        fill="#323330"
      />
    </svg>
  ),
  Monitor: ({ size = 22, color = "#61DAFB" }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  Server: ({ size = 22, color = "#2496ED" }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  ),
  Database: ({ size = 22, color = "#F6AD55" }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  Cpu: ({ size = 22, color = "#A78BFA" }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  ),
  Wrench: ({ size = 22, color = "#F97316" }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  Rocket: ({ size = 22, color = "#f26522" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C12 2 7 7 7 13c0 2.8 1.2 5.3 3 7l2 2 2-2c1.8-1.7 3-4.2 3-7 0-6-5-11-5-11z"
        fill={color}
        opacity="0.8"
      />
      <circle cx="12" cy="12" r="2" fill="white" />
      <path
        d="M9 16l-3 4M15 16l3 4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  ),
};

/* ─────────────────────────────────────────────
   NETFLIX INTRO + LOADING
───────────────────────────────────────────── */
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
            animation: "loadFadeIn 0.5s ease both",
          }}
        >
          aditya<span style={{ color: "#f26522" }}>.</span>
        </div>
        <div
          style={{
            width: 260,
            height: 2.5,
            background: "rgba(255,255,255,0.08)",
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
              transition: "width 0.1s ease",
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
            color: "rgba(242,101,34,0.15)",
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
        animation:
          phase === "out" ? "netflixBgFade 0.6s ease forwards" : "none",
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
            "netflixLetterZoom 2.4s cubic-bezier(0.33, 1, 0.68, 1) forwards, netflixGlow 2.4s ease forwards",
          letterSpacing: "-0.05em",
          userSelect: "none",
        }}
      >
        aditya.
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
              animation: `netflixSoundWave 0.8s ease-in-out infinite`,
              animationDelay: `${d}s`,
              height: 4,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   AVATAR — 3D tilt
───────────────────────────────────────────── */
function Avatar3D({ photoUrl }) {
  const charRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;
    const onMove = (e) => {
      const r = hero.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      if (charRef.current)
        charRef.current.style.transform = `perspective(700px) rotateY(${dx * 10}deg) rotateX(${-dy * 7}deg) translateZ(10px)`;
      if (bgRef.current)
        bgRef.current.style.transform = `translate(${dx * -20}px, ${dy * -14}px)`;
    };
    const onLeave = () => {
      if (charRef.current)
        charRef.current.style.transform =
          "perspective(700px) rotateY(0deg) rotateX(0deg) translateZ(0)";
      if (bgRef.current) bgRef.current.style.transform = "translate(0,0)";
    };
    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, []);

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
        ref={bgRef}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          transition: "transform 0.15s ease",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 380,
            height: 380,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(242,101,34,0.18) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 460,
            height: 460,
            border: "1.5px solid rgba(242,101,34,0.13)",
            borderRadius: "50%",
            animation: "spinRing 22s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 330,
            height: 330,
            border: "1px solid rgba(242,101,34,0.09)",
            borderRadius: "50%",
            animation: "spinRingRev 15s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 210,
            height: 210,
            border: "1px dashed rgba(242,101,34,0.06)",
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
            boxShadow: `0 0 22px ${border}28, 0 4px 18px rgba(0,0,0,0.55)`,
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
        ref={charRef}
        style={{
          position: "relative",
          zIndex: 10,
          transition: "transform 0.12s ease",
          transformStyle: "preserve-3d",
          filter:
            "drop-shadow(0 40px 60px rgba(242,101,34,0.45)) drop-shadow(0 20px 30px rgba(0,0,0,0.6))",
          marginBottom: -8,
        }}
      >
        <div style={{ animation: "floatSlow 4s ease-in-out infinite" }}>
          <img
            src={photoUrl}
            alt="Character"
            style={{
              width: 520,
              height: "auto",
              marginBottom: -40,
              marginLeft: -50,
              objectFit: "contain",
              transform: "translate(-35px, 10px)",
              filter: "drop-shadow(0 30px 60px rgba(242,101,34,0.5))",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ABOUT SECTION — redesigned with rich animations
───────────────────────────────────────────── */
function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;

    // Scroll reveal
    const revObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            e.target.style.transitionDelay = `${i * 0.08}s`;
            e.target.classList.add("ab-vis");
            revObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    sec.querySelectorAll(".ab-reveal").forEach((el) => revObs.observe(el));

    // Chips stagger
    sec.querySelectorAll(".ab-chip-inner").forEach((c, i) => {
      c.style.animationName = "ab-chipIn";
      c.style.animationDuration = "0.4s";
      c.style.animationTimingFunction = "cubic-bezier(.34,1.56,.64,1)";
      c.style.animationFillMode = "both";
      c.style.animationDelay = `${0.55 + i * 0.05}s`;
    });

    return () => revObs.disconnect();
  }, []);

  const chips = [
    "LangChain",
    "OpenAI",
    "Gemini",
    "HuggingFace",
    "Ollama",
    "FAISS",
    "ChromaDB",
    "FastAPI",
    "React",
    "Node.js",
    "MongoDB",
    "Docker",
    "Python",
  ];

  const cards = [
    {
      num: "01",
      title: "Generative AI with LangChain",
      icon: <AbIconChat />,
      body: "I use LangChain to connect LLMs to real data — documents, APIs, YouTube transcripts. I build RAG pipelines where the AI reads your actual content before answering, so responses are grounded, not guessed.",
    },
    {
      num: "02",
      title: "Full-Stack Development",
      icon: <AbIconMonitor />,
      body: "React for the UI, FastAPI or Node.js for the backend, MongoDB for data. I handle auth, APIs, and deployment — so the AI layer lives inside a complete, polished product anyone can use.",
    },
    {
      num: "03",
      title: "Smart Search & Retrieval",
      icon: <AbIconSearch />,
      body: "Vector databases like FAISS and ChromaDB store content as searchable numbers. I design these search systems so when you ask a question, the AI finds the right piece of information — fast and accurately.",
    },
  ];

  const traits = [
    {
      title: "I read the docs, then break things",
      icon: <AbIconShield />,
      body: "Before I build, I understand. I read how the tool works, then push it until it breaks — because that's where you learn what it actually does.",
    },
    {
      title: "I understand what I build",
      icon: <AbIconInfo />,
      body: "When something breaks, I want to know why — not just restart it. I dig into the retrieval pipeline, the token count, the model call — until I find the actual cause.",
    },
    {
      title: "I build for real users",
      icon: <AbIconUsers />,
      body: "Every feature has to make sense to someone who doesn't care what vector database I used. Good software is invisible — users just feel like it works.",
    },
    {
      title: "Always learning",
      icon: <AbIconActivity />,
      body: "New model released? New framework dropped? I want to try it, break it, and figure out if it changes what I'm building. Staying current isn't optional in this field.",
    },
  ];

  const O = "#f26522";
  const BG = "#160b00";
  const FG = "#f5f0e8";

  return (
    <section
      id="about"
      ref={sectionRef}
      className="ab-section"
      style={{
        background: BG,
        color: FG,
        fontFamily: "'Instrument Sans','DM Sans',sans-serif",
        padding: "90px 56px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated glow orbs */}
      {[
        {
          w: 560,
          h: 560,
          top: -110,
          right: -90,
          op: 0.1,
          anim: "ab-glowFloat 8s ease-in-out infinite",
          delay: "-2s",
        },
        {
          w: 380,
          h: 380,
          bottom: 40,
          left: -70,
          op: 0.07,
          anim: "ab-glowFloat 11s ease-in-out infinite",
          delay: "-5s",
        },
        {
          w: 220,
          h: 220,
          top: "55%",
          left: "42%",
          op: 0.05,
          anim: "ab-orbDrift 14s ease-in-out infinite",
          delay: "0s",
        },
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
            animation: g.anim,
            animationDelay: g.delay,
          }}
        />
      ))}

      {/* Noise texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Scan line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: 2,
          background:
            "linear-gradient(90deg,transparent,rgba(242,101,34,0.13),transparent)",
          pointerEvents: "none",
          animation: "ab-scanLine 8s linear infinite",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ── TOP ROW ── */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 36,
            marginBottom: 64,
          }}
        >
          {/* Name block */}
          <div
            style={{
              animation: "ab-fadeUp .75s cubic-bezier(.22,1,.36,1) both",
              animationDelay: ".15s",
            }}
          >
            <div
              style={{
                fontSize: 10.5,
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: O,
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 22,
                animation: "ab-fadeRight .7s ease both",
                animationDelay: ".1s",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 28,
                  height: 1,
                  background: O,
                  flexShrink: 0,
                  transformOrigin: "left",
                  animation: "ab-lineGrow .6s ease both",
                  animationDelay: ".05s",
                }}
              />
              About me
            </div>
            {/* ← FIXED font size: was clamp(52px,7vw,96px) → now clamp(36px,4.6vw,56px) */}
            <div
              style={{
                fontFamily: "'Clash Display', 'Satoshi', sans-serif",
                fontSize: "clamp(56px, 6.5vw, 92px)",
                fontWeight: 1000,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              <div>Aditya</div>
              <div
                style={{
                  WebkitTextStroke: "1.5px rgba(242,101,34,0.4)",
                  color: "transparent",
                  transition: "color .4s,-webkit-text-stroke .4s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "rgba(242,101,34,0.15)";
                  e.target.style.WebkitTextStroke = `1.5px ${O}`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "transparent";
                  e.target.style.WebkitTextStroke =
                    "1.5px rgba(242,101,34,0.4)";
                }}
              >
                Soran
              </div>
              <div style={{ color: O }}>—</div>
            </div>
          </div>

          {/* Intro */}
          <div
            style={{
              flex: "0 0 380px",
              paddingTop: 14,
              animation: "ab-fadeLeft .75s cubic-bezier(.22,1,.36,1) both",
              animationDelay: ".25s",
            }}
          >
            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.9,
                color: "#907060",
                marginBottom: 12,
              }}
            >
              I'm an{" "}
              <strong style={{ color: "#d4a080", fontWeight: 500 }}>
                AI & Full Stack Developer
              </strong>{" "}
              who builds complete, production-ready products — from the AI layer
              all the way to the user interface. I use{" "}
              <strong style={{ color: "#d4a080", fontWeight: 500 }}>
                LangChain, OpenAI, and vector databases
              </strong>{" "}
              to make applications that are genuinely intelligent, not just
              connected to an API.
            </p>
            <p style={{ fontSize: 14.5, lineHeight: 1.9, color: "#907060" }}>
              On the full-stack side, I work across{" "}
              <strong style={{ color: "#d4a080", fontWeight: 500 }}>
                React, FastAPI, Node.js, and MongoDB
              </strong>{" "}
              — handling everything from backend logic and authentication to
              deployment.
            </p>
            <div
              className="ab-badge"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginTop: 22,
                padding: "9px 16px",
                border: "1px solid rgba(242,101,34,0.22)",
                background: "rgba(242,101,34,0.05)",
                position: "relative",
                overflow: "hidden",
                transition: "border-color .3s, background .3s",
                cursor: "default",
              }}
            >
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: O,
                  opacity: 0.5,
                  animation: "ab-pulseDot 2.4s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "'Syne','Plus Jakarta Sans',sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: O,
                }}
              >
                AI & Full Stack Developer
              </span>
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: O,
                  opacity: 0.5,
                  animation: "ab-pulseDot 2.4s ease-in-out infinite",
                  animationDelay: ".6s",
                }}
              />
            </div>
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div
          className="ab-divider ab-reveal"
          style={{
            width: "100%",
            height: 1,
            background:
              "linear-gradient(90deg,rgba(242,101,34,0.28),rgba(242,101,34,0.05) 60%,transparent)",
            marginBottom: 52,
            transformOrigin: "left",
            animation: "ab-lineGrow 1s cubic-bezier(.22,1,.36,1) both",
            animationDelay: ".4s",
            position: "relative",
            overflow: "hidden",
          }}
        />

        {/* ── THREE CARDS ── */}
        <div
          className="ab-reveal"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 1,
            background: "rgba(242,101,34,0.1)",
            marginBottom: 56,
          }}
        >
          {cards.map((card) => (
            <div
              key={card.num}
              className="ab-card"
              style={{
                background: BG,
                padding: "34px 26px",
                position: "relative",
                overflow: "hidden",
                transition: "background .35s",
                cursor: "default",
              }}
            >
              <div
                className="ab-card-num"
                style={{
                  fontFamily: "'Syne','Plus Jakarta Sans',sans-serif",
                  fontSize: 11,
                  fontWeight: 800,
                  color: "rgba(242,101,34,0.28)",
                  letterSpacing: "0.1em",
                  marginBottom: 16,
                  transition: "color .3s",
                }}
              >
                {card.num}
              </div>
              <div
                className="ab-card-icon"
                style={{
                  width: 36,
                  height: 36,
                  border: "1px solid rgba(242,101,34,0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: O,
                  marginBottom: 14,
                  transition:
                    "border-color .3s, transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .35s",
                }}
              >
                {card.icon}
              </div>
              <div
                className="ab-card-title"
                style={{
                  fontFamily: "'Syne','Plus Jakarta Sans',sans-serif",
                  fontSize: 14.5,
                  fontWeight: 700,
                  color: FG,
                  letterSpacing: "-0.01em",
                  marginBottom: 9,
                  lineHeight: 1.3,
                  transition: "color .3s",
                }}
              >
                {card.title}
              </div>
              <div
                className="ab-card-body"
                style={{
                  fontSize: 12.5,
                  color: "#705040",
                  lineHeight: 1.82,
                  transition: "color .3s",
                }}
              >
                {card.body}
              </div>
            </div>
          ))}
        </div>

        {/* ── BOTTOM ROW ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: 52,
            alignItems: "start",
          }}
        >
          {/* Left */}
          <div className="ab-left-col ab-reveal">
            <div
              style={{
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(242,101,34,0.4)",
                marginBottom: 20,
              }}
            >
              How I think
            </div>
            <div
              className="ab-quote"
              style={{
                fontFamily: "'Syne','Plus Jakarta Sans',sans-serif",
                fontSize: "clamp(15px,1.5vw,20px)",
                fontWeight: 700,
                lineHeight: 1.48,
                color: FG,
                position: "relative",
                paddingLeft: 20,
                marginBottom: 20,
                borderLeft: `3px solid ${O}`,
              }}
            >
              "I want to build AI that solves something real — not just a cool
              demo that nobody uses twice."
            </div>
            <p
              style={{
                fontSize: 13.5,
                color: "#806050",
                lineHeight: 1.9,
                paddingLeft: 20,
                marginBottom: 12,
              }}
            >
              I became an AI & Full Stack Developer because I wanted to build
              things that genuinely help people. That meant learning how to feed
              LLMs the right context, how to stop them giving wrong answers, and
              how to make the whole experience feel effortless to someone who
              doesn't care about the tech underneath.
            </p>
            <p
              style={{
                fontSize: 13.5,
                color: "#806050",
                lineHeight: 1.9,
                paddingLeft: 20,
              }}
            >
              Every project I've built comes from a real problem — a hackathon
              brief, a need to chat with any YouTube video, a way to break down
              dense research papers. Real problems push you to learn fast and
              ship things that actually work.
            </p>
            {/* Chips */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 7,
                marginTop: 32,
                paddingTop: 32,
                borderTop: "1px solid rgba(242,101,34,0.1)",
              }}
            >
              {chips.map((chip) => (
                <div
                  key={chip}
                  className="ab-chip-inner"
                  style={{
                    fontSize: 10.5,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "#805040",
                    border: "1px solid rgba(242,101,34,0.15)",
                    padding: "5px 13px",
                    fontWeight: 500,
                    position: "relative",
                    overflow: "hidden",
                    transition:
                      "color .25s, border-color .25s, background .25s, transform .25s",
                    cursor: "default",
                  }}
                >
                  {chip}
                </div>
              ))}
            </div>
          </div>

          {/* Right — traits */}
          <div
            className="ab-reveal"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {traits.map((trait, i) => (
              <div
                key={i}
                className="ab-trait"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16,
                  padding: "18px 0",
                  borderBottom:
                    i < traits.length - 1
                      ? "1px solid rgba(242,101,34,0.07)"
                      : "none",
                  position: "relative",
                  overflow: "hidden",
                  transition: "background .3s",
                  borderRadius: 2,
                }}
              >
                <div
                  className="ab-trait-icon"
                  style={{
                    width: 32,
                    height: 32,
                    border: "1px solid rgba(242,101,34,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: O,
                    transition:
                      "border-color .3s, background .3s, transform .3s cubic-bezier(.34,1.56,.64,1)",
                  }}
                >
                  {trait.icon}
                </div>
                <div>
                  <div
                    className="ab-trait-title"
                    style={{
                      fontFamily: "'Syne','Plus Jakarta Sans',sans-serif",
                      fontSize: 12.5,
                      fontWeight: 700,
                      color: FG,
                      marginBottom: 4,
                      transition: "color .3s",
                    }}
                  >
                    {trait.title}
                  </div>
                  <div
                    className="ab-trait-body"
                    style={{
                      fontSize: 12,
                      color: "#705040",
                      lineHeight: 1.68,
                      transition: "color .3s",
                    }}
                  >
                    {trait.body}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SKILLS SECTION
───────────────────────────────────────────── */
function SkillsSection() {
  const categories = [
    {
      title: "Frontend",
      Icon: Icons.Monitor,
      headerColor: "#61DAFB",
      skills: [
        { name: "React.js", color: "#61DAFB", bg: "#001c24" },
        { name: "JavaScript", color: "#F7DF1E", bg: "#1a1500" },
        { name: "HTML5", color: "#E34F26", bg: "#1a0800" },
        { name: "TailwindCSS", color: "#38BDF8", bg: "#001518" },
        { name: "Redux", color: "#764ABC", bg: "#0d0518" },
        { name: "React Router", color: "#CA4245", bg: "#1a0505" },
        { name: "React Hook Form", color: "#EC5990", bg: "#1a0510" },
        { name: "Chart.js", color: "#FF6384", bg: "#1a0308" },
      ],
    },
    {
      title: "Backend & APIs",
      Icon: Icons.Server,
      headerColor: "#68D391",
      skills: [
        { name: "Node.js", color: "#68D391", bg: "#041204" },
        { name: "Express.js", color: "#a0a0a0", bg: "#141414" },
        { name: "FastAPI", color: "#009688", bg: "#001512" },
        { name: "Python", color: "#FFD43B", bg: "#1a1200" },
        { name: "Socket.io", color: "#e0e0e0", bg: "#111" },
        { name: "EJS", color: "#B4CA65", bg: "#0e1400" },
        { name: "Pydantic", color: "#E92063", bg: "#1a0010" },
        { name: "REST APIs", color: "#FF9500", bg: "#1a0e00" },
        { name: "JWT Auth", color: "#D63AFF", bg: "#120520" },
      ],
    },
    {
      title: "Databases",
      Icon: Icons.Database,
      headerColor: "#F6AD55",
      skills: [
        { name: "MongoDB", color: "#47A248", bg: "#041204" },
        { name: "MySQL", color: "#4479A1", bg: "#040c1a" },
        { name: "Vector Databases", color: "#FF6B6B", bg: "#1a0505" },
        { name: "ChromaDB", color: "#7C3AED", bg: "#09051a" },
        { name: "FAISS", color: "#818CF8", bg: "#08091a" },
      ],
    },
    {
      title: "Generative AI & LLMs",
      Icon: Icons.Cpu,
      headerColor: "#A78BFA",
      skills: [
        { name: "Generative AI", color: "#A78BFA", bg: "#0d0520" },
        { name: "LangChain", color: "#00D084", bg: "#001a10" },
        { name: "OpenAI Models", color: "#e0e0e0", bg: "#111" },
        { name: "OpenAI Embeddings", color: "#74AA9C", bg: "#051210" },
        { name: "Agentic AI", color: "#F59E0B", bg: "#1a1000" },
        { name: "LLMs", color: "#6EE7B7", bg: "#041510" },
        { name: "RAG Systems", color: "#818CF8", bg: "#0a0b1a" },
        { name: "HuggingFace", color: "#FFD21E", bg: "#1a1500" },
        { name: "Ollama", color: "#e0e0e0", bg: "#111" },
        { name: "Open Source Models", color: "#34D399", bg: "#041510" },
        { name: "Closed Source Models", color: "#F87171", bg: "#1a0505" },
        { name: "Prompt Engineering", color: "#FCA5A5", bg: "#1a0808" },
        { name: "Gemini", color: "#4285F4", bg: "#040c1a" },
      ],
    },
    {
      title: "DevOps & Tools",
      Icon: Icons.Wrench,
      headerColor: "#F97316",
      skills: [
        { name: "Git", color: "#F05032", bg: "#1a0800" },
        { name: "GitHub", color: "#e0e0e0", bg: "#111" },
        { name: "Docker", color: "#2496ED", bg: "#041018" },
        { name: "Vercel", color: "#e0e0e0", bg: "#111" },
        { name: "Render", color: "#46E3B7", bg: "#041510" },
        { name: "NPM", color: "#CB3837", bg: "#1a0505" },
        { name: "PowerShell", color: "#5391FE", bg: "#040c1a" },
        { name: "DSA", color: "#FF9500", bg: "#1a0e00" },
        { name: "OOPs", color: "#34D399", bg: "#041510" },
        { name: "DBMS", color: "#F6AD55", bg: "#1a1000" },
      ],
    },
  ];

  return (
    <section
      id="skills"
      style={{
        padding: "96px 52px",
        background: "rgba(10,4,0,0.55)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "0%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(242,101,34,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          right: "0%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(97,218,251,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <p
          style={{
            color: "#f26522",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          What I bring
        </p>
        <h2
          style={{
            fontFamily: "Plus Jakarta Sans,sans-serif",
            fontSize: 42,
            fontWeight: 800,
            letterSpacing: "-0.01em",
            marginBottom: 52,
          }}
        >
          My <span style={{ color: "#f26522" }}>Skills</span>
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {categories.map((cat) => (
            <div
              key={cat.title}
              style={{
                background: "rgba(14,5,0,0.7)",
                border: `1px solid ${cat.headerColor}20`,
                borderRadius: 22,
                padding: "28px 28px",
                backdropFilter: "blur(14px)",
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
                  height: 2.5,
                  background: `linear-gradient(90deg,${cat.headerColor},${cat.headerColor}40,transparent)`,
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 18,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: `${cat.headerColor}18`,
                    border: `1.5px solid ${cat.headerColor}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <cat.Icon size={17} color={cat.headerColor} />
                </div>
                <span
                  style={{
                    fontFamily: "Plus Jakarta Sans,sans-serif",
                    fontSize: 15,
                    fontWeight: 800,
                    color: "#f5f0e8",
                  }}
                >
                  {cat.title}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background: `linear-gradient(90deg,${cat.headerColor}30,transparent)`,
                    marginLeft: 8,
                  }}
                />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
                {cat.skills.map(({ name, color, bg }) => (
                  <div
                    key={name}
                    className="skill-badge"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "7px 16px",
                      borderRadius: 50,
                      background: bg,
                      border: `1.5px solid ${color}50`,
                      boxShadow: `0 2px 12px ${color}20`,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color,
                        letterSpacing: "0.03em",
                        textTransform: "uppercase",
                      }}
                    >
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{ display: "flex", flexWrap: "wrap", gap: 9, marginTop: 24 }}
        >
          {[
            "OOPs",
            "DBMS",
            "JWT",
            "DSA",
            "Embeddings",
            "Semantic Search",
            "Multimodal AI",
            "AI Agents",
          ].map((t, i) => (
            <span
              key={t}
              style={{
                padding: "6px 15px",
                borderRadius: 50,
                fontSize: 12,
                fontWeight: 500,
                background: "rgba(242,101,34,0.07)",
                border: "1px solid rgba(242,101,34,0.18)",
                color: "#c07040",
                animation: `skillTagFloat ${2.5 + i * 0.15}s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PROJECT CARD
───────────────────────────────────────────── */
function ProjectCard({
  title,
  stack,
  desc,
  live,
  github,
  tags,
  bgColor,
  ProjectIcon,
  status,
}) {
  return (
    <div
      className="proj-card"
      style={{
        background: "rgba(18,8,0,0.95)",
        border: "1px solid rgba(242,101,34,0.14)",
        borderRadius: 22,
        overflow: "hidden",
        boxShadow: "0 4px 28px rgba(0,0,0,0.5)",
      }}
    >
      <div
        style={{
          position: "relative",
          height: 180,
          background: bgColor || "rgba(28,12,2,0.9)",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(242,101,34,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(242,101,34,0.05) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div
          className="proj-img"
          style={{
            position: "relative",
            zIndex: 2,
            transition: "transform 0.3s ease",
          }}
        >
          {ProjectIcon && (
            <img
              src={ProjectIcon}
              alt={title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 12,
              }}
            />
          )}
        </div>
        <div
          className="proj-img-overlay"
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(242,101,34,0.08)",
            opacity: 0,
            transition: "opacity 0.3s ease",
            zIndex: 3,
          }}
        />
        {status && (
          <div
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              zIndex: 4,
              display: "flex",
              alignItems: "center",
              gap: 5,
              background: "rgba(0,0,0,0.65)",
              border: "1px solid rgba(34,197,94,0.4)",
              borderRadius: 50,
              padding: "4px 12px",
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 6px #22c55e",
              }}
            />
            <span style={{ fontSize: 10, fontWeight: 700, color: "#22c55e" }}>
              {status}
            </span>
          </div>
        )}
      </div>
      <div style={{ padding: "20px 22px 22px" }}>
        <div
          style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
            marginBottom: 12,
          }}
        >
          {tags.map((t) => (
            <span
              key={t}
              style={{
                fontSize: 10,
                padding: "3px 10px",
                borderRadius: 20,
                background: "rgba(242,101,34,0.12)",
                color: "#f26522",
                fontWeight: 700,
                letterSpacing: "0.04em",
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <h3
          style={{
            fontFamily: "Plus Jakarta Sans,sans-serif",
            fontSize: 19,
            fontWeight: 800,
            color: "#f5f0e8",
            marginBottom: 8,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: 13,
            color: "#a08060",
            lineHeight: 1.7,
            marginBottom: 14,
          }}
        >
          {desc}
        </p>
        <div
          style={{
            fontSize: 10.5,
            color: "#705040",
            marginBottom: 18,
            fontFamily: "monospace",
            background: "rgba(242,101,34,0.05)",
            padding: "7px 12px",
            borderRadius: 8,
            borderLeft: "2px solid rgba(242,101,34,0.3)",
          }}
        >
          {stack}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noreferrer"
              style={{
                padding: "8px 18px",
                borderRadius: 50,
                background: "linear-gradient(135deg,#f26522,#c04a00)",
                color: "white",
                fontSize: 11.5,
                fontWeight: 700,
                textDecoration: "none",
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
                padding: "8px 18px",
                borderRadius: 50,
                border: "1.5px solid rgba(242,101,34,0.35)",
                color: "#f26522",
                fontSize: 11.5,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   NAV LINK
───────────────────────────────────────────── */
function NavLink({ label, active, onClick }) {
  return (
    <a
      href={`#${label.toLowerCase()}`}
      onClick={onClick}
      className="nav-link"
      style={{
        padding: "8px 20px",
        borderRadius: 50,
        fontSize: 13.5,
        fontWeight: active ? 700 : 500,
        color: active ? "white" : "rgba(255,255,255,0.65)",
        background: active
          ? "linear-gradient(135deg,#f26522,#c04a00)"
          : "transparent",
        border: active
          ? "1px solid rgba(242,101,34,0.5)"
          : "1px solid transparent",
        boxShadow: active
          ? "0 4px 18px rgba(242,101,34,0.45), inset 0 1px 0 rgba(255,255,255,0.25)"
          : "none",
        textDecoration: "none",
        letterSpacing: active ? "-0.01em" : "0",
        transition: "all 0.22s cubic-bezier(0.4,0,0.2,1)",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.color = "rgba(255,255,255,0.9)";
          e.currentTarget.style.background = "rgba(255,255,255,0.08)";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.color = "rgba(255,255,255,0.65)";
          e.currentTarget.style.background = "transparent";
        }
      }}
    >
      {label}
    </a>
  );
}

/* ─────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────── */
export default function Portfolio() {
  const photoUrl = backgroundImage;
  const [loaded, setLoaded] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const cursorDot = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
    const onMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    const animate = () => {
      if (cursorDot.current) {
        const { x: mx, y: my } = mousePos.current;
        cursorDot.current.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };
    const onScroll = () => setScrolled(window.scrollY > 40);
    document.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll);
    rafId.current = requestAnimationFrame(animate);
    return () => {
      document.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
      document.head.removeChild(style);
    };
  }, []);

  const NAV = ["Home", "About", "Skills", "Projects", "Connect"];
  const YTIcon = ({ size = 64 }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect
        x="8"
        y="18"
        width="48"
        height="28"
        rx="8"
        fill="rgba(242,101,34,0.15)"
        stroke="rgba(242,101,34,0.4)"
        strokeWidth="1.5"
      />
      <polygon points="26,24 44,32 26,40" fill="rgba(242,101,34,0.8)" />
      <rect
        x="12"
        y="50"
        width="40"
        height="3"
        rx="1.5"
        fill="rgba(242,101,34,0.3)"
      />
      <path
        d="M20 14h4M28 14h8M40 14h4"
        stroke="rgba(242,101,34,0.5)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
  const AIResearchIcon = ({ size = 64 }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect
        x="14"
        y="10"
        width="28"
        height="36"
        rx="4"
        fill="rgba(129,140,248,0.15)"
        stroke="rgba(129,140,248,0.4)"
        strokeWidth="1.5"
      />
      <line
        x1="20"
        y1="20"
        x2="36"
        y2="20"
        stroke="rgba(129,140,248,0.7)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="20"
        y1="26"
        x2="36"
        y2="26"
        stroke="rgba(129,140,248,0.5)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="20"
        y1="32"
        x2="30"
        y2="32"
        stroke="rgba(129,140,248,0.4)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle
        cx="44"
        cy="42"
        r="8"
        fill="rgba(129,140,248,0.15)"
        stroke="rgba(129,140,248,0.6)"
        strokeWidth="1.5"
      />
      <circle cx="44" cy="42" r="3" fill="rgba(129,140,248,0.5)" />
      <line
        x1="50"
        y1="48"
        x2="54"
        y2="52"
        stroke="rgba(129,140,248,0.7)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

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
        {/* NAVBAR */}
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            height: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: scrolled ? "rgba(14,6,0,0.6)" : "transparent",
            backdropFilter: scrolled ? "blur(28px) saturate(200%)" : "none",
            WebkitBackdropFilter: scrolled
              ? "blur(28px) saturate(200%)"
              : "none",
            borderBottom: scrolled
              ? "1px solid rgba(255,255,255,0.05)"
              : "none",
            transition: "all 0.3s ease",
            padding: "0 52px",
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
            }}
          >
            aditya<span style={{ color: "#f26522" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              background: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(40px) saturate(220%)",
              WebkitBackdropFilter: "blur(40px) saturate(220%)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 50,
              padding: "5px 6px",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.15), 0 8px 32px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.25)",
            }}
          >
            {NAV.map((n) => (
              <NavLink
                key={n}
                label={n}
                active={activeNav === n}
                onClick={() => setActiveNav(n)}
              />
            ))}
          </div>
          <a
            href={MyCV}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
            style={{
              position: "absolute",
              right: 52,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 18px",
              borderRadius: 50,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(16px)",
              color: "#f5f0e8",
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
          >
            <Icons.CV size={15} /> Download CV
          </a>
        </nav>

        {/* HERO */}
        <section
          id="home"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            padding: "96px 52px 0",
            background: `radial-gradient(ellipse 75% 55% at 68% 50%, rgba(180,65,0,0.23) 0%, transparent 68%), radial-gradient(ellipse 50% 40% at 15% 75%, rgba(110,35,0,0.18) 0%, transparent 55%), #160b00`,
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
                "radial-gradient(circle, #f26522 1px, transparent 1px)",
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
              animationDelay: "0.6s",
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
              left: "0.5%",
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
                  Aditya
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
                AI & Full Stack
                <br />
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
                    border: "1.5px solid rgba(242,101,34,0.35)",
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
                    border: "1.5px solid rgba(242,101,34,0.35)",
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

        {/* ABOUT */}
        <AboutSection />

        {/* SKILLS */}
        <SkillsSection />

        {/* PROJECTS */}
        <section
          id="projects"
          style={{ padding: "96px 52px", position: "relative" }}
        >
          <div style={{ maxWidth: 1080, margin: "0 auto" }}>
            <p
              style={{
                color: "#f26522",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              What I've built
            </p>
            <h2
              style={{
                fontFamily: "Plus Jakarta Sans,sans-serif",
                fontSize: 42,
                fontWeight: 800,
                letterSpacing: "-0.01em",
                marginBottom: 44,
              }}
            >
              Featured <span style={{ color: "#f26522" }}>Projects</span>
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
                gap: 24,
              }}
            >
              <ProjectCard
                title="AyurSutra"
                tags={["Hackathon Project", "Full Stack", "AI / NLP", "MERN"]}
                stack="MERN · FastAPI · NLP · Sentiment Analysis · JWT"
                desc="Full-stack Ayurveda therapy booking platform with role-based access, auto-scheduling, and AI-powered 3-class sentiment NLP — built for Ministry of AYUSH."
                live="#"
                github="https://github.com/adityasoran0698"
                bgColor="linear-gradient(135deg, rgba(5,25,10,0.95), rgba(10,40,15,0.9))"
                ProjectIcon={AyurImage}
                status="Live"
              />
              <ProjectCard
                title="YouTube Chatbot"
                tags={["RAG", "LangChain", "OpenAI", "Vector DB"]}
                stack="Python · LangChain · Chroma · FastAPI · OpenAI Embeddings · React.js"
                desc="End-to-end RAG pipeline ingesting YouTube transcripts, storing in ChromaDB for semantic retrieval, serving context-aware answers via a real-time React chat interface."
                github="https://github.com/adityasoran0698"
                bgColor="linear-gradient(135deg, rgba(25,8,0,0.95), rgba(40,15,0,0.9))"
                ProjectIcon={YoutubeImage}
                status="GitHub"
              />
              <ProjectCard
                title="AI Research Analyser"
                tags={["Generative AI", "LangChain", "FastAPI", "React"]}
                stack="React · Tailwind CSS · FastAPI · LangChain · OpenAI API"
                desc="Enter any research paper title, pick an explanation style (Beginner / Technical / Code-Oriented / Mathematical) and get a structured LLM-generated breakdown instantly."
                github="https://github.com/adityasoran0698/ai-research-analyser"
                bgColor="linear-gradient(135deg, rgba(8,5,25,0.95), rgba(15,10,40,0.9))"
                ProjectIcon={AIResearchIcon}
                status="GitHub"
              />
            </div>
          </div>
        </section>

        {/* CONNECT */}
        <section
          id="connect"
          style={{
            padding: "96px 52px 112px",
            textAlign: "center",
            background: `radial-gradient(ellipse 65% 55% at 50% 50%, rgba(180,65,0,0.16) 0%, transparent 68%), #160b00`,
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
                  border: "1.5px solid rgba(242,101,34,0.35)",
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
                  border: "1.5px solid rgba(242,101,34,0.35)",
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
              📍 Ghaziabad, Uttar Pradesh &nbsp;·&nbsp; +91 6396369163
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <div
          style={{
            borderTop: "1px solid rgba(242,101,34,0.1)",
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
            © 2025 Aditya Soran &nbsp;·&nbsp; AI & Full Stack Developer
          </span>
        </div>
      </div>
    </>
  );
}
