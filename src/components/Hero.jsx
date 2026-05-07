function Hero() {
  return (
    <section
      id="hero"
      className="panel relative overflow-hidden px-6 py-10 sm:px-8 sm:py-14 lg:px-12"
    >
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.22),_transparent_46%)]" />
      <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="eyebrow">AI Spend Visibility</span>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
            Stop Overpaying For AI Tools
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            See exactly where your startup wastes money on ChatGPT, Claude,
            Cursor, and APIs before renewals stack up and shadow spend gets
            normalized.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Run Free Audit
            </button>
            <p className="text-sm text-slate-400">
              Audit output in under 5 minutes.
            </p>
          </div>
        </div>

        <div className="rounded-[30px] border border-white/10 bg-slate-950/80 p-5 shadow-[0_30px_100px_rgba(2,6,23,0.55)]">
          <div className="flex items-center justify-between border-b border-white/8 pb-4">
            <div>
              <p className="text-sm font-medium text-white">Waste snapshot</p>
              <p className="mt-1 text-sm text-slate-400">
                Last 30 days across teams
              </p>
            </div>
            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
              Live
            </span>
          </div>

          <div className="mt-5 space-y-4">
            {[
              ['Unused seats', '$2,480', '11 licenses inactive'],
              ['Duplicate tools', '$1,320', 'Cursor + Copilot overlap'],
              ['API creep', '$860', 'Weekend spend anomaly'],
            ].map(([label, value, meta]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/8 bg-white/[0.03] p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-400">{label}</p>
                    <p className="mt-2 text-2xl font-semibold text-white">
                      {value}
                    </p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-cyan-300/10 ring-1 ring-cyan-300/20" />
                </div>
                <p className="mt-3 text-sm text-slate-400">{meta}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
