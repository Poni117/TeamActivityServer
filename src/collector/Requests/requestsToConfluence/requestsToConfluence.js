import fetch from 'node-fetch';
import substr from 'substr-word';

export default async function requestsToConfluence(url, accessToken, accessId, determinant){


    const mainUrl = `https://api.atlassian.com/ex/confluence/${accessId}/wiki`
    
    const res = await fetch(`${mainUrl}${url}`, {
        
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "ContentType": "application/json"
        }
    });
    
    const datas = await res.json();
    
    if (determinant === "spaces") {
        
        const spaces = []
        
        Promise.all(datas.results.map(async data => {

            const spaceDatas = await requestsToConfluence(`/rest/api/space/${data.key}/content?expand=history`, accessToken, accessId, 'contents')

            spaces.push({
    
                space: data.name,
                id: data.id,
                created: data.history.createdDate,
                author: {
                    accountId: data.history.createdBy.accountId,
                    accountName: data.history.createdBy.displayName
                },
                pages: spaceDatas.pages,
                blogs: spaceDatas.blogs
            })
        }));

        return spaces;
    }

    if (determinant === "contents") {

        const container = {
            pages: [],
            blogs: []
        }

        Promise.all(datas.page.results.map(async result => {
            
            const comments = requestsToConfluence(`/rest/api/content/${result.id}/child/comment?expand=history`, accessToken, accessId, 'comments')

            const edits = requestsToConfluence(`/rest/api/content/${result.id}/version?status=any`, accessToken, accessId, 'edits');

            const page = {
                id: result.id,
                title: result.title,
                created: result.history.createdDate,
                author: {
                    accountId: result.history.createdBy.accountId,
                    accountName: result.history.createdBy.displayName,
                },
                edits:  await edits,
                comments: await comments
            }
           
            container.pages.push(page);
        })); 
    
        Promise.all(datas.blogpost.results.map(async result => {
            
            const edits = requestsToConfluence(`/rest/api/content/${result.id}/version?status=any`, accessToken, accessId, 'edits');
            const comments = requestsToConfluence(`/rest/api/content/${result.id}/child/comment?expand=history`, accessToken, accessId, 'comments')
            const blog = {
                id: result.id,
                title: result.title,
                created: result.history.createdDate,
                author: {
                    accountId: result.history.createdBy.accountId,
                    accountName: result.history.createdBy.displayName,
                },
                edits: await edits,
                comments:  await comments
            }
    
            container.blogs.push(blog);
        }));
        
       
        return container;
    }

    if (determinant === 'edits') {
        
        const edits = [];

        Promise.all(datas.results.map(async result => {
            
            const edit = {
                created: result.when,
                author: {
                    accountId: result.by.accountId,
                    accountName: result.by.displayName,
                },
            }
            edits.push(edit)
        }));

        return edits;
    }
    
    if (determinant === 'comments') {
        
        const comments = [];

        Promise.all(datas.results.map(async result => {

            const comment = {
                id: result.id,
                created: result.history.createdDate,
                author: {
                    accountId: result.history.createdBy.accountId,
                    accountName: result.history.createdBy.displayName,
                }
            }

            comments.push(comment)
        }));

        return comments;
    }
}
