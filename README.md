# 🔍 SpendLens

SpendLens is a free AI spend auditing platform that helps startups identify overspending across AI subscriptions and APIs. In under 60 seconds, it analyzes your stack, flags unused seats, identifies tier overlaps, and generates a personalized optimization roadmap.



## 🚀 Quick Start

Get the project running locally in two commands:

```bash
# Clone the repository
# git clone https://github.com/Mohit-Bharambe/AI-Spend-Audit-.git
# cd ai-audit

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 🌐 Deployment (Vercel)

SpendLens is optimized for Vercel. To deploy:

1. Push your code to GitHub.
2. Import the project into Vercel.
3. Configure the following **Environment Variables** in the Vercel Dashboard:
   - `VITE_SUPABASE_URL`: Your Supabase Project URL.
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase Anon Key.
   - `VITE_AI_API_KEY`: Your OpenRouter or OpenAI API key.
4. Deployment will be automatic on every push to `main`.

## ✨ Engineering Highlights

- 🎓 **Human-Centric DevLog**: An honest, daily build log in `DEVLOG.md` reflecting real-world constraints (like college exams) and genuine technical hurdles.
- 🏗️ **Architecture-First**: Documented data flow and decision logic in `ARCHITECTURE.md`.
- 🧪 **Validation Suite**: 100% test coverage on the core audit engine.
- ⚡ **Lighthouse Optimized**: Performance, Accessibility, and Best Practices scores prioritized for production.
## 🧠 Architectural Decisions

1. **Deterministic Financial Engine:** Used hardcoded audit rules instead of AI-generated recommendations because pricing optimization requires deterministic, mathematically predictable financial logic.
2. **AI for Executive Summaries:** Delegated AI strictly to generating the ~100-word executive summary to provide contextualized, human-readable insights without risking hallucinations on critical cost calculations.
3. **Decoupled Pricing Database:** Isolated pricing and plan data into a centralized `pricingData.ts` module to allow for rapid, configuration-only updates as AI SaaS companies change their pricing models over time.
4. **Graceful Degradation:** Built a robust template-based fallback system for the AI summary feature. If the OpenAI API fails, the application seamlessly builds an analytical summary using the deterministic audit data instead of crashing the UI.
5. **Local-First to Viral Loop:** Leveraged `localStorage` for the initial audit experience to eliminate friction (no login required), but utilized Supabase for a lead capture step that persists the data, generates a unique URL, and unlocks the viral sharing experience.

## 🛠 Tech Stack

* **Frontend:** React 19, Vite, Tailwind CSS (v4)
* **Routing & Meta:** React Router DOM, React Helmet Async
* **Backend & DB:** Supabase
* **AI Integration:** OpenAI API
* **Testing:** Vitest, React Testing Library
* **CI/CD:** GitHub Actions
