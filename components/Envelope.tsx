"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/lib/content";
import { useAudio } from "./AudioProvider";
import { DoodleHeart, DoodleStar } from "./Doodles";

interface EnvelopeProps {
  onOpenComplete?: () => void;
}

export function Envelope({ onOpenComplete }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { unlockAndPlay } = useAudio();

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    unlockAndPlay();
  };

  const handleContinue = () => {
    setIsDismissed(true);
    if (onOpenComplete) {
      onOpenComplete();
    }
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#E8527A] overflow-y-auto overflow-x-hidden px-4 py-6 paper-grain"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        role="dialog"
        aria-label="Màn mở đầu: Phong thư gửi Mỹ Vũ"
      >
        {/* Floating gentle background particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 select-none">
          <motion.div
            animate={{ y: [0, -40, 0], x: [0, 20, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-12 left-10 text-white"
          >
            <DoodleHeart className="w-12 h-12" filled />
          </motion.div>
          <motion.div
            animate={{ y: [0, 30, 0], x: [0, -15, 0], rotate: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-20 right-12 text-[#FFC9D9]"
          >
            <DoodleHeart className="w-16 h-16" filled />
          </motion.div>
          <motion.div
            animate={{ scale: [0.9, 1.2, 0.9], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-20 text-white"
          >
            <DoodleStar className="w-8 h-8" />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/3 left-16 text-[#FF9EB5]"
          >
            <DoodleStar className="w-10 h-10" />
          </motion.div>
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 flex flex-col items-center max-w-lg w-full text-center my-auto py-4">
          {/* Header Typography - Shifts slightly up when open to give letter ample breathing room */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={
              isOpen
                ? { opacity: 1, y: -16, scale: 0.96 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 sm:mb-5"
          >
            <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 text-white text-[11px] sm:text-xs font-medium tracking-wide uppercase mb-2 backdrop-blur-xs select-none">
              {content.envelope.badge}
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight drop-shadow-sm">
              {content.envelope.tagline}
            </h1>
            <p className="font-handwriting text-lg sm:text-xl text-[#FFC9D9] mt-1 select-none">
              Từ các anh em Pione Global thân gửi ✨
            </p>
          </motion.div>

          {/* Envelope Stage */}
          <div className="relative w-76 sm:w-92 h-56 sm:h-64 my-2 preserve-3d">
            {/* The Envelope Shell: Moves down slightly when open so it does not crowd the letter */}
            <motion.div
              className="absolute inset-0 preserve-3d"
              animate={isOpen ? { y: 48, scale: 0.95 } : { y: 0, scale: 1 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Envelope Back Wall */}
              <div className="absolute inset-0 bg-[#FFD7E2] rounded-lg shadow-xl border border-white/40 overflow-hidden z-0" />

              {/* Envelope Flap */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-28 origin-top z-10 cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
                animate={isOpen ? { rotateX: 180 } : { rotateX: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                onClick={handleOpen}
              >
                <svg
                  viewBox="0 0 368 112"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full drop-shadow-md"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 0 H368 L184 112 L0 0 Z"
                    fill="#FFBFD1"
                    stroke="#FFA8C1"
                    strokeWidth="1.5"
                  />
                </svg>

                {/* Heart Wax Seal */}
                {!isOpen && (
                  <div className="absolute left-1/2 bottom-2 -translate-x-1/2 translate-y-1/2 w-11 h-11 rounded-full bg-[#D03B64] border-2 border-[#FFA8C1] shadow-md flex items-center justify-center text-white cursor-pointer hover:scale-105 transition-transform">
                    <DoodleHeart className="w-5 h-5 text-white" filled />
                  </div>
                )}
              </motion.div>

              {/* Envelope Front Pocket */}
              <div className="absolute inset-0 z-20 pointer-events-none">
                <svg
                  viewBox="0 0 368 256"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                  preserveAspectRatio="none"
                >
                  {/* Left fold */}
                  <path d="M0 0 L184 140 L0 256 Z" fill="#FFC9D9" />
                  {/* Right fold */}
                  <path d="M368 0 L184 140 L368 256 Z" fill="#FFC9D9" />
                  {/* Bottom fold */}
                  <path
                    d="M0 256 L184 130 L368 256 Z"
                    fill="#FFADC4"
                    stroke="#FF9EB5"
                    strokeWidth="1"
                  />
                </svg>
              </div>
            </motion.div>

            {/* The Letter Paper:
                - When open: slides up cleanly to y: -60px
                - zIndex: 30 (IN FRONT OF the envelope pocket, so 0 words are covered!)
                - Top stays cleanly below the title "Có một lá thư gửi Mỹ Vũ"
                - Full text completely visible! */}
            <motion.div
              className="absolute left-2 right-2 sm:left-3 sm:right-3 top-2 bg-[#FFFDF9] text-[#3A1F27] p-5 sm:p-6 rounded-md border border-[#FFC9D9] flex flex-col justify-between text-left origin-bottom select-text"
              style={{ zIndex: 30 }}
              animate={
                isOpen
                  ? {
                      y: -60,
                      scale: 1.03,
                      opacity: 1,
                      boxShadow: "0 25px 45px -5px rgba(58, 31, 39, 0.35)",
                    }
                  : { y: 25, scale: 0.94, opacity: 0 }
              }
              transition={{
                duration: 0.85,
                delay: isOpen ? 0.25 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div>
                <p className="font-serif font-black text-[#E8527A] text-base sm:text-lg mb-2">
                  {content.envelope.letterPreview.salutation}
                </p>
                <p className="text-xs sm:text-sm leading-relaxed text-[#3A1F27]/90 font-normal">
                  {content.envelope.letterPreview.body}
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-[#FFC9D9]/70 pt-2.5 mt-3">
                <span className="font-handwriting text-base sm:text-lg text-[#E8527A] font-semibold">
                  {content.envelope.letterPreview.closing}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#3A1F27]/50 uppercase">
                  PIONE 20/10
                </span>
              </div>
            </motion.div>
          </div>

          {/* Action Button: Pushed well down so it never covers the envelope or letter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              isOpen
                ? { opacity: 1, y: 44 }
                : { opacity: 1, y: 0 }
            }
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 sm:mt-12 flex flex-col items-center select-none"
          >
            {!isOpen ? (
              <button
                onClick={handleOpen}
                className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full font-serif font-bold text-base transition-all duration-300 shadow-xl cursor-pointer bg-white text-[#E8527A] hover:bg-[#FFF3F0] hover:scale-105 active:scale-95 hover:shadow-2xl"
              >
                <DoodleHeart className="w-5 h-5 text-[#E8527A] group-hover:scale-110 transition-transform" filled />
                <span>{content.envelope.buttonText}</span>
                <span className="text-xl leading-none">💌</span>
              </button>
            ) : (
              <motion.button
                initial={{ opacity: 0, y: 15, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.45 }}
                onClick={handleContinue}
                className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full font-serif font-black text-base sm:text-lg transition-all duration-300 shadow-[0_15px_35px_rgba(58,31,39,0.3)] cursor-pointer bg-white text-[#E8527A] hover:bg-[#FFF3F0] hover:scale-105 active:scale-95 hover:shadow-[0_20px_40px_rgba(58,31,39,0.4)]"
              >
                <span>Xem tiếp nhé</span>
                <svg
                  className="w-5 h-5 text-[#E8527A] transition-transform group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </motion.button>
            )}

            {isOpen ? (
              <p className="text-xs text-white/80 mt-3 font-sans tracking-wide">
                Chạm để bước vào cuốn album kỷ niệm 20/10 ✨
              </p>
            ) : content.envelope.secretHint?.trim() ? (
              <p className="text-xs text-white/80 mt-3 font-sans tracking-wide">
                {content.envelope.secretHint}
              </p>
            ) : null}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
