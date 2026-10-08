/** Renders text with **bold** markers as <strong>, without injecting HTML. */
export function Rich({ text }: { text: string }) {
  const parts = text.split('**')
  return <>{parts.map((p, i) => (i % 2 ? <strong key={i} className="text-midnight">{p}</strong> : p))}</>
}
