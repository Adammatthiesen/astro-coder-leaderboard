import { CodeStatsDataCache, SiteData, UserList, db, eq } from "astro:db"
import type { codeStatsDataEntry, siteData, userList } from "../../types";


export const getSiteData = async (): Promise<siteData> => {
    // Get the stored site data
    const siteData = await db.select()
            .from(SiteData)
            .where(eq(SiteData.id, 1))
            .get()

    return siteData;
}

export const updateSiteData = async (
    newSiteData: siteData['lastCodeStatsCheck']
) => {
    // Update the stored site data
    return await db.update(SiteData)
            .set({id: 1, lastCodeStatsCheck: newSiteData})
            .where(eq(SiteData.id, 1))
}

export const updateCodeStatsDataEntry = async (
    newCodeStatsData: codeStatsDataEntry
) => {
    // Update the CodeStatsDataCache
    return await db.update(CodeStatsDataCache)
            .set(newCodeStatsData)
            .where(eq(CodeStatsDataCache.id, newCodeStatsData.id))
}

export const createCodeStatsDataCache = async (
    newCodeStatsData: codeStatsDataEntry[]
) => {
    // Create a new entry in the CodeStatsDataCache
    return await db.insert(CodeStatsDataCache)
            .values(newCodeStatsData)
}

export const getCodeStatsData = async (): Promise<codeStatsDataEntry[]> => {
    // Get current stored Cache
    const codeStatsDataCache = await db.select().from(CodeStatsDataCache)
    return Promise.all(codeStatsDataCache);
}

export const getUserList = async (): Promise<userList[]> => {
    // Get the user list
    const dbUserList = await db.select().from(UserList)
    return Promise.all(dbUserList);
}

export const addNewUser = async (
    newUserData: userList
) => {
    const {
        codestatsUsername, 
        displayName, 
        gravatarEmail
    } = newUserData;
    // Add a new user to the user list
    return await db.insert(UserList)
            .values({
                displayName, 
                codestatsUsername, 
                gravatarEmail
            })
            .returning()
            .then(() => {
                console.log(`Added new user: ${displayName}`);
                return 
            })
            .catch((err) => {
                console.error(`Error adding new user: ${err}`);
            })
}