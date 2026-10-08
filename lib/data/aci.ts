// ACI statistics by batch: participants, budget, vendors and satisfaction.
// Text uses **bold** markers, rendered by <Rich>.

export type Vendor = { category: string; name: string; desc: string; batch?: string }
export type Nat = { country: string; count: number }
export type Prog = { name: string; count: number }
export type Gender = { M: number; F: number; note?: string } | null
export type SatCriterion = { label: string; score: number; max: number }
export type Sat = { scale: string; n: number; overall: number; max: number; criteria: SatCriterion[]; note?: string } | null
export type SatBatch = { label: string; overall: number; max: number; pct: number; n: number }
export type AllSat = { scale: string; note: string; batches: SatBatch[] }
export type Analysis = { text: string }
export type BudgetCat = { name: string; amount: number }
export type BudgetBatch = { label: string; spent: number; budget: number | null }

export type Batch = {
  label: string; period: string
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

export const ALL_VENDORS: (Vendor & { batch: string })[] = [
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

export const DATA: Record<string, Batch> = {
  all: {
    label: 'All Batches', period: '2024 – 2025', participants: 191, batches: 4, countries: 25, locations: 3,
    budgetTotal: 236566376, budgetNote: 'Combined realization across 4 batches. Batch 1 2025 budget is estimated from line items.',
    budgetCategories: [
      { name: 'Activities/Events', amount: 97134000 }, { name: 'Accommodation', amount: 60760000 },
      { name: 'Transport', amount: 37501000 }, { name: 'Food & Beverages', amount: 26479000 },
      { name: 'Consumables/Shirts', amount: 14363576 }, { name: 'Emergency', amount: 2230000 },
    ],
    budgetBatches: [
      { label: '2024 B1 Malang', spent: 95359000, budget: 111000000 },
      { label: '2025 B1 Malang', spent: 50800200, budget: null },
      { label: '2025 B2.1 Solo', spent: 44447176, budget: 60899800 },
      { label: '2025 B2.2 Mojokerto', spent: 45360000, budget: null },
    ],
    nationalities: [
      { country: 'Malaysia', count: 77 }, { country: 'Philippines', count: 11 },
      { country: 'Pakistan', count: 11 }, { country: 'Timor-Leste', count: 8 },
      { country: 'Yemen', count: 6 }, { country: 'Netherlands', count: 5 },
      { country: 'Brunei', count: 5 }, { country: 'Australia', count: 4 },
      { country: 'Poland', count: 4 }, { country: 'Sierra Leone', count: 3 },
      { country: 'Germany', count: 3 }, { country: 'Bangladesh', count: 2 },
      { country: 'Belgium', count: 2 }, { country: 'France', count: 2 },
      { country: 'Myanmar', count: 2 }, { country: 'Afghanistan', count: 2 },
      { country: 'Nigeria', count: 2 }, { country: 'United Kingdom', count: 1 },
      { country: 'Indonesia', count: 1 }, { country: 'Belarus', count: 1 },
      { country: 'Kenya', count: 1 }, { country: 'Gambia', count: 1 },
      { country: 'Others', count: 8 },
    ],
    natNote: 'Nationality data is fully available for 3 of 4 batches (144 participants). ACI 2025 Batch 1 has partial data due to spreadsheet formula errors; Malaysia (19 via IUP program) is confirmed.',
    programs: [
      { name: 'AMERTA Exchange', count: 97 }, { name: 'Regular IUP', count: 19 },
      { name: 'ADS (Airlangga Darmasiswa)', count: 19 }, { name: 'KNB (Kemitraan Negara Berkembang)', count: 25 },
      { name: 'TIAS (TIAS Program)', count: 9 }, { name: 'DARMASISWA / Other', count: 3 },
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
      { text: 'Across 4 batches (2024–2025), ACI reached **191 participants from 25+ countries** across 3 destinations: Malang, Solo, and Mojokerto.' },
      { text: '**Malaysian students dominate** ACI enrollment (~40%), primarily from AMERTA and IUP programs — reflecting a strong bilateral academic partnership with Malaysian universities.' },
      { text: 'Batch 2.2 Mojokerto featured the **most diverse nationalities** (12 countries) with strong representation from Africa, the Pacific, and Southeast Asia.' },
      { text: '**Satisfaction consistently high** across all batches — ranging from 85.8% (2024) to 99% (2025 B2.1 Solo), with the Solo batch achieving near-perfect scores.' },
      { text: 'Total program cost of **IDR 236M across 4 batches** averages IDR 1.24M per participant — demonstrating cost-efficient cultural immersion at scale.' },
    ],
  },
  b1_2024: {
    label: 'ACI 2024', sublabel: 'Batch 1 – Malang', period: '4–5 May 2024', location: 'Malang & Batu, East Java', participants: 55,
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
      { name: 'Transport (Bus)', amount: 31191000 }, { name: 'Activities/Events', amount: 30094000 },
      { name: 'Accommodation', amount: 19200000 }, { name: 'Food & Beverages', amount: 7150000 },
      { name: 'Consumables', amount: 5494000 }, { name: 'Emergency', amount: 2230000 },
    ],
    nationalities: [
      { country: 'Malaysia', count: 16 }, { country: 'Poland', count: 4 },
      { country: 'Netherlands', count: 4 }, { country: 'Yemen', count: 3 },
      { country: 'Sierra Leone', count: 3 }, { country: 'Timor-Leste', count: 3 },
      { country: 'Pakistan', count: 3 }, { country: 'Myanmar', count: 2 },
      { country: 'Afghanistan', count: 2 }, { country: 'Brunei', count: 2 },
      { country: 'Belgium', count: 2 }, { country: 'France', count: 2 },
      { country: 'Gambia', count: 1 }, { country: 'Indonesia', count: 1 },
      { country: 'Belarus', count: 1 }, { country: 'Germany', count: 1 },
      { country: 'China', count: 1 }, { country: 'Vietnam', count: 1 },
      { country: 'Honduras', count: 1 }, { country: 'Sri Lanka', count: 1 },
      { country: 'Kazakhstan', count: 1 },
    ],
    programs: [
      { name: 'AMERTA XX', count: 21 }, { name: 'Regular IUP', count: 12 },
      { name: 'ADS 2023', count: 8 }, { name: 'KNB 2023', count: 7 },
      { name: 'ADS 2024', count: 3 }, { name: 'DARMASISWA 2023', count: 3 },
      { name: 'ADS 2025', count: 1 },
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
      { text: 'The inaugural ACI batch brought together **55 participants from 21 countries** — one of the most diverse single-event cohorts in the program\'s history.' },
      { text: '**Malaysian students led at 29%** (16 of 55), primarily through the AMERTA XX exchange. For the first time, ACI also served ADS, KNB, and DARMASISWA scholars.' },
      { text: '**Transport was the largest cost driver** at IDR 31.2M (33%), reflecting 3 chartered buses needed for 55 participants and longer Purwodadi–Batu route.' },
      { text: 'Satisfaction averaged **8.58 / 10** across 19 respondents — strongest on information availability (9.11) and committee helpfulness (9.05).' },
    ],
  },
  b1_2025: {
    label: 'ACI 2025', sublabel: 'Batch 1 – Malang', period: '26–27 April 2025', location: 'Malang & Batu, East Java', participants: 47,
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
      { name: 'Activities/Events', amount: 28910000 }, { name: 'Accommodation', amount: 12860000 },
      { name: 'Food & Beverages', amount: 3690000 }, { name: 'Consumables', amount: 3640200 },
      { name: 'Transport', amount: 1700000 },
    ],
    natNote: 'Nationality data is partially unavailable due to spreadsheet formula errors. Malaysia (19) confirmed from IUP 2024 program registrations.',
    nationalities: [{ country: 'Malaysia', count: 19 }, { country: 'Other / Not Available', count: 28 }],
    programs: [
      { name: 'Regular IUP 2024', count: 19 }, { name: 'AMERTA XXII', count: 12 },
      { name: 'KNB 2024', count: 6 }, { name: 'TIAS 2024', count: 5 }, { name: 'ADS 2024', count: 5 },
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
      { text: 'ACI 2025 Batch 1 **returned to the same Batu/Malang circuit** but shifted the Day 1 venue from Kebun Raya to the more interactive Desa Wisata Pujon Kidul — a key upgrade based on 2024 feedback.' },
      { text: '**Female participants dominated** at 68% (32 of 47) — the highest female ratio across all ACI batches, driven primarily by the IUP Veterinary Medicine cohort.' },
      { text: 'Total spend dropped significantly to **IDR 50.8M** (vs 95.4M in 2024) for a smaller group of 47 — a 46% cost reduction per batch, showing improved financial planning.' },
      { text: 'Satisfaction reached **3.79/4 (94.8%)** — markedly higher than 2024\'s 85.8%. The shift to Pujon Kidul\'s interactive village experience was well-received.' },
    ],
  },
  b21_2025: {
    label: 'ACI 2025', sublabel: 'Batch 2.1 – Solo', period: '20–21 September 2025', location: 'Solo (Surakarta), Central Java', participants: 52,
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
      { name: 'Activities/Events', amount: 19530000 }, { name: 'Accommodation', amount: 13200000 },
      { name: 'Food & Beverages', amount: 5478000 }, { name: 'Transport', amount: 3310000 },
      { name: 'Consumables', amount: 2929176 },
    ],
    nationalities: [
      { country: 'Malaysia', count: 41 }, { country: 'Australia', count: 4 },
      { country: 'Brunei', count: 3 }, { country: 'Germany', count: 2 },
      { country: 'United Kingdom', count: 1 }, { country: 'Netherlands', count: 1 },
    ],
    programs: [{ name: 'AMERTA XXIII', count: 52 }],
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
      { text: 'ACI 2025 Batch 2.1 was the **first Solo edition** — shifting the program from East to Central Java and introducing Javanese royal culture through Pura Mangkunegaran and Kampung Batik Laweyan.' },
      { text: 'All 52 participants were **AMERTA XXIII students**, with Malaysia at 79% (41) — the highest single-batch concentration from a Western partner cohort.' },
      { text: 'Best budget efficiency at **IDR 44.4M spent vs IDR 60.9M allocated** — 27% underspend (IDR 16.5M saved). Per-participant cost of IDR 854K was the lowest across all batches.' },
      { text: '**Highest satisfaction at 3.96/4 (99%)** across all ACI batches. Every criteria scored ≥3.75 — the Javanese cultural content resonated strongly with participants.' },
    ],
  },
  b22_2025: {
    label: 'ACI 2025', sublabel: 'Batch 2.2 – Mojokerto', period: '15–16 November 2025', location: 'Mojokerto & Trawas, East Java', participants: 37,
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
      { name: 'Activities/Events', amount: 19500000 }, { name: 'Accommodation', amount: 15500000 },
      { name: 'Food & Beverages', amount: 6060000 }, { name: 'Consumables', amount: 2700000 },
      { name: 'Transport', amount: 1300000 },
    ],
    nationalities: [
      { country: 'Philippines', count: 11 }, { country: 'Pakistan', count: 8 },
      { country: 'Timor-Leste', count: 5 }, { country: 'Yemen', count: 3 },
      { country: 'Bangladesh', count: 2 }, { country: 'Nigeria', count: 2 },
      { country: 'Malawi', count: 1 }, { country: 'Suriname', count: 1 },
      { country: 'Kenya', count: 1 }, { country: 'Ethiopia', count: 1 },
      { country: 'Vanuatu', count: 1 }, { country: 'Malaysia', count: 1 },
    ],
    programs: [
      { name: 'KNB 2025', count: 12 }, { name: 'AMERTA (Batangas)', count: 11 },
      { name: 'ADS 2025', count: 10 }, { name: 'TIAS 2025', count: 4 },
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
      { text: 'Batch 2.2 was the most historically rich edition — built around **Majapahit Empire heritage** through Museum Trowulan, Desa Bejijong crafts, and Coklat Majapahit, all in Mojokerto, the empire\'s capital region.' },
      { text: 'The **most globally diverse batch** with 12 nationalities. For the first time, ACI welcomed participants from Philippines (11), Vanuatu, Ethiopia, Suriname, and Malawi.' },
      { text: 'Museum Trowulan provided a **zero-cost venue** (public museum, free entry for 72 participants) — a creative cost-saving measure that still delivered historical depth.' },
      { text: 'Satisfaction at **3.50/4 (87.5%)** — lowest across 2025 batches. Tour guide explanation (3.33) and activity interest (3.42) scored lowest, suggesting further curation of the heritage village experience is needed.' },
    ],
  },
}

export const TABS: { key: string; label: string }[] = [
  { key: 'all', label: 'All Batches' },
  { key: 'b1_2024', label: '2024 Malang' },
  { key: 'b1_2025', label: '2025 Malang' },
  { key: 'b21_2025', label: '2025 Solo' },
  { key: 'b22_2025', label: '2025 Mojokerto' },
]
