"use client";

import React from "react";

export type AvatarState = "idle" | "typing" | "loading" | "success";

interface DeluluAvatarProps {
  state: AvatarState;
  customQuote?: string;
}

const STATE_QUOTES: Record<AvatarState, string[]> = {
  idle: [
    "Tell me your worst financial mistake. I'll get Andreessen Horowitz to fund it.",
    "Your credit score is an outdated metric. What is your vision?",
    "Every bad habit is just an untapped B2B SaaS subscription model.",
  ],
  typing: [
    "Drafting the Delaware C-Corp filing right now...",
    "Framing this as an AI-powered paradigm shift...",
    "The TAM on this delusion is easily $40 Billion.",
  ],
  loading: [
    "Calling SoftBank at 3 AM with zero slides...",
    "Rebranding your impulsive spending as customer acquisition cost...",
    "Synthesizing maximum buzzwords for the term sheet...",
  ],
  success: [
    "We got the term sheet! $15M pre-seed at a $100M cap!",
    "Forbes 30 Under 30 called. They want our yacht address.",
    "Unicorn status achieved. Time to pivot to the metaverse.",
  ],
};

export function DeluluAvatar({ state, customQuote }: DeluluAvatarProps) {
  // Keep the first render deterministic so server and client markup match.
  const [quote, setQuote] = React.useState(
    () => customQuote || STATE_QUOTES[state][0]
  );

  React.useEffect(() => {
    const quotes = STATE_QUOTES[state];
    setQuote(
      customQuote || quotes[Math.floor(Math.random() * quotes.length)] || quotes[0]
    );
  }, [customQuote, state]);

  return (
    <div className="relative flex flex-col items-center select-none py-2">
      {/* Dynamic Delulu Speech Bubble */}
      <div className="relative mb-3 max-w-[320px] px-3.5 py-2 bg-white rounded-2xl border border-[#C2C9BD] shadow-sm text-center transform transition-all duration-300">
        <p className="text-xs font-medium text-[#191C1A] leading-tight">
          &ldquo;{quote}&rdquo;
        </p>
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#006C4C] block mt-0.5">
          — Delulu CEO (Interim Founder)
        </span>
        {/* Speech Bubble Arrow */}
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-[#C2C9BD] rotate-45" />
      </div>

      {/* Mascot Container */}
      <div
        className={`relative w-36 h-36 flex items-center justify-center ${
          state === "idle"
            ? "animate-float-bob"
            : state === "typing"
            ? "rotate-[-2deg] transition-transform duration-300"
            : state === "loading"
            ? "animate-nod-excited"
            : "scale-105 transition-transform duration-300"
        }`}
      >
        {/* Floating Aura Elements (Visible on Loading or Success) */}
        {state === "loading" && (
          <div className="absolute inset-0 pointer-events-none">
            <span className="absolute top-2 left-1 text-sm font-bold text-emerald-600 animate-particle-1">
              $
            </span>
            <span className="absolute top-4 right-2 text-base animate-particle-2">
              🦄
            </span>
            <span className="absolute bottom-6 left-3 text-sm animate-particle-3">
              📈
            </span>
            <span className="absolute top-0 right-8 text-xs font-bold text-amber-500 animate-particle-1">
              +10x
            </span>
          </div>
        )}

        {state === "success" && (
          <div className="absolute inset-0 pointer-events-none">
            <span className="absolute -top-1 left-2 text-base animate-bounce">
              ✨
            </span>
            <span className="absolute -top-2 right-2 text-lg animate-pulse">
              🎉
            </span>
            <span className="absolute bottom-4 right-1 text-base">
              💎
            </span>
          </div>
        )}

        {/* The SVG Delulu CEO Character */}
        <svg
          viewBox="0 0 160 160"
          className="w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Halo / Backdrop Glow */}
          <circle
            cx="80"
            cy="80"
            r="64"
            className={
              state === "loading"
                ? "fill-emerald-100/70"
                : state === "success"
                ? "fill-amber-100/70"
                : "fill-[#ECEEE6]"
            }
          />

          {/* Neck */}
          <rect x="73" y="98" width="14" height="16" rx="4" fill="#F8C29D" />

          {/* Torso / Blazer */}
          <path
            d="M44 146C44 116 56 108 80 108C104 108 116 116 116 146"
            fill="#006C4C"
          />
          {/* Blazer Lapels */}
          <path
            d="M62 108L76 136L80 136L72 108H62Z"
            fill="#00533A"
          />
          <path
            d="M98 108L84 136L80 136L88 108H98Z"
            fill="#00533A"
          />
          {/* Inner Crisp White T-Shirt (Classic Tech Uniform) */}
          <path
            d="M74 114L80 126L86 114H74Z"
            fill="#FFFFFF"
          />

          {/* Golden Unicorn Lapel Pin */}
          <circle cx="68" cy="120" r="3" fill="#F59E0B" />
          <path d="M68 116L69.5 119H66.5L68 116Z" fill="#FCD34D" />

          {/* Head */}
          <rect
            x="56"
            y="48"
            width="48"
            height="56"
            rx="24"
            fill="#FBD3B6"
          />

          {/* Ears */}
          <circle cx="54" cy="74" r="6" fill="#F8C29D" />
          <circle cx="106" cy="74" r="6" fill="#F8C29D" />

          {/* Styled Tech Executive Hair (Voluminous Modern Pompadour) */}
          <path
            d="M52 56C52 38 64 30 84 30C100 30 110 38 108 52C102 50 94 48 84 49C72 50 62 53 52 56Z"
            fill="#2D1E18"
          />
          <path
            d="M52 54C48 64 48 74 54 80C55 68 56 60 62 54C58 53 54 53 52 54Z"
            fill="#2D1E18"
          />

          {/* Animated Eyebrows */}
          <path
            d={
              state === "typing" || state === "loading"
                ? "M62 60Q70 56 75 62"
                : "M62 61Q70 59 75 62"
            }
            stroke="#2D1E18"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d={
              state === "success"
                ? "M85 60Q90 54 98 58"
                : "M85 62Q90 59 98 61"
            }
            stroke="#2D1E18"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* AVIATOR SUNGLASSES (Gold Double-bar Frame with Dark Lenses) */}
          <g>
            {/* Double Brow Bridge Bars */}
            <path
              d="M62 67H98"
              stroke="#F59E0B"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M74 71H86"
              stroke="#F59E0B"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            {/* Left Lens */}
            <rect
              x="59"
              y="68"
              width="18"
              height="16"
              rx="6"
              fill="#191C1A"
              stroke="#F59E0B"
              strokeWidth="2"
            />
            {/* Right Lens */}
            <rect
              x="83"
              y="68"
              width="18"
              height="16"
              rx="6"
              fill="#191C1A"
              stroke="#F59E0B"
              strokeWidth="2"
            />

            {/* Animated Gleam across Sunglasses */}
            <g className="animate-sunglasses-gleam">
              <rect
                x="57"
                y="67"
                width="3"
                height="18"
                fill="#FFFFFF"
                opacity="0.85"
                transform="rotate(25 57 67)"
              />
              <rect
                x="81"
                y="67"
                width="3"
                height="18"
                fill="#FFFFFF"
                opacity="0.85"
                transform="rotate(25 81 67)"
              />
            </g>
          </g>

          {/* Nose */}
          <path
            d="M80 82V86"
            stroke="#E0A37B"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Mouth / Smile (Reactive to State) */}
          {state === "idle" && (
            /* Confident Subtle Smirk */
            <path
              d="M74 92Q80 95 87 91"
              stroke="#191C1A"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          )}

          {state === "typing" && (
            /* Scheming Side Smirk */
            <path
              d="M72 93Q79 93 88 89"
              stroke="#191C1A"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          )}

          {state === "loading" && (
            /* Determined "Closing the Round" Focus */
            <ellipse cx="80" cy="92" rx="4" ry="2.5" fill="#191C1A" />
          )}

          {state === "success" && (
            /* Big Million-Dollar Grin */
            <g>
              <path
                d="M71 90Q80 100 89 90Z"
                fill="#FFFFFF"
                stroke="#191C1A"
                strokeWidth="2"
              />
              <path d="M72 92H88" stroke="#E2E8F0" strokeWidth="1" />
            </g>
          )}

          {/* Hand Holding Espresso Cup (Bottom Left) */}
          <g transform="translate(36, 116)">
            {/* Coffee Cup */}
            <rect
              x="4"
              y="6"
              width="14"
              height="16"
              rx="3"
              fill="#FFFFFF"
              stroke="#C2C9BD"
              strokeWidth="1.5"
            />
            {/* Cup Handle */}
            <path
              d="M18 10C21 10 21 15 18 15"
              stroke="#C2C9BD"
              strokeWidth="1.5"
              fill="none"
            />
            {/* Emerald Sleeve Band on Cup */}
            <rect x="4" y="11" width="14" height="6" fill="#006C4C" />
            {/* Thumb holding cup */}
            <circle cx="7" cy="8" r="3.5" fill="#F8C29D" />

            {/* Rising Coffee Steam */}
            <path
              d="M8 2Q10 -3 9 -7"
              stroke="#94A3B8"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              className="animate-steam-1"
            />
            <path
              d="M13 3Q15 -2 14 -6"
              stroke="#94A3B8"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              className="animate-steam-2"
            />
          </g>

          {/* Smartphone or Thumbs Up on Right */}
          {state === "success" ? (
            /* Thumbs Up */
            <g transform="translate(108, 112)">
              <rect x="2" y="10" width="12" height="12" rx="3" fill="#F8C29D" />
              <path
                d="M6 10V2C6 0 9 0 9 2V10"
                stroke="#E0A37B"
                strokeWidth="2"
                fill="#F8C29D"
              />
            </g>
          ) : (
            /* Smartphone in Hand */
            <g transform="translate(108, 114)">
              <rect
                x="0"
                y="0"
                width="12"
                height="22"
                rx="2"
                fill="#191C1A"
                stroke="#C2C9BD"
                strokeWidth="1"
              />
              {/* Glowing Phone Screen */}
              <rect x="2" y="3" width="8" height="14" rx="1" fill="#89F8C7" />
              {/* Fingers holding phone */}
              <circle cx="1" cy="6" r="2.5" fill="#F8C29D" />
              <circle cx="1" cy="12" r="2.5" fill="#F8C29D" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
