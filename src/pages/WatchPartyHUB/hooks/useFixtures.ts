// hooks/useFixtures.ts
import { useState, useEffect } from "react";
// 1. Importa la interfaz oficial aquí
import type { Fixture } from "../interfaces/index.interfaces"; 

const PROXY = "https://fcb-proxy.onrender.com";

interface RawFixture {
  fixture_id: string;
  category: string;
  datetime: string;
  home_team: string;
  away_team: string;
  competition: string;
  venue?: string; 
  status?: string;
}

export function useFixtures() {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFixtures = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${PROXY}/api/scraper/next-matches`);
        if (!response.ok) throw new Error("Error al cargar partidos");

        const data = await response.json();

        const allRaw: RawFixture[] = [
          ...(data.varonil ?? []),
          ...(data.femenil ?? []),
        ];

        const mapped: Fixture[] = allRaw.map((f) => ({
          fixture_id: f.fixture_id,
          category: f.category as "varonil" | "femenil",
          date: f.datetime,
          homeTeam: f.home_team,
          awayTeam: f.away_team,
          competition: f.competition,
          venue: f.venue ?? "Estadio no definido", 
          status: f.status ?? "scheduled",
        }));

        setFixtures(mapped);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setIsLoading(false);
      }
    };

    loadFixtures();
  }, []);

  return { fixtures, isLoading, error };
}