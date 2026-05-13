import { AuditResult } from "../types/audit";

const FALLBACK_SUMMARY =
  "Your stack shows opportunities for meaningful AI cost optimization through plan adjustments and smarter infrastructure allocation.";

/**
 * Generates a ~100-word AI summary of audit results.
 * Uses OpenAI API when available, falls back to a template otherwise.
 */
export async function generateSummary(results: AuditResult[]): Promise<string> {
  // Build a concise data snapshot for the prompt
  const snapshot = results.map((r) => ({
    tool: r.tool,
    currentPlan: r.currentPlan,
    recommended: r.recommendedPlan,
    monthlySavings: r.monthlySavings,
    reason: r.reason,
  }));

  const totalMonthlySavings = results.reduce((s, r) => s + r.monthlySavings, 0);
  const totalAnnualSavings = totalMonthlySavings * 12;

  const prompt = `You are an AI infrastructure cost optimization consultant.

Summarize this startup's AI spend audit in under 100 words.

Mention:
- biggest waste areas
- optimization opportunities
- annual savings potential ($${totalAnnualSavings}/year)
- realistic actionable recommendations

Keep tone professional and concise.

Audit Data:
${JSON.stringify(snapshot, null, 2)}`;

  try {
    const apiKey = import.meta.env.VITE_AI_API_KEY;

    if (!apiKey) {
      console.warn("VITE_AI_API_KEY not set — using fallback summary.");
      return buildTemplateSummary(results, totalMonthlySavings, totalAnnualSavings);
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a professional financial auditor specialized in AI SaaS spend optimization.",
          },
          { role: "user", content: prompt },
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content?.trim();

    return content || buildTemplateSummary(results, totalMonthlySavings, totalAnnualSavings);
  } catch (error) {

    // Graceful fallback — never crash the UI
    return buildTemplateSummary(results, totalMonthlySavings, totalAnnualSavings);
  }
}

/**
 * Template-based fallback summary when the AI API is unavailable.
 */
function buildTemplateSummary(
  results: AuditResult[],
  monthlySavings: number,
  annualSavings: number
): string {
  const highSeverity = results.filter((r) => r.severity === "high");
  const hasOverlap = results.some((r) => r.reason.toLowerCase().includes("overlap"));

  let summary = `This audit identified $${monthlySavings}/month ($${annualSavings}/year) in recoverable AI spend across ${results.length} tools.`;

  if (highSeverity.length > 0) {
    summary += ` The biggest opportunities are in ${highSeverity.map((r) => r.tool).join(" and ")}, where plan downgrades could yield immediate savings.`;
  }

  if (hasOverlap) {
    summary += " Overlapping chat tool subscriptions were detected — consolidating to one primary tool is recommended.";
  }

  summary += " Focus on seat-level optimization and tier alignment for the fastest impact.";

  return summary;
}
