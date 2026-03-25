// ReelsSection.tsx
import { useState } from "react";
import reels1 from "@/data/img/reels1.jpg";
import reels2 from "@/data/img/reels2.jpg";
import reels3 from "@/data/img/reels3.jpg";
import reels4 from "@/data/img/reels4.jpg";


const reels = [
  { id: 1, title: "El Barcelona gana contra Levante 3-1", thumbnail: reels1 },
  { id: 2, title: "Lewandowski hat-trick vs Villarreal", thumbnail: reels2 },
  { id: 3, title: "Highlights Clásico 2025", thumbnail: reels3 },
  { id: 4, title: "Entrenamiento Camp Nou", thumbnail: reels4 },
  { id: 5, title: "Gavi vuelve al equipo", thumbnail: reels1 },
];

const ReelsFeed = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const prev = reels[activeIndex - 1] ?? null;
  const current = reels[activeIndex];
  const next = reels[activeIndex + 1] ?? null;

  return (
    <div className="flex bg-brand-navy">
      <div className="w-full mt-24 py-8 px-4">
        <h2 className="text-white text-xl font-bold mb-6 px-2">Reels</h2>

        {/* 3-card row */}
        <div className="flex items-center justify-center gap-3">
          {/* LEFT (prev) — faded, smaller, partially cut */}
          <div
            onClick={() => activeIndex > 0 && setActiveIndex(activeIndex - 1)}
            className={`
            shrink-0 relative rounded-xl overflow-hidden cursor-pointer
            transition-all duration-300
            w-56 h-72 opacity-40 scale-95
            ${!prev ? "invisible" : ""}
          `}
          >
            {prev && (
              <>
                <img
                  src={prev.thumbnail}
                  alt={prev.title}
                  className="w-full h-full object-cover"
                />
                {/* Right-side fade so it bleeds into center */}
                <div className="absolute inset-0 bg-linear-to-l from-black/80 to-transparent" />
              </>
            )}
          </div>

          {/* CENTER (active) — full size, no fade */}
          <div className="shrink-0 relative rounded-2xl overflow-hidden w-96 h-[620px] shadow-2xl shadow-black z-10 transition-all duration-300">
            <img
              src={current.thumbnail}
              alt={current.title}
              className="w-full h-full object-cover"
            />

            {/* Bottom gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent" />

            {/* Title + Actions */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white text-sm font-semibold mb-3 leading-snug">
                {current.title}
              </p>
            </div>
          </div>

          {/* RIGHT (next) — faded, smaller, partially cut */}
          <div
            onClick={() =>
              activeIndex < reels.length - 1 && setActiveIndex(activeIndex + 1)
            }
            className={`
            shrink-0 relative rounded-xl overflow-hidden cursor-pointer
            transition-all duration-300
            w-36 h-64 opacity-40 scale-95
            ${!next ? "invisible" : ""}
          `}
          >
            {next && (
              <>
                <img
                  src={next.thumbnail}
                  alt={next.title}
                  className="w-full h-full object-cover"
                />
                {/* Left-side fade so it bleeds into center */}
                <div className="absolute inset-0 bg-linear-to-r from-black/80 to-transparent" />
              </>
            )}
          </div>
        </div>

        {/* Dot indicators
      <div className="flex justify-center gap-2 mt-6">
        {reels.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-4 h-2 bg-white" : "w-2 h-2 bg-gray-600"
            }`}
          />
        ))}
      </div> */}
      </div>
    </div>
  );
}

export default ReelsFeed;
