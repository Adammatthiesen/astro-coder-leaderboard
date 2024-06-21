import { column, defineTable } from "astro:db";

export const UserList = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        displayName: column.text(),
        codestatsUsername: column.text({ references: () => CodeStats.columns.username }),
    }
});

export const CodeStats = defineTable({
    columns: {
        username: column.text({ primaryKey: true }),
        totalXP: column.number(),
        data: column.json(),
    }
});

export const SiteData = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        lastCodeStatsCheck: column.date(),
    }
});