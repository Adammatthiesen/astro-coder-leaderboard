import { column, defineTable } from "astro:db";

export const UserList = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        displayName: column.text(),
        codestatsUsername: column.text(),
    }
});

export const CodeStatsDataCache = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        displayName: column.text(),
        codestatsUsername: column.text(),
        totalXP: column.number({ optional: true }),
        topMachine: column.text({ optional: true }),
        topLanguages: column.text({ optional: true }),
    }
});

export const SiteData = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        lastCodeStatsCheck: column.date(),
    }
});