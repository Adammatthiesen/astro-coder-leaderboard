import type { APIContext } from "astro";
import { addNewUser, getUserList, returnCodeStatsUserList, updateCodeStatsDataEntry, updateSiteData } from "../../utils";

export async function POST(context: APIContext): Promise<Response> {
    const formData = await context.request.formData();
    const displayName = formData.get("display-name") as string;
    const codestatsUsername = formData.get("code-stats-username") as string;
    const gravatarEmail = formData.get("gravatar-email") as string;
    const password = formData.get("password") as string;
    const passwordConfirm = formData.get("password-confirm") as string;

    if (password !== passwordConfirm) {
        return new Response("Passwords do not match", { status: 400, statusText: "Bad Request" });
    }

    const currentUsers = await getUserList();

    if (currentUsers.find((user) => user.codestatsUsername === codestatsUsername)) {
        return new Response("User already exists", { status: 400, statusText: "Bad Request" });
    }

    // Add the user to the database
    try {
        await addNewUser({
            codestatsUsername, 
            displayName, 
            gravatarEmail,
            password
        });

        // Get new UserList
        const userList = await getUserList();
    
        // Get the new CodeStatsData
        const newCodeStatsData = await returnCodeStatsUserList(userList);
    
        // Update the CodeStatsDataCache
        await updateCodeStatsDataEntry(newCodeStatsData).catch((error) => {
            return new Response(`Error: ${error}`, { status: 500, headers: { "Content-Type": "text/plain" }, statusText: "Error"});
        });
    
        // Update the lastCodeStatsCheck
        await updateSiteData(new Date());

        return context.redirect("/");
    } catch (error) {
        return new Response(`Error: ${error}`, { status: 500, statusText: "Error" });
    }
}