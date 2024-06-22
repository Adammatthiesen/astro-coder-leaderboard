export interface Date {
    [date: string]: number;
}

export interface Language {
    xps: number;
    new_xps: number;
};

export interface Machine {
    [machine: string]: {
        xps: number;
        new_xps: number;
    
    };
}

export type ReturnCodeStatsUserList = {
    id: number;
    displayName: string;
    codestatsUsername: string;
    totalXP: number|null;
    topMachine: {
        name: string;
        new_xps: number;
        xps: number;
    }|null;
    topLanguages: {
        first: {
            name: string;
            new_xps: number;
            xps: number;
        };
        second: {
            name: string;
            new_xps: number;
            xps: number;
        };
        third: {
            name: string;
            new_xps: number;
            xps: number;
        };
    }|null;
}

export type codeStatsApiResponse = {
    dates: Record<string, number>;
    languages: Record<string, { new_xps: number; xps: number }>;
    machines: Record<string, { new_xps: number; xps: number }>;
    new_xp: number;
    total_xp: number;
    user: string;
};