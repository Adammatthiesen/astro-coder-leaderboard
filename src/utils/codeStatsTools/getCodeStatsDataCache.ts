import { dbTools, isNewDateMoreThan24HoursLater, returnCodeStatsUserList } from "../index";
import type { ReturnCodeStatsUserList } from "../../types";

export async function getCodeStatsDataCache( 
    lastCodeStatsCheck: Date,
    currentDate: Date,
): Promise<ReturnCodeStatsUserList[]> {

    // Get current stored Cache
    const codeStatsDataCache = await dbTools().CodeStatsDataCache().get();

    // Get the user list
    const dbUserList = await dbTools().UserList().get();

    if (codeStatsDataCache.length === 0) {
        // If the CodeStatsDataCache is empty, Update the CodeStatsDataCache
        const newCodeStatsData = await returnCodeStatsUserList(dbUserList)
    
        // Update the CodeStatsDataCache
        await dbTools().CodeStatsDataCache().create(newCodeStatsData, currentDate)
    
        // Get the new CodeStatsDataCache
        const NEW_codeStatsDataCache = await dbTools().CodeStatsDataCache().get();

        // Return the new CodeStatsDataCache
        return NEW_codeStatsDataCache.sort((a, b) => b.totalXP - a.totalXP)
    }

    // Check if the lastCodeStatsCheck is more than 24 hours later
    
    // If the date is more than 24 hours later, Update the CodeStatsDataCache
    if ( isNewDateMoreThan24HoursLater(lastCodeStatsCheck, currentDate ) ) {
        // get the new CodeStatsData
        const newCodeStatsData = await returnCodeStatsUserList(dbUserList)

        // Update the CodeStatsDataCache
        await dbTools().CodeStatsDataCache().create(newCodeStatsData, currentDate)

        // Get the new CodeStatsDataCache
        const NEW_codeStatsDataCache = await dbTools().CodeStatsDataCache().get();

        // Return the new CodeStatsDataCache
        return NEW_codeStatsDataCache.sort((a, b) => b.totalXP - a.totalXP)

    } else {
        // If the date is not more than 24 hours later, return the CodeStatsDataCache
        return codeStatsDataCache.sort((a, b) => b.totalXP - a.totalXP)
    }
}