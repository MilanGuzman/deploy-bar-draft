import LastMatchStats from "../shared/components/LastMatchStats";
import { useFixtures } from "../shared/hooks/useFixtures";


const SportsApi = () => {
  const fixtures = useFixtures();

  return (
    <div className="mt-24">
      <div className="flex flex-col">
        <div className="flex justify-center flex-col items-center">
          <p className="text-3xl font-sans mt-4 mb-2">Partidos anteriores</p>
          <div className="flex flex-col gap-y-4 ">
            {fixtures.map((item, _) => {
              return (
                <LastMatchStats
                  key={item.fixture.id}
                  fixtureId={item.fixture.id}
                  date={item.fixture.date}
                  league={item.league}
                  venue={item.fixture.venue}
                  goals={item.goals}
                  teams={item.teams}
                ></LastMatchStats>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportsApi;
