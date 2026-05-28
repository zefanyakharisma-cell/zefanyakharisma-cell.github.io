'use client'
import { useState, useEffect, useRef } from 'react'

type Vendor = { category: string; name: string; desc: string; batch?: string }
type Nat = { country: string; flag: string; count: number }
type Prog = { name: string; count: number; color: string }
type Gender = { M: number; F: number; note?: string } | null
type SatCriterion = { label: string; score: number; max: number }
type Sat = { scale: string; n: number; overall: number; max: number; criteria: SatCriterion[]; note?: string } | null
type SatBatch = { label: string; overall: number; max: number; pct: number; n: number }
type AllSat = { scale: string; note: string; batches: SatBatch[] }
type Analysis = { icon: string; text: string }
type BudgetCat = { name: string; amount: number; color: string }
type BudgetBatch = { label: string; spent: number; budget: number | null }

type Batch = {
  label: string; period: string; color: string; bg: string; border: string
  participants?: number; batches?: number; countries?: number; locations?: number
  sublabel?: string; location?: string
  vendors?: Vendor[]; activities?: string[]
  budgetTotal: number; budgetAlloc?: number | null; budgetCategories: BudgetCat[]
  budgetBatches?: BudgetBatch[]; budgetNote?: string
  nationalities: Nat[]; natNote?: string
  programs: Prog[]
  gender: Gender
  satisfaction: Sat | AllSat
  analysis: Analysis[]
}

const ALL_VENDORS: (Vendor & { batch: string })[] = [
  { batch: '2024 Malang',    name: 'Hotel 38frontone Batu',     category: 'Hotel',  desc: 'Both 2024 & 2025 Malang batches used this same hotel, reflecting ongoing vendor partnership.' },
  { batch: '2024 Malang',    name: 'Kebun Raya Purwodadi',       category: 'Venue',  desc: 'Botanical garden with tour + planting class. Used in 2024; replaced by Pujon Kidul in 2025.' },
  { batch: '2024 & 2025',    name: 'Kaliandra Adventure (Batu)', category: 'Venue',  desc: 'Jeep adventure used in both Malang batches (2024 & 2025). Core outdoor experience.' },
  { batch: '2025 Malang',    name: 'Desa Wisata Pujon Kidul',    category: 'Venue',  desc: 'Replaced Kebun Raya in 2025 — more interactive farming & eco-tourism village.' },
  { batch: '2025 Solo',      name: 'Pura Mangkunegaran',          category: 'Venue',  desc: 'Royal Javanese palace in Solo — introduced Javanese court culture to AMERTA XXIII batch.' },
  { batch: '2025 Solo',      name: 'Kampung Batik Laweyan',       category: 'Venue',  desc: 'Historic batik village — hands-on traditional textile craft experience.' },
  { batch: '2025 Solo',      name: 'Jeep Kemuning',               category: 'Venue',  desc: 'Jeep + tubing through Kemuning tea plantation. Solo\'s equivalent of Kaliandra adventure.' },
  { batch: '2025 Mojokerto', name: 'Museum Trowulan',              category: 'Venue',  desc: 'Free Majapahit museum. Zero-cost heritage experience for 72 attendees.' },
  { batch: '2025 Mojokerto', name: 'Desa Wisata Bejijong',         category: 'Venue',  desc: 'Traditional Majapahit craft village with community cultural activities.' },
  { batch: '2025 Mojokerto', name: 'Coklat Majapahit',             category: 'Venue',  desc: 'Chocolate workshop inspired by Majapahit cacao trade — unique experiential activity.' },
  { batch: 'All Batches',    name: 'Laritta',                     category: 'Food',   desc: 'Recurring catering vendor across all 4 batches. Reliable large-group food service partner.' },
  { batch: '2024–2025',      name: 'Cititex',                     category: 'Shirts', desc: 'Custom program shirt vendor for 2025 batches (Solo & Mojokerto).' },
  { batch: '2025 Solo',      name: 'Zest Hotel Surakarta',         category: 'Hotel',  desc: 'Central Solo hotel for Batch 2.1. City-center location enabled walkable access to Mangkunegaran.' },
  { batch: '2025 Mojokerto', name: 'Hotel Royal Tretes',           category: 'Hotel',  desc: 'Mountain resort hotel in Trawas area for Batch 2.2. Scenic highland setting.' },
]

const DATA: Record<string, Batch> = {
  all: {
    label: 'All Batches', period: '2024 – 2025', participants: 191, batches: 4, countries: 25, locations: 3,
    color: '#4A5235', bg: 'linear-gradient(135deg,#F1F3EE,#E4E8DC)', border: 'rgba(74,82,53,0.15)',
    budgetTotal: 236566376, budgetNote: 'Combined realization across 4 batches. Batch 1 2025 budget is estimated from line items.',
    budgetCategories: [
      { name: 'Activities/Events', amount: 97134000, color: '#4A5235' }, { name: 'Accommodation', amount: 60760000, color: '#2563EB' },
      { name: 'Transport', amount: 37501000, color: '#F97316' }, { name: 'Food & Beverages', amount: 26479000, color: '#8B5CF6' },
      { name: 'Consumables/Shirts', amount: 14363576, color: '#EC4899' }, { name: 'Emergency', amount: 2230000, color: '#64748B' },
    ],
    budgetBatches: [
      { label: '2024 B1 Malang', spent: 95359000, budget: 111000000 },
      { label: '2025 B1 Malang', spent: 50800200, budget: null },
      { label: '2025 B2.1 Solo', spent: 44447176, budget: 60899800 },
      { label: '2025 B2.2 Mojokerto', spent: 45360000, budget: null },
    ],
    nationalities: [
      { country: 'Malaysia', flag: '🇲🇾', count: 77 }, { country: 'Philippines', flag: '🇵🇭', count: 11 },
      { country: 'Pakistan', flag: '🇵🇰', count: 11 }, { country: 'Timor-Leste', flag: '🇹🇱', count: 8 },
      { country: 'Yemen', flag: '🇾🇪', count: 6 }, { country: 'Netherlands', flag: '🇳🇱', count: 5 },
      { country: 'Brunei', flag: '🇧🇳', count: 5 }, { country: 'Australia', flag: '🇦🇺', count: 4 },
      { country: 'Poland', flag: '🇵🇱', count: 4 }, { country: 'Sierra Leone', flag: '🇸🇱', count: 3 },
      { country: 'Germany', flag: '🇩🇪', count: 3 }, { country: 'Bangladesh', flag: '🇧🇩', count: 2 },
      { country: 'Belgium', flag: '🇧🇪', count: 2 }, { country: 'France', flag: '🇫🇷', count: 2 },
      { country: 'Myanmar', flag: '🇲🇲', count: 2 }, { country: 'Afghanistan', flag: '🇦🇫', count: 2 },
      { country: 'Nigeria', flag: '🇳🇬', count: 2 }, { country: 'United Kingdom', flag: '🇬🇧', count: 1 },
      { country: 'Indonesia', flag: '🇮🇩', count: 1 }, { country: 'Belarus', flag: '🇧🇾', count: 1 },
      { country: 'Kenya', flag: '🇰🇪', count: 1 }, { country: 'Gambia', flag: '🇬🇲', count: 1 },
      { country: 'Others', flag: '🌍', count: 8 },
    ],
    natNote: 'Nationality data is fully available for 3 of 4 batches (144 participants). ACI 2025 Batch 1 has partial data due to spreadsheet formula errors; Malaysia (19 via IUP program) is confirmed.',
    programs: [
      { name: 'AMERTA Exchange', count: 97, color: '#2563EB' }, { name: 'Regular IUP', count: 19, color: '#4A5235' },
      { name: 'ADS (Airlangga Darmasiswa)', count: 19, color: '#F97316' }, { name: 'KNB (Kemitraan Negara Berkembang)', count: 25, color: '#8B5CF6' },
      { name: 'TIAS (TIAS Program)', count: 9, color: '#EC4899' }, { name: 'DARMASISWA / Other', count: 3, color: '#64748B' },
    ],
    gender: { M: 53, F: 79, note: 'Gender data available for 132 participants across 3 batches.' },
    satisfaction: {
      scale: 'mixed', note: '2024 used a 1–10 scale; 2025 used a 1–4 scale. Scores converted to percentage for comparison.',
      batches: [
        { label: '2024 B1 Malang (1–10)', overall: 8.58, max: 10, pct: 85.8, n: 19 },
        { label: '2025 B1 Malang (1–4)', overall: 3.79, max: 4, pct: 94.8, n: 61 },
        { label: '2025 B2.1 Solo (1–4)', overall: 3.96, max: 4, pct: 99.0, n: 24 },
        { label: '2025 B2.2 Mojokerto (1–4)', overall: 3.50, max: 4, pct: 87.5, n: 12 },
      ],
    },
    analysis: [
      { icon: '👥', text: 'Across 4 batches (2024–2025), ACI reached <strong>191 participants from 25+ countries</strong> across 3 destinations: Malang, Solo, and Mojokerto.' },
      { icon: '🇲🇾', text: '<strong>Malaysian students dominate</strong> ACI enrollment (~40%), primarily from AMERTA and IUP programs — reflecting a strong bilateral academic partnership with Malaysian universities.' },
      { icon: '🌍', text: 'Batch 2.2 Mojokerto featured the <strong>most diverse nationalities</strong> (12 countries) with strong representation from Africa, the Pacific, and Southeast Asia.' },
      { icon: '📈', text: '<strong>Satisfaction consistently high</strong> across all batches — ranging from 85.8% (2024) to 99% (2025 B2.1 Solo), with the Solo batch achieving near-perfect scores.' },
      { icon: '💰', text: 'Total program cost of <strong>IDR 236M across 4 batches</strong> averages IDR 1.24M per participant — demonstrating cost-efficient cultural immersion at scale.' },
    ],
  },
  b1_2024: {
    label: 'ACI 2024', sublabel: 'Batch 1 – Malang', period: '4–5 May 2024', location: 'Malang & Batu, East Java', participants: 55,
    color: '#2563EB', bg: 'linear-gradient(135deg,#EFF6FF,#DBEAFE)', border: 'rgba(37,99,235,0.15)',
    vendors: [
      { category: 'Hotel', name: 'Hotel 38frontone, Batu', desc: 'Accommodation for participants during the 2-night program stay in Batu.' },
      { category: 'Venue', name: 'Kebun Raya Purwodadi', desc: 'Botanical garden visit with guided tour, plant science class, and planting workshop — Day 1 cultural activity.' },
      { category: 'Venue', name: 'Kaliandra Batu Adventure', desc: 'Jeep off-road adventure through the Batu highlands — highlight activity of Day 2.' },
      { category: 'Food', name: 'Laritta', desc: 'Catering for group meals throughout the program.' },
      { category: 'Food', name: 'RM Joglo Batu', desc: 'Traditional Javanese restaurant for evening dinner experience in Batu.' },
    ],
    activities: [
      'Guided botanical tour at Kebun Raya Purwodadi with plant science & planting class',
      'Jeep off-road adventure through Batu highlands (Kaliandra Adventure)',
      'Group cultural dinner at traditional Javanese restaurant (Joglo Batu)',
      'Overnight stay with social bonding activities between participants',
    ],
    budgetTotal: 95359000, budgetAlloc: 111000000,
    budgetCategories: [
      { name: 'Transport (Bus)', amount: 31191000, color: '#F97316' }, { name: 'Activities/Events', amount: 30094000, color: '#4A5235' },
      { name: 'Accommodation', amount: 19200000, color: '#2563EB' }, { name: 'Food & Beverages', amount: 7150000, color: '#8B5CF6' },
      { name: 'Consumables', amount: 5494000, color: '#EC4899' }, { name: 'Emergency', amount: 2230000, color: '#64748B' },
    ],
    nationalities: [
      { country: 'Malaysia', flag: '🇲🇾', count: 16 }, { country: 'Poland', flag: '🇵🇱', count: 4 },
      { country: 'Netherlands', flag: '🇳🇱', count: 4 }, { country: 'Yemen', flag: '🇾🇪', count: 3 },
      { country: 'Sierra Leone', flag: '🇸🇱', count: 3 }, { country: 'Timor-Leste', flag: '🇹🇱', count: 3 },
      { country: 'Pakistan', flag: '🇵🇰', count: 3 }, { country: 'Myanmar', flag: '🇲🇲', count: 2 },
      { country: 'Afghanistan', flag: '🇦🇫', count: 2 }, { country: 'Brunei', flag: '🇧🇳', count: 2 },
      { country: 'Belgium', flag: '🇧🇪', count: 2 }, { country: 'France', flag: '🇫🇷', count: 2 },
      { country: 'Gambia', flag: '🇬🇲', count: 1 }, { country: 'Indonesia', flag: '🇮🇩', count: 1 },
      { country: 'Belarus', flag: '🇧🇾', count: 1 }, { country: 'Germany', flag: '🇩🇪', count: 1 },
      { country: 'China', flag: '🇨🇳', count: 1 }, { country: 'Vietnam', flag: '🇻🇳', count: 1 },
      { country: 'Honduras', flag: '🇭🇳', count: 1 }, { country: 'Sri Lanka', flag: '🇱🇰', count: 1 },
      { country: 'Kazakhstan', flag: '🇰🇿', count: 1 },
    ],
    programs: [
      { name: 'AMERTA XX', count: 21, color: '#2563EB' }, { name: 'Regular IUP', count: 12, color: '#4A5235' },
      { name: 'ADS 2023', count: 8, color: '#F97316' }, { name: 'KNB 2023', count: 7, color: '#8B5CF6' },
      { name: 'ADS 2024', count: 3, color: '#EC4899' }, { name: 'DARMASISWA 2023', count: 3, color: '#64748B' },
      { name: 'ADS 2025', count: 1, color: '#0EA5E9' },
    ],
    gender: { M: 27, F: 28 },
    satisfaction: {
      scale: '1–10', n: 19, overall: 8.58, max: 10,
      criteria: [
        { label: 'Program information availability', score: 9.11, max: 10 }, { label: 'Committee helpfulness on trip', score: 9.05, max: 10 },
        { label: 'Trip was fun & insightful', score: 8.79, max: 10 }, { label: 'Registration process', score: 8.74, max: 10 },
        { label: 'Updated program information', score: 8.74, max: 10 }, { label: 'Service for inquiries', score: 8.21, max: 10 },
        { label: 'Overall satisfaction', score: 8.58, max: 10 }, { label: 'Tour guide explanation', score: 8.32, max: 10 },
        { label: 'Sites & activities interest', score: 8.16, max: 10 }, { label: 'Program content & schedule', score: 8.16, max: 10 },
      ],
    },
    analysis: [
      { icon: '🌍', text: 'The inaugural ACI batch brought together <strong>55 participants from 21 countries</strong> — one of the most diverse single-event cohorts in the program\'s history.' },
      { icon: '🇲🇾', text: '<strong>Malaysian students led at 29%</strong> (16 of 55), primarily through the AMERTA XX exchange. For the first time, ACI also served ADS, KNB, and DARMASISWA scholars.' },
      { icon: '💰', text: '<strong>Transport was the largest cost driver</strong> at IDR 31.2M (33%), reflecting 3 chartered buses needed for 55 participants and longer Purwodadi–Batu route.' },
      { icon: '⭐', text: 'Satisfaction averaged <strong>8.58 / 10</strong> across 19 respondents — strongest on information availability (9.11) and committee helpfulness (9.05).' },
    ],
  },
  b1_2025: {
    label: 'ACI 2025', sublabel: 'Batch 1 – Malang', period: '26–27 April 2025', location: 'Malang & Batu, East Java', participants: 47,
    color: '#10B981', bg: 'linear-gradient(135deg,#F0FDF4,#DCFCE7)', border: 'rgba(16,185,129,0.15)',
    vendors: [
      { category: 'Hotel', name: 'Hotel 38FrontOne, Batu', desc: 'Accommodation for participants. 33 rooms used for the 2-day program.' },
      { category: 'Venue', name: 'Desa Wisata Pujon Kidul', desc: 'Eco-tourism village with hands-on farming and livestock education program.' },
      { category: 'Venue', name: 'Kaliandra Adventure', desc: 'Jeep off-road adventure with professional drone documentation — flagship Day 2 outdoor experience.' },
      { category: 'Food', name: 'Laritta', desc: 'Event catering for snacks and group meals.' },
      { category: 'Food', name: 'RM. Joglo Batu', desc: 'Traditional Javanese restaurant for dinner on Day 1.' },
      { category: 'Shirts', name: 'Cititex', desc: 'Custom program shirts (kaos kegiatan) for all 80 participants + committee.' },
    ],
    activities: [
      'Eco-tourism visit at Desa Wisata Pujon Kidul — farming, livestock, and local UMKM learning',
      'Kaliandra Jeep Adventure — off-road exploration with drone documentation',
      'Dinner at traditional Javanese Joglo restaurant',
      'Overnight stay enabling cross-cultural bonding between AMERTA, IUP, and scholarship students',
    ],
    budgetTotal: 50800200, budgetAlloc: null,
    budgetCategories: [
      { name: 'Activities/Events', amount: 28910000, color: '#4A5235' }, { name: 'Accommodation', amount: 12860000, color: '#2563EB' },
      { name: 'Food & Beverages', amount: 3690000, color: '#8B5CF6' }, { name: 'Consumables', amount: 3640200, color: '#EC4899' },
      { name: 'Transport', amount: 1700000, color: '#F97316' },
    ],
    natNote: 'Nationality data is partially unavailable due to spreadsheet formula errors. Malaysia (19) confirmed from IUP 2024 program registrations.',
    nationalities: [{ country: 'Malaysia', flag: '🇲🇾', count: 19 }, { country: 'Other / Not Available', flag: '🌍', count: 28 }],
    programs: [
      { name: 'Regular IUP 2024', count: 19, color: '#4A5235' }, { name: 'AMERTA XXII', count: 12, color: '#2563EB' },
      { name: 'KNB 2024', count: 6, color: '#8B5CF6' }, { name: 'TIAS 2024', count: 5, color: '#EC4899' }, { name: 'ADS 2024', count: 5, color: '#F97316' },
    ],
    gender: { M: 15, F: 32 },
    satisfaction: {
      scale: '1–4', n: 61, overall: 3.79, max: 4,
      note: 'Survey collected 61 responses (may include participants across 2025 batches sharing the same form).',
      criteria: [
        { label: 'Registration process', score: 3.84, max: 4 }, { label: 'Trip was fun & insightful', score: 3.84, max: 4 },
        { label: 'Program information availability', score: 3.80, max: 4 }, { label: 'Committee helpfulness on trip', score: 3.80, max: 4 },
        { label: 'Service for inquiries', score: 3.79, max: 4 }, { label: 'Overall satisfaction', score: 3.79, max: 4 },
        { label: 'Updated program information', score: 3.79, max: 4 }, { label: 'Tour guide explanation', score: 3.74, max: 4 },
        { label: 'Program content & schedule', score: 3.70, max: 4 }, { label: 'Sites & activities interest', score: 3.67, max: 4 },
      ],
    },
    analysis: [
      { icon: '🔄', text: 'ACI 2025 Batch 1 <strong>returned to the same Batu/Malang circuit</strong> but shifted the Day 1 venue from Kebun Raya to the more interactive Desa Wisata Pujon Kidul — a key upgrade based on 2024 feedback.' },
      { icon: '👩', text: '<strong>Female participants dominated</strong> at 68% (32 of 47) — the highest female ratio across all ACI batches, driven primarily by the IUP Veterinary Medicine cohort.' },
      { icon: '💰', text: 'Total spend dropped significantly to <strong>IDR 50.8M</strong> (vs 95.4M in 2024) for a smaller group of 47 — a 46% cost reduction per batch, showing improved financial planning.' },
      { icon: '⭐', text: 'Satisfaction reached <strong>3.79/4 (94.8%)</strong> — markedly higher than 2024\'s 85.8%. The shift to Pujon Kidul\'s interactive village experience was well-received.' },
    ],
  },
  b21_2025: {
    label: 'ACI 2025', sublabel: 'Batch 2.1 – Solo', period: '20–21 September 2025', location: 'Solo (Surakarta), Central Java', participants: 52,
    color: '#F97316', bg: 'linear-gradient(135deg,#FFF7ED,#FFEDD5)', border: 'rgba(249,115,22,0.15)',
    vendors: [
      { category: 'Hotel', name: 'Zest Hotel Surakarta', desc: 'City-center hotel in Solo for 33 rooms. Starting point for all Day 2 activities.' },
      { category: 'Venue', name: 'Pura Mangkunegaran', desc: 'Royal Javanese palace — guided cultural heritage tour including traditional dance and Javanese court culture.' },
      { category: 'Venue', name: 'Kampung Batik Laweyan', desc: 'Historic batik village — hands-on batik making workshop in one of Java\'s oldest batik production centers.' },
      { category: 'Venue', name: 'Jeep Kemuning', desc: 'Jeep adventure + river tubing through the Kemuning tea plantation area — Day 2 outdoor adventure.' },
      { category: 'Food', name: 'Laritta', desc: 'Event catering services.' },
      { category: 'Food', name: 'Sari Degan Ijo, Solo', desc: 'Local Solo restaurant for Day 1 lunch — authentic Central Javanese cuisine experience.' },
      { category: 'Food', name: 'Balekambang Resto', desc: 'Dinner venue near Balekambang park for Day 1 evening.' },
      { category: 'Shirts', name: 'CITITEX', desc: 'Custom program shirts for all participants and committee.' },
    ],
    activities: [
      'Royal cultural tour at Pura Mangkunegaran — Javanese palace architecture and court heritage',
      'Hands-on batik making workshop at Kampung Batik Laweyan — UNESCO-recognized craft tradition',
      'Jeep adventure + river tubing at Kemuning tea plantation',
      'Authentic Solo cuisine experiences at local restaurants',
    ],
    budgetTotal: 44447176, budgetAlloc: 60899800,
    budgetCategories: [
      { name: 'Activities/Events', amount: 19530000, color: '#4A5235' }, { name: 'Accommodation', amount: 13200000, color: '#2563EB' },
      { name: 'Food & Beverages', amount: 5478000, color: '#8B5CF6' }, { name: 'Transport', amount: 3310000, color: '#F97316' },
      { name: 'Consumables', amount: 2929176, color: '#EC4899' },
    ],
    nationalities: [
      { country: 'Malaysia', flag: '🇲🇾', count: 41 }, { country: 'Australia', flag: '🇦🇺', count: 4 },
      { country: 'Brunei', flag: '🇧🇳', count: 3 }, { country: 'Germany', flag: '🇩🇪', count: 2 },
      { country: 'United Kingdom', flag: '🇬🇧', count: 1 }, { country: 'Netherlands', flag: '🇳🇱', count: 1 },
    ],
    programs: [{ name: 'AMERTA XXIII', count: 52, color: '#F97316' }],
    gender: { M: 13, F: 39 },
    satisfaction: {
      scale: '1–4', n: 24, overall: 3.96, max: 4,
      criteria: [
        { label: 'Registration process', score: 3.96, max: 4 }, { label: 'Updated program information', score: 3.96, max: 4 },
        { label: 'Tour guide explanation', score: 3.96, max: 4 }, { label: 'Program content & schedule', score: 3.96, max: 4 },
        { label: 'Overall satisfaction', score: 3.96, max: 4 }, { label: 'Program information availability', score: 3.92, max: 4 },
        { label: 'Service for inquiries', score: 3.92, max: 4 }, { label: 'Trip was fun & insightful', score: 3.92, max: 4 },
        { label: 'Committee helpfulness on trip', score: 3.92, max: 4 }, { label: 'Sites & activities interest', score: 3.75, max: 4 },
      ],
    },
    analysis: [
      { icon: '🏛️', text: 'ACI 2025 Batch 2.1 was the <strong>first Solo edition</strong> — shifting the program from East to Central Java and introducing Javanese royal culture through Pura Mangkunegaran and Kampung Batik Laweyan.' },
      { icon: '🇲🇾', text: 'All 52 participants were <strong>AMERTA XXIII students</strong>, with Malaysia at 79% (41) — the highest single-batch concentration from a Western partner cohort.' },
      { icon: '💰', text: 'Best budget efficiency at <strong>IDR 44.4M spent vs IDR 60.9M allocated</strong> — 27% underspend (IDR 16.5M saved). Per-participant cost of IDR 854K was the lowest across all batches.' },
      { icon: '⭐', text: '<strong>Highest satisfaction at 3.96/4 (99%)</strong> across all ACI batches. Every criteria scored ≥3.75 — the Javanese cultural content resonated strongly with participants.' },
    ],
  },
  b22_2025: {
    label: 'ACI 2025', sublabel: 'Batch 2.2 – Mojokerto', period: '15–16 November 2025', location: 'Mojokerto & Trawas, East Java', participants: 37,
    color: '#A855F7', bg: 'linear-gradient(135deg,#FDF4FF,#FAE8FF)', border: 'rgba(168,85,247,0.15)',
    vendors: [
      { category: 'Hotel', name: 'Hotel Royal Tretes', desc: 'Hotel stay in Trawas hill resort area — cool mountain setting for overnight stay.' },
      { category: 'Venue', name: 'Desa Wisata Bejijong', desc: 'Traditional Majapahit heritage village — cultural activities, traditional crafts, and community interaction.' },
      { category: 'Venue', name: 'Coklat Majapahit Mojokerto', desc: 'Chocolate production workshop inspired by Majapahit-era cacao trade — hands-on making and tasting experience.' },
      { category: 'Food', name: 'Café Santuy Prigen', desc: 'Casual café in Prigen for group dining in a scenic mountain environment.' },
      { category: 'Food', name: 'Laritta', desc: 'Event catering for group meals.' },
      { category: 'Shirts', name: 'CITITEX', desc: 'Custom program shirts for all participants and committee.' },
    ],
    activities: [
      'Museum Trowulan — free entry to Majapahit empire archaeological museum (72 participants; budgeted at IDR 0)',
      'Desa Wisata Bejijong — cultural village visit with traditional Majapahit crafts and community engagement',
      'Coklat Majapahit workshop — chocolate-making experience rooted in Majapahit cacao heritage',
      'Outbound team activities at Trawas mountain resort',
    ],
    budgetTotal: 45360000, budgetAlloc: null,
    budgetCategories: [
      { name: 'Activities/Events', amount: 19500000, color: '#4A5235' }, { name: 'Accommodation', amount: 15500000, color: '#2563EB' },
      { name: 'Food & Beverages', amount: 6060000, color: '#8B5CF6' }, { name: 'Consumables', amount: 2700000, color: '#EC4899' },
      { name: 'Transport', amount: 1300000, color: '#F97316' },
    ],
    nationalities: [
      { country: 'Philippines', flag: '🇵🇭', count: 11 }, { country: 'Pakistan', flag: '🇵🇰', count: 8 },
      { country: 'Timor-Leste', flag: '🇹🇱', count: 5 }, { country: 'Yemen', flag: '🇾🇪', count: 3 },
      { country: 'Bangladesh', flag: '🇧🇩', count: 2 }, { country: 'Nigeria', flag: '🇳🇬', count: 2 },
      { country: 'Malawi', flag: '🇲🇼', count: 1 }, { country: 'Suriname', flag: '🇸🇷', count: 1 },
      { country: 'Kenya', flag: '🇰🇪', count: 1 }, { country: 'Ethiopia', flag: '🇪🇹', count: 1 },
      { country: 'Vanuatu', flag: '🇻🇺', count: 1 }, { country: 'Malaysia', flag: '🇲🇾', count: 1 },
    ],
    programs: [
      { name: 'KNB 2025', count: 12, color: '#8B5CF6' }, { name: 'AMERTA (Batangas)', count: 11, color: '#2563EB' },
      { name: 'ADS 2025', count: 10, color: '#F97316' }, { name: 'TIAS 2025', count: 4, color: '#EC4899' },
    ],
    gender: null,
    satisfaction: {
      scale: '1–4', n: 12, overall: 3.50, max: 4,
      criteria: [
        { label: 'Registration process', score: 3.58, max: 4 }, { label: 'Trip was fun & insightful', score: 3.58, max: 4 },
        { label: 'Program information availability', score: 3.50, max: 4 }, { label: 'Service for inquiries', score: 3.50, max: 4 },
        { label: 'Updated program information', score: 3.50, max: 4 }, { label: 'Committee helpfulness on trip', score: 3.50, max: 4 },
        { label: 'Overall satisfaction', score: 3.50, max: 4 }, { label: 'Program content & schedule', score: 3.42, max: 4 },
        { label: 'Sites & activities interest', score: 3.42, max: 4 }, { label: 'Tour guide explanation', score: 3.33, max: 4 },
      ],
    },
    analysis: [
      { icon: '🏺', text: 'Batch 2.2 was the most historically rich edition — built around <strong>Majapahit Empire heritage</strong> through Museum Trowulan, Desa Bejijong crafts, and Coklat Majapahit, all in Mojokerto, the empire\'s capital region.' },
      { icon: '🌍', text: 'The <strong>most globally diverse batch</strong> with 12 nationalities. For the first time, ACI welcomed participants from Philippines (11), Vanuatu, Ethiopia, Suriname, and Malawi.' },
      { icon: '💸', text: 'Museum Trowulan provided a <strong>zero-cost venue</strong> (public museum, free entry for 72 participants) — a creative cost-saving measure that still delivered historical depth.' },
      { icon: '⭐', text: 'Satisfaction at <strong>3.50/4 (87.5%)</strong> — lowest across 2025 batches. Tour guide explanation (3.33) and activity interest (3.42) scored lowest, suggesting further curation of the heritage village experience is needed.' },
    ],
  },
}

const TABS = [
  { key: 'all', label: 'All Batches' },
  { key: 'b1_2024', label: '2024 Malang' },
  { key: 'b1_2025', label: '2025 Malang' },
  { key: 'b21_2025', label: '2025 Solo' },
  { key: 'b22_2025', label: '2025 Mojokerto' },
]

const CAT_COLORS: Record<string, string> = { Hotel: '#1E3A5F', Venue: '#4A5235', Food: '#F97316', Shirts: '#8B5CF6' }

function formatIDR(n: number): string {
  if (n >= 1000000) return 'IDR ' + (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  return 'IDR ' + n.toLocaleString()
}

function scoreColor(pct: number): string {
  if (pct >= 95) return '#4A5235'
  if (pct >= 85) return '#1E3A5F'
  if (pct >= 75) return '#F97316'
  return '#EF4444'
}

export default function AciStats() {
  const [active, setActive] = useState('all')
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return
    contentRef.current.querySelectorAll<HTMLElement>('[data-w]').forEach(b => { b.style.width = '0' })
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        contentRef.current?.querySelectorAll<HTMLElement>('[data-w]').forEach(b => {
          b.style.width = b.dataset.w || '0'
        })
      })
    })
  }, [active])

  const d = DATA[active]
  const isAll = active === 'all'

  const subtitle = isAll
    ? 'Data compiled from 4 ACI batches across 191 participants, 25+ nationalities, and 3 destinations.'
    : `${d.label} · ${(d as any).sublabel} · ${d.period} · ${d.participants} participants`

  return (
    <div style={{ background: '#F2ECE4', borderTop: '1px solid rgba(28,28,30,0.07)' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-3">
          <span className="accent-line" />
          <span className="text-sm font-semibold" style={{ color: '#4A5235' }}>Data &amp; Analytics</span>
        </div>
        <h2 className="font-heading font-bold text-3xl mb-2" style={{ color: '#1C1C1E' }}>Program Data &amp; Analytics</h2>
        <p className="text-sm mb-8" style={{ color: '#5C5C5C' }}>{subtitle}</p>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map(t => {
            const bd = DATA[t.key]
            const isActive = active === t.key
            return (
              <button key={t.key} onClick={() => setActive(t.key)}
                className="px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200"
                style={{ cursor: 'pointer', background: isActive ? bd.color : 'transparent', color: isActive ? '#fff' : '#5C5C5C', borderColor: isActive ? bd.color : 'rgba(28,28,30,0.2)' }}
              >{t.label}</button>
            )
          })}
        </div>

        <div ref={contentRef}>
          {/* Overview */}
          {isAll ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {(['b1_2024','b1_2025','b21_2025','b22_2025'] as const).map(k => {
                const b = DATA[k]
                return (
                  <button key={k} onClick={() => setActive(k)}
                    className="rounded-xl p-5 text-center cursor-pointer hover:shadow-md transition-all duration-200"
                    style={{ background: b.bg, border: `1px solid ${b.border}` }}
                  >
                    <p className="font-heading font-bold text-2xl mb-1" style={{ color: b.color }}>{b.participants}</p>
                    <p className="font-heading font-semibold text-sm mb-0.5" style={{ color: '#0F172A' }}>{b.label}</p>
                    <p className="text-xs mb-2" style={{ color: '#0F172A', fontWeight: 500 }}>{(b as any).sublabel}</p>
                    <p className="text-xs" style={{ color: '#64748B' }}>{b.period}</p>
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="rounded-xl p-6 mb-8 flex flex-wrap gap-8 items-center" style={{ background: d.bg, border: `1px solid ${d.border}` }}>
              <div className="text-center">
                <p className="font-heading font-bold text-3xl" style={{ color: d.color }}>{d.participants}</p>
                <p className="text-xs mt-1" style={{ color: '#64748B' }}>Participants</p>
              </div>
              <div className="text-center">
                <p className="font-heading font-bold text-xl" style={{ color: d.color }}>{(d as any).location}</p>
                <p className="text-xs mt-1" style={{ color: '#64748B' }}>Destination</p>
              </div>
              <div className="ml-auto text-right">
                <p className="font-heading font-bold text-xl" style={{ color: '#0F172A' }}>{d.label} · {(d as any).sublabel}</p>
                <p className="text-sm" style={{ color: '#64748B' }}>{d.period}</p>
              </div>
            </div>
          )}

          {/* Vendors */}
          <div className="card p-6 mb-6">
            {isAll ? (
              <>
                <h3 className="font-heading font-semibold text-lg mb-4" style={{ color: '#0F172A' }}>All Vendors — Across 4 Batches</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {ALL_VENDORS.map(v => (
                    <div key={v.name} className="rounded-lg p-4" style={{ background: '#F8FAFC', border: '1px solid rgba(74,107,138,0.1)' }}>
                      <div className="flex items-start gap-3">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5" style={{ background: `${CAT_COLORS[v.category] || '#64748B'}18`, color: CAT_COLORS[v.category] || '#64748B' }}>{v.category}</span>
                        <div className="flex-1">
                          <div className="flex justify-between items-start gap-2">
                            <p className="text-sm font-semibold mb-1" style={{ color: '#0F172A' }}>{v.name}</p>
                            <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: '#F1F5F9', color: '#64748B' }}>{v.batch}</span>
                          </div>
                          <p className="text-xs leading-relaxed" style={{ color: '#64748B' }}>{v.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (d as any).vendors && (
              <>
                <h3 className="font-heading font-semibold text-lg mb-4" style={{ color: '#0F172A' }}>Vendors</h3>
                <div className="grid md:grid-cols-2 gap-3 mb-6">
                  {((d as any).vendors as Vendor[]).map((v: Vendor) => (
                    <div key={v.name} className="rounded-lg p-4" style={{ background: '#F8FAFC', border: '1px solid rgba(74,107,138,0.1)' }}>
                      <div className="flex items-start gap-3">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5" style={{ background: `${CAT_COLORS[v.category] || '#64748B'}18`, color: CAT_COLORS[v.category] || '#64748B' }}>{v.category}</span>
                        <div>
                          <p className="text-sm font-semibold mb-1" style={{ color: '#0F172A' }}>{v.name}</p>
                          <p className="text-xs leading-relaxed" style={{ color: '#64748B' }}>{v.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {(d as any).activities && (
                  <>
                    <h3 className="font-heading font-semibold text-lg mb-3" style={{ color: '#0F172A' }}>Key Activities</h3>
                    <ul className="space-y-2">
                      {((d as any).activities as string[]).map((a: string) => (
                        <li key={a} className="flex gap-2 text-sm" style={{ color: '#475569' }}><span style={{ color: '#4A5235', flexShrink: 0 }}>▸</span>{a}</li>
                      ))}
                    </ul>
                  </>
                )}
              </>
            )}
          </div>

          {/* Budget */}
          <div className="card p-6 mb-6">
            <h3 className="font-heading font-semibold text-lg mb-4" style={{ color: '#0F172A' }}>Budget Analysis</h3>
            <div className="flex flex-wrap gap-6 mb-6">
              <div><p className="font-heading font-bold text-2xl" style={{ color: '#0F172A' }}>{formatIDR(d.budgetTotal)}</p><p className="text-xs" style={{ color: '#64748B' }}>Total Spent</p></div>
              {(d as any).budgetAlloc && (
                <>
                  <div><p className="font-heading font-bold text-2xl" style={{ color: '#64748B' }}>{formatIDR((d as any).budgetAlloc)}</p><p className="text-xs" style={{ color: '#64748B' }}>Budget Allocated</p></div>
                  <div><p className="font-heading font-bold text-2xl" style={{ color: '#4A5235' }}>{((1 - d.budgetTotal / (d as any).budgetAlloc) * 100).toFixed(0)}% saved</p><p className="text-xs" style={{ color: '#64748B' }}>Budget Efficiency</p></div>
                </>
              )}
              {d.participants && (
                <div><p className="font-heading font-bold text-2xl" style={{ color: '#1E3A5F' }}>{formatIDR(Math.round(d.budgetTotal / d.participants))}</p><p className="text-xs" style={{ color: '#64748B' }}>Per Participant</p></div>
              )}
            </div>
            <div className="space-y-3 mb-4">
              {d.budgetCategories.map(c => {
                const max = Math.max(...d.budgetCategories.map(x => x.amount))
                const pct = ((c.amount / max) * 100).toFixed(1)
                const share = ((c.amount / d.budgetTotal) * 100).toFixed(0)
                return (
                  <div key={c.name} className="flex items-center gap-3">
                    <span className="text-sm flex-shrink-0" style={{ color: '#0F172A', width: '10rem' }}>{c.name}</span>
                    <div className="flex-1 rounded-full overflow-hidden" style={{ background: '#F1F5F9', height: 10 }}>
                      <div data-w={`${pct}%`} style={{ height: 10, borderRadius: 999, transition: 'width .55s ease', background: c.color }} />
                    </div>
                    <span className="text-sm font-semibold" style={{ color: c.color, minWidth: '4rem', textAlign: 'right' }}>{formatIDR(c.amount)}</span>
                    <span className="text-xs w-8 text-right" style={{ color: '#94A3B8' }}>{share}%</span>
                  </div>
                )
              })}
            </div>
            {d.budgetNote && <p className="text-xs mt-2" style={{ color: '#94A3B8' }}>{d.budgetNote}</p>}
            {isAll && (d as any).budgetBatches && (
              <>
                <h3 className="font-heading font-semibold text-base mb-3 mt-6" style={{ color: '#0F172A' }}>By Batch</h3>
                {((d as any).budgetBatches as BudgetBatch[]).map((b: BudgetBatch) => (
                  <div key={b.label} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <span className="text-sm" style={{ color: '#0F172A' }}>{b.label}</span>
                    <span className="text-sm font-semibold" style={{ color: '#4A5235' }}>
                      {formatIDR(b.spent)}
                      <span className="font-normal text-xs ml-1" style={{ color: '#94A3B8' }}>
                        {b.budget ? ` / ${formatIDR(b.budget)} alloc` : ' (no formal allocation recorded)'}
                      </span>
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Demographics */}
          <div className="card p-6 mb-6">
            <h3 className="font-heading font-semibold text-lg mb-2" style={{ color: '#0F172A' }}>
              Nationalities <span className="text-sm font-normal ml-2" style={{ color: '#64748B' }}>— {d.nationalities.length} countries</span>
            </h3>
            {d.natNote && <p className="text-xs mb-5" style={{ color: '#94A3B8' }}>{d.natNote}</p>}
            <div className="space-y-3 mb-8">
              {d.nationalities.map(n => {
                const barPct = ((n.count / d.nationalities[0].count) * 100).toFixed(1)
                const share = ((n.count / (d.participants || 1)) * 100).toFixed(0)
                return (
                  <div key={n.country} className="flex items-center gap-3">
                    <span className="text-base w-7 flex-shrink-0">{n.flag}</span>
                    <span className="text-sm flex-shrink-0" style={{ color: '#0F172A', width: '8rem' }}>{n.country}</span>
                    <div className="flex-1 rounded-full overflow-hidden" style={{ background: '#F1F5F9', height: 10 }}>
                      <div data-w={`${barPct}%`} style={{ height: 10, borderRadius: 999, transition: 'width .55s ease', background: 'linear-gradient(90deg,#4A5235,#6B7455)' }} />
                    </div>
                    <span className="text-sm font-semibold w-8 text-right" style={{ color: '#4A5235' }}>{n.count}</span>
                    <span className="text-xs w-9 text-right" style={{ color: '#94A3B8' }}>{share}%</span>
                  </div>
                )
              })}
            </div>

            <h3 className="font-heading font-semibold text-lg mb-4" style={{ color: '#0F172A' }}>Enrolled Programs</h3>
            <div className="space-y-3 mb-8">
              {d.programs.map(p => {
                const maxProg = Math.max(...d.programs.map(x => x.count))
                const pct = ((p.count / maxProg) * 100).toFixed(1)
                return (
                  <div key={p.name} className="flex items-center gap-3">
                    <span className="text-sm flex-shrink-0" style={{ color: '#0F172A', maxWidth: 'min(13rem,40vw)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={p.name}>{p.name}</span>
                    <div className="flex-1 rounded-full overflow-hidden" style={{ background: '#F1F5F9', height: 10 }}>
                      <div data-w={`${pct}%`} style={{ height: 10, borderRadius: 999, transition: 'width .55s ease', background: p.color }} />
                    </div>
                    <span className="text-sm font-semibold w-8 text-right" style={{ color: p.color }}>{p.count}</span>
                  </div>
                )
              })}
            </div>

            {d.gender === null ? (
              <>
                <h3 className="font-heading font-semibold text-lg mb-2" style={{ color: '#0F172A' }}>Gender Distribution</h3>
                <div className="rounded-lg p-4 mb-4 text-center" style={{ background: '#F8FAFC', border: '1px dashed rgba(100,116,139,0.3)' }}>
                  <p className="text-sm" style={{ color: '#94A3B8' }}>📋 Gender data was not recorded for this batch.</p>
                </div>
              </>
            ) : d.gender && (
              <>
                <h3 className="font-heading font-semibold text-lg mb-4" style={{ color: '#0F172A' }}>Gender Distribution</h3>
                {(() => {
                  const g = d.gender as { M: number; F: number; note?: string }
                  const total = g.M + g.F
                  const fPct = ((g.F / total) * 100).toFixed(0)
                  const mPct = (100 - parseInt(fPct)).toString()
                  return (
                    <>
                      <div className="flex items-center gap-4 mb-2">
                        <div className="flex-1 flex rounded-full overflow-hidden" style={{ height: 20 }}>
                          <div style={{ width: `${fPct}%`, background: '#EC4899' }} />
                          <div style={{ width: `${mPct}%`, background: '#1E3A5F' }} />
                        </div>
                      </div>
                      <div className="flex gap-6 mb-4">
                        <div className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-full" style={{ background: '#EC4899' }} /><span className="text-sm" style={{ color: '#0F172A' }}>Female <strong>{g.F}</strong> ({fPct}%)</span></div>
                        <div className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-full" style={{ background: '#1E3A5F' }} /><span className="text-sm" style={{ color: '#0F172A' }}>Male <strong>{g.M}</strong> ({mPct}%)</span></div>
                      </div>
                      {g.note && <p className="text-xs" style={{ color: '#94A3B8' }}>{g.note}</p>}
                    </>
                  )
                })()}
              </>
            )}
          </div>

          {/* Satisfaction */}
          <div className="card p-6 mb-6">
            {isAll && 'batches' in d.satisfaction! ? (
              <>
                <h3 className="font-heading font-semibold text-lg mb-4" style={{ color: '#0F172A' }}>Satisfaction Analysis — All Batches</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {(d.satisfaction as AllSat).batches.map(b => {
                    const col = scoreColor(b.pct)
                    const dash = (b.pct * 2.01).toFixed(1)
                    return (
                      <div key={b.label} className="rounded-xl p-5 text-center" style={{ background: '#F8FAFC', border: '1px solid rgba(74,107,138,0.1)' }}>
                        <div className="relative mx-auto mb-3" style={{ width: 72, height: 72 }}>
                          <svg viewBox="0 0 80 80" style={{ width: 72, height: 72, transform: 'rotate(-90deg)' }}>
                            <circle cx="40" cy="40" r="32" fill="none" stroke="#F1F5F9" strokeWidth="8" />
                            <circle cx="40" cy="40" r="32" fill="none" stroke={col} strokeWidth="8" strokeDasharray={`${dash} 201`} strokeLinecap="round" />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-heading font-bold text-xs" style={{ color: col }}>{b.pct}%</span>
                          </div>
                        </div>
                        <p className="font-heading font-bold text-xl mb-1" style={{ color: col }}>{b.overall}/{b.max}</p>
                        <p className="text-xs font-semibold mb-1" style={{ color: '#0F172A' }}>{b.label}</p>
                        <p className="text-xs" style={{ color: '#64748B' }}>{b.n} responses</p>
                      </div>
                    )
                  })}
                </div>
                <p className="text-xs mt-2" style={{ color: '#94A3B8' }}>{(d.satisfaction as AllSat).note}</p>
              </>
            ) : d.satisfaction && 'criteria' in d.satisfaction && (() => {
              const sat = d.satisfaction as Sat
              if (!sat) return null
              const overallPct = ((sat.overall / sat.max) * 100)
              const overallPctStr = overallPct.toFixed(1)
              const col = scoreColor(overallPct)
              const dash = (overallPct * 2.01).toFixed(1)
              const sorted = [...sat.criteria].sort((a, b) => b.score - a.score)
              return (
                <>
                  <h3 className="font-heading font-semibold text-lg mb-4" style={{ color: '#0F172A' }}>Satisfaction Analysis</h3>
                  {sat.note && <p className="text-xs mb-4" style={{ color: '#94A3B8' }}>{sat.note}</p>}
                  <div className="flex items-center gap-6 mb-6">
                    <div className="relative" style={{ width: 80, height: 80 }}>
                      <svg viewBox="0 0 80 80" style={{ width: 80, height: 80, transform: 'rotate(-90deg)' }}>
                        <circle cx="40" cy="40" r="32" fill="none" stroke="#F1F5F9" strokeWidth="8" />
                        <circle cx="40" cy="40" r="32" fill="none" stroke={col} strokeWidth="8" strokeDasharray={`${dash} 201`} strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-heading font-bold text-sm" style={{ color: col }}>{overallPctStr}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-heading font-bold text-3xl mb-1" style={{ color: col }}>{sat.overall} / {sat.max}</p>
                      <p className="text-sm" style={{ color: '#64748B' }}>Overall Satisfaction · Scale {sat.scale} · <strong>{sat.n}</strong> responses</p>
                    </div>
                  </div>
                  <div className="space-y-3 mb-4">
                    {sorted.map(c => {
                      const pct = ((c.score / c.max) * 100)
                      const pctStr = pct.toFixed(1)
                      const cCol = scoreColor(pct)
                      return (
                        <div key={c.label} className="flex items-center gap-3">
                          <span className="text-sm flex-1" style={{ color: '#0F172A' }}>{c.label}</span>
                          <div className="flex-shrink-0 rounded-full overflow-hidden" style={{ width: 128, background: '#F1F5F9', height: 10 }}>
                            <div data-w={`${pctStr}%`} style={{ height: 10, borderRadius: 999, transition: 'width .55s ease', background: cCol }} />
                          </div>
                          <span className="text-sm font-semibold flex-shrink-0" style={{ color: cCol, width: '3rem', textAlign: 'right' }}>{c.score}/{c.max}</span>
                          <span className="text-xs flex-shrink-0" style={{ color: '#94A3B8', width: '2.5rem', textAlign: 'right' }}>{pctStr}%</span>
                        </div>
                      )
                    })}
                  </div>
                </>
              )
            })()}
          </div>

          {/* Analysis */}
          <div className="rounded-xl p-6" style={{ background: 'linear-gradient(135deg,#F1F3EE,#E4E8DC)', border: '1px solid rgba(74,82,53,0.12)' }}>
            <h3 className="font-heading font-semibold text-base mb-4" style={{ color: '#0F172A' }}>Batch Analysis</h3>
            <div className="space-y-3">
              {d.analysis.map((a, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="text-xl flex-shrink-0 mt-0.5">{a.icon}</span>
                  <p className="text-sm leading-relaxed" style={{ color: '#475569' }} dangerouslySetInnerHTML={{ __html: a.text }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
