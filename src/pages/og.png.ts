import type { APIContext, APIRoute } from "astro";
import { getCodeStatsDataCache, getSiteData, satoriAstroOG } from "../utils";
import { html } from "satori-html";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import OGImageContainer from "../components/OGImageContainer.astro";
import { FontPath } from "../consts";

export const GET: APIRoute = async (context: APIContext) => {

    // Get the last time the code::stats data was checked
    const { lastCodeStatsCheck } = await getSiteData();

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

    const fontFile = await fetch(context.url.origin+FontPath)
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