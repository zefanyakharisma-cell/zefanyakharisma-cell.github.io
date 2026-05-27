export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="mx-auto px-6 py-5 flex items-center justify-between flex-wrap gap-3" style={{ maxWidth: 480 }}>
        <span className="site-footer-meta">
          © {new Date().getFullYear()} Zefanya Kharisma Nugroho
        </span>
      </div>
    </footer>
  )
}
