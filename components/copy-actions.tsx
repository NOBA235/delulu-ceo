"use client";

import { useState, useEffect } from "react";
import { Copy, Check, RotateCcw, AlertTriangle } from "lucide-react";
import { PitchResponse } from "@/lib/validation/pitch-response";
import { formatPitch } from "@/lib/clipboard/format-pitch";

interface CopyActionsProps {
  pitch: PitchResponse;
  onReset: () => void;
}

export function CopyActions({ pitch, onReset }: CopyActionsProps) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const formattedText = formatPitch(pitch);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => {
      setCopied(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    setCopyError(false);

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(formattedText);
        setCopied(true);
      } else {
        throw new Error("Clipboard API unavailable");
      }
    } catch {
      setCopyError(true);
      setCopied(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4 pt-6 border-t border-[#E5E5E5]">
      {/* Primary Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
        <button
          type="button"
          onClick={handleCopy}
          className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm focus-visible:ring-2 focus-visible:ring-[#087F5B] focus-visible:ring-offset-2 ${
            copied
              ? "bg-[#E6F4EA] text-[#087F5B] border border-[#087F5B]/30"
              : "bg-[#087F5B] text-white hover:bg-[#066c4d]"
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-[#087F5B]" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy My Delusion</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white border border-[#E5E5E5] text-[#171717] hover:bg-[#FAF9F6] font-medium text-sm transition-all flex items-center justify-center gap-2 shadow-sm focus-visible:ring-2 focus-visible:ring-[#087F5B] focus-visible:ring-offset-2"
        >
          <RotateCcw className="w-4 h-4 text-[#737373]" />
          <span>Pitch Another Delusion</span>
        </button>
      </div>

      {/* Success Notification */}
      {copied && (
        <div
          role="status"
          aria-live="polite"
          className="px-4 py-2 rounded-lg bg-[#E6F4EA] border border-[#087F5B]/20 text-[#087F5B] text-xs sm:text-sm font-medium animate-in fade-in slide-in-from-top-1 duration-200"
        >
          ✨ Delusion copied. Go convince your friends.
        </div>
      )}

      {/* Fallback Manual Copy if Clipboard API is Blocked */}
      {copyError && (
        <div
          role="alert"
          className="w-full max-w-xl p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex flex-col gap-2 mt-2"
        >
          <div className="flex items-center gap-2 font-medium">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Unable to copy automatically. Please select and copy the text manually.</span>
          </div>
          <textarea
            readOnly
            value={formattedText}
            onFocus={(e) => e.target.select()}
            className="w-full h-32 p-2.5 rounded-lg bg-white border border-amber-300 font-mono text-xs text-[#171717] focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      )}
    </div>
  );
}
