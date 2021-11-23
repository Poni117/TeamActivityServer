import getBitBucketAccessToken from '../../../public/Database/get/getBitbucketAccessToken.js';
import getConfluenceAccessToken from '../../../public/Database/get/getConfluenceAccessToken.js';
import getJiraAccessToken from '../../../public/Database/get/getJiraAccessToken.js';
import getJiraUrl from '../../../public/Database/get/getJiraUrl.js';
import updateActionsOfEmployees from '../../../public/Database/set/updateActionsOfEmployees.js';
import accessResourse from '../../authorizationsAtlassian/accessResourese.js';
import getInfoFromJira from './getInfoFromJira.js';
import CountActions from './collectInformation/countActions.js';
import RequestsToConfluence from '../Requests/requestsToConfluence.js';
import RequestsToBitBucket from '../Requests/requestsToBitBucket/requestToBitBucket.js';
import RequestToConfluence from '../Requests/requestsToConfluence.js';
import requestsToConfluence from '../Requests/requestsToConfluence/requestsToConfluence.js';
import UserInformationAccessess from '../../../public/Database/get/userInformationAccessess.js';
import substr from 'substr-word';
import updateLastUpdate from '../../../public/Database/set/updateLastUpdate.js';
import getUpdatedFromBitbucket from './getUpdatedFromBitbucket.js';
import RequestForUpdateButbucket from '../Requests/requestsToBitBucket/requestForUpdateButbucket.js';
import UpdateCode from '../updateActions/updatedCode.js';
import UpdateIssues from '../updateActions/updateIssues.js';
import GetUpdatedDatesFromIssues from '../getUpdatedDates.js/getUpdatedDatesFromIssues.js';
import GetUpdatedDatesFromBitbucket from '../getUpdatedDates.js/getUpdatedDatesFromBitbucket.js';

async function collectInformation(basicToken) {

    let actions = {
        isAccessesExist: false,
        users: null,
        issues: null,
        codes: null,
        docs: null
    }
    
    const userAccessesInformation = await UserInformationAccessess(basicToken);
    
    updateActionsOfEmployees(actions, basicToken);

    let isAccessesExist = true;

    if (userAccessesInformation.accessTokens.jira === null || userAccessesInformation.accessTokens.jira === undefined || userAccessesInformation.accessTokens.jira === 'undefined') {
        isAccessesExist = false;
    }

    if (userAccessesInformation.accessTokens.confluence === null || userAccessesInformation.accessTokens.confluence === undefined || userAccessesInformation.accessTokens.confluence === 'undefined') {
        isAccessesExist = false;
    }

    if (userAccessesInformation.accessTokens.bitbucket === null || userAccessesInformation.accessTokens.bitbucket === undefined || userAccessesInformation.accessTokens.bitbucket === 'undefined') {
        isAccessesExist = false;
    }

    if (isAccessesExist == false) {
        updateActionsOfEmployees(actions, basicToken);
        return;
    }

    const infoJira = getInfoFromJira(userAccessesInformation.accessTokens.jira, userAccessesInformation.jiraId, userAccessesInformation.lastUpdate.issues);
   
    const infoBitBucket = RequestsToBitBucket('https://api.bitbucket.org/2.0/workspaces', userAccessesInformation.accessTokens.bitbucket, 'workspace', userAccessesInformation.lastUpdate.code);

    const infoConfluence = requestsToConfluence('/rest/api/space?expand=history,homepage', userAccessesInformation.accessTokens.confluence, userAccessesInformation.confluenceId, 'spaces')

    const issues = await infoJira;

    const code = await infoBitBucket;

    const docs = await infoConfluence;
    
    
    const updatedIssues = UpdateIssues(userAccessesInformation.actionsOfEmployees.issues, issues.projects);
    
    const updatedCode = UpdateCode(userAccessesInformation.actionsOfEmployees.codes, code, userAccessesInformation.lastUpdate.code);
    
    userAccessesInformation.lastUpdate.issues = GetUpdatedDatesFromIssues(updatedIssues);
    
    userAccessesInformation.lastUpdate.code = GetUpdatedDatesFromBitbucket(updatedCode);

    try {
        updateLastUpdate(basicToken, userAccessesInformation.lastUpdate);

        actions = {
            isAccessesExist,
            users: issues.users,
            issues: issues.projects,
            codes: updatedCode,
            docs: docs
        }

        updateActionsOfEmployees(actions, basicToken);
    } catch (error) {
        console.log(error)
    }
}



export default collectInformation;