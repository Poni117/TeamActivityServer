import fetch from 'node-fetch'

export default async function getContentsMainInfo(accessId, accessToken, type){

    let url = `https://api.atlassian.com/ex/confluence/${accessId}/wiki/rest/api/content?type=${type}&status=any&expand=space,history`

    const res = await fetch(url, {

        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "ContentType": "application/json"
        }
    });
    
    const datas = await res.json();

    const contentsInfo = datas.results.map(data => {
        
        if (data.status === "trashed") {
            return {id:"trashed"};
        }   
        
        if ( data.history.latest === false) {
            return {id:"latest"}
        }

        return {
            id: data.id,
            title: data.title,
            created: data.history.createdDate,
            author: {
                accountId: data.history.createdBy.accountId,
                accountName: data.history.createdBy.displayName
            },
            edits: [],
            comments: []
        }
    })

    return contentsInfo;
}
