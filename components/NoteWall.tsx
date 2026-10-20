"use client";

import React from "react";
import { motion } from "framer-motion";
import { content } from "@/lib/content";
import { WashiTape } from "./Doodles";

export function NoteWall() {
  const getBgColor = (variant: string) => {
    switch (variant) {
      case "rose":
        return "bg-[#FFE0E9] border-[#FFADC4]";
      case "peach":
        return "bg-[#FFE9DE] border-[#FFC7B0]";
      case "soft":
        return "bg-[#FFF0F5] border-[#FFD1DC]";
      case "cream":
      default:
        return "bg-[#FFFDF0] border-[#F0E6A2]";
    }
  };

  return (
    <section className="py-20 max-w-6xl mx-auto px-4">
      <div className="text-center mb-14">
        <span className="text-xs uppercase font-mono tracking-widest text-[#E8527A] font-semibold">
          Lời chúc chân thành
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#3A1F27] mt-2">
          Từ 6 anh em gửi tới Mỹ Vũ
        </h2>
        <p className="font-handwriting text-xl text-[#E8527A] mt-2">
          Mỗi lời nhắn là một nụ cười gửi đến em
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {content.wishes.map((wish) => (
          <motion.div
            key={wish.id}
            style={{ rotate: `${wish.rotation}deg` }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
            transition={{ duration: 0.2 }}
            className={`relative p-5 rounded-sm shadow-md border ${getBgColor(
              wish.colorVariant
            )} flex flex-col justify-between min-h-[180px] cursor-pointer`}
          >
            {/* Washi tape at top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <WashiTape variant="soft" className="w-16 h-5" />
            </div>

            <p className="font-sans text-sm text-[#3A1F27]/90 leading-relaxed italic pt-2">
              &ldquo;{wish.message}&rdquo;
            </p>

            <div className="pt-4 border-t border-black/5 flex items-center justify-between">
              <span className="font-handwriting text-lg font-bold text-[#E8527A]">
                {wish.name}
              </span>
              <span className="text-[10px] uppercase font-mono text-[#3A1F27]/40">
                Pione Global
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
