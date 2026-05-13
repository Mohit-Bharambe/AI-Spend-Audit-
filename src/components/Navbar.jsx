import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className="panel sticky top-4 z-20 animate-enter px-4 py-4 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <Link to="/" className="flex min-w-0 items-center gap-4 hover:opacity-80 transition-opacity">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-900 shadow-sm transition-transform group-hover:scale-105">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M12 12h.01M12 12h.01M11 12h.01" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-900">
              SpendLens
            </p>
            <p className="truncate text-xs text-slate-500">
              Finance-aware AI cost clarity
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <a href="#features" className="nav-link">
            Features
          </a>
          <a href="#supported-tools" className="nav-link">
            Tools
          </a>
          <a href="#benefits" className="nav-link">
            Benefits
          </a>
          <Link to="/results" className="nav-link">
            Results
          </Link>
        </nav>

        <Link to="/results" className="btn-primary px-5 py-2.5 text-sm" aria-label="Navigate to results page and run audit">
          Run Free Audit
        </Link>
      </div>
    </header>
  )
}

export default Navbar
