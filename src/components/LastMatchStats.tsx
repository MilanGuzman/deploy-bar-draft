
interface LastMatchStatsProps{
  date: string;
  league: string;
  round: string;
  venue: string;
  home: string;
  away: string;
  awayGoals: number;
  homeGoals: number;
}

const LastMatchStats = ({date, league, round, venue, home, away, awayGoals, homeGoals} : LastMatchStatsProps) => {
  return (
    <div className="w-full bg-brand-white rounded-2xl h-20 max-w-10/12 flex flex-row items-center gap-x-4">
      <p>{date}</p>
      <p>{league}</p>
      <p>{round}</p>
      <p>{venue}</p>
      <div className="flex flex-row gap-x-8">
        <p>{home}</p>
        <p>{homeGoals}</p>
        <p>{awayGoals}</p>
        <p>{away}</p>
      </div>
    </div>
  );
};

export default LastMatchStats;
