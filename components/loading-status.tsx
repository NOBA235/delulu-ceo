"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const LOADING_MESSAGES = [
  "Convincing VCs this is a billion-dollar idea...",
  "Rebranding your financial red flags as growth opportunities...",
  "Preparing your Forbes cover story...",
  "Synthesizing an aggressive go-to-market narrative...",
];

export function LoadingStatus() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      aria-live="polite"
      className="mt-6 p-4 rounded-xl bg-white border border-[#E5E5E5] shadow-sm flex items-center justify-center gap-3 text-center"
    >
      <Loader2 className="w-5 h-5 text-[#087F5B] animate-spin shrink-0" />
      <span className="text-sm font-medium text-[#171717] transition-all">
        {LOADING_MESSAGES[messageIndex]}
      </span>
    </div>
  );
}

