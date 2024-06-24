import { db, UserList, SiteData } from "astro:db";

export default async function() {
    await db.insert(UserList).values([
        { id: 1, displayName: "Adam Matthiesen", codestatsUsername: "adamm2047", gravatarEmail: "adam@matthiesen.xyz" },
        { id: 2, displayName: "Bryceguy", codestatsUsername: "Bryce", gravatarEmail: "brycetrussell@gmail.com" },
        { id: 3, displayName: "Jumper", codestatsUsername: "Jumper" },
        { id: 4, displayName: "Dreyfus", codestatsUsername: "dreyfus" }
    ]);

    await db.insert(SiteData).values([
        { id: 1, lastCodeStatsCheck: new Date("2022-10-13") }
    ]);
};