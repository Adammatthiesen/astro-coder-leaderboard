import { defineDb } from "astro:db";
import { SiteData, CodeStats, UserList } from "./tables";

export default defineDb({
    tables: {
        SiteData,
        CodeStats,
        UserList,
    }
});