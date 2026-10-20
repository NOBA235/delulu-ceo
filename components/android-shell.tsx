"use client";

import React, { useState, useEffect } from "react";
import { Wifi, Battery, Sparkles, User, Settings2 } from "lucide-react";
import { InfoSheet } from "./info-sheet";

interface AndroidShellProps {
  children: React.ReactNode;
  onReset: () => void;
}

export function AndroidShell({ children, onReset }: AndroidShellProps) {
  const [time, setTime] = useState("09:41");
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#111412] flex items-center justify-center p-0 sm:p-4 md:p-8 font-sans antialiased">
      {/* Authentic Android Device Mockup Viewport */}
      <div className="relative w-full max-w-[430px] sm:h-[890px] h-screen bg-[#F4F5F0] text-[#191C1A] sm:rounded-[48px] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),0_0_0_12px_#1E221F,0_0_0_14px_#343A36] flex flex-col overflow-hidden sm:border sm:border-white/10">
        
        {/* Subtle Android Bezel Punch Hole (Camera) for desktop frame */}
        <div className="hidden sm:block absolute top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#111412] rounded-full z-40 border border-white/10 shadow-inner">
          <div className="w-1.5 h-1.5 bg-[#1E293B]/70 rounded-full mx-auto mt-1" />
        </div>

        {/* 1. Android Top Status Bar */}
        <div className="w-full h-8 px-6 pt-1 flex items-center justify-between text-xs font-semibold text-[#191C1A] select-none z-30 shrink-0 bg-[#F4F5F0]">
          {/* System Clock */}
          <span className="font-medium tracking-tight text-[13px]">{time}</span>

          {/* System Icons (Wi-Fi, 5G, Battery) */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold tracking-wider text-[#006C4C] bg-[#ECEEE6] px-1 rounded">
              5G
            </span>
            <Wifi className="w-3.5 h-3.5 stroke-[2.2] text-[#191C1A]" />
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-medium text-[#414942]">98%</span>
              <Battery className="w-4 h-4 stroke-[2.2] fill-[#006C4C] text-[#006C4C]" />
            </div>
          </div>
        </div>

        {/* 2. Material 3 Top App Bar */}
        <header className="w-full px-4 py-2.5 bg-[#F4F5F0] border-b border-[#C2C9BD]/40 flex items-center justify-between z-20 shrink-0">
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

        {/* 3. Scrollable Main Content Surface */}
        <div className="flex-1 overflow-y-auto android-scroll flex flex-col">
          {children}
        </div>

        {/* 4. Android Bottom Navigation Gesture Bar */}
        <div className="w-full py-2 bg-[#F4F5F0] shrink-0 select-none flex justify-center items-center z-30">
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
