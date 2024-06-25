import type { APIContext, APIRoute } from "astro";
import { dbTools, returnCodeStatsUserList } from "../../utils";

export const POST: APIRoute = async (context: APIContext): Promise<Response> => {

    // Get current UserList
    const userList = await (await dbTools().UserList()).get();

    // Get the new CodeStatsData
    const newCodeStatsData = await returnCodeStatsUserList(userList);

    // Update the CodeStatsDataCache
    await (await dbTools().CodeStatsDataCache()).update(newCodeStatsData);

    // Update the lastCodeStatsCheck
    await (await dbTools().SiteData()).update(new Date())

    // Redirect to the home page (or refresh the page if already on the home page)
    return context.redirect("/")
}