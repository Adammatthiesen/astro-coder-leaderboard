import { CodeStatsDataCache, SiteData, UserList, db, eq } from "astro:db"
import type { codeStatsDataEntry, siteData, userList } from "../../types";
import { AstroError } from "astro/errors";

/** This function returns an object with functions that can be used to interact with the database */
export const dbTools = () => {
    return {
        /**
         * This function returns an object with functions that can be used to interact with the SiteData table
         */
        SiteData() {
            return {
                /**
                 * This function gets the data from the SiteData table
                 */
                async get() {
                    return await db.select()
                            .from(SiteData)
                            .where(eq(SiteData.id, 1))
                            .get()
                },
                /**
                 * This function creates a new entry in the SiteData table
                 * @param newSiteData The data to be inserted into the SiteData table
                 */
                async update(
                    newSiteData: siteData['lastCodeStatsCheck']
                ) {
                    return await db.update(SiteData)
                            .set({id: 1, lastCodeStatsCheck: newSiteData})
                            .where(eq(SiteData.id, 1))
                            .returning()
                            .get();
                }
            }
        },
        /**
         * This function returns an object with functions that can be used to interact with the CodeStatsDataCache table
         */
        CodeStatsDataCache() {
            return {
                /**
                 * This function gets the data from the CodeStatsDataCache table
                 */
                async get() {
                    return await db.select().from(CodeStatsDataCache)
                },
                /**
                 * This function creates new entries in the CodeStatsDataCache table
                 * @param newCodeStatsData The data to be inserted into the CodeStatsDataCache table
                 */
                async create(
                    newCodeStatsData: codeStatsDataEntry[],
                    currentDate: Date,
                ) {
                    await dbTools().SiteData().update(currentDate);
                    return await db.insert(CodeStatsDataCache)
                            .values(newCodeStatsData)
                            .returning()
                },
                /**
                 * This function deletes all entries in the CodeStatsDataCache table and then creates new entries
                 * @param newCodeStatsData The data to be inserted into the CodeStatsDataCache table
                 */
                async update(
                    newCodeStatsData: codeStatsDataEntry[],
                    currentDate: Date,
                ) {
                    await db.delete(CodeStatsDataCache)
                            .catch((err) => {
                                return new AstroError(err, "Error updating CodeStatsDataCache")
                            })
                    await dbTools().SiteData().update(currentDate);
                    return await db.insert(CodeStatsDataCache)
                            .values(newCodeStatsData)
                            .returning()
                },
            }
        },
        /**
         * This function returns an object with functions that can be used to interact with the UserList table
         */
        UserList() {
            return {
                /**
                 * This function gets the data from the UserList table
                 */
                async get() {
                    return await db.select().from(UserList)
                },
                /**
                 * This function creates a new entry in the UserList table
                 * @param newUserData The data to be inserted into the UserList table
                 */
                async addNewUser(
                    newUserData: Omit<userList, 'id'>
                ) {
                    const {
                        codestatsUsername, 
                        displayName, 
                        gravatarEmail, 
                        password
                    } = newUserData;
                    return await db.insert(UserList)
                            .values({
                                displayName, 
                                codestatsUsername, 
                                gravatarEmail,
                                password
                            })
                            .returning()
                            .then(() => {
                                console.log(`Added new user: ${displayName}`);
                            })
                            .catch((err) => {
                                console.error(`Error adding new user: ${err}`);
                            })
                },
                /**
                 * This function updates an entry in the UserList table
                 * @param userData The data to be updated in the UserList table
                 */
                async editUser(
                    userData: Partial<userList>
                ) {
                    const {
                        id,
                        displayName,
                        codestatsUsername,
                        gravatarEmail,
                        password
                    } = userData;

                    return await db.update(UserList)
                            .set({
                                codestatsUsername,
                                displayName,
                                gravatarEmail,
                                password
                            })
                            .where(eq(UserList.id, id))
                            .returning()
                            .get();
                },
                /**
                 * This function deletes an entry in the UserList table
                 * @param userId The id of the user to be deleted
                 */
                async deleteUser(userId: number) {
                    return await db.delete(UserList)
                            .where(eq(UserList.id, userId))
                            .then(() => {
                                console.log(`Deleted user with id: ${userId}`);
                            })
                            .catch((err) => {
                                console.error(`Error deleting user: ${err}`);
                            })
                },
            }
        }
    }
}