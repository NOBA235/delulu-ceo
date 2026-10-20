"use client";

import { useState } from "react";
import { AndroidShell } from "@/components/android-shell";
import { ConfessionForm } from "@/components/confession-form";
import { LoadingStatus } from "@/components/loading-status";
import { PitchDeck } from "@/components/pitch-deck";
import { CopyActions } from "@/components/copy-actions";
import { PitchResponse } from "@/lib/validation/pitch-response";
import { AlertCircle } from "lucide-react";

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
    <AndroidShell onReset={handleReset}>
      {pitch ? (
        <PitchDeck
          confession={confession}
          pitch={pitch}
          actionsSlot={<CopyActions pitch={pitch} onReset={handleReset} />}
        />
      ) : (
        <div className="flex flex-col flex-1 justify-between">
          <ConfessionForm
            confession={confession}
            setConfession={setConfession}
            onSubmit={handleConfessionSubmit}
            isLoading={isLoading}
            error={validationError}
            setError={setValidationError}
          />

          {isLoading && (
            <div className="px-5 pb-4">
              <LoadingStatus />
            </div>
          )}

          {apiError && !isLoading && (
            <div className="px-5 pb-4">
              <div
                role="alert"
                className="p-3.5 rounded-[24px] bg-[#FFDAD6] border border-[#BA1A1A]/30 text-[#BA1A1A] flex items-start justify-between gap-3 shadow-xs"
              >
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-[#BA1A1A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-[13px]">
                      Pitch Attempt Failed
                    </span>
                    <p className="text-[12px] mt-0.5 text-[#410002] leading-tight">
                      {apiError}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleConfessionSubmit(confession)}
                  className="px-3 py-1.5 rounded-full bg-[#BA1A1A] text-white font-bold text-[11px] uppercase tracking-wider hover:bg-[#93000A] transition-colors shrink-0"
                >
                  Retry
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </AndroidShell>
  );
}
