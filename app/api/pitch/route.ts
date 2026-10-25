import { NextRequest, NextResponse } from "next/server";
import { PitchRequestSchema } from "@/lib/validation/pitch-request";
import { generatePitch } from "@/lib/ai/generate-pitch";
import { checkRateLimit } from "@/lib/security/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  // 1. IP Rate Limiting
  const clientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
  const rateLimit = checkRateLimit(clientIp);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        error: {
          code: "RATE_LIMIT_EXCEEDED",
          message:
            "Too many pitches in flight. Please pause a moment before consulting imaginary investors again.",
        },
      },
      { status: 429 }
    );
  }

  // 2. Parse JSON Payload
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          code: "INVALID_JSON",
          message: "Request payload must be valid JSON.",
        },
      },
      { status: 400 }
    );
  }

  // 3. Validate Request Schema
  const parseResult = PitchRequestSchema.safeParse(body);
  if (!parseResult.success) {
    const firstIssue = parseResult.error.issues[0];
    const isTooLong = firstIssue?.code === "too_big";
    return NextResponse.json(
      {
        error: {
          code: isTooLong ? "CONFESSION_TOO_LONG" : "INVALID_INPUT",
          message:
            firstIssue?.message || "Please provide a valid confession string.",
        },
      },
      { status: isTooLong ? 400 : 400 }
    );
  }

  const { confession } = parseResult.data;

  // 4. Generate Pitch via Provider
  try {
    const pitch = await generatePitch(confession);
    return NextResponse.json(pitch, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("API /api/pitch generation error:", errorMessage);

    if (errorMessage.includes("timed out")) {
      return NextResponse.json(
        {
          error: {
            code: "GENERATION_TIMEOUT",
            message:
              "Our imaginary investors have gone silent. Your delusion is safe—let's try again.",
          },
        },
        { status: 504 }
      );
    }

    if (
      errorMessage.includes("prepayment credits") ||
      errorMessage.includes("RESOURCE_EXHAUSTED") ||
      errorMessage.includes("402")
    ) {
      return NextResponse.json(
        {
          error: {
            code: "PROVIDER_QUOTA_EXHAUSTED",
            message:
              "Gemini API quota or credits depleted (402 / Resource Exhausted). Please check your API key at aistudio.google.com or use a key from a project with active free-tier quota.",
          },
        },
        { status: 502 }
      );
    }

    if (errorMessage.includes("API_KEY is not configured")) {
      return NextResponse.json(
        {
          error: {
            code: "PROVIDER_CONFIG_ERROR",
            message:
              "AI_API_KEY is not configured on the server. Please add your key to .env.local to enable live pitch generation.",
          },
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        error: {
          code: "PROVIDER_ERROR",
          message:
            "Our imaginary investors have gone silent. Your delusion is safe—let's try again.",
        },
      },
      { status: 502 }
    );
  }
}

