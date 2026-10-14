import { z } from "zod";

export const PitchResponseSchema = z.object({
  startupName: z.string().trim().min(1, { message: "Startup name is required" }),
  startupConcept: z.string().trim().min(1, { message: "Startup concept is required" }),
  investmentRationale: z.string().trim().min(1, { message: "Investment rationale is required" }),
  forbesHeadline: z.string().trim().min(1, { message: "Forbes headline is required" }),
  riskAnalysis: z.string().trim().min(1, { message: "Risk analysis is required" }),
  ceoVerdict: z.string().trim().min(1, { message: "CEO verdict is required" }),
});

export type PitchResponse = z.infer<typeof PitchResponseSchema>;
