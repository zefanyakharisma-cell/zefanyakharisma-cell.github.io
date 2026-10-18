# Implementation Plan: entrance animations missing on first visit

## Overview
On a first visit, the hero entrance animations seem not to play; after a refresh they do. The animation system itself works: on a cold first load the motion flag is set, every animation runs, and the scroll reveals attach. The real problem is **timing**. The animations start at first paint, but the images they animate haven't downloaded yet.

## Evidence (production build, throttled ~4 Mbps, cold cache vs reload)

| Page | First paint | Hero photos arrive | Fonts arrive | On reload |
|---|---|---|---|---|
| `/` | 632 ms | 1511 ms | ~740 ms | everything by ~170 ms |
| `/about-overview` | 616 ms | 1493 ms | ~720 ms | ~160 ms |
| `/amerta` | 656 ms | 1106 ms | ~670 ms | ~180 ms |

Screenshots of `/` on a first visit:
- **0.7 s:** the text is fading in, but the portrait frame is an empty grey box and the background photo is missing.
- **~1.7 s:** the background photo appears all at once, because its 1.4 s `photo-in` fade has already ended.

On a reload everything is cached, so the photos fade in along with the text.

On the live site the gap is likely bigger: on a phone connection, and when Vercel's image optimiser hasn't cached a size yet, it can take longer to produce the image.

**Root cause:** the CSS animations (`page-enter`, `hero-in`, `photo-in`, `art-in`) start as soon as the stylesheet applies. They never wait for the images they are animating, so on a cold load an animation runs on an empty box and the image just pops in afterwards. The images are already loaded with `priority`, so loading them sooner can't close the gap on its own.

## Fix

### Step 1: Animate hero images only once they have loaded (main fix)
- **`components/pcu/MotionObserver.tsx`:** extend the existing inline script that sets the motion flag before first paint. It will add one listener on `document` that catches every image `load` and `error` event. The listener adds an `is-loaded` class to the image, and to its hero art container if it has one.
  - The script runs before the hero `<img>` tags are parsed, so it catches their first load.
  - It also covers images added after client-side navigation.
  - Images that are already complete (cached) are marked straight away.
- **`app/globals.css`:**
  - `.hero-photo` and the portrait inside `.hero-art` stay hidden until they have the `is-loaded` class, and then play `photo-in` / `art-in`.
  - The text (`hero-seq`) still animates at first paint, so the page never waits on an image to show text.
- **Fallbacks:**
  - `error` also counts as loaded, so a broken image never stays invisible.
  - A safety timeout of about 2.5 s marks any image still pending, so it shows anyway.
  - With JavaScript off, or with reduced motion, there is no motion flag, so nothing is ever hidden. That is the same as today.

### Step 2: Match the text to the loaded font (small)
- The fonts arrive about 100 ms into the text animation, so the text can change font mid-animation. `next/font` already provides a size-matched fallback font, so the shift is small.
- **Option:** hold back only the hero text animation until `document.fonts.ready`, capped at 300 ms, then play it.
- This is optional. I'd leave it out unless the jump is noticeable after step 1.

### Step 3: Count-up numbers (check only)
- The numbers in the stat tiles start counting when they scroll into view, after the page's JavaScript has started. On a first visit that happens later, about 1.3 s on `/`. Until then the final number is shown, then it drops to 0 and counts back up.
- **Action:** confirm in the browser test whether this looks wrong. If it does, start them from 0 without a visible jump. No code change is planned unless the test shows the problem.

## Files
- `components/pcu/MotionObserver.tsx`: image-load listener in the inline script.
- `app/globals.css`: hold the hero photo and portrait until `is-loaded`.
- Possibly `app/(portfolio)/page.tsx` and `about-overview/page.tsx`: tag the portrait wrappers, if the selectors need it.

## Testing
- Re-run the same headless test, cold cache and throttled, on `/`, `/about-overview`, `/amerta` and `/contact`.
  - **Expected:** the background photo and the portrait fade in after they arrive (non-zero opacity, with an animation running once loaded), with no pop-in.
- **Reload:** unchanged; everything fades in together.
- **Client-side navigation** (header links): each page's hero images still animate.
- **Reduced motion and JavaScript off:** everything visible immediately.
- **Broken image URL:** still shown, or hidden cleanly, within the timeout.
- `npm run lint`, `tsc` and `npm run build` all pass; pages stay static.

## Risks
- **Hiding images until they load:** if the listener ever failed, an image could stay hidden. The error handler and the 2.5 s fallback cover this.
- **The inline script must stay tiny and run before hydration.** It joins the existing pre-paint script, so it adds no new request.

## Result (implemented)
- **Step 1:** hero photo and portrait entrances start paused (`data-img-wait`) and are played on the image's `load` or `error` event. After a client-side navigation, the page scan plays images that are already complete. A safety timeout of 2.5 s releases any image that never loads. No attributes on React-rendered elements are changed.
- **Step 2:** the hero text waits for the Inter font, capped at 300 ms (`data-font-wait`). Only the first font family is passed to `fonts.load()`, because a failing fallback font in the list made it reject at once.
- **Step 3:** confirmed: on a slow first load the hero stats showed their final value, then dropped to 0. Now a server-rendered number that has been on screen for more than 300 ms before hydration stays at its value. Numbers scrolled into view later, numbers after a client-side navigation, and numbers on a fast reload still count up. Also fixed: an occasional "-0" on the first frame.
- **Verified** with headless Chromium on a production build, cold and throttled:
  - `/`, `/about-overview`, `/contact` and `/amerta` on first visit and on reload
  - client-side navigation
  - reduced motion
  - a broken image and a stalled image
  - lint, tsc and build pass, and the pages stay static
- **Found while testing; existing behaviour, not changed:** with JavaScript disabled, pages show only the `loading.tsx` loader. The prerendered content is streamed into a hidden element that an inline script swaps in.
