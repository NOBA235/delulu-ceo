import test from "node:test";
import assert from "node:assert/strict";
import { z } from "zod";

const PitchResponseSchema = z.object({
  startupName: z.string().trim().min(1, { message: "Startup name is required" }),
  startupConcept: z.string().trim().min(1, { message: "Startup concept is required" }),
  investmentRationale: z.string().trim().min(1, { message: "Investment rationale is required" }),
  forbesHeadline: z.string().trim().min(1, { message: "Forbes headline is required" }),
  riskAnalysis: z.string().trim().min(1, { message: "Risk analysis is required" }),
  ceoVerdict: z.string().trim().min(1, { message: "CEO verdict is required" }),
});

test("accepts complete valid 6-field pitch object", () => {
  const validData = {
    startupName: "Keynote Capital",
    startupConcept: "A platform converting impulse buys into executive theatre.",
    investmentRationale: "Every developer thinks a new switch equals career advancement.",
    forbesHeadline: "Local Founder Raises $4B After 17th Mechanical Keyboard.",
    riskAnalysis: "Cash flow is currently an abstract theoretical construct.",
    ceoVerdict: "You do not need another keyboard. You need therapy.",
  };

  const result = PitchResponseSchema.safeParse(validData);
  assert.equal(result.success, true);
  assert.equal(result.data.startupName, "Keynote Capital");
});

test("rejects pitch object missing a required field", () => {
  const incompleteData = {
    startupName: "Keynote Capital",
    startupConcept: "A platform converting impulse buys into executive theatre.",
    // missing investmentRationale
    forbesHeadline: "Local Founder Raises $4B After 17th Mechanical Keyboard.",
    riskAnalysis: "Cash flow is currently an abstract theoretical construct.",
    ceoVerdict: "You do not need another keyboard.",
  };

  const result = PitchResponseSchema.safeParse(incompleteData);
  assert.equal(result.success, false);
});

test("rejects pitch object with empty or whitespace-only field", () => {
  const invalidData = {
    startupName: "Keynote Capital",
    startupConcept: "   ",
    investmentRationale: "Good rationale",
    forbesHeadline: "Headline",
    riskAnalysis: "Risks",
    ceoVerdict: "Verdict",
  };

  const result = PitchResponseSchema.safeParse(invalidData);
  assert.equal(result.success, false);
});
