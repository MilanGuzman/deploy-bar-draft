import { useEffect, useState } from "react";
import ReelsActionBar from "./ReelsActionBar";
import ReelCard from "./ReelCard";
import useSession from "../../../shared/hooks/useSession";
import { useReels } from "../hooks/useReels";
import { useParams } from "react-router-dom";
import type { VideoReel } from "../interfaces/VideoReel";
import { fetchSingleVideo } from "../services/fetchSingleVideo";

const ReelsFeed = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

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
    return diff > 0 ? "hiddenRight" : "hiddenLeft";
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

  const { id } = useParams();
  const userId = useSession()?.user.id;
  const { videos, toggleLike, reelWatched } = useReels(userId);
  const [reels, setReels] = useState<VideoReel[]>([]);
  const activeVideo = reels?.[activeIndex];

  useEffect(() => {
    const load = async () => {
      if (id) {
        const sharedVideo = await fetchSingleVideo(userId, id);
        if (!sharedVideo) return;
        const combined = [sharedVideo, ...videos.filter((video) => video.id !== sharedVideo.id)];
        setReels(combined);
      } else {
        setReels(videos);
      }
    };
    load();
  }, [userId, videos, id]);

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="flex bg-brand-navy"
      style={{ outline: "none" }}
    >
      <div className="w-full mt-24 py-8 px-4">
        <h2 className="text-white text-xl font-bold mb-6 px-2">Reels</h2>

        <div className="relative flex items-center justify-center h-155 overflow-hidden py-14">
          {reels.map((reel, i) => {
            const position = getPosition(i);
            const animateState = getAnimateState(i);

            return (
              <ReelCard
                key={reel.id}
                id={reel.id}
                video_url={reel.video_url}
                thumbnail_url={reel.thumbnail_url}
                caption={reel.caption}
                animateState={animateState}
                position={position}
                muted={isMuted}
                onView={() => reelWatched(reel.id)}
                watched={reel.watched}
                changeMute={() => setIsMuted((prev) => !prev)}
                changeActiveIndex={() => setActiveIndex(i)}
              />
            );
          })}
        </div>
        {activeVideo && (
          <div className="flex justify-center mt-4">
            <ReelsActionBar
              onLike={toggleLike}
              video_id={activeVideo.id}
              liked={activeVideo.liked}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReelsFeed;
