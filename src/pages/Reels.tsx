import ReelsFeed from "../features/reels/components/ReelsFeed";
import ReelsNotLogged from "../features/reels/components/ReelsNotLogged";
import useSession from "../shared/hooks/useSession";



const Reels = () => {
  const user = useSession()?.user
  return (
    <>
    { user ? <ReelsFeed/> : <ReelsNotLogged/>

    }
    </>
    
  );
};

export default Reels;