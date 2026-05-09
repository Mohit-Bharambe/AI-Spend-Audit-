import { pricingData } from "../data/pricingData";

export function getPlanPrice(tool: string, plan: string): number {
  const toolData = (pricingData as any)[tool.toLowerCase().replace(" ", "_")];
  if (!toolData) return 0;
  
  const planData = toolData[plan.toLowerCase()];
  return planData ? planData.price : 0;
}
