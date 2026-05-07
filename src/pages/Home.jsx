import AuditResults from './AuditResults'
import Hero from '../components/Hero'
import Layout from '../components/Layout'
import SpendForm from '../components/SpendForm'

const features = [
  {
    title: 'AI Spend Analysis',
    description:
      'Break down where money goes across subscriptions, credits, API usage, and idle seats before waste compounds.',
    accent:
      'from-cyan-400/20 via-sky-400/10 to-transparent',
  },
  {
    title: 'Plan Optimization',
    description:
      'Spot teams paying for premium tiers they do not need and identify cheaper plans that preserve the same output.',
    accent:
      'from-emerald-400/20 via-teal-400/10 to-transparent',
  },
  {
    title: 'Tool Alternatives',
    description:
      'Compare overlapping vendors and surface lower-cost replacements when multiple products solve the same job.',
    accent:
      'from-violet-400/20 via-fuchsia-400/10 to-transparent',
  },
  {
    title: 'Credit Savings',
    description:
      'Track credit burn and usage spikes so prepaid balances last longer and surprise API invoices stay under control.',
    accent:
      'from-amber-400/20 via-orange-400/10 to-transparent',
  },
  {
    title: 'Shareable Reports',
    description:
      'Generate clean summaries founders, finance, and ops can review together without digging through scattered dashboards.',
    accent:
      'from-slate-200/16 via-slate-400/8 to-transparent',
  },
]

const tools = [
  {
    name: 'ChatGPT',
    mark: 'CG',
    tone: 'from-emerald-300/18 to-transparent',
  },
  {
    name: 'Claude',
    mark: 'CL',
    tone: 'from-orange-300/18 to-transparent',
  },
  {
    name: 'Cursor',
    mark: 'CU',
    tone: 'from-cyan-300/18 to-transparent',
  },
  {
    name: 'GitHub Copilot',
    mark: 'GH',
    tone: 'from-slate-200/18 to-transparent',
  },
  {
    name: 'Gemini',
    mark: 'GE',
    tone: 'from-violet-300/18 to-transparent',
  },
  {
    name: 'Windsurf',
    mark: 'WS',
    tone: 'from-sky-300/18 to-transparent',
  },
]

const benefits = [
  'Cut duplicate AI subscriptions without slowing the team.',
  'Give founders one clean view of spend, seat usage, and waste.',
  'Turn scattered vendor bills into one actionable audit.',
]

function Home() {
  return (
    <Layout>
      <Hero />
      <SpendForm />
      <AuditResults />

      <section id="features" className="mt-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow">Features</span>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
              Built for fast-moving startups with too many AI bills.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            A focused landing page for product-led SaaS buyers who want clarity
            before finance, founders, and ops lose track of what they are paying
            for.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group panel relative overflow-hidden px-6 py-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/25 hover:bg-white/[0.06]"
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-70 transition duration-300 group-hover:opacity-100`}
              />
              <div className="relative">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-xs font-semibold tracking-[0.18em] text-white">
                  {feature.title
                    .split(' ')
                    .map((word) => word[0])
                    .join('')
                    .slice(0, 2)}
                </div>
              <h3 className="text-xl font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                {feature.description}
              </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="supported-tools" className="mt-8 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="panel px-6 py-6">
          <span className="eyebrow">Supported Tools</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white">
            Works across the AI products your team is already paying for.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            Review spend across chat tools, coding copilots, and AI workspaces
            in one place without forcing a heavyweight rollout first.
          </p>
        </div>

        <div className="panel px-6 py-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className={`group rounded-2xl border border-white/8 bg-gradient-to-br ${tool.tone} px-4 py-5 text-left transition duration-300 hover:-translate-y-1 hover:border-cyan-300/20 hover:bg-white/[0.05]`}
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/70 text-xs font-semibold tracking-[0.16em] text-white">
                  {tool.mark}
                </div>
                <p className="text-sm font-medium text-slate-100">
                  {tool.name}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                  Spend ready
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="benefits" className="mt-8 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="panel px-6 py-6">
          <span className="eyebrow">Benefits</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white">
            Less AI waste. Better purchasing decisions.
          </h2>
          <div className="mt-6 space-y-3">
            {benefits.map((benefit, index) => (
              <div
                key={benefit}
                className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-sm font-semibold text-cyan-200">
                  0{index + 1}
                </div>
                <p className="text-sm leading-7 text-slate-300">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="panel flex flex-col justify-between px-6 py-6">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-slate-500">
              Example result
            </p>
            <p className="mt-4 text-5xl font-semibold tracking-[-0.06em] text-white">
              27%
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              average waste uncovered from duplicate seats, unused licenses, and
              untracked API usage in early-stage teams.
            </p>
          </div>
          <div className="mt-8 h-2 rounded-full bg-white/8">
            <div className="h-2 w-[68%] rounded-full bg-cyan-300" />
          </div>
        </div>
      </section>

      <section id="cta" className="mt-8">
        <div className="panel px-6 py-8 text-center sm:px-8 sm:py-10">
          <span className="eyebrow">CTA</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
            Know where your AI budget leaks before the next renewal cycle.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Run a fast audit, identify wasted seats, and tighten your AI stack
            without adding procurement drag.
          </p>
          <button
            type="button"
            className="mt-8 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Run Free Audit
          </button>
        </div>
      </section>

      <footer
        id="footer"
        className="mt-8 flex flex-col gap-4 border-t border-white/8 px-2 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between"
      >
        <p>AI Spend Audit</p>
        <div className="flex gap-5">
          <a href="#features" className="transition hover:text-slate-300">
            Features
          </a>
          <a href="#supported-tools" className="transition hover:text-slate-300">
            Tools
          </a>
          <a href="#cta" className="transition hover:text-slate-300">
            Audit
          </a>
        </div>
      </footer>
    </Layout>
  )
}

export default Home
