import { pricingData } from "../data/pricingData";

export function getPlanPrice(tool: string, plan: string): number {
  const key = tool.toLowerCase().replace(/\s+/g, "_");
  const toolData = (pricingData as any)[key];
  if (!toolData) return 0;
  
  const planData = toolData[plan.toLowerCase()];
  if (!planData || typeof planData.price !== "number") return 0;
  
  return planData.price;
}
