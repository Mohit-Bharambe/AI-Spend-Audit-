import { AuditResult } from "../types/audit";

/**
 * Generates a professional AI-driven summary of audit results.
 * @param results The array of audit results to summarize.
 * @returns A string containing the personalized analysis.
 */
export async function getAiAuditSummary(results: AuditResult[]): Promise<string> {
  const FALLBACK_MESSAGE = `
    Your AI stack shows multiple optimization opportunities that could reduce recurring 
    software spend while maintaining productivity and performance. We recommend focusing 
    on seat consolidation and tier downgrades where usage doesn't justify premium costs.
  `.trim();

  // Constructing the data snippet for the AI
  const auditSnapshot = results.map(r => ({
    tool: r.tool,
    saving: r.monthlySavings,
    reason: r.reason
  }));

  const prompt = `
    You are an AI infrastructure cost optimization expert.
    Summarize this startup's AI spending inefficiencies professionally in under 100 words.
    Focus on the "why" and the business impact, not just the numbers.
    
    Audit Data:
    ${JSON.stringify(auditSnapshot, null, 2)}
  `;

  try {
    // Note: In a real production environment, this should point to a secure backend 
    // or use a properly configured environment variable for the API key.
    const apiKey = import.meta.env.VITE_AI_API_KEY;
    
    if (!apiKey) {
      console.warn("VITE_AI_API_KEY not found. Using fallback summary.");
      return FALLBACK_MESSAGE;
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a professional financial auditor specialized in AI SaaS." },
          { role: "user", content: prompt }
        ],
        max_tokens: 200,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`AI API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content?.trim() || FALLBACK_MESSAGE;

  } catch (error) {
    console.error("Failed to fetch AI summary:", error);
    // Graceful handling as per assignment requirements
    return FALLBACK_MESSAGE;
  }
}
