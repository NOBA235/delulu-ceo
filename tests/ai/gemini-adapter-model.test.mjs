import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

test("Gemini adapter defaults to the supported Gemini 3.8 Flash model", () => {
  const source = fs.readFileSync(
    path.join(process.cwd(), "lib/ai/providers/gemini-adapter.ts"),
    "utf8"
  );

  assert.match(source, /gemini-3\.8-flash/);
});
