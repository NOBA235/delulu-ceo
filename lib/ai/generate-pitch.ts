import { PitchProvider } from "./types";
import { GeminiPitchAdapter } from "./providers/gemini-adapter";
import { PitchResponseSchema, PitchResponse } from "../validation/pitch-response";

interface GeneratePitchOptions {
  provider?: PitchProvider;
  timeoutMs?: number;
}

const DEFAULT_TIMEOUT_MS = 15000; // 15 seconds per PRD & Spec

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
      throw new Error(
        "Provider returned an incomplete or malformed pitch structure."
      );
    }

    return validationResult.data;
  } catch (error: unknown) {
    if (controller.signal.aborted) {
      throw new Error("Generation timed out after 15 seconds.");
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

