"use client";

import React from "react";
import { X, Sparkles, Shield, Cpu, ExternalLink, RefreshCw } from "lucide-react";

interface InfoSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
}

export function InfoSheet({ isOpen, onClose, onReset }: InfoSheetProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="App Settings and Profile"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[430px] max-h-[85vh] overflow-y-auto bg-[#F4F5F0] rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl border border-[#C2C9BD] animate-in slide-in-from-bottom-8 duration-200"
      >
        {/* Drag Handle Bar */}
        <div className="w-12 h-1.5 bg-[#72796F]/40 rounded-full mx-auto mb-4" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#C2C9BD]/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#006C4C] text-white flex items-center justify-center font-bold text-lg shadow-sm">
              DC
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#191C1A]">Brad Sterling</h2>
              <p className="text-xs text-[#006C4C] font-semibold">Chief Delusion Officer & Founder</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close settings"
            className="w-9 h-9 rounded-full bg-[#ECEEE6] hover:bg-[#E0E3DA] text-[#191C1A] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Section */}
        <div className="mt-5 space-y-4 text-sm text-[#414942]">
          <div className="p-3.5 rounded-2xl bg-[#ECEEE6] border border-[#C2C9BD]/40">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#006C4C] mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Material Design 3 Shell</span>
            </div>
            <p className="text-xs text-[#414942] leading-relaxed">
              Designed following Google&apos;s Material You guidelines with tonal elevation, squircle containers (`28px`), and native Android typography scale.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#ECEEE6] border border-[#C2C9BD]/40">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#191C1A] mb-1">
              <Cpu className="w-4 h-4 text-[#006C4C]" />
              <span>Delusion Engine Status</span>
            </div>
            <ul className="text-xs space-y-1 text-[#414942]">
              <li>• Provider: Google Gemini 2.5 Flash</li>
              <li>• Guardrails: Zod Strict Schema Validation</li>
              <li>• Rate Limit: 5 requests / min per IP</li>
              <li>• Pitch Timeout: 15 seconds max latency</li>
            </ul>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#ECEEE6] border border-[#C2C9BD]/40">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#191C1A] mb-1">
              <Shield className="w-4 h-4 text-[#006C4C]" />
              <span>Founder Lore</span>
            </div>
            <p className="text-xs italic text-[#414942] leading-relaxed">
              &ldquo;We don&apos;t make mistakes. We incur high-conviction research & development write-offs.&rdquo;
            </p>
          </div>

          {/* Quick Actions */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                onReset();
                onClose();
              }}
              className="w-full py-3 px-4 rounded-full bg-[#006C4C] text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-[#00533A] active:scale-[0.98] transition-all shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset & Start Fresh</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 px-4 rounded-full bg-[#ECEEE6] text-[#191C1A] font-semibold text-xs tracking-wider uppercase hover:bg-[#E0E3DA] transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
