"use client";

import React, { useRef } from "react";
import { Briefcase, Sparkles } from "lucide-react";
import { PitchRequestSchema } from "@/lib/validation/pitch-request";

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
    label: "Bought another keyboard",
    text: "I spent all my savings on another expensive mechanical keyboard despite already owning three.",
  },
  {
    label: "Abandoned my side project",
    text: "I abandoned another side project after spending 4 days designing the logo and buying 3 domain names.",
  },
  {
    label: "Spent my rent money on gadgets",
    text: "I spent my rent money on gadgets and convinced myself it's an investment in productivity.",
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

  const handleChipClick = (sampleText: string) => {
    if (isLoading) return;
    setConfession(sampleText);
    setError(null);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setConfession(e.target.value);
    if (error) {
      setError(null);
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
    onSubmit(result.data.confession);
  };

  const charCount = confession.length;
  const isNearLimit = charCount > 850;
  const isOverLimit = charCount > 1000;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 md:py-16">
      {/* Header */}
      <header className="flex items-center justify-between pb-8 mb-8 border-b border-[#E5E5E5]/60">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#171717] text-white flex items-center justify-center shadow-sm">
            <Briefcase className="w-4 h-4 text-[#FAF9F6]" />
          </div>
          <span className="font-bold tracking-tight text-sm uppercase text-[#171717]">
            Delulu CEO
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium text-[#737373] bg-white px-2.5 py-1 rounded-full border border-[#E5E5E5]">
          <Sparkles className="w-3.5 h-3.5 text-[#087F5B]" />
          <span>v1.0 POC</span>
        </div>
      </header>

      {/* Hero Section */}
      <div className="text-center mb-10">
        <div className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#E6F4EA] text-[#087F5B]">
          Your Personal Delusion Engine
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#171717] tracking-tight leading-tight mb-4">
          Your worst decisions.
          <br />
          <span className="text-[#087F5B]">Our next unicorn.</span>
        </h1>
        <p className="text-base md:text-lg text-[#737373] max-w-lg mx-auto">
          Confess your latest questionable life choice. We&apos;ll turn your financial
          red flags into an absurd, venture-backed startup pitch.
        </p>
      </div>

      {/* Form Surface */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <label
            htmlFor="confession-input"
            className="block text-xs font-semibold uppercase tracking-wider text-[#737373] mb-2"
          >
            Confess your terrible decision:
          </label>
          <textarea
            id="confession-input"
            ref={textareaRef}
            rows={4}
            value={confession}
            onChange={handleChange}
            readOnly={isLoading}
            maxLength={1100}
            placeholder="I spent all my savings on a mechanical keyboard..."
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "confession-error" : undefined}
            className={`w-full p-4 rounded-xl bg-white border transition-all text-[#171717] placeholder:text-[#737373]/60 resize-none shadow-sm text-base leading-relaxed ${
              error
                ? "border-red-500 ring-2 ring-red-500/20"
                : "border-[#E5E5E5] focus:border-[#087F5B] focus:ring-2 focus:ring-[#087F5B]/20"
            } ${isLoading ? "bg-[#FAF9F6] text-[#737373] cursor-not-allowed" : ""}`}
          />

          {/* Character counter */}
          <div className="flex items-center justify-between mt-2 px-1 text-xs">
            {error ? (
              <span id="confession-error" role="alert" className="text-red-600 font-medium">
                {error}
              </span>
            ) : (
              <span className="text-[#737373]/70">Be specific for maximum comedic ROI.</span>
            )}
            <span
              className={`font-mono ${
                isOverLimit
                  ? "text-red-600 font-bold"
                  : isNearLimit
                  ? "text-amber-600 font-medium"
                  : "text-[#737373]"
              }`}
            >
              {charCount} / 1,000
            </span>
          </div>
        </div>

        {/* Sample chips */}
        <div>
          <span className="block text-xs font-semibold text-[#737373] mb-2">
            Or pick a quick confession:
          </span>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                disabled={isLoading}
                onClick={() => handleChipClick(chip.text)}
                className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-[#E5E5E5] text-[#171717] hover:border-[#087F5B] hover:text-[#087F5B] hover:bg-[#E6F4EA]/40 transition-all focus-visible:ring-2 focus-visible:ring-[#087F5B] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Submit button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading || isOverLimit}
            className="w-full py-4 px-6 rounded-xl bg-[#087F5B] text-white font-semibold text-base shadow-sm hover:bg-[#066347] active:scale-[0.99] transition-all flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[#087F5B] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <span>Pitching to imaginary investors...</span>
            ) : (
              <span>Pitch My Delusion →</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
