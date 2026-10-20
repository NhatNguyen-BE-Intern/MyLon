"use client";

import React from "react";

export function WavyUnderline({ className = "w-full h-3 text-[#E8527A]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M2 7C14 2 24 11 36 6C48 1 58 11 70 6C82 1 92 11 104 6C112 2.5 116 5 118 6.5"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DoodleHeart({
  className = "w-6 h-6 text-[#E8527A]",
  filled = false,
}: {
  className?: string;
  filled?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? "0.5" : "2"}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export function DoodleStar({ className = "w-5 h-5 text-[#FF9EB5]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

export function WashiTape({
  variant = "peach",
  className = "",
  style = {},
}: {
  variant?: "peach" | "soft" | "deep";
  className?: string;
  style?: React.CSSProperties;
}) {
  const variantClass =
    variant === "deep"
      ? "washi-tape-deep"
      : variant === "soft"
      ? "washi-tape-soft"
      : "washi-tape-peach";

  return (
    <div
      className={`h-7 w-28 rounded-xs ${variantClass} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

export function StampDecor({ label = "PIONE 20/10" }: { label?: string }) {
  return (
    <div className="inline-flex items-center justify-center p-2 border-2 border-dashed border-[#E8527A]/50 rounded-md rotate-[-8deg] bg-white/40 shadow-xs pointer-events-none select-none">
      <span className="text-[10px] tracking-widest font-mono font-bold text-[#E8527A] uppercase">
        {label}
      </span>
    </div>
  );
}
