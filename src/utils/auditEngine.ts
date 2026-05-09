import { ToolInput, AuditResult } from "../types/audit";
import { getPlanPrice } from "./getPlanPrice";

export function generateAudit(tools: ToolInput[]): AuditResult[] {
  const toolNames = tools.map(t => t.tool.toLowerCase());
  const results: AuditResult[] = tools.map((tool) => {
    let recommendedPlan = tool.plan;
    let optimizedSpend = tool.monthlySpend;
    let reason = "Your current plan seems appropriate for your usage.";
    let severity: "low" | "medium" | "high" = "low";

    const toolName = tool.tool.toLowerCase();
    const planName = tool.plan.toLowerCase();

    // RULE 1: ChatGPT Team Overkill
    if (toolName === "chatgpt" && planName === "team" && tool.seats <= 2) {
      recommendedPlan = "plus";
      optimizedSpend = getPlanPrice("chatgpt", "plus") * tool.seats;
      reason = "ChatGPT Team is typically unnecessary for teams smaller than 3 users. Individual Plus accounts provide similar power for less.";
      severity = "medium";
    }

    // RULE 2: Cursor Business Overkill
    if (toolName === "cursor" && planName === "business" && tool.seats <= 3) {
      recommendedPlan = "pro";
      optimizedSpend = getPlanPrice("cursor", "pro") * tool.seats;
      reason = "Cursor Business is optimized for larger teams. For 3 users or fewer, Pro plans usually provide all required features.";
      severity = "medium";
    }

    // RULE 3: Enterprise Overkill
    if (planName === "enterprise" && tool.seats < 10) {
      // Find a likely business/team plan to suggest
      const fallbackPlan = toolName === "chatgpt" ? "team" : "pro";
      recommendedPlan = fallbackPlan;
      optimizedSpend = getPlanPrice(toolName, fallbackPlan) * tool.seats;
      reason = "Enterprise plans typically require a 10-seat minimum for value. Downgrading to a Team or Pro tier could save significant budget.";
      severity = "high";
    }

    // RULE 4: API Usage
    if (toolName.includes("api") || toolName.includes("openai direct")) {
      recommendedPlan = "Credex Credits";
      optimizedSpend = tool.monthlySpend * 0.8; // Assume 20% savings via Credex
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

    return {
      tool: tool.tool,
      currentPlan: tool.plan,
      recommendedPlan,
      currentSpend: tool.monthlySpend,
      optimizedSpend,
      monthlySavings: tool.monthlySpend - optimizedSpend,
      annualSavings: (tool.monthlySpend - optimizedSpend) * 12,
      reason,
      severity,
    };
  });

  return results;
}
