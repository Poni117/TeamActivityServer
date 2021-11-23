import api, {} from "@forge/api";

export async function getAccessToken (){
    
    const res = await api.fetch(`https://bitbucket.org/site/oauth2/access_token`, {
        method: 'POST'

    });

    const data = await res.json();  
    
    return data;
}

export function send(){
}