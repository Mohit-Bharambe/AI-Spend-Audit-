import useLocalStorage from '../hooks/useLocalStorage'

const planOptions = ['Free', 'Pro', 'Team', 'Business', 'Enterprise']
const useCaseOptions = ['Coding', 'Research', 'Writing', 'Data', 'Mixed']

const initialTools = [
  {
    tool: 'Cursor',
    plan: 'Pro',
    spend: 40,
    seats: 2,
  },
]

function SpendForm() {
  const [tools, setTools] = useLocalStorage('audit-tools', initialTools)
  const [teamSize, setTeamSize] = useLocalStorage('audit-team-size', 12)
  const [primaryUseCase, setPrimaryUseCase] = useLocalStorage(
    'audit-primary-use-case',
    'Coding',
  )

  const updateTool = (field, value) => {
    setTools((currentTools) =>
      currentTools.map((entry, index) =>
        index === 0 ? { ...entry, [field]: value } : entry,
      ),
    )
  }

  return (
    <section id="spend-form" className="mt-8">
      <div className="panel relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-full bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.16),_transparent_45%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <span className="eyebrow">Spend Form</span>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
              Enter your stack and see where spend starts drifting.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Start with one tool entry, add your team context, and model the
              audit input before building a full savings report.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <label className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Tool Name
                </span>
                <input
                  type="text"
                  value={tools[0].tool}
                  onChange={(event) => updateTool('tool', event.target.value)}
                  className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/35"
                  placeholder="Cursor"
                />
              </label>

              <label className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Plan Dropdown
                </span>
                <select
                  value={tools[0].plan}
                  onChange={(event) => updateTool('plan', event.target.value)}
                  className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/35"
                >
                  {planOptions.map((plan) => (
                    <option key={plan} value={plan}>
                      {plan}
                    </option>
                  ))}
                </select>
              </label>

              <label className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Monthly Spend Input
                </span>
                <input
                  type="number"
                  min="0"
                  value={tools[0].spend}
                  onChange={(event) =>
                    updateTool('spend', Number(event.target.value))
                  }
                  className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/35"
                  placeholder="40"
                />
              </label>

              <label className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Seats Input
                </span>
                <input
                  type="number"
                  min="1"
                  value={tools[0].seats}
                  onChange={(event) =>
                    updateTool('seats', Number(event.target.value))
                  }
                  className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/35"
                  placeholder="2"
                />
              </label>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Total Team Size
                </span>
                <input
                  type="number"
                  min="1"
                  value={teamSize}
                  onChange={(event) => setTeamSize(Number(event.target.value))}
                  className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/35"
                  placeholder="12"
                />
              </label>

              <label className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Primary Use Case
                </span>
                <select
                  value={primaryUseCase}
                  onChange={(event) => setPrimaryUseCase(event.target.value)}
                  className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/35"
                >
                  {useCaseOptions.map((useCase) => (
                    <option key={useCase} value={useCase}>
                      {useCase}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-5 shadow-[0_30px_100px_rgba(2,6,23,0.45)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">
                    Example Tool Card
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Live preview of the first spend entry
                  </p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-xs font-semibold tracking-[0.16em] text-cyan-200">
                  {(tools[0].tool || 'CU').slice(0, 2).toUpperCase()}
                </div>
              </div>

              <div className="mt-5 rounded-3xl border border-white/8 bg-gradient-to-br from-white/[0.07] to-transparent p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-2xl font-semibold text-white">
                      {tools[0].tool || 'Cursor'}
                    </p>
                    <p className="mt-2 text-sm text-slate-400">
                      Plan: {tools[0].plan}
                    </p>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-300">
                    {primaryUseCase}
                  </span>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/8 bg-slate-950/70 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      Spend
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-white">
                      ${tools[0].spend}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-slate-950/70 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      Seats
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-white">
                      {tools[0].seats}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white">Form data shape</p>
                <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  Array
                </span>
              </div>
              <pre className="mt-4 overflow-x-auto rounded-2xl border border-white/8 bg-slate-950/80 p-4 text-xs leading-6 text-slate-300">
{`[
  {
    tool: "${tools[0].tool}",
    plan: "${tools[0].plan}",
    spend: ${tools[0].spend},
    seats: ${tools[0].seats}
  }
]`}
              </pre>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/8 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    Total Team Size
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {teamSize}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    Primary Use Case
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {primaryUseCase}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SpendForm
