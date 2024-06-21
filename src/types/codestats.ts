interface Date {
    [date: string]: number;
}

interface Language {
    xps: number;
    new_xps: number;
};

interface Machine {
    xps: number;
    new_xps: number;
}

export interface codeStatsApiResponse {
    dates: Date[];
    languages: Language[];
    machines: Machine[];
    new_xp: number;
    total_xp: number;
    user: string;
}