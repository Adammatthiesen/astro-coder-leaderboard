import type { codeStatsApiResponse } from "../../types";

type JsonError = {
    error: string;
};

type CodeStatsOrError = codeStatsApiResponse & JsonError;

export const getCodeStats = async (username: string): Promise<codeStatsApiResponse> => {
    const data = await fetch(`https://codestats.net/api/users/${username}`);
    const json: CodeStatsOrError = await data.json();
    if (json.error) {
        return {} as codeStatsApiResponse;
    }
    return json as codeStatsApiResponse;
}