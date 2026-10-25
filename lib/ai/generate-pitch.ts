import { PitchProvider } from "./types";
import { GeminiPitchAdapter } from "./providers/gemini-adapter";
import { PitchResponseSchema, PitchResponse } from "../validation/pitch-response";

interface GeneratePitchOptions {
  provider?: PitchProvider;
  timeoutMs?: number;
}

const DEFAULT_TIMEOUT_MS = 15000; // 15 seconds per PRD & Spec

function isTemporaryProviderFailure(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return [
    "timed out",
    "high demand",
    "temporarily unavailable",
    "UNAVAILABLE",
    "NOT_FOUND",
    "currently experiencing high demand",
    "This model",
    "API_KEY is not configured",
  ].some((token) => message.toLowerCase().includes(token.toLowerCase()));
}

export function buildFallbackPitch(confession: string): PitchResponse {
  const normalizedConfession = confession.trim() || "a questionable life decision";
  const topic = /plant|garden|green|leaf|houseplant/i.test(normalizedConfession)
    ? "plant-parenting"
    : /crypto|coin|token|nft|trade|invest/i.test(normalizedConfession)
      ? "crypto speculation"
      : /shop|buy|purchase|spend|retail|amazon|cart/i.test(normalizedConfession)
        ? "shopaholic arbitrage"
        : /procrastinat|scroll|doom|rabbit hole|phone|screen/i.test(normalizedConfession)
          ? "attention arbitrage"
          : "emotionally charged decision-making";

  return {
    startupName: "Delulu Ventures",
    startupConcept: `A premium operating system for ${topic}, turning self-sabotage into a subscription-powered growth loop with enterprise upsells and premium accountability features.`,
    investmentRationale: `Investors love a founder who can monetize chaos. ${normalizedConfession.slice(0, 140)} is not a bug; it is a category-defining customer acquisition engine with absurd retention and no sane competition.`,
    forbesHeadline: `This Founder Turned ${topic.toUpperCase()} Into a $4B Empire Nobody Asked For`,
    riskAnalysis: "The only real risk is that the market discovers this was mostly a coping mechanism. We view that as a moat, because it creates a deeply loyal customer base with no obvious alternative. ",
    ceoVerdict: `Your confession reads like a startup memo in a trench coat. It is chaotic, undeniably specific, and somehow a product strategy. Keep the pitch deck; fire the instincts.`,
  };
}

export async function generatePitch(
  confession: string,
  options: GeneratePitchOptions = {}
): Promise<PitchResponse> {
  const provider = options.provider || new GeminiPitchAdapter();
  const timeoutMs = options.timeoutMs || DEFAULT_TIMEOUT_MS;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    const rawResult = await provider.generatePitch(confession, controller.signal);

    // Validate structured response server-side
    const validationResult = PitchResponseSchema.safeParse(rawResult);
    if (!validationResult.success) {
      console.error(
        "Structured output validation failed:",
        validationResult.error.format()
      );
      return buildFallbackPitch(confession);
    }

    return validationResult.data;
  } catch (error: unknown) {
    if (controller.signal.aborted) {
      throw new Error("Generation timed out after 15 seconds.");
    }

    if (isTemporaryProviderFailure(error)) {
      return buildFallbackPitch(confession);
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

