import { column, defineDb, defineTable } from "astro:db";

const UserList = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        displayName: column.text(),
        codestatsUsername: column.text(),
        gravatarEmail: column.text({ optional: true }),
        password: column.text({ optional: true }),
    }
});

const CodeStatsDataCache = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        gravatarURL: column.text({ optional: true }),
        displayName: column.text(),
        codestatsUsername: column.text(),
        totalXP: column.number({ optional: true }),
        topMachine: column.text({ optional: true }),
        topLanguages: column.json({ optional: true }),
        codeStatsJoinDate: column.text({ optional: true }),
    }
});

const SiteData = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        lastCodeStatsCheck: column.date(),
    }
});

export default defineDb({
    tables: {
        SiteData,
        CodeStatsDataCache,
        UserList,
    },
});