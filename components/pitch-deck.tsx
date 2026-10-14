import React from "react";
import { Rocket, Newspaper, TrendingDown, Award, Quote } from "lucide-react";
import { PitchCard } from "./pitch-card";
import { PitchResponse } from "@/lib/validation/pitch-response";

interface PitchDeckProps {
  confession: string;
  pitch: PitchResponse;
  actionsSlot?: React.ReactNode;
}

export function PitchDeck({ confession, pitch, actionsSlot }: PitchDeckProps) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 md:py-12">
      {/* Confession Summary Banner */}
      <div className="mb-8 p-4 md:p-6 rounded-2xl bg-white border border-[#E5E5E5] shadow-sm flex items-start gap-4">
        <div className="w-8 h-8 rounded-full bg-[#E6F4EA] text-[#087F5B] flex items-center justify-center shrink-0 mt-0.5">
          <Quote className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs font-mono uppercase tracking-wider text-[#737373] block mb-1">
            Original Confession
          </span>
          <p className="text-sm md:text-base font-medium text-[#171717] italic break-words">
            &ldquo;{confession}&rdquo;
          </p>
        </div>
      </div>

      {/* 2x2 Desktop Grid / 1-column Mobile Stack */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Card 01 — The Startup Pitch */}
        <PitchCard
          number="01"
          category="STARTUP PITCH"
          title={pitch.startupName}
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase text-[#087F5B] mb-1">
            <Rocket className="w-3.5 h-3.5" />
            <span>The Business Model</span>
          </div>
          <p className="font-medium text-[#171717]">{pitch.startupConcept}</p>
          <div className="mt-3 pt-3 border-t border-black/5 text-xs text-[#737373]">
            <span className="font-semibold text-[#171717]">VC Investment Thesis: </span>
            {pitch.investmentRationale}
          </div>
        </PitchCard>

        {/* Card 02 — Forbes Headline */}
        <PitchCard
          number="02"
          category="FORBES COVER"
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase text-[#737373] mb-2">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Forbes Billionaires Desk</span>
          </div>
          <blockquote className="text-lg md:text-xl font-serif font-bold text-[#171717] leading-snug">
            &ldquo;{pitch.forbesHeadline}&rdquo;
          </blockquote>
          <p className="text-xs text-[#737373] mt-3">
            Fictional Valuation: Undisclosed Series A at Unicorn Valuation.
          </p>
        </PitchCard>

        {/* Card 03 — Risk Analysis */}
        <PitchCard
          number="03"
          category="RISK ANALYSIS"
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase text-[#737373] mb-2">
            <TrendingDown className="w-3.5 h-3.5 text-amber-600" />
            <span>Red Flags Reframed</span>
          </div>
          <p className="text-sm md:text-base text-[#171717] leading-relaxed">
            {pitch.riskAnalysis}
          </p>
          <div className="mt-3 inline-block px-2 py-1 rounded text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200/60">
            Status: Aggressively Ignored by Leadership
          </div>
        </PitchCard>

        {/* Card 04 — CEO Verdict (The Punchline) */}
        <PitchCard
          number="04"
          category="CEO VERDICT"
          isClimax={true}
        >
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#087F5B] mb-2">
            <Award className="w-4 h-4 text-[#087F5B]" />
            <span>Executive Board Assessment</span>
          </div>
          <p className="text-base md:text-lg font-bold text-[#171717] leading-snug">
            {pitch.ceoVerdict}
          </p>
          <p className="text-xs text-[#087F5B] font-semibold mt-4">
            — Sent from an offshore yacht with investor capital
          </p>
        </PitchCard>
      </div>

      {/* Action Bar Slot */}
      {actionsSlot && <div className="mt-8">{actionsSlot}</div>}
    </div>
  );
}
