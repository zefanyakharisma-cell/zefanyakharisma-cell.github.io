/** Re-mounts on every navigation, so each page fades in (CSS: .page-enter). */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>
}
