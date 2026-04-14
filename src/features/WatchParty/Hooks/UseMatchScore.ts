import { useEffect, useState } from "react";
import type { LiveMatch } from "../Types/MatchTypes";

export const useMatch = () => {
  const [match, setMatch] = useState<LiveMatch | null>(null);
  const [loading, setLoading] = useState(true);

  const getMatch = async () => {
    try {
      const response = await fetch("/api/watchparty/live-match");
      const data = (await response.json()) as LiveMatch | null;
      setMatch(data);
    } catch (error) {
      console.error(error);
      setMatch(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMatch();
  }, []);

  return { match, loading };
};