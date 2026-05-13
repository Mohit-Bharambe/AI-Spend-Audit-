# AI Prompts Documentation

This document outlines the prompt engineering strategies used for the SpendLens OpenAI integration, detailing what worked, why, and what failed during development.

## Production Prompt

**Full Prompt Used:**
```text
You are an AI infrastructure cost optimization consultant.

Summarize this startup's AI spend audit in under 100 words.

Input Data: {audit_results_json}

Mention:
- biggest waste areas
- optimization opportunities
- annual savings potential
- realistic actionable recommendations

Keep the tone professional, concise, and focused purely on the financial roadmap.
```

**Why it is structured this way:**
- **Role Assignment:** Defining the AI as a "cost optimization consultant" immediately sets the correct professional, analytical tone for an enterprise audience.
- **Hard Constraints:** Specifying "under 100 words" prevents the UI from breaking or stretching indefinitely on the frontend results dashboard.
- **Targeted Injection:** Instead of asking the AI to *calculate* the savings, we pass the pre-calculated, deterministic `audit_results_json` directly into the prompt. The AI acts purely as a linguistic summarizer of facts, entirely eliminating hallucination risk.
- **Formatting Directives:** Explicitly listing bullet points (waste areas, opportunities, savings) ensures the output focuses on actionable insights rather than generic fluff.

---

## Failed Prompt Attempts

**Attempt 1: The "Do It All" Prompt**
```text
Here is a list of tools the user is subscribed to and their team size: {tools}. Tell them how much money they can save by switching tiers and calculate the annual savings.
```
*Why it failed:* The LLM frequently hallucinated pricing data (e.g., claiming ChatGPT Team was $40/user instead of $30) and failed at basic multiplication for seat counts, leading to entirely fabricated financial reports.

**Attempt 2: The "JSON Schema" Prompt**
```text
Analyze this spend and return a JSON object with the recommended plans, optimized spend, and a summary.
```
*Why it failed:* While it generated JSON successfully, the AI still struggled with the deterministic business rules of tier minimums (e.g., Enterprise plans requiring 10 seats). It proved that AI should handle the *prose*, not the *math* or the *schema*. This reversal led directly to building the hardcoded TypeScript engine and delegating only the summary to OpenAI.
