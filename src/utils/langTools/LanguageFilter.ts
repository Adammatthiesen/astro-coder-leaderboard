
export function languageFilter(
    languageList: Record<string, { new_xps: number; xps: number; }>) {

    const LanguageList = Object.entries(languageList);

    LanguageList.filter((language) => {
        if (language[0] === "scminput") {
            LanguageList.splice(LanguageList.indexOf(language), 1);
        } 
    });

    LanguageList.filter((language) => {
        if (language[0] === "Ignore") {
            LanguageList.splice(LanguageList.indexOf(language), 1);
        }
    });

    LanguageList.filter((language) => {
        if (language[0] === "github-actions-workflow") {
            LanguageList.splice(LanguageList.indexOf(language), 1);
        }
    });

    return LanguageList;
}