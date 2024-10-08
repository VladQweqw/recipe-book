
const ENDPOINT = 'http://192.168.1.69:3003'; 

export const getRecipes = async (url: string = '', body: any = {}, method: "GET"  | "HEAD" | "POST" | "DELETE" | "PUT" = 'GET') => {
    const response = await fetch(ENDPOINT + url, {
        method: method,
        ...(method !== "GET" && method !== "HEAD" ? {body,} : {}),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Accept": "*/*",
            // 'Content-Type': 'multipart/form-data',

        }
    });

    
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data; 
};
