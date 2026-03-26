import { Ellipsis, Heart, Share } from "lucide-react";

const ReelsActionBar = () => {
  return (
    <div className="bg-brand-white h-12 w-60 rounded-4xl flex flex-row items-center justify-center gap-x-8 ">
      <button className="cursor-pointer h-full w-7 flex items-center justify-center max-h-full">
        <Heart color="#B5174B"  className=""/>
      </button>
      <button className="cursor-pointer h-7 w-7 flex items-center justify-center">
        <Share color="#B5174B" />
      </button>
      <button className="cursor-pointer h-7 w-7 flex items-center justify-center">
        <Ellipsis color="#B5174B" />
      </button>
    </div>
  );
};

export default ReelsActionBar;