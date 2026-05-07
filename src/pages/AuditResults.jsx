import runAudit from '../data/auditEngine'
import useLocalStorage from '../hooks/useLocalStorage'

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
  const currentLabel = `${toolEntry.tool} ${toolEntry.plan}`.trim()

  if (toolEntry.audit.recommendedPlan) {
    return `${currentLabel} -> ${toolEntry.tool} ${toolEntry.audit.recommendedPlan}`
  }

  if (toolEntry.audit.recommendedTool) {
    return `${currentLabel} -> ${toolEntry.audit.recommendedTool}`
  }

  return currentLabel
}

function AuditResults() {
  const [tools] = useLocalStorage('audit-tools', fallbackTools)
  const [teamSize] = useLocalStorage('audit-team-size', 12)
  const [primaryUseCase] = useLocalStorage('audit-primary-use-case', 'Coding')

  const auditedTools = runAudit(tools, {
    teamSize,
    useCase: primaryUseCase,
  })

  const summary = auditedTools.reduce(
    (totals, toolEntry) => {
      const currentSpend = Number(toolEntry.spend) || 0
      const monthlySavings = Number(toolEntry.audit.savings) || 0

      return {
        currentSpend: totals.currentSpend + currentSpend,
        recommendedSpend:
          totals.recommendedSpend + Math.max(currentSpend - monthlySavings, 0),
        monthlySavings: totals.monthlySavings + monthlySavings,
      }
    },
    {
      currentSpend: 0,
      recommendedSpend: 0,
      monthlySavings: 0,
    },
  )

  const annualSavings = summary.monthlySavings * 12

  return (
    <section id="audit-results" className="mt-8">
      <div className="panel relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_60%)]" />
        <div className="relative">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="eyebrow">Audit Results</span>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                You could save with a tighter AI spend setup.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Rule-based recommendations built from your submitted tool, plan,
                spend, seat count, and primary use case.
              </p>
            </div>
            <div className="rounded-3xl border border-cyan-300/15 bg-cyan-300/10 px-5 py-4 text-sm text-cyan-100">
              Team size: {teamSize} · Use case: {primaryUseCase}
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[30px] border border-white/10 bg-slate-950/80 p-6 shadow-[0_30px_100px_rgba(2,6,23,0.55)]">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                You Could Save
              </p>
              <p className="mt-4 text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl">
                {formatCurrency(summary.monthlySavings)}/month
              </p>
              <p className="mt-3 text-2xl font-medium text-cyan-200">
                {formatCurrency(annualSavings)}/year
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    Current Spend
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    {formatCurrency(summary.currentSpend)}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    Recommended Spend
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    {formatCurrency(summary.recommendedSpend)}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-6">
              <p className="text-sm font-medium text-white">Recommendations</p>
              <div className="mt-5 space-y-3">
                {auditedTools.map((toolEntry) => (
                  <div
                    key={`${toolEntry.tool}-${toolEntry.plan}`}
                    className="rounded-2xl border border-white/8 bg-slate-950/70 p-4"
                  >
                    <p className="text-sm font-medium text-white">
                      {toolEntry.audit.recommendation}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {toolEntry.audit.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white">
                Per Tool Cards
              </h3>
              <p className="text-sm text-slate-500">
                Current spend {'->'} recommended spend
              </p>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              {auditedTools.map((toolEntry) => {
                const currentSpend = Number(toolEntry.spend) || 0
                const monthlySavings = Number(toolEntry.audit.savings) || 0
                const annualToolSavings = monthlySavings * 12
                const recommendedSpend = Math.max(currentSpend - monthlySavings, 0)

                return (
                  <article
                    key={`${toolEntry.tool}-${toolEntry.plan}-card`}
                    className="group rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/20"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                          Tool Recommendation
                        </p>
                        <h4 className="mt-3 text-2xl font-semibold text-white">
                          {buildTransitionLabel(toolEntry)}
                        </h4>
                      </div>
                      <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-right">
                        <p className="text-xs uppercase tracking-[0.18em] text-emerald-200/80">
                          Monthly Savings
                        </p>
                        <p className="mt-2 text-2xl font-semibold text-emerald-300">
                          {formatCurrency(monthlySavings)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl border border-white/8 bg-slate-950/70 p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                          Current Spend
                        </p>
                        <p className="mt-2 text-xl font-semibold text-white">
                          {formatCurrency(currentSpend)}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-white/8 bg-slate-950/70 p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                          Recommended Spend
                        </p>
                        <p className="mt-2 text-xl font-semibold text-white">
                          {formatCurrency(recommendedSpend)}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-white/8 bg-slate-950/70 p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                          Annual Savings
                        </p>
                        <p className="mt-2 text-xl font-semibold text-white">
                          {formatCurrency(annualToolSavings)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                        Reason
                      </p>
                      <p className="mt-2 text-sm leading-7 text-slate-300">
                        {toolEntry.audit.reason}
                      </p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>

          <div className="mt-8 rounded-[30px] border border-white/10 bg-slate-950/80 px-6 py-8 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
              CTA
            </p>
            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white">
              Turn these recommendations into a cleaner AI budget.
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Share the audit summary with founders, finance, or engineering and
              clean up wasted spend before the next billing cycle locks in.
            </p>
            <button
              type="button"
              className="mt-8 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Export audit summary
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AuditResults
