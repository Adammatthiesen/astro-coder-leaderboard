// Make a gravatar Avatar from the email
export async function createGravatar(email: string) {
    // trim and lowercase the email
    const safeemail = email.trim().toLowerCase();
    // encode as (utf-8) Uint8Array
    const msgUint8 = new TextEncoder().encode(safeemail); 
    // hash the message
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); 
    // convert buffer to byte array
    const hashArray = Array.from(new Uint8Array(hashBuffer)); 
    // convert bytes to hex string
    const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(""); 
    // return the gravatar url
    return `https://www.gravatar.com/avatar/${hashHex}?s=400&d=mp`;
}