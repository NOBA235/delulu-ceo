"use client";

import React, { useRef, useState, useEffect } from "react";
import { Sparkles, ArrowRight, X, AlertCircle } from "lucide-react";
import { PitchRequestSchema } from "@/lib/validation/pitch-request";
import { DeluluAvatar, AvatarState } from "./delulu-avatar";

interface ConfessionFormProps {
  confession: string;
  setConfession: (value: string) => void;
  onSubmit: (confession: string) => void;
  isLoading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
}

const SAMPLE_CHIPS = [
  {
    label: "Bought another mechanical keyboard",
    text: "I spent all my savings on another expensive mechanical keyboard despite already owning three.",
  },
  {
    label: "Abandoned another domain name",
    text: "I abandoned another side project after spending 4 days designing the logo and buying 3 domain names.",
  },
  {
    label: "Rent money on AI productivity apps",
    text: "I spent my rent money on gadgets and AI subscriptions and convinced myself it's an investment in productivity.",
  },
  {
    label: "Coffee machine that costs more than my car",
    text: "I financed a $3,500 manual lever espresso machine so I can feel like an artisanal venture capitalist.",
  },
];

export function ConfessionForm({
  confession,
  setConfession,
  onSubmit,
  isLoading,
  error,
  setError,
}: ConfessionFormProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [avatarState, setAvatarState] = useState<AvatarState>("idle");
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Set avatar state based on typing or loading
  useEffect(() => {
    if (isLoading) {
      setAvatarState("loading");
    } else if (avatarState === "loading") {
      setAvatarState("idle");
    }
  }, [isLoading]);

  const handleChipClick = (sampleText: string) => {
    if (isLoading) return;
    setConfession(sampleText);
    setError(null);
    setAvatarState("typing");
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
    // Return to idle after a moment
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => {
      setAvatarState("idle");
    }, 2500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setConfession(e.target.value);
    if (error) {
      setError(null);
    }

    setAvatarState("typing");
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => {
      setAvatarState("idle");
    }, 2000);
  };

  const handleClear = () => {
    setConfession("");
    setError(null);
    setAvatarState("idle");
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    // Validate using Zod schema
    const result = PitchRequestSchema.safeParse({ confession });
    if (!result.success) {
      const issue = result.error.issues[0];
      setError(issue ? issue.message : "Please enter a valid confession.");
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
      return;
    }

    setError(null);
    setAvatarState("loading");
    onSubmit(result.data.confession);
  };

  const charCount = confession.length;
  const progressPercent = Math.min(100, (charCount / 1000) * 100);
  const isNearLimit = charCount > 850;
  const isOverLimit = charCount > 1000;
  const isFloating = isFocused || charCount > 0;

  return (
    <div className="w-full px-5 py-4 flex flex-col justify-between flex-1">
      {/* 1. Hero & Animated Mascot */}
      <div className="flex flex-col items-center text-center">
        {/* Animated Avatar Mascot */}
        <DeluluAvatar state={avatarState} />

        {/* Hero Title - Exact M3 Headline Medium */}
        <div className="mt-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#89F8C7] text-[#002114] mb-2 shadow-xs">
            <Sparkles className="w-3 h-3 text-[#006C4C]" />
            <span>Material You Engine</span>
          </div>

          <h2 className="text-[26px] sm:text-[28px] font-bold text-[#191C1A] tracking-tight leading-8">
            Your worst decisions.
            <br />
            <span className="text-[#006C4C]">Our next unicorn.</span>
          </h2>
          <p className="text-[14px] text-[#414942] leading-5 max-w-[340px] mt-1.5">
            Confess your latest financial mistake. We&apos;ll spin it into a venture-backed startup pitch.
          </p>
        </div>
      </div>

      {/* 2. Interactive Material 3 Form */}
      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        {/* M3 Filled/Outlined Container with Floating Label */}
        <div className="relative">
          <div
            className={`relative rounded-[24px] bg-[#ECEEE6] border-2 transition-all duration-200 overflow-hidden shadow-xs ${
              error
                ? "border-[#BA1A1A] bg-[#FFDAD6]/30"
                : isFocused
                ? "border-[#006C4C] bg-white ring-4 ring-[#006C4C]/10"
                : "border-transparent hover:border-[#C2C9BD]"
            }`}
          >
            {/* Active Floating Label */}
            <label
              htmlFor="confession-input"
              className={`absolute left-4 transition-all duration-200 pointer-events-none select-none font-medium ${
                isFloating
                  ? "top-2.5 text-[11px] font-bold tracking-wider uppercase text-[#006C4C]"
                  : "top-4 text-[14px] text-[#72796F]"
              }`}
            >
              Confess your questionable choice:
            </label>

            {/* Input Textarea */}
            <textarea
              id="confession-input"
              ref={textareaRef}
              rows={3}
              value={confession}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              readOnly={isLoading}
              maxLength={1100}
              placeholder={isFloating ? "e.g. Spent my rent money on 3 custom keyboards..." : ""}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "confession-error" : undefined}
              className={`w-full pt-8 pb-3 px-4 bg-transparent text-[#191C1A] text-[15px] leading-relaxed resize-none focus:outline-none ${
                isLoading ? "text-[#72796F] cursor-not-allowed" : ""
              }`}
            />

            {/* Clear Input Button */}
            {charCount > 0 && !isLoading && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Clear confession text"
                className="absolute top-2.5 right-3 w-6 h-6 rounded-full bg-[#C2C9BD]/50 hover:bg-[#C2C9BD] text-[#191C1A] flex items-center justify-center transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {/* M3 Linear Character Progress Bar Indicator */}
            <div className="w-full h-1 bg-[#C2C9BD]/40 relative">
              <div
                className={`h-full transition-all duration-150 ${
                  isOverLimit
                    ? "bg-[#BA1A1A]"
                    : isNearLimit
                    ? "bg-amber-500"
                    : "bg-[#006C4C]"
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Subtext & Character Counter */}
          <div className="flex items-center justify-between mt-1.5 px-2 text-[12px]">
            {error ? (
              <span id="confession-error" role="alert" className="text-[#BA1A1A] font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {error}
              </span>
            ) : (
              <span className="text-[#72796F]">Specific financial red flags work best.</span>
            )}
            <span
              className={`font-mono font-medium ${
                isOverLimit
                  ? "text-[#BA1A1A] font-bold"
                  : isNearLimit
                  ? "text-amber-600 font-semibold"
                  : "text-[#72796F]"
              }`}
            >
              {charCount}/1,000
            </span>
          </div>
        </div>

        {/* 3. Preset Material 3 Filter Chips */}
        <div>
          <span className="block text-[12px] font-bold uppercase tracking-wider text-[#72796F] mb-2 px-1">
            Or pick an instant delusion:
          </span>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                disabled={isLoading}
                onClick={() => handleChipClick(chip.text)}
                className="text-[12px] font-medium px-3.5 py-1.5 rounded-full bg-[#ECEEE6] hover:bg-[#E0E3DA] text-[#191C1A] border border-[#C2C9BD]/60 hover:border-[#006C4C] transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xs"
              >
                <span>💡</span>
                <span>{chip.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 4. Action Bar / Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading || isOverLimit}
            className="w-full py-3.5 px-6 rounded-full bg-[#006C4C] text-white font-bold text-[14px] uppercase tracking-wider shadow-sm hover:bg-[#00533A] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Pitching to VCs...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Pitch My Delusion
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
