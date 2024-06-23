import { 
    getCodeStatsData, getSiteData, getUserList, 
    isNewDateMoreThan24HoursLater, returnCodeStatsUserList, 
    createCodeStatsDataCache, updateCodeStatsDataEntry, 
    updateSiteData } from "../index";
import type { ReturnCodeStatsUserList } from "../../types";

export async function getCodeStatsDataCache( 
    currentDate: Date 
): Promise<ReturnCodeStatsUserList[]> {

    // Get the stored site data
    const siteData = await getSiteData();

    // Get current stored Cache
    const codeStatsDataCache = await getCodeStatsData();

    // Get the user list
    const dbUserList = await getUserList();

    // Check if the lastCodeStatsCheck is more than 24 hours later
    if (codeStatsDataCache.length === 0) {
        // If the CodeStatsDataCache is empty, Update the CodeStatsDataCache
        const newCodeStatsData = await returnCodeStatsUserList(dbUserList)
    
        // Update the CodeStatsDataCache
        await createCodeStatsDataCache(newCodeStatsData)
    
        // Update the lastCodeStatsCheck
        await updateSiteData(currentDate)

        // Get the new CodeStatsDataCache
        const NEW_codeStatsDataCache = await getCodeStatsData();

        // Return the new CodeStatsDataCache
        return NEW_codeStatsDataCache.sort((a, b) => b.totalXP - a.totalXP)
    } else 
    
    // If the date is more than 24 hours later, Update the CodeStatsDataCache
    if ( isNewDateMoreThan24HoursLater( siteData.lastCodeStatsCheck, currentDate ) || codeStatsDataCache.length !== 0 ) {
        // get the new CodeStatsData
        const newCodeStatsData = await returnCodeStatsUserList(dbUserList)

        // Update the CodeStatsDataCache
        for ( const entry of newCodeStatsData) {
            await updateCodeStatsDataEntry(entry)
        }

        // Update the lastCodeStatsCheck
        await updateSiteData(currentDate)

        // Get the new CodeStatsDataCache
        const NEW_codeStatsDataCache = await getCodeStatsData();

        // Return the new CodeStatsDataCache
        return NEW_codeStatsDataCache.sort((a, b) => b.totalXP - a.totalXP)

    } else {
        // If the date is not more than 24 hours later, return the CodeStatsDataCache
        return codeStatsDataCache.sort((a, b) => b.totalXP - a.totalXP)
    }
}