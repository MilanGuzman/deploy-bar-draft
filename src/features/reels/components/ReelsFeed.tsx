// ReelsSection.tsx
import { use, useEffect, useState } from "react";
import reels1 from "@/data/img/reels1.jpg";
import reels2 from "@/data/img/reels2.jpg";
import reels3 from "@/data/img/reels3.jpg";
import reels4 from "@/data/img/reels4.jpg";
import ReelsActionBar from "./ReelsActionBar";
import { motion, type Transition } from "motion/react";
import { fetchReels } from "../services/supabase";
import type { VideoReel } from "../interfaces/VideoReel";
import { Play, Volume2, VolumeX } from "lucide-react";

const reels = [
  { id: 1, title: "El Barcelona gana contra Levante 3-1", thumbnail: reels1 },
  { id: 2, title: "Lewandowski hat-trick vs Villarreal", thumbnail: reels2 },
  { id: 3, title: "Highlights Clásico 2025", thumbnail: reels3 },
  { id: 4, title: "Entrenamiento Camp Nou", thumbnail: reels4 },
];

const spring: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 22,
  mass: 0.8,
};

const ReelsFeed = () => {
  const variants = {
    center: {
      scale: 1,
      x: 0,
      opacity: 1,
      zIndex: 3,
      width: 384, // w-96
      height: 620,
      rotate: 0,
    },
    left: {
      scale: 1,
      x: -280,
      opacity: 0.45,
      zIndex: 2,
      width: 224, // w-56
      height: 288, // h-72
      rotate: -5,
    },
    right: {
      scale: 1,
      x: 280,
      opacity: 0.45,
      zIndex: 2,
      width: 224,
      height: 288,
      rotate: 5,
    },
    // Hidden cards are placed offscreen left or right so they slide IN,
    // not pop in from the center
    hiddenLeft: {
      scale: 0.8,
      x: -560,
      opacity: 0,
      zIndex: 0,
      width: 224,
      height: 288,
      rotate: -5,
    },
    hiddenRight: {
      scale: 0.8,
      x: 560,
      opacity: 0,
      zIndex: 0,
      width: 224,
      height: 288,
      rotate: 5,
    },
  };
  // right now returns promise

  const [activeIndex, setActiveIndex] = useState(0);
  const [muted, setMuted] = useState(true);

  const getPosition = (i: number) => {
    const diff = i - activeIndex;
    if (diff === 0) return "center";
    if (diff === 1) return "right";
    if (diff === -1) return "left";
    return "hidden";
  };

  const getAnimateState = (i: number) => {
    const position = getPosition(i);
    if (position !== "hidden") return position;
    const diff = i - activeIndex;
    return diff > activeIndex ? "hiddenRight" : "hiddenLeft";
  };

  type Key = "ArrowLeft" | "ArrowRight";
  const keyHandlers: Record<Key, () => void> = {
    ArrowLeft: () => setActiveIndex((i) => Math.max(i - 1, 0)),
    ArrowRight: () => setActiveIndex((i) => Math.min(i + 1, reels.length - 1)),
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const key = e.key as Key;
    if (keyHandlers[key]) {
      e.preventDefault();
      keyHandlers[key]();
    }
  };

  const [videos, setVideos] = useState<VideoReel[]>([]);

  useEffect(() => {
    async function fetchVids() {
      const { data, error } = await fetchReels();

      if (error) {
        console.log(error);
        return;
      }
      if (data) {
        setVideos(data);
      }
    }
    fetchVids();
  }, []);

  useEffect(() => {
    console.log(videos);
  }, [videos]);

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="flex bg-brand-navy"
      style={{ outline: "none" }}
    >
      <div className="w-full mt-24 py-8 px-4">
        <h2 className="text-white text-xl font-bold mb-6 px-2">Reels</h2>

        {/* Carousel */}
        <div className="relative flex items-center justify-center h-155 overflow-hidden py-14">
          {videos.map((reel, i) => {
            const position = getPosition(i);
            const animateState = getAnimateState(i);

            return (
              
              <motion.div
                key={reel.id}
                variants={variants}
                animate={animateState}
                transition={spring}
                className="absolute overflow-hidden rounded-2xl shadow-2xl shadow-black group"
                onClick={() => setActiveIndex(i)}
              >
                {/* TODO: make whole motion div clickable as the pause button*/}
                <img
                  src={reel.thumbnail_url}
                  alt={reel.caption}
                  className="w-full h-full object-cover"
                />
                <button className="absolute top-6 left-6 cursor-pointer" onClick={() => setMuted((prev) => !prev)}>
                  {
                    muted ?
                    <VolumeX color="white" fill="white" className="w-8 h-8" />
                    :
                    <Volume2 color="white" fill="white" className="w-8 h-8" />
                    
                  }
                </button>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-300 ">
                  <Play className="w-8 h-8 text-white fill-white" />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent pointer-events-none" />
                  
                {/* Title — fades in only for center */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-4"
                  animate={{ opacity: position === "center" ? 1 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="text-white text-sm font-semibold mb-3">
                    {reel.caption}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Action bar animates separately below the carousel */}
        <motion.div className="flex justify-center mt-4" layout>
          <ReelsActionBar />
        </motion.div>
      </div>
    </div>
  );
};

export default ReelsFeed;
