import type { ScryptOpts } from "@noble/hashes/scrypt";

export const GravatarDefaultImage: string = "https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon";
export const CodeStatsProfileURL: string = "https://codestats.net/users/";
export const CodeStatsAPIURL: string = "https://codestats.net/api/users/";

export const FontPath: string = "/fonts/inter-latin-ext-700-normal.woff";

export const Title: string = "Astro Community Code::Stats Leaderboard";
export const Description: string = "A Community Leaderboard for the Astro Community that uses code::stats data to rank members of the community based on how much they code! (This is 100% for fun!)";

export const ScryptOptions: ScryptOpts = { 
    N: 16384, 
    r: 8, 
    p: 1, 
    dkLen: 32 
};

export const LocalDateStringOptions: Intl.DateTimeFormatOptions = { 
    minute: "numeric", 
    hour: "numeric", 
    day: "numeric", 
    month: "long", 
    year: "numeric", 
    timeZone: "UTC" 
};