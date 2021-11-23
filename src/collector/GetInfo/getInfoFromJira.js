import { jiraMacketProjectKeyInfo, jiraProjectKeyData } from '../Makcets/getMacketForJira.js';
import { userLabel } from '../Makcets/getMacketInfo.js'
import requestsToJira from '../Requests/requestsToJira.js'
import {getUsers, isAccountIdExistInList } from './Tools/tools.js';
import substr from "substr-word"

async function getInfoFromJira(jiraAccess, accessId, lastUpdates) {
    
    const jiraResponses = await requestsToJira(jiraAccess, accessId, lastUpdates);

    let usersInfo = {

        users: getIdentityUsers(jiraResponses.users),
        projects: jiraResponses.projects
    }
    
    return usersInfo;
}

export function getIdentityUsers(users){

    let  usersLabel = []
    let information = [];
    let size = '32x32';
    users.map(currentElement => {

        currentElement.datas.map(user => {

            let macketUserLabel = userLabel();

            macketUserLabel.accountAvatar = user.avatarUrls[size];
            macketUserLabel.accountName = user.displayName;
            macketUserLabel.accountId = user.accountId;
            macketUserLabel.emailAddress = user.emailAddress;

            information.push(macketUserLabel);
        
            if(usersLabel.length === 0){
    
                usersLabel.push(macketUserLabel);
                return;
            }
        
            if(isAccountIdExistInList(usersLabel, macketUserLabel) == false) {
        
                usersLabel.push(macketUserLabel)
            }
        });
    });

    return usersLabel;
}

export default getInfoFromJira;