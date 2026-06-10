import type { CMLandingContent } from '@/types'
import { LANDING_DEFAULTS } from './landing-defaults'

// ─────────────────────────────────────────────────────────────────
// Indonesian copy for the public /croissantsmoon landing page.
// Shown when the visitor flips the EN/ID toggle. Structural fields
// (meta, hrefs, icons, image folders, tech-stack pills, prices, proper
// nouns) are inherited from LANDING_DEFAULTS so they stay in sync; only
// human-readable copy is translated here.
// ─────────────────────────────────────────────────────────────────

export const LANDING_DEFAULTS_ID: CMLandingContent = {
  meta: LANDING_DEFAULTS.meta,

  hero: {
    eyebrow: 'Studio Celestial · Kehadiran Digital yang Dirancang dengan Sengaja',
    titleLine1: 'Kehadiran digital,',
    titleLine2: 'dirancang dengan sengaja.',
    subtitle:
      'Pengembangan web, sistem dashboard, dan identitas visual untuk organisasi yang punya makna.',
    primaryCta: { label: 'Minta Proposal', href: LANDING_DEFAULTS.hero.primaryCta.href },
    ghostCta: { label: 'Lihat Karya Kami', href: LANDING_DEFAULTS.hero.ghostCta.href },
    trust: 'Berbasis di Surabaya · Melayani seluruh Indonesia',
    wordmark: LANDING_DEFAULTS.hero.wordmark,
  },

  services: {
    label: 'Yang Kami Bangun',
    heading: 'Tiga cara kami merancang kehadiran Anda.',
    items: [
      {
        ...LANDING_DEFAULTS.services.items[0], name: 'Pengembangan Web',
        desc: 'Landing page, website institusi, dan aplikasi web — dibangun dengan Next.js, Tailwind, dan Supabase.',
        price: 'Mulai Rp 2.5jt',
      },
      {
        ...LANDING_DEFAULTS.services.items[1], name: 'Dashboard & Data',
        desc: 'Dashboard operasional dan platform internal untuk organisasi yang butuh kejernihan dalam datanya.',
        price: 'Mulai Rp 8jt',
      },
      {
        ...LANDING_DEFAULTS.services.items[2], name: 'Identitas Visual',
        desc: 'Sistem branding, materi institusi, dan desain komunikasi untuk organisasi yang ingin diingat.',
        price: 'Sesuai permintaan',
      },
    ],
  },

  projects: {
    label: 'Karya Pilihan',
    heading: 'Proyek unggulan.',
    viewAll: { label: 'Lihat Semua Proyek', href: LANDING_DEFAULTS.projects.viewAll.href },
    items: [
      {
        ...LANDING_DEFAULTS.projects.items[0], cat: 'Institusi · Aplikasi Web',
        desc: 'Platform kantor internasional lengkap dengan CMS berita, direktori kemitraan, program inbound & outbound. Mobile-first.',
      },
      {
        ...LANDING_DEFAULTS.projects.items[1], cat: 'Data · Dashboard',
        desc: 'Dashboard interaktif yang memvisualisasikan kemitraan institusi — mesin alur kerja, analitik, arsip.',
      },
      {
        ...LANDING_DEFAULTS.projects.items[2], cat: 'Portofolio · SPA',
        desc: 'Portofolio satu halaman bergaya editorial premium — vanilla JS, Tailwind, Supabase, dan Formspree.',
      },
      {
        ...LANDING_DEFAULTS.projects.items[3], cat: 'Data · Dashboard',
        desc: 'Platform penemuan dan pengelolaan hibah — lini masa tenggat, pembaruan realtime, suite admin.',
      },
    ],
  },

  proof: {
    label: 'Karya Terpercaya',
    heading: 'Apa kata klien.',
    items: [
      {
        ...LANDING_DEFAULTS.proof.items[0],
        quote: 'Dashboard yang mereka bangun mengubah cara kami mengelola data kemitraan. Yang dulu berjam-jam di spreadsheet kini cukup beberapa menit.',
        who: 'Staf International Office, Universitas Kristen Petra',
      },
      {
        ...LANDING_DEFAULTS.proof.items[1],
        quote: 'CroissantsMoon memberikan persis yang kami butuhkan — situs berkelas dunia namun dibangun untuk audiens kami yang sebenarnya.',
        who: 'Klien, Institusi Pendidikan',
      },
    ],
    stats: [
      { ...LANDING_DEFAULTS.proof.stats[0], label: 'Proyek Diselesaikan' },
      { ...LANDING_DEFAULTS.proof.stats[1], label: 'Klien Institusi' },
      { ...LANDING_DEFAULTS.proof.stats[2], label: 'Lini Layanan' },
      { ...LANDING_DEFAULTS.proof.stats[3], label: 'Studio Berdiri' },
    ],
  },

  process: {
    label: 'Cara Kerjanya',
    heading: 'Dari audit pertama hingga perawatan jangka panjang.',
    items: [
      { ...LANDING_DEFAULTS.process.items[0], name: 'Telusuri', text: 'Kami mengaudit kehadiran digital Anda dan menemukan persis apa yang menghambat.' },
      { ...LANDING_DEFAULTS.process.items[1], name: 'Usulkan', text: 'Anda menerima prototipe khusus dan proposal transparan — sebelum ada komitmen apa pun.' },
      { ...LANDING_DEFAULTS.process.items[2], name: 'Sepakati', text: 'Kami sepakati ruang lingkup, lini masa, dan pembayaran. Tanpa kejutan, selamanya.' },
      { ...LANDING_DEFAULTS.process.items[3], name: 'Bangun', text: 'Desain, pengembangan, QA, dan deployment — ditangani dari awal hingga akhir.' },
      { ...LANDING_DEFAULTS.process.items[4], name: 'Rawat', text: 'Pilih retainer atau serah terima dengan dokumentasi lengkap. Anda tak pernah ditinggalkan.' },
    ],
  },

  pricing: {
    label: 'Harga',
    heading: 'Tingkatan transparan. Tanpa kejutan.',
    foundingNote: 'tersedia untuk 10 klien pertama. Kunci diskon 50% dari tarif standar untuk proyek pertama Anda.',
    foundingCta: { label: 'Cek Ketersediaan', href: LANDING_DEFAULTS.pricing.foundingCta.href },
    paymentTerms: 'Ketentuan pembayaran: 50% di muka · 25% pertengahan · 25% saat peluncuran',
    items: [
      {
        ...LANDING_DEFAULTS.pricing.items[0], name: 'Landing — Basic', timeline: '2–3 hari',
        note: 'Tarif Perdana · Rp 5jt standar',
        features: ['Tata letak 1 halaman modern & bersih', 'Responsif mobile + desktop', 'Formulir kontak (kirim email)', 'Setup domain + SSL', 'Deployment Vercel', '1 ronde revisi'],
      },
      {
        ...LANDING_DEFAULTS.pricing.items[1], name: 'Landing — Pro', timeline: '4–6 hari',
        note: 'Tarif Perdana · Rp 7jt standar',
        features: ['Landing page multi-bagian', 'Animasi & interaksi khusus', 'Integrasi CMS (blog/berita)', 'Optimasi SEO', 'Setup analitik', '2 ronde revisi'],
      },
      {
        ...LANDING_DEFAULTS.pricing.items[2], name: 'Website Organisasi', timeline: '2–3 minggu',
        note: 'Tarif Perdana · Rp 12jt standar',
        features: ['Website multi-halaman penuh', 'Dashboard admin', 'Backend Supabase + autentikasi', 'Direktori kemitraan/program', 'Mobile-first, sadar WCAG', '3 ronde revisi'],
      },
      {
        ...LANDING_DEFAULTS.pricing.items[3], name: 'Sistem Dashboard', timeline: '3–4 minggu',
        note: 'Tarif Perdana · Rp 18jt standar',
        features: ['Dashboard data + analitik', 'Kontrol akses berbasis peran', 'Data real-time (Supabase)', 'Fitur ekspor + pelaporan', 'Antarmuka admin', 'Opsi pemeliharaan berkelanjutan'],
      },
    ],
  },

  demos: {
    label: 'Pengalaman Demo',
    heading: 'Rasakan kualitasnya sebelum berkomitmen.',
    discussLabel: 'Diskusikan Proyek Ini',
    items: [
      {
        ...LANDING_DEFAULTS.demos.items[0], cat: 'Personal · Portofolio', title: 'Sistem Portofolio Premium',
        desc: 'Platform identitas digital yang menonjolkan narasi untuk kreatif dan profesional internasional. Setiap elemen — dari tipografi hingga gerak — menceritakan kisah Anda.',
        tags: ['Desain Editorial', 'CMS Portofolio', 'Branding Personal', 'Motion'],
        links: [{ label: 'Lihat Demo Langsung', href: LANDING_DEFAULTS.demos.items[0].links[0].href }],
      },
      {
        ...LANDING_DEFAULTS.demos.items[1], cat: 'Institusi · Internasional', title: 'Platform International Office',
        desc: 'Platform digital canggih untuk universitas. Dilengkapi direktori kemitraan, sistem onboarding mahasiswa, dan papan pengumuman global.',
        tags: ['Direktori Kemitraan', 'Onboarding Mahasiswa', 'Program Mobilitas'],
        links: [{ label: 'Lihat Demo Langsung', href: LANDING_DEFAULTS.demos.items[1].links[0].href }],
      },
      {
        ...LANDING_DEFAULTS.demos.items[2], cat: 'Data · Operasional', title: 'Sistem Dashboard Modern',
        desc: 'Platform internal premium untuk organisasi yang butuh kejernihan di tengah kompleksitas. Analitik, pengelolaan alur kerja, dan antarmuka admin.',
        tags: ['Dashboard Analitik', 'Mesin Alur Kerja', 'Antarmuka Admin'],
        links: [
          { label: 'Demo Dashboard Kemitraan', href: LANDING_DEFAULTS.demos.items[2].links[0].href },
          { label: 'Demo Dashboard Hibah', href: LANDING_DEFAULTS.demos.items[2].links[1].href },
        ],
      },
    ],
  },

  designs: {
    label: 'Identitas Visual',
    heading: 'Karya desain, melampaui layar.',
    imageBase: LANDING_DEFAULTS.designs.imageBase,
    viewAll: { label: 'Lihat Semua Karya Desain', href: LANDING_DEFAULTS.designs.viewAll.href },
    items: [
      { ...LANDING_DEFAULTS.designs.items[0], title: 'Presentasi AERO 2025', cat: 'Materi Acara', inst: 'Universitas Airlangga' },
      { ...LANDING_DEFAULTS.designs.items[1], title: 'Panduan Akomodasi Airlangga', cat: 'Cetak & Digital', inst: 'Universitas Airlangga' },
      { ...LANDING_DEFAULTS.designs.items[2], title: 'Panduan Mahasiswa Internasional Airlangga', cat: 'Kit Media Sosial', inst: 'Universitas Airlangga' },
    ],
  },

  finalCta: {
    label: 'Mari Berkolaborasi',
    heading: 'Mari bangun sesuatu yang bertahan.',
    subtitle:
      'Baik Anda butuh website, dashboard, atau identitas merek — CroissantsMoon terbuka untuk proyek baru.',
    primaryCta: { label: 'Minta Proposal', href: LANDING_DEFAULTS.finalCta.primaryCta.href },
    ghostLabel: 'Mulai Percakapan',
  },

  footer: {
    brand: LANDING_DEFAULTS.footer.brand,
    links: LANDING_DEFAULTS.footer.links,
    copyright: LANDING_DEFAULTS.footer.copyright,
    location: 'Surabaya, Indonesia',
  },
}
