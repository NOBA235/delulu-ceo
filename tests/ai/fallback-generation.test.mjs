import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

test("generatePitch includes fallback logic for provider outages", () => {
  const source = fs.readFileSync(
    path.join(process.cwd(), "lib/ai/generate-pitch.ts"),
    "utf8"
  );

  assert.match(source, /buildFallbackPitch/);
  assert.match(source, /high demand|temporarily unavailable|API_KEY is not configured/);
});
