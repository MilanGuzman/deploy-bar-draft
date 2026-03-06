import LastMatchStats from "../components/LastMatchStats";
import { useFixtures } from "../hooks/useFixtures";

const SportsApi = () => {
  const fixtures = useFixtures();

  return (
    <div className="flex flex-col">
      <div className="flex justify-center flex-col items-center">
        <p className="text-3xl font-sans mt-4 mb-2">Partidos anteriores</p>
        {fixtures.map((item, _) => {
          return (
            <LastMatchStats
              key={item.fixture.id}
              date={item.fixture.date}
              league={item.league.name}
              round={item.league.round}
              venue={item.fixture.venue.name}
              home={item.teams.home.name}
              away={item.teams.away.name}
              homeGoals={item.goals.home}
              awayGoals={item.goals.away}
            ></LastMatchStats>
          );
        })}
      </div>
    </div>
  );
};

export default SportsApi;
