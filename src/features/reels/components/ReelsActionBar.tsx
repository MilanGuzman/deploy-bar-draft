import {Heart, Share } from "lucide-react";

const crimsonColor = "#B5174B";

interface ReelsActionBarProps {
  video_id: string;
  liked: boolean;
  onLike: (videoId: string) => void;
}

const ReelsActionBar = ({ video_id, liked, onLike }: ReelsActionBarProps) => {
  const shareUrl = `${window.location.origin}/reels/${video_id}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-brand-white h-12 w-60 rounded-4xl flex flex-row items-center justify-center gap-x-8 ">
      <button
        className="cursor-pointer h-full w-7 flex items-center justify-center max-h-full"
        onClick={() => onLike(video_id)}
      >
        <Heart color={crimsonColor} fill={liked ? crimsonColor : "none"} />
      </button>
      <button
        className="cursor-pointer h-7 w-7 flex items-center justify-center"
        onClick={() => copyToClipboard()}
      >
        <Share color={crimsonColor} />
      </button>
      {/* <button className="cursor-pointer h-7 w-7 flex items-center justify-center">
        <Ellipsis color={crimsonColor} />
      </button> */}
    </div>
  );
};

export default ReelsActionBar;
