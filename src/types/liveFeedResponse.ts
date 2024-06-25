
export type liveFeedJsonResponse = {
    SiteURL: string;
    SiteName: string;
    SiteDescription: string;
    LastCodeStatsCheck: string;
    UserList: Array<{
        DisplayName: string;
        CodeStatsUsername: string;
        CodeStatsFirstCode: string|undefined;
        Level: number;
        TotalXP: number;
        TopMachine: string|null;
        TopLanages: Object|null;
    }>;
}