import { CodeStatsDataCache, SiteData, UserList, db, eq } from "astro:db";
import { isNewDateMoreThan24HoursLater, returnCodeStatsUserList } from "@utils/index";
import type { ReturnCodeStatsUserList } from "../../types";

export async function getCodeStatsDataCache( 
    currentDate: Date 
): Promise<ReturnCodeStatsUserList[]>{

    // Get the stored site data
    const siteData = await db.select().from(SiteData).where(eq(SiteData.id, 1)).get()

    // Get current stored Cache
    const codeStatsDataCache = await db.select().from(CodeStatsDataCache)

    // Get the user list
    const dbUserList = await db.select().from(UserList)

    // Check if the lastCodeStatsCheck is more than 24 hours later
    if (isNewDateMoreThan24HoursLater(siteData.lastCodeStatsCheck, currentDate)) {

        // If the date is more than 24 hours later, Update the CodeStatsDataCache
        const newCodeStatsData = await returnCodeStatsUserList(dbUserList)

        // Update the CodeStatsDataCache
        for ( const entry of newCodeStatsData) {
            await db.update(CodeStatsDataCache).set(entry).where(eq(CodeStatsDataCache.id, entry.id))
        }

        // Update the lastCodeStatsCheck
        await db.update(SiteData).set({lastCodeStatsCheck: currentDate}).where(eq(SiteData.id, 1))

        // Get the new CodeStatsDataCache
        const NEW_codeStatsDataCache = await db.select().from(CodeStatsDataCache)

        // Return the new CodeStatsDataCache
        return NEW_codeStatsDataCache.sort((a, b) => b.totalXP - a.totalXP)

    } else {
        // If the date is not more than 24 hours later, return the CodeStatsDataCache

        // Check if the CodeStatsDataCache is empty
        if (codeStatsDataCache.length > 0) {
            return codeStatsDataCache.sort((a, b) => b.totalXP - a.totalXP)
        }

        // If the cache is empty, Update the CodeStatsDataCache
        const newCodeStatsData = await returnCodeStatsUserList(dbUserList)
    
        // Update the CodeStatsDataCache
        for ( const entry of newCodeStatsData) {
            await db.insert(CodeStatsDataCache).values(entry)
        }
    
        // Update the lastCodeStatsCheck
        await db.update(SiteData).set({lastCodeStatsCheck: currentDate}).where(eq(SiteData.id, 1))

        // Get the new CodeStatsDataCache
        const NEW_codeStatsDataCache = await db.select().from(CodeStatsDataCache)

        // Return the new CodeStatsDataCache
        return NEW_codeStatsDataCache.sort((a, b) => b.totalXP - a.totalXP)
    }

}