import type { codeStatsApiResponse } from "../types";

export * from "./getLevel";

type UserListType = {
    id: number;
    displayName: string;
    codestatsUsername: string;
}[];

type ReturnCodeStatsUserList = {
    id: number;
    displayName: string;
    codestatsUsername: string;
    totalXP: number|null;
    topMachine: string|null;
    topLanguages: string[]|null;
}

const UserList: UserListType = [
    { id: 1, displayName: "Adam Matthiesen", codestatsUsername: "adamm2047"}
];

const getCodeStats = async (username: string): Promise<codeStatsApiResponse> => {
    const data = await fetch(`https://codestats.net/api/users/${username}`);

    if (!data.json()) {
        return {
            total_xp: null,
            machines: [],
            languages: [],
            dates: [],
            new_xp: 0,
            user: username
        };
    }
    const json: codeStatsApiResponse = await data.json();
    return json;
}

export const returnCodeStatsUserList = async (userList: UserListType) => {
    const returnArray: ReturnCodeStatsUserList[] = [];

    for (const user of userList) {
        const codeStats: codeStatsApiResponse = await getCodeStats(user.codestatsUsername);

        let topMachine = null;
        let topLanguages = null;

        if (codeStats.machines.length === 1) {
            topMachine = codeStats.machines[0];
        }

        if (codeStats.machines.length > 1) {
            codeStats.machines.sort((a, b) => b.xps - a.xps);
            topMachine = codeStats.machines[0];
        }

        if (codeStats.languages.length > 0) {
            codeStats.languages.sort((a, b) => b.xps - a.xps);
            topLanguages = codeStats.languages.slice(0, 3).map(language => Object.keys(language)[0]);
        }

        returnArray.push({
            id: user.id,
            displayName: user.displayName,
            codestatsUsername: user.codestatsUsername,
            totalXP: codeStats.total_xp,
            topMachine,
            topLanguages
        });
    }

    return returnArray;
}