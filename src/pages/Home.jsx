import Hero from '../components/Hero'
import Layout from '../components/Layout'

const features = [
  {
    title: 'Seat-level visibility',
    description:
      'Track who is actually using paid AI seats and surface idle licenses before renewals hit.',
  },
  {
    title: 'Vendor overlap detection',
    description:
      'Find teams paying for multiple tools that solve the same workflow across engineering, design, and ops.',
  },
  {
    title: 'API spend monitoring',
    description:
      'Catch runaway usage, token spikes, and background spend before the invoice becomes a surprise.',
  },
]

const tools = ['ChatGPT', 'Claude', 'Cursor', 'GitHub Copilot', 'Gemini', 'OpenAI API']

const benefits = [
  'Cut duplicate AI subscriptions without slowing the team.',
  'Give founders one clean view of spend, seat usage, and waste.',
  'Turn scattered vendor bills into one actionable audit.',
]

function Home() {
  return (
    <Layout>
      <Hero />

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

        <div className="grid gap-4 lg:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="panel px-6 py-6">
              <div className="mb-5 h-12 w-12 rounded-2xl border border-cyan-300/20 bg-cyan-300/8" />
              <h3 className="text-xl font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="supported-tools" className="mt-8 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="panel px-6 py-6">
          <span className="eyebrow">Supported Tools</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white">
            Audit the stack your team already uses.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            Pull a simple spend picture across seat-based apps and API vendors
            without needing a heavyweight procurement workflow first.
          </p>
        </div>

        <div className="panel px-6 py-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {tools.map((tool) => (
              <div
                key={tool}
                className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-5 text-center text-sm font-medium text-slate-200"
              >
                {tool}
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
