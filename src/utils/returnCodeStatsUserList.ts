import { getCodeStats, languageFix } from ".";
import type { ReturnCodeStatsUserList, UserListType } from "../types";

export const returnCodeStatsUserList = async (userList: UserListType) => {
    const returnArray: ReturnCodeStatsUserList[] = [];

    for (const user of userList) {
        const codeStats = await getCodeStats(user.codestatsUsername);

        let topMachine: ReturnCodeStatsUserList["topMachine"] = null;
        let topLanguages: ReturnCodeStatsUserList["topLanguages"] = null;

        const machineList = Object.entries(codeStats.machines);

        if (machineList.length > 0) {
            if (machineList.length === 1) {
                const TopMachine = machineList[0];

                topMachine = {
                    name: TopMachine[0],
                    xps: TopMachine[1].xps,
                    new_xps: TopMachine[1].new_xps
                }
            }
            if (machineList.length > 1) {
                machineList.sort((a, b) => b[1].xps - a[1].xps);

                const TopMachine = machineList[0];

                topMachine = {
                    name: TopMachine[0],
                    xps: TopMachine[1].xps,
                    new_xps: TopMachine[1].new_xps
                }
            }
        }

        const languageList = Object.entries(codeStats.languages);

        languageList.filter((language) => {
            if (language[0] === "scminput") {
                languageList.splice(languageList.indexOf(language), 1);
            } 
        });

        languageList.filter((language) => {
            if (language[0] === "Ignore") {
                languageList.splice(languageList.indexOf(language), 1);
            }
        });

        languageList.filter((language) => {
            if (language[0] === "github-actions-workflow") {
                languageList.splice(languageList.indexOf(language), 1);
            }
        });

        if (languageList.length > 0) {
            if (languageList.length === 1) {
                const TopLanguage = languageList[0];

                topLanguages = {
                    first: {
                        name: languageFix(TopLanguage[0]),
                        xps: TopLanguage[1].xps,
                        new_xps: TopLanguage[1].new_xps
                    },
                    second: null,
                    third: null
                }
            }
            if (languageList.length > 1) {
                languageList.sort((a, b) => b[1].xps - a[1].xps);

                const TopLanguage = languageList[0];
                const SecondLanguage = languageList[1];
                const ThirdLanguage = languageList[2];

                topLanguages = {
                    first: {
                        name: languageFix(TopLanguage[0]),
                        xps: TopLanguage[1].xps,
                        new_xps: TopLanguage[1].new_xps
                    },
                    second: {
                        name: languageFix(SecondLanguage[0]),
                        xps: SecondLanguage[1].xps,
                        new_xps: SecondLanguage[1].new_xps
                    },
                    third: {
                        name: languageFix(ThirdLanguage[0]),
                        xps: ThirdLanguage[1].xps,
                        new_xps: ThirdLanguage[1].new_xps
                    }
                }
            }
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

    returnArray.sort((a, b) => b.totalXP - a.totalXP);

    return returnArray;
}