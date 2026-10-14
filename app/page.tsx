"use client";

import { useState } from "react";
import { ConfessionForm } from "@/components/confession-form";
import { LoadingStatus } from "@/components/loading-status";
import { PitchDeck } from "@/components/pitch-deck";
import { PitchResponse } from "@/lib/validation/pitch-response";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function Home() {
  const [confession, setConfession] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [pitch, setPitch] = useState<PitchResponse | null>(null);

  const handleConfessionSubmit = async (validConfession: string) => {
    setIsLoading(true);
    setApiError(null);
    setValidationError(null);

    try {
      const response = await fetch("/api/pitch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confession: validConfession }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error?.message ||
            "Our imaginary investors have gone silent. Your delusion is safe—let's try again."
        );
      }

      setPitch(data);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Our imaginary investors have gone silent. Your delusion is safe—let's try again.";
      setApiError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPitch(null);
    setApiError(null);
    setValidationError(null);
  };

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#171717] flex flex-col justify-center items-center py-8">
      {pitch ? (
        <div className="w-full">
          <PitchDeck
            confession={confession}
            pitch={pitch}
            actionsSlot={
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-[#E5E5E5]">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 rounded-xl bg-white border border-[#E5E5E5] text-[#171717] hover:bg-[#FAF9F6] font-medium text-sm transition-all flex items-center gap-2 shadow-sm focus-visible:ring-2 focus-visible:ring-[#087F5B]"
                >
                  <RotateCcw className="w-4 h-4 text-[#737373]" />
                  <span>Pitch Another Delusion</span>
                </button>
              </div>
            }
          />
        </div>
      ) : (
        <div className="w-full">
          <ConfessionForm
            confession={confession}
            setConfession={setConfession}
            onSubmit={handleConfessionSubmit}
            isLoading={isLoading}
            error={validationError}
            setError={setValidationError}
          />

          {isLoading && (
            <div className="w-full max-w-2xl mx-auto px-4 -mt-2">
              <LoadingStatus />
            </div>
          )}

          {apiError && !isLoading && (
            <div className="w-full max-w-2xl mx-auto px-4 mt-6">
              <div
                role="alert"
                className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-start justify-between gap-3 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-sm">Pitch Attempt Failed</span>
                    <p className="text-sm mt-0.5 text-red-700">{apiError}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleConfessionSubmit(confession)}
                  className="px-3 py-1.5 rounded-lg bg-red-600 text-white font-medium text-xs hover:bg-red-700 transition-all shrink-0 focus-visible:ring-2 focus-visible:ring-red-500"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
