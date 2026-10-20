"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { content, VideoItem } from "@/lib/content";
import { useAudio } from "./AudioProvider";
import { DoodleHeart, DoodleStar } from "./Doodles";

export function VideoCinema() {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { pauseBgm, resumeBgm } = useAudio();

  const videos: VideoItem[] =
    content.videoMoment.videos && content.videoMoment.videos.length > 0
      ? content.videoMoment.videos
      : [
          {
            id: "vid-1",
            title: "Thước phim 01: Khoảnh khắc đáng nhớ",
            subtitle: "Một góc nhìn thật tự nhiên và dễ thương của Mỹ Vũ",
            src: content.videoMoment.src,
            poster: content.videoMoment.poster,
          },
        ];

  const activeVideo = videos[activeIndex] || videos[0];

  const handlePlay = () => {
    pauseBgm();
  };

  const handlePause = () => {
    resumeBgm();
  };

  const handleEnded = () => {
    resumeBgm();
    // Auto advance to next video if available
    if (activeIndex < videos.length - 1) {
      selectVideo(activeIndex + 1);
    }
  };

  const selectVideo = (idx: number) => {
    if (idx === activeIndex) return;
    setActiveIndex(idx);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {
          // Autoplay policy fallback
        });
      }
    }, 150);
  };

  const handlePrev = () => {
    const prev = activeIndex > 0 ? activeIndex - 1 : videos.length - 1;
    selectVideo(prev);
  };

  const handleNext = () => {
    const next = activeIndex < videos.length - 1 ? activeIndex + 1 : 0;
    selectVideo(next);
  };

  return (
    <section className="relative py-24 bg-[#231118] text-white my-16 px-4 overflow-hidden paper-grain">
      {/* Decorative cinema lighting glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#E8527A]/15 blur-[140px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* Section Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8527A]/25 border border-[#E8527A]/40 text-[#FF9EB5] text-xs font-semibold uppercase tracking-wider shadow-sm">
            <DoodleHeart className="w-4 h-4 text-[#FF9EB5]" filled />
            <span>{content.videoMoment.badge}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-sm">
            {content.videoMoment.title}
          </h2>

          <p className="text-white/75 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            {content.videoMoment.subtitle}
          </p>
        </div>

        {/* Video Selector Tabs / Filmstrip Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 pt-2">
          {videos.map((vid, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={vid.id}
                onClick={() => selectVideo(idx)}
                className={`relative px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer flex items-center gap-2 border select-none ${
                  isActive
                    ? "bg-[#E8527A] text-white border-[#FFA8C1] shadow-[0_4px_18px_rgba(232,82,122,0.45)] scale-105"
                    : "bg-white/10 text-white/75 border-white/15 hover:bg-white/15 hover:text-white"
                }`}
                aria-pressed={isActive}
              >
                <span className="text-xs">🎬</span>
                <span className="font-semibold">Thước phim 0{idx + 1}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                )}
              </button>
            );
          })}
        </div>

        {/* Cinema Video Player Screen */}
        <div className="relative max-w-3xl mx-auto">
          {/* Film Strip Top Perforations */}
          <div className="flex justify-between items-center px-4 py-2 bg-[#170B10] rounded-t-2xl border-t border-x border-white/15">
            <div className="flex gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] tracking-widest text-[#FF9EB5] font-semibold uppercase">
                SCENE {activeIndex + 1} / {videos.length}
              </span>
              <span className="text-xs text-white/40">•</span>
              <span className="font-mono text-[11px] text-white/60">
                PIONE 20/10
              </span>
            </div>
            <div className="flex gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            </div>
          </div>

          {/* Screen Frame */}
          <div className="relative overflow-hidden bg-black shadow-[0_25px_60px_rgba(0,0,0,0.8)] border-x border-b border-white/15 rounded-b-2xl min-h-[300px] sm:min-h-[420px] max-h-[75vh] flex items-center justify-center">
            {/* Ambient Blurred Background of current poster */}
            <div
              className="absolute inset-0 bg-cover bg-center filter blur-3xl opacity-35 scale-125 transition-all duration-700 pointer-events-none"
              style={{ backgroundImage: `url(${activeVideo.poster})` }}
            />

            {/* Video Element */}
            <video
              key={activeVideo.src}
              ref={videoRef}
              src={activeVideo.src}
              poster={activeVideo.poster}
              playsInline
              controls
              preload="metadata"
              onPlay={handlePlay}
              onPause={handlePause}
              onEnded={handleEnded}
              className="relative z-10 w-full max-h-[70vh] object-contain"
            />
          </div>

          {/* Navigation Arrows for Previous / Next */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#E8527A] text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer"
            aria-label="Thước phim trước"
            title="Thước phim trước"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#E8527A] text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer"
            aria-label="Thước phim tiếp theo"
            title="Thước phim tiếp theo"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Active Video Info Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeVideo.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="max-w-xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-sm"
          >
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#FFD7E2]">
              {activeVideo.title}
            </h3>
            <p className="text-white/70 text-xs sm:text-sm mt-1 leading-relaxed">
              {activeVideo.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* 3 Video Interactive Thumbnail Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 max-w-3xl mx-auto pt-2">
          {videos.map((vid, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={vid.id}
                onClick={() => selectVideo(idx)}
                className={`group text-left p-3 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center gap-3 select-none ${
                  isActive
                    ? "bg-[#E8527A]/25 border-[#E8527A] shadow-[0_6px_22px_rgba(232,82,122,0.35)] scale-[1.02]"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                {/* Thumbnail Preview */}
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-black/50 border border-white/15">
                  <Image
                    src={vid.poster}
                    alt={vid.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="70px"
                  />
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-colors ${
                      isActive
                        ? "bg-[#E8527A]/40"
                        : "bg-black/35 group-hover:bg-black/15"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-md transition-transform group-hover:scale-110 ${
                        isActive
                          ? "bg-[#E8527A] text-white"
                          : "bg-white/85 text-[#3A1F27]"
                      }`}
                    >
                      ▶
                    </div>
                  </div>
                </div>

                {/* Info Text */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className={`text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        isActive
                          ? "bg-[#E8527A] text-white"
                          : "bg-white/15 text-white/70"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    {isActive && (
                      <span className="text-[10px] text-[#FF9EB5] font-semibold">
                        Đang phát
                      </span>
                    )}
                  </div>
                  <h4
                    className={`text-xs sm:text-sm font-semibold truncate ${
                      isActive
                        ? "text-white"
                        : "text-white/85 group-hover:text-white"
                    }`}
                  >
                    {vid.title.replace(/^Thước phim \d+:\s*/, "")}
                  </h4>
                  <p className="text-[11px] text-white/50 truncate mt-0.5">
                    {vid.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Handwritten note at bottom */}
        <p className="font-handwriting text-2xl sm:text-3xl text-[#FF9EB5] pt-4 select-none">
          {content.videoMoment.handwrittenNote}
        </p>
      </div>
    </section>
  );
}
