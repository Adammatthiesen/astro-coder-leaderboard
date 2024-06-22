import type { codeStatsApiResponse } from "../types";

export const getCodeStats = async (username: string): Promise<codeStatsApiResponse> => {
    const data = await fetch(`https://codestats.net/api/users/${username}`);
    const json = await data.json();
    return json;
}