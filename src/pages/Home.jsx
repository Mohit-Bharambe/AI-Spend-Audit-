import AuditResults from './AuditResults'
import Hero from '../components/Hero'
import Layout from '../components/Layout'
import SpendForm from '../components/SpendForm'
import { Helmet } from 'react-helmet'

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
      <Helmet>
        <title>Spend Audit | Identify and Cut Startup AI Waste</title>
        <meta name="description" content="Audit your AI tooling stack in seconds. Identify overlapping subscriptions, unused seats, and over-provisioned enterprise tiers." />
        <meta property="og:title" content="Spend Audit | Cut Startup AI Waste" />
        <meta property="og:description" content="Audit your AI tooling stack in seconds. Stop overpaying for AI." />
        <meta property="og:image" content="https://xdjulsytbmiqvfdulfii.supabase.co/storage/v1/object/public/assets/audit-preview.png" />
      </Helmet>
      <Hero />
      <SpendForm />
      <AuditResults />

      <section id="features" className="mt-10 lg:mt-14">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow">Features</span>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Built for fast-moving startups <br className="hidden sm:block" /> with too many AI bills.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-slate-600">
            A focused landing page for product-led SaaS buyers who want clarity
            before finance, founders, and ops lose track of what they are paying
            for.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group panel relative overflow-hidden px-6 py-6 hover:-translate-y-1 hover:border-blue-400/30 hover:shadow-lg"
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-40 transition duration-300 group-hover:opacity-60`}
              />
              <div className="relative">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-xs font-bold tracking-wider text-slate-900 shadow-sm">
                  {feature.title
                    .split(' ')
                    .map((word) => word[0])
                    .join('')
                    .slice(0, 2)}
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {feature.description}
                </p>
                <div className="mt-5 h-px w-full bg-slate-200/60" />
                <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Practical savings signal
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="supported-tools" className="mt-10 grid gap-4 lg:mt-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="panel px-6 py-7">
          <span className="eyebrow">Supported Tools</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Works across your AI products.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Review spend across chat tools, coding copilots, and AI workspaces
            in one place without forcing a heavyweight rollout first.
          </p>
        </div>

        <div className="panel bg-slate-50/30 px-6 py-7">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className={`group rounded-3xl border border-slate-200 bg-white px-5 py-5 text-left transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:shadow-md`}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-100 bg-slate-900 text-xs font-bold tracking-wider text-white shadow-sm">
                  {tool.mark}
                </div>
                <p className="text-sm font-bold text-slate-900">
                  {tool.name}
                </p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Spend ready
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="benefits" className="mt-10 grid gap-4 lg:mt-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="panel px-6 py-7">
          <span className="eyebrow">Benefits</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Less AI waste. <br /> Better purchasing decisions.
          </h2>
          <div className="mt-6 space-y-3">
            {benefits.map((benefit, index) => (
              <div
                key={benefit}
                className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition duration-300 hover:border-blue-200 hover:bg-white"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-sm font-bold text-blue-600">
                  0{index + 1}
                </div>
                <p className="text-sm leading-7 text-slate-600 font-medium">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="panel bg-slate-900 flex flex-col justify-between px-6 py-7 shadow-xl">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Average result
            </p>
            <p className="mt-4 text-5xl font-bold tracking-tight text-white sm:text-6xl">
              27%
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              average waste uncovered from duplicate seats, unused licenses, and
              untracked API usage in early-stage teams.
            </p>
          </div>
          <div className="mt-8 h-2 rounded-full bg-white/10">
            <div className="h-2 w-[68%] rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.4)]" />
          </div>
        </div>
      </section>

      <section id="cta" className="mt-10 lg:mt-14">
        <div className="panel relative overflow-hidden bg-slate-50/50 px-6 py-8 text-center sm:px-8 sm:py-10 border-slate-200">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.05),_transparent_60%)]" />
          <span className="eyebrow">CTA</span>
          <h2 className="relative mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Know where your AI budget leaks <br className="hidden sm:block" /> before the next renewal cycle.
          </h2>
          <p className="relative mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Run a fast audit, identify wasted seats, and tighten your AI stack
            without adding procurement drag.
          </p>
          <button type="button" className="btn-primary relative mt-8">
            Run Free Audit
          </button>
        </div>
      </section>

      <footer
        id="footer"
        className="mt-10 flex flex-col gap-4 border-t border-slate-200 px-2 py-8 text-xs font-bold uppercase tracking-widest text-slate-400 sm:mt-14 sm:flex-row sm:items-center sm:justify-between"
      >
        <p>Spend Audit &copy; 2026</p>
        <div className="flex gap-6">
          <a href="#features" className="transition hover:text-slate-900">
            Features
          </a>
          <a href="#supported-tools" className="transition hover:text-slate-900">
            Tools
          </a>
          <a href="#cta" className="transition hover:text-slate-900">
            Audit
          </a>
        </div>
      </footer>
    </Layout>
  )
}


export default Home
