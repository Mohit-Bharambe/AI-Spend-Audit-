import useLocalStorage from '../hooks/useLocalStorage'

const toolOptions = ['Cursor', 'ChatGPT', 'Claude', 'GitHub Copilot', 'Gemini', 'Windsurf', 'OpenAI API Direct']
const planOptions = ['Free', 'Pro', 'Team', 'Business', 'Enterprise', 'Pay-as-you-go']
const useCaseOptions = ['Coding', 'Research', 'Writing', 'Data', 'Mixed']

const initialTools = [
  {
    tool: 'ChatGPT',
    plan: 'Team',
    spend: 30,
    seats: 1,
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
    <section id="spend-form" className="mt-10 lg:mt-14">
      <div className="panel animate-enter relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-full bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.03),_transparent_50%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <span className="eyebrow">Spend Form</span>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Enter your stack and see <br className="hidden sm:block" /> where spend starts drifting.
              </h2>
              <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                Saved locally
              </span>
            </div>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Start with one tool entry, add your team context, and model the
              audit input before building a full savings report.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <label className="field-shell">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Tool Name
                </span>
                <select
                  value={tools[0].tool}
                  onChange={(event) => updateTool('tool', event.target.value)}
                  className="field-input"
                >
                  {toolOptions.map((tool) => (
                    <option key={tool} value={tool}>
                      {tool}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field-shell">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Plan Dropdown
                </span>
                <select
                  value={tools[0].plan}
                  onChange={(event) => updateTool('plan', event.target.value)}
                  className="field-input"
                >
                  {planOptions.map((plan) => (
                    <option key={plan} value={plan}>
                      {plan}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field-shell">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Monthly Spend
                </span>
                <input
                  type="number"
                  min="0"
                  value={tools[0].spend}
                  onChange={(event) =>
                    updateTool('spend', Number(event.target.value))
                  }
                  className="field-input"
                  placeholder="40"
                />
              </label>

              <label className="field-shell">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Seats Input
                </span>
                <input
                  type="number"
                  min="1"
                  value={tools[0].seats}
                  onChange={(event) =>
                    updateTool('seats', Number(event.target.value))
                  }
                  className="field-input"
                  placeholder="2"
                />
                {tools[0].seats > 50 && (
                  <p className="mt-2 text-[10px] font-medium text-amber-600 animate-pulse">
                    ⚠️ High seat count detected. Consider Enterprise pricing.
                  </p>
                )}
              </label>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="field-shell">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Total Team Size
                </span>
                <input
                  type="number"
                  min="1"
                  value={teamSize}
                  onChange={(event) => setTeamSize(Number(event.target.value))}
                  className="field-input"
                  placeholder="12"
                />
              </label>

              <label className="field-shell">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Primary Use Case
                </span>
                <select
                  value={primaryUseCase}
                  onChange={(event) => setPrimaryUseCase(event.target.value)}
                  className="field-input"
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
            <div className="panel border-slate-200/60 bg-slate-50/50 p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Live Preview
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Your tool entry visualized
                  </p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-200 bg-blue-600 text-xs font-bold tracking-wider text-white shadow-md">
                  {(tools[0].tool || 'CU').slice(0, 2).toUpperCase()}
                </div>
              </div>

              <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-2xl font-bold text-slate-900">
                      {tools[0].tool || 'Cursor'}
                    </p>
                    <p className="mt-1 text-xs font-medium text-slate-500">
                      Plan: {tools[0].plan}
                    </p>
                  </div>
                  <span className="w-fit rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600">
                    {primaryUseCase}
                  </span>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="stat-card border-slate-100 bg-slate-50">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Spend
                    </p>
                    <p className="mt-1 text-3xl font-bold text-slate-900">
                      ${tools[0].spend}
                    </p>
                  </div>
                  <div className="stat-card border-slate-100 bg-slate-50">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Seats
                    </p>
                    <p className="mt-1 text-3xl font-bold text-slate-900">
                      {tools[0].seats}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="panel p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900">Data Schema</p>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  JSON
                </span>
              </div>
              <pre className="mt-4 overflow-x-auto rounded-2xl border border-slate-100 bg-slate-50 p-4 text-[11px] font-medium leading-relaxed text-slate-600">
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
                <div className="stat-card border-slate-100 bg-slate-50/50">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Team Context
                  </p>
                  <p className="mt-1 text-lg font-bold text-slate-900">
                    {teamSize} Members
                  </p>
                </div>
                <div className="stat-card border-slate-100 bg-slate-50/50">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Objective
                  </p>
                  <p className="mt-1 text-lg font-bold text-slate-900">
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
