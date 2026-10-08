// Chart colours from the PCU Design System's secondary palette, in a fixed order.
// Validated with the dataviz palette checker (lightness, chroma, CVD and
// normal-vision separation all pass on white). Two slots sit below 3:1 contrast,
// so every chart here prints its labels and values as text.
export const SERIES = ['#3880d0', '#f37121', '#45b8bc', '#ec008c', '#6aaa43'] as const

/** Single-series magnitude marks use the brand's lead colour. */
export const SINGLE = '#19304b'

export function seriesColor(i: number) {
  return SERIES[i % SERIES.length]
}
