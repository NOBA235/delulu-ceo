import React from "react";

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
      className={`rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between ${
        isClimax
          ? "bg-[#E6F4EA] border-2 border-[#087F5B]/40 shadow-md ring-1 ring-[#087F5B]/10"
          : "bg-white border border-[#E5E5E5] shadow-sm hover:shadow-md"
      }`}
    >
      <div>
        {/* Header Badge */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-black/5">
          <span
            className={`text-xs font-mono font-bold tracking-wider px-2 py-0.5 rounded ${
              isClimax
                ? "bg-[#087F5B] text-white"
                : "bg-[#171717]/5 text-[#737373]"
            }`}
          >
            {number} {category}
          </span>
          {isClimax && (
            <span className="text-xs font-bold uppercase tracking-wider text-[#087F5B]">
              ★ Final Verdict
            </span>
          )}
        </div>

        {/* Title if present */}
        {title && (
          <h3
            className={`text-lg md:text-xl font-bold tracking-tight mb-3 ${
              isClimax ? "text-[#087F5B]" : "text-[#171717]"
            }`}
          >
            {title}
          </h3>
        )}

        {/* Content */}
        <div className="text-sm md:text-base text-[#171717] leading-relaxed space-y-2">
          {children}
        </div>
      </div>
    </div>
  );
}

