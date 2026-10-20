"use client";

import React, { useState } from "react";
import { User } from "lucide-react";
import { InfoSheet } from "./info-sheet";

interface AndroidShellProps {
  children: React.ReactNode;
  onReset: () => void;
}

export function AndroidShell({ children, onReset }: AndroidShellProps) {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#111412] flex items-center justify-center p-0 sm:p-4 md:p-8 font-sans antialiased">
      {/* Authentic Android Device Mockup Viewport */}
      <div className="relative w-full max-w-[430px] sm:h-[890px] h-screen bg-[#F4F5F0] text-[#191C1A] sm:rounded-[48px] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),0_0_0_12px_#1E221F,0_0_0_14px_#343A36] flex flex-col overflow-hidden sm:border sm:border-white/10">
        
        {/* 1. Material 3 Top App Bar */}
        <header className="w-full px-5 py-4 bg-[#F4F5F0] border-b border-[#C2C9BD]/40 flex items-center justify-between z-20 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#006C4C] text-white flex items-center justify-center shadow-sm">
              <span className="font-bold text-sm tracking-tighter">DC</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-bold text-[17px] text-[#191C1A] tracking-tight leading-tight">
                  Delulu CEO
                </h1>
                <span className="text-[9px] font-bold uppercase tracking-wider bg-[#89F8C7] text-[#002114] px-1.5 py-0.5 rounded-full">
                  M3
                </span>
              </div>
              <p className="text-[11px] text-[#72796F] font-medium">
                Venture Delusion Engine
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsInfoOpen(true)}
              aria-label="Settings and Profile"
              className="w-9 h-9 rounded-full bg-[#ECEEE6] hover:bg-[#E0E3DA] text-[#191C1A] flex items-center justify-center transition-colors shadow-xs active:scale-95"
            >
              <User className="w-4 h-4 text-[#006C4C]" />
            </button>
          </div>
        </header>

        {/* 2. Scrollable Main Content Surface */}
        <div className="flex-1 overflow-y-auto android-scroll flex flex-col">
          {children}
        </div>

        {/* 3. Android Bottom Navigation Gesture Bar */}
        <div className="w-full py-2.5 bg-[#F4F5F0] shrink-0 select-none flex justify-center items-center z-30">
          <div className="w-32 h-1 bg-[#191C1A]/35 rounded-full hover:bg-[#191C1A]/50 transition-colors" />
        </div>

        {/* Profile / Settings Bottom Sheet */}
        <InfoSheet
          isOpen={isInfoOpen}
          onClose={() => setIsInfoOpen(false)}
          onReset={onReset}
        />
      </div>
    </div>
  );
}
