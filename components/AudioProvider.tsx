"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";

interface AudioContextType {
  isUnlocked: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  unlockAndPlay: () => void;
  toggleMute: () => void;
  pauseBgm: () => void;
  resumeBgm: () => void;
  fadeBgm: (targetVolume: number, durationMs?: number) => void;
}

const AudioContext = createContext<AudioContextType>({
  isUnlocked: false,
  isPlaying: false,
  isMuted: false,
  unlockAndPlay: () => {},
  toggleMute: () => {},
  pauseBgm: () => {},
  resumeBgm: () => {},
  fadeBgm: () => {},
});

export const useAudio = () => useContext(AudioContext);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const isPlayingRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isMutedRef = useRef(false);

  // Sweet gentle lullaby / acoustic melody chords (Cmaj7, Am9, Fmaj7, G6)
  const notes = [
    // Cmaj7
    [261.63, 329.63, 392.0, 493.88],
    // Am9
    [220.0, 261.63, 329.63, 392.0],
    // Fmaj7
    [174.61, 261.63, 329.63, 440.0],
    // G6
    [196.0, 246.94, 293.66, 392.0],
  ];

  const playPluck = (freq: number, time: number, gainNode: GainNode, ctx: AudioContext) => {
    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();

    // Warm soft sound (sine mixed with triangle)
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, time);

    // Envelope
    noteGain.gain.setValueAtTime(0.0001, time);
    noteGain.gain.exponentialRampToValueAtTime(0.04, time + 0.05);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, time + 1.8);

    osc.connect(noteGain);
    noteGain.connect(gainNode);

    osc.start(time);
    osc.stop(time + 2.0);
  };

  const startMusicLoop = () => {
    if (!audioCtxRef.current || !masterGainRef.current) return;
    const ctx = audioCtxRef.current;
    const gainNode = masterGainRef.current;

    let step = 0;
    const loop = () => {
      if (!isPlayingRef.current || ctx.state === "suspended") return;

      const chordIndex = Math.floor(step / 4) % notes.length;
      const chord = notes[chordIndex];
      const noteIndex = step % chord.length;
      const freq = chord[noteIndex];

      const now = ctx.currentTime;
      playPluck(freq, now, gainNode, ctx);

      // Add a gentle harmony note on every 2nd step
      if (step % 2 === 0) {
        const harmonyFreq = chord[(noteIndex + 2) % chord.length] * 0.5;
        playPluck(harmonyFreq, now + 0.02, gainNode, ctx);
      }

      step++;
      timerRef.current = setTimeout(loop, 480);
    };

    loop();
  };

  const unlockAndPlay = () => {
    try {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        const ctx = new AudioCtxClass();
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.3, ctx.currentTime);
        masterGain.connect(ctx.destination);

        audioCtxRef.current = ctx;
        masterGainRef.current = masterGain;
      }

      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      setIsUnlocked(true);
      setIsPlaying(true);
      isPlayingRef.current = true;
      startMusicLoop();
    } catch (e) {
      console.warn("Audio Context init error:", e);
    }
  };

  const fadeBgm = (targetVolume: number, durationMs: number = 500) => {
    if (!audioCtxRef.current || !masterGainRef.current) return;
    const ctx = audioCtxRef.current;
    const gain = masterGainRef.current.gain;
    const now = ctx.currentTime;
    const safeTarget = isMutedRef.current ? 0 : Math.max(0.0001, targetVolume);

    gain.cancelScheduledValues(now);
    gain.setValueAtTime(gain.value, now);
    gain.exponentialRampToValueAtTime(safeTarget, now + durationMs / 1000);
  };

  const pauseBgm = () => {
    fadeBgm(0.0001, 300);
    setTimeout(() => {
      isPlayingRef.current = false;
      setIsPlaying(false);
      if (timerRef.current) clearTimeout(timerRef.current);
    }, 320);
  };

  const resumeBgm = () => {
    if (!isUnlocked) return;
    isPlayingRef.current = true;
    setIsPlaying(true);
    fadeBgm(0.3, 400);
    startMusicLoop();
  };

  const toggleMute = () => {
    if (!masterGainRef.current || !audioCtxRef.current) return;
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    isMutedRef.current = newMuted;

    if (newMuted) {
      fadeBgm(0.0001, 200);
    } else {
      fadeBgm(0.3, 300);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <AudioContext.Provider
      value={{
        isUnlocked,
        isPlaying,
        isMuted,
        unlockAndPlay,
        toggleMute,
        pauseBgm,
        resumeBgm,
        fadeBgm,
      }}
    >
      {children}

      {/* Floating Audio Control Pill (shown after envelope is opened) */}
      {isUnlocked && (
        <aside
          role="region"
          aria-label="Điều khiển âm thanh"
          className="fixed top-4 right-4 z-40"
        >
          <button
            onClick={toggleMute}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF3F0]/90 border border-[#FF9EB5]/60 text-[#3A1F27] text-xs font-medium shadow-md hover:bg-white transition-all backdrop-blur-sm cursor-pointer group"
            title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
          >
            <span className="relative flex h-2 w-2">
              {!isMuted && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8527A] opacity-75" />
              )}
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isMuted ? "bg-gray-400" : "bg-[#E8527A]"
                }`}
              />
            </span>
            <span className="font-handwriting text-base text-[#E8527A] group-hover:scale-105 transition-transform">
              {isMuted ? "Âm nhạc: Đã tắt" : "Giai điệu tặng Mỹ Vũ ♫"}
            </span>
          </button>
        </aside>
      )}
    </AudioContext.Provider>
  );
}
