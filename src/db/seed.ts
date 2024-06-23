import { db, UserList, SiteData } from "astro:db";

export default async function seed() {
    await db.insert(UserList).values([
        { id: 0, displayName: "Adam Matthiesen", codestatsUsername: "adamm2047", gravatarEmail: "adam@matthiesen.xyz" },
        { id: 1, displayName: "Bryceguy", codestatsUsername: "Bryce", gravatarEmail: "brycetrussell@gmail.com" },
        { id: 2, displayName: "Jumper", codestatsUsername: "Jumper" },
        { id: 3, displayName: "Dreyfus", codestatsUsername: "dreyfus" }
    ]);

    await db.insert(SiteData).values([
        { id: 1, lastCodeStatsCheck: new Date() }
    ]);
};