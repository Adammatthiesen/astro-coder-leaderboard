import { defineDb } from "astro:db";
import { SiteData, CodeStatsDataCache, UserList } from "./tables";

export default defineDb({
    tables: {
        SiteData,
        CodeStatsDataCache,
        UserList,
    }
});