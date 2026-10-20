"use client";

import React from "react";
import { Sparkles, Award } from "lucide-react";

interface PitchCardProps {
  number: string;
  category: string;
  title?: string;
  children: React.ReactNode;
  isClimax?: boolean;
}

export function PitchCard({
  number,
  category,
  title,
  children,
  isClimax = false,
}: PitchCardProps) {
  return (
    <div
      className={`rounded-[28px] p-5 transition-all duration-200 flex flex-col justify-between select-none ${
        isClimax
          ? "bg-[#006C4C] text-white shadow-lg ring-2 ring-[#89F8C7]/50"
          : "bg-white border border-[#C2C9BD]/70 shadow-xs hover:shadow-md"
      }`}
    >
      <div>
        {/* Top Header Badge */}
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-black/5">
          <span
            className={`text-[11px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full ${
              isClimax
                ? "bg-[#89F8C7] text-[#002114]"
                : "bg-[#ECEEE6] text-[#414942]"
            }`}
          >
            {number} • {category}
          </span>
          {isClimax && (
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#89F8C7] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Board Climax
            </span>
          )}
        </div>

        {/* Title if present */}
        {title && (
          <h3
            className={`text-[20px] font-bold tracking-tight mb-2 leading-tight ${
              isClimax ? "text-white" : "text-[#191C1A]"
            }`}
          >
            {title}
          </h3>
        )}

        {/* Content Area */}
        <div
          className={`text-[14px] leading-relaxed space-y-2.5 ${
            isClimax ? "text-emerald-50" : "text-[#191C1A]"
          }`}
        >
          {children}
        </div>
      </div>

      {isClimax && (
        <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-[#89F8C7] font-semibold">
          <div className="flex items-center gap-1">
            <Award className="w-3.5 h-3.5" />
            <span>Official VC Term Sheet</span>
          </div>
          <span>Series Seed • Guaranteed</span>
        </div>
      )}
    </div>
  );
}
