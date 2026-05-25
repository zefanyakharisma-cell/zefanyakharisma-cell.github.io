// Resolved at runtime from js/config.js (APP_CONFIG.FORMSPREE_ENDPOINT).
function _getFormspreeEndpoint() {
  return (window.APP_CONFIG && window.APP_CONFIG.FORMSPREE_ENDPOINT) || '';
}

function contactInjectFonts() {
  if (document.querySelector('[data-cm-fonts]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Outfit:wght@300;400;500;600;700&display=swap';
  link.setAttribute('data-cm-fonts', '1');
  document.head.appendChild(link);
}

function contactInjectCSS() {
  if (document.getElementById('ct-dark-css')) return;
  const s = document.createElement('style');
  s.id = 'ct-dark-css';
  s.textContent = `
    #page-contact {
      background: #071126 !important;
    }
    /* Override the hero banner gradient to match dark theme */
    #page-contact .page-hero-banner {
      background: linear-gradient(135deg, #030712 0%, #071126 50%, #0B1E3A 100%) !important;
    }
    .ct-input {
      font-family: 'Outfit', sans-serif;
      font-size: .88rem;
      background: rgba(7,17,38,0.7);
      border: 1px solid rgba(111,168,255,0.2);
      color: #D9E6FF;
      border-radius: 12px;
      padding: 13px 16px;
      width: 100%;
      outline: none;
      transition: border-color .22s, box-shadow .22s, background .22s;
      -webkit-backdrop-filter: blur(8px);
      backdrop-filter: blur(8px);
    }
    .ct-input::placeholder { color: rgba(143,168,214,0.35); }
    .ct-input:focus {
      border-color: rgba(111,168,255,0.5);
      box-shadow: 0 0 0 2px rgba(111,168,255,0.12), 0 0 18px rgba(111,168,255,0.07);
      background: rgba(11,30,58,0.75);
    }
    .ct-input.input-error {
      border-color: rgba(220,80,80,0.55) !important;
      box-shadow: 0 0 0 2px rgba(220,80,80,0.1) !important;
    }
    .ct-label {
      font-family: 'Outfit', sans-serif;
      font-size: .68rem;
      font-weight: 600;
      letter-spacing: .12em;
      text-transform: uppercase;
      color: rgba(143,168,214,0.55);
      display: block;
      margin-bottom: .6rem;
    }
    .ct-link-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 18px 16px;
      border-radius: 16px;
      background: rgba(11,30,58,0.5);
      border: 1px solid rgba(111,168,255,0.14);
      text-decoration: none;
      transition: background .22s, border-color .22s, transform .22s, box-shadow .22s;
      cursor: pointer;
      min-width: 88px;
    }
    .ct-link-card:hover {
      background: rgba(24,59,107,0.6);
      border-color: rgba(111,168,255,0.3);
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(3,7,18,0.4), 0 0 0 1px rgba(111,168,255,0.18);
    }
    .ct-link-icon {
      width: 46px; height: 46px; border-radius: 14px;
      background: rgba(111,168,255,0.08);
      border: 1px solid rgba(111,168,255,0.18);
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 0 14px rgba(111,168,255,0.08);
    }
    .ct-star {
      position: absolute; border-radius: 50%; background: #fff; pointer-events: none;
      animation: ctTwinkle var(--dur, 2.4s) var(--delay, 0s) ease-in-out infinite;
    }
    @keyframes ctTwinkle {
      0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.15;transform:scale(.5)}
    }
    @keyframes ctFadeUp {
      from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)}
    }
    .ct-reveal { opacity:0; transform:translateY(18px); transition:opacity .6s ease-out, transform .6s ease-out; }
    .ct-visible { opacity:1 !important; transform:none !important; }
  `;
  document.head.appendChild(s);
}

function ctBuildStars(count) {
  return Array.from({ length: count }, () => {
    const x   = Math.random() * 100;
    const y   = Math.random() * 100;
    const sz  = (Math.random() * 1.8 + 0.5).toFixed(1);
    const dur = (Math.random() * 3 + 1.8).toFixed(1);
    const del = (Math.random() * 4).toFixed(1);
    const op  = (Math.random() * 0.5 + 0.25).toFixed(2);
    return `<span class="ct-star" style="left:${x}%;top:${y}%;width:${sz}px;height:${sz}px;opacity:${op};--dur:${dur}s;--delay:${del}s"></span>`;
  }).join('');
}

function ctConstellationSVG(w, h, seed) {
  const pts = [];
  const rng = n => (Math.sin(seed * n * 9301 + 49297) * 233280 % 1 + 1) % 1;
  for (let i = 0; i < 6; i++) pts.push([rng(i) * w, rng(i + 10) * h]);
  const lines = [[0,1],[1,2],[2,3],[3,4],[4,5],[1,3],[2,4]];
  const linesSVG = lines.map(([a,b]) =>
    `<line x1="${pts[a][0]}" y1="${pts[a][1]}" x2="${pts[b][0]}" y2="${pts[b][1]}"
      stroke="rgba(111,168,255,0.14)" stroke-width="1" stroke-dasharray="4 6"
      style="animation:ctTwinkle 4s ease-in-out infinite"/>`
  ).join('');
  const dotsSVG = pts.map(([x,y]) =>
    `<circle cx="${x}" cy="${y}" r="1.8" fill="rgba(111,168,255,0.3)"/>`
  ).join('');
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"
    style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:.55">
    ${linesSVG}${dotsSVG}
  </svg>`;
}

function contactInitPage() {
  contactInjectFonts();
  contactInjectCSS();

  var el = document.getElementById('page-contact');
  if (!el) return;

  el.style.background = '#071126';

  el.innerHTML = `
    <div style="position:relative;min-height:100vh;overflow:hidden">
      <!-- Star field -->
      <div style="position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden">
        ${ctBuildStars(70)}
      </div>
      <!-- Constellation -->
      <div style="position:fixed;inset:0;pointer-events:none;z-index:0">
        ${ctConstellationSVG(1200, 800, 17)}
      </div>
      <!-- Nebula blobs -->
      <div style="position:fixed;left:-20%;top:10%;width:60%;height:60%;border-radius:50%;
        background:radial-gradient(circle,rgba(111,168,255,0.04) 0%,transparent 65%);
        pointer-events:none;z-index:0"></div>
      <div style="position:fixed;right:-15%;bottom:5%;width:50%;height:50%;border-radius:50%;
        background:radial-gradient(circle,rgba(212,177,90,0.04) 0%,transparent 65%);
        pointer-events:none;z-index:0"></div>
      <!-- Decorative crescent -->
      <div style="position:fixed;right:3%;top:12%;pointer-events:none;z-index:0;
        opacity:.07;filter:blur(.5px) drop-shadow(0 0 20px rgba(212,177,90,0.5))">
        <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
          <path d="M100 70C100 89.3 84.3 105 65 105C45.7 105 30 89.3 30 70C30 50.7 45.7 35 65 35C61 41.5 59 49.5 59 58C59 77.3 71.7 93.6 88.9 98.6C96.2 92.3 100 81.5 100 70Z" fill="#D4B15A"/>
        </svg>
      </div>

      <!-- Main content -->
      <div style="position:relative;z-index:1;max-width:680px;margin:0 auto;padding:clamp(2.5rem,6vh,5rem) 20px clamp(4rem,8vh,7rem)">

        <!-- Section label -->
        <div class="ct-reveal" style="text-align:center;margin-bottom:3.5rem">
          <p style="font-family:'Outfit',sans-serif;font-size:.62rem;font-weight:600;
            letter-spacing:.22em;text-transform:uppercase;color:#D4B15A;margin-bottom:1rem;opacity:.9">Let's Work Together</p>
          <h2 style="font-family:'Cormorant Garamond',Georgia,serif;
            font-size:clamp(2.2rem,6vw,3.5rem);font-weight:400;font-style:italic;
            color:#D9E6FF;line-height:1.05;margin-bottom:1rem;
            text-shadow:0 0 60px rgba(111,168,255,0.15)" data-edit-key="contact_headline">Begin your project.</h2>
          <p style="font-family:'Outfit',sans-serif;font-size:.9rem;line-height:1.76;
            color:#8FA8D6;max-width:440px;margin:0 auto" data-edit-key="contact_sub">Share your vision and I'll get back to you within 24–48 hours.</p>
        </div>

        <!-- Form card -->
        <div class="ct-reveal" style="
          background:rgba(11,30,58,0.55);
          backdrop-filter:blur(20px) saturate(1.4);
          -webkit-backdrop-filter:blur(20px) saturate(1.4);
          border:1px solid rgba(111,168,255,0.16);
          border-radius:24px;padding:clamp(1.75rem,5vw,2.75rem);
          box-shadow:0 8px 48px rgba(3,7,18,0.5);
          position:relative;overflow:hidden;margin-bottom:2rem
        ">
          <!-- Card inner star -->
          <div style="position:absolute;inset:0;pointer-events:none;opacity:.3">
            ${ctBuildStars(12)}
          </div>
          <!-- Top accent line -->
          <div style="position:absolute;top:0;left:0;right:0;height:2px;
            background:linear-gradient(to right,#6FA8FF44,#6FA8FF,#6FA8FF44)"></div>

          <form id="contact-form" novalidate style="position:relative;z-index:1">
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:18px">
              <div>
                <label for="cf-name" class="ct-label">Full Name</label>
                <input id="cf-name" name="name" type="text" class="ct-input"
                  placeholder="Your name" required>
              </div>
              <div>
                <label for="cf-email" class="ct-label">Email Address</label>
                <input id="cf-email" name="email" type="email" class="ct-input"
                  placeholder="your@email.com" required>
              </div>
            </div>
            <div style="margin-bottom:18px">
              <label for="cf-subject" class="ct-label">Subject</label>
              <input id="cf-subject" name="subject" type="text" class="ct-input"
                placeholder="What would you like to build?" required>
            </div>
            <div style="margin-bottom:24px">
              <label for="cf-msg" class="ct-label">Message</label>
              <textarea id="cf-msg" name="message" rows="5" class="ct-input"
                style="resize:none"
                placeholder="Tell me about your project, goals, and timeline..." required></textarea>
            </div>

            <!-- Submit -->
            <button id="cf-submit" type="submit" style="
              width:100%;font-family:'Outfit',sans-serif;font-size:.88rem;font-weight:700;
              background:#D4B15A;color:#071126;
              padding:15px 28px;border-radius:999px;border:none;cursor:pointer;
              display:inline-flex;align-items:center;justify-content:center;gap:9px;
              letter-spacing:.04em;
              box-shadow:0 0 28px rgba(212,177,90,0.35),0 4px 18px rgba(212,177,90,0.2);
              transition:opacity .22s,transform .22s,box-shadow .22s;
              animation:ctGlowPulse 2.8s ease-in-out infinite
            " onmouseover="this.style.opacity='.88';this.style.transform='translateY(-2px)';this.style.boxShadow='0 0 44px rgba(212,177,90,0.55),0 6px 26px rgba(212,177,90,0.3)'"
               onmouseout="this.style.opacity='1';this.style.transform='translateY(0)';this.style.boxShadow='0 0 28px rgba(212,177,90,0.35),0 4px 18px rgba(212,177,90,0.2)'">
              <i data-lucide="send" style="width:16px;height:16px"></i>
              <span id="cf-submit-label">Send Message</span>
            </button>
            <p id="form-msg" role="status" aria-live="polite"
              class="hidden" style="font-family:'Outfit',sans-serif;font-size:.8rem;
              text-align:center;margin-top:1rem;font-weight:500"></p>
          </form>
        </div>

        <!-- Direct contact links -->
        <div class="ct-reveal" style="margin-bottom:2rem">
          <p style="font-family:'Outfit',sans-serif;font-size:.6rem;font-weight:600;
            letter-spacing:.18em;text-transform:uppercase;color:rgba(143,168,214,0.45);
            text-align:center;margin-bottom:1.25rem" data-edit-key="contact_direct_eyebrow">Or reach me directly through</p>
          <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap">

            <a href="mailto:zefanya.kharisma@croissantsmoon.com" class="ct-link-card">
              <div class="ct-link-icon">
                <i data-lucide="mail" style="width:20px;height:20px;color:#6FA8FF"></i>
              </div>
              <span style="font-family:'Outfit',sans-serif;font-size:.7rem;font-weight:500;color:#8FA8D6">Email</span>
            </a>

            <a href="https://www.linkedin.com/in/zefanyakharisma" target="_blank" rel="noopener noreferrer" class="ct-link-card">
              <div class="ct-link-icon" style="background:rgba(212,177,90,0.08);border-color:rgba(212,177,90,0.2)">
                <i data-lucide="linkedin" style="width:20px;height:20px;color:#D4B15A"></i>
              </div>
              <span style="font-family:'Outfit',sans-serif;font-size:.7rem;font-weight:500;color:#8FA8D6">LinkedIn</span>
            </a>

            <a href="https://wa.me/6282139619570" target="_blank" rel="noopener noreferrer" class="ct-link-card">
              <div class="ct-link-icon" style="background:rgba(111,255,140,0.07);border-color:rgba(111,255,140,0.18)">
                <i data-lucide="message-circle" style="width:20px;height:20px;color:#6FD88A"></i>
              </div>
              <span style="font-family:'Outfit',sans-serif;font-size:.7rem;font-weight:500;color:#8FA8D6">WhatsApp</span>
            </a>

            <div class="ct-link-card" style="cursor:default">
              <div class="ct-link-icon" style="background:rgba(217,230,255,0.06);border-color:rgba(217,230,255,0.12)">
                <i data-lucide="map-pin" style="width:20px;height:20px;color:#8FA8D6"></i>
              </div>
              <span style="font-family:'Outfit',sans-serif;font-size:.68rem;font-weight:500;color:#8FA8D6;text-align:center;line-height:1.4">Surabaya<br>East Java, ID</span>
            </div>

          </div>
        </div>

        <!-- Response time -->
        <div class="ct-reveal" style="
          text-align:center;padding:16px 24px;border-radius:14px;
          background:rgba(212,177,90,0.06);
          border:1px solid rgba(212,177,90,0.14)
        ">
          <p style="font-family:'Outfit',sans-serif;font-size:.82rem;color:#8FA8D6;
            display:flex;align-items:center;justify-content:center;gap:8px">
            <i data-lucide="clock" style="width:14px;height:14px;color:#D4B15A;flex-shrink:0"></i>
            <span data-edit-key="contact_response_time">I typically respond within 24–48 hours.</span>
          </p>
        </div>

      </div>
    </div>`;

  // Inject glow pulse keyframe alongside existing CSS
  if (!document.getElementById('ct-glow-kf')) {
    const kf = document.createElement('style');
    kf.id = 'ct-glow-kf';
    kf.textContent = `@keyframes ctGlowPulse {
      0%,100%{box-shadow:0 0 28px rgba(212,177,90,0.35),0 4px 18px rgba(212,177,90,0.2)}
      50%{box-shadow:0 0 44px rgba(212,177,90,0.55),0 4px 28px rgba(212,177,90,0.32)}
    }`;
    document.head.appendChild(kf);
  }

  if (window.lucide) lucide.createIcons();

  // Scroll reveal
  setTimeout(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('ct-visible'), i * 80);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.06 });
    document.querySelectorAll('#page-contact .ct-reveal').forEach(el => obs.observe(el));
  }, 60);

  var form = document.getElementById('contact-form');
  if (!form) return;

  function setFieldError(inputId, errorId, message) {
    var input = document.getElementById(inputId);
    var errEl = document.getElementById(errorId);
    if (!input || !errEl) return;
    if (message) {
      input.setAttribute('aria-invalid', 'true');
      input.classList.add('input-error');
      errEl.textContent = message;
      errEl.classList.remove('hidden');
    } else {
      input.removeAttribute('aria-invalid');
      input.classList.remove('input-error');
      errEl.textContent = '';
      errEl.classList.add('hidden');
    }
  }

  function clearAllErrors() {
    [['cf-name','cf-name-err'],['cf-email','cf-email-err'],['cf-subject','cf-subject-err'],['cf-msg','cf-msg-err']].forEach(function(pair) {
      setFieldError(pair[0], pair[1], '');
    });
    var msg = document.getElementById('form-msg');
    if (msg) msg.classList.add('hidden');
  }

  // Inline error elements
  ['cf-name','cf-email','cf-subject','cf-msg'].forEach(function(id) {
    var input = document.getElementById(id);
    if (!input) return;
    var errId = id + '-err';
    var errEl = document.createElement('p');
    errEl.id = errId;
    errEl.className = 'hidden';
    errEl.style.cssText = 'font-family:\'Outfit\',sans-serif;font-size:.72rem;margin-top:5px;font-weight:500;color:rgba(220,80,80,0.85)';
    errEl.setAttribute('aria-live', 'polite');
    input.setAttribute('aria-describedby', errId);
    input.parentElement.appendChild(errEl);
  });

  function setMsg(text, kind) {
    var msg = document.getElementById('form-msg');
    msg.textContent = text;
    msg.style.color = kind === 'error'
      ? 'rgba(220,80,80,0.85)'
      : (kind === 'success' ? '#6FD88A' : '#8FA8D6');
    msg.classList.remove('hidden');
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    clearAllErrors();

    var nameEl    = document.getElementById('cf-name');
    var emailEl   = document.getElementById('cf-email');
    var subjectEl = document.getElementById('cf-subject');
    var msgEl     = document.getElementById('cf-msg');
    var btn       = document.getElementById('cf-submit');
    var label     = document.getElementById('cf-submit-label');

    var name    = nameEl.value.trim();
    var email   = emailEl.value.trim();
    var subject = subjectEl.value.trim();
    var message = msgEl.value.trim();

    var hasError = false;
    if (!name)    { setFieldError('cf-name',    'cf-name-err',    'Please enter your name.');            hasError = true; }
    if (!email)   { setFieldError('cf-email',   'cf-email-err',   'Please enter your email address.');   hasError = true; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    setFieldError('cf-email',   'cf-email-err',   'Please enter a valid email address.'); hasError = true; }
    if (!subject) { setFieldError('cf-subject', 'cf-subject-err', 'Please enter a subject.');             hasError = true; }
    if (!message) { setFieldError('cf-msg',     'cf-msg-err',     'Please enter a message.');             hasError = true; }

    if (hasError) {
      var firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    var endpoint = _getFormspreeEndpoint();

    if (!endpoint || endpoint.indexOf('YOUR_FORM_ID') !== -1) {
      var mailto = 'mailto:zefanya.kharisma@croissantsmoon.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent('From: ' + name + ' <' + email + '>\n\n' + message);
      window.open(mailto);
      setMsg('Opening your email client…', 'neutral');
      return;
    }

    btn.disabled = true;
    if (label) label.textContent = 'Sending…';

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, email: email, subject: subject, message: message })
    })
      .then(function(res) {
        if (res.ok) {
          setMsg('Message sent — I\'ll get back to you within 24–48 hours.', 'success');
          form.reset();
          clearAllErrors();
        } else {
          throw new Error('Submission failed');
        }
      })
      .catch(function(err) {
        setMsg('Couldn\'t send right now — please email zefanya.kharisma@croissantsmoon.com directly.', 'error');
        console.error('Contact form error:', err);
      })
      .finally(function() {
        btn.disabled = false;
        if (label) label.textContent = 'Send Message';
      });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  contactInitPage();
});
