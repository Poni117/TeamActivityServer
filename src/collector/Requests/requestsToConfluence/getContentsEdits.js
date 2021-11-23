import fetch from 'node-fetch';

export async function getContentsEdits(accessId, accessToken, type){

    if(type.id === "trashed"){
       return [];
    }
    let url = `https://api.atlassian.com/ex/confluence/${accessId}/rest/api/content/${type.id}/version?status=any`;

    const res = await fetch(url, {

        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "ContentType": "application/json"
        }
    });
    
    const datas = await res.json();
    
    const edits = datas.results.map(data => {

        const contentInfo = {
                user:{
                    accountId: data.by.accountId,
                    email: data.by.email,
                    userName: data.by.displayName,
                },
                
                datas: {
                    created_on: data.when,
                }
        }

        return contentInfo;
    });

    return edits;
}
