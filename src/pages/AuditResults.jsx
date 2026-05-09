import { generateAudit } from '../utils/auditEngine'
import { mockInput } from '../data/mockAuditInput'
import useLocalStorage from '../hooks/useLocalStorage'

console.log('Audit Engine Test Output:', generateAudit(mockInput));

const fallbackTools = [
  {
    tool: 'Cursor',
    plan: 'Business',
    spend: 80,
    seats: 2,
  },
]

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

function buildTransitionLabel(toolEntry) {
  const currentLabel = `${toolEntry.tool} ${toolEntry.currentPlan}`.trim()

  if (toolEntry.recommendedPlan && toolEntry.recommendedPlan !== toolEntry.currentPlan) {
    return `${currentLabel} -> ${toolEntry.recommendedPlan}`
  }

  return currentLabel
}

function AuditResults() {
  const [tools] = useLocalStorage('audit-tools', fallbackTools)
  const [teamSize] = useLocalStorage('audit-team-size', 12)
  const [primaryUseCase] = useLocalStorage('audit-primary-use-case', 'Coding')

  const auditedTools = generateAudit(tools.map(t => ({
    tool: t.tool,
    plan: t.plan,
    monthlySpend: Number(t.spend) || 0,
    seats: Number(t.seats) || 1,
    useCase: primaryUseCase,
  })))

  const summary = auditedTools.reduce(
    (totals, toolEntry) => ({
      currentSpend: totals.currentSpend + toolEntry.currentSpend,
      recommendedSpend: totals.recommendedSpend + toolEntry.optimizedSpend,
      monthlySavings: totals.monthlySavings + toolEntry.monthlySavings,
    }),
    {
      currentSpend: 0,
      recommendedSpend: 0,
      monthlySavings: 0,
    },
  )

  const annualSavings = summary.monthlySavings * 12
  const shouldShowCredexCta = summary.monthlySavings > 500

  return (
    <section id="audit-results" className="mt-10 lg:mt-14">
      <div className="panel animate-enter relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.04),_transparent_60%)]" />
        <div className="relative">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="eyebrow">Audit Results</span>
              <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                You could save with a <br className="hidden sm:block" /> tighter AI spend setup.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                Rule-based recommendations built from your submitted tool, plan,
                spend, seat count, and primary use case.
              </p>
            </div>
            <div className="rounded-3xl border border-blue-100 bg-blue-50 px-5 py-4 text-xs font-bold uppercase tracking-wider text-blue-700 shadow-sm">
              Context: {teamSize} Seats / {primaryUseCase}
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="panel bg-slate-900 p-6 shadow-xl">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Potential Savings
              </p>
              <p className="mt-4 text-5xl font-bold tracking-tight text-white sm:text-6xl">
                {formatCurrency(summary.monthlySavings)}<span className="text-2xl text-slate-500">/mo</span>
              </p>
              <p className="mt-3 text-2xl font-bold text-blue-400">
                {formatCurrency(annualSavings)}/year
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="stat-card border-white/5 bg-white/5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Current Spend
                  </p>
                  <p className="mt-1 text-2xl font-bold text-white">
                    {formatCurrency(summary.currentSpend)}
                  </p>
                </div>
                <div className="stat-card border-white/5 bg-white/5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Recommended
                  </p>
                  <p className="mt-1 text-2xl font-bold text-white">
                    {formatCurrency(summary.recommendedSpend)}
                  </p>
                </div>
              </div>
            </div>

            <div className="panel bg-slate-50/50 p-6">
              <p className="text-sm font-bold text-slate-900">Key Recommendations</p>
              <div className="mt-5 space-y-3">
                {auditedTools.map((toolEntry) => (
                  <div
                    key={`${toolEntry.tool}-${toolEntry.currentPlan}`}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:border-blue-400/30"
                  >
                    <p className="text-sm font-bold text-slate-900">
                      {toolEntry.recommendedPlan !== toolEntry.currentPlan ? `Switch to ${toolEntry.recommendedPlan}` : 'Optimized'}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {toolEntry.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
              <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                Per-Tool Analysis
              </h3>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Current {'->'} Recommended
              </p>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              {auditedTools.map((toolEntry) => {
                const currentSpend = toolEntry.currentSpend
                const monthlySavings = toolEntry.monthlySavings
                const annualToolSavings = toolEntry.annualSavings
                const recommendedSpend = toolEntry.optimizedSpend

                return (
                  <article
                    key={`${toolEntry.tool}-${toolEntry.currentPlan}-card`}
                    className="group rounded-[32px] border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-blue-400/20"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Strategy
                        </p>
                        <h4 className="mt-2 text-2xl font-bold text-slate-900">
                          {buildTransitionLabel(toolEntry)}
                        </h4>
                      </div>
                      <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-right shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600/80">
                          Savings
                        </p>
                        <p className="mt-1 text-2xl font-bold text-emerald-700">
                          {formatCurrency(monthlySavings)}<span className="text-xs ml-1 opacity-60">/mo</span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      <div className="stat-card border-slate-100 bg-slate-50/50">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Current
                        </p>
                        <p className="mt-1 text-xl font-bold text-slate-900">
                          {formatCurrency(currentSpend)}
                        </p>
                      </div>
                      <div className="stat-card border-slate-100 bg-slate-50/50">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Target
                        </p>
                        <p className="mt-1 text-xl font-bold text-slate-900">
                          {formatCurrency(recommendedSpend)}
                        </p>
                      </div>
                      <div className="stat-card border-slate-100 bg-slate-50/50">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Annual
                        </p>
                        <p className="mt-1 text-xl font-bold text-slate-900">
                          {formatCurrency(annualToolSavings)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Rationalization
                      </p>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {toolEntry.reason}
                      </p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>

          <div className="panel bg-slate-50/50 mt-8 px-6 py-10 text-center border-dashed border-2 border-slate-200">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Final Recommendation
            </p>
            {shouldShowCredexCta ? (
              <>
                <h3 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                  Speak with our optimization experts
                </h3>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
                  Your projected savings are large enough to justify a more
                  deliberate credits and vendor review before the next billing
                  cycle closes.
                </p>
                <button type="button" className="btn-primary mt-8">
                  Get Started with Credex
                </button>
              </>
            ) : (
              <>
                <h3 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                  Your stack is highly efficient.
                </h3>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
                  The audit shows your current setup is lean. No immediate 
                  interventions are required for this tool stack configuration.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}


export default AuditResults
