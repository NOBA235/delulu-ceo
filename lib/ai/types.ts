export interface PitchProvider {
  /**
   * Generates a satirical startup pitch based on the given confession.
   * Returns unknown to enforce strict runtime schema validation at the boundary.
   */
  generatePitch(confession: string, signal?: AbortSignal): Promise<unknown>;
}

export interface ProviderError {
  code: string;
  message: string;
  status: number;
}

