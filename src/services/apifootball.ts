import type { ApiFixturesResponse } from "../interfaces/interfaces";


const API_KEY = import.meta.env.VITE_API_KEY
const base_url = "https://v3.football.api-sports.io"
 // https://v3.football.api-sports.io/fixtures?season=2024&team=529&from=2024-09-00&to=2025-05-00

async function handleResponse<T>(response: Response, defaultMessage: string): Promise<T> {
  if (!response.ok) {
    throw new Error(defaultMessage);
  }

  return response.json() as Promise<T>;
}

export async function fetchPastResults() : Promise<ApiFixturesResponse>{
    const url = `${base_url}/fixtures?season=2024&team=529&from=2024-09-00&to=2025-05-00`
    const response = await fetch(url, {
        headers: {
            "x-apisports-key" : API_KEY
        }
    });

    return handleResponse<ApiFixturesResponse>(
        response,
        "No se pudieron cargar los datos"
    )

}