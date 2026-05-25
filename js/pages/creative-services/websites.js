// ── Web Development & Design — Celestial Midnight Luxury ──────────────────────

function wdInjectFonts() {
  if (document.querySelector('[data-cm-fonts]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Outfit:wght@300;400;500;600;700&display=swap';
  link.setAttribute('data-cm-fonts', '1');
  document.head.appendChild(link);
}

function wdInjectPageCSS() {
  if (document.querySelector('[data-wd-page-css]')) return;
  const style = document.createElement('style');
  style.setAttribute('data-wd-page-css', '1');
  style.textContent = `
    @keyframes cmGlowPulse {
      0%,100%{box-shadow:0 0 18px rgba(212,177,90,0.35),0 4px 28px rgba(212,177,90,0.22)}
      50%{box-shadow:0 0 36px rgba(212,177,90,0.6),0 4px 42px rgba(212,177,90,0.38)}
    }
    @keyframes wdTwinkle {
      0%,100%{opacity:1;transform:scale(1)}
      50%{opacity:.15;transform:scale(.5)}
    }
    .cm-reveal { opacity:0; transform:translateY(20px); transition:opacity .65s ease-out,transform .65s ease-out; }
    .cm-visible { opacity:1!important; transform:none!important; }
  `;
  document.head.appendChild(style);
}

const WD = {
  midnight:   '#071126',
  deepSpace:  '#0B1E3A',
  moonlight:  '#D9E6FF',
  stardust:   '#8FA8D6',
  nebulaGold: '#D4B15A',
  cosmicBlue: '#183B6B',
  aurora:     '#6FA8FF',
  void:       '#030712',
  border:     'rgba(111,168,255,0.14)',
};

const WD_PROJECTS = [
  {
    title: 'PCU Global',
    cat: 'Web Experience',
    year: '2026',
    desc: "Full-stack rebuild of PCU's International Office — clean architecture, live CMS, mobile-first design.",
    bg: WD.aurora, tc: '#0369A1',
    page: 'web-pcu-global-intl',
    emoji: '🌐',
    url: 'international-office-website.vercel.app',
    live: 'https://international-office-website.vercel.app/',
    tags: ['HTML · CSS · JS', 'Responsive Design', 'CMS'],
    pc: ['#0C4A6E', '#0369A1', '#0EA5E9', '#7BC8F6', '#F0F9FF'],
  },
  {
    title: 'This Portfolio',
    cat: 'Editorial Design',
    year: '2025',
    desc: 'Premium editorial aesthetic — typography-led, intentional. International education storytelling through design.',
    bg: WD.nebulaGold, tc: '#854D0E',
    page: 'web-portfolio',
    emoji: '✦',
    url: 'zefanyakharisma.com',
    live: 'https://zefanyakharisma.com',
    tags: ['UI/UX Design', 'Tailwind CSS', 'Supabase'],
    pc: ['#1C1C1E', '#8B7355', '#F5D05E', '#FAFAF8', '#F2ECE4'],
  },
  {
    title: 'Dashboard Partnership',
    cat: 'Data Dashboard',
    year: '2025',
    desc: 'Interactive dashboard for visualising and managing 2,289 institutional partnerships with workflow management.',
    bg: WD.moonlight, tc: '#1E3A5F',
    page: 'web-dashboard-partnership',
    emoji: '◈',
    url: 'dashboard-partnership.vercel.app',
    live: 'https://dashboard-partnership.vercel.app/',
    tags: ['Chart.js', 'Tailwind CSS', 'Supabase Auth'],
    pc: ['#0F172A', '#1E3A5F', '#3B82F6', '#93C5FD', '#EFF6FF'],
  },
  {
    title: 'International Grants',
    cat: 'Data Dashboard',
    year: '2025',
    desc: 'Grant discovery and management platform with realtime updates, deadline calendar, and admin CRUD.',
    bg: WD.stardust, tc: '#4A1D5F',
    page: 'web-dashboard-grants',
    emoji: '✺',
    url: 'dashboard-international-grants.vercel.app',
    live: 'https://dashboard-international-grants.vercel.app/',
    tags: ['Realtime', 'Supabase', 'Chart.js'],
    pc: ['#1C1C1E', '#4A1D5F', '#8B5CF6', '#C4B5FD', '#F5F3FF'],
  },
];

const WD_MARQUEE_ITEMS = [
  '✦ HTML · CSS · JavaScript', '◈ Tailwind CSS', '◉ Responsive Design',
  '⬡ UI/UX Design', '◎ Typography', '✺ CMS Integration', '✦ Mobile-First',
  '◈ Editorial Design', '◉ Web Animation', '⬡ Accessibility',
];

const WD_PROCESS = [
  { icon: '✦', label: 'Discover',  color: WD.nebulaGold, desc: 'Understanding the goal, the audience, and what success looks like. Questions first. Answers second.' },
  { icon: '◈', label: 'Design',    color: WD.aurora,     desc: 'Wireframes, hierarchy, visual language. Establishing structure and feeling before touching code.' },
  { icon: '◉', label: 'Build',     color: WD.moonlight,  desc: 'Clean HTML, semantic structure, responsive layouts. Code that reads like good writing.' },
  { icon: '◎', label: 'Refine',    color: WD.stardust,   desc: 'Testing across devices, optimizing performance, sweating the details. The work that makes it feel right.' },
  { icon: '✺', label: 'Ship',      color: WD.nebulaGold, desc: 'Launching with intention. Optimized, accessible, and ready to meet the people it was made for.' },
];

const WD_SKILLS = [
  { text: 'HTML · CSS',            color: WD.aurora     },
  { text: 'JavaScript',            color: WD.nebulaGold },
  { text: 'Tailwind CSS',          color: WD.moonlight  },
  { text: 'Responsive Design',     color: WD.stardust   },
  { text: 'UI/UX Design',          color: WD.aurora     },
  { text: 'Typography',            color: WD.nebulaGold },
  { text: 'CMS Integration',       color: WD.moonlight  },
  { text: 'Web Animation',         color: WD.stardust   },
  { text: 'Mobile-First',          color: WD.aurora     },
  { text: 'Editorial Design',      color: WD.nebulaGold },
  { text: 'Accessibility',         color: WD.moonlight  },
  { text: 'Performance',           color: WD.stardust   },
  { text: 'Git & Version Control',  color: WD.aurora     },
  { text: 'Cross-Browser Testing',  color: WD.nebulaGold },
  { text: 'Design Systems',         color: WD.moonlight  },
  { text: 'Color Theory',           color: WD.stardust   },
];

// ── Section Builders ─────────────────────────────────────────────────────────

function wdBuildHero() {
  // Star field: 70 small absolute-positioned spans with twinkle animation
  const stars = Array.from({ length: 70 }, (_, i) => {
    const size    = 1 + Math.random() * 2.5;
    const x       = Math.random() * 100;
    const y       = Math.random() * 100;
    const delay   = (Math.random() * 4).toFixed(2);
    const dur     = (2.5 + Math.random() * 3).toFixed(2);
    return `<span style="
      position:absolute;
      left:${x.toFixed(2)}%;top:${y.toFixed(2)}%;
      width:${size.toFixed(1)}px;height:${size.toFixed(1)}px;
      background:#D9E6FF;border-radius:50%;
      animation:wdTwinkle ${dur}s ease-in-out ${delay}s infinite;
      pointer-events:none;z-index:0
    "></span>`;
  }).join('');

  // Constellation SVG overlay (5 line segments between points)
  const constellation = `
    <svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:.18" xmlns="http://www.w3.org/2000/svg">
      <line x1="12%" y1="18%" x2="28%" y2="32%" stroke="#6FA8FF" stroke-width="0.6"/>
      <line x1="28%" y1="32%" x2="44%" y2="22%" stroke="#6FA8FF" stroke-width="0.6"/>
      <line x1="44%" y1="22%" x2="62%" y2="38%" stroke="#8FA8D6" stroke-width="0.6"/>
      <line x1="62%" y1="38%" x2="78%" y2="20%" stroke="#8FA8D6" stroke-width="0.6"/>
      <line x1="78%" y1="20%" x2="88%" y2="44%" stroke="#6FA8FF" stroke-width="0.6"/>
      <circle cx="12%" cy="18%" r="2" fill="#6FA8FF" opacity=".7"/>
      <circle cx="28%" cy="32%" r="1.5" fill="#6FA8FF" opacity=".6"/>
      <circle cx="44%" cy="22%" r="2.5" fill="#D9E6FF" opacity=".6"/>
      <circle cx="62%" cy="38%" r="1.5" fill="#8FA8D6" opacity=".5"/>
      <circle cx="78%" cy="20%" r="2" fill="#6FA8FF" opacity=".65"/>
      <circle cx="88%" cy="44%" r="1.5" fill="#8FA8D6" opacity=".55"/>
    </svg>`;

  // Crescent moon SVG (upper-right, low opacity)
  const crescent = `
    <svg style="position:absolute;right:6%;top:8%;width:80px;height:80px;pointer-events:none;z-index:0;opacity:.13" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 10 A30 30 0 1 0 50 70 A20 20 0 1 1 50 10Z" fill="#D9E6FF"/>
    </svg>`;

  // Radial aurora glow blob
  const aurora = `
    <div style="
      position:absolute;left:55%;top:10%;
      width:480px;height:380px;
      background:radial-gradient(ellipse at center,rgba(111,168,255,0.09) 0%,rgba(143,168,214,0.04) 45%,transparent 70%);
      pointer-events:none;z-index:0;transform:translateX(-30%)
    "></div>`;

  const heroTags = [
    'HTML · CSS · JS',
    'UI/UX Design',
    'Responsive Design',
    'Editorial Websites',
    'CMS & Web Apps',
  ].map(tag => `
    <span style="
      background:rgba(111,168,255,0.08);color:#8FA8D6;
      padding:6px 16px;border-radius:999px;
      font-size:.72rem;font-weight:500;letter-spacing:.04em;
      font-family:'Outfit',sans-serif;
      border:1px solid rgba(111,168,255,0.18)
    ">${tag}</span>`).join('');

  return `
    <div id="wd-hero" style="
      position:relative;overflow:hidden;
      padding:clamp(5rem,12vh,9rem) 24px clamp(4rem,8vh,7rem);
      background:linear-gradient(160deg,#030712 0%,#071126 40%,#0B1E3A 100%);
      min-height:92vh;
      display:flex;align-items:center
    ">
      <div id="wd-cursor-glow" style="
        position:absolute;pointer-events:none;z-index:1;
        width:520px;height:520px;border-radius:50%;
        transform:translate(-50%,-50%);
        background:radial-gradient(circle,rgba(111,168,255,0.12) 0%,transparent 60%);
        transition:left .1s ease,top .1s ease
      "></div>
      <canvas id="wd-particles-canvas" style="position:absolute;inset:0;pointer-events:none;z-index:0"></canvas>
      ${stars}
      ${constellation}
      ${crescent}
      ${aurora}
      ${cmBuildAstronauts([
        { img: 3, right: '12%', top: '14%',    size: 130, dur: 26, del: 0,   rot: 12,  x1: 12, y1: -22, x2: -10, y2: 16 },
        { img: 4, left: '3%',   top: '30%',    size: 100, dur: 32, del: -10, rot: -14, x1: -12, y1: 14, x2: 10, y2: -10 },
        { img: 5, left: '10%',  bottom: '14%', size: 85,  dur: 38, del: -18, rot: 6,   x1: 10, y1: -14, x2: -8, y2: 12  },
        { img: 4, right: '4%',  bottom: '18%', size: 90,  dur: 24, del: -7,  rot: -8,  x1: -8, y1: 16,  x2: 10, y2: -12 },
      ])}
      <div class="max-w-5xl mx-auto relative z-10 w-full">
        <button onclick="goToPage('croissantsmoon')" style="
          display:inline-flex;align-items:center;gap:8px;margin-bottom:3rem;
          font-size:.875rem;color:rgba(143,168,214,0.5);
          background:none;border:none;cursor:pointer;padding:0;
          font-family:'Outfit',sans-serif;
          transition:color .18s
        " onmouseover="this.style.color='rgba(143,168,214,0.8)'" onmouseout="this.style.color='rgba(143,168,214,0.5)'">
          <i data-lucide="arrow-left" style="width:16px;height:16px"></i> Back
        </button>
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:1.5rem">
          <span style="display:inline-block;width:28px;height:2px;background:#D4B15A;border-radius:2px"></span>
          <span style="
            font-size:.68rem;font-weight:600;letter-spacing:.18em;text-transform:uppercase;
            font-family:'Outfit',sans-serif;
            background:rgba(212,177,90,0.12);color:#D4B15A;
            padding:4px 12px;border-radius:999px
          ">Creative Services</span>
        </div>
        <h1 style="
          font-family:'Cormorant Garamond',Georgia,serif;
          font-size:clamp(3rem,9vw,7rem);
          font-weight:500;line-height:.95;
          letter-spacing:-.02em;
          font-style:italic;
          color:#D9E6FF;
          margin-bottom:1.5rem
        " data-edit-key="websites_hero_title">Web Development<br>&amp; Design</h1>
        <p style="
          font-family:'Outfit',sans-serif;
          font-size:clamp(1.1rem,2.5vw,1.4rem);font-weight:300;
          color:rgba(143,168,214,0.75);max-width:540px;
          line-height:1.45;margin-bottom:1.25rem;min-height:2.4em
        "><span id="wd-typewriter"></span></p>
        <p style="
          max-width:490px;font-size:.95rem;line-height:1.7;
          color:rgba(143,168,214,0.6);margin-bottom:2.75rem;
          font-family:'Outfit',sans-serif
        " data-edit-key="websites_hero_body">
          Purposeful digital experiences built with craft, care, and a clear sense of what they're trying to say. From institutional portals to editorial portfolios.
        </p>
        <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;margin-bottom:2.5rem">
          <button onclick="document.getElementById('wd-projects').scrollIntoView({behavior:'smooth'})" style="
            background:#D4B15A;color:#071126;
            padding:14px 28px;border-radius:999px;
            font-size:.875rem;font-weight:600;
            font-family:'Outfit',sans-serif;
            border:none;cursor:pointer;
            display:inline-flex;align-items:center;gap:8px;
            animation:cmGlowPulse 2.6s ease-in-out infinite;
            transition:opacity .2s
          " onmouseover="this.style.opacity='.85'" onmouseout="this.style.opacity='1'">
            View Projects <i data-lucide="arrow-right" style="width:15px;height:15px"></i>
          </button>
          <button onclick="goToPage('contact')" style="
            border:1px solid rgba(212,177,90,0.32);color:#D4B15A;
            background:rgba(212,177,90,0.06);
            padding:14px 28px;border-radius:999px;
            font-size:.875rem;font-weight:500;
            font-family:'Outfit',sans-serif;
            cursor:pointer;transition:all .2s
          " onmouseover="this.style.background='rgba(212,177,90,0.12)'"
            onmouseout="this.style.background='rgba(212,177,90,0.06)'">
            Work Together
          </button>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:10px">${heroTags}</div>
      </div>
      <div class="cm-scroll-indicator">
        <span style="font-size:.65rem;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:rgba(143,168,214,0.35);font-family:'Outfit',sans-serif">Scroll</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="14" height="22" rx="7" stroke="rgba(111,168,255,0.25)" stroke-width="1.5"/>
          <rect x="7" y="5" width="2" height="5" rx="1" fill="rgba(111,168,255,0.3)"/>
        </svg>
      </div>
    </div>`;
}

function wdBuildMarquee() {
  const doubled = [...WD_MARQUEE_ITEMS, ...WD_MARQUEE_ITEMS];
  const colors  = [WD.nebulaGold, WD.moonlight, WD.aurora, WD.stardust];
  const items   = doubled.map((t, i) => `
    <span style="
      display:inline-block;padding:0 32px;
      font-family:'Outfit',sans-serif;
      font-size:1.05rem;font-weight:500;
      color:${colors[i % colors.length]};
      white-space:nowrap;letter-spacing:.01em
    ">${t}</span>
    <span style="color:rgba(111,168,255,0.2);font-size:1.1rem;padding:0 4px">·</span>
  `).join('');

  return `
    <div class="cm-reveal" style="
      background:rgba(3,7,18,0.8);
      border-top:1px solid rgba(111,168,255,0.08);
      border-bottom:1px solid rgba(111,168,255,0.08);
      padding:20px 0;overflow:hidden
    ">
      <div style="display:flex;overflow:hidden">
        <div class="cm-marquee-track">${items}</div>
      </div>
    </div>`;
}

// ── Project card helpers ──────────────────────────────────────────────────────

function wdCardPreview(w) {
  const [c1, c2, c3, c4, c5] = w.pc;

  // Abstract colour-block fallback (used while iframe loads or if embedding is blocked)
  const fallback = `
    <div id="wdFallback-${w.page}" style="
      position:absolute;inset:0;
      background:${c5};z-index:1;
      transition:opacity .4s ease
    ">
      <div style="height:26px;background:${c1};display:flex;align-items:center;padding:0 10px;gap:8px">
        <div style="height:4px;width:30px;background:${c4}30;border-radius:2px"></div>
        <div style="height:4px;width:42px;background:${c4}30;border-radius:2px"></div>
        <div style="height:4px;width:22px;background:${c4}30;border-radius:2px"></div>
        <div style="flex:1"></div>
        <div style="height:13px;width:36px;background:${c4}40;border-radius:3px"></div>
      </div>
      <div style="padding:10px 12px">
        <div style="height:9px;width:52%;background:${c2};border-radius:4px;margin-bottom:6px;opacity:.75"></div>
        <div style="height:5px;width:80%;background:${c3};border-radius:3px;margin-bottom:4px;opacity:.45"></div>
        <div style="height:5px;width:60%;background:${c3};border-radius:3px;margin-bottom:10px;opacity:.35"></div>
        <div style="display:flex;gap:6px">
          <div style="height:20px;width:60px;background:${c2};border-radius:10px;opacity:.85"></div>
          <div style="height:20px;width:50px;background:transparent;border:1.5px solid ${c2};border-radius:10px;opacity:.55"></div>
        </div>
      </div>
      <div style="position:absolute;bottom:6px;right:12px;font-size:1.8rem;opacity:.18">${w.emoji}</div>
    </div>`;

  // Scaled live-site iframe thumbnail:
  // Renders the page at 1620×800 virtual viewport then scales to 148px tall.
  // scale = 148/800 = 0.185  →  display width ≈ 1620×0.185 = 300px (fits the card)
  const thumb = w.live ? `
    <iframe
      src="${w.live}"
      scrolling="no"
      tabindex="-1"
      aria-hidden="true"
      title="${w.title} homepage preview"
      style="
        position:absolute;top:0;left:0;
        width:1620px;height:800px;
        transform:scale(0.185);
        transform-origin:top left;
        border:none;pointer-events:none;
        z-index:2;
      "
      loading="lazy"
      onload="(function(f){if(f)f.style.opacity='0'})(document.getElementById('wdFallback-${w.page}'))"
    ></iframe>` : '';

  return `
    <div style="height:148px;background:${c1};position:relative;overflow:hidden">
      ${fallback}
      ${thumb}
      <!-- gradient polish + prevents click-through into iframe -->
      <div style="
        position:absolute;inset:0;z-index:3;pointer-events:none;
        background:linear-gradient(to bottom,transparent 60%,rgba(7,17,38,0.35) 100%)
      "></div>
    </div>`;
}

function wdProjectCard(w) {
  const tags = w.tags.map(t =>
    `<span style="
      background:rgba(212,177,90,0.1);color:#8FA8D6;
      padding:2px 9px;border-radius:999px;
      font-size:.6rem;font-weight:500;
      font-family:'Outfit',sans-serif;
      border:1px solid rgba(212,177,90,0.18)
    ">${t}</span>`
  ).join('');
  return `
    <button onclick="goToPage('${w.page}')" class="cm-work-card text-left" style="
      background:rgba(11,30,58,0.65);
      border-radius:18px;overflow:hidden;
      border:1px solid rgba(111,168,255,0.14);
      backdrop-filter:blur(14px);
      cursor:pointer;
      position:relative;width:100%;display:block;
      transition:transform .25s ease,box-shadow .25s ease
    " onmouseover="this.style.transform='translateY(-6px)';this.style.boxShadow='0 20px 60px rgba(3,7,18,0.55),0 0 0 1px rgba(111,168,255,0.22)'"
       onmouseout="this.style.transform='';this.style.boxShadow=''">
      <div style="
        background:rgba(7,17,38,0.6);
        padding:7px 12px;
        border-bottom:1px solid rgba(111,168,255,0.08);
        display:flex;align-items:center;gap:7px
      ">
        <div style="display:flex;gap:4px;flex-shrink:0">
          <span style="width:9px;height:9px;border-radius:50%;background:#FF5F5788;display:block"></span>
          <span style="width:9px;height:9px;border-radius:50%;background:#FEBC2E88;display:block"></span>
          <span style="width:9px;height:9px;border-radius:50%;background:#28C84088;display:block"></span>
        </div>
        <span style="
          flex:1;
          background:rgba(3,7,18,0.5);
          border-radius:4px;padding:2px 9px;
          font-size:.58rem;color:#8FA8D6;
          border:1px solid rgba(111,168,255,0.1);
          white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
          font-family:'Outfit',sans-serif
        ">${w.url}</span>
      </div>
      ${wdCardPreview(w)}
      <div style="padding:15px 17px 18px">
        <div style="
          font-size:.6rem;font-weight:600;letter-spacing:.12em;
          text-transform:uppercase;color:#D4B15A;opacity:.75;
          margin-bottom:5px;font-family:'Outfit',sans-serif
        ">${w.cat} · ${w.year}</div>
        <h4 style="
          font-family:'Cormorant Garamond',Georgia,serif;
          font-weight:500;font-size:1.05rem;
          color:#D9E6FF;margin-bottom:6px;line-height:1.25;
          font-style:italic
        ">${w.title}</h4>
        <p style="
          font-size:.76rem;line-height:1.55;
          color:#8FA8D6;margin-bottom:11px;
          font-family:'Outfit',sans-serif
        ">${w.desc}</p>
        <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:12px">${tags}</div>
        <div style="
          display:inline-flex;align-items:center;gap:6px;
          font-size:.76rem;font-weight:600;color:#D4B15A;
          font-family:'Outfit',sans-serif
        ">
          View Project <i data-lucide="arrow-right" style="width:11px;height:11px"></i>
        </div>
      </div>
    </button>`;
}

function wdBuildProjects() {
  // Star field at low opacity for background
  const stars = Array.from({ length: 30 }, () => {
    const x   = Math.random() * 100;
    const y   = Math.random() * 100;
    const sz  = 1 + Math.random() * 1.5;
    const del = (Math.random() * 5).toFixed(2);
    const dur = (3 + Math.random() * 3).toFixed(2);
    return `<span style="
      position:absolute;left:${x.toFixed(1)}%;top:${y.toFixed(1)}%;
      width:${sz.toFixed(1)}px;height:${sz.toFixed(1)}px;
      background:#D9E6FF;border-radius:50%;opacity:.25;
      animation:wdTwinkle ${dur}s ease-in-out ${del}s infinite;
      pointer-events:none
    "></span>`;
  }).join('');

  const cards = WD_PROJECTS.map(w => wdProjectCard(w)).join('');
  return `
    <div id="wd-projects" class="cm-reveal" style="
      padding:clamp(4rem,8vh,6rem) 24px;
      background:linear-gradient(180deg,#071126 0%,#0B1E3A 100%);
      position:relative;overflow:hidden
    ">
      ${stars}
      ${cmBuildAstronauts([
        { img: 5, left: '2%',  top: '18%',    size: 115, dur: 28, del: -5,  rot: 10  },
        { img: 3, right: '2%', bottom: '12%', size: 95,  dur: 34, del: -16, rot: -8  },
        { img: 4, right: '3%', top: '12%',    size: 80,  dur: 22, del: -3,  rot: 20  },
      ])}
      <div class="max-w-5xl mx-auto" style="position:relative;z-index:1">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:1rem">
          <span style="display:inline-block;width:28px;height:2px;background:#D4B15A;border-radius:2px"></span>
          <span style="
            font-size:.68rem;font-weight:600;letter-spacing:.18em;text-transform:uppercase;
            color:#D4B15A;font-family:'Outfit',sans-serif
          ">Selected Projects</span>
        </div>
        <h2 style="
          font-family:'Cormorant Garamond',Georgia,serif;
          font-size:clamp(2rem,4vw,3rem);font-weight:500;
          color:#D9E6FF;margin-bottom:.5rem;
          font-style:italic
        ">The Work</h2>
        <p style="
          font-size:.93rem;color:#8FA8D6;margin-bottom:2.5rem;
          max-width:480px;line-height:1.65;
          font-family:'Outfit',sans-serif
        ">
          Four real projects — each built with a different challenge, the same level of care.
        </p>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(274px,1fr));gap:18px">
          ${cards}
        </div>
        <div style="
          margin-top:2rem;padding:20px 26px;
          background:rgba(111,168,255,0.06);
          border:1px solid rgba(111,168,255,0.14);
          border-radius:14px;
          display:flex;align-items:center;gap:16px;flex-wrap:wrap
        ">
          <div style="flex:1;min-width:220px">
            <p style="
              font-family:'Cormorant Garamond',Georgia,serif;
              font-size:.98rem;font-weight:500;
              font-style:italic;color:#D9E6FF;margin-bottom:3px
            ">More in CroissantsMoon</p>
            <p style="
              font-size:.76rem;color:#8FA8D6;line-height:1.55;
              font-family:'Outfit',sans-serif
            ">Graphic design, branding, and visual works live in the full creative universe.</p>
          </div>
          <button onclick="goToPage('croissantsmoon')" style="
            background:rgba(212,177,90,0.12);color:#D4B15A;
            border:1px solid rgba(212,177,90,0.28);
            padding:10px 22px;border-radius:999px;
            font-size:.78rem;font-weight:600;cursor:pointer;
            font-family:'Outfit',sans-serif;
            display:inline-flex;align-items:center;gap:7px;
            transition:background .2s;white-space:nowrap;flex-shrink:0
          " onmouseover="this.style.background='rgba(212,177,90,0.2)'" onmouseout="this.style.background='rgba(212,177,90,0.12)'">
            Explore CroissantsMoon <i data-lucide="arrow-right" style="width:12px;height:12px"></i>
          </button>
        </div>
      </div>
    </div>`;
}

function wdBuildProcess() {
  const steps = WD_PROCESS.map((s, i, arr) => {
    const isLast = i === arr.length - 1;
    const nextColor = !isLast ? arr[i + 1].color : s.color;
    return `
      <div style="display:flex;align-items:flex-start">
        <div style="display:flex;flex-direction:column;align-items:center;width:56px;flex-shrink:0">
          <div style="
            width:56px;height:56px;border-radius:50%;
            background:rgba(111,168,255,0.08);
            display:flex;align-items:center;justify-content:center;
            font-size:1.35rem;flex-shrink:0;
            color:#D4B15A;
            border:1px solid rgba(111,168,255,0.18);
            position:relative;z-index:2
          ">${s.icon}</div>
          ${!isLast ? `<div style="
            flex:1;width:1px;min-height:20px;
            background:linear-gradient(to bottom,rgba(111,168,255,0.2),rgba(111,168,255,0.05));
            border-radius:1px
          "></div>` : ''}
        </div>
        <div style="flex:1;margin-left:22px;${!isLast ? 'padding-bottom:28px' : ''}">
          <div class="cm-process-card" style="
            background:rgba(24,59,107,0.28);
            backdrop-filter:blur(12px);
            border:1px solid rgba(111,168,255,0.15);
            border-radius:16px;
            border-left:3px solid #6FA8FF;
            padding:22px 24px;
          ">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:9px">
              <span style="
                font-size:.58rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;
                background:rgba(111,168,255,0.08);color:#D4B15A;
                padding:2px 8px;border-radius:999px;
                font-family:'Outfit',sans-serif
              ">Step ${String(i + 1).padStart(2, '0')}</span>
              <span style="height:1px;flex:1;background:rgba(111,168,255,0.1)"></span>
              <span style="
                font-size:.68rem;font-weight:600;color:#D4B15A;
                background:rgba(212,177,90,0.12);padding:2px 10px;border-radius:999px;
                font-family:'Outfit',sans-serif
              ">${s.label}</span>
            </div>
            <p style="
              font-size:.84rem;line-height:1.68;color:#8FA8D6;
              font-family:'Outfit',sans-serif
            ">${s.desc}</p>
          </div>
        </div>
      </div>`;
  }).join('');

  return `
    <div class="cm-reveal" style="
      padding:clamp(4rem,8vh,6rem) 24px;
      background:linear-gradient(180deg,#030712 0%,#071126 100%)
    ">
      <div class="max-w-4xl mx-auto">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:1rem">
          <span style="display:inline-block;width:28px;height:2px;background:#6FA8FF;border-radius:2px"></span>
          <span style="
            font-size:.68rem;font-weight:600;letter-spacing:.18em;text-transform:uppercase;
            color:#6FA8FF;font-family:'Outfit',sans-serif
          ">How I Build</span>
        </div>
        <h2 style="
          font-family:'Cormorant Garamond',Georgia,serif;
          font-size:clamp(2rem,4vw,3rem);font-weight:500;
          color:#D9E6FF;margin-bottom:.6rem;
          font-style:italic
        ">From Concept to Code</h2>
        <p style="
          font-size:.93rem;color:#8FA8D6;margin-bottom:2.75rem;
          max-width:440px;line-height:1.65;
          font-family:'Outfit',sans-serif
        ">Not a checklist. A way of thinking — iterative, craft-led, and always grounded in purpose.</p>
        <div style="max-width:640px">
          ${steps}
        </div>
        <div style="display:flex;align-items:center;gap:10px;padding-left:68px;margin-top:8px">
          <span style="
            font-family:'Cormorant Garamond',Georgia,serif;
            font-style:italic;font-size:1rem;
            color:#D4B15A;opacity:.45
          ">↩ and every launch teaches something new</span>
        </div>
      </div>
    </div>`;
}

function wdBuildPhilosophy() {
  const pillars = [
    ['Clarity',  'Design that communicates before it impresses.',              '✦'],
    ['Craft',    'The spacing, the weight, the timing. Nothing is too small.', '◈'],
    ['Purpose',  'Every element earns its place. Nothing decorative for its own sake.', '◉'],
  ].map(([title, desc, icon]) => `
    <div style="
      background:rgba(24,59,107,0.32);
      border:1px solid rgba(111,168,255,0.15);
      border-radius:16px;padding:24px;
      backdrop-filter:blur(12px)
    ">
      <span style="
        font-size:1.4rem;display:block;margin-bottom:12px;
        color:#D4B15A;text-shadow:0 0 12px rgba(212,177,90,0.4)
      ">${icon}</span>
      <h4 style="
        font-family:'Cormorant Garamond',Georgia,serif;
        font-weight:500;font-size:1.1rem;color:#D9E6FF;
        margin-bottom:8px;font-style:italic
      ">${title}</h4>
      <p style="
        font-size:.83rem;line-height:1.6;color:#8FA8D6;
        font-family:'Outfit',sans-serif
      ">${desc}</p>
    </div>`).join('');

  return `
    <div class="cm-reveal" style="
      padding:clamp(4rem,10vh,7rem) 24px;
      background:linear-gradient(160deg,#071126 0%,#0B1E3A 100%);
      position:relative;overflow:hidden
    ">
      ${cmBuildAstronauts([
        { img: 4, left: '2%',  top: '25%',    size: 110, dur: 30, del: -8,  rot: -12 },
        { img: 5, right: '3%', bottom: '15%', size: 90,  dur: 25, del: -20, rot: 14  },
        { img: 3, right: '4%', top: '10%',    size: 75,  dur: 36, del: -4,  rot: 5   },
      ])}
      <div class="max-w-5xl mx-auto" style="position:relative;z-index:1">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:2.5rem">
          <span style="display:inline-block;width:28px;height:2px;background:#8FA8D6;border-radius:2px"></span>
          <span style="
            font-size:.68rem;font-weight:600;letter-spacing:.18em;text-transform:uppercase;
            color:#8FA8D6;font-family:'Outfit',sans-serif
          ">Design Philosophy</span>
        </div>
        <p style="
          font-family:'Cormorant Garamond',Georgia,serif;
          font-size:clamp(2.5rem,6vw,5.5rem);
          font-weight:400;line-height:1.05;
          font-style:italic;color:#D9E6FF;
          margin-bottom:2.5rem
        ">Websites that<br><em style="color:#D4B15A;font-style:italic">actually say something.</em></p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:2rem;align-items:start">
          <div>
            <p style="
              font-size:1.05rem;line-height:1.75;color:#8FA8D6;
              font-weight:300;font-family:'Outfit',sans-serif
            ">
              The web is full of noise. A good website isn't just functional — it has a point of view. It knows who it's talking to, what it wants to say, and exactly how much is enough.
            </p>
          </div>
          <div style="display:flex;flex-direction:column;gap:14px">
            <div style="
              background:rgba(212,177,90,0.12);color:#D4B15A;
              border:1px solid rgba(212,177,90,0.2);border-radius:8px;
              backdrop-filter:blur(8px);
              padding:12px 16px;
              font-family:'Cormorant Garamond',Georgia,serif;
              font-style:italic;font-size:.95rem;line-height:1.5;
              transform:rotate(-2deg)
            ">"Design is the space between content and reader." ✦</div>
            <div style="
              background:rgba(111,168,255,0.1);color:#6FA8FF;
              border:1px solid rgba(111,168,255,0.2);border-radius:8px;
              backdrop-filter:blur(8px);
              padding:12px 16px;margin-top:6px;align-self:flex-end;
              font-family:'Cormorant Garamond',Georgia,serif;
              font-style:italic;font-size:.95rem;line-height:1.5;
              transform:rotate(1.5deg)
            ">intentional &gt; impressive ◈</div>
            <div style="
              background:rgba(217,230,255,0.05);color:#D9E6FF;
              border:1px solid rgba(217,230,255,0.1);border-radius:8px;
              backdrop-filter:blur(8px);
              padding:12px 16px;
              font-family:'Cormorant Garamond',Georgia,serif;
              font-style:italic;font-size:.95rem;line-height:1.5;
              transform:rotate(-1deg)
            ">every pixel should earn its place ◉</div>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px;margin-top:2.5rem">
          ${pillars}
        </div>
      </div>
    </div>`;
}

function wdBuildTechStack() {
  const rotations = ['-2deg','1deg','-1.5deg','2.5deg','0deg','-0.8deg','1.2deg','-1deg','0.5deg','-1.2deg','1.8deg','-0.5deg'];
  const fontSizes = ['.77rem', '.9rem', '1.05rem'];
  const paddings  = ['5px 14px', '7px 18px', '9px 22px'];
  const tagColors = [WD.aurora, WD.nebulaGold, WD.moonlight, WD.stardust];

  const tags = WD_SKILLS.map((item, i) => {
    const sz    = i % 3;
    const rot   = rotations[i % rotations.length];
    const col   = tagColors[i % tagColors.length];
    // aurora and moonlight are lighter, rest use same stardust text
    return `
      <span style="
        display:inline-block;
        background:rgba(111,168,255,0.08);color:#8FA8D6;
        padding:${paddings[sz]};border-radius:999px;
        font-size:${fontSizes[sz]};font-weight:500;
        font-family:'Outfit',sans-serif;
        border:1.5px solid rgba(111,168,255,0.18);
        transform:rotate(${rot});
        transition:transform .22s cubic-bezier(0.34,1.56,0.64,1),box-shadow .22s;
        cursor:default;margin:6px
      " onmouseover="this.style.transform='scale(1.09) rotate(0deg)';this.style.boxShadow='0 8px 24px rgba(3,7,18,0.4)';this.style.color='${col}';this.style.borderColor='${col}44'"
         onmouseout="this.style.transform='rotate(${rot})';this.style.boxShadow='none';this.style.color='#8FA8D6';this.style.borderColor='rgba(111,168,255,0.18)'"
      >${item.text}</span>`;
  }).join('');

  return `
    <div class="cm-reveal" style="padding:clamp(4rem,8vh,6rem) 24px;background:#0B1E3A">
      <div class="max-w-5xl mx-auto">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:1rem">
          <span style="display:inline-block;width:28px;height:2px;background:#D4B15A;border-radius:2px"></span>
          <span style="
            font-size:.68rem;font-weight:600;letter-spacing:.18em;text-transform:uppercase;
            color:#D4B15A;font-family:'Outfit',sans-serif
          ">Tech Stack</span>
        </div>
        <h2 style="
          font-family:'Cormorant Garamond',Georgia,serif;
          font-size:clamp(2rem,4vw,3rem);font-weight:500;
          color:#D9E6FF;margin-bottom:.75rem;
          font-style:italic
        ">Tools of the Trade</h2>
        <p style="
          font-size:.95rem;color:#8FA8D6;margin-bottom:2.5rem;
          max-width:480px;line-height:1.72;
          font-family:'Outfit',sans-serif
        ">
          The technologies and disciplines that shape every project — chosen for clarity, not credentials.
        </p>
        <div style="
          display:flex;flex-wrap:wrap;align-items:center;padding:28px;
          background:rgba(7,17,38,0.6);border-radius:24px;
          border:1px solid rgba(111,168,255,0.12)
        ">
          ${tags}
        </div>
      </div>
    </div>`;
}

function wdBuildStats() {
  const stats = [
    { num: '4+',   label: 'Live Projects'       },
    { num: '100%', label: 'Mobile Responsive'   },
    { num: '9',    label: 'Graphic Design Works' },
    { num: '∞',    label: 'Details Cared About' },
  ];

  const statCards = stats.map(s => `
    <div style="
      text-align:center;padding:28px 20px;
      background:rgba(217,230,255,0.03);
      border:1px solid rgba(111,168,255,0.1);
      border-radius:18px;
      transition:background .2s,transform .2s,box-shadow .2s
    " onmouseover="this.style.background='rgba(111,168,255,0.06)';this.style.transform='translateY(-4px)';this.style.boxShadow='0 0 32px rgba(111,168,255,0.1)'"
       onmouseout="this.style.background='rgba(217,230,255,0.03)';this.style.transform='';this.style.boxShadow=''">
      <div style="
        font-family:'Cormorant Garamond',Georgia,serif;
        font-size:clamp(2rem,5vw,3.2rem);font-weight:400;
        font-style:italic;color:#D4B15A;
        line-height:1;margin-bottom:10px
      ">${s.num}</div>
      <div style="
        font-size:.72rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;
        color:rgba(143,168,214,0.5);font-family:'Outfit',sans-serif
      ">${s.label}</div>
    </div>`).join('');

  return `
    <div class="cm-reveal" style="
      padding:clamp(4rem,8vh,6rem) 24px;
      background:linear-gradient(180deg,#030712 0%,#071126 100%);
      position:relative;overflow:hidden
    ">
      <div class="max-w-5xl mx-auto relative" style="z-index:1">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:.5rem">
          <span style="display:inline-block;width:28px;height:2px;background:#6FA8FF;border-radius:2px"></span>
          <span style="
            font-size:.68rem;font-weight:600;letter-spacing:.18em;text-transform:uppercase;
            color:#6FA8FF;font-family:'Outfit',sans-serif
          ">By the Numbers</span>
        </div>
        <h2 style="
          font-family:'Cormorant Garamond',Georgia,serif;
          font-size:clamp(2rem,4vw,3rem);font-weight:500;
          color:#D9E6FF;margin-bottom:.6rem;
          font-style:italic
        ">Work That Ships</h2>
        <p style="
          font-size:.93rem;color:#8FA8D6;margin-bottom:2.5rem;
          max-width:440px;line-height:1.65;
          font-family:'Outfit',sans-serif
        ">Real projects, real audiences, real constraints. Numbers as a reflection of work done, not ambition claimed.</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px">
          ${statCards}
        </div>
        <div style="
          margin-top:28px;padding:22px 26px;
          background:rgba(217,230,255,0.03);
          border:1px solid rgba(111,168,255,0.12);
          border-left:3px solid #6FA8FF;
          border-radius:16px;
          display:flex;align-items:flex-start;gap:20px;flex-wrap:wrap
        ">
          <div style="flex:1;min-width:240px">
            <div style="display:flex;align-items:center;gap:7px;margin-bottom:10px">
              <span style="width:8px;height:8px;border-radius:50%;background:#4CAF87;display:inline-block;animation:cmPulseDot 2s infinite"></span>
              <span style="
                font-size:.64rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;
                color:#4CAF87;font-family:'Outfit',sans-serif
              ">Currently Active</span>
            </div>
            <h3 style="
              font-family:'Cormorant Garamond',Georgia,serif;
              font-size:1.1rem;font-weight:500;font-style:italic;
              color:#D9E6FF;margin-bottom:7px
            ">This Portfolio</h3>
            <p style="
              font-size:.82rem;line-height:1.65;color:#8FA8D6;
              max-width:440px;font-family:'Outfit',sans-serif
            ">An ongoing experiment in editorial web design — every interaction and section is being refined in public. You're inside the experiment right now.</p>
          </div>
          <button onclick="goToPage('pcu-global')" style="
            background:rgba(111,168,255,0.1);color:#6FA8FF;
            border:1px solid rgba(111,168,255,0.22);
            padding:10px 22px;border-radius:999px;
            font-size:.78rem;font-weight:600;cursor:pointer;
            font-family:'Outfit',sans-serif;
            display:inline-flex;align-items:center;gap:7px;
            transition:background .2s;white-space:nowrap;flex-shrink:0;align-self:center
          " onmouseover="this.style.background='rgba(111,168,255,0.18)'" onmouseout="this.style.background='rgba(111,168,255,0.1)'">
            See featured project <i data-lucide="arrow-right" style="width:12px;height:12px"></i>
          </button>
        </div>
      </div>
    </div>`;
}

function wdBuildCTA() {
  // Floating stars for CTA background
  const stars = Array.from({ length: 40 }, () => {
    const x   = Math.random() * 100;
    const y   = Math.random() * 100;
    const sz  = 1 + Math.random() * 2;
    const del = (Math.random() * 4).toFixed(2);
    const dur = (2.5 + Math.random() * 3).toFixed(2);
    return `<span style="
      position:absolute;left:${x.toFixed(1)}%;top:${y.toFixed(1)}%;
      width:${sz.toFixed(1)}px;height:${sz.toFixed(1)}px;
      background:#D9E6FF;border-radius:50%;opacity:.18;
      animation:wdTwinkle ${dur}s ease-in-out ${del}s infinite;
      pointer-events:none
    "></span>`;
  }).join('');

  // Large decorative crescent moon at very low opacity
  const bigCrescent = `
    <svg style="
      position:absolute;right:-60px;top:-40px;
      width:340px;height:340px;
      pointer-events:none;z-index:0;opacity:.045
    " viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M120 20 A80 80 0 1 0 120 180 A55 55 0 1 1 120 20Z" fill="#D9E6FF"/>
    </svg>`;

  return `
    <div class="cm-reveal" style="
      padding:clamp(5rem,10vh,7rem) 24px;
      background:linear-gradient(160deg,#030712 0%,#071126 60%,#0a1530 100%);
      position:relative;overflow:hidden
    ">
      ${stars}
      ${bigCrescent}
      ${cmBuildAstronauts([
        { img: 5, left: '3%',  top: '20%',    size: 120, dur: 27, del: -11, rot: 8   },
        { img: 3, right: '4%', top: '15%',    size: 100, dur: 33, del: -2,  rot: -10 },
        { img: 4, left: '5%',  bottom: '18%', size: 80,  dur: 40, del: -22, rot: 18  },
        { img: 5, right: '5%', bottom: '20%', size: 88,  dur: 24, del: -14, rot: -5  },
      ])}
      <div class="max-w-4xl mx-auto text-center relative" style="z-index:1">
        <h2 style="
          font-family:'Cormorant Garamond',Georgia,serif;
          font-size:clamp(2rem,5vw,3.8rem);
          font-weight:400;color:#D9E6FF;
          line-height:1.1;font-style:italic;
          margin-bottom:1.5rem
        ">Have a website in mind?<br><span style="color:#D4B15A">Let's build it right.</span></h2>
        <p style="
          font-size:1rem;line-height:1.7;color:#8FA8D6;
          max-width:480px;margin:0 auto 2.5rem;
          font-family:'Outfit',sans-serif
        ">
          Whether it's a portfolio, an institutional portal, or something new — every good site starts with a clear idea and the patience to do it properly.
        </p>
        <div style="display:flex;flex-wrap:wrap;gap:16px;justify-content:center;align-items:center">
          <button onclick="goToPage('contact')" style="
            background:#D4B15A;color:#071126;
            padding:16px 36px;border-radius:999px;
            font-family:'Outfit',sans-serif;
            font-size:.92rem;font-weight:700;
            border:none;cursor:pointer;
            display:inline-flex;align-items:center;gap:10px;
            animation:cmGlowPulse 2.6s ease-in-out infinite;
            transition:opacity .2s
          " onmouseover="this.style.opacity='.85'" onmouseout="this.style.opacity='1'">
            Start a Conversation <i data-lucide="arrow-right" style="width:16px;height:16px"></i>
          </button>
          <button onclick="goToPage('croissantsmoon')" style="
            background:rgba(212,177,90,0.1);
            border:1px solid rgba(212,177,90,0.28);
            color:#D4B15A;padding:16px 28px;border-radius:999px;
            font-size:.86rem;font-weight:600;
            font-family:'Outfit',sans-serif;
            cursor:pointer;
            display:inline-flex;align-items:center;gap:8px;
            transition:background .2s
          " onmouseover="this.style.background='rgba(212,177,90,0.18)'" onmouseout="this.style.background='rgba(212,177,90,0.1)'">
            Explore CroissantsMoon ✦
          </button>
        </div>
        <div style="display:flex;justify-content:center;margin-top:48px">
          <button onclick="goToPage('home')" style="
            display:inline-flex;align-items:center;gap:6px;
            background:none;border:none;cursor:pointer;
            font-size:.8rem;color:rgba(143,168,214,0.3);
            font-family:'Outfit',sans-serif;
            padding:8px 12px;border-radius:8px;transition:color .18s
          " onmouseover="this.style.color='rgba(143,168,214,0.6)'" onmouseout="this.style.color='rgba(143,168,214,0.3)'">
            <i data-lucide="arrow-left" style="width:14px;height:14px"></i> Back to main portfolio
          </button>
        </div>
      </div>
    </div>`;
}

// ── Page Init ─────────────────────────────────────────────────────────────────

function wdInitPage() {
  wdInjectFonts();
  wdInjectPageCSS();
  const el = document.getElementById('page-websites');
  if (!el) return;

  el.style.background = WD.void;
  el.innerHTML = [
    wdBuildHero(),
    wdBuildMarquee(),
    wdBuildProjects(),
    wdBuildProcess(),
    wdBuildPhilosophy(),
    wdBuildTechStack(),
    wdBuildStats(),
    wdBuildCTA(),
  ].join('');

  if (window.lucide) lucide.createIcons();

  setTimeout(() => {
    wdInitCursorGlow();
    wdInitScrollReveal();
    wdInitParticles();
    wdInitTypewriter();
  }, 80);
}

document.addEventListener('DOMContentLoaded', wdInitPage);

// ── Scroll Reveal ─────────────────────────────────────────────────────────────

function wdInitScrollReveal() {
  const page = document.getElementById('page-websites');
  if (!page) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('cm-visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  page.querySelectorAll('.cm-reveal').forEach(el => observer.observe(el));
}

// ── Cursor Glow ───────────────────────────────────────────────────────────────

function wdInitCursorGlow() {
  const glow = document.getElementById('wd-cursor-glow');
  const hero  = document.getElementById('wd-hero');
  if (!glow || !hero) return;
  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    glow.style.left = (e.clientX - rect.left) + 'px';
    glow.style.top  = (e.clientY - rect.top)  + 'px';
  });
}

// ── Particle Canvas ───────────────────────────────────────────────────────────

function wdInitParticles() {
  const canvas = document.getElementById('wd-particles-canvas');
  if (!canvas) return;

  const ctx    = canvas.getContext('2d');
  const colors = ['#D4B15A', '#6FA8FF', '#D9E6FF', '#8FA8D6'];
  const syms   = ['✦', '·', '★', '◦', '•'];

  let W, H, particles;

  const resize = () => {
    const hero = canvas.parentElement;
    W = canvas.width  = hero.offsetWidth;
    H = canvas.height = hero.offsetHeight;
  };

  const makeParticle = () => ({
    x:       Math.random() * (W || 800),
    y:       Math.random() * (H || 600),
    size:    9 + Math.random() * 13,
    color:   colors[Math.floor(Math.random() * colors.length)],
    sym:     syms[Math.floor(Math.random() * syms.length)],
    vx:      (Math.random() - 0.5) * 0.32,
    vy:      (Math.random() - 0.5) * 0.22,
    opacity: 0.07 + Math.random() * 0.16,
    rot:     Math.random() * Math.PI * 2,
    rotV:    (Math.random() - 0.5) * 0.007,
  });

  resize();
  window.addEventListener('resize', resize);
  particles = Array.from({ length: 42 }, makeParticle);

  const draw = () => {
    const page = document.getElementById('page-websites');
    if (!page || !page.classList.contains('active')) return;

    ctx.clearRect(0, 0, W, H);

    particles.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = p.opacity;
      ctx.font        = `${p.size}px serif`;
      ctx.fillStyle   = p.color;
      ctx.textAlign   = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(p.sym, 0, 0);
      ctx.restore();

      p.x   += p.vx;
      p.y   += p.vy;
      p.rot += p.rotV;

      if (p.x < -20)        p.x = W + 20;
      else if (p.x > W + 20) p.x = -20;
      if (p.y < -20)        p.y = H + 20;
      else if (p.y > H + 20) p.y = -20;
    });

    requestAnimationFrame(draw);
  };

  draw();
}

// ── Typewriter Effect ─────────────────────────────────────────────────────────

function wdInitTypewriter() {
  const el = document.getElementById('wd-typewriter');
  if (!el) return;

  const text = 'Responsive websites, editorial design,\nand digital experiences built with craft.';
  let i = 0;

  const tick = () => {
    if (i <= text.length) {
      const visible = text.slice(0, i).replace('\n', '<br>');
      el.innerHTML = visible + '<span class="cm-type-cursor"></span>';
      i++;
      setTimeout(tick, i < 2 ? 300 : (i < 20 ? 52 : 36));
    } else {
      el.innerHTML = text.replace('\n', '<br>');
    }
  };

  setTimeout(tick, 700);
}
