function Hero() {
  return (
    <section
      id="hero"
      className="panel animate-enter relative overflow-hidden px-6 py-10 sm:px-8 sm:py-14 lg:px-12"
    >
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.05),_transparent_50%)]" />
      <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="eyebrow">AI Spend Visibility</span>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            Stop Overpaying <br className="hidden sm:block" /> For AI Tools
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            See exactly where your startup wastes money on ChatGPT, Claude,
            Cursor, and APIs before renewals stack up and shadow spend gets
            normalized.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button type="button" className="btn-primary" aria-label="Run a free AI spend audit">
              Run Free Audit
            </button>
            <button type="button" className="btn-secondary" aria-label="See a sample audit report">
              See sample report
            </button>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium text-slate-500">
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
              Audit output in under 5 minutes
            </span>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
              Finance, engineering, and ops friendly
            </span>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ['22%', 'avg recoverable waste'],
              ['6 tools', 'tracked per startup'],
              ['1 page', 'shareable summary'],
            ].map(([value, label]) => (
              <div key={label} className="stat-card border-slate-200 bg-slate-50/50">
                <p className="text-2xl font-bold text-slate-900">{value}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="panel overflow-hidden border-slate-200/60 bg-slate-50/30 p-5 shadow-sm">
          <div className="relative flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">Waste snapshot</p>
              <p className="mt-1 text-xs text-slate-500">
                Last 30 days across teams
              </p>
            </div>
            <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
              Live
            </span>
          </div>

          <div className="relative mt-5 space-y-3">
            {[
              ['Unused seats', '$2,480', '11 licenses inactive'],
              ['Duplicate tools', '$1,320', 'Cursor + Copilot overlap'],
              ['API creep', '$860', 'Weekend spend anomaly'],
            ].map(([label, value, meta]) => (
              <div
                key={label}
                className="rounded-2xl border border-slate-200 bg-white p-4 transition duration-300 hover:border-blue-400/30 hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
                    <p className="mt-1 text-2xl font-bold text-slate-900">
                      {value}
                    </p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-blue-50 ring-1 ring-blue-100" />
                </div>
                <p className="mt-2 text-xs text-slate-500">{meta}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

  )
}

export default Hero
