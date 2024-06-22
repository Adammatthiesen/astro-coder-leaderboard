export type ReturnCodeStatsUserList = {
    id: number;
    displayName: string;
    codestatsUsername: string;
    gravaterURL: string|null;
    totalXP: number;
    topMachine: string|null;
    topLanguages: Object;
}