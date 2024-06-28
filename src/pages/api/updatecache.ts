import type { APIContext, APIRoute } from "astro";
import { dbTools } from "../../utils/miscTools/databaseTools";
import { returnCodeStatsUserList } from "../../utils/codeStatsTools/returnCodeStatsUserList";

export const POST: APIRoute = async (context: APIContext): Promise<Response> => {

    // Get current UserList
    const userList = await dbTools().UserList().get();

    // Get the new CodeStatsData
    const newCodeStatsData = await returnCodeStatsUserList(userList);

    // Update the CodeStatsDataCache
    await dbTools().CodeStatsDataCache().update(newCodeStatsData, new Date());

    // Redirect to the home page (or refresh the page if already on the home page)
    return context.redirect("/")
}