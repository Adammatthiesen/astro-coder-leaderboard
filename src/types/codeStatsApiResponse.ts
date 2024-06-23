export type codeStatsApiResponse = {
    dates: Record<string, number>;
    languages: Record<string, { new_xps: number; xps: number }>;
    machines: Record<string, { new_xps: number; xps: number }>;
    new_xp: number;
    total_xp: number;
    user: string;
};

export type codeStatsApiError = {
    error: string;
};

export type CodeStatsApiResponseOrError = codeStatsApiResponse & codeStatsApiError;