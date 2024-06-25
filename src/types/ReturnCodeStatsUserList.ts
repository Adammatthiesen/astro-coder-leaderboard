type topLanguagesType = {
    first?: {
        name: string;
        xps: number;
    };
    second?: {
        name: string;
        xps: number;
    };
    third?: {
        name: string;
        xps: number;
    };
}

export type ReturnCodeStatsUserList = {
    id: number;
    gravatarURL: string|null;
    displayName: string;
    codestatsUsername: string;
    codeStatsJoinDate: string|undefined;
    totalXP: number;
    topMachine: string|null;
    topLanguages: topLanguagesType;
}