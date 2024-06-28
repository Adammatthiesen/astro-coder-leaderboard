import type { APIContext, APIRoute } from "astro";
import { scryptAsync } from "@noble/hashes/scrypt";
import { ScryptOptions } from "../../consts";
import { dbTools } from "../../utils/miscTools/databaseTools";
import { returnCodeStatsUserList } from "../../utils/codeStatsTools/returnCodeStatsUserList";

export const POST: APIRoute = async (context: APIContext): Promise<Response> => {

    // Get the form data
    const formData = await context.request.formData();

    // Map the form data to variables
    const codestatsUsername = formData.get("code-stats-username") as string;
    const displayName = formData.get("display-name") as string;
    const gravatarEmail = formData.get("gravatar-email") as string;
    const rawPassword = formData.get("password") as string;

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
    const UserExists = currentUsers.find((user) => user.codestatsUsername === codestatsUsername)

    // Hash the password
    const hashedPassword = await scryptAsync(
        rawPassword, 
        codestatsUsername, 
        ScryptOptions
    )

    // Convert the hashed password to a storable string
    const password = Buffer.from(hashedPassword.buffer).toString();

    if (UserExists) {
        const { id: userID, password: existingPassword } = UserExists;

        // Check if the password is the same
        if (existingPassword === password) {
            try {
                await dbTools().UserList().editUser({
                    id: userID,
                    displayName,
                    codestatsUsername,
                    gravatarEmail,
                    password: existingPassword,
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
                return new Response(`Error: ${error}`, { 
                    status: 500, 
                    headers: { "Content-Type": "text/plain" }, 
                    statusText: "Error"
                });
            }
        }

    } else {
        return new Response("Unknown", {
            status: 400,
            headers: { "Content-Type": "text/plain" }, 
            statusText: "Bad Request"
        })
    }

}