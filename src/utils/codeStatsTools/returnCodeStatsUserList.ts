import type { ReturnCodeStatsUserList, UserListType } from "../../types";
import { languageFilter } from "../langTools/LanguageFilter";
import { languageFix } from "../langTools/languageFix";
import { createGravatar } from "../userTools/createGravatarURL";
import { getCodeStats } from "./getCodeStats";

export const returnCodeStatsUserList = async (userList: UserListType) => {
    const returnArray: ReturnCodeStatsUserList[] = [];

    for (const user of userList) {
        const codeStats = await getCodeStats(user.codestatsUsername);

        const DateList = Object.keys(codeStats.dates);

        const datesSortedFromOldestToNewest = DateList.sort((a, b) => {
            return new Date(a).getTime() - new Date(b).getTime();
        });

        const FirstProgrammingDate = datesSortedFromOldestToNewest[0];

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
                    first: {
                        name: languageFix(languageList[0][0]),
                        xps: languageList[0][1].xps
                    },
                }
            }
            if (languageList.length === 2) {
                languageList.sort((a, b) => b[1].xps - a[1].xps);

                topLanguages = {
                    first: {
                        name: languageFix(languageList[0][0]),
                        xps: languageList[0][1].xps
                    },
                    second: {
                        name: languageFix(languageList[1][0]),
                        xps: languageList[1][1].xps
                    },
                }
            }
            if (languageList.length > 2) {
                languageList.sort((a, b) => b[1].xps - a[1].xps);

                topLanguages = {
                    first: {
                        name: languageFix(languageList[0][0]),
                        xps: languageList[0][1].xps
                    },
                    second: {
                        name: languageFix(languageList[1][0]),
                        xps: languageList[1][1].xps
                    },
                    third: {
                        name: languageFix(languageList[2][0]),
                        xps: languageList[2][1].xps
                    },
                }
            }
        }

        let gravatarURL = null;
        if (user.gravatarEmail) {
            gravatarURL = await createGravatar(user.gravatarEmail);
        }

        let totalXP = 0;
        if (codeStats.total_xp) {
            totalXP = codeStats.total_xp;
        }

        returnArray.push({
            id: user.id,
            displayName: user.displayName,
            codestatsUsername: user.codestatsUsername,
            codeStatsJoinDate: FirstProgrammingDate,
            gravatarURL,
            totalXP,
            topMachine,
            topLanguages,
        });
    }

    returnArray;

    return returnArray;
}