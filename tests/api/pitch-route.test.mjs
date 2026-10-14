import test from "node:test";
import assert from "node:assert/strict";
import { POST } from "../../app/api/pitch/route.ts";

test("POST /api/pitch rejects empty confession with 400", async () => {
  const req = new Request("http://localhost:3000/api/pitch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ confession: "" }),
  });

  const res = await POST(req);
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

  const res = await POST(req);
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

  const res = await POST(req);
  assert.equal(res.status, 400);

  const data = await res.json();
  assert.equal(data.error.code, "INVALID_JSON");
});
