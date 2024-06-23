import type { codeStatsApiResponse, CodeStatsApiResponseOrError } from "../../types";

export const getCodeStats = async (username: string): Promise<codeStatsApiResponse> => {
    const data = await fetch(`https://codestats.net/api/users/${username}`);
    const json: CodeStatsApiResponseOrError = await data.json();
    if (json.error) {
        return {} as codeStatsApiResponse;
    }
    return json as codeStatsApiResponse;
}