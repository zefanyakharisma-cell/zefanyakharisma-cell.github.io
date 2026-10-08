// Approximate [longitude, latitude] for the cities and regions in the domestic
// partner directory. Region-level entries (e.g. "Papua", "NTT") use a central point.
export const CITY_COORDS: Record<string, [number, number]> = {
  Surabaya: [112.75, -7.25], Jakarta: [106.85, -6.21], Sidoarjo: [112.72, -7.45], Malang: [112.63, -7.98],
  Tangerang: [106.63, -6.18], Yogyakarta: [110.37, -7.8], Semarang: [110.42, -6.99], Bandung: [107.61, -6.91],
  Medan: [98.67, 3.59], Bali: [115.19, -8.41], NTT: [121.08, -8.66], Denpasar: [115.22, -8.65],
  Bogor: [106.8, -6.6], Makassar: [119.43, -5.15], Jember: [113.7, -8.17], Padang: [100.36, -0.95],
  Ambon: [128.18, -3.7], Jombang: [112.23, -7.55], Papua: [138.08, -4.27], Sumatera: [101.5, 0.3],
  Sumedang: [107.92, -6.86], Surakarta: [110.82, -7.57], Banten: [106.15, -6.4], Gresik: [112.65, -7.16],
  Situbondo: [114.01, -7.71], Lombok: [116.32, -8.65], Lamongan: [112.41, -7.12], Kediri: [112.01, -7.82],
  Sorong: [131.26, -0.88], Palopo: [120.2, -3.0], Pasuruan: [112.91, -7.65], Jayapura: [140.72, -2.53],
  Bukittinggi: [100.37, -0.31], Batam: [104.03, 1.13], Aceh: [95.32, 5.55], Minahasa: [124.84, 1.31],
  Pontianak: [109.34, -0.03], Manado: [124.84, 1.47], Kupang: [123.61, -10.18],
}
