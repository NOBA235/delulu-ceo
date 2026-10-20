"use client";

import React, { useState } from "react";
import {
  Rocket,
  Newspaper,
  TrendingDown,
  Award,
  Quote,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
} from "lucide-react";
import { PitchCard } from "./pitch-card";
import { PitchResponse } from "@/lib/validation/pitch-response";
import { DeluluAvatar } from "./delulu-avatar";

interface PitchDeckProps {
  confession: string;
  pitch: PitchResponse;
  actionsSlot?: React.ReactNode;
}

export function PitchDeck({ confession, pitch, actionsSlot }: PitchDeckProps) {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"swipe" | "stack">("swipe");
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    // Minimum swipe threshold (50px)
    if (diff > 50 && activeCardIndex < 3) {
      setActiveCardIndex((prev) => prev + 1);
    } else if (diff < -50 && activeCardIndex > 0) {
      setActiveCardIndex((prev) => prev - 1);
    }
    setTouchStart(null);
  };

  const cards = [
    {
      component: (
        <PitchCard
          number="01"
          category="STARTUP PITCH"
          title={pitch.startupName}
        >
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#006C4C] mb-1">
            <Rocket className="w-3.5 h-3.5" />
            <span>The Business Model</span>
          </div>
          <p className="font-medium text-[#191C1A] text-[15px] leading-snug">
            {pitch.startupConcept}
          </p>
          <div className="mt-3 pt-3 border-t border-[#C2C9BD]/40 text-[12px] text-[#414942]">
            <span className="font-bold text-[#191C1A]">VC Investment Thesis: </span>
            {pitch.investmentRationale}
          </div>
        </PitchCard>
      ),
      label: "Pitch",
    },
    {
      component: (
        <PitchCard
          number="02"
          category="FORBES COVER"
        >
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#72796F] mb-1.5">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Forbes Billionaires Desk</span>
          </div>
          <blockquote className="text-[18px] font-serif font-bold text-[#191C1A] leading-snug italic">
            &ldquo;{pitch.forbesHeadline}&rdquo;
          </blockquote>
          <div className="mt-3 p-2.5 rounded-xl bg-[#ECEEE6] text-[11px] text-[#414942] border border-[#C2C9BD]/30">
            <span className="font-semibold text-[#191C1A]">Valuation Estimate: </span>
            Undisclosed Series A at Unicorn Valuation ($1.2B)
          </div>
        </PitchCard>
      ),
      label: "Forbes",
    },
    {
      component: (
        <PitchCard
          number="03"
          category="RISK ANALYSIS"
        >
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-700 mb-1.5">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Red Flags Reframed</span>
          </div>
          <p className="text-[14px] text-[#191C1A] leading-relaxed">
            {pitch.riskAnalysis}
          </p>
          <div className="mt-3 inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-900 border border-amber-200">
            ⚠️ Status: Aggressively Ignored by Leadership
          </div>
        </PitchCard>
      ),
      label: "Risks",
    },
    {
      component: (
        <PitchCard
          number="04"
          category="CEO VERDICT"
          isClimax={true}
        >
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#89F8C7] mb-1">
            <Award className="w-4 h-4 text-[#89F8C7]" />
            <span>Executive Board Assessment</span>
          </div>
          <p className="text-[17px] font-bold text-white leading-snug mt-1">
            &ldquo;{pitch.ceoVerdict}&rdquo;
          </p>
          <p className="text-[11px] text-[#89F8C7] font-semibold mt-3 italic">
            — Sent from an offshore yacht with investor capital
          </p>
        </PitchCard>
      ),
      label: "Verdict",
    },
  ];

  return (
    <div className="w-full px-4 py-3 flex flex-col flex-1 justify-between">
      {/* 1. Mascot in Success State */}
      <div className="flex flex-col items-center mb-1">
        <DeluluAvatar state="success" />
      </div>

      {/* 2. Confession Summary Pill Banner */}
      <div className="mb-3 p-3 rounded-2xl bg-[#ECEEE6] border border-[#C2C9BD]/50 shadow-2xs flex items-start gap-2.5">
        <div className="w-6 h-6 rounded-full bg-[#006C4C] text-white flex items-center justify-center shrink-0 mt-0.5">
          <Quote className="w-3 h-3" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#72796F] block">
            Original Confession
          </span>
          <p className="text-[13px] font-medium text-[#191C1A] italic truncate">
            &ldquo;{confession}&rdquo;
          </p>
        </div>
      </div>

      {/* 3. View Switcher Mode (Swipe Carousel vs Full Stack) */}
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#006C4C] flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          <span>Pitch Deck ({activeCardIndex + 1}/4)</span>
        </span>
        <div className="flex items-center bg-[#ECEEE6] p-0.5 rounded-full border border-[#C2C9BD]/50">
          <button
            type="button"
            onClick={() => setViewMode("swipe")}
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
              viewMode === "swipe"
                ? "bg-[#006C4C] text-white shadow-2xs"
                : "text-[#414942] hover:text-[#191C1A]"
            }`}
          >
            Swipe
          </button>
          <button
            type="button"
            onClick={() => setViewMode("stack")}
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
              viewMode === "stack"
                ? "bg-[#006C4C] text-white shadow-2xs"
                : "text-[#414942] hover:text-[#191C1A]"
            }`}
          >
            All
          </button>
        </div>
      </div>

      {/* 4. The Presentation Deck */}
      {viewMode === "swipe" ? (
        /* Swipeable Carousel Presentation */
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative flex flex-col justify-between flex-1"
        >
          {/* Active Card */}
          <div className="w-full transition-all duration-300">
            {cards[activeCardIndex].component}
          </div>

          {/* Carousel Controls & Dot Indicators */}
          <div className="mt-3 flex items-center justify-between px-2">
            <button
              type="button"
              disabled={activeCardIndex === 0}
              onClick={() => setActiveCardIndex((prev) => Math.max(0, prev - 1))}
              aria-label="Previous card"
              className="w-8 h-8 rounded-full bg-[#ECEEE6] hover:bg-[#E0E3DA] text-[#191C1A] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Pill Progress Dots */}
            <div className="flex items-center gap-1.5">
              {cards.map((card, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveCardIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    activeCardIndex === idx
                      ? "w-6 bg-[#006C4C]"
                      : "w-2 bg-[#C2C9BD]"
                  }`}
                  aria-label={`Jump to ${card.label}`}
                />
              ))}
            </div>

            <button
              type="button"
              disabled={activeCardIndex === 3}
              onClick={() => setActiveCardIndex((prev) => Math.min(3, prev + 1))}
              aria-label="Next card"
              className="w-8 h-8 rounded-full bg-[#ECEEE6] hover:bg-[#E0E3DA] text-[#191C1A] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Full Stack Scrollable View */
        <div className="space-y-3.5 mb-3">
          {cards.map((card, idx) => (
            <div key={idx}>{card.component}</div>
          ))}
        </div>
      )}

      {/* 5. Sticky Bottom Action Bar Slot */}
      {actionsSlot && <div className="mt-4 pt-3 border-t border-[#C2C9BD]/50">{actionsSlot}</div>}
    </div>
  );
}
