import test from "node:test";
import assert from "node:assert/strict";
import { z } from "zod";

const PitchRequestSchema = z.object({
  confession: z
    .string()
    .trim()
    .min(1, { message: "Even delusion needs a business idea. Confess something first." })
    .max(1000, { message: "Your delusion is too ambitious. Please limit your confession to 1,000 characters." }),
});

test("rejects empty string", () => {
  const result = PitchRequestSchema.safeParse({ confession: "" });
  assert.equal(result.success, false);
  assert.equal(
    result.error.issues[0].message,
    "Even delusion needs a business idea. Confess something first."
  );
});

test("rejects whitespace-only string", () => {
  const result = PitchRequestSchema.safeParse({ confession: "   \n\t  " });
  assert.equal(result.success, false);
  assert.equal(
    result.error.issues[0].message,
    "Even delusion needs a business idea. Confess something first."
  );
});

test("rejects confessions over 1000 characters", () => {
  const longText = "a".repeat(1001);
  const result = PitchRequestSchema.safeParse({ confession: longText });
  assert.equal(result.success, false);
  assert.equal(
    result.error.issues[0].message,
    "Your delusion is too ambitious. Please limit your confession to 1,000 characters."
  );
});

test("accepts valid confession under 1000 characters", () => {
  const validText = "I spent all my savings on a mechanical keyboard.";
  const result = PitchRequestSchema.safeParse({ confession: validText });
  assert.equal(result.success, true);
  assert.equal(result.data.confession, validText);
});

