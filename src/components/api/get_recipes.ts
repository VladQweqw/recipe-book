
const ENDPOINT = 'http://192.168.1.69:3003'; 

export const getRecipes = async (url: string = '') => {
    
    const response = await fetch(ENDPOINT + url, {
        method: 'GET',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Accept": "*/*"
        }
    });

    
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data; 
};
