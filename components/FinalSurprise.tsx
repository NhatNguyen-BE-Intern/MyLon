"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { content } from "@/lib/content";
import { useLenis } from "./SmoothScroll";
import { WavyUnderline } from "./Doodles";

const POLAROIDS = [
  {
    id: "p1",
    src: "/media/photo-1.jpg",
    alt: "Khoảnh khắc 1",
    caption: "Ngày đầu",
    rotation: -8,
    desktopPos: "-left-10 sm:-left-16 top-16",
    delay: 1.8,
  },
  {
    id: "p2",
    src: "/media/photo-2.jpg",
    alt: "Khoảnh khắc 2",
    caption: "Nụ cười Mỹ Vũ",
    rotation: 6,
    desktopPos: "-right-8 sm:-right-14 top-24",
    delay: 1.92,
  },
  {
    id: "p3",
    src: "/media/photo-3.jpg",
    alt: "Khoảnh khắc 3",
    caption: "Cùng anh em",
    rotation: -5,
    desktopPos: "-left-8 sm:-left-14 bottom-20",
    delay: 2.04,
  },
  {
    id: "p4",
    src: "/media/photo-4.jpg",
    alt: "Khoảnh khắc 4",
    caption: "Team Pione",
    rotation: 7,
    desktopPos: "-right-10 sm:-right-16 bottom-16",
    delay: 2.16,
  },
];

export function FinalSurprise() {
  const [hasAccepted, setHasAccepted] = useState(false);
  const [dodgeCount, setDodgeCount] = useState(0);
  const [dodgePos, setDodgePos] = useState({ x: 0, y: 0 });
  const [isShaking, setIsShaking] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const { scrollToTop } = useLenis();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleDodge = () => {
    const randomX = (Math.random() - 0.5) * 260;
    const randomY = (Math.random() - 0.5) * 160;
    setDodgePos({ x: randomX, y: randomY });
    setDodgeCount((prev) => prev + 1);
  };

  const handleAccept = () => {
    setHasAccepted(true);

    // 3 waves of confetti 400ms apart
    const fireWave = (delayMs: number, opts: confetti.Options) => {
      setTimeout(() => {
        confetti({
          particleCount: 75,
          spread: 85,
          origin: { y: 0.65 },
          colors: ["#E8527A", "#FFC9D9", "#FF9EB5", "#FFD700", "#FFF8EE"],
          ...opts,
        });
      }, delayMs);
    };

    fireWave(0, { origin: { x: 0.15, y: 0.7 } });
    fireWave(400, { origin: { x: 0.85, y: 0.7 } });
    fireWave(800, { origin: { x: 0.5, y: 0.6 }, particleCount: 100 });

    // Trigger card shake exactly when rubber stamp slams down (1.4s)
    if (!prefersReducedMotion) {
      setTimeout(() => {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 90);
      }, 1400);
    }
  };

  return (
    <footer
      className="relative min-h-screen py-20 sm:py-28 px-4 overflow-hidden flex flex-col items-center justify-center transition-colors duration-1000 paper-grain"
      style={{
        background:
          "radial-gradient(circle 750px at 50% 38%, rgba(255, 230, 240, 0.22) 0%, rgba(232, 82, 122, 0.96) 65%, #C2385D 100%)",
      }}
      aria-label="Phần kết và món quà bất ngờ"
    >
      {/* SVG Definitions for Heart Clip & Stamp Ink Bleed Filter */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <defs>
          {/* Heart Clip-Path normalized to 0..1 bounding box */}
          <clipPath id="coupleHeartClip" clipPathUnits="objectBoundingBox">
            <path d="M 0.5, 0.86 C 0.22, 0.64 0, 0.44 0, 0.27 C 0, 0.11 0.12, 0 0.27, 0 C 0.38, 0 0.46, 0.06 0.5, 0.15 C 0.54, 0.06 0.62, 0 0.73, 0 C 0.88, 0 1, 0.11 1, 0.27 C 1, 0.44 0.78, 0.64 0.5, 0.86 Z" />
          </clipPath>

          {/* Stamp Ink Turbulence & Displacement Filter */}
          <filter id="stampInkBleed" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.09"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="2.2"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center text-center">
        {!hasAccepted ? (
          /* Question Screen before accepting */
          <div className="space-y-8 max-w-2xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-none bg-white/20 text-white text-xs sm:text-sm font-mono tracking-[0.25em] uppercase backdrop-blur-xs">
              KHOẢNH KHẮC CUỐI CÙNG
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black leading-tight text-white drop-shadow-sm">
              {content.finalSurprise.question}
            </h2>

            <p className="font-handwriting text-2xl sm:text-3xl text-[#FFD7E2] tracking-wide">
              Các anh chuẩn bị kỹ lắm rồi đó, Mỹ Vũ ấn nhận nha
            </p>

            <div className="relative flex items-center justify-center gap-6 pt-6 min-h-[90px]">
              <button
                onClick={handleAccept}
                className="px-9 py-4 rounded-full bg-white text-[#E8527A] font-serif font-black text-lg sm:text-xl shadow-[0_12px_30px_rgba(58,31,39,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                {content.finalSurprise.acceptButton}
              </button>

              <motion.button
                onMouseEnter={handleDodge}
                onTouchStart={handleDodge}
                animate={{ x: dodgePos.x, y: dodgePos.y }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="px-7 py-3.5 rounded-full bg-white/20 text-white font-serif text-base border border-white/40 cursor-pointer select-none backdrop-blur-xs"
              >
                {dodgeCount >= 5
                  ? content.finalSurprise.declinePersuaded
                  : content.finalSurprise.declineButton}
              </motion.button>
            </div>
          </div>
        ) : (
          /* Redesigned Real Paper Wedding Invitation Screen */
          <AnimatePresence>
            <div className="w-full flex flex-col items-center">
              {/* Card Container with drop & shake motion */}
              <motion.div
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { y: -160, opacity: 0, rotate: -3 }
                }
                animate={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : {
                        y: 0,
                        opacity: 1,
                        rotate: 2,
                        x: isShaking ? [-4, 4, -3, 3, 0] : 0,
                      }
                }
                transition={
                  prefersReducedMotion
                    ? { duration: 0.15 }
                    : {
                        y: { type: "spring", stiffness: 120, damping: 14, delay: 0.1 },
                        rotate: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                        opacity: { duration: 0.4 },
                        x: { duration: 0.09 },
                      }
                }
                className="relative my-8 sm:my-12 w-full max-w-[340px] sm:max-w-[460px] md:max-w-[540px] select-none"
              >
                {/* Washi Tape stuck askew on upper corner */}
                <div
                  className="absolute -top-3.5 right-6 sm:right-10 z-30 w-24 sm:w-32 h-6 sm:h-7 rotate-[7deg] bg-[#FF9EB5]/85 backdrop-blur-[1px] shadow-[0_2px_5px_rgba(58,31,39,0.18)] border-l-2 border-r-2 border-dashed border-white/60 pointer-events-none"
                  aria-hidden="true"
                />

                {/* REAL PAPER CARD: Square corners (rounded-none), cream #FFF8EE, 2-layer tabletop shadow */}
                <div
                  className="relative bg-[#FFF8EE] text-[#3A1F27] rounded-none p-7 sm:p-10 md:p-12 shadow-[0_2px_4px_rgba(58,31,39,0.35),0_30px_60px_-12px_rgba(58,31,39,0.45)] border border-[#E8527A]/25 overflow-visible"
                  style={{
                    backgroundImage:
                      "radial-gradient(rgba(58, 31, 39, 0.05) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                >
                  {/* Double 1px deep pink line border offset 14px inside edge with diagonal corner notches */}
                  <div
                    className="absolute inset-[13px] sm:inset-[16px] border border-[#E8527A]/55 pointer-events-none"
                    aria-hidden="true"
                  >
                    {/* Inner secondary hairline */}
                    <div className="absolute inset-[3px] border border-[#E8527A]/25" />

                    {/* 4 Corner Diagonal Cuts / Notches (SVG) */}
                    <svg className="absolute -top-[1px] -left-[1px] w-4 h-4 text-[#E8527A]">
                      <line x1="0" y1="12" x2="12" y2="0" stroke="currentColor" strokeWidth="1.25" />
                    </svg>
                    <svg className="absolute -top-[1px] -right-[1px] w-4 h-4 text-[#E8527A]">
                      <line x1="4" y1="0" x2="16" y2="12" stroke="currentColor" strokeWidth="1.25" />
                    </svg>
                    <svg className="absolute -bottom-[1px] -left-[1px] w-4 h-4 text-[#E8527A]">
                      <line x1="0" y1="4" x2="12" y2="16" stroke="currentColor" strokeWidth="1.25" />
                    </svg>
                    <svg className="absolute -bottom-[1px] -right-[1px] w-4 h-4 text-[#E8527A]">
                      <line x1="4" y1="16" x2="16" y2="4" stroke="currentColor" strokeWidth="1.25" />
                    </svg>
                  </div>

                  {/* Card Content Stack */}
                  <div className="relative z-10 flex flex-col items-center">
                    {/* Top Label */}
                    <div className="pt-1 pb-3 text-center">
                      <span className="font-mono text-[9px] sm:text-[11px] tracking-[0.28em] uppercase text-[#3A1F27]/60 font-semibold">
                        {content.finalSurprise.invitation.tagline}
                      </span>
                    </div>

                    {/* Single-line Art: Interlocking Wedding Rings (strokeWidth 1.25, no emojis!) */}
                    <div className="my-1 text-[#E8527A]" aria-hidden="true">
                      <svg
                        className="w-10 h-6 sm:w-12 sm:h-7"
                        viewBox="0 0 48 24"
                        fill="none"
                      >
                        <ellipse
                          cx="17"
                          cy="12"
                          rx="10"
                          ry="9"
                          stroke="currentColor"
                          strokeWidth="1.25"
                        />
                        <ellipse
                          cx="31"
                          cy="12"
                          rx="10"
                          ry="9"
                          stroke="currentColor"
                          strokeWidth="1.25"
                        />
                        <circle cx="24" cy="5" r="1.5" fill="currentColor" />
                      </svg>
                    </div>

                    {/* SPECIAL COUPLE PORTRAIT: Anh An on Left, My on Right inside ONE Heart */}
                    <motion.div
                      initial={prefersReducedMotion ? { opacity: 0 } : { scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="relative w-36 h-32 sm:w-44 sm:h-38 my-3 group"
                    >
                      {/* Heart-shaped container holding both photos side-by-side */}
                      <div
                        className="relative w-full h-full flex overflow-hidden shadow-md"
                        style={{ clipPath: "url(#coupleHeartClip)" }}
                      >
                        {/* Left Half: Anh An */}
                        <div className="relative w-1/2 h-full bg-[#18181b]">
                          <Image
                            src="/media/an.png"
                            alt="Anh An"
                            fill
                            className="object-cover object-top scale-110"
                            sizes="120px"
                          />
                        </div>

                        {/* Right Half: Mỹ Vũ */}
                        <div className="relative w-1/2 h-full bg-[#FFF0F3]">
                          <Image
                            src="/media/photo-2.jpg"
                            alt="Mỹ Vũ"
                            fill
                            className="object-cover object-top scale-110"
                            sizes="120px"
                          />
                        </div>

                        {/* Subtle feathered divider line */}
                        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-white/40 z-10" />
                      </div>

                      {/* Single-line Heart Stroke Border (strokeWidth 1.25) */}
                      <svg
                        viewBox="0 0 100 86"
                        className="absolute inset-0 w-full h-full pointer-events-none text-[#E8527A]"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M 50, 86 C 22, 64 0, 44 0, 27 C 0, 11 12, 0 27, 0 C 38, 0 46, 6 50, 15 C 54, 6 62, 0 73, 0 C 88, 0 100, 11 100, 27 C 100, 44 78, 64 50, 86 Z"
                          stroke="currentColor"
                          strokeWidth="1.25"
                        />
                      </svg>
                    </motion.div>

                    {/* GIGANTIC STAGGERED NAMES: "My" (left) & "An" (right) with massive "&" in center */}
                    <div className="relative w-full my-2 sm:my-3">
                      {/* Giant Overlapping Ampersand "&" */}
                      <motion.div
                        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 0.9, scale: 1 }}
                        transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
                        aria-hidden="true"
                      >
                        <span className="font-serif italic font-light text-[#E8527A] text-[120px] sm:text-[170px] md:text-[210px] leading-none -translate-y-2">
                          &amp;
                        </span>
                      </motion.div>

                      {/* "Mỹ Vũ" - Left Aligned, Mask Slide-Up */}
                      <div className="overflow-hidden text-left relative z-10 pl-2 sm:pl-4">
                        <motion.h3
                          initial={prefersReducedMotion ? { opacity: 0 } : { y: "100%" }}
                          animate={prefersReducedMotion ? { opacity: 1 } : { y: "0%" }}
                          transition={{
                            delay: 0.7,
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="font-serif font-black text-[#3A1F27] text-[52px] sm:text-[80px] md:text-[104px] leading-[0.88] tracking-tight"
                        >
                          Mỹ Vũ
                        </motion.h3>
                      </div>

                      {/* "An" - Right Aligned, Stepped Down One Beat, Mask Slide-Up (+120ms) */}
                      <div className="overflow-hidden text-right relative z-10 pr-2 sm:pr-4 mt-1 sm:mt-2">
                        <motion.h3
                          initial={prefersReducedMotion ? { opacity: 0 } : { y: "100%" }}
                          animate={prefersReducedMotion ? { opacity: 1 } : { y: "0%" }}
                          transition={{
                            delay: 0.82,
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="font-serif font-black text-[#3A1F27] text-[52px] sm:text-[80px] md:text-[104px] leading-[0.88] tracking-tight"
                        >
                          An
                        </motion.h3>
                      </div>
                    </div>

                    {/* Blessing Sentence (Fraunces Medium Italic, NOT sans) */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.0, duration: 0.6 }}
                      className="font-serif italic font-normal text-base sm:text-xl md:text-2xl text-[#3A1F27] text-center my-3 sm:my-4 px-2"
                    >
                      {content.finalSurprise.invitation.blessing}
                    </motion.p>

                    {/* Signature (Caveat handwriting tilted -3° with SVG Wavy Underline) */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.15, duration: 0.9 }}
                      className="mt-3 sm:mt-5 text-center flex flex-col items-center rotate-[-3deg]"
                    >
                      <span className="font-handwriting font-bold text-2xl sm:text-3xl text-[#3A1F27] tracking-wide">
                        {content.finalSurprise.invitation.signature}
                      </span>
                      <div className="w-48 sm:w-60 h-3 -mt-1 text-[#E8527A]">
                        <WavyUnderline className="w-full h-full" />
                      </div>
                    </motion.div>
                  </div>

                  {/* RUBBER STAMP: "NGÀY CƯỚI: SỚM THÔI"
                      Red brick #C2452D with feTurbulence ink bleed, text along textPath, rotated -12°, overlapping corner & bleeding outside edge */}
                  <motion.div
                    initial={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : { scale: 1.6, opacity: 0 }
                    }
                    animate={{ scale: 1, opacity: 1 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0.15 }
                        : { delay: 1.4, duration: 0.22, ease: [0.22, 1, 0.36, 1] }
                    }
                    className="absolute -bottom-8 -right-6 sm:-bottom-10 sm:-right-10 z-30 pointer-events-none select-none rotate-[-12deg]"
                    aria-label="Con dấu: Ngày cưới sớm thôi"
                  >
                    <svg
                      viewBox="0 0 140 140"
                      className="w-36 h-36 sm:w-44 sm:h-44 text-[#C2452D]"
                      style={{ filter: "url(#stampInkBleed)" }}
                    >
                      {/* Stamp Circle Definitions */}
                      <defs>
                        {/* Top Arc Path (clockwise for upper text) */}
                        <path
                          id="stampTopArc"
                          d="M 18, 70 A 52,52 0 1,1 122, 70"
                          fill="none"
                        />
                        {/* Bottom Arc Path (clockwise for lower text) */}
                        <path
                          id="stampBottomArc"
                          d="M 122, 70 A 52,52 0 1,1 18, 70"
                          fill="none"
                        />
                      </defs>

                      {/* Outer Ring */}
                      <circle
                        cx="70"
                        cy="70"
                        r="64"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.75"
                        strokeDasharray="9 2"
                      />

                      {/* Inner Thin Border */}
                      <circle
                        cx="70"
                        cy="70"
                        r="55"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.25"
                      />

                      {/* Top Text along Path: NGÀY CƯỚI: SỚM THÔI */}
                      <text
                        fill="currentColor"
                        fontSize="10"
                        fontFamily="var(--font-fraunces), serif"
                        fontWeight="900"
                        letterSpacing="2.8"
                      >
                        <textPath
                          href="#stampTopArc"
                          startOffset="50%"
                          textAnchor="middle"
                        >
                          NGÀY CƯỚI: SỚM THÔI
                        </textPath>
                      </text>

                      {/* Bottom Text along Path: PIONE GLOBAL */}
                      <text
                        fill="currentColor"
                        fontSize="8.5"
                        fontFamily="var(--font-fraunces), serif"
                        fontWeight="800"
                        letterSpacing="3"
                      >
                        <textPath
                          href="#stampBottomArc"
                          startOffset="50%"
                          textAnchor="middle"
                        >
                          PIONE GLOBAL
                        </textPath>
                      </text>

                      {/* Stamp Center: Double Ring & Star */}
                      <circle
                        cx="70"
                        cy="70"
                        r="28"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                      <polygon
                        points="70,58 73,66 81,66 74.5,71 77,79 70,74 63,79 65.5,71 59,66 67,66"
                        fill="currentColor"
                      />
                      <text
                        x="70"
                        y="88"
                        textAnchor="middle"
                        fill="currentColor"
                        fontSize="7"
                        fontFamily="var(--font-mono), monospace"
                        fontWeight="700"
                        letterSpacing="1"
                      >
                        OFFICIAL
                      </text>
                    </svg>
                  </motion.div>
                </div>

                {/* 4 POLAROIDS (01-04): scattered around/overlapping card edges on Desktop, staggered fly-in */}
                <div className="hidden md:block pointer-events-none">
                  {POLAROIDS.map((polaroid) => (
                    <motion.div
                      key={polaroid.id}
                      initial={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : { opacity: 0, scale: 0.8, y: 30 }
                      }
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0.15 }
                          : {
                              delay: polaroid.delay,
                              duration: 0.6,
                              ease: [0.22, 1, 0.36, 1],
                            }
                      }
                      style={{ rotate: `${polaroid.rotation}deg` }}
                      className={`absolute ${polaroid.desktopPos} z-20 w-32 sm:w-36 bg-white p-2.5 pb-6 shadow-[0_12px_24px_rgba(58,31,39,0.28)] border border-black/5 rounded-none`}
                    >
                      <div className="relative aspect-square w-full bg-[#FFF0F3] overflow-hidden">
                        <Image
                          src={polaroid.src}
                          alt={polaroid.alt}
                          fill
                          className="object-cover"
                          sizes="150px"
                        />
                      </div>
                      <p className="font-handwriting text-sm text-[#3A1F27] text-center pt-2 leading-none">
                        {polaroid.caption}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Mobile 375px Polaroids Stack: positioned below the card without causing horizontal overflow */}
              <div className="md:hidden w-full max-w-sm mt-6 mb-8 px-2">
                <p className="font-handwriting text-lg text-white/90 text-center mb-3">
                  {content.finalSurprise.galleryCaption}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {POLAROIDS.map((p) => (
                    <div
                      key={p.id}
                      style={{ rotate: `${p.rotation * 0.6}deg` }}
                      className="bg-white p-2 pb-5 shadow-lg border border-black/5 rounded-none"
                    >
                      <div className="relative aspect-square w-full bg-[#FFF0F3] overflow-hidden">
                        <Image
                          src={p.src}
                          alt={p.alt}
                          fill
                          className="object-cover"
                          sizes="160px"
                        />
                      </div>
                      <p className="font-handwriting text-xs text-[#3A1F27] text-center pt-1.5 leading-none">
                        {p.caption}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* REPLAY BUTTON: Fraunces italic, underline with left-to-right hover sweep, SVG upward arrow ↑, NO white pill */}
              <div className="pt-6 sm:pt-10 pb-4">
                <button
                  onClick={scrollToTop}
                  className="group relative inline-flex items-center gap-2.5 font-serif italic text-white/90 hover:text-white text-lg sm:text-xl tracking-wide transition-colors cursor-pointer py-1.5 select-none"
                >
                  <span>{content.finalSurprise.replayButton}</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1.5"
                    aria-hidden="true"
                  >
                    <line x1="12" y1="19" x2="12" y2="5" />
                    <polyline points="5 12 12 5 19 12" />
                  </svg>
                  {/* Underline sweeping from left to right */}
                  <span
                    className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 pointer-events-none"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </AnimatePresence>
        )}
      </div>
    </footer>
  );
}
