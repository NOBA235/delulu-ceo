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

async function handlePitchRequest(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json(
      {
        error: {
          code: "INVALID_JSON",
          message: "Request payload must be valid JSON.",
        },
      },
      { status: 400 }
    );
  }

  const parseResult = PitchRequestSchema.safeParse(body);
  if (!parseResult.success) {
    const firstIssue = parseResult.error.issues[0];
    const isTooLong = firstIssue?.code === "too_big";
    return Response.json(
      {
        error: {
          code: isTooLong ? "CONFESSION_TOO_LONG" : "INVALID_INPUT",
          message:
            firstIssue?.message || "Please provide a valid confession string.",
        },
      },
      { status: 400 }
    );
  }

  return Response.json({ success: true, confession: parseResult.data.confession });
}

test("POST /api/pitch rejects empty confession with 400", async () => {
  const req = new Request("http://localhost:3000/api/pitch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ confession: "" }),
  });

  const res = await handlePitchRequest(req);
  assert.equal(res.status, 400);

  const data = await res.json();
  assert.equal(data.error.code, "INVALID_INPUT");
  assert.equal(
    data.error.message,
    "Even delusion needs a business idea. Confess something first."
  );
});

test("POST /api/pitch rejects oversized confession with 400", async () => {
  const req = new Request("http://localhost:3000/api/pitch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ confession: "x".repeat(1005) }),
  });

  const res = await handlePitchRequest(req);
  assert.equal(res.status, 400);

  const data = await res.json();
  assert.equal(data.error.code, "CONFESSION_TOO_LONG");
  assert.equal(
    data.error.message,
    "Your delusion is too ambitious. Please limit your confession to 1,000 characters."
  );
});

test("POST /api/pitch rejects invalid JSON with 400", async () => {
  const req = new Request("http://localhost:3000/api/pitch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "not-json{",
  });

  const res = await handlePitchRequest(req);
  assert.equal(res.status, 400);

  const data = await res.json();
  assert.equal(data.error.code, "INVALID_JSON");
});
