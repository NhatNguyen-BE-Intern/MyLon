import { content } from "@/lib/content";
import { SmoothScroll } from "@/components/SmoothScroll";
import { AudioProvider } from "@/components/AudioProvider";
import { Envelope } from "@/components/Envelope";
import { Hero } from "@/components/Hero";
import { Chapter } from "@/components/Chapter";
import { VideoCinema } from "@/components/VideoCinema";
import { NoteWall } from "@/components/NoteWall";
import { FinalSurprise } from "@/components/FinalSurprise";

export default function Home() {
  return (
    <SmoothScroll>
      <AudioProvider>
        {/* Step 0: Opening envelope interactive screen */}
        <Envelope />

        {/* Scrapbook Container */}
        <div className="relative min-h-screen bg-[#FFF3F0] paper-grain selection:bg-[#FFC9D9]">
          {/* Step 1: Hero Section */}
          <Hero />

          {/* Step 2: 4 Chapters */}
          <main className="relative z-10">
            {content.chapters.map((ch, idx) => (
              <Chapter key={ch.id} chapter={ch} index={idx} />
            ))}

            {/* Step 3: Cinema Video & Wishes NoteWall */}
            <VideoCinema />
            <NoteWall />
          </main>

          {/* Step 4: Final Surprise Ending */}
          <FinalSurprise />
        </div>
      </AudioProvider>
    </SmoothScroll>
  );
}
