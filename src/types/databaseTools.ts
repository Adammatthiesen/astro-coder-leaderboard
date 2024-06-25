
export type siteData = {
    id: number;
    lastCodeStatsCheck: Date;
}

export type userList = {
    id: number;
    displayName: string;
    codestatsUsername: string;
    gravatarEmail: string;
    password?: string;
}

export type codeStatsDataEntry = {
    id: number;
    gravatarURL: string;
    displayName: string;
    codestatsUsername: string;
    totalXP: number;
    topMachine: string;
    topLanguages: unknown;
    codeStatsJoinDate: string|undefined;
}