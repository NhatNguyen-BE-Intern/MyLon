"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { content } from "@/lib/content";
import { WavyUnderline, DoodleHeart, DoodleStar, StampDecor } from "./Doodles";

// Particle definition for falling sakura petals and hearts
const PARTICLES = [
  { id: 1, type: "heart", left: "8%", delay: 0, duration: 9, size: 22, rotate: 15 },
  { id: 2, type: "petal", left: "18%", delay: 2, duration: 11, size: 18, rotate: -25 },
  { id: 3, type: "heart", left: "28%", delay: 4, duration: 10, size: 26, rotate: 45 },
  { id: 4, type: "petal", left: "42%", delay: 1, duration: 12, size: 20, rotate: 10 },
  { id: 5, type: "star", left: "55%", delay: 3, duration: 8, size: 16, rotate: 30 },
  { id: 6, type: "petal", left: "68%", delay: 5, duration: 13, size: 24, rotate: -35 },
  { id: 7, type: "heart", left: "78%", delay: 2.5, duration: 9.5, size: 20, rotate: -15 },
  { id: 8, type: "petal", left: "88%", delay: 0.5, duration: 11.5, size: 22, rotate: 50 },
  { id: 9, type: "star", left: "93%", delay: 3.8, duration: 8.5, size: 14, rotate: -20 },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax shifts for floating particles & titles
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const yTitle = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityTitle = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <header
      ref={containerRef}
      className="relative min-h-[95vh] sm:min-h-screen flex flex-col items-center justify-between pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 overflow-hidden"
    >
      {/* Floating Petals, Hearts and Stars Background with Parallax */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 pointer-events-none overflow-hidden select-none"
        aria-hidden="true"
      >
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: -50, opacity: 0 }}
            animate={{
              y: ["0vh", "110vh"],
              opacity: [0, 0.85, 0.85, 0],
              x: [0, (p.id % 2 === 0 ? 35 : -35), 0],
              rotate: [p.rotate, p.rotate + 180],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute text-[#FF9EB5]/70"
            style={{ left: p.left, width: p.size, height: p.size }}
          >
            {p.type === "heart" ? (
              <DoodleHeart className="w-full h-full text-[#FF9EB5]" filled={p.id % 2 === 0} />
            ) : p.type === "star" ? (
              <DoodleStar className="w-full h-full text-[#FFC9D9]" />
            ) : (
              // Sakura petal SVG
              <svg viewBox="0 0 30 30" fill="#FFC9D9" className="w-full h-full drop-shadow-xs">
                <path d="M15 0 C25 5 30 20 15 30 C0 20 5 5 15 0 Z" />
              </svg>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Decorative scrapbooking corner elements */}
      <div className="absolute top-8 left-6 sm:left-12 opacity-80 pointer-events-none select-none hidden sm:block">
        <StampDecor label="PIONE • 20/10" />
      </div>

      <div className="absolute top-8 right-6 sm:right-12 text-[#FF9EB5] opacity-60 pointer-events-none select-none hidden sm:flex items-center gap-1 font-handwriting text-lg">
        <span>Gửi Mỹ Vũ với tất cả sự yêu mến</span>
        <DoodleHeart className="w-5 h-5 text-[#E8527A]" filled />
      </div>

      {/* Main Centered Hero Block */}
      <motion.div
        style={{ y: yTitle, opacity: opacityTitle }}
        className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center my-auto"
      >
        {/* Subtle badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FFC9D9]/50 border border-[#FF9EB5]/60 text-[#E8527A] text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-xs mb-6 sm:mb-8"
        >
          <DoodleHeart className="w-4 h-4 text-[#E8527A]" filled />
          <span>{content.hero.badge}</span>
          <DoodleHeart className="w-4 h-4 text-[#E8527A]" filled />
        </motion.div>

        {/* Giant Scrapbook Title with Highlighted Italic Word */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#3A1F27] leading-[1.1] tracking-tight"
        >
          <span>{content.hero.titleBefore}</span>
          <span className="relative inline-block italic text-[#E8527A] px-2 sm:px-3 mx-1 font-serif">
            {content.hero.titleHighlight}
            {/* Hand-drawn wavy underline right under "My" */}
            <span className="absolute -bottom-2 sm:-bottom-3 left-0 w-full block pointer-events-none">
              <WavyUnderline className="w-full h-3 sm:h-5 text-[#E8527A]" />
            </span>
          </span>
          <span>{content.hero.titleAfter}</span>
        </motion.h1>

        {/* Heart and Sparkle Accents */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 10 }}
          transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
          className="my-4 text-[#E8527A]"
        >
          <DoodleHeart className="w-8 h-8 sm:w-10 sm:h-10 text-[#E8527A]" filled />
        </motion.div>

        {/* Subtitle / Narrative sentence */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl text-base sm:text-xl md:text-2xl text-[#3A1F27]/80 font-normal leading-relaxed px-4"
        >
          {content.hero.subtitle}
        </motion.p>
      </motion.div>

      {/* "Cuộn xuống nhé" Hint with Bouncing Arrow */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="relative z-10 flex flex-col items-center text-center mt-8 cursor-pointer select-none group"
        onClick={() => {
          const nextSection = document.getElementById("chapters-section");
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        <span className="font-handwriting text-xl sm:text-2xl text-[#E8527A] group-hover:scale-105 transition-transform">
          {content.hero.scrollHint}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="mt-2 text-[#E8527A]"
          aria-hidden="true"
        >
          <svg
            className="w-6 h-6 stroke-current"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
        </motion.div>
      </motion.div>
    </header>
  );
}
