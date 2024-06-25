import type { APIContext, APIRoute } from "astro";
import { Description, LocalDateStringOptions, Title } from "../consts";
import { XPCalculator, dbTools, getCodeStatsDataCache } from "../utils";
import type { liveFeedJsonResponse } from "../types";

export const GET: APIRoute = async (context: APIContext): Promise<Response> => {

    const { lastCodeStatsCheck } = await (await dbTools().SiteData()).get();

    const jsonResponse: liveFeedJsonResponse = {
        SiteURL: context.site.href,
        SiteName: Title,
        SiteDescription: Description,
        LastCodeStatsCheck: lastCodeStatsCheck.toLocaleDateString("en-US", LocalDateStringOptions)+" UTC",
        UserList: []
    }

    const UserList = await getCodeStatsDataCache(lastCodeStatsCheck, new Date());

    for (const user of UserList) {
        jsonResponse.UserList.push({
            DisplayName: user.displayName,
            CodeStatsUsername: user.codestatsUsername,
            Level: XPCalculator.getLevel(user.totalXP),
            TotalXP: user.totalXP,
            TopMachine: user.topMachine||null,
            TopLanages: user.topLanguages||null
        })
    }

    return new Response(JSON.stringify({...jsonResponse}), {
        headers: { "content-type": "application/json" },
    });
}