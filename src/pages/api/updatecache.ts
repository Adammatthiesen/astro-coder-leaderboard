import type { APIContext } from "astro";
import { getUserList, returnCodeStatsUserList, updateCodeStatsDataEntry, updateSiteData } from "../../utils";

export async function POST(context: APIContext) {

    // Get current UserList
    const userList = await getUserList();

    // Get the new CodeStatsData
    const newCodeStatsData = await returnCodeStatsUserList(userList);

    // Update the CodeStatsDataCache
    for ( const entry of newCodeStatsData ) {
        await updateCodeStatsDataEntry(entry).catch((error) => {
            return new Response(`Error: ${error}`, { status: 500, headers: { "Content-Type": "text/plain" }, statusText: "Error"});
        });
    }

    // Update the lastCodeStatsCheck
    await updateSiteData(new Date());

    // Redirect to the home page (or refresh the page if already on the home page)
    return context.redirect("/")
}