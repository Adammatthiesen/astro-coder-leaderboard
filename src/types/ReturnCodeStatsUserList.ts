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