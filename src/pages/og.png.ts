import type { APIContext, APIRoute } from "astro";
import { html } from "satori-html";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import OGImageContainer from "../components/OGImageContainer.astro";
import { FontPath } from "../consts";
import { dbTools } from "../utils/miscTools/databaseTools";
import { getCodeStatsDataCache } from "../utils/codeStatsTools/getCodeStatsDataCache";
import { satoriAstroOG } from "../utils/satori";

export const GET: APIRoute = async (context: APIContext): Promise<Response> => {

    // Get the last time the code::stats data was checked
    const { lastCodeStatsCheck } = await dbTools().SiteData().get();

    // Get the code::stats data from the cache or fetch new data if the cache is stale
    const codeStatsDataCache = await getCodeStatsDataCache(lastCodeStatsCheck,new Date());

    const astroContainer = await AstroContainer.create();
    const renderedOGImageHTML = await astroContainer.renderToString(
        OGImageContainer, 
        { props: { lastCodeStatsCheck, codeStatsDataCache }}
    );

    const renderedOGImage = renderedOGImageHTML
        .replace(/<!DOCTYPE html>/, '')
        .replace(/<html.*?>/, '')
        .replace(/<\/html>/, '')
        .trim();

    const fontFile = await fetch(new URL(FontPath,context.url.origin))
    const fontData = await fontFile.arrayBuffer();

    return await satoriAstroOG({
        template: html(renderedOGImage),
        width: 1920,
        height: 1080,
    }).toResponse({
        satori: {
            fonts: [{
                name: "Inter Latin",
                data: fontData,
                style: "normal",
            }]
        }
    })

}