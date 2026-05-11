import { ToolInput, AuditResult } from "../types/audit";
import { getPlanPrice } from "./getPlanPrice";

export function generateAudit(tools: ToolInput[]): AuditResult[] {
  const toolNames = tools.map(t => t.tool.toLowerCase());
  const results: AuditResult[] = tools.map((tool) => {
    // Defensive sanitization
    const monthlySpend = Math.max(0, tool.monthlySpend);
    const seats = Math.max(1, tool.seats);

    let recommendedPlan = tool.plan;
    let optimizedSpend = monthlySpend;
    let reason = "Your current plan seems appropriate for your usage.";
    let severity: "low" | "medium" | "high" = "low";

    const toolName = tool.tool.toLowerCase();
    const planName = tool.plan.toLowerCase();

    // RULE 1: ChatGPT Team Overkill
    if (toolName === "chatgpt" && planName === "team" && seats <= 2) {
      recommendedPlan = "plus";
      optimizedSpend = getPlanPrice("chatgpt", "plus") * seats;
      reason = "ChatGPT Team is typically unnecessary for teams smaller than 3 users. Individual Plus accounts provide similar power for less.";
      severity = "medium";
    }

    // RULE 2: Cursor Business Overkill
    if (toolName === "cursor" && planName === "business" && seats <= 3) {
      recommendedPlan = "pro";
      optimizedSpend = getPlanPrice("cursor", "pro") * seats;
      reason = "Cursor Business is optimized for larger teams. For 3 users or fewer, Pro plans usually provide all required features.";
      severity = "medium";
    }

    // RULE 3: Enterprise Overkill
    if (planName === "enterprise" && seats < 10) {
      // Find a likely business/team plan to suggest
      const fallbackPlan = toolName === "chatgpt" ? "team" : "pro";
      recommendedPlan = fallbackPlan;
      optimizedSpend = getPlanPrice(toolName, fallbackPlan) * seats;
      reason = "Enterprise plans typically require a 10-seat minimum for value. Downgrading to a Team or Pro tier could save significant budget.";
      severity = "high";
    }

    // RULE 4: API Usage
    if (toolName.includes("api") || toolName.includes("openai direct")) {
      recommendedPlan = "Credex Credits";
      optimizedSpend = monthlySpend * 0.8; // Assume 20% savings via Credex
      reason = "High-volume API users can often reduce infrastructure costs by 20-30% through discounted credit marketplaces like Credex.";
      severity = "high";
    }

    // RULE 5: Duplicate Tool Logic (Check for overlap)
    const chatTools = ["chatgpt", "claude", "gemini"];
    const activeChatTools = toolNames.filter(name => chatTools.includes(name));
    
    if (chatTools.includes(toolName) && activeChatTools.length > 1) {
      reason += ` Overlap detected with ${activeChatTools.filter(n => n !== toolName).join(", ")}. Consolidating to one primary chat tool is recommended.`;
      if (severity !== "high") severity = "medium";
    }

    // Ensure optimizedSpend never exceeds current spend
    optimizedSpend = Math.min(optimizedSpend, monthlySpend);
    const savings = Math.max(0, monthlySpend - optimizedSpend);

    return {
      tool: tool.tool,
      currentPlan: tool.plan,
      recommendedPlan,
      currentSpend: monthlySpend,
      optimizedSpend,
      monthlySavings: savings,
      annualSavings: savings * 12,
      reason,
      severity,
    };
  });

  return results;
}

