# AI Summary Prompting Strategy

This document outlines the iteration process for the AI Audit Summary generation.

## Final Prompt
**Role:** AI Infrastructure Cost Optimization Expert
**Constraint:** Under 100 words, Professional tone.
**Content:** Focus on business impact and the "why" behind the waste.

```text
You are an AI infrastructure cost optimization expert.
Summarize this startup's AI spending inefficiencies professionally in under 100 words.
Focus on the "why" and the business impact, not just the numbers.

Audit Data:
{{audit_results}}
```

### Rationale
- **Why it works:** By providing the `AuditResult` reasons, the AI can synthesize a narrative rather than just recalculating sums (which it's prone to failing at).
- **Tone:** Professionalism is key for founder/finance personas.

---

## Iteration History

### Failed Prompt 1: Too broad
```text
Look at this AI spend and tell me how to save money.
```
- **Why it failed:** Too vague. The output was conversational and included general advice (like "cancel subscriptions") rather than specific analysis based on the provided data.
- **Change:** Added specific roles and persona constraints.

### Failed Prompt 2: Math-heavy
```text
Calculate the total savings and summarize the tools: {{audit_results}}
```
- **Why it failed:** Large Language Models (LLMs) are notorious for hallucinating math. It occasionally provided a total that didn't match our `calculateSavings.ts` logic.
- **Change:** Removed calculation requests. The engine handles math; the AI handles the **Executive Summary**.

### Failed Prompt 3: Wordiness
```text
Provide a detailed report on the following audit data...
```
- **Why it failed:** Resulted in 300-500 word essays that broke the UI layout and diluted the immediate value proposition.
- **Change:** Enforced a strict 100-word limit.

---

## Error Handling Rationale
The application implements a **Graceful Fallback** mechanism. If the API key is missing, rate-limited, or the service is down, the system returns a pre-validated professional summary to ensure the user experience remains premium and uninterrupted.
