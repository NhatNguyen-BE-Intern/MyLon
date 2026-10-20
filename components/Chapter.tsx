"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChapterItem } from "@/lib/content";
import { WashiTape } from "./Doodles";

interface ChapterProps {
  chapter: ChapterItem;
  index: number;
}

export function Chapter({ chapter, index }: ChapterProps) {
  const isEven = index % 2 === 0;

  return (
    <section
      id={index === 0 ? "chapters-section" : `chapter-${chapter.id}`}
      className="relative py-16 sm:py-24 max-w-6xl mx-auto px-4 overflow-hidden"
    >
      {/* Huge Faint Chapter Number in Background */}
      <div
        className={`absolute top-0 ${
          isEven ? "right-6 sm:right-16" : "left-6 sm:left-16"
        } font-serif text-[120px] sm:text-[180px] font-black text-[#FFC9D9]/30 select-none pointer-events-none -z-0 leading-none`}
        aria-hidden="true"
      >
        {chapter.id}
      </div>

      <div
        className={`relative z-10 flex flex-col ${
          isEven ? "lg:flex-row" : "lg:flex-row-reverse"
        } items-center justify-between gap-10 lg:gap-16`}
      >
        {/* Story Text Block */}
        <div className="w-full lg:w-1/2 space-y-4 text-left">
          <div className="inline-block px-3 py-1 rounded-sm bg-[#FF9EB5]/20 text-[#E8527A] font-mono text-xs font-bold tracking-widest uppercase">
            Chương {chapter.id}
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#3A1F27] leading-snug">
            {chapter.title}
          </h2>
          <p className="text-base sm:text-lg text-[#3A1F27]/80 leading-relaxed font-normal">
            {chapter.text}
          </p>
        </div>

        {/* Polaroid Photo Frame */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <motion.div
            className="relative polaroid-frame max-w-sm w-full"
            style={{ rotate: `${chapter.rotation}deg` }}
            whileHover={{ scale: 1.03, rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Washi Tape */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
              <WashiTape variant={chapter.tapeVariant} className="rotate-[-2deg]" />
            </div>

            {/* Photo Container */}
            <div className="relative aspect-[4/3] w-full bg-[#FFF0F3] overflow-hidden rounded-xs border border-gray-100">
              <Image
                src={chapter.photo}
                alt={chapter.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>

            {/* Handwritten Caption */}
            <div className="pt-3 text-center">
              <p className="font-handwriting text-xl sm:text-2xl text-[#3A1F27]/90 leading-tight">
                {chapter.caption}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
