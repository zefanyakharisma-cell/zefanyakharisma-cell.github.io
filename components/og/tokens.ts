// Share-card values, copied from the PCU Design System (project/tokens.json) so the
// cards use the same palette, gradients and geometry as app/styles/pcu.css.

export const ogTokens = {
  midnight: '#19304b',
  white: '#ffffff',
  smoke: '#f1f1f1',
  amber: '#ffbc00',
  teal: '#45b8bc',
  cerise: '#ec008c',
  blue: '#3880d0',
  gradientMidnight: 'linear-gradient(135deg, #245484 0%, #133256 100%)',
  // gradient-aqua turned so the light end sits bottom-right, away from the text (white text on the dark half only).
  gradientAqua: 'linear-gradient(315deg, #54feeb 0%, #133256 60%)',
} as const

/** Section accent: the half ring and the seam. Sunrise and dusk are accents only, never behind text. */
export type OgTheme = 'midnight' | 'sunrise' | 'dusk' | 'aqua'

type Stop = [offset: string, color: string]

export const ogThemes: Record<OgTheme, { panel: string; stat: string; accent: string; stops: Stop[] }> = {
  midnight: { panel: ogTokens.gradientMidnight, stat: ogTokens.amber, accent: ogTokens.amber, stops: [['0', ogTokens.amber], ['1', ogTokens.amber]] },
  sunrise: { panel: ogTokens.gradientMidnight, stat: ogTokens.amber, accent: 'linear-gradient(100deg, #ec008c, #ffbc00)', stops: [['0', '#ec008c'], ['1', '#ffbc00']] },
  dusk: { panel: ogTokens.gradientMidnight, stat: ogTokens.amber, accent: 'linear-gradient(115deg, #ec008c, #3880d0)', stops: [['0', '#ec008c'], ['1', '#3880d0']] },
  aqua: { panel: ogTokens.gradientAqua, stat: ogTokens.teal, accent: 'linear-gradient(135deg, #54feeb, #133256)', stops: [['0', '#54feeb'], ['1', '#45b8bc']] },
}

/** The signature half ring, open at the top (ring-u), on the DS 200×100 source grid. */
export const ringU = 'M0 0 H35 A65 65 0 0 0 165 0 H200 A100 100 0 0 1 0 0 Z'
