// ── Skill Discovery Data ────────────────────────────────────
const discoveryItems = [
  { id: 'partnerships', title: 'International Partnership Management', category: 'Experience', description: 'Managing 30+ institutional partners, reviewing 25+ MoU/MoA agreements monthly at Petra Christian University.', skills: ['International Partnership', 'Leadership', 'Systems Thinking', 'Cross-Cultural Communication'], page: 'partnerships', accent: '#4A6B8A' },
  { id: 'mou', title: 'MoU / MoA Coordination', category: 'Experience', description: 'Formalizing academic partnerships through strategic agreements — ensuring compliance and institutional alignment.', skills: ['International Partnership', 'Leadership', 'Systems Thinking'], page: 'mou', accent: '#4A6B8A' },
  { id: 'amerta', title: 'AMERTA Exchange Program', category: 'Project', description: "Universitas Airlangga's flagship semester exchange — 120+ students, IDR 50–100M budget per cohort.", skills: ['Student Mobility', 'Project Management', 'International Partnership', 'Leadership', 'Student Support'], page: 'amerta', accent: '#6B4F32' },
  { id: 'aci', title: 'ACI — Airlangga Cultural Immersion', category: 'Project', description: 'Structured engagement program connecting international and local students through cultural experience.', skills: ['Student Mobility', 'Project Management', 'Student Support', 'Cross-Cultural Communication'], page: 'aci', accent: '#6B4F32' },
  { id: 'aero', title: 'AERO Exhibition', category: 'Project', description: 'Annual exhibition at Universitas Airlangga showcasing global partnerships and international programs.', skills: ['Project Management', 'International Partnership', 'Branding', 'Creative Direction'], page: 'aero', accent: '#6B4F32' },
  { id: 'pcu-global', title: 'PCU Global — International Office Website', category: 'Project', description: "Rebuilding PCU's International Office online presence with a full-stack web app, news CMS, partnership directory, and mobile-first design.", skills: ['Full-Stack Development', 'Front-End Development', 'UI/UX Design', 'International Partnership', 'Digital Strategy', 'Web Experience', 'Branding'], page: 'pcu-global', accent: '#003087' },
  { id: 'intl-grants', title: 'International Grants System', category: 'Experience', description: 'Building a digital and physical system to inform, maintain, and execute international grants at Petra Christian University — featuring a self-built dashboard with realtime tracking, deadline calendar, and applicant pipeline.', skills: ['International Partnership', 'Systems Thinking', 'Digital Strategy', 'Student Support', 'Internationalization'], page: 'intl-grants', accent: '#064E3B' },
  { id: 'onboarding', title: 'Student Onboarding & Orientation', category: 'Experience', description: 'End-to-end welfare support for 100+ international students per semester — housing, healthcare, immigration.', skills: ['Student Support', 'Student Mobility', 'Cross-Cultural Communication', 'Systems Thinking'], page: 'onboarding', accent: '#4A5235' },
  { id: 'engagement', title: 'Student Engagement Initiatives', category: 'Experience', description: 'Building meaningful connections and fostering personal growth for exchange students through curated programs.', skills: ['Student Support', 'Leadership', 'Cross-Cultural Communication'], page: 'engagement', accent: '#4A5235' },
  { id: 'websites', title: 'Web Development & Design', category: 'Creative', description: 'Responsive, user-centered websites for institutional communications and international engagement.', skills: ['Full-Stack Development', 'Front-End Development', 'UI/UX Design', 'Web Experience', 'Digital Strategy'], page: 'websites', accent: '#8B7355' },
  { id: 'designs', title: 'Graphic Design & Branding', category: 'Creative', description: 'Strategic visual design for institutional identity, event collateral, and international partnerships.', skills: ['Branding', 'Creative Direction', 'UI/UX Design', 'Digital Strategy'], page: 'designs', accent: '#8B7355' },
  { id: 'expertise', title: 'Areas of Expertise', category: 'About', description: 'Core competencies built through 3+ years in international higher education and creative digital work.', skills: ['International Partnership', 'Student Mobility', 'Project Management', 'Internationalization', 'Leadership'], page: 'expertise', accent: '#1E3A5F' },
  { id: 'croissantsmoon', title: 'CroissantsMoon — Creative Identity', category: 'Creative', description: 'A future-facing boutique studio identity in development — editorial design, web experiences, brand systems.', skills: ['Branding', 'Creative Direction', 'UI/UX Design', 'Digital Strategy', 'Web Experience', 'Full-Stack Development'], page: 'croissantsmoon', accent: '#D4B15A' },
  { id: 'writing', title: 'Writing & Reflections', category: 'Writing', description: 'Essays and insights on international education, leadership, systems thinking, and digital craft.', skills: ['Writing', 'Leadership', 'Internationalization', 'Digital Strategy', 'Systems Thinking'], page: 'writing', accent: '#5C5C5C' },
  { id: 'skillset', title: 'Full Skillset Overview', category: 'About', description: 'A complete map of technical, professional, and creative competencies.', skills: ['International Partnership', 'Student Mobility', 'Project Management', 'Leadership', 'UI/UX Design', 'Full-Stack Development', 'Branding', 'Systems Thinking', 'Writing'], page: 'skillset', accent: '#1C1C1E' },
];

const searchIndex = (function() {
  const manual = [
    { title: 'About Me', subtitle: 'Profile Overview', page: 'about-overview', accent: '#1E3A5F', keywords: 'about profile overview background zefanya specialist' },
    { title: 'Experience', subtitle: 'Career Timeline', page: 'experience', accent: '#1E3A5F', keywords: 'experience career work history timeline professional years' },
    { title: 'Expertise', subtitle: 'Core Competencies', page: 'expertise', accent: '#1E3A5F', keywords: 'expertise skills competencies areas specialization core' },
    { title: 'Education', subtitle: 'Academic Profile', page: 'education', accent: '#1E3A5F', keywords: 'education university degree airlangga international relations academic' },
    { title: 'Skillset', subtitle: 'Full Skills List', page: 'skillset', accent: '#1E3A5F', keywords: 'skills all competencies full list technical professional creative' },
    { title: 'Contact', subtitle: 'Get in Touch', page: 'contact', accent: '#1C1C1E', keywords: 'contact email message collaborate hire reach' },
    { title: 'Projects Overview', subtitle: 'All Projects', page: 'projects-overview', accent: '#6B4F32', keywords: 'projects portfolio all overview work amerta aci aero' },
    { title: 'Writing & Reflections', subtitle: 'Articles & Essays', page: 'writing', accent: '#5C5C5C', keywords: 'writing articles essays blog reflections thoughts journal insights' },
    { title: 'CroissantsMoon', subtitle: 'Creative Studio', page: 'croissantsmoon', accent: '#D4B15A', keywords: 'croissantsmoon creative studio design branding identity moon boutique celestial' },
    { title: 'Web Development', subtitle: 'Creative Services', page: 'websites', accent: '#8B7355', keywords: 'websites web development frontend responsive html css javascript' },
    { title: 'Graphic Design', subtitle: 'Creative Services', page: 'designs', accent: '#8B7355', keywords: 'graphic design branding visual identity print digital' },
    { title: 'Partnerships', subtitle: 'Global Engagement', page: 'partnerships', accent: '#4A6B8A', keywords: 'partnerships international global institutional promotion mou moa agreements' },
    { title: 'Student Onboarding', subtitle: 'Student Services', page: 'onboarding', accent: '#4A5235', keywords: 'onboarding students support welfare orientation arrival housing immigration' },
    { title: 'Student Engagement', subtitle: 'Student Services', page: 'engagement', accent: '#4A5235', keywords: 'engagement students activities cultural support community exchange' },
    { title: 'International Grants', subtitle: 'Intl. Education', page: 'intl-grants', accent: '#064E3B', keywords: 'grants international scholarships pcu petra christian university dashboard pipeline digital physical system development' },
  ];
  const seen = new Set(manual.map(m => m.page));
  const fromItems = discoveryItems
    .filter(item => !seen.has(item.page))
    .map(item => ({ title: item.title, subtitle: item.category, page: item.page, accent: item.accent, keywords: [...item.skills, item.description].join(' ').toLowerCase() }));
  return [...manual, ...fromItems];
})();

let selectedSkills = [];

function toggleSkill(btn) {
  const skill = btn.dataset.skill;
  if (selectedSkills.includes(skill)) {
    selectedSkills = selectedSkills.filter(s => s !== skill);
    btn.classList.remove('selected');
    btn.style.opacity = '1';
    removeChipFromSearchBar(skill);
  } else {
    selectedSkills.push(skill);
    btn.classList.add('selected');
    btn.style.opacity = '0.45';
    animateTagToSearchBar(btn);
  }
  updateClearBtn();
}

function clearSkills() {
  selectedSkills = [];
  document.querySelectorAll('#skill-tags-container .skill-tag').forEach(t => {
    t.classList.remove('selected');
    t.style.opacity = '1';
  });
  document.querySelectorAll('[data-chip-skill]').forEach(c => c.remove());
  const input = document.getElementById('ecosystem-search-input');
  if (input) input.value = '';
  hideSearchDropdown();
  const clearBtn = document.getElementById('clear-skills-btn');
  if (clearBtn) clearBtn.style.display = 'none';
}

function discoverRelatedWorks() {
  if (selectedSkills.length === 0) return;
  executeEcosystemSearch();
}

function renderDiscoveryResults(skills, textQuery) {
  textQuery = textQuery || '';
  const display = document.getElementById('selected-skills-display');
  const grid = document.getElementById('results-grid');
  const noResults = document.getElementById('no-results');
  if (!display || !grid) return;

  display.innerHTML = skills.map(s => '<span class="skill-tag selected">' + s + '</span>').join('');
  if (textQuery) {
    display.innerHTML += '<span class="skill-tag" style="background:rgba(28,28,30,0.08);color:#5C5C5C">“' + textQuery + '”</span>';
  }

  const q = textQuery.toLowerCase();
  const matches = discoveryItems.filter(function(item) {
    var skillMatch = skills.length === 0 || item.skills.some(function(s) { return skills.includes(s); });
    var textMatch = !q || item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q) || item.category.toLowerCase().includes(q) || item.skills.some(function(s) { return s.toLowerCase().includes(q); });
    return skillMatch && textMatch;
  }).sort(function(a, b) {
    var aScore = a.skills.filter(function(s) { return skills.includes(s); }).length;
    var bScore = b.skills.filter(function(s) { return skills.includes(s); }).length;
    return bScore - aScore;
  });

  if (matches.length === 0) {
    grid.innerHTML = '';
    if (noResults) noResults.classList.remove('hidden');
    return;
  }
  if (noResults) noResults.classList.add('hidden');

  // UX FIX: result cards converted to <a> links for proper routing and right-click support
  grid.innerHTML = matches.map(function(item) {
    var matchedSkills = item.skills.filter(function(s) { return skills.includes(s); });
    return '<a href="' + BASE_PATH + _pageIdToPath(item.page) + '" class="result-card p-7 text-left w-full" style="border-left:3px solid ' + item.accent + ';display:block;text-decoration:none">' +
      '<div style="font-size:.7rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:' + item.accent + ';margin-bottom:10px">' + item.category + '</div>' +
      '<h3 class="font-heading font-semibold text-base mb-3 leading-snug" style="color:#1C1C1E">' + item.title + '</h3>' +
      '<p class="text-xs leading-relaxed mb-4" style="color:#5C5C5C">' + item.description + '</p>' +
      '<div class="flex flex-wrap gap-1.5 mb-4">' + matchedSkills.map(function(s) { return '<span class="tag">' + s + '</span>'; }).join('') + '</div>' +
      '<div class="flex items-center gap-2 text-xs font-medium" style="color:' + item.accent + '">View <i data-lucide="arrow-right" style="width:12px;height:12px"></i></div>' +
      '</a>';
  }).join('');
  lucide.createIcons();
}

function animateTagToSearchBar(btn) {
  var tagRect = btn.getBoundingClientRect();
  var searchBox = document.getElementById('ecosystem-search-box');
  var catClass = btn.className.split(' ').find(function(c) { return c.startsWith('cat-'); }) || '';
  var skill = btn.dataset.skill;
  if (!searchBox) { addChipToSearchBar(skill, catClass); return; }
  var searchRect = searchBox.getBoundingClientRect();

  var clone = document.createElement('span');
  clone.textContent = btn.textContent;
  clone.className = btn.className;
  clone.style.cssText = [
    'position:fixed',
    'left:' + tagRect.left + 'px',
    'top:' + tagRect.top + 'px',
    'width:' + tagRect.width + 'px',
    'height:' + tagRect.height + 'px',
    'z-index:9999',
    'pointer-events:none',
    'margin:0',
    'box-sizing:border-box',
    'transition:left .3s cubic-bezier(0.4,0,0.2,1),top .3s cubic-bezier(0.4,0,0.2,1),opacity .3s,transform .3s'
  ].join(';');
  document.body.appendChild(clone);

  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      clone.style.left = (searchRect.left + 12) + 'px';
      clone.style.top = (searchRect.top + Math.max(0, (searchRect.height - tagRect.height) / 2)) + 'px';
      clone.style.opacity = '0';
      clone.style.transform = 'scale(0.7)';
    });
  });

  setTimeout(function() {
    clone.remove();
    addChipToSearchBar(skill, catClass);
  }, 300);
}

function addChipToSearchBar(skill, catClass) {
  var input = document.getElementById('ecosystem-search-input');
  if (!input) return;
  if (Array.from(document.querySelectorAll('[data-chip-skill]')).some(function(el) { return el.dataset.chipSkill === skill; })) return;

  var chip = document.createElement('span');
  chip.className = 'skill-tag ' + (catClass || '') + ' selected';
  chip.dataset.chipSkill = skill;
  chip.style.cssText = 'cursor:default;display:inline-flex;align-items:center;gap:3px;padding:4px 10px;font-size:.72rem;flex-shrink:0';

  chip.appendChild(document.createTextNode(skill));

  var removeBtn = document.createElement('button');
  removeBtn.textContent = '×';
  removeBtn.style.cssText = 'border:none;background:none;cursor:pointer;color:inherit;padding:0;margin-left:2px;line-height:1;font-size:1.05em;opacity:.65;display:inline-flex;align-items:center';
  removeBtn.title = 'Remove';
  removeBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    removeChipFromSearchBar(skill);
    var tagBtn = Array.from(document.querySelectorAll('#skill-tags-container [data-skill]')).find(function(el) { return el.dataset.skill === skill; });
    if (tagBtn) { tagBtn.classList.remove('selected'); tagBtn.style.opacity = '1'; }
    selectedSkills = selectedSkills.filter(function(s) { return s !== skill; });
    updateClearBtn();
  });

  chip.appendChild(removeBtn);
  input.parentElement.insertBefore(chip, input);
  updateClearBtn();
}

function removeChipFromSearchBar(skill) {
  var chips = Array.from(document.querySelectorAll('[data-chip-skill]'));
  var chip = chips.find(function(el) { return el.dataset.chipSkill === skill; });
  if (chip) chip.remove();
}

function updateClearBtn() {
  var clearBtn = document.getElementById('clear-skills-btn');
  if (!clearBtn) return;
  var input = document.getElementById('ecosystem-search-input');
  var hasChips = document.querySelector('[data-chip-skill]');
  var hasText = input && input.value.trim().length > 0;
  clearBtn.style.display = (hasChips || hasText) ? 'inline' : 'none';
}

function onEcosystemSearchInput(value) {
  var q = value.trim().toLowerCase();
  if (!q) { hideSearchDropdown(); updateClearBtn(); return; }
  updateClearBtn();
  var results = searchIndex.filter(function(item) {
    var haystack = (item.title + ' ' + item.subtitle + ' ' + (item.keywords || '')).toLowerCase();
    return haystack.includes(q);
  }).slice(0, 7);

  var dropdown = document.getElementById('search-dropdown');
  if (!results.length) { dropdown.style.display = 'none'; return; }

  dropdown.innerHTML = results.map(function(r) {
    return '<a href="' + BASE_PATH + _pageIdToPath(r.page) + '" class="search-dropdown-item">' +
      '<span class="search-dropdown-dot" style="background:' + r.accent + '"></span>' +
      '<div style="flex:1">' +
      '<div class="search-dropdown-title">' + r.title + '</div>' +
      '<div class="search-dropdown-sub">' + r.subtitle + '</div>' +
      '</div>' +
      '<i data-lucide="arrow-right" style="width:12px;height:12px;color:#C0B9AD;flex-shrink:0"></i>' +
      '</a>';
  }).join('');
  dropdown.style.display = 'block';
  // Close when a result is selected
  dropdown.querySelectorAll('.search-dropdown-item').forEach(function(a) {
    a.addEventListener('click', hideSearchDropdown);
  });
  lucide.createIcons();
}

function hideSearchDropdown() {
  var d = document.getElementById('search-dropdown');
  if (d) d.style.display = 'none';
}

function executeEcosystemSearch() {
  var input = document.getElementById('ecosystem-search-input');
  var q = input ? input.value.trim() : '';
  hideSearchDropdown();
  // UX FIX: empty submit now gives clear feedback instead of silently failing
  if (selectedSkills.length === 0 && !q) {
    var box = document.getElementById('ecosystem-search-box');
    if (box) {
      box.style.borderColor = '#C85A3A';
      box.style.boxShadow = '0 0 0 3px rgba(200,90,58,0.12)';
      // Brief shake to draw attention
      box.animate(
        [{ transform: 'translateX(0)' }, { transform: 'translateX(-4px)' }, { transform: 'translateX(4px)' }, { transform: 'translateX(0)' }],
        { duration: 220, iterations: 1 }
      );
      var hint = document.getElementById('ecosystem-search-hint');
      if (!hint) {
        hint = document.createElement('p');
        hint.id = 'ecosystem-search-hint';
        hint.setAttribute('role', 'status');
        hint.style.cssText = 'margin-top:8px;font-size:.75rem;color:#C85A3A';
        hint.textContent = 'Pick a skill or type to search.';
        box.parentElement.appendChild(hint);
      }
      if (input) input.focus();
      setTimeout(function () {
        box.style.borderColor = 'rgba(28,28,30,0.12)';
        box.style.boxShadow = 'none';
        var h = document.getElementById('ecosystem-search-hint');
        if (h) h.remove();
      }, 2400);
    }
    return;
  }
  renderDiscoveryResults(selectedSkills, q);
  goToPage('skill-discovery');
}

function filterArticles(category) {
  document.querySelectorAll('.writing-filter').forEach(btn => {
    btn.classList.remove('selected');
    if (btn.dataset.category === category) btn.classList.add('selected');
  });
  document.querySelectorAll('#articles-grid .article-card').forEach(card => {
    card.style.display = (category === 'all' || card.dataset.category === category) ? '' : 'none';
  });
}

// CV download with graceful fallback — uses data-state classes so the icon is preserved.
document.addEventListener('click', function(e) {
  var link = e.target.closest('#home-cv-download');
  if (!link) return;
  e.preventDefault();
  if (link.dataset.state === 'loading') return;
  var statusEl = document.getElementById('cv-download-status');

  link.dataset.state = 'loading';
  if (statusEl) statusEl.textContent = 'Checking CV file…';

  fetch(link.href, { method: 'HEAD' })
    .then(function (res) {
      if (res.ok) {
        link.removeAttribute('data-state');
        if (statusEl) statusEl.textContent = 'CV download starting…';
        var a = document.createElement('a');
        a.href = link.href;
        a.download = 'Zefanya-Kharisma-Nugroho-CV.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(function () { if (statusEl) statusEl.textContent = ''; }, 3000);
      } else {
        throw new Error('not available');
      }
    })
    .catch(function () {
      link.dataset.state = 'error';
      if (statusEl) statusEl.textContent = 'CV not available — redirecting to contact page.';
      setTimeout(function () { link.removeAttribute('data-state'); if (statusEl) statusEl.textContent = ''; }, 3000);
      setTimeout(function () { goToPage('contact'); }, 900);
    });
});

function openArticle(id) {
  // Use the centralized toast — avoids mutating card DOM and stacking duplicate toasts.
  if (window.showToast) {
    window.showToast('Coming soon — essay in draft.', 'info');
  }
}

const defaultConfig = {
  hero_name: 'Zefanya Kharisma Nugroho',
  hero_title: 'International Partnership Specialist',
  hero_tagline: 'Supporting 200+ international students and managing end-to-end global mobility programs across universities in Indonesia and beyond — based in Surabaya.',
  about_text: 'Over the past 3+ years, I have supported 200+ international students and managed end-to-end global mobility programs across universities in Indonesia and beyond. From coordinating semester exchange programs and government scholarships (KNB & TIAS) to reviewing 25+ partnership agreements monthly, I bring both operational depth and strategic vision to international education. Currently at Petra Christian University, I focus on building and strengthening institutional partnerships — facilitating 15+ strategic meetings per month, expanding access to international grants, and growing PCU\'s global network.',
  contact_email: 'zefanya.kharisma@gmail.com',
  partnership_title: 'Partnership Development',
  mou_title: 'MoU / MoA Coordination',
  background_color: '#F8FAFC',
  surface_color: '#FFFFFF',
  text_color: '#1E293B',
  primary_action_color: '#2563EB',
  accent_color: '#38BDF8',
  font_family: 'Sora',
  font_size: 16
};

const BASE_PATH = '';

const CM_PAGES = new Set(['websites', 'designs', 'writing', 'web-portfolio', 'web-pcu-global-intl', 'web-dashboard-partnership', 'web-dashboard-grants']);

function _pageIdToPath(pageId) {
  if (pageId === 'home') return '/';
  if (CM_PAGES.has(pageId)) return '/croissantsmoon/' + pageId;
  return '/' + pageId;
}

// UX FIX: page metadata for dynamic titles and meta descriptions
const pageMetadata = {
  'home':               { title: 'Zefanya Kharisma Nugroho',                              description: 'International Education Professional & Creative Technologist based in Surabaya.' },
  'about-overview':     { title: 'About — Zefanya Kharisma Nugroho',                      description: 'Profile overview: 3+ years in international higher education, global mobility, and creative digital work.' },
  'expertise':          { title: 'Expertise — Zefanya Kharisma Nugroho',                  description: 'Core competencies in international partnerships, student mobility, project management, and digital creativity.' },
  'experience':         { title: 'Experience — Zefanya Kharisma Nugroho',                 description: 'Career timeline across Universitas Airlangga and Petra Christian University.' },
  'skillset':           { title: 'Skillset — Zefanya Kharisma Nugroho',                   description: 'Full map of technical, professional, and creative competencies.' },
  'education':          { title: 'Education — Zefanya Kharisma Nugroho',                  description: 'Academic background in International Relations.' },
  'projects-overview':  { title: 'Projects — Zefanya Kharisma Nugroho',                   description: 'Portfolio of flagship programs: AMERTA, ACI, AERO, PCU Global.' },
  'amerta':             { title: 'AMERTA — Zefanya Kharisma Nugroho',                     description: "Universitas Airlangga's flagship semester exchange program — 120+ students, IDR 50–100M budget." },
  'aci':                { title: 'ACI — Zefanya Kharisma Nugroho',                        description: 'Airlangga Cultural Immersion: structured engagement connecting international and local students.' },
  'aero':               { title: 'AERO — Zefanya Kharisma Nugroho',                       description: 'Annual exhibition at Universitas Airlangga showcasing global partnerships.' },
  'pcu-global':         { title: 'PCU Global — Zefanya Kharisma Nugroho',                 description: 'Rebuilding PCU International Office online presence with full-stack web app.' },
  'engagement':         { title: 'Intl. Education — Zefanya Kharisma Nugroho',            description: 'Building meaningful connections for exchange students through curated programs.' },
  'onboarding':         { title: 'Student Support — Zefanya Kharisma Nugroho',            description: 'End-to-end welfare support for 100+ international students per semester.' },
  'engagement-detail':  { title: 'Student Engagement — Zefanya Kharisma Nugroho',         description: 'Student engagement initiatives for international education.' },
  'partnerships':       { title: 'Partnerships — Zefanya Kharisma Nugroho',               description: 'Managing 30+ institutional partners and reviewing 25+ MoU/MoA agreements monthly.' },
  'mou':                { title: 'MoU / MoA — Zefanya Kharisma Nugroho',                  description: 'Formalizing academic partnerships through strategic agreements.' },
  'intl-grants':        { title: 'International Grants — Zefanya Kharisma Nugroho',        description: 'Building a digital and physical system to inform, maintain, and execute international grants at PCU.' },
  'croissantsmoon':          { title: 'CroissantsMoon — Zefanya Kharisma Nugroho',             description: 'A future-facing boutique studio identity — editorial design, web experiences, brand systems.' },
  'web-portfolio':           { title: 'Website Portfolio — CroissantsMoon',                   description: 'A dual-identity SPA for international education and creative technology.' },
  'web-pcu-global-intl':     { title: 'PCU Global International Office — CroissantsMoon',     description: 'Rebuilding an institutional web presence for a university\'s international office.' },
  'web-dashboard-partnership':{ title: 'Dashboard Partnership — CroissantsMoon',              description: 'A data dashboard for visualising and managing international partnership networks.' },
  'web-dashboard-grants':    { title: 'Dashboard International Grants — CroissantsMoon',      description: 'Centralising international grant tracking from application through to outcome.' },
  'writing':            { title: 'Writing — Zefanya Kharisma Nugroho',                    description: 'Essays and insights on international education, leadership, and digital craft.' },
  'websites':           { title: 'Web Development — Zefanya Kharisma Nugroho',            description: 'Responsive, user-centered websites for institutional communications.' },
  'designs':            { title: 'Graphic Design — Zefanya Kharisma Nugroho',             description: 'Strategic visual design for institutional identity and event collateral.' },
  'contact':            { title: 'Contact — Zefanya Kharisma Nugroho',                    description: 'Open to international partnerships, collaborations, and conversations about global education.' },
  'skill-discovery':    { title: 'Skill Discovery — Zefanya Kharisma Nugroho',            description: 'Explore related projects and work by skill area.' },
  'not-found':          { title: 'Page not found — Zefanya Kharisma Nugroho',             description: 'The page you are looking for could not be found.' },
};

let currentPage = 'home';
let currentSlideHero = 0;
let currentPagesSlide = 0;
let pagesAutoplay = null;
let pagesAutoplayPaused = false;  // explicit pause flag — clearInterval alone is not enough

// UX FIX: single render function used by both goToPage() and _navigateFromHash().
// Previously the two paths drifted (og:title, mobile menu close, scroll reset).
function _renderPage(pageId) {
  // Resolve unknown pages to not-found (L6: 404 fallback)
  const target = document.getElementById('page-' + pageId);
  if (!target) pageId = 'not-found';

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById('page-' + pageId);
  if (page) {
    page.classList.add('active');
    currentPage = pageId;
  }

  // Close mobile menu and reset all submenu states on every navigation
  _closeMobileMenu();

  // Scroll reset across all possible scroll containers
  window.scrollTo({ top: 0, behavior: 'instant' });
  const app = document.getElementById('app');
  if (app) app.scrollTop = 0;
  const container = document.querySelector('.pages-container');
  if (container) container.scrollTop = 0;

  // Document title, description, og:title, og:description, canonical
  const meta = pageMetadata[pageId] || pageMetadata['home'];
  document.title = meta.title;
  const descEl = document.querySelector('meta[name="description"]');
  if (descEl) descEl.setAttribute('content', meta.description);
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', meta.title);
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', meta.description);
  const canonicalEl = document.querySelector('link[rel="canonical"]');
  if (canonicalEl) {
    const base = 'https://zefanyakharisma.com';
    canonicalEl.setAttribute('href', base + _pageIdToPath(pageId));
  }

  _updateNavActiveState(pageId);
  return pageId;
}

// Path-based routing — updates URL to /pageId (or /croissantsmoon/pageId) for Google indexing
function goToPage(pageId) {
  const resolved = _renderPage(pageId);
  const newPath = BASE_PATH + _pageIdToPath(resolved);
  if (location.pathname !== newPath) {
    history.pushState({ page: resolved }, '', newPath);
  }
}

// Maps each pageId to the bottom tab id and Dynamic Island label
const _navActiveMap = {
  'home':              { tab: null,          label: 'Home' },
  // About
  'about-overview':    { tab: 'tab-about',   label: 'About' },
  'expertise':         { tab: 'tab-about',   label: 'About' },
  'experience':        { tab: 'tab-about',   label: 'About' },
  'skillset':          { tab: 'tab-about',   label: 'About' },
  'education':         { tab: 'tab-about',   label: 'About' },
  'international':     { tab: 'tab-projects', label: 'Projects' },
  'values':            { tab: 'tab-about',   label: 'About' },
  // Projects
  'projects-overview': { tab: 'tab-projects', label: 'Projects' },
  'amerta':            { tab: 'tab-projects', label: 'Projects' },
  'aci':               { tab: 'tab-projects', label: 'Projects' },
  'aero':              { tab: 'tab-projects', label: 'Projects' },
  'pcu-global':        { tab: 'tab-projects', label: 'Projects' },
  // Intl. Education
  'engagement':        { tab: 'tab-intl', label: 'Intl. Ed' },
  'onboarding':        { tab: 'tab-intl', label: 'Intl. Ed' },
  'engagement-detail': { tab: 'tab-intl', label: 'Intl. Ed' },
  'partnerships':      { tab: 'tab-intl', label: 'Intl. Ed' },
  'mou':               { tab: 'tab-intl', label: 'Intl. Ed' },
  'intl-grants':       { tab: 'tab-intl', label: 'Intl. Ed' },
  'partnership-detail':{ tab: 'tab-intl', label: 'Intl. Ed' },
  'mou-detail':        { tab: 'tab-intl', label: 'Intl. Ed' },
  // Creative
  'croissantsmoon':              { tab: 'tab-creative', label: 'Creative' },
  'writing':                     { tab: 'tab-creative', label: 'Creative' },
  'websites':                    { tab: 'tab-creative', label: 'Creative' },
  'designs':                     { tab: 'tab-creative', label: 'Creative' },
  'web-portfolio':               { tab: 'tab-creative', label: 'Creative' },
  'web-pcu-global-intl':         { tab: 'tab-creative', label: 'Creative' },
  'web-dashboard-partnership':   { tab: 'tab-creative', label: 'Creative' },
  'web-dashboard-grants':        { tab: 'tab-creative', label: 'Creative' },
  // Contact & standalone
  'contact':           { tab: 'tab-contact', label: 'Contact' },
  'skill-discovery':   { tab: null,           label: 'Discover' },
  'not-found':         { tab: null,           label: '404' },
};

function _updateNavActiveState(pageId) {
  const mapping = _navActiveMap[pageId] || { tab: null, label: pageId };
  const tabName = mapping.tab ? mapping.tab.replace('tab-', '') : null;

  // ── Bottom tab bar (mobile) ──
  document.querySelectorAll('.tab-item').forEach(el => el.classList.remove('active'));
  if (mapping.tab) {
    const tabEl = document.getElementById(mapping.tab);
    if (tabEl) tabEl.classList.add('active');
  }

  // ── Desktop nav links ──
  document.querySelectorAll('.desktop-nav-link').forEach(function(el) {
    el.classList.remove('active');
    if (tabName && el.dataset.tab === tabName) el.classList.add('active');
  });

  // ── Dynamic Island (mobile) ──
  const island = document.getElementById('dynamic-island');
  const label  = document.getElementById('dynamic-island-label');
  if (island && label && label.textContent !== mapping.label) {
    island.classList.add('is-changing');
    setTimeout(function() {
      label.textContent = mapping.label;
      island.classList.remove('is-changing');
    }, 200);
  }
}

function _resolvePathToPageId(rawPath) {
  if (!rawPath || rawPath === '') return 'home';
  if (rawPath.startsWith('croissantsmoon/')) {
    return rawPath.slice('croissantsmoon/'.length) || 'croissantsmoon';
  }
  return rawPath;
}

// Path-based navigation — reads clean URL path and handles ?p= redirect from 404.html
function _navigateFromPath() {
  // Handle ?p= redirect injected by 404.html for GitHub Pages SPA routing
  const params = new URLSearchParams(location.search);
  const p = params.get('p');
  if (p) {
    const rawPath = decodeURIComponent(p).replace(/^\//, '');
    const pageId = _resolvePathToPageId(rawPath);
    params.delete('p');
    const qs = params.toString();
    history.replaceState(null, null, BASE_PATH + _pageIdToPath(pageId) + (qs ? '?' + qs : ''));
    _renderPage(pageId);
    return;
  }
  // Read page from clean pathname
  const raw = location.pathname.slice(BASE_PATH.length).replace(/^\//, '');
  const pageId = _resolvePathToPageId(raw);
  // Backward compat: legacy bookmarked hash URLs like /#/about-overview
  if (pageId === 'home' && location.hash.startsWith('#/')) {
    const hashPage = location.hash.slice(2) || 'home';
    goToPage(hashPage);
    return;
  }
  _renderPage(pageId);
}

window.addEventListener('popstate', _navigateFromPath);

function slideCarouselHero(direction) {
  const track = document.getElementById('carousel-track-hero');
  const slides = track.children;
  currentSlideHero += direction;
  if (currentSlideHero >= slides.length) currentSlideHero = 0;
  if (currentSlideHero < 0) currentSlideHero = slides.length - 1;
  track.style.transform = `translateX(-${currentSlideHero * 100}%)`;
  updateCarouselDotsHero();
}

function updateCarouselDotsHero() {
  const dotsContainer = document.getElementById('carousel-dots-hero');
  dotsContainer.innerHTML = '';
  const slides = document.getElementById('carousel-track-hero').children;
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('button');
    dot.className = 'w-2 h-2 rounded-full transition';
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    if (i === currentSlideHero) dot.setAttribute('aria-current', 'true');
    dot.style.background = i === currentSlideHero ? '#ffffff' : 'rgba(255,255,255,0.4)';
    dot.addEventListener('click', () => {
      currentSlideHero = i;
      document.getElementById('carousel-track-hero').style.transform = `translateX(-${currentSlideHero * 100}%)`;
      updateCarouselDotsHero();
    });
    dotsContainer.appendChild(dot);
  }
}

function _startPagesAutoplay() {
  if (pagesAutoplay) clearInterval(pagesAutoplay);
  pagesAutoplay = setInterval(() => slidePagesCarousel(1), 3500);
}

function _stopPagesAutoplay() {
  if (pagesAutoplay) { clearInterval(pagesAutoplay); pagesAutoplay = null; }
}

function slidePagesCarousel(dir) {
  const track = document.getElementById('pages-carousel-track');
  if (!track) return;
  const count = track.children.length;
  currentPagesSlide += dir;
  if (currentPagesSlide >= count) currentPagesSlide = 0;
  if (currentPagesSlide < 0) currentPagesSlide = count - 1;
  track.style.transform = `translateX(-${currentPagesSlide * 100}%)`;
  updatePagesCarouselDots();
  // Restart the timer only when autoplay is running (not when explicitly paused)
  if (!pagesAutoplayPaused) _startPagesAutoplay();
}

function updatePagesCarouselDots() {
  const dotsContainer = document.getElementById('pages-carousel-dots');
  const track = document.getElementById('pages-carousel-track');
  if (!dotsContainer || !track || !track.children.length) return;
  const count = track.children.length;
  dotsContainer.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('button');
    dot.className = 'w-2 h-2 rounded-full transition';
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    if (i === currentPagesSlide) dot.setAttribute('aria-current', 'true');
    dot.style.background = i === currentPagesSlide ? '#2563EB' : 'rgba(37,99,235,0.25)';
    dot.addEventListener('click', () => {
      currentPagesSlide = i;
      track.style.transform = `translateX(-${currentPagesSlide * 100}%)`;
      updatePagesCarouselDots();
      // Dot navigation does NOT restart autoplay if user has paused
      if (!pagesAutoplayPaused) _startPagesAutoplay();
    });
    dotsContainer.appendChild(dot);
  }
}

function applyConfig(config) {
  const c = key => config[key] || defaultConfig[key];
  var navNameEl = document.getElementById('nav-name') || document.getElementById('top-bar-name');
  if (navNameEl) navNameEl.textContent = 'ZKN';
  const teaserEl = document.getElementById('about-teaser-text');
  if (teaserEl) teaserEl.textContent = c('about_text');
  const contactEmailEl = document.getElementById('contact-email-el');
  if (contactEmailEl) contactEmailEl.textContent = c('contact_email');
  const partnershipTitle = document.getElementById('partnership-title');
  if (partnershipTitle) partnershipTitle.textContent = c('partnership_title');
  const mouTitle = document.getElementById('mou-title');
  if (mouTitle) mouTitle.textContent = c('mou_title');
}

if (window.elementSdk) window.elementSdk.init({
  defaultConfig,
  onConfigChange: async (config) => applyConfig(config),
  mapToCapabilities: (config) => ({
    recolorables: [
      { get: () => config.background_color || defaultConfig.background_color, set: v => { config.background_color = v; window.elementSdk.setConfig({ background_color: v }); }},
      { get: () => config.surface_color || defaultConfig.surface_color, set: v => { config.surface_color = v; window.elementSdk.setConfig({ surface_color: v }); }},
      { get: () => config.text_color || defaultConfig.text_color, set: v => { config.text_color = v; window.elementSdk.setConfig({ text_color: v }); }},
      { get: () => config.primary_action_color || defaultConfig.primary_action_color, set: v => { config.primary_action_color = v; window.elementSdk.setConfig({ primary_action_color: v }); }},
      { get: () => config.accent_color || defaultConfig.accent_color, set: v => { config.accent_color = v; window.elementSdk.setConfig({ accent_color: v }); }}
    ],
    borderables: [],
    fontEditable: { get: () => config.font_family || defaultConfig.font_family, set: v => { config.font_family = v; window.elementSdk.setConfig({ font_family: v }); }},
    fontSizeable: { get: () => config.font_size || defaultConfig.font_size, set: v => { config.font_size = v; window.elementSdk.setConfig({ font_size: v }); }}
  }),
  mapToEditPanelValues: (config) => new Map([
    ['hero_name', config.hero_name || defaultConfig.hero_name],
    ['hero_title', config.hero_title || defaultConfig.hero_title],
    ['hero_tagline', config.hero_tagline || defaultConfig.hero_tagline],
    ['about_text', config.about_text || defaultConfig.about_text],
    ['contact_email', config.contact_email || defaultConfig.contact_email],
    ['partnership_title', config.partnership_title || defaultConfig.partnership_title],
    ['mou_title', config.mou_title || defaultConfig.mou_title]
  ])
});

// ── Mobile menu ────────────────────────────────────────────
function _resetMobileSubmenus() {
  document.querySelectorAll('.mobile-menu-toggle').forEach(function(btn) {
    var menuId = btn.dataset.menu + '-menu';
    var menu = document.getElementById(menuId);
    if (menu) menu.classList.add('hidden');
    btn.setAttribute('aria-expanded', 'false');
    var icon = btn.querySelector('i');
    if (icon) icon.style.transform = 'rotate(0deg)';
  });
}

function _closeMobileMenu() {
  var mobileMenu = document.getElementById('mobile-menu');
  var btn = document.getElementById('mobile-menu-btn');
  if (mobileMenu) mobileMenu.classList.add('hidden');
  if (btn) btn.setAttribute('aria-expanded', 'false');
  _resetMobileSubmenus();
}

var _mobileMenuBtn = document.getElementById('mobile-menu-btn');
if (_mobileMenuBtn) {
  _mobileMenuBtn.addEventListener('click', function() {
    var menu = document.getElementById('mobile-menu');
    var btn  = document.getElementById('mobile-menu-btn');
    var isOpen = !menu.classList.contains('hidden');
    if (isOpen) {
      _closeMobileMenu();
    } else {
      menu.classList.remove('hidden');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
}

document.querySelectorAll('.mobile-menu-toggle').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var menu = document.getElementById(btn.dataset.menu + '-menu');
    if (!menu) return;
    var isOpen = !menu.classList.contains('hidden');
    // Close all other submenus first
    _resetMobileSubmenus();
    if (!isOpen) {
      menu.classList.remove('hidden');
      btn.setAttribute('aria-expanded', 'true');
      var icon = btn.querySelector('i');
      if (icon) icon.style.transform = 'rotate(180deg)';
    }
  });
});

// Auto-close mobile menu when resizing to desktop breakpoint (≥768px)
window.addEventListener('resize', function() {
  if (window.innerWidth >= 768) _closeMobileMenu();
});

// UX FIX: keyboard-accessible desktop dropdowns
// Shows/hides via aria-expanded; works for mouse hover, keyboard, and click
(function initNavDropdowns() {
  var groups = document.querySelectorAll('.nav-dropdown-group');

  function openDropdown(trigger, panel) {
    trigger.setAttribute('aria-expanded', 'true');
    panel.style.display = 'block';
  }

  function closeDropdown(trigger, panel) {
    trigger.setAttribute('aria-expanded', 'false');
    panel.style.display = 'none';
  }

  function closeAllDropdowns() {
    groups.forEach(function(g) {
      var t = g.querySelector('.nav-dropdown-trigger');
      var p = g.querySelector('.nav-dropdown');
      if (t && p) closeDropdown(t, p);
    });
  }

  groups.forEach(function(group) {
    var trigger = group.querySelector('.nav-dropdown-trigger');
    var panel   = group.querySelector('.nav-dropdown');
    if (!trigger || !panel) return;

    // Mouse hover — open on enter, close on leave the whole group
    group.addEventListener('mouseenter', function() { openDropdown(trigger, panel); });
    group.addEventListener('mouseleave', function() { closeDropdown(trigger, panel); });

    // Click toggle (also works for touch)
    trigger.addEventListener('click', function(e) {
      e.stopPropagation();
      var isOpen = trigger.getAttribute('aria-expanded') === 'true';
      closeAllDropdowns();
      if (!isOpen) openDropdown(trigger, panel);
    });

    // Keyboard: Enter/Space opens; Escape closes and returns focus
    trigger.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        var isOpen = trigger.getAttribute('aria-expanded') === 'true';
        closeAllDropdowns();
        if (!isOpen) {
          openDropdown(trigger, panel);
          // Move focus to first item
          var firstItem = panel.querySelector('a');
          if (firstItem) firstItem.focus();
        }
      } else if (e.key === 'Escape') {
        closeDropdown(trigger, panel);
        trigger.focus();
      }
    });

    // Escape inside panel closes and returns focus to trigger
    panel.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeDropdown(trigger, panel);
        trigger.focus();
      }
    });
  });

  // Click outside closes all dropdowns
  document.addEventListener('click', function() { closeAllDropdowns(); });
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeAllDropdowns(); });
})();

// Hero banner configurations for each page
const heroConfigs = {
  // About Me sub-pages
  'education':    { back: 'about-overview', backLabel: 'Back', category: 'About Me', title: 'Academic Foundation',     desc: 'Education and achievements that shaped my professional expertise in international relations.',        gradient: '#1E3A5F 0%, #2563EB 60%, #38BDF8 100%' },
  'international':{ back: 'about-overview', backLabel: 'Back', category: 'About Me', title: 'International Exposure',  desc: 'Real-world experience bridging institutions, students, and cultures across Southeast Asia.',          gradient: '#1E3A5F 0%, #2563EB 60%, #38BDF8 100%' },
  'values':       { back: 'about-overview', backLabel: 'Back', category: 'About Me', title: 'Professional Values',     desc: 'Principles that guide my work and decisions in international education.',                          gradient: '#1E3A5F 0%, #2563EB 60%, #38BDF8 100%' },
  'expertise':    { back: 'about-overview', backLabel: 'Back', category: 'About Me', title: 'Areas of Expertise',      desc: 'Core competencies built through hands-on experience in international higher education.',             gradient: '#1E3A5F 0%, #2563EB 60%, #38BDF8 100%' },
  'experience':   { back: 'about-overview', backLabel: 'Back', category: 'About Me', title: 'Professional Experience', desc: '3+ years building international partnerships and supporting student mobility across Surabaya.',      gradient: '#1E3A5F 0%, #2563EB 60%, #38BDF8 100%' },
  'skillset':     { back: 'about-overview', backLabel: 'Back', category: 'About Me', title: 'Skillset',                desc: 'Core competencies and professional capabilities.',                                               gradient: '#1E3A5F 0%, #2563EB 60%, #38BDF8 100%' },
  // Projects
  'amerta':       { back: 'projects-overview', backLabel: 'Back', category: 'Project Management', title: 'AMERTA',     desc: "Universitas Airlangga's flagship semester exchange program — 120+ students, IDR 50–100M budget.", gradient: '#3B0764 0%, #7C3AED 60%, #A78BFA 100%' },
  'aci':          { back: 'projects-overview', backLabel: 'Back', category: 'Project Management', title: 'ACI',         desc: 'Airlangga Cultural Immersion — structured engagement program connecting international and local students.', gradient: '#3B0764 0%, #7C3AED 60%, #A78BFA 100%' },
  'aero':         { back: 'projects-overview', backLabel: 'Back', category: 'Project Management', title: 'AERO',        desc: 'Annual exhibition at Universitas Airlangga showcasing global partnerships and international programs.', gradient: '#3B0764 0%, #7C3AED 60%, #A78BFA 100%' },
  'pcu-global':   { back: 'projects-overview', backLabel: 'Back', category: 'Project Management', title: 'PCU Global', desc: "Rebuilding PCU's International Office online presence — full-stack web app, news CMS, and mobile-first design.", gradient: '#003087 0%, #0050A0 60%, #3B82F6 100%' },
  // Intl. Education
  'onboarding':        { back: 'engagement', backLabel: 'Back', category: 'Student Services',    title: 'Student Onboarding & Orientation', desc: 'End-to-end welfare support for 100+ international students per semester — housing, healthcare, immigration.', gradient: '#1B3A2A 0%, #2D6A4F 60%, #52B788 100%', type: 'marquee', items: ['Student Pick-Up Services', 'Onboarding & Orientation', 'Best Buddies Support', 'Tax Reporting Assistance', 'Farewell Events', 'Monitoring & Evaluation', '480+ Students', '30+ Countries', '4 AMERTA Batches'] },
  'engagement-detail': { back: 'engagement', backLabel: 'Back', category: 'Student Services',    title: 'Student Engagement',              desc: 'Building meaningful connections and fostering personal growth through curated exchange programs.',              gradient: '#1B3A2A 0%, #2D6A4F 60%, #52B788 100%', type: 'marquee', items: ['City Tour', 'Rujak Uleg Festival', 'Tari Topeng Panji', 'Government Seminars', 'Volunteering Programs', 'Best Buddies', '120+ Students / Semester', '20+ Countries', '5 Community Partners'] },
  'partnerships':      { back: 'engagement', backLabel: 'Back', category: 'Global Partnerships', title: 'Partnership Development',         desc: 'Managing 30+ institutional partners and facilitating 15+ strategic meetings per month.',                        gradient: '#4A6B8A 0%, #2563EB 50%, #38BDF8 100%', type: 'marquee', items: ['Partnership Development', 'Institutional Partnerships', 'Research Collaboration', 'Faculty Exchange', 'Curriculum Development', 'Student Mobility', '30+ Partners', '15+ Meetings / Month'] },
  'mou':               { back: 'engagement', backLabel: 'Back', category: 'Global Partnerships', title: 'MoU / MoA Coordination',          desc: 'Formalizing academic partnerships through strategic agreements — ensuring compliance and institutional alignment.', gradient: '#4A6B8A 0%, #2563EB 50%, #38BDF8 100%', type: 'marquee', items: ['MoU Drafting', 'MoA Review', 'Compliance Monitoring', 'Agreement Renewals', 'Institutional Alignment', 'Partnership Agreements', '25+ Agreements / Month'] },
  'intl-grants':       { back: 'engagement', backLabel: 'Back', category: 'International Education', title: 'International Grants',           desc: 'Building a system — digital and physical — to inform, maintain, and execute international grants at Petra Christian University.', gradient: '#064E3B 0%, #065F46 50%, #D97706 100%', type: 'marquee', items: ['Grant Discovery', 'Applicant Pipeline', 'Deadline Tracking', 'Physical Workflow', 'Realtime Updates', 'Outcome Analytics', 'PCU Grants', 'In Development'] },
  'partnership-detail':{ back: 'partnerships', backLabel: 'Back', category: 'Global Partnerships', title: 'Partnership Development',       desc: 'Building and nurturing strategic academic partnerships that drive institutional excellence.',                     gradient: '#7C2D12 0%, #EA580C 60%, #FB923C 100%', type: 'marquee', items: ['Strategic Alignment', 'Institutional Excellence', 'Global Collaboration', 'Research Exchange', 'Faculty Development', 'Student Mobility', 'Joint Programs'] },
  'mou-detail':        { back: 'mou',          backLabel: 'Back', category: 'Global Partnerships', title: 'MoU / MoA Coordination',        desc: 'Reviewing 25+ partnership agreements per month — ensuring compliance and institutional alignment.',              gradient: '#7C2D12 0%, #EA580C 60%, #FB923C 100%', type: 'marquee', items: ['Agreement Review', 'Compliance', 'Renewals', 'Institutional Alignment', 'MoU Drafting', 'MoA Coordination', 'Partnership Formalization'] },
  // Creative
  // CroissantsMoon has its own custom hero — banner injection skipped for this page
  'writing':        { back: 'home', backLabel: 'Back', category: 'Creative',          title: 'Writing & Reflections',    desc: 'Essays and insights on international education, leadership, systems thinking, and digital craft.',        gradient: '#2C2C2E 0%, #5C5C5C 60%, #9A9A9A 100%' },
  'websites':       { back: 'home', backLabel: 'Back', category: 'Creative Services', title: 'Web Development & Design', desc: 'Responsive, user-centered websites for institutional communications and international engagement.',       gradient: '#7F1D1D 0%, #DC2626 60%, #F87171 100%', type: 'marquee', items: ['Web Development', 'UI/UX Design', 'Responsive Design', 'Editorial Websites', 'CMS Integration', 'Typography', 'Web Animation', 'Mobile-First', 'HTML · CSS · JS', 'Tailwind CSS', 'Frontend Craft', 'Accessibility'] },
  'designs':        { back: 'home', backLabel: 'Back', category: 'Creative Services', title: 'Graphic Design',           desc: 'Strategic visual design for institutional identity, event collateral, and international partnerships.',    gradient: '#3D1F5C 0%, #7C3AED 60%, #A78BFA 100%' },
  // Standalone
  'contact':        { back: 'home', backLabel: 'Back', category: 'Get in Touch',      title: "Let's Connect",            desc: 'Open to international partnerships, collaborations, and meaningful conversations about global education.', gradient: '#030712 0%, #071126 55%, #0B1E3A 100%' },
  'skill-discovery':{ back: 'home', backLabel: 'Back', category: 'Explore',           title: 'Skill Discovery',          desc: 'Filter my work by skill area — find the intersection of international education and creative practice.',     gradient: '#1E3A5F 0%, #2563EB 50%, #38BDF8 100%' },
  'not-found':      { back: 'home', backLabel: 'Go Home', category: '404',            title: 'Page Not Found',           desc: 'The page you are looking for does not exist. Head back to the home page.',                                 gradient: '#1C1C1E 0%, #3C3C3E 60%, #5C5C5C 100%' },
};

function injectHeroBanners() {
  Object.entries(heroConfigs).forEach(([pageId, cfg]) => {
    const page = document.getElementById('page-' + pageId);
    if (!page || page.querySelector('.page-hero-banner')) return;
    page.classList.remove('py-20');
    const hero = document.createElement('div');

    if (cfg.type === 'marquee') {
      const items = cfg.items || [cfg.title];
      const buildInner = () => items.map(item =>
        '<span style="padding:0 28px;color:rgba(255,255,255,0.88);font-size:.67rem;font-weight:600;letter-spacing:.11em;text-transform:uppercase;font-family:\'DM Sans\',sans-serif">' + item + '</span>' +
        '<span style="color:rgba(255,255,255,0.3);font-size:.8rem">·</span>'
      ).join('');
      hero.className = 'page-hero-banner overflow-hidden';
      hero.style.cssText = 'background:linear-gradient(135deg,' + cfg.gradient + ')';
      hero.innerHTML =
        '<div class="cm-marquee-track" style="animation:cmMarquee 30s linear infinite;width:max-content;padding:13px 0">' +
          '<div style="display:flex;align-items:center;white-space:nowrap">' + buildInner() + '</div>' +
          '<div style="display:flex;align-items:center;white-space:nowrap" aria-hidden="true">' + buildInner() + '</div>' +
        '</div>';
      page.insertBefore(hero, page.firstChild);
      return;
    }

    hero.className = 'page-hero-banner relative overflow-hidden';
    hero.style.cssText = 'background:linear-gradient(135deg,' + cfg.gradient + ');padding:52px 0 44px';
    hero.innerHTML = '<div class="absolute -right-16 -top-16 w-80 h-80 rounded-full" style="background:rgba(255,255,255,0.04)"></div>' +
      '<div class="absolute right-24 bottom-8 w-48 h-48 rounded-full" style="border:1.5px solid rgba(255,255,255,0.07)"></div>' +
      '<div class="relative z-10 mx-auto px-5" style="max-width:480px">' +
      '<a href="' + BASE_PATH + '/' + cfg.back + '" class="inline-flex items-center gap-2 mb-7 px-3.5 py-1.5 rounded-full text-sm font-medium" style="background:rgba(255,255,255,0.14);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);color:rgba(255,255,255,0.9);text-decoration:none;font-family:\'DM Sans\',sans-serif;border:1px solid rgba(255,255,255,0.18)">' +
      '<i data-lucide="chevron-left" style="width:14px;height:14px"></i> ' + cfg.backLabel + '</a>' +
      '<span class="inline-block px-3.5 py-1 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider" style="background:rgba(255,255,255,0.14);color:rgba(255,255,255,0.9);font-family:\'DM Sans\',sans-serif;border:1px solid rgba(255,255,255,0.12)">' + cfg.category + '</span>' +
      '<h1 class="font-heading font-bold mb-3 text-white" style="font-size:clamp(1.9rem,6vw,3rem);letter-spacing:-.02em;line-height:1.1">' + cfg.title + '</h1>' +
      '<p class="text-sm leading-relaxed max-w-lg" style="color:rgba(255,255,255,0.7);font-family:\'DM Sans\',sans-serif">' + cfg.desc + '</p>' +
      '</div>';
    page.insertBefore(hero, page.firstChild);
    const contentWrapper = Array.from(page.children).find(el =>
      el !== hero && el.tagName === 'DIV' && el.querySelector &&
      (el.querySelector('button[onclick*="goToPage"]') || el.querySelector('a[href^="/"][data-back]'))
    );
    if (contentWrapper) {
      contentWrapper.style.paddingTop = contentWrapper.style.paddingTop || '64px';
      contentWrapper.style.paddingBottom = contentWrapper.style.paddingBottom || '64px';
      const oldBack = contentWrapper.querySelector('button[onclick*="goToPage"]') ||
                      contentWrapper.querySelector('a[href^="/"][data-back]');
      if (oldBack && oldBack.querySelector('i[data-lucide="arrow-left"]')) oldBack.remove();
    }
  });
}

// All page HTML is injected via DOMContentLoaded in individual page JS files.
// This listener fires last (main.js is loaded last) so all pages are ready.
document.addEventListener('DOMContentLoaded', function() {
  // ── Admin: init auth + banner + footer link + keyboard shortcut ──────────
  (function initAdmin() {
    // Footer year
    var year = document.getElementById('site-footer-year');
    if (year) year.textContent = String(new Date().getFullYear());

    // Footer Admin link → open login modal
    var adminLink = document.getElementById('open-admin-login');
    if (adminLink) {
      adminLink.addEventListener('click', function (e) {
        e.preventDefault();
        if (window.LoginModal) window.LoginModal.open();
      });
    }

    // Ctrl/Cmd+Shift+A keyboard shortcut to open login
    document.addEventListener('keydown', function (e) {
      if (e.shiftKey && (e.ctrlKey || e.metaKey) && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (window.LoginModal) window.LoginModal.open();
      }
    });

    // Re-render admin banner whenever admin state changes
    if (window.AdminAuth) {
      window.AdminAuth.onAdminChange(function (isAdmin, user) {
        if (window.AdminBanner) window.AdminBanner.update(isAdmin, user);
      });
      window.AdminAuth.init();
    }
  })();

  // Inject hero banners, then init lucide icons for the whole document
  injectHeroBanners();
  lucide.createIcons();

  // Initialize carousels (guard against missing elements)
  if (document.getElementById('carousel-track-hero')) updateCarouselDotsHero();
  // UX FIX: only init pages-carousel if its track actually exists in the DOM
  var pagesPrefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (document.getElementById('pages-carousel-track')) {
    updatePagesCarouselDots();
    if (pagesPrefersReduced) {
      pagesAutoplayPaused = true;
    } else {
      _startPagesAutoplay();
    }
  }
  document.addEventListener('visibilitychange', function() {
    document.body.classList.toggle('tab-hidden', document.hidden);
    if (!document.getElementById('pages-carousel-track')) return;
    if (document.hidden) {
      _stopPagesAutoplay();
    } else if (!pagesAutoplayPaused) {
      _startPagesAutoplay();
    }
  });

  // Navigate to the correct page from URL on load
  _navigateFromPath();

  // Global click interceptor: handle path-based nav links without full page reload
  document.addEventListener('click', function (e) {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href) return;
    if (href === BASE_PATH || href === BASE_PATH + '/' || href.startsWith(BASE_PATH + '/')) {
      e.preventDefault();
      const rawId = href.slice(BASE_PATH.length).replace(/^\//, '') || 'home';
      const pageId = _resolvePathToPageId(rawId);
      goToPage(pageId);
    }
  }, true);

  // Hero scroll cue — delegated, no inline onclick
  document.addEventListener('click', function(e) {
    if (e.target.closest('#hero-scroll-btn')) {
      var target = document.getElementById('home-stats-band');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Touch swipe for hero carousel (only if present)
  (function() {
    var track = document.getElementById('carousel-track-hero');
    if (!track) return;
    var startX = 0;
    track.addEventListener('touchstart', function(e) { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', function(e) {
      var diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) slideCarouselHero(diff > 0 ? 1 : -1);
    }, { passive: true });
  })();

  // Touch swipe for pages carousel
  (function() {
    var track = document.getElementById('pages-carousel-track');
    if (!track) return;
    var startX = 0;
    track.addEventListener('touchstart', function(e) { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', function(e) {
      var diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) slidePagesCarousel(diff > 0 ? 1 : -1);
    }, { passive: true });
  })();

  // UX FIX: Hero Slideshow with pause control, reduced-motion respect, and tab-hidden pause
  (function() {
    var slides = Array.from(document.querySelectorAll('.hero-slide'));
    if (!slides.length) return;

    // Shuffle for visual variety
    for (var i = slides.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = slides[i]; slides[i] = slides[j]; slides[j] = tmp;
    }
    var current = 0;
    slides[current].classList.add('active');

    var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var paused = prefersReducedMotion;
    var timer = null;

    function advance() {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }
    function start() {
      if (timer || paused) return;
      timer = setInterval(advance, 5000);
    }
    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    // Inject a pause/play toggle into the hero
    var hero = document.querySelector('.hero-editorial');
    if (hero) {
      var toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.setAttribute('aria-label', paused ? 'Play hero slideshow' : 'Pause hero slideshow');
      toggle.setAttribute('aria-pressed', paused ? 'true' : 'false');
      toggle.className = 'hero-slideshow-toggle';
      toggle.style.cssText = 'position:absolute;bottom:18px;right:18px;z-index:20;width:32px;height:32px;border-radius:50%;background:rgba(28,28,30,0.55);border:1px solid rgba(255,255,255,0.18);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);transition:background .2s';
      toggle.innerHTML = paused
        ? '<i data-lucide="play" style="width:13px;height:13px"></i>'
        : '<i data-lucide="pause" style="width:13px;height:13px"></i>';
      toggle.addEventListener('mouseenter', function() { toggle.style.background = 'rgba(28,28,30,0.75)'; });
      toggle.addEventListener('mouseleave', function() { toggle.style.background = 'rgba(28,28,30,0.55)'; });
      toggle.addEventListener('click', function() {
        paused = !paused;
        toggle.setAttribute('aria-label', paused ? 'Play hero slideshow' : 'Pause hero slideshow');
        toggle.setAttribute('aria-pressed', paused ? 'true' : 'false');
        toggle.innerHTML = paused
          ? '<i data-lucide="play" style="width:13px;height:13px"></i>'
          : '<i data-lucide="pause" style="width:13px;height:13px"></i>';
        if (window.lucide) lucide.createIcons();
        if (paused) stop(); else start();
      });
      hero.appendChild(toggle);
    }

    // Pause when tab is hidden, resume when visible
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) stop(); else start();
    });

    start();
  })();
});

