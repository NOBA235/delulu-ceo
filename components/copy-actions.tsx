"use client";

import { useState, useEffect } from "react";
import { Copy, Check, RotateCcw, AlertTriangle, Download } from "lucide-react";
import { PitchResponse } from "@/lib/validation/pitch-response";
import { formatPitch } from "@/lib/clipboard/format-pitch";
import { renderShareCard } from "@/lib/share-card/render-share-card";

interface CopyActionsProps {
  pitch: PitchResponse;
  onReset: () => void;
}

export function CopyActions({ pitch, onReset }: CopyActionsProps) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [shareMessage, setShareMessage] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [rippling, setRippling] = useState(false);
  const formattedText = formatPitch(pitch);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => {
      setCopied(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = async (e: React.MouseEvent) => {
    // Trigger haptic visual ripple
    setRippling(true);
    setTimeout(() => setRippling(false), 450);

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

  const handleDownload = async () => {
    setIsDownloading(true);
    setShareMessage(null);
    try {
      const image = await renderShareCard(pitch);
      const imageUrl = URL.createObjectURL(image);
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = `${pitch.startupName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || "delulu-ceo"}-share-card.png`;
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(imageUrl), 1000);
      setShareMessage("Your 1080 × 1350 share image is ready to post.");
    } catch {
      setShareMessage("Could not create the image. Please try again or copy the pitch instead.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-2.5 pb-2">
      <button
        type="button"
        onClick={handleDownload}
        disabled={isDownloading}
        className="w-full py-3.5 px-4 rounded-full bg-[#89F8C7] hover:bg-[#72E8B6] text-[#002114] border border-[#006C4C]/30 font-bold text-[13px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
      >
        <Download className="w-4 h-4" />
        <span>{isDownloading ? "Creating share image…" : "Download Share Image"}</span>
      </button>
      {shareMessage && (
        <p role="status" aria-live="polite" className="w-full text-center text-[12px] font-semibold text-[#006C4C]">
          {shareMessage}
        </p>
      )}

      {/* Primary Floating Action Bar / Android Buttons */}
      <div className="grid grid-cols-2 gap-2.5 w-full">
        {/* 1. Filled Tonal "Copy Delusion" Button with Ripple */}
        <button
          type="button"
          onClick={handleCopy}
          className={`relative overflow-hidden w-full py-3.5 px-4 rounded-full font-bold text-[13px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] ${
            copied
              ? "bg-[#89F8C7] text-[#002114] border border-[#006C4C]/30"
              : "bg-[#006C4C] text-white hover:bg-[#00533A]"
          }`}
        >
          {/* Visual Ripple Element */}
          {rippling && (
            <span className="absolute inset-0 bg-white/30 rounded-full animate-ping pointer-events-none" />
          )}

          {copied ? (
            <>
              <Check className="w-4 h-4 text-[#006C4C] stroke-[2.5]" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Deck</span>
            </>
          )}
        </button>

        {/* 2. Outlined "Pitch Another" Button */}
        <button
          type="button"
          onClick={onReset}
          className="w-full py-3.5 px-4 rounded-full bg-[#ECEEE6] hover:bg-[#E0E3DA] text-[#191C1A] border border-[#C2C9BD] font-bold text-[13px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs active:scale-[0.98]"
        >
          <RotateCcw className="w-4 h-4 text-[#006C4C]" />
          <span>New Pitch</span>
        </button>
      </div>

      {/* Copied Feedback Badge */}
      {copied && (
        <div
          role="status"
          aria-live="polite"
          className="w-full text-center py-1.5 px-3 rounded-xl bg-[#89F8C7]/60 text-[#002114] text-[12px] font-semibold animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          ✨ Pitch copied to clipboard! Send to your syndicate.
        </div>
      )}

      {/* Fallback Manual Copy Container if Clipboard is Blocked */}
      {copyError && (
        <div
          role="alert"
          className="w-full p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-[12px] flex flex-col gap-2 mt-1"
        >
          <div className="flex items-center gap-1.5 font-bold">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Clipboard blocked. Select & copy below:</span>
          </div>
          <textarea
            readOnly
            value={formattedText}
            onFocus={(e) => e.target.select()}
            className="w-full h-24 p-2 rounded-xl bg-white border border-amber-300 font-mono text-[11px] text-[#191C1A] focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      )}
    </div>
  );
}
