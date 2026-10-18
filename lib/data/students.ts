// International students supported at Airlangga Global Engagement (aggregate counts).
import { DATA as amerta } from './amerta'

/** Inbound & scholarship students: top nationalities. */
export const inboundNations = [
  { name: 'Yemen', count: 60 }, { name: 'Pakistan', count: 55 }, { name: 'Timor-Leste', count: 27 }, { name: 'Myanmar', count: 14 },
  { name: 'Gambia', count: 14 }, { name: 'Nigeria', count: 10 }, { name: 'Sudan', count: 9 }, { name: 'Tanzania', count: 9 },
]

/** AMERTA exchange students: top nationalities (batches 21–24), from the AMERTA page data. */
export const amertaNations = [...amerta.all.nationalities]
  .sort((x, y) => y.count - x.count)
  .slice(0, 8)
  .map(n => ({ name: n.country, count: n.count }))

export const studentPrograms = [
  { value: String(amerta.all.students), label: 'AMERTA exchange', sub: `Batches 21–24 · ${amerta.all.countries} countries` },
  { value: '27', label: 'KNB scholarship', sub: 'Government-funded · 10+ countries' },
  { value: '9', label: 'TIAS scholarship', sub: 'Government-funded · 5 countries' },
  { value: '251', label: 'Inbound & welfare', sub: 'All programs · 25+ countries' },
]

export const gender = {
  amerta: [{ label: 'Female', value: 111 }, { label: 'Male', value: 47 }],
  inbound: [{ label: 'Female', value: 38 }, { label: 'Male', value: 72 }],
}

export const studyLevel = [{ label: 'Undergraduate', value: 145 }, { label: "Master's", value: 11 }]
