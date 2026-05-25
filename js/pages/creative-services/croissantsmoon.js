// ── CroissantsMoon — Celestial Luxury Creative Studio ────────────────────────

function cmInjectFonts() {
  if (document.querySelector('[data-cm-fonts]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Outfit:wght@300;400;500;600;700&display=swap';
  link.setAttribute('data-cm-fonts', '1');
  document.head.appendChild(link);
}

const CM = {
  midnight:   '#071126',
  deepSpace:  '#0B1E3A',
  moonlight:  '#D9E6FF',
  stardust:   '#8FA8D6',
  nebulaGold: '#D4B15A',
  cosmicBlue: '#183B6B',
  aurora:     '#6FA8FF',
  void:       '#030712',
  // legacy aliases for fallback use
  cream:    '#D9E6FF',
  espresso: '#071126',
  gold:     '#D4B15A',
  blush:    '#0B1E3A',
  muted:    '#8FA8D6',
  border:   'rgba(111,168,255,0.14)',
};

const CM_REPO_DETAIL_PAGE = {
  'Website-Portfolio':              'web-portfolio',
  'International-Office-Website':   'web-pcu-global-intl',
  'Dashboard-Partnership':          'web-dashboard-partnership',
  'Dashboard-International-Grants': 'web-dashboard-grants',
};

const CM_GRAPHIC_WORKS = [
  { title: 'PCU Partnership Booklet',                cat: 'Brand Identity',   folder: 'partnership-booklet-pcu',               imgs: 3, link: 'https://canva.link/partnershipbookletpetra',             year: '2024–2025', inst: 'Petra Christian University'    },
  { title: 'PCU International Students Guide',       cat: 'Print & Digital',  folder: 'international-students-guidebook-pcu',  imgs: 3, link: 'https://canva.link/internationalstudentsguidebookpetra', year: '2024–2025', inst: 'Petra Christian University'    },
  { title: 'PCU Presentation Template',              cat: 'Visual Identity',  folder: 'general-ppt-pcu',                       imgs: 3, link: 'https://canva.link/jat6f7jcsawdmnu',                     year: '2024–2025', inst: 'Petra Christian University'    },
  { title: 'ACI 2025 Batch 2 Guidebook',             cat: 'Event Materials',  folder: 'booklet-aci-2025-b2-unair',             imgs: 3, link: 'https://canva.link/motmeousw72spno',                     year: '2025',      inst: 'Universitas Airlangga'         },
  { title: 'ACI 2025 Batch 1 Guidebook',             cat: 'Event Materials',  folder: 'guidebook-aci-2025-b1-unair',           imgs: 3, link: 'https://canva.link/6bysygp89hi879s',                     year: '2025',      inst: 'Universitas Airlangga'         },
  { title: 'Staffordshire Banyuwangi Booklet',       cat: 'Brand Identity',   folder: 'guidebook-staffordshire-unair',         imgs: 3, link: 'https://canva.link/i1i6dbnby7ho36z',                     year: '2025',      inst: 'Staffordshire × Airlangga'     },
  { title: 'AERO 2025 Presentation',                 cat: 'Event Materials',  folder: 'aero-2025-unair',                       imgs: 3, link: 'https://canva.link/odx5kh4eara7iuh',                     year: '2025',      inst: 'Universitas Airlangga'         },
  { title: 'Airlangga Accommodation Guide',          cat: 'Print & Digital',  folder: 'accommodation-guidebook-unair',         imgs: 3, link: 'https://canva.link/l8pkkjs0x8f24sy',                     year: '2024–2025', inst: 'Universitas Airlangga'         },
  { title: 'Airlangga International Students Guide', cat: 'Social Media Kits',folder: 'international-students-guidebook-unair',imgs: 3, link: 'https://canva.link/xehf9jz9v781sn7',                     year: '2024–2025', inst: 'Universitas Airlangga'         },
];

const CM_LANG_COLORS = {
  'HTML': '#E34C26', 'CSS': '#9B4F96',
  'JavaScript': '#D4B15A', 'TypeScript': '#6FA8FF',
  'Python': '#3572A5', 'PHP': '#4F5D95',
};

let cmRepoFilter = 'all';

function cmLangColor(lang) { return CM_LANG_COLORS[lang] || CM.stardust; }

function cmLangFilterKey(lang) {
  if (!lang) return 'other';
  if (lang === 'HTML' || lang === 'CSS') return 'html-css';
  if (lang === 'JavaScript' || lang === 'TypeScript') return 'javascript';
  return 'other';
}

function cmHumanize(name) {
  return name.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()).trim();
}

// ── CSS ───────────────────────────────────────────────────────────────────────

function cmInjectPageCSS() {
  if (document.getElementById('cm-page-css')) return;
  const s = document.createElement('style');
  s.id = 'cm-page-css';
  s.textContent = `
    :root {
      --cm-midnight:   #071126;
      --cm-deepSpace:  #0B1E3A;
      --cm-moonlight:  #D9E6FF;
      --cm-stardust:   #8FA8D6;
      --cm-gold:       #D4B15A;
      --cm-cosmicBlue: #183B6B;
      --cm-aurora:     #6FA8FF;
      --cm-void:       #030712;
      --cm-border:     rgba(111,168,255,0.14);
      --cm-glow:       rgba(111,168,255,0.22);
      --cm-gold-glow:  rgba(212,177,90,0.28);
      --cm-spring:     cubic-bezier(0.34,1.56,0.64,1);
    }

    @keyframes cmTwinkle {
      0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.2;transform:scale(.6)}
    }
    @keyframes cmFloat {
      0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)}
    }
    @keyframes cmPulse {
      0%,100%{opacity:1} 50%{opacity:.45}
    }
    @keyframes cmGlowPulse {
      0%,100%{box-shadow:0 0 18px rgba(212,177,90,0.35),0 4px 28px rgba(212,177,90,0.22)}
      50%{box-shadow:0 0 36px rgba(212,177,90,0.6),0 4px 42px rgba(212,177,90,0.38)}
    }
    @keyframes cmFadeUp {
      from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)}
    }
    @keyframes cmShimmer {
      0%{background-position:-400px 0} 100%{background-position:400px 0}
    }
    @keyframes cmOrbit {
      from{transform:rotate(0deg) translateX(8px) rotate(0deg)}
      to{transform:rotate(360deg) translateX(8px) rotate(-360deg)}
    }
    @keyframes cmScrollLine {
      0%{transform:scaleY(0);transform-origin:top} 50%{transform:scaleY(1);transform-origin:top}
      51%{transform:scaleY(1);transform-origin:bottom} 100%{transform:scaleY(0);transform-origin:bottom}
    }
    @keyframes cmDrift {
      0%{transform:translate(0,0) rotate(0deg)} 33%{transform:translate(6px,-4px) rotate(1deg)}
      66%{transform:translate(-4px,3px) rotate(-.5deg)} 100%{transform:translate(0,0) rotate(0deg)}
    }
    .cm-reveal { opacity:0; transform:translateY(20px); transition:opacity .65s ease-out, transform .65s ease-out; }
    .cm-visible { opacity:1 !important; transform:none !important; }

    .cm-card-hover {
      transition: transform .32s var(--cm-spring), box-shadow .32s ease;
    }
    .cm-card-hover:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 60px rgba(7,17,38,0.55), 0 0 0 1px rgba(111,168,255,0.24) !important;
    }

    .cm-star {
      position:absolute;border-radius:50%;background:#fff;pointer-events:none;
      animation:cmTwinkle var(--dur,2.4s) var(--delay,0s) ease-in-out infinite;
    }

    .cm-glass {
      background:rgba(11,30,58,0.62);
      backdrop-filter:blur(16px) saturate(1.4);
      -webkit-backdrop-filter:blur(16px) saturate(1.4);
      border:1px solid rgba(111,168,255,0.16);
    }

    .cm-glow-btn {
      animation:cmGlowPulse 2.6s ease-in-out infinite;
      transition:transform .22s var(--cm-spring), opacity .22s;
    }
    .cm-glow-btn:hover { transform:scale(1.04); opacity:.9; }

    .cm-filter-pill {
      font-family:'Outfit',sans-serif;font-size:.76rem;font-weight:500;
      padding:7px 18px;border-radius:999px;cursor:pointer;letter-spacing:.02em;
      transition:background .2s, color .2s, border-color .2s, box-shadow .2s;
    }
    .cm-filter-pill.active {
      background:var(--cm-gold);color:var(--cm-midnight);border-color:var(--cm-gold);
      box-shadow:0 0 14px var(--cm-gold-glow);
    }

    .cm-lightbox-enter { animation:cmFadeUp .24s ease-out forwards; }

    .cm-process-card {
      transition:transform .32s var(--cm-spring), box-shadow .32s ease;
    }
    .cm-process-card:hover {
      transform:translateY(-8px);
      box-shadow:0 24px 64px rgba(7,17,38,0.6), 0 0 0 1px rgba(111,168,255,0.22) !important;
    }

    .cm-gd-card-hover:hover .cm-gd-overlay { opacity:1 !important; }
    .cm-gd-card-hover:hover img { transform:scale(1.06) !important; }

    @media(min-width:768px){ .cm-step-connector { display:block !important; } }

    .cm-shimmer {
      background:linear-gradient(90deg,#0B1E3A 25%,#162d50 50%,#0B1E3A 75%);
      background-size:400px 100%;
      animation:cmShimmer 1.5s ease-in-out infinite;
    }

    .cm-constellation-line {
      stroke:rgba(111,168,255,0.18);stroke-width:1;stroke-dasharray:4 6;
      animation:cmPulse 4s ease-in-out infinite;
    }
  `;
  document.head.appendChild(s);
}

// ── Star Field Generator ──────────────────────────────────────────────────────

function cmBuildStarField(count = 60, container = 'relative') {
  return Array.from({ length: count }, (_, i) => {
    const x  = Math.random() * 100;
    const y  = Math.random() * 100;
    const sz = Math.random() * 2.2 + 0.6;
    const dur = (Math.random() * 3 + 1.8).toFixed(1);
    const del = (Math.random() * 4).toFixed(1);
    const op  = (Math.random() * 0.6 + 0.3).toFixed(2);
    return `<span class="cm-star" style="left:${x}%;top:${y}%;width:${sz}px;height:${sz}px;opacity:${op};--dur:${dur}s;--delay:${del}s"></span>`;
  }).join('');
}

// ── Floating Astronaut Graphics ───────────────────────────────────────────────

function cmInjectAstronautCSS() {
  if (document.getElementById('cm-astro-css')) return;
  const s = document.createElement('style');
  s.id = 'cm-astro-css';
  s.textContent = `
    @keyframes cmAstronautDrift {
      0%  { transform:translate(0,0) rotate(var(--ar0,-8deg)); }
      30% { transform:translate(var(--ax1,14px),var(--ay1,-18px)) rotate(var(--ar1,2deg)); }
      70% { transform:translate(var(--ax2,-10px),var(--ay2,12px)) rotate(var(--ar2,6deg)); }
      100%{ transform:translate(0,0) rotate(var(--ar0,-8deg)); }
    }
    .cm-astro {
      position:absolute;pointer-events:none;user-select:none;z-index:0;opacity:.1;
      animation:cmAstronautDrift var(--ad,26s) var(--adl,0s) ease-in-out infinite;
    }
  `;
  document.head.appendChild(s);
}

function cmBuildAstronauts(configs) {
  cmInjectAstronautCSS();
  return configs.map(c => {
    const src = c.img || 3;
    const posStyles = [
      c.left   != null ? `left:${c.left}`     : null,
      c.right  != null ? `right:${c.right}`   : null,
      c.top    != null ? `top:${c.top}`        : null,
      c.bottom != null ? `bottom:${c.bottom}` : null,
    ].filter(Boolean).join(';');
    const r0 = c.rot ?? -8;
    return `<img src="./assets/graphics/croissants-moon/${src}.png"
      alt="" aria-hidden="true" class="cm-astro" loading="lazy"
      style="${posStyles};width:${c.size||100}px;
        --ad:${c.dur||26}s;--adl:${c.del||0}s;
        --ar0:${r0}deg;--ar1:${r0+10}deg;--ar2:${r0-6}deg;
        --ax1:${c.x1||14}px;--ay1:${c.y1||-18}px;
        --ax2:${c.x2||-10}px;--ay2:${c.y2||12}px">`;
  }).join('');
}

// ── Constellation SVG ─────────────────────────────────────────────────────────

function cmConstellationSVG(w = 400, h = 200, seed = 1) {
  const pts = [];
  const rng = n => (Math.sin(seed * n * 9301 + 49297) * 233280 % 1 + 1) % 1;
  for (let i = 0; i < 7; i++) pts.push([rng(i) * w, rng(i + 10) * h]);
  const lines = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[1,4],[2,5]];
  const linesSVG = lines.map(([a,b]) =>
    `<line x1="${pts[a][0]}" y1="${pts[a][1]}" x2="${pts[b][0]}" y2="${pts[b][1]}" class="cm-constellation-line"/>`
  ).join('');
  const dotsSVG = pts.map(([x,y]) =>
    `<circle cx="${x}" cy="${y}" r="2" fill="rgba(111,168,255,0.35)"/>`
  ).join('');
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:.55">${linesSVG}${dotsSVG}</svg>`;
}

// ── Section 1: Hero ───────────────────────────────────────────────────────────

function cmBuildHero() {
  const logoSVG = `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="CroissantsMoon logo">
    <!-- Crescent moon -->
    <path d="M44 32C44 42.49 35.49 51 25 51C14.51 51 6 42.49 6 32C6 21.51 14.51 13 25 13C22.4 17.2 21 22.2 21 27.5C21 38.27 28.3 47.3 38.2 49.8C42.2 46.2 44 39.4 44 32Z" fill="${CM.nebulaGold}" opacity="0.92"/>
    <!-- Astronaut silhouette forming the M -->
    <path d="M40 20 L46 14 L52 20 L50 28 L52 36 L46 44 L40 36 L42 28 Z" fill="${CM.nebulaGold}" opacity="0.75"/>
    <!-- Helmet visor -->
    <ellipse cx="46" cy="20" rx="4.5" ry="4.5" fill="none" stroke="${CM.nebulaGold}" stroke-width="1.5" opacity="0.6"/>
    <!-- Helmet reflection -->
    <path d="M43.5 18.5 Q44.5 17.5 46 18" stroke="rgba(255,255,255,0.5)" stroke-width="1" stroke-linecap="round" fill="none"/>
    <!-- Stars around -->
    <circle cx="56" cy="12" r="1.6" fill="${CM.nebulaGold}" opacity="0.7"/>
    <circle cx="10" cy="10" r="1.1" fill="${CM.aurora}" opacity="0.55"/>
    <circle cx="58" cy="42" r="0.9" fill="${CM.moonlight}" opacity="0.45"/>
  </svg>`;

  const stars = cmBuildStarField(80);

  return `
    <div id="cm-hero-section" style="
      position:relative;overflow:hidden;
      background:linear-gradient(160deg,${CM.void} 0%,${CM.midnight} 40%,${CM.deepSpace} 100%);
      min-height:100vh;display:flex;align-items:center;justify-content:center;
      padding:clamp(6rem,14vh,10rem) 24px clamp(5rem,11vh,9rem);
    ">
      <!-- Star field -->
      <div style="position:absolute;inset:0;pointer-events:none;z-index:0">${stars}</div>

      <!-- Floating astronauts -->
      ${cmBuildAstronauts([
        { img: 3, right: '7%', top: '16%',    size: 115, dur: 24, del: 0,   rot: 15,  x1: 10,  y1: -20, x2: -8, y2: 14 },
        { img: 4, left: '4%',  bottom: '22%', size: 90,  dur: 31, del: -11, rot: -12, x1: -14, y1: 10,  x2: 10, y2: -8 },
      ])}

      <!-- Constellation overlay -->
      <div style="position:absolute;inset:0;pointer-events:none;z-index:0">
        ${cmConstellationSVG(1200, 700, 3)}
      </div>

      <!-- Nebula fog blobs -->
      <div style="position:absolute;left:-200px;top:-80px;width:700px;height:700px;border-radius:50%;
        background:radial-gradient(circle,rgba(111,168,255,0.06) 0%,transparent 65%);pointer-events:none;z-index:0"></div>
      <div style="position:absolute;right:-120px;bottom:-100px;width:500px;height:500px;border-radius:50%;
        background:radial-gradient(circle,rgba(212,177,90,0.06) 0%,transparent 65%);pointer-events:none;z-index:0"></div>

      <!-- Glowing crescent moon (decorative) -->
      <div style="position:absolute;right:5%;top:8%;pointer-events:none;z-index:0;
        filter:blur(0.5px) drop-shadow(0 0 28px rgba(212,177,90,0.35));opacity:.18">
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
          <path d="M130 90C130 114.85 109.85 135 85 135C60.15 135 40 114.85 40 90C40 65.15 60.15 45 85 45C78.8 54.2 76 65 76 76.5C76 100.65 91.8 121.2 113.6 128.1C124 119.1 130 105.2 130 90Z" fill="${CM.nebulaGold}" opacity="0.8"/>
        </svg>
      </div>

      <!-- Giant CM watermark -->
      <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
        pointer-events:none;z-index:0;overflow:hidden">
        <span style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:28vw;
          font-weight:300;color:${CM.nebulaGold};opacity:.025;line-height:1;user-select:none;
          white-space:nowrap">CM</span>
      </div>

      <!-- Aurora glow radial -->
      <div style="position:absolute;bottom:-60px;left:50%;transform:translateX(-50%);
        width:600px;height:200px;border-radius:50%;
        background:radial-gradient(ellipse,rgba(111,168,255,0.08) 0%,transparent 70%);
        pointer-events:none;z-index:0"></div>

      <!-- Hero content -->
      <div class="max-w-3xl mx-auto text-center" style="position:relative;z-index:1;width:100%">
        <div id="cm-logotype" style="opacity:0;transform:translateY(16px);transition:opacity 700ms ease-out,transform 700ms ease-out">
          <div style="display:flex;justify-content:center;margin-bottom:2rem;
            animation:cmFloat 5s ease-in-out infinite;filter:drop-shadow(0 0 18px rgba(212,177,90,0.4))">
            ${logoSVG}
          </div>
          <h1 style="
            font-family:'Cormorant Garamond',Georgia,serif;
            font-size:clamp(3.2rem,10vw,7rem);font-weight:400;font-style:italic;
            letter-spacing:.01em;line-height:.9;color:${CM.moonlight};margin-bottom:0;
            text-shadow:0 0 80px rgba(111,168,255,0.18)
          " data-edit-key="cm_hero_title">CroissantsMoon</h1>
        </div>

        <p style="
          font-family:'Outfit',sans-serif;font-size:clamp(.7rem,1.4vw,.8rem);
          font-weight:500;letter-spacing:.22em;color:${CM.nebulaGold};
          text-transform:uppercase;margin:2rem 0 3rem;opacity:.9
        " data-edit-key="cm_hero_tagline">Celestial Studio · Digital Presence Crafted with Intention</p>

        <div style="display:flex;flex-wrap:wrap;gap:14px;justify-content:center">
          <a data-cm-scroll="cm-web-projects" href="#cm-web-projects" class="cm-glow-btn" style="
            font-family:'Outfit',sans-serif;font-size:.85rem;font-weight:600;
            background:${CM.nebulaGold};color:${CM.midnight};padding:14px 30px;border-radius:999px;
            text-decoration:none;display:inline-flex;align-items:center;gap:8px;
            letter-spacing:.03em;border:none;cursor:pointer
          ">
            View Web Projects
            <i data-lucide="arrow-right" style="width:14px;height:14px"></i>
          </a>
          <a data-cm-scroll="cm-graphic-design" href="#cm-graphic-design" style="
            font-family:'Outfit',sans-serif;font-size:.85rem;font-weight:400;
            border:1px solid rgba(212,177,90,0.38);color:${CM.nebulaGold};
            padding:14px 30px;border-radius:999px;text-decoration:none;
            display:inline-flex;align-items:center;gap:8px;
            background:rgba(212,177,90,0.06);
            transition:background .22s,border-color .22s,box-shadow .22s
          " onmouseover="this.style.background='rgba(212,177,90,0.14)';this.style.borderColor='rgba(212,177,90,0.6)';this.style.boxShadow='0 0 18px rgba(212,177,90,0.2)'"
             onmouseout="this.style.background='rgba(212,177,90,0.06)';this.style.borderColor='rgba(212,177,90,0.38)';this.style.boxShadow='none'">
            View Design Work
            <i data-lucide="arrow-right" style="width:14px;height:14px"></i>
          </a>
        </div>

        <!-- Scroll indicator -->
        <div style="margin-top:clamp(4rem,8vh,7rem);display:flex;flex-direction:column;align-items:center;gap:6px">
          <span style="font-family:'Outfit',sans-serif;font-size:.56rem;letter-spacing:.2em;
            text-transform:uppercase;color:${CM.stardust};opacity:.5">Explore</span>
          <div style="width:1px;height:44px;background:linear-gradient(to bottom,${CM.aurora},transparent);
            animation:cmScrollLine 2.2s ease-in-out infinite;opacity:.5"></div>
        </div>
      </div>
    </div>`;
}

// ── Section 2: Services ───────────────────────────────────────────────────────

function cmBuildServices() {
  const services = [
    {
      icon: 'user-circle',
      accentColor: CM.aurora,
      glowColor: 'rgba(111,168,255,0.25)',
      tag: 'Personal & Creative',
      title: 'Personal Branding & Portfolio Platforms',
      positioning: 'Your identity, crafted for the world stage.',
      desc: 'Premium digital identities for professionals who need more than a résumé. We build narrative-driven platforms that position you as a thought leader in your field.',
      targets: ['Researchers & Academics', 'Scholarship Awardees', 'Creative Professionals', 'Founders & Executives'],
      features: ['Personal Brand Systems', 'Cinematic Portfolio Design', 'Professional Storytelling', 'Mobile-First Experience', 'CMS Integration'],
      pricingIDR: 'Rp5 juta',
      pricingUSD: '$300',
      pricingLabel: 'Starter Presence',
      ctaLabel: 'Build Your Platform',
      editKey: 'cm_svc_personal',
    },
    {
      icon: 'globe',
      accentColor: CM.nebulaGold,
      glowColor: 'rgba(212,177,90,0.25)',
      tag: 'International & Institutional',
      title: 'International & Institutional Platforms',
      positioning: 'Global-facing design for institutions that matter.',
      desc: 'Sophisticated digital ecosystems for universities, NGOs, and international offices. Platforms that engage global audiences and communicate institutional excellence.',
      targets: ['Universities & Faculties', 'International Offices', 'NGOs & Nonprofits', 'Educational Organizations'],
      features: ['Global Engagement Systems', 'Partnership Directories', 'Student Onboarding Portals', 'Multilingual Architecture', 'Institutional Design Language'],
      pricingIDR: 'Rp25 juta',
      pricingUSD: '$1,500',
      pricingLabel: 'Institutional Systems',
      ctaLabel: 'Start a Project',
      editKey: 'cm_svc_institutional',
    },
    {
      icon: 'layout-dashboard',
      accentColor: '#A0C4FF',
      glowColor: 'rgba(160,196,255,0.2)',
      tag: 'Data & Operations',
      title: 'Dashboard & Internal Systems',
      positioning: 'Intelligence made visible. Operations made elegant.',
      desc: 'Modern dashboards and admin platforms that transform complex data into clear decisions. Built for teams who need both power and elegance in their internal tools.',
      targets: ['Operations Teams', 'Admin Departments', 'Data-Driven Organizations', 'Management Systems'],
      features: ['Real-Time Analytics', 'Workflow Management', 'Data Visualization', 'Admin Interfaces', 'Scalable Architecture'],
      pricingIDR: 'Rp12 juta',
      pricingUSD: '$750',
      pricingLabel: 'Professional Identity Platform',
      ctaLabel: 'Discuss Your Vision',
      editKey: 'cm_svc_dashboard',
    },
  ];

  const serviceCards = services.map(svc => `
    <div class="cm-card-hover cm-reveal" style="
      position:relative;border-radius:24px;overflow:hidden;
      background:rgba(11,30,58,0.55);
      backdrop-filter:blur(18px) saturate(1.4);
      -webkit-backdrop-filter:blur(18px) saturate(1.4);
      border:1px solid rgba(111,168,255,0.16);
      box-shadow:0 4px 40px rgba(3,7,18,0.5);
      display:flex;flex-direction:column
    ">
      <div style="height:2px;background:linear-gradient(to right,${svc.accentColor}44,${svc.accentColor},${svc.accentColor}44)"></div>
      <div style="padding:clamp(1.75rem,3.5vw,2.5rem);flex:1;display:flex;flex-direction:column">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
          <div style="width:50px;height:50px;border-radius:15px;
            background:${svc.accentColor}12;border:1px solid ${svc.accentColor}28;
            display:flex;align-items:center;justify-content:center;
            box-shadow:0 0 20px ${svc.glowColor}">
            <i data-lucide="${svc.icon}" style="width:22px;height:22px;color:${svc.accentColor}"></i>
          </div>
          <span style="font-family:'Outfit',sans-serif;font-size:.6rem;font-weight:600;
            letter-spacing:.14em;text-transform:uppercase;
            color:${svc.accentColor};opacity:.8;
            padding:4px 12px;border-radius:999px;
            background:${svc.accentColor}10;border:1px solid ${svc.accentColor}22">${svc.tag}</span>
        </div>
        <h3 style="
          font-family:'Cormorant Garamond',Georgia,serif;
          font-size:clamp(1.3rem,2.8vw,1.7rem);font-weight:500;font-style:italic;
          color:${CM.moonlight};line-height:1.2;margin-bottom:.6rem
        " data-edit-key="${svc.editKey}_title">${svc.title}</h3>
        <p style="
          font-family:'Outfit',sans-serif;font-size:.78rem;font-weight:500;
          color:${svc.accentColor};opacity:.85;margin-bottom:1rem;line-height:1.4
        " data-edit-key="${svc.editKey}_pos">${svc.positioning}</p>
        <p style="
          font-family:'Outfit',sans-serif;font-size:.84rem;line-height:1.78;
          color:${CM.stardust};margin-bottom:1.5rem
        " data-edit-key="${svc.editKey}_desc">${svc.desc}</p>
        <div style="margin-bottom:1.25rem">
          <p style="font-family:'Outfit',sans-serif;font-size:.6rem;font-weight:600;
            letter-spacing:.14em;text-transform:uppercase;color:rgba(143,168,214,0.5);margin-bottom:.65rem">Ideal For</p>
          <div style="display:flex;flex-wrap:wrap;gap:6px">
            ${svc.targets.map(t => `
              <span style="
                font-family:'Outfit',sans-serif;font-size:.68rem;
                color:${CM.stardust};opacity:.8;
                padding:4px 12px;border-radius:999px;
                background:rgba(111,168,255,0.07);
                border:1px solid rgba(111,168,255,0.15)">${t}</span>`).join('')}
          </div>
        </div>
        <div style="margin-bottom:1.75rem">
          <p style="font-family:'Outfit',sans-serif;font-size:.6rem;font-weight:600;
            letter-spacing:.14em;text-transform:uppercase;color:rgba(143,168,214,0.5);margin-bottom:.65rem">Includes</p>
          <div style="display:flex;flex-direction:column;gap:7px">
            ${svc.features.map(f => `
              <div style="display:flex;align-items:center;gap:8px">
                <span style="width:4px;height:4px;border-radius:50%;
                  background:${svc.accentColor};flex-shrink:0;
                  box-shadow:0 0 6px ${svc.accentColor}88"></span>
                <span style="font-family:'Outfit',sans-serif;font-size:.8rem;color:${CM.stardust};opacity:.85">${f}</span>
              </div>`).join('')}
          </div>
        </div>
        <div style="
          margin-top:auto;padding:1.25rem;border-radius:14px;
          background:${svc.accentColor}08;
          border:1px solid ${svc.accentColor}18;
          margin-bottom:1.25rem
        ">
          <p style="font-family:'Outfit',sans-serif;font-size:.58rem;font-weight:600;
            letter-spacing:.14em;text-transform:uppercase;
            color:rgba(143,168,214,0.45);margin-bottom:.4rem">${svc.pricingLabel} · Starting from</p>
          <div style="display:flex;align-items:baseline;gap:10px;flex-wrap:wrap">
            <span style="font-family:'Cormorant Garamond',Georgia,serif;
              font-size:1.35rem;font-weight:500;color:${svc.accentColor}">${svc.pricingIDR}</span>
            <span style="font-family:'Outfit',sans-serif;font-size:.72rem;
              color:rgba(143,168,214,0.5)">/</span>
            <span style="font-family:'Cormorant Garamond',Georgia,serif;
              font-size:1.1rem;font-weight:400;color:${CM.stardust}">${svc.pricingUSD}</span>
          </div>
        </div>
        <button onclick="goToPage('contact')" style="
          width:100%;font-family:'Outfit',sans-serif;font-size:.82rem;font-weight:600;
          color:${svc.accentColor};background:transparent;cursor:pointer;
          display:inline-flex;align-items:center;justify-content:center;gap:8px;
          padding:11px 22px;border-radius:999px;
          border:1px solid ${svc.accentColor}44;
          transition:background .22s,box-shadow .22s,border-color .22s,transform .22s
        " onmouseover="this.style.background='${svc.accentColor}12';this.style.boxShadow='0 0 18px ${svc.glowColor}';this.style.borderColor='${svc.accentColor}88';this.style.transform='translateY(-1px)'"
           onmouseout="this.style.background='transparent';this.style.boxShadow='none';this.style.borderColor='${svc.accentColor}44';this.style.transform='translateY(0)'">
          ${svc.ctaLabel}
          <i data-lucide="arrow-right" style="width:13px;height:13px"></i>
        </button>
      </div>
    </div>`).join('');

  return `
    <div id="cm-services" style="
      background:linear-gradient(180deg,${CM.midnight} 0%,${CM.deepSpace} 50%,${CM.midnight} 100%);
      padding:clamp(5rem,10vh,8rem) 24px;position:relative;overflow:hidden">
      <div style="position:absolute;inset:0;pointer-events:none;z-index:0;opacity:.65">
        ${cmBuildStarField(55)}
      </div>
      <div style="position:absolute;left:-15%;top:20%;width:55%;height:55%;border-radius:50%;
        background:radial-gradient(circle,rgba(111,168,255,0.04) 0%,transparent 65%);
        pointer-events:none;z-index:0"></div>
      <div style="position:absolute;right:-10%;bottom:10%;width:45%;height:45%;border-radius:50%;
        background:radial-gradient(circle,rgba(212,177,90,0.04) 0%,transparent 65%);
        pointer-events:none;z-index:0"></div>
      <div style="position:absolute;inset:0;pointer-events:none;z-index:0">
        ${cmConstellationSVG(1200, 700, 5)}
      </div>
      ${cmBuildAstronauts([
        { img: 4, right: '4%', top: '12%', size: 100, dur: 28, del: -3, rot: -10 },
      ])}
      <div class="max-w-6xl mx-auto" style="position:relative;z-index:1">
        <div class="cm-reveal" style="text-align:center;margin-bottom:4.5rem">
          <p style="font-family:'Outfit',sans-serif;font-size:.62rem;font-weight:600;
            letter-spacing:.22em;text-transform:uppercase;color:${CM.nebulaGold};margin-bottom:1rem">Services</p>
          <h2 style="
            font-family:'Cormorant Garamond',Georgia,serif;
            font-size:clamp(2.4rem,6vw,4rem);font-weight:400;font-style:italic;
            color:${CM.moonlight};line-height:1.05;letter-spacing:-.01em;margin-bottom:1.25rem
          " data-edit-key="cm_services_headline">Digital Identity Systems</h2>
          <p style="font-family:'Outfit',sans-serif;font-size:.92rem;line-height:1.78;
            color:${CM.stardust};max-width:520px;margin:0 auto
          " data-edit-key="cm_services_sub">We don't build websites. We architect digital presences that communicate who you are before a single word is read.</p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;align-items:start">
          ${serviceCards}
        </div>
        <div class="cm-reveal" style="
          margin-top:3.5rem;padding:2.5rem;border-radius:22px;
          background:rgba(24,59,107,0.2);
          border:1px solid rgba(111,168,255,0.1);
          display:flex;align-items:center;justify-content:space-between;
          flex-wrap:wrap;gap:1.5rem
        ">
          <div>
            <p style="font-family:'Cormorant Garamond',Georgia,serif;
              font-size:clamp(1.2rem,2.5vw,1.6rem);font-weight:400;font-style:italic;
              color:${CM.moonlight};margin-bottom:.35rem">Not sure which fits you?</p>
            <p style="font-family:'Outfit',sans-serif;font-size:.82rem;color:${CM.stardust};opacity:.8">
              Let's talk about your project and find the right direction together.
            </p>
          </div>
          <button onclick="goToPage('contact')" class="cm-glow-btn" style="
            font-family:'Outfit',sans-serif;font-size:.85rem;font-weight:600;
            background:${CM.nebulaGold};color:${CM.midnight};padding:14px 30px;border-radius:999px;
            border:none;cursor:pointer;display:inline-flex;align-items:center;gap:8px;
            letter-spacing:.03em;white-space:nowrap
          ">
            Book a Consultation
            <i data-lucide="arrow-right" style="width:14px;height:14px"></i>
          </button>
        </div>
      </div>
    </div>`;
}

// ── Section 3: Concept Platforms ──────────────────────────────────────────────

function cmBuildConceptPlatforms() {
  const concepts = [
    {
      num: '01',
      badge: 'Personal · Portfolio',
      title: 'Premium Portfolio System',
      theme: 'Cinematic Personal Branding',
      desc: 'A narrative-driven digital identity platform for creatives, researchers, and international professionals. Every element — from typography to motion — tells your story with editorial precision.',
      accentColor: CM.aurora,
      glowColor: 'rgba(111,168,255,0.2)',
      bg: 'linear-gradient(145deg,#030a1a 0%,#071126 60%,#0B1E3A 100%)',
      tags: ['Editorial Design', 'Portfolio CMS', 'Personal Branding', 'Motion & Animation', 'Multi-language'],
      previewLabel: 'Identity System',
      icon: 'user',
    },
    {
      num: '02',
      badge: 'Institutional · International',
      title: 'International Office Platform',
      theme: 'Global Engagement Ecosystem',
      desc: 'A sophisticated digital platform for universities and international offices. Features partnership directories, student onboarding systems, mobility programs, and global announcement boards.',
      accentColor: CM.nebulaGold,
      glowColor: 'rgba(212,177,90,0.2)',
      bg: 'linear-gradient(145deg,#0B1E3A 0%,#183B6B 60%,#1a3d6b 100%)',
      tags: ['Partnership Directory', 'Student Onboarding', 'Mobility Programs', 'Institutional Design', 'Global Reach'],
      previewLabel: 'Institutional Platform',
      icon: 'globe',
    },
    {
      num: '03',
      badge: 'Data · Operations',
      title: 'Modern Dashboard System',
      theme: 'Operational Intelligence',
      desc: 'A premium internal platform built for organizations that need clarity in complexity. Analytics, workflow management, and admin interfaces — designed with the aesthetic of premium SaaS.',
      accentColor: '#A0C4FF',
      glowColor: 'rgba(160,196,255,0.2)',
      bg: 'linear-gradient(145deg,#080818 0%,#0d1a30 60%,#121f3a 100%)',
      tags: ['Analytics Dashboard', 'Workflow Engine', 'Data Visualization', 'Admin Interface', 'Modular Systems'],
      previewLabel: 'Dashboard System',
      icon: 'layout-dashboard',
    },
  ];

  const conceptCards = concepts.map((c, idx) => {
    const previewMock = `
      <div style="
        background:${c.bg};border-radius:14px;overflow:hidden;
        border:1px solid ${c.accentColor}22;
        box-shadow:0 8px 40px rgba(3,7,18,0.6),0 0 0 1px ${c.accentColor}12;
        position:relative;height:180px
      ">
        ${cmBuildStarField(14)}
        <div style="
          background:rgba(7,17,38,0.7);backdrop-filter:blur(10px);
          padding:9px 14px;border-bottom:1px solid ${c.accentColor}18;
          display:flex;align-items:center;gap:8px;position:relative;z-index:1
        ">
          <div style="width:7px;height:7px;border-radius:50%;background:${c.accentColor};opacity:.6"></div>
          <div style="flex:1;height:6px;background:rgba(255,255,255,0.05);border-radius:3px"></div>
          <div style="width:40px;height:6px;background:${c.accentColor}22;border-radius:3px"></div>
        </div>
        <div style="padding:14px 16px;position:relative;z-index:1">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
            <div style="background:rgba(255,255,255,0.03);border:1px solid ${c.accentColor}15;border-radius:8px;padding:10px">
              <div style="height:5px;width:45%;background:${c.accentColor}30;border-radius:3px;margin-bottom:6px"></div>
              <div style="height:14px;width:70%;background:${c.accentColor}18;border-radius:4px"></div>
            </div>
            <div style="background:rgba(255,255,255,0.03);border:1px solid ${c.accentColor}15;border-radius:8px;padding:10px">
              <div style="height:5px;width:45%;background:${c.accentColor}30;border-radius:3px;margin-bottom:6px"></div>
              <div style="height:14px;width:70%;background:${c.accentColor}18;border-radius:4px"></div>
            </div>
          </div>
          <div style="background:rgba(255,255,255,0.02);border:1px solid ${c.accentColor}12;
            border-radius:8px;padding:10px;display:flex;gap:8px;align-items:center">
            <div style="width:28px;height:28px;border-radius:7px;background:${c.accentColor}18;
              display:flex;align-items:center;justify-content:center;flex-shrink:0">
              <i data-lucide="${c.icon}" style="width:13px;height:13px;color:${c.accentColor}"></i>
            </div>
            <div style="flex:1">
              <div style="height:4px;width:55%;background:${c.accentColor}25;border-radius:3px;margin-bottom:5px"></div>
              <div style="height:4px;width:38%;background:rgba(255,255,255,0.06);border-radius:3px"></div>
            </div>
            <div style="width:44px;height:18px;background:${c.accentColor}22;border-radius:999px"></div>
          </div>
        </div>
        <div style="position:absolute;bottom:10px;right:12px;z-index:2">
          <span style="font-family:'Outfit',sans-serif;font-size:.55rem;font-weight:600;
            letter-spacing:.14em;text-transform:uppercase;color:${c.accentColor};opacity:.55">${c.previewLabel}</span>
        </div>
        <div style="position:absolute;${idx % 2 === 0 ? 'right' : 'left'}:-30px;top:-20px;
          width:120px;height:120px;border-radius:50%;
          background:radial-gradient(circle,${c.accentColor}14 0%,transparent 70%);
          pointer-events:none;z-index:0"></div>
      </div>`;

    return `
      <div class="cm-card-hover cm-reveal" style="
        background:rgba(11,30,58,0.45);backdrop-filter:blur(16px) saturate(1.3);
        -webkit-backdrop-filter:blur(16px) saturate(1.3);
        border:1px solid rgba(111,168,255,0.14);border-radius:24px;overflow:hidden;
        box-shadow:0 4px 36px rgba(3,7,18,0.45);
        display:flex;flex-direction:column
      ">
        <div style="padding:16px 16px 0">${previewMock}</div>
        <div style="padding:1.5rem clamp(1.25rem,3vw,1.75rem) clamp(1.5rem,3vw,2rem)">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.85rem">
            <span style="font-family:'Outfit',sans-serif;font-size:.58rem;font-weight:700;
              letter-spacing:.18em;text-transform:uppercase;color:${c.accentColor};opacity:.7">${c.num}</span>
            <span style="font-family:'Outfit',sans-serif;font-size:.6rem;font-weight:500;
              letter-spacing:.12em;text-transform:uppercase;color:rgba(143,168,214,0.45);
              padding:3px 10px;border-radius:999px;background:rgba(111,168,255,0.06);
              border:1px solid rgba(111,168,255,0.12)">${c.badge}</span>
          </div>
          <h3 style="
            font-family:'Cormorant Garamond',Georgia,serif;
            font-size:clamp(1.25rem,2.5vw,1.55rem);font-weight:500;font-style:italic;
            color:${CM.moonlight};line-height:1.2;margin-bottom:.4rem
          ">${c.title}</h3>
          <p style="font-family:'Outfit',sans-serif;font-size:.75rem;font-weight:500;
            color:${c.accentColor};opacity:.75;margin-bottom:.85rem">${c.theme}</p>
          <p style="font-family:'Outfit',sans-serif;font-size:.82rem;line-height:1.74;
            color:${CM.stardust};margin-bottom:1.25rem">${c.desc}</p>
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:1.5rem">
            ${c.tags.map(tag => `
              <span style="font-family:'Outfit',sans-serif;font-size:.66rem;
                color:${CM.stardust};opacity:.75;
                padding:4px 12px;border-radius:999px;
                background:${c.accentColor}0a;
                border:1px solid ${c.accentColor}20">${tag}</span>`).join('')}
          </div>
          <button onclick="goToPage('contact')" style="
            width:100%;font-family:'Outfit',sans-serif;font-size:.8rem;font-weight:600;
            color:${c.accentColor};background:transparent;cursor:pointer;
            display:inline-flex;align-items:center;justify-content:center;gap:7px;
            padding:10px 20px;border-radius:999px;
            border:1px solid ${c.accentColor}35;
            transition:background .2s,box-shadow .2s,border-color .2s
          " onmouseover="this.style.background='${c.accentColor}10';this.style.boxShadow='0 0 14px ${c.glowColor}';this.style.borderColor='${c.accentColor}70'"
             onmouseout="this.style.background='transparent';this.style.boxShadow='none';this.style.borderColor='${c.accentColor}35'">
            Build This for Me
            <i data-lucide="arrow-right" style="width:12px;height:12px"></i>
          </button>
        </div>
      </div>`;
  }).join('');

  return `
    <div id="cm-concept-platforms" style="
      background:linear-gradient(180deg,${CM.deepSpace} 0%,${CM.void} 50%,${CM.midnight} 100%);
      padding:clamp(5rem,10vh,8rem) 24px;position:relative;overflow:hidden">
      <div style="position:absolute;inset:0;pointer-events:none;z-index:0;opacity:.6">
        ${cmBuildStarField(45)}
      </div>
      <div style="position:absolute;inset:0;pointer-events:none;z-index:0">
        ${cmConstellationSVG(1200, 700, 9)}
      </div>
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
        width:700px;height:400px;border-radius:50%;
        background:radial-gradient(ellipse,rgba(111,168,255,0.04) 0%,transparent 65%);
        pointer-events:none;z-index:0"></div>
      ${cmBuildAstronauts([
        { img: 5, left: '2%', bottom: '20%', size: 90, dur: 30, del: -8, rot: 12 },
      ])}
      <div class="max-w-6xl mx-auto" style="position:relative;z-index:1">
        <div class="cm-reveal" style="text-align:center;margin-bottom:4.5rem">
          <p style="font-family:'Outfit',sans-serif;font-size:.62rem;font-weight:600;
            letter-spacing:.22em;text-transform:uppercase;color:${CM.nebulaGold};margin-bottom:1rem">Concept Platforms</p>
          <h2 style="
            font-family:'Cormorant Garamond',Georgia,serif;
            font-size:clamp(2.4rem,6vw,4rem);font-weight:400;font-style:italic;
            color:${CM.moonlight};line-height:1.05;margin-bottom:1.25rem
          " data-edit-key="cm_concepts_headline">Demo Experiences</h2>
          <p style="font-family:'Outfit',sans-serif;font-size:.92rem;line-height:1.78;
            color:${CM.stardust};max-width:520px;margin:0 auto
          " data-edit-key="cm_concepts_sub">Three premium platform directions. Explore the visual language we bring to each type of project — and imagine what yours could feel like.</p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:22px">
          ${conceptCards}
        </div>
        <div class="cm-reveal" style="margin-top:3.5rem;text-align:center">
          <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(1rem,2vw,1.3rem);
            font-weight:400;font-style:italic;color:${CM.stardust};opacity:.7;margin-bottom:1.5rem">
            "I want <em>my</em> platform to feel like this."
          </p>
          <button onclick="goToPage('contact')" style="
            font-family:'Outfit',sans-serif;font-size:.85rem;font-weight:600;
            color:${CM.nebulaGold};background:transparent;cursor:pointer;
            display:inline-flex;align-items:center;gap:8px;
            padding:12px 28px;border-radius:999px;
            border:1px solid rgba(212,177,90,0.35);
            transition:background .2s,box-shadow .2s,border-color .2s,transform .2s
          " onmouseover="this.style.background='rgba(212,177,90,0.1)';this.style.boxShadow='0 0 20px rgba(212,177,90,0.25)';this.style.borderColor='rgba(212,177,90,0.65)';this.style.transform='translateY(-2px)'"
             onmouseout="this.style.background='transparent';this.style.boxShadow='none';this.style.borderColor='rgba(212,177,90,0.35)';this.style.transform='translateY(0)'">
            Discuss Your Vision
            <i data-lucide="arrow-right" style="width:14px;height:14px"></i>
          </button>
        </div>
      </div>
    </div>`;
}

// ── Section 4: Web Projects ───────────────────────────────────────────────────

function cmBuildRepoSkeletons() {
  return Array.from({ length: 6 }, () => `
    <div style="border-radius:16px;overflow:hidden;background:${CM.deepSpace};
      border:1px solid rgba(111,168,255,0.1)">
      <div style="height:3px" class="cm-shimmer"></div>
      <div style="background:rgba(24,59,107,0.3);padding:9px 12px;
        border-bottom:1px solid rgba(111,168,255,0.08);display:flex;align-items:center;gap:7px">
        <div style="display:flex;gap:4px">
          ${['rgba(111,168,255,0.2)','rgba(111,168,255,0.14)','rgba(111,168,255,0.1)'].map(c =>
            `<span style="width:8px;height:8px;border-radius:50%;background:${c};display:block"></span>`
          ).join('')}
        </div>
        <div style="flex:1;height:9px;background:rgba(111,168,255,0.1);border-radius:4px" class="cm-shimmer"></div>
      </div>
      <div style="background:rgba(11,30,58,0.5);padding:16px 18px;height:72px" class="cm-shimmer"></div>
      <div style="padding:18px 20px 22px">
        <div style="height:12px;border-radius:4px;width:65%;margin-bottom:10px" class="cm-shimmer"></div>
        <div style="height:8px;border-radius:3px;width:88%;margin-bottom:6px" class="cm-shimmer"></div>
        <div style="height:8px;border-radius:3px;width:72%;margin-bottom:16px" class="cm-shimmer"></div>
        <div style="height:22px;border-radius:999px;width:88px" class="cm-shimmer"></div>
      </div>
    </div>`).join('');
}

function cmBuildRepoCard(repo) {
  const filterKey = cmLangFilterKey(repo.language);
  const langColor = cmLangColor(repo.language);
  return `
    <div data-cm-lang-filter="${filterKey}" class="cm-card-hover" style="
      background:${CM.deepSpace};border-radius:16px;overflow:hidden;
      border:1px solid rgba(111,168,255,0.12);box-shadow:0 2px 20px rgba(3,7,18,0.45);
      position:relative
    ">
      <!-- Constellation mini overlay -->
      <div style="position:absolute;inset:0;pointer-events:none;overflow:hidden;opacity:.4">
        ${cmConstellationSVG(340, 180, Math.random() * 10 | 0)}
      </div>
      <div style="height:3px;background:linear-gradient(to right,${CM.nebulaGold},${CM.aurora})"></div>
      <div style="background:rgba(24,59,107,0.32);padding:9px 12px;
        border-bottom:1px solid rgba(111,168,255,0.08);display:flex;align-items:center;gap:7px;position:relative">
        <div style="display:flex;gap:4px;flex-shrink:0">
          <span style="width:8px;height:8px;border-radius:50%;background:rgba(212,177,90,0.5);display:block"></span>
          <span style="width:8px;height:8px;border-radius:50%;background:rgba(111,168,255,0.4);display:block"></span>
          <span style="width:8px;height:8px;border-radius:50%;background:rgba(217,230,255,0.3);display:block"></span>
        </div>
        <div style="flex:1;background:rgba(7,17,38,0.5);border-radius:4px;padding:3px 9px;
          font-family:'Outfit',sans-serif;font-size:.55rem;color:${CM.stardust};opacity:.6;
          border:1px solid rgba(111,168,255,0.1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis
        ">github.com/zefanyakharisma-cell/${repo.name}</div>
      </div>
      <div style="background:rgba(11,30,58,0.45);padding:14px 18px 16px;
        border-bottom:1px solid rgba(111,168,255,0.07);min-height:72px;position:relative;overflow:hidden">
        <div style="height:7px;width:50%;background:rgba(212,177,90,0.2);border-radius:4px;margin-bottom:8px"></div>
        <div style="height:5px;width:76%;background:rgba(111,168,255,0.1);border-radius:3px;margin-bottom:5px"></div>
        <div style="height:5px;width:60%;background:rgba(111,168,255,0.07);border-radius:3px"></div>
        <div style="position:absolute;right:14px;bottom:10px;font-size:2rem;opacity:.06;
          font-family:'Cormorant Garamond',serif;color:${CM.moonlight}">✦</div>
      </div>
      <div style="padding:18px 20px 22px;position:relative">
        <h4 style="
          font-family:'Cormorant Garamond',Georgia,serif;
          font-size:1.06rem;font-weight:500;color:${CM.moonlight};
          margin-bottom:6px;line-height:1.3
        ">${cmHumanize(repo.name)}</h4>
        <p style="
          font-family:'Outfit',sans-serif;font-size:.77rem;line-height:1.64;
          color:${CM.stardust};margin-bottom:14px;
          display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden
        ">${repo.description}</p>
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
          ${repo.language ? `
            <span style="display:inline-flex;align-items:center;gap:5px;
              font-family:'Outfit',sans-serif;font-size:.71rem;color:${CM.stardust}">
              <span style="width:9px;height:9px;border-radius:50%;background:${langColor};
                flex-shrink:0;display:inline-block;box-shadow:0 0 6px ${langColor}66"></span>
              ${repo.language}
            </span>` : '<span></span>'}
          ${CM_REPO_DETAIL_PAGE[repo.name]
            ? `<button onclick="goToPage('${CM_REPO_DETAIL_PAGE[repo.name]}')" style="
                font-family:'Outfit',sans-serif;font-size:.75rem;font-weight:600;
                color:${CM.nebulaGold};background:transparent;cursor:pointer;
                display:inline-flex;align-items:center;gap:5px;
                padding:5px 14px;border-radius:999px;
                border:1px solid rgba(212,177,90,0.3);
                transition:background .2s,box-shadow .2s,border-color .2s
               " onmouseover="this.style.background='rgba(212,177,90,0.12)';this.style.boxShadow='0 0 12px rgba(212,177,90,0.2)';this.style.borderColor='rgba(212,177,90,0.5)'"
                  onmouseout="this.style.background='transparent';this.style.boxShadow='none';this.style.borderColor='rgba(212,177,90,0.3)'">
                Explore <i data-lucide="arrow-right" style="width:11px;height:11px"></i>
              </button>`
            : `<a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" style="
                font-family:'Outfit',sans-serif;font-size:.75rem;font-weight:600;
                color:${CM.aurora};text-decoration:none;
                display:inline-flex;align-items:center;gap:5px;
                padding:5px 14px;border-radius:999px;
                border:1px solid rgba(111,168,255,0.22);background:transparent;
                transition:background .2s,box-shadow .2s
               " onmouseover="this.style.background='rgba(111,168,255,0.1)';this.style.boxShadow='0 0 10px rgba(111,168,255,0.15)'"
                  onmouseout="this.style.background='transparent';this.style.boxShadow='none'">
                Explore <i data-lucide="arrow-right" style="width:11px;height:11px"></i>
              </a>`
          }
        </div>
      </div>
    </div>`;
}

function cmBuildFeaturedProject(project) {
  const techBadges = project.tech.map(t =>
    `<span style="font-family:'Outfit',sans-serif;font-size:.67rem;font-weight:400;` +
    `padding:3px 11px;border-radius:999px;background:rgba(212,177,90,0.1);color:${CM.stardust};` +
    `border:1px solid rgba(212,177,90,0.2)">${t}</span>`
  ).join('');

  const statusBg = project.statusBg || 'rgba(45,122,79,0.15)';
  const statusColor = project.statusColor || '#4CAF87';

  // Thumbnail: scaled iframe (1620×800 → 0.2 scale = 324×160px display).
  // Fallback gradient is shown until the iframe loads.
  const thumbId = 'cmFP-' + project.page;
  const thumbHtml = `
    <div style="height:160px;position:relative;overflow:hidden;background:${project.bg}">
      <!-- Fallback: gradient with constellation + label -->
      <div id="${thumbId}-fallback" style="
        position:absolute;inset:0;z-index:1;
        background:${project.bg};
        display:flex;align-items:center;justify-content:center;
        transition:opacity .4s ease
      ">
        <div style="position:absolute;inset:0;pointer-events:none">${cmBuildStarField(16)}</div>
        <div style="position:absolute;inset:0;pointer-events:none;opacity:.45">
          ${cmConstellationSVG(320, 160, project.page.length)}
        </div>
        <div style="position:absolute;inset:0;opacity:.05;font-family:'Cormorant Garamond',serif;
          font-size:5.5rem;font-weight:600;color:#fff;display:flex;align-items:center;
          justify-content:center;letter-spacing:-.04em;user-select:none;overflow:hidden">${project.watermark}</div>
        <div style="position:relative;z-index:1;text-align:center">
          <div style="font-family:'Outfit',sans-serif;font-size:.58rem;font-weight:600;letter-spacing:.18em;
            text-transform:uppercase;color:rgba(217,230,255,0.45);margin-bottom:8px">${project.label}</div>
          <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.55rem;font-weight:500;
            color:${CM.moonlight};line-height:1.15;text-shadow:0 2px 20px rgba(0,0,0,0.6)">${project.title}</div>
        </div>
      </div>
      <!-- Live site thumbnail via scaled iframe -->
      ${project.live ? `<iframe
        src="${project.live}"
        scrolling="no"
        tabindex="-1"
        aria-hidden="true"
        title="${project.title} homepage preview"
        style="
          position:absolute;top:0;left:0;
          width:1620px;height:800px;
          transform:scale(0.2);
          transform-origin:top left;
          border:none;pointer-events:none;
          z-index:2;
        "
        loading="lazy"
        onload="(function(f){if(f)f.style.opacity='0'})(document.getElementById('${thumbId}-fallback'))"
      ></iframe>` : ''}
      <!-- Gradient polish overlay -->
      <div style="
        position:absolute;inset:0;z-index:3;pointer-events:none;
        background:linear-gradient(to bottom,transparent 55%,rgba(7,17,38,0.45) 100%)
      "></div>
    </div>`;

  return `<div class="cm-card-hover cm-reveal" style="
    background:${CM.deepSpace};border-radius:18px;overflow:hidden;
    border:1px solid rgba(111,168,255,0.14);box-shadow:0 4px 28px rgba(3,7,18,0.4);
    position:relative">
    ${thumbHtml}
    <div style="padding:20px 22px 22px">
      <p style="font-family:'Outfit',sans-serif;font-size:.79rem;line-height:1.66;
        color:${CM.stardust};margin-bottom:14px">${project.tagline}</p>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:18px">${techBadges}</div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding-top:14px;
        border-top:1px solid rgba(111,168,255,0.1)">
        <span style="font-family:'Outfit',sans-serif;font-size:.67rem;font-weight:600;
          letter-spacing:.08em;text-transform:uppercase;padding:3px 10px;border-radius:999px;
          background:${statusBg};color:${statusColor}">${project.status}</span>
        <button onclick="goToPage('${project.page}')" style="
          font-family:'Outfit',sans-serif;font-size:.77rem;font-weight:600;
          color:${CM.nebulaGold};background:transparent;cursor:pointer;
          display:inline-flex;align-items:center;gap:5px;
          padding:6px 16px;border-radius:999px;
          border:1px solid rgba(212,177,90,0.28);
          transition:background .2s,box-shadow .2s,border-color .2s"
          onmouseover="this.style.background='rgba(212,177,90,0.12)';this.style.boxShadow='0 0 14px rgba(212,177,90,0.22)';this.style.borderColor='rgba(212,177,90,0.5)'"
          onmouseout="this.style.background='transparent';this.style.boxShadow='none';this.style.borderColor='rgba(212,177,90,0.28)'">
          Explore <i data-lucide="arrow-right" style="width:11px;height:11px"></i>
        </button>
      </div>
    </div>
  </div>`;
}

const CM_FEATURED_PROJECTS = [
  {
    page:        'web-portfolio',
    live:        'https://website-portfolio-liard-alpha.vercel.app/',
    title:       'Website Portfolio',
    label:       'SPA · Vanilla JS',
    watermark:   'Portfolio',
    tagline:     'Dual-identity single-page app with iOS-style navigation, Supabase CMS, and 20+ pages — no framework.',
    tech:        ['HTML/CSS', 'JavaScript', 'Tailwind', 'Supabase'],
    bg:          'linear-gradient(145deg,#030712,#071126)',
    status:      'Live',
    statusBg:    'rgba(45,180,79,0.12)',
    statusColor: '#4CAF87',
  },
  {
    page:        'web-pcu-global-intl',
    live:        'https://international-office-website.vercel.app/',
    title:       'International Office',
    label:       'Web App · PCU Global',
    watermark:   'Intl. Office',
    tagline:     'Full rebuild of PCU\'s International Office website — news CMS, partnership directory, mobile-first.',
    tech:        ['HTML/CSS', 'JavaScript', 'Tailwind', 'Supabase'],
    bg:          'linear-gradient(145deg,#0B1E3A,#183B6B)',
    status:      'In Progress',
    statusBg:    'rgba(212,177,90,0.12)',
    statusColor: '#D4B15A',
  },
  {
    page:        'web-dashboard-partnership',
    live:        'https://dashboard-partnership.vercel.app/',
    title:       'Dashboard Partnership',
    label:       'Data Dashboard',
    watermark:   'Partnership',
    tagline:     'Interactive dashboard visualising 2,289 institutional partnerships — workflow engine, analytics, archive.',
    tech:        ['JavaScript', 'Chart.js', 'Tailwind'],
    bg:          'linear-gradient(145deg,#0a1f2e,#0f3545)',
    status:      'Live',
    statusBg:    'rgba(45,180,79,0.12)',
    statusColor: '#4CAF87',
  },
  {
    page:        'web-dashboard-grants',
    live:        'https://dashboard-international-grants.vercel.app/',
    title:       'International Grants',
    label:       'Data Dashboard',
    watermark:   'Grants',
    tagline:     'Centralised grant tracking from application to outcome — deadline timeline, pipeline view, realtime updates.',
    tech:        ['JavaScript', 'Chart.js', 'Supabase'],
    bg:          'linear-gradient(145deg,#120a2e,#2a1060)',
    status:      'Live',
    statusBg:    'rgba(45,180,79,0.12)',
    statusColor: '#4CAF87',
  },
];

function cmBuildWebProjects() {
  const featuredCards = CM_FEATURED_PROJECTS.map(p => cmBuildFeaturedProject(p)).join('');

  const pills = [
    { id: 'all',        label: 'All' },
    { id: 'html-css',   label: 'HTML / CSS' },
    { id: 'javascript', label: 'JavaScript' },
    { id: 'other',      label: 'Other' },
  ].map(f => `
    <button data-cm-filter="${f.id}" onclick="cmSetRepoFilter('${f.id}')"
      class="cm-filter-pill ${f.id === 'all' ? 'active' : ''}" style="
      ${f.id === 'all'
        ? `background:${CM.nebulaGold};color:${CM.midnight};border:1px solid ${CM.nebulaGold};box-shadow:0 0 14px rgba(212,177,90,0.3)`
        : `background:transparent;color:${CM.stardust};border:1px solid rgba(111,168,255,0.2)`}
    ">${f.label}</button>`).join('');

  return `
    <div id="cm-web-projects" style="
      background:linear-gradient(180deg,${CM.deepSpace} 0%,${CM.midnight} 100%);
      padding:clamp(4.5rem,9vh,7rem) 24px;position:relative;overflow:hidden">
      <!-- Constellation background -->
      <div style="position:absolute;inset:0;pointer-events:none;z-index:0">
        ${cmConstellationSVG(1200, 800, 7)}
      </div>
      <div style="position:absolute;inset:0;pointer-events:none;z-index:0;opacity:.5">
        ${cmBuildStarField(35)}
      </div>
      ${cmBuildAstronauts([
        { img: 4, left: '2%',  top: '28%',  size: 100, dur: 26, del: -4,  rot: 18 },
        { img: 5, right: '3%', top: '14%',  size: 85,  dur: 32, del: -14, rot: -8 },
      ])}

      <div class="max-w-5xl mx-auto" style="position:relative;z-index:1">
        <div class="cm-reveal" style="margin-bottom:2.75rem">
          <p style="font-family:'Outfit',sans-serif;font-size:.63rem;font-weight:600;
            letter-spacing:.2em;text-transform:uppercase;color:${CM.nebulaGold};margin-bottom:.9rem">Web Development</p>
          <h2 style="
            font-family:'Cormorant Garamond',Georgia,serif;
            font-size:clamp(2.2rem,5vw,3.5rem);font-weight:400;font-style:italic;
            color:${CM.moonlight};line-height:1.08
          " data-edit-key="cm_web_title">Featured Projects</h2>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:20px;margin-bottom:2.5rem">
          ${featuredCards}
        </div>

        <!-- View All button -->
        <div class="cm-reveal" style="display:flex;justify-content:center;margin-bottom:3.5rem">
          <button onclick="goToPage('websites')" style="
            font-family:'Outfit',sans-serif;font-size:.875rem;font-weight:600;
            background:${CM.nebulaGold};color:${CM.midnight};
            padding:14px 32px;border-radius:999px;
            border:none;cursor:pointer;
            display:inline-flex;align-items:center;gap:9px;
            letter-spacing:.03em;
            box-shadow:0 0 24px rgba(212,177,90,0.32),0 4px 18px rgba(212,177,90,0.2);
            transition:opacity .2s,transform .2s,box-shadow .2s
          " onmouseover="this.style.opacity='.88';this.style.transform='translateY(-2px)';this.style.boxShadow='0 0 36px rgba(212,177,90,0.5),0 6px 24px rgba(212,177,90,0.3)'"
             onmouseout="this.style.opacity='1';this.style.transform='translateY(0)';this.style.boxShadow='0 0 24px rgba(212,177,90,0.32),0 4px 18px rgba(212,177,90,0.2)'">
            View All Web Projects
            <i data-lucide="arrow-right" style="width:15px;height:15px"></i>
          </button>
        </div>

        <!-- Divider with constellation line -->
        <div class="cm-reveal" style="display:flex;align-items:center;gap:16px;margin-bottom:2.25rem">
          <div style="flex:1;height:1px;background:linear-gradient(to right,transparent,rgba(111,168,255,0.2))"></div>
          <span style="font-family:'Outfit',sans-serif;font-size:.63rem;font-weight:600;
            letter-spacing:.18em;text-transform:uppercase;color:${CM.stardust};opacity:.6">Open Source</span>
          <div style="flex:1;height:1px;background:linear-gradient(to left,transparent,rgba(111,168,255,0.2))"></div>
        </div>

        <div class="cm-reveal" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:1.5rem">
          <div style="display:flex;flex-wrap:wrap;gap:8px">${pills}</div>
          <a href="https://github.com/zefanyakharisma-cell" target="_blank" rel="noopener noreferrer" style="
            font-family:'Outfit',sans-serif;font-size:.77rem;font-weight:400;
            color:${CM.stardust};text-decoration:none;display:inline-flex;align-items:center;gap:6px;
            border:1px solid rgba(111,168,255,0.18);padding:8px 16px;border-radius:999px;
            background:transparent;transition:border-color .2s,color .2s,box-shadow .2s
          " onmouseover="this.style.borderColor='rgba(111,168,255,0.4)';this.style.color='${CM.aurora}';this.style.boxShadow='0 0 12px rgba(111,168,255,0.12)'"
             onmouseout="this.style.borderColor='rgba(111,168,255,0.18)';this.style.color='${CM.stardust}';this.style.boxShadow='none'">
            <i data-lucide="github" style="width:14px;height:14px"></i>
            @zefanyakharisma-cell
          </a>
        </div>

        <div id="cm-repo-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px">
          ${cmBuildRepoSkeletons()}
        </div>
      </div>
    </div>`;
}

function cmRenderRepos(repos) {
  const grid = document.getElementById('cm-repo-grid');
  if (!grid) return;
  if (!repos || repos.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:64px 24px">
        <p style="font-family:'Outfit',sans-serif;font-size:.9rem;color:${CM.stardust};margin-bottom:14px">
          Couldn't load projects — view them directly on GitHub.
        </p>
        <a href="https://github.com/zefanyakharisma-cell" target="_blank" rel="noopener noreferrer" style="
          font-family:'Outfit',sans-serif;font-size:.84rem;font-weight:600;
          color:${CM.nebulaGold};text-decoration:none;
          border-bottom:1px solid ${CM.nebulaGold};padding-bottom:2px
        ">@zefanyakharisma-cell ↗</a>
      </div>`;
    return;
  }
  grid.innerHTML = repos.map(r => cmBuildRepoCard(r)).join('');
  if (window.lucide) lucide.createIcons();
  cmApplyRepoFilter(cmRepoFilter);
}

function cmApplyRepoFilter(filter) {
  document.querySelectorAll('[data-cm-lang-filter]').forEach(card => {
    card.style.display = (filter === 'all' || card.getAttribute('data-cm-lang-filter') === filter) ? '' : 'none';
  });
  document.querySelectorAll('[data-cm-filter]').forEach(btn => {
    const active = btn.getAttribute('data-cm-filter') === filter;
    btn.style.background   = active ? CM.nebulaGold : 'transparent';
    btn.style.color        = active ? CM.midnight   : CM.stardust;
    btn.style.borderColor  = active ? CM.nebulaGold : 'rgba(111,168,255,0.2)';
    btn.style.boxShadow    = active ? '0 0 14px rgba(212,177,90,0.3)' : 'none';
  });
}

window.cmSetRepoFilter = function(filter) {
  cmRepoFilter = filter;
  cmApplyRepoFilter(filter);
};

async function cmFetchRepos() {
  const KEY = 'cm_gh_repos_v2';
  const cached = sessionStorage.getItem(KEY);
  if (cached) {
    try { cmRenderRepos(JSON.parse(cached)); return; } catch(e) {}
  }
  try {
    const res = await fetch('https://api.github.com/users/zefanyakharisma-cell/repos?sort=updated&per_page=20');
    if (!res.ok) throw new Error('fetch failed');
    const all = await res.json();
    const filtered = all.filter(r => !r.fork && r.description && r.name !== 'zefanyakharisma-cell');
    sessionStorage.setItem(KEY, JSON.stringify(filtered));
    cmRenderRepos(filtered);
  } catch(e) {
    cmRenderRepos(null);
  }
}

// ── Section 5: Graphic Design ─────────────────────────────────────────────────

const CM_CAT_COLORS = {
  'Brand Identity':   CM.nebulaGold,
  'Event Materials':  CM.aurora,
  'Print & Digital':  CM.stardust,
  'Visual Identity':  '#A0B8E0',
  'Social Media Kits': '#B8956A',
};

function cmBuildGDCard(g, i) {
  const catColor = CM_CAT_COLORS[g.cat] || CM.stardust;
  return `
    <button onclick="cmOpenGDPreview(${i})" class="cm-card-hover cm-gd-card-hover" style="
      background:${CM.deepSpace};border-radius:18px;overflow:hidden;
      border:1px solid rgba(111,168,255,0.12);cursor:pointer;text-align:left;width:100%;
      box-shadow:0 4px 28px rgba(3,7,18,0.4)
    ">
      <div style="position:relative;overflow:hidden;height:195px">
        <img src="./assets/images/graphic-designs/${g.folder}/1.png" alt="${g.title}"
          style="width:100%;height:100%;object-fit:cover;object-position:top;
            transition:transform .45s ease"
          loading="lazy">
        <!-- Gradient overlay -->
        <div style="position:absolute;inset:0;
          background:linear-gradient(to bottom,transparent 45%,rgba(7,17,38,0.72));
          pointer-events:none"></div>
        <!-- Glow on hover overlay -->
        <div class="cm-gd-overlay" style="position:absolute;inset:0;opacity:0;
          background:rgba(7,17,38,0.28);transition:opacity .28s;
          display:flex;align-items:center;justify-content:center;pointer-events:none">
          <span style="font-family:'Outfit',sans-serif;font-size:.72rem;font-weight:600;
            color:${CM.moonlight};background:rgba(7,17,38,0.6);padding:7px 20px;
            border-radius:999px;backdrop-filter:blur(8px);
            border:1px solid rgba(217,230,255,0.2);
            box-shadow:0 0 18px rgba(111,168,255,0.2)">Preview</span>
        </div>
        <!-- Year badge -->
        <span style="position:absolute;top:10px;right:10px;
          font-family:'Outfit',sans-serif;font-size:.58rem;font-weight:500;
          background:rgba(7,17,38,0.6);backdrop-filter:blur(6px);
          color:${CM.stardust};padding:3px 10px;border-radius:999px;
          border:1px solid rgba(111,168,255,0.18)">${g.year}</span>
      </div>
      <div style="padding:16px 18px 20px">
        <p style="font-family:'Outfit',sans-serif;font-size:.62rem;font-weight:600;
          letter-spacing:.12em;text-transform:uppercase;color:${catColor};margin-bottom:6px">${g.cat}</p>
        <h4 style="font-family:'Cormorant Garamond',Georgia,serif;
          font-size:1.04rem;font-weight:500;color:${CM.moonlight};
          line-height:1.28;margin-bottom:4px">${g.title}</h4>
        <p style="font-family:'Outfit',sans-serif;font-size:.71rem;color:${CM.stardust};opacity:.75">${g.inst}</p>
      </div>
    </button>`;
}

function cmBuildGraphicDesign() {
  return `
    <div id="cm-graphic-design" style="
      background:linear-gradient(180deg,${CM.midnight} 0%,${CM.void} 100%);
      padding:clamp(4.5rem,9vh,7rem) 24px;position:relative;overflow:hidden">
      <!-- Nebula fog -->
      <div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
        width:800px;height:500px;border-radius:50%;
        background:radial-gradient(ellipse,rgba(111,168,255,0.04) 0%,transparent 70%);
        pointer-events:none"></div>
      <div style="position:absolute;inset:0;pointer-events:none;z-index:0;opacity:.4">
        ${cmBuildStarField(30)}
      </div>
      ${cmBuildAstronauts([
        { img: 3, right: '3%', top: '38%', size: 95, dur: 30, del: -9, rot: 5 },
      ])}
      <div class="max-w-5xl mx-auto" style="position:relative;z-index:1">
        <div class="cm-reveal" style="display:flex;align-items:flex-end;justify-content:space-between;
          flex-wrap:wrap;gap:1.5rem;margin-bottom:3rem">
          <div>
            <p style="font-family:'Outfit',sans-serif;font-size:.63rem;font-weight:600;
              letter-spacing:.2em;text-transform:uppercase;color:${CM.nebulaGold};margin-bottom:.9rem">Graphic Design</p>
            <h2 style="
              font-family:'Cormorant Garamond',Georgia,serif;
              font-size:clamp(2.2rem,5vw,3.5rem);font-weight:400;font-style:italic;
              color:${CM.moonlight};line-height:1.08
            " data-edit-key="cm_design_title">Visual identity work</h2>
          </div>
          <p style="font-family:'Outfit',sans-serif;font-size:.87rem;line-height:1.7;
            color:${CM.stardust};max-width:300px
          " data-edit-key="cm_design_subtitle">Branding, institutional materials, and communication design — click any to preview.</p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:20px;margin-bottom:2.5rem">
          ${CM_GRAPHIC_WORKS.map((g, i) => cmBuildGDCard(g, i)).join('')}
        </div>

        <!-- View All button -->
        <div class="cm-reveal" style="display:flex;justify-content:center">
          <button onclick="goToPage('designs')" style="
            font-family:'Outfit',sans-serif;font-size:.875rem;font-weight:600;
            background:${CM.nebulaGold};color:${CM.midnight};
            padding:14px 32px;border-radius:999px;
            border:none;cursor:pointer;
            display:inline-flex;align-items:center;gap:9px;
            letter-spacing:.03em;
            box-shadow:0 0 24px rgba(212,177,90,0.32),0 4px 18px rgba(212,177,90,0.2);
            transition:opacity .2s,transform .2s,box-shadow .2s
          " onmouseover="this.style.opacity='.88';this.style.transform='translateY(-2px)';this.style.boxShadow='0 0 36px rgba(212,177,90,0.5),0 6px 24px rgba(212,177,90,0.3)'"
             onmouseout="this.style.opacity='1';this.style.transform='translateY(0)';this.style.boxShadow='0 0 24px rgba(212,177,90,0.32),0 4px 18px rgba(212,177,90,0.2)'">
            View All Graphic Design Work
            <i data-lucide="arrow-right" style="width:15px;height:15px"></i>
          </button>
        </div>
      </div>
    </div>`;
}

// ── Section 6: Process ────────────────────────────────────────────────────────

function cmBuildProcess() {
  const steps = [
    { num: '01', icon: 'search',      label: 'Discover',       editKey: 'cm_process_1', desc: 'We start with your goals, audience, and brand values to define what success looks like.' },
    { num: '02', icon: 'pen-tool',    label: 'Design & Build', editKey: 'cm_process_2', desc: 'From wireframes to final delivery — every pixel and line of code is intentional.' },
    { num: '03', icon: 'trending-up', label: 'Launch & Grow',  editKey: 'cm_process_3', desc: 'We hand off a product that your team can own, maintain, and scale.' },
  ];

  const stepHTML = steps.map((step, i) => `
    <div class="cm-process-card cm-reveal" style="
      flex:1;min-width:200px;display:flex;flex-direction:column;align-items:center;text-align:center;
      background:rgba(24,59,107,0.28);backdrop-filter:blur(12px);
      border:1px solid rgba(111,168,255,0.15);border-radius:22px;
      padding:2.25rem 1.5rem 2rem;
      box-shadow:0 4px 28px rgba(3,7,18,0.35)
    ">
      <div style="position:relative;margin-bottom:1.5rem">
        <div style="width:60px;height:60px;border-radius:20px;
          background:rgba(111,168,255,0.08);border:1px solid rgba(111,168,255,0.2);
          display:flex;align-items:center;justify-content:center;
          box-shadow:0 0 24px rgba(111,168,255,0.12)">
          <i data-lucide="${step.icon}" style="width:22px;height:22px;color:${CM.aurora}"></i>
        </div>
        <span style="position:absolute;top:-10px;right:-10px;
          font-family:'Outfit',sans-serif;font-size:.52rem;font-weight:700;
          letter-spacing:.1em;color:${CM.nebulaGold};opacity:.8">${step.num}</span>
      </div>
      <h3 style="font-family:'Cormorant Garamond',Georgia,serif;
        font-size:1.32rem;font-weight:500;font-style:italic;
        color:${CM.moonlight};margin-bottom:.75rem;line-height:1.2
      " data-edit-key="${step.editKey}_label">${step.label}</h3>
      <p style="font-family:'Outfit',sans-serif;font-size:.83rem;line-height:1.74;
        color:${CM.stardust};max-width:210px
      " data-edit-key="${step.editKey}_desc">${step.desc}</p>
    </div>
    ${i < steps.length - 1 ? `
      <div class="cm-step-connector" style="display:none;flex-shrink:0;padding-top:30px;
        align-self:flex-start;opacity:.25">
        <svg width="32" height="2" viewBox="0 0 32 2">
          <line x1="0" y1="1" x2="32" y2="1" stroke="${CM.aurora}" stroke-width="1" stroke-dasharray="4 3"/>
        </svg>
      </div>` : ''}`).join('');

  return `
    <div style="
      background:linear-gradient(180deg,${CM.void} 0%,${CM.midnight} 100%);
      padding:clamp(4.5rem,9vh,7rem) 24px;position:relative;overflow:hidden">
      <!-- Constellation lines -->
      <div style="position:absolute;inset:0;pointer-events:none;z-index:0">
        ${cmConstellationSVG(1200, 600, 11)}
      </div>
      <div style="position:absolute;inset:0;pointer-events:none;z-index:0;opacity:.4">
        ${cmBuildStarField(28)}
      </div>
      ${cmBuildAstronauts([
        { img: 4, left: '3%', bottom: '18%', size: 85, dur: 27, del: -6, rot: -15 },
      ])}
      <div class="max-w-5xl mx-auto" style="position:relative;z-index:1">
        <div class="cm-reveal" style="text-align:center;margin-bottom:3.5rem">
          <p style="font-family:'Outfit',sans-serif;font-size:.63rem;font-weight:600;
            letter-spacing:.2em;text-transform:uppercase;color:${CM.nebulaGold};margin-bottom:.9rem">Process</p>
          <h2 style="
            font-family:'Cormorant Garamond',Georgia,serif;
            font-size:clamp(2.2rem,5vw,3.5rem);font-weight:400;font-style:italic;
            color:${CM.moonlight};line-height:1.08
          " data-edit-key="cm_process_title">How We Work</h2>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:clamp(1.25rem,2.5vw,2rem);
          align-items:flex-start;justify-content:center">
          ${stepHTML}
        </div>
      </div>
    </div>`;
}

// ── Section 7: Contact CTA ────────────────────────────────────────────────────

function cmBuildContact() {
  return `
    <div style="
      background:linear-gradient(160deg,${CM.void} 0%,${CM.midnight} 60%,#0a1530 100%);
      padding:clamp(5.5rem,12vh,10rem) 24px;position:relative;overflow:hidden">
      <!-- Large glowing crescent behind content -->
      <div style="position:absolute;right:-5%;top:50%;transform:translateY(-50%);
        pointer-events:none;z-index:0;filter:blur(2px) drop-shadow(0 0 60px rgba(212,177,90,0.3));opacity:.12">
        <svg width="500" height="500" viewBox="0 0 500 500" fill="none">
          <path d="M340 250C340 318.5 284.5 375 216 375C147.5 375 92 318.5 92 250C92 181.5 147.5 125 216 125C202.5 142.5 196 163 196 186C196 249.5 238.5 302 296.5 318.8C322 299.5 340 276.2 340 250Z" fill="${CM.nebulaGold}"/>
        </svg>
      </div>
      <!-- Floating stars -->
      <div style="position:absolute;inset:0;pointer-events:none;z-index:0">
        ${cmBuildStarField(50)}
      </div>
      ${cmBuildAstronauts([
        { img: 5, left: '5%',  top: '18%',    size: 100, dur: 25, del: -13, rot: 10 },
        { img: 3, right: '4%', bottom: '22%', size: 90,  dur: 35, del: -2,  rot: -7 },
      ])}
      <!-- Aurora glow -->
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
        width:600px;height:300px;border-radius:50%;
        background:radial-gradient(ellipse,rgba(111,168,255,0.06) 0%,transparent 70%);
        pointer-events:none;z-index:0"></div>

      <div class="max-w-3xl mx-auto text-center cm-reveal" style="position:relative;z-index:1">
        <p style="font-family:'Outfit',sans-serif;font-size:.63rem;font-weight:600;
          letter-spacing:.22em;text-transform:uppercase;color:${CM.nebulaGold};opacity:.8;margin-bottom:1.5rem">Let's Work Together</p>
        <h2 style="
          font-family:'Cormorant Garamond',Georgia,serif;
          font-size:clamp(2.6rem,7.5vw,5.5rem);font-weight:400;font-style:italic;
          color:${CM.moonlight};line-height:.96;margin-bottom:1.5rem;letter-spacing:-.01em;
          text-shadow:0 0 60px rgba(111,168,255,0.18)
        " data-edit-key="cm_contact_headline">Let's build something meaningful.</h2>
        <p style="font-family:'Outfit',sans-serif;font-size:.94rem;line-height:1.8;
          color:${CM.stardust};max-width:460px;margin:0 auto 3rem
        " data-edit-key="cm_contact_body">Whether you need a website, a brand identity, or both — CroissantsMoon is open for new projects.</p>

        <button onclick="goToPage('contact')" class="cm-glow-btn" style="
          font-family:'Outfit',sans-serif;font-size:.875rem;font-weight:600;
          background:${CM.nebulaGold};color:${CM.midnight};padding:16px 38px;border-radius:999px;
          border:none;cursor:pointer;display:inline-flex;align-items:center;gap:9px;
          letter-spacing:.03em
        ">
          Start a Conversation
          <i data-lucide="arrow-right" style="width:15px;height:15px"></i>
        </button>

        <div style="margin-top:3rem;padding-top:2.5rem;border-top:1px solid rgba(111,168,255,0.08)">
          <a href="https://github.com/zefanyakharisma-cell" target="_blank" rel="noopener noreferrer" style="
            font-family:'Outfit',sans-serif;font-size:.77rem;font-weight:400;
            color:rgba(143,168,214,0.35);text-decoration:none;
            display:inline-flex;align-items:center;gap:6px;transition:color .22s
          " onmouseover="this.style.color='rgba(143,168,214,0.65)'" onmouseout="this.style.color='rgba(143,168,214,0.35)'">
            <i data-lucide="github" style="width:13px;height:13px"></i>
            See all open-source work on GitHub →
          </a>
        </div>
      </div>
    </div>`;
}

// ── Graphic Design Lightbox (Observatory) ─────────────────────────────────────

function cmOpenGDPreview(idx) {
  const g = CM_GRAPHIC_WORKS[idx];
  if (!g) return;
  const prev = document.getElementById('cm-gd-lightbox');
  if (prev) prev.remove();
  window.__cmGDP = { idx, imgIdx: 1 };

  const thumbs = Array.from({ length: g.imgs }, (_, i) => `
    <button onclick="cmGDJumpTo(${i + 1})" id="cm-gd-thumb-${i + 1}" style="
      width:60px;height:42px;border-radius:8px;overflow:hidden;padding:0;flex-shrink:0;cursor:pointer;
      border:2px solid ${i === 0 ? CM.nebulaGold : 'rgba(217,230,255,0.15)'};
      transition:border-color .2s,box-shadow .2s;
      ${i === 0 ? 'box-shadow:0 0 10px rgba(212,177,90,0.35)' : ''}">
      <img src="./assets/images/graphic-designs/${g.folder}/${i + 1}.png"
        style="width:100%;height:100%;object-fit:cover" loading="lazy">
    </button>`).join('');

  const lb = document.createElement('div');
  lb.id = 'cm-gd-lightbox';
  lb.className = 'cm-lightbox-enter';
  lb.style.cssText = `position:fixed;inset:0;z-index:9999;
    background:rgba(3,7,18,0.92);
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    padding:20px;backdrop-filter:blur(20px) saturate(1.3)`;
  lb.addEventListener('click', e => { if (e.target === lb) cmCloseGDPreview(); });

  lb.innerHTML = `
    <!-- Stars in lightbox -->
    <div style="position:absolute;inset:0;pointer-events:none;z-index:0;opacity:.6">
      ${cmBuildStarField(35)}
    </div>
    <button onclick="cmCloseGDPreview()" style="
      position:absolute;top:18px;right:18px;z-index:10;
      background:rgba(217,230,255,0.07);border:1px solid rgba(217,230,255,0.15);
      color:${CM.moonlight};width:42px;height:42px;border-radius:50%;
      display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:1rem;
      transition:background .18s,box-shadow .18s
    " onmouseover="this.style.background='rgba(217,230,255,0.14)';this.style.boxShadow='0 0 12px rgba(111,168,255,0.2)'"
       onmouseout="this.style.background='rgba(217,230,255,0.07)';this.style.boxShadow='none'">✕</button>
    <div id="cm-gd-counter" style="position:absolute;top:22px;left:50%;transform:translateX(-50%);
      font-family:'Outfit',sans-serif;font-size:.7rem;font-weight:500;
      color:rgba(217,230,255,0.38);letter-spacing:.08em;z-index:10">1 / ${g.imgs}</div>
    <img id="cm-gd-img" src="./assets/images/graphic-designs/${g.folder}/1.png" alt="${g.title}"
      style="max-width:min(860px,90vw);max-height:67vh;object-fit:contain;border-radius:12px;
        box-shadow:0 32px 100px rgba(0,0,0,0.65),0 0 0 1px rgba(111,168,255,0.1);
        display:block;transition:opacity .18s ease;position:relative;z-index:1"/>
    <!-- Nav arrows -->
    <button onclick="cmNavGDPreview(-1)" style="position:absolute;left:max(14px,2.5vw);top:50%;
      transform:translateY(-50%);z-index:10;
      background:rgba(217,230,255,0.06);
      border:1px solid rgba(217,230,255,0.15);color:${CM.moonlight};width:50px;height:50px;
      border-radius:50%;display:flex;align-items:center;justify-content:center;
      cursor:pointer;font-size:1.5rem;transition:background .18s,box-shadow .18s
    " onmouseover="this.style.background='rgba(111,168,255,0.14)';this.style.boxShadow='0 0 18px rgba(111,168,255,0.2)'"
       onmouseout="this.style.background='rgba(217,230,255,0.06)';this.style.boxShadow='none'">‹</button>
    <button onclick="cmNavGDPreview(1)" style="position:absolute;right:max(14px,2.5vw);top:50%;
      transform:translateY(-50%);z-index:10;
      background:rgba(217,230,255,0.06);
      border:1px solid rgba(217,230,255,0.15);color:${CM.moonlight};width:50px;height:50px;
      border-radius:50%;display:flex;align-items:center;justify-content:center;
      cursor:pointer;font-size:1.5rem;transition:background .18s,box-shadow .18s
    " onmouseover="this.style.background='rgba(111,168,255,0.14)';this.style.boxShadow='0 0 18px rgba(111,168,255,0.2)'"
       onmouseout="this.style.background='rgba(217,230,255,0.06)';this.style.boxShadow='none'">›</button>
    <!-- Thumbnails -->
    <div style="display:flex;gap:9px;margin-top:18px;position:relative;z-index:1">${thumbs}</div>
    <!-- Metadata glass container -->
    <div style="margin-top:14px;padding:14px 22px;
      background:rgba(11,30,58,0.55);backdrop-filter:blur(14px);
      border:1px solid rgba(111,168,255,0.14);border-radius:14px;
      display:flex;align-items:center;gap:18px;flex-wrap:wrap;
      max-width:min(860px,90vw);width:100%;position:relative;z-index:1;
      box-shadow:0 4px 28px rgba(3,7,18,0.4)">
      <div style="flex:1;min-width:180px">
        <div style="font-family:'Outfit',sans-serif;font-size:.58rem;font-weight:600;
          letter-spacing:.14em;text-transform:uppercase;color:rgba(217,230,255,0.38);margin-bottom:4px">${g.cat} · ${g.year}</div>
        <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:.96rem;
          font-weight:500;color:${CM.moonlight}">${g.title}</div>
        <div style="font-family:'Outfit',sans-serif;font-size:.71rem;
          color:rgba(217,230,255,0.38);margin-top:2px">${g.inst}</div>
      </div>
      <a href="${g.link}" target="_blank" rel="noopener noreferrer" style="
        background:${CM.nebulaGold};color:${CM.midnight};padding:10px 22px;border-radius:999px;
        font-family:'Outfit',sans-serif;font-size:.76rem;font-weight:700;
        display:inline-flex;align-items:center;gap:7px;text-decoration:none;
        white-space:nowrap;flex-shrink:0;
        box-shadow:0 0 18px rgba(212,177,90,0.3);
        transition:opacity .2s,box-shadow .2s
      " onmouseover="this.style.opacity='.85';this.style.boxShadow='0 0 28px rgba(212,177,90,0.5)'"
         onmouseout="this.style.opacity='1';this.style.boxShadow='0 0 18px rgba(212,177,90,0.3)'">View on Canva ↗</a>
    </div>
    <p style="margin-top:10px;font-family:'Outfit',sans-serif;font-size:.6rem;
      color:rgba(217,230,255,0.18);position:relative;z-index:1">← → arrow keys · Esc to close</p>`;

  document.body.appendChild(lb);
  const onKey = e => {
    if (e.key === 'Escape')     cmCloseGDPreview();
    if (e.key === 'ArrowLeft')  cmNavGDPreview(-1);
    if (e.key === 'ArrowRight') cmNavGDPreview(1);
  };
  document.addEventListener('keydown', onKey);
  lb._cmKey = onKey;
}
window.cmOpenGDPreview = cmOpenGDPreview;

function cmCloseGDPreview() {
  const lb = document.getElementById('cm-gd-lightbox');
  if (!lb) return;
  if (lb._cmKey) document.removeEventListener('keydown', lb._cmKey);
  lb.remove();
  window.__cmGDP = null;
}
window.cmCloseGDPreview = cmCloseGDPreview;

function cmNavGDPreview(dir) {
  if (!window.__cmGDP) return;
  const g = CM_GRAPHIC_WORKS[window.__cmGDP.idx];
  if (!g) return;
  let next = window.__cmGDP.imgIdx + dir;
  if (next < 1) next = g.imgs;
  if (next > g.imgs) next = 1;
  cmGDJumpTo(next);
}
window.cmNavGDPreview = cmNavGDPreview;

function cmGDJumpTo(i) {
  if (!window.__cmGDP) return;
  const g = CM_GRAPHIC_WORKS[window.__cmGDP.idx];
  if (!g) return;
  window.__cmGDP.imgIdx = i;
  const img = document.getElementById('cm-gd-img');
  if (img) {
    img.style.opacity = '0';
    setTimeout(() => { img.src = `./assets/images/graphic-designs/${g.folder}/${i}.png`; img.style.opacity = '1'; }, 180);
  }
  const counter = document.getElementById('cm-gd-counter');
  if (counter) counter.textContent = `${i} / ${g.imgs}`;
  for (let t = 1; t <= g.imgs; t++) {
    const thumb = document.getElementById(`cm-gd-thumb-${t}`);
    if (thumb) {
      thumb.style.borderColor = t === i ? CM.nebulaGold : 'rgba(217,230,255,0.15)';
      thumb.style.boxShadow   = t === i ? '0 0 10px rgba(212,177,90,0.35)' : 'none';
    }
  }
}
window.cmGDJumpTo = cmGDJumpTo;

// ── Scroll Reveal ─────────────────────────────────────────────────────────────

function cmInitScrollReveal() {
  const page = document.getElementById('page-croissantsmoon');
  if (!page) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('cm-visible'), i * 60);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -28px 0px' });
  page.querySelectorAll('.cm-reveal').forEach(el => obs.observe(el));
}

// ── Smooth scroll links ───────────────────────────────────────────────────────

function cmInitScrollLinks() {
  const page = document.getElementById('page-croissantsmoon');
  if (!page) return;
  page.addEventListener('click', function(e) {
    const a = e.target.closest('[data-cm-scroll]');
    if (!a) return;
    e.preventDefault();
    const target = document.getElementById(a.getAttribute('data-cm-scroll'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
}

// ── Page init ─────────────────────────────────────────────────────────────────

function cmInitPage() {
  cmInjectFonts();
  cmInjectPageCSS();

  const el = document.getElementById('page-croissantsmoon');
  if (!el) return;

  el.style.background = CM.midnight;
  el.innerHTML = [
    cmBuildHero(),
    cmBuildServices(),
    cmBuildConceptPlatforms(),
    cmBuildWebProjects(),
    cmBuildGraphicDesign(),
    cmBuildProcess(),
    cmBuildContact(),
  ].join('');

  if (window.lucide) lucide.createIcons();

  setTimeout(() => {
    const logotype = document.getElementById('cm-logotype');
    if (logotype) {
      requestAnimationFrame(() => requestAnimationFrame(() => {
        logotype.style.opacity = '1';
        logotype.style.transform = 'translateY(0)';
      }));
    }
    cmInitScrollLinks();
    cmInitScrollReveal();
    cmFetchRepos();
  }, 80);
}

document.addEventListener('DOMContentLoaded', cmInitPage);
