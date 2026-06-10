// ─────────────────────────────────────────────────────────────────
// CroissantsMoon EN/ID localisation.
//
// The public landing page is fully content-driven (CMLandingContent), so
// its Indonesian copy lives in landing-defaults-id.ts; only the handful of
// hard-coded UI labels are translated here (LANDING_UI). The proposal portal
// and gate render admin-authored body copy (which stays in whatever language
// it was written), so here we translate just their fixed UI chrome.
//
// Toggle state is per-page and per-visit (no persistence) — see LangToggle.
// ─────────────────────────────────────────────────────────────────

export type CMLocale = 'en' | 'id'

export const CM_LOCALES: CMLocale[] = ['en', 'id']

// ── Public landing — UI chrome only (body copy is in CMLandingContent) ──
export const LANDING_UI: Record<CMLocale, {
  explore: string
  mostCommon: string
  livePreview: string
}> = {
  en: { explore: 'Explore', mostCommon: 'Most common', livePreview: 'Live Preview' },
  id: { explore: 'Jelajahi', mostCommon: 'Paling Umum', livePreview: 'Pratinjau Langsung' },
}

// ── Proposal portal — section headers (accent colour stays in component) ──
export const PORTAL_SECTION_TEXT: Record<CMLocale, Record<string, { eyebrow: string; title: string }>> = {
  en: {
    audit_findings:   { eyebrow: 'Analysis',       title: 'Current State Analysis' },
    website_analysis: { eyebrow: 'Analysis',       title: 'Website Analysis' },
    redesign_concept: { eyebrow: 'Concept',        title: 'Redesign Concept' },
    features:         { eyebrow: 'Capabilities',   title: 'Proposed Features' },
    pricing:          { eyebrow: 'Investment',     title: 'Investment' },
    timeline:         { eyebrow: 'Roadmap',        title: 'Project Timeline' },
    infrastructure:   { eyebrow: 'Infrastructure', title: 'Infrastructure Model' },
    demo_embed:       { eyebrow: 'Preview',        title: 'Live Preview' },
    gallery:          { eyebrow: 'Gallery',        title: 'Gallery' },
  },
  id: {
    audit_findings:   { eyebrow: 'Analisis',       title: 'Analisis Kondisi Saat Ini' },
    website_analysis: { eyebrow: 'Analisis',       title: 'Analisis Website' },
    redesign_concept: { eyebrow: 'Konsep',         title: 'Konsep Desain Ulang' },
    features:         { eyebrow: 'Kapabilitas',    title: 'Fitur yang Diusulkan' },
    pricing:          { eyebrow: 'Investasi',      title: 'Investasi' },
    timeline:         { eyebrow: 'Lini Masa',      title: 'Lini Masa Proyek' },
    infrastructure:   { eyebrow: 'Infrastruktur',  title: 'Model Infrastruktur' },
    demo_embed:       { eyebrow: 'Pratinjau',      title: 'Pratinjau Langsung' },
    gallery:          { eyebrow: 'Galeri',         title: 'Galeri' },
  },
}

// ── Proposal portal — fixed chrome ──
export const PORTAL_UI: Record<CMLocale, {
  confidentialProposal: string
  scroll: string
  aNoteForYou: string
  whatWeFound: string
  whyItMatters: string
  howWeSolveIt: string
  direction: string
  tone: string
  keyIdeas: string
  recommended: string
  investment: string
  packageFallback: string
  loadingPreview: string
  openInNewTab: string
  heroHeadlineFallback: string
  ctaHeadingFallback: string
  ctaSub: string
  ctaButtonFallback: string
  privateProposal: string
  footerPrefix: string
  footerSuffix: string
}> = {
  en: {
    confidentialProposal: 'Confidential Proposal',
    scroll: 'Scroll',
    aNoteForYou: 'A Note For You',
    whatWeFound: 'What We Found',
    whyItMatters: 'Why It Matters',
    howWeSolveIt: 'How We Solve It',
    direction: 'Direction',
    tone: 'Tone',
    keyIdeas: 'Key Ideas',
    recommended: 'Recommended',
    investment: 'Investment',
    packageFallback: 'Package',
    loadingPreview: "Loading preview… if it doesn't appear, the site can't be embedded — open it in a new tab below.",
    openInNewTab: 'Open the live preview in a new tab',
    heroHeadlineFallback: 'A Strategic Proposal',
    ctaHeadingFallback: 'Ready to Begin?',
    ctaSub: "Let's schedule a discovery call to discuss your vision and next steps.",
    ctaButtonFallback: 'Get In Touch',
    privateProposal: 'Private Proposal',
    footerPrefix: 'Prepared exclusively for',
    footerSuffix: 'by CroissantsMoon Studio. Confidential — not for distribution.',
  },
  id: {
    confidentialProposal: 'Proposal Rahasia',
    scroll: 'Gulir',
    aNoteForYou: 'Sepatah Kata untuk Anda',
    whatWeFound: 'Yang Kami Temukan',
    whyItMatters: 'Mengapa Ini Penting',
    howWeSolveIt: 'Cara Kami Menyelesaikannya',
    direction: 'Arah',
    tone: 'Nuansa',
    keyIdeas: 'Gagasan Utama',
    recommended: 'Direkomendasikan',
    investment: 'Investasi',
    packageFallback: 'Paket',
    loadingPreview: 'Memuat pratinjau… jika tidak muncul, situs tidak dapat disematkan — buka di tab baru di bawah.',
    openInNewTab: 'Buka pratinjau langsung di tab baru',
    heroHeadlineFallback: 'Proposal Strategis',
    ctaHeadingFallback: 'Siap Memulai?',
    ctaSub: 'Mari jadwalkan sesi diskusi untuk membahas visi Anda dan langkah selanjutnya.',
    ctaButtonFallback: 'Hubungi Kami',
    privateProposal: 'Proposal Pribadi',
    footerPrefix: 'Disiapkan khusus untuk',
    footerSuffix: 'oleh CroissantsMoon Studio. Rahasia — tidak untuk disebarluaskan.',
  },
}

// ── Proposal gate (token wall) — fixed chrome ──
export const GATE_UI: Record<CMLocale, {
  preview: string
  confidentialProposal: string
  preparedForPrefix: string
  unlockFull: string
  aNoteForYou: string
  whatsInside: string
  whatsInsideHeading: string
  aTaste: string
  moreCapabilities: (n: number) => string
  investment: string
  timeline: string
  livePreview: string
  accessFull: string
  enterTokenPre: string
  enterTokenPost: string
  secureAccess: string
  accessToken: string
  verifying: string
  accessProposal: string
  tooManyAttempts: string
  privateFootnote1: string
  privateFootnote2: string
  footerPrefix: string
  footerSuffix: string
  errExpired: string
  errRevoked: string
  errArchived: string
  errInvalid: string
  errConnection: string
}> = {
  en: {
    preview: 'Preview',
    confidentialProposal: 'Confidential Proposal',
    preparedForPrefix: 'Prepared exclusively for',
    unlockFull: 'Unlock the full proposal',
    aNoteForYou: 'A Note For You',
    whatsInside: "What's Inside",
    whatsInsideHeading: 'A complete proposal, prepared for you',
    aTaste: "A Taste of What's Proposed",
    moreCapabilities: (n) => `+ ${n} more ${n === 1 ? 'capability' : 'capabilities'}, plus pricing & timeline — unlock to view`,
    investment: 'Investment',
    timeline: 'Timeline',
    livePreview: 'Live Preview',
    accessFull: 'Access the full proposal',
    enterTokenPre: 'Enter the access token sent to',
    enterTokenPost: 'to view pricing, timeline and every detail.',
    secureAccess: 'Secure Access Required',
    accessToken: 'Access Token',
    verifying: 'Verifying...',
    accessProposal: 'Access Proposal',
    tooManyAttempts: 'Too many attempts. Please contact CroissantsMoon for assistance.',
    privateFootnote1: 'This is a private, confidential proposal.',
    privateFootnote2: 'Not intended for public distribution.',
    footerPrefix: 'Prepared exclusively for',
    footerSuffix: 'by CroissantsMoon Studio. Confidential — not for distribution.',
    errExpired: 'This proposal has expired.',
    errRevoked: 'Access has been revoked.',
    errArchived: 'This proposal is no longer available.',
    errInvalid: 'Invalid access token. Please check and try again.',
    errConnection: 'Connection error. Please try again.',
  },
  id: {
    preview: 'Pratinjau',
    confidentialProposal: 'Proposal Rahasia',
    preparedForPrefix: 'Disiapkan khusus untuk',
    unlockFull: 'Buka proposal lengkap',
    aNoteForYou: 'Sepatah Kata untuk Anda',
    whatsInside: 'Apa yang Ada di Dalam',
    whatsInsideHeading: 'Proposal lengkap, disiapkan untuk Anda',
    aTaste: 'Cuplikan yang Kami Usulkan',
    moreCapabilities: (n) => `+ ${n} kapabilitas lainnya, beserta harga & lini masa — buka untuk melihat`,
    investment: 'Investasi',
    timeline: 'Lini Masa',
    livePreview: 'Pratinjau Langsung',
    accessFull: 'Akses proposal lengkap',
    enterTokenPre: 'Masukkan token akses yang dikirim ke',
    enterTokenPost: 'untuk melihat harga, lini masa, dan setiap detailnya.',
    secureAccess: 'Akses Aman Diperlukan',
    accessToken: 'Token Akses',
    verifying: 'Memverifikasi...',
    accessProposal: 'Akses Proposal',
    tooManyAttempts: 'Terlalu banyak percobaan. Silakan hubungi CroissantsMoon untuk bantuan.',
    privateFootnote1: 'Ini adalah proposal pribadi dan rahasia.',
    privateFootnote2: 'Tidak untuk disebarluaskan ke publik.',
    footerPrefix: 'Disiapkan khusus untuk',
    footerSuffix: 'oleh CroissantsMoon Studio. Rahasia — tidak untuk disebarluaskan.',
    errExpired: 'Proposal ini telah kedaluwarsa.',
    errRevoked: 'Akses telah dicabut.',
    errArchived: 'Proposal ini sudah tidak tersedia.',
    errInvalid: 'Token akses tidak valid. Silakan periksa dan coba lagi.',
    errConnection: 'Kesalahan koneksi. Silakan coba lagi.',
  },
}
