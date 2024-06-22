import { getCodeStats, languageFix } from ".";
import type { ReturnCodeStatsUserList, UserListType } from "../types";
import { languageFilter } from "./LanguageFilter";
import { createGravatar } from "./createGravatarURL";

export const returnCodeStatsUserList = async (userList: UserListType) => {
    const returnArray: ReturnCodeStatsUserList[] = [];

    for (const user of userList) {
        const codeStats = await getCodeStats(user.codestatsUsername);

        let topMachine: ReturnCodeStatsUserList["topMachine"] = null;
        let topLanguages: ReturnCodeStatsUserList["topLanguages"] = {};

        const machineList = Object.entries(codeStats.machines);

        if (machineList.length > 0) {
            if (machineList.length === 1) {
                const TopMachine = machineList[0];

                topMachine = TopMachine[0]
            }
            if (machineList.length > 1) {
                machineList.sort((a, b) => b[1].xps - a[1].xps);

                const TopMachine = machineList[0];

                topMachine = TopMachine[0]
            }
        }

        const languageList = languageFilter(codeStats.languages);

        if (languageList.length > 0) {
            if (languageList.length === 1) {
                topLanguages = {
                    first: languageFix(languageList[0][0]),
                }
            }
            if (languageList.length === 2) {
                languageList.sort((a, b) => b[1].xps - a[1].xps);

                topLanguages = {
                    first: languageFix(languageList[0][0]),
                    second: languageFix(languageList[1][0]),
                }
            }
            if (languageList.length > 2) {
                languageList.sort((a, b) => b[1].xps - a[1].xps);

                topLanguages = {
                    first: languageFix(languageList[0][0]),
                    second: languageFix(languageList[1][0]),
                    third: languageFix(languageList[2][0]),
                }
            }
        }

        let gravaterURL = null;
        if (user.gravatarEmail) {
            gravaterURL = await createGravatar(user.gravatarEmail);
        }

        let totalXP = 0;
        if (codeStats.total_xp) {
            totalXP = codeStats.total_xp;
        }

        returnArray.push({
            id: user.id,
            displayName: user.displayName,
            codestatsUsername: user.codestatsUsername,
            gravaterURL,
            totalXP,
            topMachine,
            topLanguages
        });
    }

    returnArray.sort((a, b) => b.totalXP - a.totalXP);

    return returnArray;
}