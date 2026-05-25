// ── Graphic Designs — Celestial Visual Portfolio ──────────────────────────────
// Shares the CroissantsMoon celestial design language (CM constants are loaded
// after this file but available at runtime via DOMContentLoaded).

function gdInjectFonts() {
  if (document.querySelector('[data-gd-fonts]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Outfit:wght@300;400;500;600;700&display=swap';
  link.setAttribute('data-gd-fonts', '1');
  document.head.appendChild(link);
}

// ── Project-specific accent colors (used as subtle tints) ─────────────────────
const GD_ACCENTS = {
  lavender: '#C4B5FD',
  yellow:   '#F5D05E',
  pink:     '#FDA4AF',
  blue:     '#7BC8F6',
  mint:     '#6EE7B7',
  peach:    '#FDBA8C',
  coral:    '#FF6B6B',
  orange:   '#F4874B',
  purple:   '#A78BFA',
};

let gdCurrentFilter  = 'all';
let gdCurrentView    = 'gallery';
let gdCurrentProject = null;

const GD_PROJECTS = [
  {
    id: 'pcu-partnership-booklet',
    title: 'PCU Partnership Booklet',
    fullTitle: 'Partnership Initiative Booklet for Petra Christian University',
    institution: 'Petra Christian University',
    year: '2024–2025',
    categories: ['institutional', 'partnership'],
    emoji: '◈',
    accent: GD_ACCENTS.lavender,
    textAccent: '#C4B5FD',
    folder: 'partnership-booklet-pcu',
    imgs: 3,
    pages: 35,
    skills: ['Graphic Design', 'Branding', 'Editorial Layout', 'International Education'],
    summary: 'A comprehensive booklet showcasing PCU\'s international partnership initiatives — designed to attract new institutional partners and communicate the depth of existing collaborations.',
    challenge: 'Communicating years of partnership work across diverse global institutions in a way that feels cohesive, credible, and inviting.',
    approach: 'Used PCU\'s brand language as a foundation, then elevated it with premium editorial layouts, rich data storytelling, and clear visual hierarchy.',
    reflection: 'Good institutional design earns trust. Every page choice — from typography to white space — signals how serious and thoughtful an institution is.',
    impact: 'Used by PCU International Office in partner meetings and institutional visits across Southeast Asia and beyond.',
    deliverables: ['35-page digital booklet', 'Print-ready PDF export', 'Partnership data infographics', 'Cover & chapter divider system'],
    designDecisions: [
      { icon: '◈', label: 'Typography System', text: 'Paired a confident sans-serif headline with a warm body font — signaling institutional authority without losing approachability.' },
      { icon: '✦', label: 'Data Storytelling', text: 'Partnership statistics visualized as infographic blocks rather than tables — numbers reframed as achievements, not just data.' },
      { icon: '⬡', label: 'Color Language', text: 'Anchored in PCU institutional tones with a refined lavender-and-white palette — distinguished, memorable, and aligned with the institution\'s identity.' },
    ],
    link: 'https://canva.link/partnershipbookletpetra',
  },
  {
    id: 'pcu-intl-students',
    title: 'PCU International Students Guide',
    fullTitle: 'International Students Guidebook for Petra Christian University',
    institution: 'Petra Christian University',
    year: '2024–2025',
    categories: ['guidebook', 'student'],
    emoji: '🌐',
    accent: GD_ACCENTS.yellow,
    textAccent: '#F5D05E',
    folder: 'international-students-guidebook-pcu',
    imgs: 3,
    pages: 30,
    skills: ['Graphic Design', 'Information Architecture', 'Communication Design', 'International Education'],
    summary: 'A comprehensive guidebook helping international students navigate life at PCU — from academic processes to daily living in Surabaya.',
    challenge: 'Covering a vast scope of practical information — visa, housing, healthcare, campus life — without overwhelming a reader who may already feel anxious.',
    approach: 'Used a clear chapter system with visual anchors, illustrated icons, and step-by-step formats that let students find what they need quickly.',
    reflection: 'Designing a guidebook is an act of empathy — every page should make a nervous international student feel a little more at home.',
    impact: 'Distributed to all incoming international students at PCU as their primary orientation resource.',
    deliverables: ['30-page interactive guide', 'Chapter navigation system', 'Step-by-step registration flow', 'Campus life visual directory'],
    designDecisions: [
      { icon: '◈', label: 'Reader Journey', text: 'Structured as a timeline from pre-arrival to settled campus life — mirroring the student\'s actual emotional journey, not the institution\'s org chart.' },
      { icon: '✦', label: 'Icon Language', text: 'Created a consistent icon set for tips, warnings, steps, and definitions — reducing cognitive load so students can scan before they read.' },
      { icon: '⬡', label: 'Friendly Tone by Design', text: 'Visual breathing room, warm yellow, and generous margins communicate safety — anxious first-time arrivals should feel guided, never overwhelmed.' },
    ],
    link: 'https://canva.link/internationalstudentsguidebookpetra',
  },
  {
    id: 'pcu-presentation',
    title: 'PCU Presentation Template',
    fullTitle: 'General Presentation Template for Partnership Initiative — Petra Christian University',
    institution: 'Petra Christian University',
    year: '2024–2025',
    categories: ['presentation', 'partnership'],
    emoji: '◉',
    accent: GD_ACCENTS.pink,
    textAccent: '#FDA4AF',
    folder: 'general-ppt-pcu',
    imgs: 3,
    pages: 35,
    skills: ['Presentation Design', 'Branding', 'Typography', 'Communication Design'],
    summary: 'A modular, reusable presentation template giving PCU\'s international partnership team a consistent, polished voice in every meeting, pitch, and partner visit.',
    challenge: 'Creating a template flexible enough for MoU meetings, partner visits, and conferences — while keeping every slide unmistakably PCU.',
    approach: 'Built a master template with clearly defined sections, slide variants, and visual rules — empowering any team member to create on-brand presentations without a designer.',
    reflection: 'The best design systems disappear into the background. A great template empowers non-designers to communicate beautifully.',
    impact: 'Now the standard presentation template for all PCU International Office partner meetings and official conferences.',
    deliverables: ['35-slide master template', '8 layout variant archetypes', 'Data visualization slides', 'Brand-aligned color & type system'],
    designDecisions: [
      { icon: '◈', label: 'Modular Architecture', text: 'Built 8 core archetypes — title, content, data, quote, cover, divider, gallery, closing — every meeting scenario is covered by combining these.' },
      { icon: '✦', label: 'White Space Strategy', text: 'Generous margins and restrained content per slide ensure the speaker\'s voice leads — the deck should support, not compete.' },
      { icon: '⬡', label: 'Reuse Flexibility', text: 'Color and font variables defined systematically — any team member can rearrange slides without accidentally breaking visual consistency.' },
    ],
    link: 'https://canva.link/jat6f7jcsawdmnu',
  },
  {
    id: 'aci-b2-2025',
    title: 'ACI 2025 Batch 2 Guidebook',
    fullTitle: 'Guidebook for Airlangga Cultural Immersion 2025 — Batch 2',
    institution: 'Universitas Airlangga',
    year: '2025',
    categories: ['guidebook', 'student'],
    emoji: '📖',
    accent: GD_ACCENTS.blue,
    textAccent: '#7BC8F6',
    folder: 'booklet-aci-2025-b2-unair',
    imgs: 3,
    pages: 7,
    skills: ['Graphic Design', 'Editorial Layout', 'Information Architecture', 'Communication Design'],
    summary: 'A concise, high-impact guidebook for international students joining the Airlangga Cultural Immersion program — every page designed to make participants feel welcomed, informed, and genuinely excited.',
    challenge: 'Communicating a full program itinerary, cultural context, and practical logistics in only 7 pages — without losing warmth or detail.',
    approach: 'Applied a compressed information hierarchy — critical content large and bold, supporting detail small but accessible — within a scan-first editorial grid.',
    reflection: 'Designing for cross-cultural audiences taught me that clarity is the highest form of care — making someone feel seen through design means speaking their visual language.',
    impact: 'Handed to each participant on arrival day of ACI 2025 Batch 2 — the first designed touchpoint of their cultural immersion experience.',
    deliverables: ['7-page event guidebook', 'Program schedule spread', 'Welcome briefing layout', 'Participant reference sheet'],
    designDecisions: [
      { icon: '◈', label: 'Compact but Complete', text: 'A full program in 7 pages — achieved through layered information density where critical info is big, supplementary info is accessible but secondary.' },
      { icon: '✦', label: 'Cultural Warmth', text: 'Soft blues and clean editorial whites evoke trust and calm — essential for participants arriving in an unfamiliar country for the first time.' },
      { icon: '⬡', label: 'Scan-first Design', text: 'Every spread was designed to be understood in under 10 seconds — headers, icons, and color blocks guide the eye before a single word is read.' },
    ],
    link: 'https://canva.link/motmeousw72spno',
  },
  {
    id: 'aci-b1-2025',
    title: 'ACI 2025 Batch 1 Guidebook',
    fullTitle: 'Guidebook for Airlangga Cultural Immersion 2025 — Batch 1',
    institution: 'Universitas Airlangga',
    year: '2025',
    categories: ['guidebook', 'student'],
    emoji: '🌿',
    accent: GD_ACCENTS.mint,
    textAccent: '#6EE7B7',
    folder: 'guidebook-aci-2025-b1-unair',
    imgs: 3,
    pages: 15,
    skills: ['Graphic Design', 'Editorial Layout', 'Information Architecture', 'Communication Design'],
    summary: 'The inaugural guidebook for ACI 2025\'s first batch — setting the visual identity and design system for the entire Airlangga Cultural Immersion series.',
    challenge: 'Establishing a recurring visual identity flexible enough to feel fresh per cohort, while remaining unmistakably ACI across future editions.',
    approach: 'Developed a modular design system — consistent branding with swappable color themes, flexible illustration slots, and an adaptable schedule layout.',
    reflection: 'The first edition of any design system carries the weight of setting standards. I learned to design for flexibility without sacrificing identity.',
    impact: 'The design system established in Batch 1 became the foundation that Batch 2\'s condensed edition built directly upon.',
    deliverables: ['15-page participant guidebook', 'Day-by-day itinerary spread', 'Cultural etiquette section', 'Emergency contacts page'],
    designDecisions: [
      { icon: '◈', label: 'System Foundation', text: 'Color-coded chapters — each program section has its own accent color — enabling instant navigation without needing an index page.' },
      { icon: '✦', label: 'Itinerary as Visual Story', text: 'Transformed a text-heavy schedule into a visual timeline with icons and color blocks — making participants feel excited, not administratively processed.' },
      { icon: '⬡', label: 'Bilingual Layout Awareness', text: 'Grid and spacing decisions account for bilingual content — generous white space ensures the layout holds even when text expands across languages.' },
    ],
    link: 'https://canva.link/6bysygp89hi879s',
  },
  {
    id: 'staffs-banyuwangi',
    title: 'Staffordshire Banyuwangi Booklet',
    fullTitle: 'Booklet for Staffordshire University Tailor-Made Program to Banyuwangi',
    institution: 'Staffordshire University × Universitas Airlangga',
    year: '2025',
    categories: ['institutional', 'partnership'],
    emoji: '✦',
    accent: GD_ACCENTS.peach,
    textAccent: '#FDBA8C',
    folder: 'guidebook-staffordshire-unair',
    imgs: 15,
    pages: 15,
    skills: ['Graphic Design', 'Editorial Layout', 'Branding', 'International Education'],
    summary: 'A tailor-made program booklet for Staffordshire University students visiting Banyuwangi — blending academic immersion with cultural exploration in a visually distinctive editorial format.',
    challenge: 'Designing for a brand-new partnership with no established visual identity — while making both Staffordshire and Airlangga feel equally represented and proud.',
    approach: 'Created a warm, exploratory visual language drawn from East Java\'s natural landscape — earth tones, organic shapes, and editorial magazine-style layouts.',
    reflection: 'Partnership communications are a design challenge of trust — the visual must make both institutions feel equally proud to share it.',
    impact: 'Presented to the Staffordshire University delegation at the program kick-off — the first visual touchpoint of the partnership relationship.',
    deliverables: ['15-page program booklet', 'Dual-institution branding system', 'Destination visual guide', 'Program itinerary spreads'],
    designDecisions: [
      { icon: '◈', label: 'Neutral Dual-brand', text: 'A visual language neither institution fully "owns" — warm earth tones feel Indonesian without alienating the UK partner delegation.' },
      { icon: '✦', label: 'Destination Storytelling', text: 'Banyuwangi\'s natural beauty became the visual metaphor — organic shapes and rich textures made the program feel like an adventure, not just an exchange.' },
      { icon: '⬡', label: 'Premium Booklet Feel', text: 'Structured like a travel magazine editorial — aspirational, airy layouts that made participants feel selected for something genuinely special.' },
    ],
    link: 'https://canva.link/i1i6dbnby7ho36z',
  },
  {
    id: 'aero-2025',
    title: 'AERO 2025 Presentation',
    fullTitle: 'Presentation for AERO 2025 for Institutional Partners',
    institution: 'Universitas Airlangga',
    year: '2025',
    categories: ['presentation', 'partnership'],
    emoji: '✈',
    accent: GD_ACCENTS.coral,
    textAccent: '#FF6B6B',
    folder: 'aero-2025-unair',
    imgs: 3,
    pages: 13,
    skills: ['Presentation Design', 'Branding', 'Communication Design', 'Typography'],
    summary: 'A flagship institutional presentation for AERO 2025 — communicating Universitas Airlangga\'s global partnerships to an international audience of institutional leaders.',
    challenge: 'Translating years of complex partnership data, program milestones, and institutional highlights into a narrative that resonates across cultural contexts.',
    approach: 'Used bold, confident visual language — clean data visualization, commanding typography, and strategic white space — to project institutional authority with genuine warmth.',
    reflection: 'A great institutional presentation doesn\'t just inform — it inspires. The design needed to make partners feel proud to be part of the story.',
    impact: 'Presented live at AERO 2025 to institutional partners from across Asia and Europe — representing Universitas Airlangga on an international stage.',
    deliverables: ['13-slide institutional deck', 'Partnership achievement data slides', 'Program overview spreads', 'Airlangga-branded opening & closing'],
    designDecisions: [
      { icon: '◈', label: 'Confidence First', text: 'Bold full-bleed color fields and oversized typography command the room before a word is spoken — the first impression is always felt before it\'s heard.' },
      { icon: '✦', label: 'Data as Achievement', text: 'Partnership numbers presented as visual milestones — not just facts, but evidence of a growing network worth belonging to.' },
      { icon: '⬡', label: 'Brand Elevation', text: 'Honored Universitas Airlangga\'s institutional identity while modernizing its visual presence — familiar enough to be recognized, refined enough to be respected.' },
    ],
    link: 'https://canva.link/odx5kh4eara7iuh',
  },
  {
    id: 'unair-accommodation',
    title: 'Airlangga Accommodation Booklet',
    fullTitle: 'Accommodation Booklet for Universitas Airlangga International Students',
    institution: 'Universitas Airlangga',
    year: '2024–2025',
    categories: ['guidebook', 'student'],
    emoji: '🏠',
    accent: GD_ACCENTS.orange,
    textAccent: '#F4874B',
    folder: 'accommodation-guidebook-unair',
    imgs: 3,
    pages: 28,
    skills: ['Graphic Design', 'Information Architecture', 'Communication Design', 'International Education'],
    summary: 'A dedicated accommodation guide for international students at Universitas Airlangga — covering housing options, neighborhoods, costs, and practical tips for settling into Surabaya.',
    challenge: 'Presenting housing options across wildly different budgets and preferences while making an unfamiliar city feel accessible and welcoming rather than overwhelming.',
    approach: 'Built a map-centric layout with neighborhood profiles, visual housing comparisons, and a conversational tone that humanizes what could easily be a dry administrative document.',
    reflection: 'Finding a home in a foreign city is one of the most emotionally charged moments for international students. Design can ease that anxiety — or amplify it.',
    impact: 'Distributed digitally to all incoming international students at Universitas Airlangga one month before their arrival date.',
    deliverables: ['28-page accommodation guide', 'Neighborhood profile spreads', 'Housing comparison infographics', 'Cost breakdown visual tables'],
    designDecisions: [
      { icon: '◈', label: 'Map-centric Navigation', text: 'Every neighborhood profile is anchored by a spatial reference — giving students a mental map of Surabaya before they land.' },
      { icon: '✦', label: 'Visual Comparison', text: 'Housing options side-by-side as scannable cards — enabling quick decision-making across budget, distance to campus, and available amenities.' },
      { icon: '⬡', label: 'Anxiety Reduction', text: 'Warm orange tones, friendly language, and generous imagery communicate that someone thought of you — turning a bureaucratic guide into a genuine welcome.' },
    ],
    link: 'https://canva.link/l8pkkjs0x8f24sy',
  },
  {
    id: 'unair-intl-students',
    title: 'Airlangga International Students Guide',
    fullTitle: 'International Students Guidebook for Universitas Airlangga',
    institution: 'Universitas Airlangga',
    year: '2024–2025',
    categories: ['guidebook', 'student'],
    emoji: '⬡',
    accent: GD_ACCENTS.purple,
    textAccent: '#A78BFA',
    folder: 'international-students-guidebook-unair',
    imgs: 3,
    pages: 32,
    skills: ['Graphic Design', 'Editorial Layout', 'Information Architecture', 'Communication Design'],
    summary: 'The comprehensive international student handbook for Universitas Airlangga — covering everything from enrollment to campus life for students arriving from around the world.',
    challenge: 'Synthesizing an entire university\'s international student journey — spanning academic, social, logistical, and emotional dimensions — into one navigable, engaging document.',
    approach: 'Structured as a five-chapter journey narrative: Pre-Arrival → First Week → Campus Life → City Life → Support — matching the student\'s real emotional timeline.',
    reflection: 'This was the most comprehensive communication design project in this collection. It reinforced that great information design is fundamentally about serving real people.',
    impact: 'The primary onboarding resource for international students — and the most downloaded student document on Universitas Airlangga\'s international office portal.',
    deliverables: ['32-page comprehensive handbook', 'Five-chapter navigation system', 'Surabaya city guide section', 'Academic calendar & support directory'],
    designDecisions: [
      { icon: '◈', label: 'Journey Architecture', text: 'Five chapters structured around the student\'s emotional timeline — not the institution\'s org chart. The design follows people, not bureaucracy.' },
      { icon: '✦', label: 'Chapter Color System', text: 'Each chapter has a distinct accent drawn from a unified palette — students navigate by color without needing to read a single chapter title.' },
      { icon: '⬡', label: 'Human Voice', text: 'Copywriting and design worked in tandem — tips framed as personal advice, not institutional rules — making a 32-page handbook feel like a letter from a friend.' },
    ],
    link: 'https://canva.link/xehf9jz9v781sn7',
  },
];

const GD_FILTER_CATEGORIES = [
  { id: 'all',           label: 'All Work'              },
  { id: 'guidebook',     label: 'Guidebooks'            },
  { id: 'presentation',  label: 'Presentations'         },
  { id: 'partnership',   label: 'Partnership Materials' },
  { id: 'student',       label: 'Student Communication' },
  { id: 'institutional', label: 'Institutional Branding'},
];

const GD_INSPO = [
  'Swiss typography', 'Editorial grids', 'Color theory',
  'Indonesian culture', 'Travel design', 'Institutional print',
  'Infographic systems', 'Human-centered design',
  'Educational publishing', 'Wayfinding design',
  'Museum publications', 'Global visual culture',
];

// ── CSS ───────────────────────────────────────────────────────────────────────

function gdInjectCSS() {
  if (document.getElementById('gd-page-css')) return;
  const s = document.createElement('style');
  s.id = 'gd-page-css';
  s.textContent = `
    .gd-card-hover {
      transition: transform .32s cubic-bezier(0.34,1.56,0.64,1), box-shadow .32s ease;
    }
    .gd-card-hover:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 60px rgba(7,17,38,0.55), 0 0 0 1px rgba(111,168,255,0.22) !important;
    }
    .gd-img-hover { transition: transform .45s ease; }
    .gd-img-hover:hover { transform: scale(1.05); }
    .gd-overlay-card:hover .gd-cover-overlay { opacity: 1 !important; }
    .gd-overlay-card:hover .gd-cover-img { transform: scale(1.06) !important; }

    .gd-filter-tab {
      font-family: 'Outfit', sans-serif; font-size: .76rem; font-weight: 500;
      padding: 7px 18px; border-radius: 999px; cursor: pointer; letter-spacing: .02em;
      transition: background .2s, color .2s, border-color .2s, box-shadow .2s;
      border: 1px solid rgba(111,168,255,0.2); background: transparent; color: #8FA8D6;
      white-space: nowrap;
    }
    .gd-filter-tab.gd-active {
      background: #D4B15A; color: #071126; border-color: #D4B15A;
      box-shadow: 0 0 14px rgba(212,177,90,0.3);
    }

    .gd-reveal { opacity: 0; transform: translateY(20px); transition: opacity .65s ease-out, transform .65s ease-out; }
    .gd-visible { opacity: 1 !important; transform: none !important; }

    @keyframes gdMarquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
    @keyframes gdMarqueeRev { from { transform: translateX(-50%) } to { transform: translateX(0) } }
    .gd-marquee-track { animation: gdMarquee 28s linear infinite; display: flex; width: max-content; }
    .gd-marquee-track.rev { animation: gdMarqueeRev 32s linear infinite; }
    .gd-marquee-wrap:hover .gd-marquee-track { animation-play-state: paused; }
    .gd-marquee-pill {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 8px 20px; border-radius: 999px; margin: 0 8px;
      font-family: 'Outfit', sans-serif; font-weight: 500; white-space: nowrap;
      background: rgba(111,168,255,0.07); border: 1px solid rgba(111,168,255,0.16);
      transition: background .2s, border-color .2s, box-shadow .2s;
      cursor: default;
    }
    .gd-marquee-pill:hover {
      background: rgba(111,168,255,0.14); border-color: rgba(111,168,255,0.32);
      box-shadow: 0 4px 16px rgba(7,17,38,0.4);
    }
  `;
  document.head.appendChild(s);
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function gdCatCount(catId) {
  if (catId === 'all') return GD_PROJECTS.length;
  return GD_PROJECTS.filter(p => p.categories.includes(catId)).length;
}

function gdCatLabel(catId) {
  const c = GD_FILTER_CATEGORIES.find(f => f.id === catId);
  return c ? c.label : catId;
}

function gdCatBadge(catId) {
  const label = gdCatLabel(catId);
  return `<span style="
    background:rgba(111,168,255,0.08);color:#8FA8D6;
    padding:3px 11px;border-radius:999px;font-size:.62rem;font-weight:500;
    font-family:'Outfit',sans-serif;letter-spacing:.05em;text-transform:uppercase;
    border:1px solid rgba(111,168,255,0.16)
  ">${label}</span>`;
}

// ── SECTION 1: Hero ───────────────────────────────────────────────────────────

function gdBuildHero() {
  const stars = cmBuildStarField(70);

  const statItems = [
    { n: '09', label: 'Projects' },
    { n: '02', label: 'Universities' },
    { n: '05', label: 'Skill Areas' },
  ].map((s, i) => `
    <div style="text-align:center;padding:0 clamp(12px,3vw,24px)${i > 0 ? ';border-left:1px solid rgba(111,168,255,0.12)' : ''}">
      <div style="
        font-family:'Cormorant Garamond',Georgia,serif;
        font-size:clamp(1.8rem,4vw,2.8rem);font-weight:400;font-style:italic;
        color:#D9E6FF;letter-spacing:-.02em;line-height:1
      ">${s.n}</div>
      <div style="font-family:'Outfit',sans-serif;font-size:.58rem;font-weight:500;
        letter-spacing:.14em;text-transform:uppercase;color:#8FA8D6;margin-top:4px;opacity:.7">${s.label}</div>
    </div>`).join('');

  return `
    <div id="gd-hero" style="
      position:relative;overflow:hidden;
      background:linear-gradient(160deg,#030712 0%,#071126 45%,#0B1E3A 100%);
      padding:clamp(5rem,12vh,9rem) 24px clamp(4rem,8vh,7rem);
    ">
      <!-- Star field -->
      <div style="position:absolute;inset:0;pointer-events:none;z-index:0">${stars}</div>

      <!-- Constellation -->
      <div style="position:absolute;inset:0;pointer-events:none;z-index:0;opacity:.7">
        ${cmConstellationSVG(1200, 600, 5)}
      </div>

      <!-- Floating astronauts -->
      ${cmBuildAstronauts([
        { img: 3, right: '6%',  top: '18%',    size: 110, dur: 26, del: 0,   rot: 12  },
        { img: 4, left: '3%',   bottom: '20%', size: 85,  dur: 32, del: -11, rot: -10 },
      ])}

      <!-- Nebula blobs -->
      <div style="position:absolute;left:-160px;top:-80px;width:600px;height:600px;border-radius:50%;
        background:radial-gradient(circle,rgba(111,168,255,0.05) 0%,transparent 65%);pointer-events:none;z-index:0"></div>
      <div style="position:absolute;right:-100px;bottom:-60px;width:450px;height:450px;border-radius:50%;
        background:radial-gradient(circle,rgba(212,177,90,0.05) 0%,transparent 65%);pointer-events:none;z-index:0"></div>

      <!-- CM watermark -->
      <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
        pointer-events:none;z-index:0;overflow:hidden">
        <span style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:22vw;
          font-weight:300;color:#D4B15A;opacity:.02;line-height:1;user-select:none;white-space:nowrap">GD</span>
      </div>

      <!-- Content -->
      <div class="max-w-5xl mx-auto" style="position:relative;z-index:1">

        <!-- Back + badge row -->
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3rem;flex-wrap:wrap;gap:12px">
          <button onclick="goToPage('projects-overview')" style="
            display:inline-flex;align-items:center;gap:7px;
            font-family:'Outfit',sans-serif;font-size:.82rem;color:#8FA8D6;
            background:rgba(111,168,255,0.06);border:1px solid rgba(111,168,255,0.14);
            cursor:pointer;padding:8px 18px;border-radius:999px;
            transition:color .18s,background .18s,border-color .18s
          " onmouseover="this.style.color='#D9E6FF';this.style.background='rgba(111,168,255,0.12)';this.style.borderColor='rgba(111,168,255,0.3)'"
             onmouseout="this.style.color='#8FA8D6';this.style.background='rgba(111,168,255,0.06)';this.style.borderColor='rgba(111,168,255,0.14)'">
            <i data-lucide="arrow-left" style="width:14px;height:14px"></i> Projects
          </button>
          <span style="
            font-family:'Outfit',sans-serif;font-size:.66rem;font-weight:500;letter-spacing:.14em;
            background:rgba(212,177,90,0.1);color:#D4B15A;padding:4px 14px;border-radius:999px;
            border:1px solid rgba(212,177,90,0.22)
          ">Visual Portfolio · 2024–2025</span>
        </div>

        <!-- Overline -->
        <p style="font-family:'Outfit',sans-serif;font-size:.63rem;font-weight:600;
          letter-spacing:.2em;text-transform:uppercase;color:#D4B15A;margin-bottom:1rem">Graphic Design</p>

        <!-- Headline -->
        <h1 style="
          font-family:'Cormorant Garamond',Georgia,serif;
          font-size:clamp(3rem,9vw,6.5rem);font-weight:400;font-style:italic;
          letter-spacing:-.01em;line-height:.92;color:#D9E6FF;margin-bottom:2rem;
          text-shadow:0 0 80px rgba(111,168,255,0.14)
        ">Visual<br>Communication<br><span style="color:#D4B15A">Work.</span></h1>

        <!-- Body -->
        <p style="
          font-family:'Outfit',sans-serif;font-size:clamp(.88rem,1.5vw,1rem);
          color:#8FA8D6;line-height:1.78;max-width:460px;margin-bottom:2.5rem
        ">Guidebooks, presentations, and institutional materials — communication design for international education and global engagement.</p>

        <!-- Stats strip -->
        <div style="
          display:inline-flex;align-items:center;gap:0;
          background:rgba(11,30,58,0.55);border-radius:16px;padding:18px 24px;
          border:1px solid rgba(111,168,255,0.14);
          backdrop-filter:blur(14px);margin-bottom:2.5rem
        ">${statItems}</div>

        <!-- CTAs -->
        <div style="display:flex;flex-wrap:wrap;gap:12px">
          <button onclick="document.getElementById('gd-projects').scrollIntoView({behavior:'smooth'})" style="
            font-family:'Outfit',sans-serif;font-size:.85rem;font-weight:600;
            background:#D4B15A;color:#071126;padding:14px 30px;border-radius:999px;
            border:none;cursor:pointer;
            display:inline-flex;align-items:center;gap:8px;letter-spacing:.03em;
            box-shadow:0 0 22px rgba(212,177,90,0.32),0 4px 16px rgba(212,177,90,0.2);
            transition:opacity .2s,transform .2s
          " onmouseover="this.style.opacity='.88';this.style.transform='translateY(-2px)'"
             onmouseout="this.style.opacity='1';this.style.transform='translateY(0)'">
            Browse Projects <i data-lucide="arrow-down" style="width:13px;height:13px"></i>
          </button>
          <button onclick="goToPage('contact')" style="
            font-family:'Outfit',sans-serif;font-size:.85rem;font-weight:400;
            border:1px solid rgba(212,177,90,0.38);color:#D4B15A;
            padding:14px 24px;border-radius:999px;
            background:rgba(212,177,90,0.06);cursor:pointer;
            display:inline-flex;align-items:center;gap:7px;
            transition:background .22s,border-color .22s,box-shadow .22s
          " onmouseover="this.style.background='rgba(212,177,90,0.14)';this.style.borderColor='rgba(212,177,90,0.6)';this.style.boxShadow='0 0 18px rgba(212,177,90,0.2)'"
             onmouseout="this.style.background='rgba(212,177,90,0.06)';this.style.borderColor='rgba(212,177,90,0.38)';this.style.boxShadow='none'">
            Collaborate
          </button>
        </div>

        <!-- Quick filter chips -->
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:2.5rem;padding-top:1.75rem;border-top:1px solid rgba(111,168,255,0.08)">
          <span style="font-family:'Outfit',sans-serif;font-size:.66rem;font-weight:500;
            color:rgba(143,168,214,0.4);align-self:center;margin-right:4px;letter-spacing:.06em;text-transform:uppercase">Browse by:</span>
          ${GD_FILTER_CATEGORIES.slice(1).map(cat => `
            <button onclick="document.getElementById('gd-projects').scrollIntoView({behavior:'smooth'});setTimeout(()=>gdSetFilter('${cat.id}'),350)"
              class="gd-filter-tab" style="">
              ${cat.label}
            </button>`).join('')}
        </div>
      </div>
    </div>`;
}

// ── SECTION 2: Project Showcase ───────────────────────────────────────────────

function gdBuildProjectCard(p) {
  const badges = p.categories.map(c => gdCatBadge(c)).join('');
  return `
    <button onclick="gdShowProject('${p.id}')" class="gd-card-hover gd-overlay-card" style="
      background:#0B1E3A;border-radius:18px;overflow:hidden;
      border:1px solid rgba(111,168,255,0.12);cursor:pointer;text-align:left;
      display:block;width:100%;box-shadow:0 4px 28px rgba(3,7,18,0.4)
    ">
      <div style="position:relative;overflow:hidden;height:185px;background:#071126">
        <img src="/assets/images/graphic-designs/${p.folder}/1.png" alt="${p.title}"
          class="gd-cover-img"
          style="width:100%;height:100%;object-fit:cover;object-position:top;
            transition:transform .45s ease;display:block">
        <!-- gradient overlay -->
        <div style="position:absolute;inset:0;
          background:linear-gradient(to bottom,transparent 40%,rgba(7,17,38,0.75));
          pointer-events:none"></div>
        <!-- hover overlay -->
        <div class="gd-cover-overlay" style="position:absolute;inset:0;opacity:0;
          background:rgba(7,17,38,0.32);transition:opacity .28s;
          display:flex;align-items:center;justify-content:center;pointer-events:none">
          <span style="font-family:'Outfit',sans-serif;font-size:.72rem;font-weight:600;
            color:#D9E6FF;background:rgba(7,17,38,0.65);padding:7px 20px;
            border-radius:999px;backdrop-filter:blur(8px);
            border:1px solid rgba(217,230,255,0.2);
            box-shadow:0 0 18px rgba(111,168,255,0.2)">Preview</span>
        </div>
        <!-- year badge -->
        <span style="position:absolute;top:10px;right:10px;
          font-family:'Outfit',sans-serif;font-size:.58rem;font-weight:500;
          background:rgba(7,17,38,0.6);backdrop-filter:blur(6px);
          color:#8FA8D6;padding:3px 10px;border-radius:999px;
          border:1px solid rgba(111,168,255,0.18)">${p.year}</span>
        <!-- accent bar -->
        <div style="position:absolute;bottom:0;left:0;right:0;height:2px;
          background:linear-gradient(to right,${p.accent},transparent);opacity:.5"></div>
      </div>
      <div style="padding:16px 18px 20px">
        <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:9px">${badges}</div>
        <h4 style="
          font-family:'Cormorant Garamond',Georgia,serif;
          font-size:1.08rem;font-weight:500;color:#D9E6FF;
          line-height:1.28;margin-bottom:4px
        ">${p.title}</h4>
        <p style="font-family:'Outfit',sans-serif;font-size:.71rem;
          color:#8FA8D6;opacity:.7">${p.institution}</p>
      </div>
    </button>`;
}

function gdBuildProjectShowcase() {
  const filtered = gdCurrentFilter === 'all'
    ? GD_PROJECTS
    : GD_PROJECTS.filter(p => p.categories.includes(gdCurrentFilter));

  // Filter tabs
  const tabs = GD_FILTER_CATEGORIES.map(cat => {
    const isActive = gdCurrentFilter === cat.id;
    const count    = gdCatCount(cat.id);
    return `
      <button onclick="gdSetFilter('${cat.id}')"
        class="gd-filter-tab ${isActive ? 'gd-active' : ''}"
        style="${isActive ? 'background:#D4B15A;color:#071126;border-color:#D4B15A;box-shadow:0 0 14px rgba(212,177,90,0.3)' : ''}">
        ${cat.label}
        <span style="
          margin-left:5px;
          background:${isActive ? 'rgba(7,17,38,0.2)' : 'rgba(111,168,255,0.1)'};
          color:${isActive ? '#071126' : '#8FA8D6'};
          padding:1px 7px;border-radius:999px;font-size:.62rem;font-weight:600;
        ">${count}</span>
      </button>`;
  }).join('');

  // Build cards
  let contentHTML = '';
  if (filtered.length === 0) {
    contentHTML = `<div style="padding:60px;text-align:center;font-family:'Outfit',sans-serif;font-size:.9rem;color:#8FA8D6">No projects in this category yet.</div>`;
  } else {
    const [featured, ...rest] = filtered;
    const featBadges = featured.categories.map(c => gdCatBadge(c)).join('');
    const featSkills = featured.skills.slice(0, 3).map(s =>
      `<span style="background:rgba(111,168,255,0.07);color:#8FA8D6;padding:4px 11px;
        border-radius:6px;font-size:.65rem;font-weight:500;font-family:'Outfit',sans-serif;
        border:1px solid rgba(111,168,255,0.14)">${s}</span>`
    ).join('');

    contentHTML = `
      <button onclick="gdShowProject('${featured.id}')" class="gd-card-hover" style="
        display:grid;grid-template-columns:280px 1fr;
        width:100%;border-radius:20px;overflow:hidden;
        background:#0B1E3A;
        border:1px solid rgba(111,168,255,0.14);
        box-shadow:0 4px 28px rgba(3,7,18,0.4);
        cursor:pointer;text-align:left;margin-bottom:20px
      ">
        <!-- Thumbnail left -->
        <div style="position:relative;overflow:hidden;min-height:240px;background:#071126">
          <img src="/assets/images/graphic-designs/${featured.folder}/1.png"
            alt="${featured.title}"
            style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;position:absolute;inset:0">
          <div style="position:absolute;inset:0;
            background:linear-gradient(to bottom,rgba(7,17,38,0.15) 0%,transparent 40%,rgba(7,17,38,0.1) 100%);
            pointer-events:none"></div>
          <span style="position:absolute;top:14px;left:14px;
            background:rgba(212,177,90,0.2);backdrop-filter:blur(4px);
            color:#D4B15A;font-family:'Outfit',sans-serif;font-size:.62rem;font-weight:600;
            padding:4px 10px;border-radius:999px;border:1px solid rgba(212,177,90,0.3)">Featured</span>
          <span style="position:absolute;bottom:14px;left:14px;
            background:rgba(7,17,38,0.5);backdrop-filter:blur(4px);
            color:#8FA8D6;font-family:'Outfit',sans-serif;font-size:.62rem;font-weight:500;
            padding:4px 10px;border-radius:999px;border:1px solid rgba(111,168,255,0.18)">${featured.year}</span>
          <div style="position:absolute;bottom:0;left:0;right:0;height:3px;
            background:linear-gradient(to right,${featured.accent},transparent);opacity:.6"></div>
        </div>
        <!-- Content right -->
        <div style="padding:28px 32px;display:flex;flex-direction:column;justify-content:space-between;gap:14px">
          <div>
            <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px">${featBadges}</div>
            <h3 style="
              font-family:'Cormorant Garamond',Georgia,serif;
              font-size:clamp(1.2rem,2.5vw,1.6rem);font-weight:500;font-style:italic;
              color:#D9E6FF;margin-bottom:6px;line-height:1.2
            ">${featured.fullTitle}</h3>
            <p style="font-family:'Outfit',sans-serif;font-size:.76rem;color:#8FA8D6;font-weight:500;margin-bottom:12px;opacity:.7">${featured.institution} · ${featured.year}</p>
            <p style="font-family:'Outfit',sans-serif;font-size:.86rem;line-height:1.72;color:#8FA8D6">${featured.summary}</p>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
            <div style="display:flex;flex-wrap:wrap;gap:5px">${featSkills}</div>
            <div style="display:inline-flex;align-items:center;gap:6px;
              font-family:'Outfit',sans-serif;font-size:.8rem;font-weight:600;color:#D4B15A">
              View Case Study <i data-lucide="arrow-right" style="width:13px;height:13px"></i>
            </div>
          </div>
        </div>
      </button>`;

    if (rest.length > 0) {
      contentHTML += `<div id="gd-project-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px">
        ${rest.map(gdBuildProjectCard).join('')}
      </div>`;
    }
  }

  const sectionTitle = gdCurrentFilter === 'all' ? 'All Design Work' : (gdCatLabel(gdCurrentFilter) || 'Projects');

  return `
    <div id="gd-projects" style="
      background:linear-gradient(180deg,#071126 0%,#0B1E3A 100%);
      padding:clamp(4rem,8vh,6rem) 24px;position:relative;overflow:hidden">
      <!-- Stars -->
      <div style="position:absolute;inset:0;pointer-events:none;z-index:0;opacity:.5">
        ${cmBuildStarField(35)}
      </div>
      <!-- Constellation -->
      <div style="position:absolute;inset:0;pointer-events:none;z-index:0">
        ${cmConstellationSVG(1200, 700, 9)}
      </div>
      ${cmBuildAstronauts([
        { img: 5, right: '2%', top: '15%', size: 80, dur: 30, del: -8, rot: -5 },
      ])}

      <div class="max-w-5xl mx-auto" style="position:relative;z-index:1">

        <!-- Section header -->
        <div class="gd-reveal" style="display:flex;align-items:flex-end;justify-content:space-between;
          margin-bottom:2rem;flex-wrap:wrap;gap:12px">
          <div>
            <p style="font-family:'Outfit',sans-serif;font-size:.63rem;font-weight:600;
              letter-spacing:.2em;text-transform:uppercase;color:#D4B15A;margin-bottom:.9rem">Design Archive</p>
            <h2 style="
              font-family:'Cormorant Garamond',Georgia,serif;
              font-size:clamp(2rem,4.5vw,3.2rem);font-weight:400;font-style:italic;
              color:#D9E6FF;line-height:1.05
            ">${sectionTitle}
              <span style="font-family:'Outfit',sans-serif;font-size:.38em;font-weight:400;
                color:rgba(143,168,214,0.4);margin-left:10px;letter-spacing:0;font-style:normal">
                ${filtered.length} project${filtered.length !== 1 ? 's' : ''}
              </span>
            </h2>
          </div>
        </div>

        <!-- Filter tabs -->
        <div class="gd-reveal" style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:2.5rem">
          ${tabs}
        </div>

        <!-- Content -->
        ${contentHTML}
      </div>
    </div>`;
}

// ── SECTION 3: Creative Directions ───────────────────────────────────────────

function gdBuildCreativeDirections() {
  const directions = [
    {
      accent: '#7BC8F6', icon: 'book-open', cat: 'Guidebook Design',
      headline: 'Making information feel like a welcome.',
      body: 'Dense itineraries, cultural context, practical logistics — redesigned as visual journeys that participants want to read.',
    },
    {
      accent: '#FF6B6B', icon: 'presentation', cat: 'Presentation Design',
      headline: 'Data with emotional resonance.',
      body: 'Partnership statistics and program highlights told through bold type, clean visuals, and strategic narrative flow.',
    },
    {
      accent: '#C4B5FD', icon: 'handshake', cat: 'Partnership Materials',
      headline: 'Design as institutional trust.',
      body: 'Booklets and branding materials that make both sides of a partnership feel equally proud to put their name on.',
    },
    {
      accent: '#6EE7B7', icon: 'globe', cat: 'Student Communication',
      headline: 'Home away from home.',
      body: 'Guides and handbooks designed from empathy first — helping students navigate the unfamiliar with confidence.',
    },
  ].map(d => `
    <div class="gd-card-hover" style="
      background:rgba(24,59,107,0.3);border-radius:22px;overflow:hidden;
      border:1px solid rgba(111,168,255,0.14);
      box-shadow:0 4px 24px rgba(3,7,18,0.4);
      backdrop-filter:blur(12px)
    ">
      <div style="height:4px;background:linear-gradient(to right,${d.accent},transparent);opacity:.6"></div>
      <div style="padding:26px 24px">
        <div style="width:46px;height:46px;border-radius:14px;
          background:rgba(111,168,255,0.07);border:1px solid rgba(111,168,255,0.16);
          display:flex;align-items:center;justify-content:center;
          margin-bottom:14px;box-shadow:0 0 14px rgba(111,168,255,0.1)">
          <i data-lucide="${d.icon}" style="width:20px;height:20px;color:${d.accent}"></i>
        </div>
        <div style="font-family:'Outfit',sans-serif;font-size:.6rem;font-weight:600;
          letter-spacing:.14em;text-transform:uppercase;color:${d.accent};margin-bottom:9px;opacity:.85">${d.cat}</div>
        <h4 style="
          font-family:'Cormorant Garamond',Georgia,serif;
          font-size:1.1rem;font-weight:500;font-style:italic;
          color:#D9E6FF;margin-bottom:10px;line-height:1.28
        ">${d.headline}</h4>
        <p style="font-family:'Outfit',sans-serif;font-size:.82rem;line-height:1.7;color:#8FA8D6">${d.body}</p>
      </div>
    </div>`).join('');

  return `
    <div style="
      background:linear-gradient(180deg,#0B1E3A 0%,#071126 100%);
      padding:clamp(4rem,8vh,6rem) 24px;position:relative;overflow:hidden">
      <!-- Stars -->
      <div style="position:absolute;inset:0;pointer-events:none;z-index:0;opacity:.45">
        ${cmBuildStarField(30)}
      </div>
      ${cmBuildAstronauts([
        { img: 4, left: '3%', top: '30%', size: 80, dur: 28, del: -5, rot: 6 },
      ])}
      <div class="max-w-5xl mx-auto" style="position:relative;z-index:1">
        <div class="gd-reveal" style="margin-bottom:2.5rem">
          <p style="font-family:'Outfit',sans-serif;font-size:.63rem;font-weight:600;
            letter-spacing:.2em;text-transform:uppercase;color:#D4B15A;margin-bottom:.9rem">Creative Directions</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:end;flex-wrap:wrap">
            <h2 style="
              font-family:'Cormorant Garamond',Georgia,serif;
              font-size:clamp(2rem,4.5vw,3.2rem);font-weight:400;font-style:italic;
              color:#D9E6FF;line-height:1.05
            ">How I design<br>for <span style="color:#D4B15A">communication.</span></h2>
            <p style="font-family:'Outfit',sans-serif;font-size:.9rem;line-height:1.76;color:#8FA8D6">
              Every project starts with a real person who needs to understand something. The design serves them — not the institution.
            </p>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:16px">
          ${directions}
        </div>
      </div>
    </div>`;
}

// ── SECTION 4: Inspirations ───────────────────────────────────────────────────

function gdBuildInspirations() {
  const accents = ['#D4B15A','#6FA8FF','#8FA8D6','#D9E6FF','#A78BFA','#D4B15A','#6FA8FF','#C4B5FD','#FDA4AF','#6EE7B7','#FDBA8C','#7BC8F6'];
  const dots    = ['✦','◈','⬡','✺','◉','✦','◈','⬡','✺','◉','✦','◈'];

  // Build two rows — row1 goes forward, row2 goes reverse
  const row1Items = GD_INSPO;
  const row2Items = [...GD_INSPO].reverse();

  function buildRow(items, cls) {
    // Duplicate for seamless loop
    const pills = [...items, ...items].map((text, i) => {
      const accent = accents[i % accents.length];
      const dot = dots[i % dots.length];
      return `<span class="gd-marquee-pill" style="color:${accent};font-size:.82rem">
        <span style="opacity:.55;font-size:.72rem">${dot}</span>${text}
      </span>`;
    }).join('');
    return `<div class="gd-marquee-track ${cls}">${pills}</div>`;
  }

  return `
    <div style="
      background:linear-gradient(180deg,#071126 0%,#030712 100%);
      padding:clamp(4rem,8vh,6rem) 0;position:relative;overflow:hidden">
      <!-- Stars -->
      <div style="position:absolute;inset:0;pointer-events:none;z-index:0;opacity:.5">
        ${cmBuildStarField(28)}
      </div>
      <div style="position:absolute;inset:0;pointer-events:none;z-index:0">
        ${cmConstellationSVG(1200, 500, 13)}
      </div>

      <!-- Fade edges -->
      <div style="position:absolute;top:0;bottom:0;left:0;width:80px;z-index:2;pointer-events:none;
        background:linear-gradient(to right,#071126,transparent)"></div>
      <div style="position:absolute;top:0;bottom:0;right:0;width:80px;z-index:2;pointer-events:none;
        background:linear-gradient(to left,#071126,transparent)"></div>

      <!-- Header (centered, with padding) -->
      <div class="max-w-5xl mx-auto gd-reveal" style="position:relative;z-index:1;
        padding:0 24px;margin-bottom:2.5rem;
        display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
        <div>
          <p style="font-family:'Outfit',sans-serif;font-size:.63rem;font-weight:600;
            letter-spacing:.2em;text-transform:uppercase;color:#D4B15A;margin-bottom:.9rem">Influences &amp; Inspirations</p>
          <h2 style="
            font-family:'Cormorant Garamond',Georgia,serif;
            font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:400;font-style:italic;
            color:#D9E6FF;line-height:1.05
          ">What shapes my visual thinking.</h2>
        </div>
        <p style="font-family:'Outfit',sans-serif;font-size:.82rem;color:#8FA8D6;
          max-width:260px;line-height:1.64;opacity:.75">
          Design traditions and ideas that shape how I see and communicate visually.
        </p>
      </div>

      <!-- Marquee rows -->
      <div style="position:relative;z-index:1;display:flex;flex-direction:column;gap:14px">
        <!-- Row 1 — left to right -->
        <div class="gd-marquee-wrap" style="overflow:hidden">
          ${buildRow(row1Items, '')}
        </div>
        <!-- Row 2 — right to left -->
        <div class="gd-marquee-wrap" style="overflow:hidden">
          ${buildRow(row2Items, 'rev')}
        </div>
      </div>
    </div>`;
}

// ── SECTION 5: Contact CTA ────────────────────────────────────────────────────

function gdBuildContact() {
  return `
    <div style="
      background:linear-gradient(160deg,#030712 0%,#071126 60%,#0a1530 100%);
      padding:clamp(5rem,11vh,9rem) 24px;position:relative;overflow:hidden">

      <!-- Glowing crescent -->
      <div style="position:absolute;right:-5%;top:50%;transform:translateY(-50%);
        pointer-events:none;z-index:0;filter:blur(2px) drop-shadow(0 0 60px rgba(212,177,90,0.3));opacity:.12">
        <svg width="500" height="500" viewBox="0 0 500 500" fill="none">
          <path d="M340 250C340 318.5 284.5 375 216 375C147.5 375 92 318.5 92 250C92 181.5 147.5 125 216 125C202.5 142.5 196 163 196 186C196 249.5 238.5 302 296.5 318.8C322 299.5 340 276.2 340 250Z" fill="#D4B15A"/>
        </svg>
      </div>

      <!-- Stars -->
      <div style="position:absolute;inset:0;pointer-events:none;z-index:0">
        ${cmBuildStarField(50)}
      </div>

      ${cmBuildAstronauts([
        { img: 5, left: '5%',   top: '18%',    size: 100, dur: 25, del: -13, rot: 10  },
        { img: 3, right: '4%',  bottom: '22%', size: 90,  dur: 35, del: -2,  rot: -7  },
        { img: 4, left: '15%',  top: '12%',    size: 70,  dur: 38, del: -9,  rot: 5   },
        { img: 5, right: '15%', bottom: '12%', size: 65,  dur: 22, del: -16, rot: -3  },
      ])}

      <!-- Aurora glow -->
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
        width:600px;height:300px;border-radius:50%;
        background:radial-gradient(ellipse,rgba(111,168,255,0.06) 0%,transparent 70%);
        pointer-events:none;z-index:0"></div>

      <div class="max-w-3xl mx-auto text-center gd-reveal" style="position:relative;z-index:1">
        <p style="font-family:'Outfit',sans-serif;font-size:.63rem;font-weight:600;
          letter-spacing:.22em;text-transform:uppercase;color:#D4B15A;opacity:.8;margin-bottom:1.5rem">Let's Work Together</p>
        <h2 style="
          font-family:'Cormorant Garamond',Georgia,serif;
          font-size:clamp(2.6rem,7.5vw,5.5rem);font-weight:400;font-style:italic;
          color:#D9E6FF;line-height:.96;margin-bottom:1.5rem;letter-spacing:-.01em;
          text-shadow:0 0 60px rgba(111,168,255,0.18)
        ">Need visual communication<br><span style="color:#D4B15A">that actually connects?</span></h2>
        <p style="font-family:'Outfit',sans-serif;font-size:.94rem;line-height:1.8;
          color:#8FA8D6;max-width:420px;margin:0 auto 3rem">
          Guidebooks, presentations, or institutional branding — let's design communication experiences that feel human.
        </p>

        <div style="display:flex;flex-wrap:wrap;gap:14px;justify-content:center;align-items:center">
          <button onclick="goToPage('contact')" style="
            font-family:'Outfit',sans-serif;font-size:.875rem;font-weight:600;
            background:#D4B15A;color:#071126;padding:16px 38px;border-radius:999px;
            border:none;cursor:pointer;display:inline-flex;align-items:center;gap:9px;
            letter-spacing:.03em;
            box-shadow:0 0 24px rgba(212,177,90,0.32),0 4px 18px rgba(212,177,90,0.2);
            transition:opacity .2s,transform .2s,box-shadow .2s
          " onmouseover="this.style.opacity='.88';this.style.transform='translateY(-2px)';this.style.boxShadow='0 0 36px rgba(212,177,90,0.5),0 6px 24px rgba(212,177,90,0.3)'"
             onmouseout="this.style.opacity='1';this.style.transform='translateY(0)';this.style.boxShadow='0 0 24px rgba(212,177,90,0.32),0 4px 18px rgba(212,177,90,0.2)'">
            Start a Conversation <i data-lucide="arrow-right" style="width:15px;height:15px"></i>
          </button>
          <a href="mailto:zefanya.kharisma@croissantsmoon.com" style="
            font-family:'Outfit',sans-serif;
            border:1px solid rgba(212,177,90,0.38);color:#D4B15A;
            padding:16px 24px;border-radius:999px;
            background:rgba(212,177,90,0.06);cursor:pointer;text-decoration:none;
            font-size:.85rem;font-weight:500;
            display:inline-flex;align-items:center;gap:7px;
            transition:background .22s,border-color .22s,box-shadow .22s
          " onmouseover="this.style.background='rgba(212,177,90,0.14)';this.style.borderColor='rgba(212,177,90,0.6)';this.style.boxShadow='0 0 18px rgba(212,177,90,0.2)'"
             onmouseout="this.style.background='rgba(212,177,90,0.06)';this.style.borderColor='rgba(212,177,90,0.38)';this.style.boxShadow='none'">
            <i data-lucide="mail" style="width:14px;height:14px"></i>
            zefanya.kharisma@croissantsmoon.com
          </a>
        </div>

        <div style="margin-top:2.5rem">
          <button onclick="goToPage('projects-overview')" style="
            display:inline-flex;align-items:center;gap:6px;
            background:none;border:none;cursor:pointer;
            font-family:'Outfit',sans-serif;font-size:.78rem;
            color:rgba(143,168,214,0.32);padding:8px 12px;
            border-radius:8px;transition:color .18s
          " onmouseover="this.style.color='rgba(143,168,214,0.65)'" onmouseout="this.style.color='rgba(143,168,214,0.32)'">
            <i data-lucide="arrow-left" style="width:13px;height:13px"></i> Back to Projects
          </button>
        </div>
      </div>
    </div>`;
}

// ── Lightbox ──────────────────────────────────────────────────────────────────

let gdLightboxProject = null;
let gdLightboxIndex   = 0;

function gdLightboxContent() {
  const p = gdLightboxProject;
  const n = gdLightboxIndex + 1;
  const total = p.imgs || Math.min(p.pages, 3);
  const thumbs = Array.from({ length: total }, (_, i) => `
    <div onclick="event.stopPropagation();gdLightboxJump(${i})" style="
      flex:0 0 auto;width:52px;height:34px;border-radius:5px;overflow:hidden;cursor:pointer;
      border:2px solid ${i === gdLightboxIndex ? '#D4B15A' : 'transparent'};
      opacity:${i === gdLightboxIndex ? '1' : '0.4'};transition:all .15s
    " onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='${i === gdLightboxIndex ? '1' : '0.4'}'">
      <img src="/assets/images/graphic-designs/${p.folder}/${i + 1}.png" style="width:100%;height:100%;object-fit:cover;object-position:top" loading="lazy">
    </div>`).join('');

  return `
    <div onclick="gdCloseLightbox()" style="position:absolute;inset:0;cursor:zoom-out"></div>

    <!-- Top bar -->
    <div style="position:absolute;top:0;left:0;right:0;padding:14px 20px;display:flex;align-items:center;
      justify-content:space-between;z-index:3;background:linear-gradient(to bottom,rgba(3,7,18,0.75),transparent);pointer-events:none">
      <div style="pointer-events:auto">
        <div style="color:#D9E6FF;font-size:.82rem;font-weight:500;font-family:'Outfit',sans-serif">${p.title}</div>
        <div style="color:#8FA8D6;font-size:.66rem;margin-top:2px;font-family:'Outfit',sans-serif">${p.institution}</div>
      </div>
      <div style="display:flex;align-items:center;gap:14px;pointer-events:auto">
        <span style="color:rgba(143,168,214,0.55);font-size:.73rem;font-weight:500;font-family:'Outfit',sans-serif">Page ${n} of ${total}</span>
        <button onclick="gdCloseLightbox()" style="
          background:rgba(111,168,255,0.1);border:1px solid rgba(111,168,255,0.2);
          cursor:pointer;color:#D9E6FF;width:34px;height:34px;border-radius:50%;
          display:flex;align-items:center;justify-content:center;
          font-size:1.1rem;line-height:1;transition:background .15s
        " onmouseover="this.style.background='rgba(111,168,255,0.22)'" onmouseout="this.style.background='rgba(111,168,255,0.1)'">×</button>
      </div>
    </div>

    <!-- Main image -->
    <div style="position:relative;z-index:2;display:flex;align-items:center;justify-content:center;width:100%;padding:56px 80px 80px">
      <img loading="lazy" id="gd-lb-img" src="/assets/images/graphic-designs/${p.folder}/${n}.png"
           alt="${p.title} — page ${n}"
           style="max-width:100%;max-height:75vh;object-fit:contain;border-radius:10px;
             box-shadow:0 32px 100px rgba(0,0,0,0.65);display:block;
             border:1px solid rgba(111,168,255,0.12)">
    </div>

    ${gdLightboxIndex > 0 ? `
    <button onclick="event.stopPropagation();gdLightboxNav(-1)" style="
      position:absolute;left:16px;top:50%;transform:translateY(-50%);z-index:3;
      background:rgba(111,168,255,0.1);border:1px solid rgba(111,168,255,0.2);
      cursor:pointer;color:#D9E6FF;width:46px;height:46px;border-radius:50%;
      display:flex;align-items:center;justify-content:center;font-size:1.4rem;
      transition:background .15s;line-height:1
    " onmouseover="this.style.background='rgba(111,168,255,0.22)'" onmouseout="this.style.background='rgba(111,168,255,0.1)'">‹</button>` : ''}

    ${gdLightboxIndex < total - 1 ? `
    <button onclick="event.stopPropagation();gdLightboxNav(1)" style="
      position:absolute;right:16px;top:50%;transform:translateY(-50%);z-index:3;
      background:rgba(111,168,255,0.1);border:1px solid rgba(111,168,255,0.2);
      cursor:pointer;color:#D9E6FF;width:46px;height:46px;border-radius:50%;
      display:flex;align-items:center;justify-content:center;font-size:1.4rem;
      transition:background .15s;line-height:1
    " onmouseover="this.style.background='rgba(111,168,255,0.22)'" onmouseout="this.style.background='rgba(111,168,255,0.1)'">›</button>` : ''}

    <!-- Thumbnail strip -->
    <div onclick="event.stopPropagation()" style="
      position:absolute;bottom:0;left:0;right:0;z-index:3;
      padding:14px 20px;
      background:linear-gradient(to top,rgba(3,7,18,0.8),transparent);
      display:flex;gap:7px;overflow-x:auto;scrollbar-width:none;
      -webkit-overflow-scrolling:touch;align-items:center;justify-content:center
    ">${thumbs}</div>`;
}

function gdOpenLightbox(projectId, pageIndex) {
  gdLightboxProject = GD_PROJECTS.find(p => p.id === projectId);
  gdLightboxIndex   = pageIndex;
  const existing = document.getElementById('gd-lightbox');
  if (existing) existing.remove();
  const lb = document.createElement('div');
  lb.id = 'gd-lightbox';
  lb.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(3,7,18,0.95);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(12px)';
  lb.innerHTML = gdLightboxContent();
  document.body.appendChild(lb);
  document.addEventListener('keydown', gdLightboxKeyHandler);
}

function gdLightboxNav(dir) {
  if (!gdLightboxProject) return;
  const _lbTotal = gdLightboxProject.imgs || Math.min(gdLightboxProject.pages, 3);
  const newIndex = Math.max(0, Math.min(_lbTotal - 1, gdLightboxIndex + dir));
  if (newIndex === gdLightboxIndex) return;
  gdLightboxIndex = newIndex;
  const lb = document.getElementById('gd-lightbox');
  if (lb) lb.innerHTML = gdLightboxContent();
}

function gdLightboxJump(index) {
  if (!gdLightboxProject) return;
  gdLightboxIndex = index;
  const lb = document.getElementById('gd-lightbox');
  if (lb) lb.innerHTML = gdLightboxContent();
}

function gdCloseLightbox() {
  const lb = document.getElementById('gd-lightbox');
  if (lb) lb.remove();
  document.removeEventListener('keydown', gdLightboxKeyHandler);
}

function gdLightboxKeyHandler(e) {
  if (e.key === 'ArrowLeft')  gdLightboxNav(-1);
  if (e.key === 'ArrowRight') gdLightboxNav(1);
  if (e.key === 'Escape')     gdCloseLightbox();
}

// ── Image Preview Gallery ─────────────────────────────────────────────────────

function gdBuildImageGallery(project) {
  const previewCount = project.imgs || Math.min(project.pages, 3);
  const imgs = Array.from({ length: previewCount }, (_, i) => i + 1).map(n => `
    <div onclick="gdOpenLightbox('${project.id}', ${n - 1})" style="
      flex:0 0 auto;width:200px;border-radius:14px;overflow:hidden;
      box-shadow:0 4px 24px rgba(3,7,18,0.5);background:#071126;
      border:1px solid rgba(111,168,255,0.12);
      cursor:zoom-in;position:relative;
      transition:transform .22s cubic-bezier(0.34,1.56,0.64,1),box-shadow .22s
    " onmouseover="this.style.transform='translateY(-5px) scale(1.02)';this.style.boxShadow='0 16px 40px rgba(3,7,18,0.65)'"
       onmouseout="this.style.transform='';this.style.boxShadow='0 4px 24px rgba(3,7,18,0.5)'">
      <img src="/assets/images/graphic-designs/${project.folder}/${n}.png"
           alt="${project.title} — page ${n}"
           style="width:100%;display:block;object-fit:cover;aspect-ratio:3/2;object-position:top center">
      <div style="position:absolute;inset:0;background:rgba(7,17,38,0);transition:background .2s;
        display:flex;align-items:center;justify-content:center;pointer-events:none">
        <span style="color:#D9E6FF;font-size:.62rem;font-weight:600;letter-spacing:.1em;
          font-family:'Outfit',sans-serif;opacity:0;transition:opacity .2s">Click to expand</span>
      </div>
      <span style="position:absolute;bottom:8px;right:10px;
        background:rgba(7,17,38,0.55);color:#8FA8D6;
        font-family:'Outfit',sans-serif;font-size:.58rem;font-weight:500;
        padding:2px 7px;border-radius:999px;border:1px solid rgba(111,168,255,0.16)">${n}</span>
    </div>`).join('');

  const moreLabel = project.pages > previewCount
    ? `<div onclick="window.open('${project.link}','_blank')" style="
        flex:0 0 auto;width:140px;border-radius:14px;
        background:rgba(111,168,255,0.05);border:1px dashed rgba(111,168,255,0.18);
        display:flex;flex-direction:column;align-items:center;justify-content:center;
        aspect-ratio:3/2;gap:10px;cursor:zoom-in;transition:background .18s
      " onmouseover="this.style.background='rgba(111,168,255,0.1)'" onmouseout="this.style.background='rgba(111,168,255,0.05)'">
        <span style="font-size:1.5rem">${project.emoji}</span>
        <span style="font-family:'Outfit',sans-serif;font-size:.68rem;font-weight:500;
          color:#8FA8D6;text-align:center;line-height:1.4">+${project.pages - previewCount} more on Canva</span>
      </div>`
    : '';

  return `
    <div style="margin-bottom:3.5rem">
      <div style="display:flex;align-items:center;justify-content:space-between;
        margin-bottom:1.25rem;flex-wrap:wrap;gap:8px">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:22px;height:2px;background:${project.accent};border-radius:2px;opacity:.7"></div>
          <span style="font-family:'Outfit',sans-serif;font-size:.63rem;font-weight:600;
            letter-spacing:.18em;text-transform:uppercase;color:${project.textAccent}">Design Preview</span>
        </div>
        <span style="font-family:'Outfit',sans-serif;font-size:.72rem;color:#8FA8D6;font-weight:400;opacity:.65">${project.pages} pages · click to expand</span>
      </div>
      <div style="display:flex;gap:12px;overflow-x:auto;padding-bottom:14px;
        scrollbar-width:thin;scrollbar-color:rgba(111,168,255,0.2) transparent;
        -webkit-overflow-scrolling:touch">
        ${imgs}${moreLabel}
      </div>
    </div>`;
}

// ── Project Detail View ───────────────────────────────────────────────────────

function gdBuildProjectDetail(project) {
  const related = GD_PROJECTS
    .filter(p => p.id !== project.id && p.categories.some(c => project.categories.includes(c)))
    .slice(0, 3);

  const skillTags = project.skills.map(s => `
    <span style="
      background:rgba(111,168,255,0.08);color:#8FA8D6;
      padding:5px 14px;border-radius:999px;
      font-family:'Outfit',sans-serif;font-size:.72rem;font-weight:400;
      border:1px solid rgba(111,168,255,0.18)
    ">${s}</span>`).join('');

  const catLabel = project.categories.map(c => gdCatLabel(c)).join(' · ');

  const storySteps = [
    { num: '01', label: 'The Brief',   heading: 'Why this project existed',        text: project.challenge },
    { num: '02', label: 'The Making',  heading: 'How the design came together',    text: project.approach  },
    { num: '03', label: 'The Outcome', heading: 'What it ultimately achieved',     text: project.impact    },
  ].map((s, i) => `
    <div style="display:flex;gap:20px;align-items:flex-start;${i < 2 ? 'margin-bottom:2rem;padding-bottom:2rem;border-bottom:1px solid rgba(111,168,255,0.08)' : ''}">
      <div style="flex-shrink:0;width:52px;height:52px;border-radius:14px;
        background:rgba(111,168,255,0.06);border:1px solid rgba(111,168,255,0.16);
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 0 14px rgba(111,168,255,0.08)">
        <span style="font-family:'Outfit',sans-serif;font-size:.68rem;font-weight:700;
          color:${project.textAccent};letter-spacing:.08em">${s.num}</span>
      </div>
      <div style="flex:1">
        <div style="font-family:'Outfit',sans-serif;font-size:.58rem;font-weight:600;
          letter-spacing:.16em;text-transform:uppercase;color:${project.textAccent};margin-bottom:5px;opacity:.7">${s.label}</div>
        <h4 style="
          font-family:'Cormorant Garamond',Georgia,serif;
          font-size:1.1rem;font-weight:500;font-style:italic;
          color:#D9E6FF;margin-bottom:8px;line-height:1.3
        ">${s.heading}</h4>
        <p style="font-family:'Outfit',sans-serif;font-size:.88rem;line-height:1.76;color:#8FA8D6">${s.text}</p>
      </div>
    </div>`).join('');

  const dnaCards = (project.designDecisions || []).map(d => `
    <div class="gd-card-hover" style="
      background:rgba(24,59,107,0.3);border-radius:18px;padding:22px 20px;
      border:1px solid rgba(111,168,255,0.14);backdrop-filter:blur(12px)">
      <div style="width:36px;height:36px;border-radius:10px;
        background:rgba(111,168,255,0.06);border:1px solid rgba(111,168,255,0.16);
        display:flex;align-items:center;justify-content:center;
        margin-bottom:14px;font-size:1rem;color:${project.textAccent}">${d.icon}</div>
      <div style="font-family:'Outfit',sans-serif;font-size:.58rem;font-weight:600;
        letter-spacing:.14em;text-transform:uppercase;color:${project.textAccent};margin-bottom:6px;opacity:.75">${d.label}</div>
      <p style="font-family:'Outfit',sans-serif;font-size:.84rem;line-height:1.72;color:#8FA8D6">${d.text}</p>
    </div>`).join('');

  const deliverablePills = (project.deliverables || []).map(d => `
    <span style="
      display:inline-flex;align-items:center;gap:6px;
      background:rgba(11,30,58,0.55);border:1px solid rgba(111,168,255,0.14);
      padding:7px 14px;border-radius:999px;
      font-family:'Outfit',sans-serif;font-size:.75rem;font-weight:400;color:#D9E6FF;
    "><span style="width:6px;height:6px;border-radius:50%;background:${project.accent};
      display:inline-block;flex-shrink:0;opacity:.7"></span>${d}</span>`).join('');

  const relatedCards = related.map(p => `
    <button onclick="gdShowProject('${p.id}')" class="gd-card-hover" style="
      background:#0B1E3A;border-radius:16px;overflow:hidden;
      border:1px solid rgba(111,168,255,0.12);cursor:pointer;text-align:left;
      box-shadow:0 2px 18px rgba(3,7,18,0.4);
      display:block;width:100%
    ">
      <div style="height:80px;background:#071126;display:flex;align-items:center;justify-content:center;
        font-size:1.8rem;position:relative;overflow:hidden">
        ${cmBuildStarField(8)}
        <span style="position:relative;z-index:1">${p.emoji}</span>
        <div style="position:absolute;bottom:0;left:0;right:0;height:2px;
          background:linear-gradient(to right,${p.accent},transparent);opacity:.5"></div>
      </div>
      <div style="padding:13px 15px 15px">
        <div style="font-family:'Outfit',sans-serif;font-size:.58rem;font-weight:500;
          letter-spacing:.1em;text-transform:uppercase;color:rgba(143,168,214,0.45);margin-bottom:4px">${p.institution}</div>
        <h4 style="
          font-family:'Cormorant Garamond',Georgia,serif;
          font-size:.95rem;font-weight:500;font-style:italic;
          color:#D9E6FF;line-height:1.3
        ">${p.title}</h4>
      </div>
    </button>`).join('');

  const stars = cmBuildStarField(40);

  return `
    <div style="background:#071126;min-height:100vh">

      <!-- Hero header -->
      <div style="
        background:linear-gradient(160deg,#030712 0%,#071126 50%,#0B1E3A 100%);
        position:relative;overflow:hidden">
        <!-- Stars -->
        <div style="position:absolute;inset:0;pointer-events:none;z-index:0;opacity:.7">${stars}</div>
        <!-- Constellation -->
        <div style="position:absolute;inset:0;pointer-events:none;z-index:0">
          ${cmConstellationSVG(900, 500, project.id.length)}
        </div>
        <!-- Accent glow top-right -->
        <div style="position:absolute;right:-80px;top:-80px;width:380px;height:380px;border-radius:50%;
          background:radial-gradient(circle,${project.accent}18 0%,transparent 65%);pointer-events:none;z-index:0"></div>

        <div class="max-w-5xl mx-auto" style="position:relative;z-index:1;padding:clamp(3.5rem,8vh,6rem) 24px 0">
          <!-- back -->
          <button onclick="gdShowGallery()" style="
            display:inline-flex;align-items:center;gap:8px;margin-bottom:2.5rem;
            font-family:'Outfit',sans-serif;font-size:.82rem;color:#8FA8D6;
            background:rgba(111,168,255,0.06);border:1px solid rgba(111,168,255,0.14);
            cursor:pointer;padding:8px 18px;border-radius:999px;transition:all .2s
          " onmouseover="this.style.color='#D9E6FF';this.style.background='rgba(111,168,255,0.12)'"
             onmouseout="this.style.color='#8FA8D6';this.style.background='rgba(111,168,255,0.06)'">
            <i data-lucide="arrow-left" style="width:14px;height:14px"></i> Back to Gallery
          </button>

          <!-- institution + category -->
          <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-bottom:1.1rem">
            <span style="font-family:'Outfit',sans-serif;font-size:.62rem;font-weight:500;
              letter-spacing:.16em;text-transform:uppercase;color:#8FA8D6;opacity:.6">${project.institution}</span>
            <span style="width:3px;height:3px;border-radius:50%;background:rgba(143,168,214,0.3);display:inline-block"></span>
            <span style="font-family:'Outfit',sans-serif;font-size:.62rem;font-weight:500;
              letter-spacing:.12em;text-transform:uppercase;color:#8FA8D6;opacity:.45">${catLabel}</span>
          </div>

          <!-- title -->
          <h1 style="
            font-family:'Cormorant Garamond',Georgia,serif;
            font-size:clamp(2rem,5vw,4rem);
            font-weight:400;font-style:italic;line-height:1.0;
            letter-spacing:-.01em;color:#D9E6FF;margin-bottom:1.5rem;max-width:680px;
            text-shadow:0 0 60px rgba(111,168,255,0.12)
          ">${project.fullTitle}</h1>

          <!-- skill tags + year -->
          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:1.75rem">
            <span style="
              background:rgba(212,177,90,0.12);color:#D4B15A;
              padding:5px 13px;border-radius:999px;
              font-family:'Outfit',sans-serif;font-size:.7rem;font-weight:500;
              border:1px solid rgba(212,177,90,0.22)
            ">${project.year}</span>
            ${skillTags}
          </div>

          <!-- summary -->
          <p style="font-family:'Outfit',sans-serif;font-size:1rem;line-height:1.78;
            color:#8FA8D6;max-width:580px;margin-bottom:3rem">${project.summary}</p>
        </div>
      </div>

      <!-- Stats bar -->
      <div style="
        background:rgba(11,30,58,0.85);backdrop-filter:blur(14px);
        border-bottom:1px solid rgba(111,168,255,0.1);position:sticky;top:0;z-index:10">
        <div class="max-w-5xl mx-auto" style="padding:0 24px;display:flex;gap:0;overflow-x:auto;scrollbar-width:none">
          ${[
            { label: 'Type',   value: catLabel.split(' · ')[0] },
            { label: 'Pages',  value: project.pages + ' pages' },
            { label: 'Year',   value: project.year             },
            { label: 'Tool',   value: 'Canva'                  },
            { label: 'Client', value: project.institution.split(' × ')[0] },
          ].map((s, i) => `
            <div style="flex:0 0 auto;padding:14px 22px;border-right:1px solid rgba(111,168,255,0.08);${i === 0 ? 'padding-left:0' : ''}">
              <div style="font-family:'Outfit',sans-serif;font-size:.56rem;font-weight:600;
                letter-spacing:.14em;text-transform:uppercase;color:rgba(143,168,214,0.4);margin-bottom:3px">${s.label}</div>
              <div style="font-family:'Outfit',sans-serif;font-size:.82rem;font-weight:500;
                color:#D9E6FF;white-space:nowrap">${s.value}</div>
            </div>`).join('')}
          <div style="flex:1;min-width:0"></div>
          <div style="padding:14px 0 14px 22px;display:flex;align-items:center">
            <a href="${project.link}" target="_blank" rel="noopener noreferrer" style="
              display:inline-flex;align-items:center;gap:6px;
              background:#D4B15A;color:#071126;
              padding:7px 16px;border-radius:999px;
              font-family:'Outfit',sans-serif;font-size:.72rem;font-weight:600;
              text-decoration:none;white-space:nowrap;
              box-shadow:0 0 14px rgba(212,177,90,0.25);transition:opacity .2s
            " onmouseover="this.style.opacity='.82'" onmouseout="this.style.opacity='1'">
              Open on Canva <i data-lucide="external-link" style="width:11px;height:11px"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Content body -->
      <div class="max-w-5xl mx-auto" style="padding:clamp(3rem,6vh,5rem) 24px">

        <!-- THE STORY -->
        <div style="margin-bottom:3.5rem">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:2rem">
            <div style="width:22px;height:2px;background:${project.accent};border-radius:2px;opacity:.7"></div>
            <span style="font-family:'Outfit',sans-serif;font-size:.63rem;font-weight:600;
              letter-spacing:.18em;text-transform:uppercase;color:${project.textAccent}">The Story</span>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;align-items:start">
            <div style="position:sticky;top:80px">
              <h2 style="
                font-family:'Cormorant Garamond',Georgia,serif;
                font-size:clamp(2rem,4vw,3rem);
                font-weight:400;font-style:italic;letter-spacing:-.01em;line-height:1.05;
                color:#D9E6FF;margin-bottom:1rem
              ">Behind<br>the <span style="color:${project.textAccent}">design.</span></h2>
              <p style="font-family:'Outfit',sans-serif;font-size:.86rem;line-height:1.7;color:#8FA8D6;max-width:260px;opacity:.75">
                Every page was a deliberate decision — here's the thinking that shaped it.
              </p>
            </div>
            <div>
              ${storySteps}
            </div>
          </div>
        </div>

        <!-- DESIGN PREVIEW -->
        ${gdBuildImageGallery(project)}

        <!-- DESIGN DNA -->
        <div style="margin-bottom:3.5rem">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:.75rem">
            <div style="width:22px;height:2px;background:${project.accent};border-radius:2px;opacity:.7"></div>
            <span style="font-family:'Outfit',sans-serif;font-size:.63rem;font-weight:600;
              letter-spacing:.18em;text-transform:uppercase;color:${project.textAccent}">Design DNA</span>
          </div>
          <p style="font-family:'Outfit',sans-serif;font-size:.86rem;color:#8FA8D6;
            margin-bottom:1.5rem;max-width:420px;line-height:1.64;opacity:.7">
            Three intentional visual decisions that make this project what it is.
          </p>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px">
            ${dnaCards}
          </div>
        </div>

        <!-- DELIVERABLES -->
        <div style="
          background:rgba(11,30,58,0.5);border-radius:20px;padding:28px 30px;
          border:1px solid rgba(111,168,255,0.12);backdrop-filter:blur(12px);
          margin-bottom:3.5rem">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:1.25rem">
            <div style="width:18px;height:2px;background:${project.accent};border-radius:2px;opacity:.7"></div>
            <span style="font-family:'Outfit',sans-serif;font-size:.6rem;font-weight:600;
              letter-spacing:.18em;text-transform:uppercase;color:${project.textAccent}">What Was Made</span>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:8px">
            ${deliverablePills}
          </div>
        </div>

        <!-- VIEW ON CANVA -->
        <div style="border-radius:24px;overflow:hidden;margin-bottom:3.5rem;
          border:1px solid rgba(111,168,255,0.12)">
          <div onclick="gdOpenLightbox('${project.id}', 0)" style="height:220px;overflow:hidden;position:relative;cursor:zoom-in">
            <img src="/assets/images/graphic-designs/${project.folder}/1.png"
              alt="${project.title} — cover preview"
              style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;
                transition:transform .45s ease"
              onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'">
            <div style="position:absolute;inset:0;background:linear-gradient(to bottom,rgba(7,17,38,0.08),rgba(7,17,38,0.58))"></div>
            <div style="position:absolute;bottom:16px;left:22px;
              font-family:'Outfit',sans-serif;color:rgba(217,230,255,0.55);font-size:.68rem;font-weight:500;letter-spacing:.08em">
              Click to preview · ${project.imgs || Math.min(project.pages, 3)} preview pages · ${project.pages} pages total
            </div>
          </div>
          <div style="background:#071126;padding:24px 30px;display:flex;align-items:center;
            justify-content:space-between;flex-wrap:wrap;gap:16px;
            border-top:1px solid rgba(111,168,255,0.1)">
            <div>
              <div style="font-family:'Outfit',sans-serif;color:#8FA8D6;font-size:.6rem;font-weight:600;
                letter-spacing:.14em;text-transform:uppercase;margin-bottom:5px;opacity:.55">Full design on Canva</div>
              <div style="font-family:'Cormorant Garamond',Georgia,serif;color:#D9E6FF;font-size:1.1rem;
                font-weight:500;font-style:italic">Explore every spread, layout &amp; visual system.</div>
            </div>
            <a href="${project.link}" target="_blank" rel="noopener noreferrer" style="
              display:inline-flex;align-items:center;gap:9px;
              background:#D4B15A;color:#071126;
              padding:13px 26px;border-radius:999px;
              font-family:'Outfit',sans-serif;font-size:.87rem;font-weight:600;
              text-decoration:none;flex-shrink:0;
              box-shadow:0 0 22px rgba(212,177,90,0.3);transition:opacity .2s,transform .2s
            " onmouseover="this.style.opacity='.85';this.style.transform='translateY(-2px)'"
               onmouseout="this.style.opacity='1';this.style.transform='translateY(0)'">
              Open on Canva <i data-lucide="external-link" style="width:14px;height:14px"></i>
            </a>
          </div>
        </div>

        <!-- REFLECTION -->
        <div style="
          background:linear-gradient(135deg,rgba(24,59,107,0.4),rgba(11,30,58,0.6));
          border-radius:24px;padding:clamp(2.5rem,5vh,4.5rem) clamp(2rem,5vw,4rem);
          margin-bottom:3.5rem;position:relative;overflow:hidden;
          border:1px solid rgba(111,168,255,0.14)
        ">
          <!-- Constellation overlay -->
          <div style="position:absolute;inset:0;pointer-events:none;opacity:.3">
            ${cmConstellationSVG(700, 300, project.pages)}
          </div>
          <!-- Accent glow -->
          <div style="position:absolute;right:-40px;top:-40px;width:220px;height:220px;border-radius:50%;
            background:radial-gradient(circle,${project.accent}12 0%,transparent 65%);pointer-events:none"></div>

          <div style="position:relative;z-index:1">
            <div style="font-family:'Cormorant Garamond',serif;font-size:5rem;line-height:.8;
              color:${project.accent};opacity:.15;margin-bottom:-1rem;user-select:none">"</div>
            <p style="
              font-family:'Cormorant Garamond',Georgia,serif;
              font-size:clamp(1.35rem,2.6vw,1.9rem);font-weight:400;font-style:italic;
              line-height:1.52;color:#D9E6FF;position:relative;z-index:1;max-width:620px
            ">${project.reflection}</p>
            <div style="display:flex;align-items:center;gap:10px;margin-top:1.5rem">
              <div style="width:18px;height:1px;background:rgba(143,168,214,0.3);border-radius:2px"></div>
              <span style="font-family:'Outfit',sans-serif;font-size:.6rem;font-weight:600;
                letter-spacing:.16em;text-transform:uppercase;color:rgba(143,168,214,0.45)">Reflection</span>
            </div>
          </div>
        </div>

        <!-- RELATED PROJECTS -->
        ${related.length > 0 ? `
        <div style="margin-bottom:3rem">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:1.5rem">
            <div style="width:20px;height:2px;background:#D4B15A;border-radius:2px;opacity:.6"></div>
            <span style="font-family:'Outfit',sans-serif;font-size:.63rem;font-weight:600;
              letter-spacing:.18em;text-transform:uppercase;color:#D4B15A">You Might Also Like</span>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:14px">${relatedCards}</div>
        </div>` : ''}

        <!-- back button -->
        <div style="display:flex;justify-content:center;padding:1rem 0 2rem">
          <button onclick="gdShowGallery()" style="
            display:inline-flex;align-items:center;gap:7px;
            border:1px solid rgba(111,168,255,0.18);background:none;cursor:pointer;
            font-family:'Outfit',sans-serif;font-size:.82rem;font-weight:400;color:#8FA8D6;
            padding:11px 22px;border-radius:999px;transition:all .2s
          " onmouseover="this.style.background='rgba(111,168,255,0.08)';this.style.color='#D9E6FF';this.style.borderColor='rgba(111,168,255,0.3)'"
             onmouseout="this.style.background='';this.style.color='#8FA8D6';this.style.borderColor='rgba(111,168,255,0.18)'">
            <i data-lucide="grid-2x2" style="width:13px;height:13px"></i> Back to All Projects
          </button>
        </div>
      </div>
    </div>`;
}

// ── Scroll reveal ─────────────────────────────────────────────────────────────

function gdInitReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('gd-visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.gd-reveal').forEach(el => obs.observe(el));
}

// ── State Management ──────────────────────────────────────────────────────────

function gdSetFilter(filterId) {
  gdCurrentFilter = filterId;
  const section = document.getElementById('gd-projects');
  if (section) {
    const tmp = document.createElement('div');
    tmp.innerHTML = gdBuildProjectShowcase();
    section.replaceWith(tmp.firstElementChild);
    if (window.lucide) lucide.createIcons();
    gdInitReveal();
  }
}

function gdShowProject(projectId) {
  const project = GD_PROJECTS.find(p => p.id === projectId);
  if (!project) return;
  gdCurrentProject = project;
  gdCurrentView    = 'project';
  const el = document.getElementById('page-designs');
  if (!el) return;
  el.innerHTML = gdBuildProjectDetail(project);
  if (window.lucide) lucide.createIcons();
  const app = document.getElementById('app');
  if (app) app.scrollTop = 0;
}

function gdShowGallery() {
  gdCurrentView    = 'gallery';
  gdCurrentProject = null;
  const el = document.getElementById('page-designs');
  if (!el) return;
  gdRenderGallery(el);
  const app = document.getElementById('app');
  if (app) app.scrollTop = 0;
}

function gdRenderGallery(el) {
  el.innerHTML = [
    gdBuildHero(),
    gdBuildProjectShowcase(),
    gdBuildCreativeDirections(),
    gdBuildInspirations(),
    gdBuildContact(),
  ].join('');

  if (window.lucide) lucide.createIcons();
  setTimeout(gdInitReveal, 60);
}

// ── Page Init ─────────────────────────────────────────────────────────────────

function gdInitPage() {
  gdInjectFonts();
  gdInjectCSS();
  const el = document.getElementById('page-designs');
  if (!el) return;
  el.style.background = '#071126';
  gdRenderGallery(el);

  const orig = window.goToPage;
  if (orig) {
    window.goToPage = function(pageName, updateHash) {
      if (pageName === 'designs' && gdCurrentView === 'project') {
        gdCurrentView    = 'gallery';
        gdCurrentProject = null;
      }
      orig(pageName, updateHash);
      if (pageName === 'designs') {
        gdRenderGallery(document.getElementById('page-designs'));
        const app = document.getElementById('app');
        if (app) app.scrollTop = 0;
      }
    };
  }
}

window.gdSetFilter     = gdSetFilter;
window.gdShowProject   = gdShowProject;
window.gdShowGallery   = gdShowGallery;
window.gdOpenLightbox  = gdOpenLightbox;
window.gdLightboxNav   = gdLightboxNav;
window.gdLightboxJump  = gdLightboxJump;
window.gdCloseLightbox = gdCloseLightbox;

document.addEventListener('DOMContentLoaded', gdInitPage);
