"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const LOADING_MESSAGES = [
  "Convincing VCs this is a billion-dollar market opportunity...",
  "Rebranding your financial red flags as customer acquisition cost...",
  "Formatting your Forbes cover story and executive profile...",
  "Drafting an aggressive go-to-market pivot to artificial intelligence...",
  "Synthesizing maximum buzzwords for the Delaware incorporation...",
];

export function LoadingStatus() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      aria-live="polite"
      className="mt-4 p-4 rounded-[24px] bg-[#ECEEE6] border border-[#C2C9BD]/60 shadow-xs flex flex-col items-center justify-center gap-3 text-center"
    >
      <div className="flex items-center gap-2">
        <span className="w-5 h-5 border-[2.5px] border-[#006C4C]/25 border-t-[#006C4C] rounded-full animate-spin" />
        <span className="text-[12px] font-bold uppercase tracking-wider text-[#006C4C] flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" />
          Consulting Imaginary VCs
        </span>
      </div>

      <p className="text-[13px] font-medium text-[#191C1A] transition-all duration-300 min-h-[36px] flex items-center justify-center">
        {LOADING_MESSAGES[messageIndex]}
      </p>

      {/* Material 3 Indeterminate Linear Progress Track */}
      <div className="w-full h-1 bg-[#C2C9BD]/50 rounded-full overflow-hidden relative">
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-[#006C4C] rounded-full animate-pulse" />
      </div>
    </div>
  );
}
