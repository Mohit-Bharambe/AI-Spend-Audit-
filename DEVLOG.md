# SpendLens Development Log

This log tracks the honest, human journey of building SpendLens—from raw idea to a production-hardened tool.

## Day 8 — 2026-05-13
**Hours worked:** 5
**What I did:**
- Performed Lighthouse optimization sweep: removed console logs, added aria-labels, and updated SEO meta tags.
- Documented the audit engine logic with extensive comments for better maintainability.
- Finalized all documentation including GTM strategy, unit economics, and user interview notes.
- Fixed a major routing bug where the Results page would crash if navigated to with an invalid ID.

**What I learned:**
- Small accessibility wins (like `aria-label`) significantly improve the "feel" of a tool, making it feel like a professional product rather than a weekend experiment.
- "Perfect is the enemy of shipped." I spent way too long today tweaking the hero gradient when I should have been testing the Supabase edge cases.

**Blockers:**
- None. Everything is green and ready for submission.

**Plan for tomorrow:**
- Project submission and public launch.

---

## Day 7 — 2026-05-12
**Hours worked:** 9
**What I did:**
- Implemented the viral share engine using `react-share` and `react-helmet-async`.
- Integrated Supabase for persistent lead storage and shared audit reports.
- Wrote the initial Vitest suite to prevent mathematical regressions in the audit logic.

**What I learned:**
- Module resolution in Vite/Vitest can be a nightmare. I wasted 2 hours debugging a test failure only to find out Vitest was picking up a ghost `.js` file instead of my new `.ts` version. Deleted the old file and everything passed instantly.

**Blockers:**
- The Supabase connection kept dropping during local development because of a misconfigured `.env` variable. Fixed after triple-checking the API keys.

---

## Day 6 — 2026-05-11
**Hours worked:** 4
**What I did:**
- Resumed work after a two-day break for university exams.
- Polished the `SpendForm` UI and improved mobile responsiveness across the entire app.
- Added "deterministic" rules for seat minimums on ChatGPT and Cursor Business plans.

**What I learned:**
- Coming back to a codebase after a 48-hour break is a great way to spot "ugly" code you previously ignored. I refactored the entire `Layout` component because it felt unnecessarily complex.

**Blockers:**
- Struggled with Tailwind v4's new theme configuration style for about an hour before realizing I didn't need a `tailwind.config.js` anymore.

---

## Day 5 — 2026-05-10
**Hours worked:** 0
**What I did:** 
- Focused entirely on semester exam preparation (Computer Networks and OS).
**What I learned:** 
- Time management is a brutal skill to master. Balancing a high-stakes shipping deadline with academic requirements is stressful but necessary for growth.
**Blockers:** 
- Zero dev time due to exam schedule.

---

## Day 4 — 2026-05-09
**Hours worked:** 0
**What I did:** 
- Focused on semester exam preparation.
**What I learned:** 
- Taking a total break from the screen actually helped me solve a logic problem I was having with the tool-overlap engine in my head.
**Blockers:** 
- Exam preparation.

---

## Day 3 — 2026-05-08
**Hours worked:** 3
**What I did:** 
- Reviewed the core audit logic and fixed major inconsistencies in how savings were being projected.
- Started drafting the technical documentation (ARCHITECTURE.md).
**What I learned:** 
- Realized that finance-related recommendation logic requires much clearer reasoning than generic AI summaries. Users won't trust the math if the "Reasoning" field feels like boilerplate.
**Blockers:** 
- College exam preparation started cutting into dev time. I had to prioritize studying over the Supabase integration.

---

## Day 2 — 2026-05-07
**Hours worked:** 8
**What I did:**
- Built the initial `auditEngine.ts` and tool-pricing lookup utility.
- Integrated the OpenAI API for the executive summary feature.
- Set up the project structure and primary navigation.

**What I learned:**
- AI is terrible at arithmetic. I initially tried to have OpenAI calculate the savings, but it kept hallucinating tier prices. I pivoted to a hardcoded rules engine for the math and kept the AI strictly for the human-readable summary.

---

## Day 1 — 2026-05-06
**Hours worked:** 6
**What I did:**
- Initialized the repository with Vite, React, and TypeScript.
- Built the "Hero" section and the initial `SpendForm`.
- Established the design system (gradients, glassmorphism, and typography).

**What I learned:**
- Modern web design is 90% about white space and subtle shadows. My first version was too cluttered; removing half the borders made it look 10x more premium.
