import fetch from 'node-fetch';

export async function getContentsInfo(accessId, accessToken, type){

    let url = `https://api.atlassian.com/ex/confluence/${accessId}/wiki/rest/api/content?status=any&type=${type}&expand=space,childTypes.comment,history,`;

    const res = await fetch(url, {

        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "ContentType": "application/json"
        }
    });
    
    const datas = await res.json();
    
    const contentId = [];
    
    datas.results.forEach(data => {
        
        
        if(data.status === 'trashed'){
            
            return;
        }

        if(data.history.latest === false){
            return
        }
        
     
        const contentInfo = {
            id: data.id,
            user:{
                accountId: data.history.lastUpdated.by.accountId,
                email: data.history.lastUpdated.by.email,
                userName: data.history.lastUpdated.by.displayName,
            },
            
            datas: {
                space: data.space.name,
                created_on: data.history.lastUpdated.when,
            }
        }

        contentId.push(contentInfo)
    });
    
    return contentId;
}
