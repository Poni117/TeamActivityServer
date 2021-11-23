import fetch from 'node-fetch'

export async function getComments(accessId, accessToken, id, type){

    if(id.id === "trashed"){
        return [];
    }
    
    let url = `https://api.atlassian.com/ex/confluence/${accessId}/wiki/rest/api/content/${id.id}/child/comment?expand=history`

    const res = await fetch(url, {

        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "ContentType": "application/json"
        }
    });
    
    const datas = await res.json();

    const comments = datas.results.map(data => {

        return {
            user: {
                accountId: data.history.createdBy.accountId,
                email:  data.history.createdBy.email,
                userName:  data.history.createdBy.displayName,
            },
            
            datas: {
                comment: data.title,
                created_on:  data.history.createdDate,
            }
        }
    })

    return comments;
}
