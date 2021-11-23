import fetch from 'node-fetch';
import substr from 'substr-word';

export default async function getIssueActions(accessToken, key, accessId){

    let issue = {
        comments: [],
        edits: []
    }

    let url = `/rest/api/3/issue/${key}?expand=changelog`;
    
    const res = await fetch(`https://api.atlassian.com/ex/jira/${accessId}${url}`, {
        headers:{
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const data = await res.json();

    data.fields.comment.comments.map(comment => {

        issue.comments.push({
            id:  comment.id,
            created: comment.created,
            author: {
                accountId: comment.author.accountId,
                accountName: comment.author.displayName
            }
        }); 
    });

    data.changelog.histories.map(history => {
        
        issue.edits.push({
            id:  history.id,
            created: history.created,
            author: {
                accountId: history.author.accountId,
                accountName: history.author.displayName
            }
        })
    });

    return issue;
}
