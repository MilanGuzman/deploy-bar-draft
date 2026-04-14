export type LiveMatch = {
  fixture: {
    date: string;
    status: {
      elapsed: number | null;
    };
    venue: {
      name: string | null;
      city: string | null;
    };
  };
  league: {
    name: string;
    round: string;
  };
  teams: {
    home: {
      name: string;
    };
    away: {
      name: string;
    };
  };
  goals: {
    home: number | null;
    away: number | null;
  };
};