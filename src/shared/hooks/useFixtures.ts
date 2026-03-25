import { useEffect, useState } from "react";
import type { Fixture } from "../interfaces/interfaces";
import { fetchPastResults } from "../services/apifootball";


export function useFixtures() {
    const [fixtures, setFixtures] = useState<Fixture[]>([]);

    useEffect(() => {
        async function loadFixtures(){
            try{
                const data = await fetchPastResults();
                setFixtures(data.response);
            }
            catch(error){
                console.log(error)
            }
        }

        void loadFixtures();
    }, []);

    return fixtures;
}