import { db, UserList, SiteData } from "astro:db";

export default async function() {
    await db.insert(UserList).values([
        { displayName: "Adam Matthiesen", codestatsUsername: "adamm2047", gravatarEmail: "adam@matthiesen.xyz" },
        { displayName: "Bryceguy", codestatsUsername: "Bryce", gravatarEmail: "brycetrussell@gmail.com" },
        { displayName: "Jumper", codestatsUsername: "Jumper" },
        { displayName: "Dreyfus", codestatsUsername: "dreyfus" }
    ]);

    await db.insert(SiteData).values([
        { id: 1, lastCodeStatsCheck: new Date("2022-10-13") }
    ]);
};