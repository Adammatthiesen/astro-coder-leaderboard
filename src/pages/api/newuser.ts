import type { APIContext, APIRoute } from "astro";
import { scryptAsync } from "@noble/hashes/scrypt";
import { ScryptOptions } from "../../consts";
import { dbTools } from "../../utils/miscTools/databaseTools";
import { returnCodeStatsUserList } from "../../utils/codeStatsTools/returnCodeStatsUserList";

export const POST: APIRoute = async (context: APIContext): Promise<Response> => {

    // Get the form data
    const formData = await context.request.formData();

    // Map the form data to variables
    const displayName = formData.get("display-name") as string;
    const codestatsUsername = formData.get("code-stats-username") as string;
    const gravatarEmail = formData.get("gravatar-email") as string;
    const rawPassword = formData.get("password") as string;
    const passwordConfirm = formData.get("password-confirm") as string;

    // Check if the passwords match
    if (rawPassword !== passwordConfirm) {
        return new Response("Passwords do not match", { 
            status: 400, 
            statusText: "Bad Request" 
        });
    }

    // Check if the password is valid
    if(typeof rawPassword !== "string" || rawPassword.length < 6 || rawPassword.length > 100) {
        return new Response("Password must be between 6 and 100 characters", { 
            status: 400, 
            statusText: "Bad Request" 
        });
    }

    // Get the current user list
    const currentUsers = await dbTools().UserList().get();

    // Check if the user already exists
    if (currentUsers.find((user) => user.codestatsUsername === codestatsUsername || user.displayName === displayName)) {
        return new Response("User already exists", { 
            status: 400, 
            statusText: "Bad Request" 
        });
    }

    // Hash the password
	const hashedPassword = await scryptAsync(
        rawPassword, 
        codestatsUsername, 
        ScryptOptions
    )

    // Convert the hashed password to a storable string
	const password = Buffer.from(hashedPassword.buffer).toString();

    // Add the user to the database
    try {
        await dbTools().UserList().addNewUser({
            codestatsUsername,
            displayName,
            gravatarEmail,
            password
        })

        // Get new UserList
        const userList = await dbTools().UserList().get();
    
        // Get the new CodeStatsData
        const newCodeStatsData = await returnCodeStatsUserList(userList);
    
        // Update the CodeStatsDataCache
        await dbTools().CodeStatsDataCache().update(newCodeStatsData, new Date()).catch((error) => {
            return new Response(`Error: ${error}`, { 
                status: 500, 
                headers: { "Content-Type": "text/plain" }, 
                statusText: "Error"
            });
        });

        return context.redirect("/");
    } catch (error) {
        return new Response(`Error: ${error}`, { status: 500, statusText: "Error" });
    }
}