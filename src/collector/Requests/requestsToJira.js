import getUsers from './requestsToJira/getUsers.js';
import getProjects from './requestsToJira/getProjects.js';
import getIssue from './requestsToJira/getIssue.js';

export async function requestsToJira(accessToken, accessId, lastUpdates) {

    let projects = await getProjects(accessToken, accessId, lastUpdates); // createmeta.projects

    const users = Promise.all(projects.map(project => { // get all users from Issues
        return getUsers(accessToken, project.key, accessId);
    }));

    const jiraResponses = {
        
        users: await users,

        projects
    }
    
    return jiraResponses;
}

export default requestsToJira;