// AMERTA participant statistics by batch (aggregate counts only, no personal data).
// Text uses **bold** markers, rendered by <Rich>.

export type Nat = { country: string; count: number }
export type UniItem = { name: string; count?: number }
export type UniGroup = { region: string; items: UniItem[] }
export type Faculty = { name: string; count: number }
export type Analysis = { text: string }

export type BatchData = {
  label: string; period: string; students: number; countries: number; uniCount: number
  nationalities: Nat[]; universities: UniGroup[]
  faculties: Faculty[] | null; facultyNote: string | null
  analysis: Analysis[]
}

export const DATA: Record<string, BatchData> = {
  all: {
    label: 'All Batches', period: '2024 – 2027', students: 207, countries: 14, uniCount: 24,
    nationalities: [
      { country: 'Malaysia', count: 114 }, { country: 'Philippines', count: 29 },
      { country: 'France', count: 14 }, { country: 'Germany', count: 10 },
      { country: 'Brunei', count: 10 }, { country: 'Australia', count: 6 },
      { country: 'Poland', count: 6 }, { country: 'Pakistan', count: 4 },
      { country: 'Netherlands', count: 3 }, { country: 'Cambodia', count: 3 },
      { country: 'Singapore', count: 2 }, { country: 'UK', count: 1 },
      { country: 'Mexico', count: 1 }, { country: 'Belgium', count: 1 },
    ],
    universities: [
      { region: 'Malaysia', items: [
        { name: 'Universiti Sultan Zainal Abidin (UniSZA)', count: 83 }, { name: 'Universiti Teknologi MARA (UiTM)', count: 16 },
        { name: 'Universiti Kebangsaan Malaysia (UKM)', count: 15 }, { name: 'Management & Science University (MSU)', count: 1 },
      ]},
      { region: 'Philippines', items: [{ name: 'Pangasinan State University', count: 18 }, { name: 'Batangas State University', count: 11 }]},
      { region: 'France', items: [{ name: "Université Le Havre Normandie", count: 9 }, { name: 'VetAgro Sup', count: 4 }, { name: "CESI École d'Ingénieurs", count: 2 }]},
      { region: 'Germany', items: [{ name: 'DHBW Ravensburg', count: 3 }, { name: 'Universität Hamburg', count: 3 }, { name: 'Frankfurt University of Applied Sciences', count: 1 }]},
      { region: 'Brunei', items: [{ name: 'Universiti Brunei Darussalam (UBD)', count: 10 }]},
      { region: 'Poland', items: [{ name: 'University of Warsaw', count: 6 }]},
      { region: 'Australia', items: [{ name: 'Deakin University', count: 6 }]},
      { region: 'Pakistan', items: [{ name: 'Lahore University of Management Sciences', count: 4 }]},
      { region: 'Netherlands', items: [{ name: 'Fontys University of Applied Sciences', count: 2 }, { name: 'Maastricht University', count: 1 }]},
      { region: 'Cambodia', items: [{ name: 'Royal University of Law & Economics', count: 3 }]},
      { region: 'Singapore', items: [{ name: 'Temasek Polytechnic', count: 2 }]},
      { region: 'United Kingdom', items: [{ name: 'Liverpool John Moores University', count: 1 }]},
      { region: 'Belgium', items: [{ name: 'EPHEC Brussels', count: 1 }]},
      { region: 'Mexico', items: [{ name: 'Universidad Panamericana', count: 1 }]},
    ],
    faculties: [
      { name: 'Social & Political Science (FISIP)', count: 51 }, { name: 'Humanities (FIB)', count: 29 },
      { name: 'Law (FH)', count: 25 }, { name: 'Psychology (FPsi)', count: 23 },
      { name: 'Economy & Business (FEB)', count: 17 }, { name: 'Vocational Studies (FV)', count: 5 },
      { name: 'Veterinary Medicine (FKH)', count: 4 }, { name: 'Medicine, Nursing & others', count: 5 },
    ],
    facultyNote: 'Based on course registrations for AMERTA XXI, XXIII & XXIV. Students may be enrolled in multiple faculties simultaneously.',
    analysis: [
      { text: 'Across 4 batches (2024–2027), AMERTA enrolled **207 students from 14 countries** at 24 partner universities.' },
      { text: '**Malaysia is the dominant sending country** across all batches, contributing 114 students — 55% of total enrollment.' },
      { text: 'Southeast Asian students (Malaysia + Philippines + Brunei) collectively account for over **74%** of total enrollment.' },
      { text: '**FISIP and FIB** are the most popular study destinations, together hosting 39% of all course registrations across 3 batches.' },
      { text: 'Geographic diversity grew steadily: **7 → 9 → 7 → 12 countries** per batch, with XXIV being the most diverse to date.' },
    ],
  },
  '21': {
    label: 'AMERTA XXI', period: '2024 – 2025 Sem. 1', students: 68, countries: 7, uniCount: 10,
    nationalities: [
      { country: 'Malaysia', count: 58 }, { country: 'France', count: 3 },
      { country: 'Germany', count: 2 }, { country: 'Brunei', count: 2 },
      { country: 'Belgium', count: 1 }, { country: 'Netherlands', count: 1 },
      { country: 'Pakistan', count: 1 },
    ],
    universities: [
      { region: 'Malaysia', items: [{ name: 'Universiti Sultan Zainal Abidin (UniSZA)' }, { name: 'Universiti Teknologi MARA (UiTM)' }, { name: 'Universiti Kebangsaan Malaysia (UKM)' }, { name: 'Management & Science University (MSU)' }]},
      { region: 'France', items: [{ name: "Université Le Havre Normandie" }]},
      { region: 'Germany', items: [{ name: 'Universität Hamburg' }]},
      { region: 'Brunei', items: [{ name: 'Universiti Brunei Darussalam (UBD)' }]},
      { region: 'Belgium', items: [{ name: 'EPHEC Brussels' }]},
      { region: 'Netherlands', items: [{ name: 'Fontys University of Applied Sciences' }]},
      { region: 'Pakistan', items: [{ name: 'Lahore University of Management Sciences' }]},
    ],
    faculties: [
      { name: 'Social & Political Science (FISIP)', count: 46 }, { name: 'Law (FH)', count: 14 },
      { name: 'Psychology (FPsi)', count: 12 }, { name: 'Economy & Business (FEB)', count: 3 },
      { name: 'Humanities (FIB)', count: 2 }, { name: 'Vocational Studies (FV)', count: 1 }, { name: 'Medicine (FK)', count: 1 },
    ],
    facultyNote: 'From Course-Students sheet. Students may be enrolled in multiple faculties simultaneously.',
    analysis: [
      { text: 'AMERTA XXI was the **largest single-batch enrollment** with 68 students — establishing the program\'s scale and operational blueprint.' },
      { text: '**Malaysia dominated with 85%** of participants (58 of 68), primarily from UniSZA, reflecting a strong bilateral partnership.' },
      { text: '**FISIP was the clear academic preference** — 46 of 79 course registrations (58%) — the highest single-faculty concentration across all batches.' },
      { text: 'Despite the strong Malaysian majority, 7 countries were represented, including niche academic perspectives from Belgium, the Netherlands, and Germany.' },
    ],
  },
  '22': {
    label: 'AMERTA XXII', period: '2024 – 2025 Sem. 2', students: 22, countries: 9, uniCount: 9,
    nationalities: [
      { country: 'Philippines', count: 8 }, { country: 'Poland', count: 3 },
      { country: 'France', count: 2 }, { country: 'Cambodia', count: 2 },
      { country: 'Brunei', count: 2 }, { country: 'Australia', count: 1 },
      { country: 'Mexico', count: 1 }, { country: 'Pakistan', count: 1 },
      { country: 'Germany', count: 1 },
    ],
    universities: [
      { region: 'Philippines', items: [{ name: 'Pangasinan State University' }, { name: 'Batangas State University' }]},
      { region: 'Poland', items: [{ name: 'University of Warsaw' }]},
      { region: 'France', items: [{ name: "Université Le Havre Normandie" }]},
      { region: 'Cambodia', items: [{ name: 'Royal University of Law & Economics' }]},
      { region: 'Brunei', items: [{ name: 'Universiti Brunei Darussalam (UBD)' }]},
      { region: 'Australia', items: [{ name: 'Deakin University' }]},
      { region: 'Mexico', items: [{ name: 'Universidad Panamericana' }]},
      { region: 'Pakistan', items: [{ name: 'Lahore University of Management Sciences' }]},
      { region: 'Germany', items: [{ name: 'Frankfurt University of Applied Sciences' }]},
    ],
    faculties: null,
    facultyNote: null,
    analysis: [
      { text: 'AMERTA XXII was the **smallest but most proportionally diverse** batch: 9 nationalities for just 22 students — averaging 1 university per country.' },
      { text: 'The Philippines led with **8 students (36%)**. For the first time in program history, **Malaysia was entirely absent** from the batch.' },
      { text: '**First appearances** of Mexico and Cambodia — significantly broadening AMERTA\'s global reach beyond Southeast Asia.' },
      { text: '**Faculty enrollment data was not recorded** for this batch — a documentation gap that was addressed in subsequent semesters.' },
    ],
  },
  '23': {
    label: 'AMERTA XXIII', period: '2025 – 2026', students: 67, countries: 7, uniCount: 10,
    nationalities: [
      { country: 'Malaysia', count: 42 }, { country: 'Philippines', count: 11 },
      { country: 'Germany', count: 5 }, { country: 'Australia', count: 4 },
      { country: 'Brunei', count: 3 }, { country: 'Netherlands', count: 1 },
      { country: 'UK', count: 1 },
    ],
    universities: [
      { region: 'Malaysia', items: [{ name: 'Universiti Sultan Zainal Abidin (UniSZA)' }, { name: 'Universiti Teknologi MARA (UiTM)' }, { name: 'Universiti Kebangsaan Malaysia (UKM)' }]},
      { region: 'Philippines', items: [{ name: 'Pangasinan State University' }, { name: 'Batangas State University' }]},
      { region: 'Germany', items: [{ name: 'DHBW Ravensburg' }, { name: 'Universität Hamburg' }]},
      { region: 'Australia', items: [{ name: 'Deakin University' }]},
      { region: 'Brunei', items: [{ name: 'Universiti Brunei Darussalam (UBD)' }]},
      { region: 'Netherlands', items: [{ name: 'Fontys / Maastricht University' }]},
      { region: 'United Kingdom', items: [{ name: 'Liverpool John Moores University' }]},
    ],
    faculties: [
      { name: 'Humanities (FIB)', count: 17 }, { name: 'Law (FH)', count: 10 },
      { name: 'Economy & Business (FEB)', count: 6 }, { name: 'Psychology (FPsi)', count: 5 },
      { name: 'Nursing (FKep)', count: 1 }, { name: 'Vocational Studies (FV)', count: 1 },
      { name: 'Science & Technology (FST)', count: 1 },
    ],
    facultyNote: 'From KRS Baru course registration sheet. Students may be enrolled in multiple faculties simultaneously.',
    analysis: [
      { text: 'AMERTA XXIII **returned to scale with 67 students** after the smaller XXII batch, maintaining the program\'s momentum.' },
      { text: 'Malaysia remained the majority at 63%, but **Philippines grew to 16%** and Germany showed a notable 5-student cohort.' },
      { text: '**Humanities (FIB) overtook FISIP** as the top faculty for the first time — 17 registrations reflect growing interest in Indonesian language and culture.' },
      { text: 'The **first British student** joined from Liverpool John Moores University, adding a new European partner to the program network.' },
    ],
  },
  '24': {
    label: 'AMERTA XXIV', period: '2026 – 2027', students: 50, countries: 12, uniCount: 13,
    nationalities: [
      { country: 'Malaysia', count: 14 }, { country: 'Philippines', count: 10 },
      { country: 'France', count: 9 }, { country: 'Poland', count: 3 },
      { country: 'Brunei', count: 3 }, { country: 'Germany', count: 2 },
      { country: 'Singapore', count: 2 }, { country: 'Pakistan', count: 2 },
      { country: 'Netherlands', count: 1 }, { country: 'Australia', count: 1 },
      { country: 'Cambodia', count: 1 },
    ],
    universities: [
      { region: 'Malaysia', items: [{ name: 'Universiti Sultan Zainal Abidin (UniSZA)' }, { name: 'Universiti Teknologi MARA (UiTM)' }, { name: 'Universiti Kebangsaan Malaysia (UKM)' }]},
      { region: 'Philippines', items: [{ name: 'Pangasinan State University' }, { name: 'Batangas State University' }]},
      { region: 'France', items: [{ name: "Université Le Havre Normandie" }, { name: 'VetAgro Sup' }, { name: "CESI École d'Ingénieurs" }]},
      { region: 'Poland', items: [{ name: 'University of Warsaw' }]},
      { region: 'Brunei', items: [{ name: 'Universiti Brunei Darussalam (UBD)' }]},
      { region: 'Germany', items: [{ name: 'Frankfurt University of Applied Sciences' }]},
      { region: 'Singapore', items: [{ name: 'Temasek Polytechnic' }]},
      { region: 'Pakistan', items: [{ name: 'Lahore University of Management Sciences' }]},
      { region: 'Netherlands', items: [{ name: 'Fontys University of Applied Sciences' }]},
      { region: 'Australia', items: [{ name: 'Deakin University' }]},
      { region: 'Cambodia', items: [{ name: 'Royal University of Law & Economics' }]},
    ],
    faculties: [
      { name: 'Humanities (FIB)', count: 10 }, { name: 'Economy & Business (FEB)', count: 8 },
      { name: 'Psychology (FPsi)', count: 6 }, { name: 'Social & Political Science (FISIP)', count: 5 },
      { name: 'Veterinary Medicine (FKH)', count: 4 }, { name: 'Vocational Studies (FV)', count: 3 },
      { name: 'Law (FH)', count: 1 }, { name: 'Medicine (FK)', count: 1 },
      { name: 'Advanced Technology (FTMM)', count: 1 },
    ],
    facultyNote: 'From Matkul per Mahasiswa sheet. Data reflects applicants — final enrollment may vary. Students may enroll across multiple faculties.',
    analysis: [
      { text: 'AMERTA XXIV is the **most geographically diverse batch** with 12 countries — more than any previous iteration of the program.' },
      { text: '**France emerged as the 3rd-largest sender** (18%, 9 students) from 3 partner institutions — reflecting a maturing European partnership network.' },
      { text: '**Singapore appeared for the first time**, and Veterinary Medicine (FKH) and Advanced Technology (FTMM) debuted as Airlangga study destinations.' },
      { text: 'Malaysia\'s share dropped from 85% (XXI) to 28% (XXIV), demonstrating strong **diversification of the sending-country portfolio** over program iterations.' },
    ],
  },
}

export const TABS: { key: string; label: string }[] = [
  { key: 'all', label: 'All Batches' },
  { key: '21', label: 'AMERTA XXI' },
  { key: '22', label: 'AMERTA XXII' },
  { key: '23', label: 'AMERTA XXIII' },
  { key: '24', label: 'AMERTA XXIV' },
]
