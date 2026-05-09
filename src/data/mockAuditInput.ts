import { ToolInput } from "../types/audit";

export const mockInput: ToolInput[] = [
  {
    tool: "chatgpt",
    plan: "team",
    monthlySpend: 60,
    seats: 2,
    useCase: "writing",
  },
  {
    tool: "cursor",
    plan: "business",
    monthlySpend: 120,
    seats: 3,
    useCase: "coding",
  },
  {
    tool: "claude",
    plan: "pro",
    monthlySpend: 20,
    seats: 1,
    useCase: "research",
  },
  {
    tool: "OpenAI API Direct",
    plan: "Pay-as-you-go",
    monthlySpend: 500,
    seats: 1,
    useCase: "infrastructure",
  }
];
