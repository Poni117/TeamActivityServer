import fetch from 'node-fetch'
import getIssueActions from './getIssueActions.js';

export default async function getIssue(accessToken, accessId, projectName, lastUpdates){

    const res = await fetch(`https://api.atlassian.com/ex/jira/${accessId}/rest/api/3/search?jql=project=${projectName}`, {

        headers:{
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const data = await res.json();

    const issues = await Promise.all(data.issues.map(async issue => {

        let isIssueExist = false;

        let isUpdateExist = false;

        lastUpdates.map(lastUpdatedIssue => {

            if (lastUpdatedIssue.id === issue.uuid && lastUpdatedIssue.updated !== issue.updated) {

                isIssueExist = true;

                isUpdateExist = true;
            }

            if (lastUpdatedIssue.id === issue.id && lastUpdatedIssue.updated === issue.updated) {

                isIssueExist = true;
            }
        });


        if (isIssueExist && isUpdateExist == false) {
            return;
        }

        const issueActions = await getIssueActions(accessToken, issue.key, accessId);

        let issueData = {
            id: issue.id,
            key: issue.key,
            author: issue.fields.creator,
            reporter: issue.fields.reporter,
            assignee: issue.fields.assignee,
            created: issue.fields.created,
            updated: issue.fields.updated,
            status: issue.fields.status.statusCategory.key,
            resolutiondate: issue.fields.resolutiondate,
            comments: issueActions.comments,
            edits: issueActions.edits
        }

       return issueData;
    }));

    return issues;
}
