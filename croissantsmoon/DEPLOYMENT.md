# CroissantsMoon — Deployment Guide

## Architecture

```
zefanyakharisma.com/croissantsmoon  →  Vercel (Next.js, basePath=/croissantsmoon)
                                        Supabase (PostgreSQL + Auth + Storage)
```

---

## 1. Supabase Setup

1. Create a new Supabase project at https://supabase.com
2. Open **SQL Editor** → paste the entire contents of `supabase/schema.sql` → **Run**
3. Go to **Authentication → Providers** → ensure Email is enabled
4. Create admin user: **Authentication → Users → Invite User** (use your email)
5. Go to **Project Settings → API** and copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (never expose publicly)
6. Set Auth redirect URL: **Authentication → URL Configuration**
   - Site URL: `https://zefanyakharisma.com`
   - Redirect URLs: `https://zefanyakharisma.com/croissantsmoon/api/auth/callback`

---

## 2. Vercel Deployment

### Option A: Deploy from this folder

```bash
cd croissantsmoon
npm install
vercel
```

### Option B: Connect GitHub

1. Push this repo to GitHub
2. Import to Vercel at https://vercel.com/new
3. Set **Root Directory** to `croissantsmoon`
4. Set environment variables (see section 3)
5. Deploy

### Required Vercel Settings

- **Framework**: Next.js
- **Root Directory**: `croissantsmoon`
- **Build Command**: `next build`
- **Output Directory**: `.next`

---

## 3. Environment Variables

Set these in Vercel → Project → Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_BASE_PATH=/croissantsmoon
NEXT_PUBLIC_SITE_URL=https://zefanyakharisma.com
ADMIN_EMAIL=your-admin-email@example.com
TOKEN_SECRET=your-32-char-random-secret
```

---

## 4. Domain Routing

### If using Vercel for zefanyakharisma.com:

Add a rewrite in your root `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/croissantsmoon/:path*", "destination": "https://your-cm-deployment.vercel.app/croissantsmoon/:path*" }
  ]
}
```

### If using GitHub Pages for main site:

Deploy CroissantsMoon to `cm.zefanyakharisma.com` and update the main site nav link.

Or use Cloudflare Workers/Pages as a proxy.

---

## 5. Post-Deployment Checklist

- [ ] Admin login works at `/croissantsmoon/login`
- [ ] Dashboard loads at `/croissantsmoon/dashboard`
- [ ] Create a test lead
- [ ] Create a test proposal
- [ ] Token gate works at `/croissantsmoon/proposal/[slug]`
- [ ] Analytics events are recorded in Supabase
- [ ] Proposal pages return `X-Robots-Tag: noindex`

---

## 6. Local Development

```bash
cd croissantsmoon
cp .env.example .env.local
# fill in .env.local with your Supabase credentials
npm install
npm run dev
# open http://localhost:3001/croissantsmoon
```
