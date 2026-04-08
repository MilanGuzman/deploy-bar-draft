import { Ellipsis, Heart, Share } from "lucide-react";
import { useState } from "react";


const crimsonColor = "#B5174B";

const ReelsActionBar = () => {

  const [liked, setLiked] = useState(false)

  return (
    <div className="bg-brand-white h-12 w-60 rounded-4xl flex flex-row items-center justify-center gap-x-8 ">
      <button className="cursor-pointer h-full w-7 flex items-center justify-center max-h-full" onClick={() => setLiked((prev) => !prev )}>
        <Heart color={crimsonColor}  fill={liked ? crimsonColor : "none"} />
      </button>
      <button className="cursor-pointer h-7 w-7 flex items-center justify-center">
        <Share color={crimsonColor} />
      </button>
      <button className="cursor-pointer h-7 w-7 flex items-center justify-center">
        <Ellipsis color={crimsonColor} />
      </button>
    </div>
  );
};

export default ReelsActionBar;