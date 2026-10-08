// ISO 3166-1 alpha-2 codes, shown as small chips instead of emoji flags.
const CODES: Record<string, string> = {
  Afghanistan: 'AF', Australia: 'AU', Bangladesh: 'BD', Belarus: 'BY', Belgium: 'BE', Brunei: 'BN',
  Cambodia: 'KH', Canada: 'CA', China: 'CN', Egypt: 'EG', Ethiopia: 'ET', France: 'FR', Gambia: 'GM',
  Germany: 'DE', Honduras: 'HN', 'Hong Kong': 'HK', India: 'IN', Indonesia: 'ID', Italy: 'IT', Japan: 'JP',
  Kazakhstan: 'KZ', Kenya: 'KE', 'South Korea': 'KR', Korea: 'KR', Laos: 'LA', Malawi: 'MW', Malaysia: 'MY',
  Mexico: 'MX', Myanmar: 'MM', Netherlands: 'NL', 'New Zealand': 'NZ', Nigeria: 'NG', Pakistan: 'PK',
  Palestine: 'PS', Philippines: 'PH', Poland: 'PL', Russia: 'RU', 'Saudi Arabia': 'SA', 'Sierra Leone': 'SL',
  Singapore: 'SG', Spain: 'ES', 'Sri Lanka': 'LK', Sudan: 'SD', Suriname: 'SR', Switzerland: 'CH',
  Taiwan: 'TW', Thailand: 'TH', 'Timor-Leste': 'TL', Turkey: 'TR', 'Türkiye': 'TR', UK: 'GB',
  Hungary: 'HU', Ireland: 'IE', Lithuania: 'LT', Macau: 'MO', Mongolia: 'MN', Portugal: 'PT', Romania: 'RO',
  'Timor Leste': 'TL', 'United Arab Emirates': 'AE', Tanzania: 'TZ', Zimbabwe: 'ZW',
  'United Kingdom': 'GB', USA: 'US', 'United States': 'US', Vanuatu: 'VU', Vietnam: 'VN', Yemen: 'YE',
}

export function countryCode(country: string): string | null {
  return CODES[country.trim()] ?? null
}
