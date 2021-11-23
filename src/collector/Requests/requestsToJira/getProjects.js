import fetch from 'node-fetch'
import getIssue from './getIssue.js';

export default async function getProjects(accessToken, accessId, lastUpdates){

    const res = await fetch(`https://api.atlassian.com/ex/jira/${accessId}/rest/api/3/project`, {

        headers:{
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const data = await res.json();

    const datas = await Promise.all(data.map(async project => {
        
        const projectsInfo = {
            uuid: project.uuid,
            id: project.id,
            key: project.key,
            name: project.name,
            avatarUrl: project.avatarUrls['32x32'],
            issues: await getIssue(accessToken, accessId, project.id, lastUpdates)
        }
  
        return projectsInfo
    }));

    return datas;
}
