import request from 'request';
import fetch from 'node-fetch'
import updateJiraAccessId from '../../public/Database/set/updateJiraAccessId.js';
import updateUrlJira from '../../public/Database/set/updateUrlJira.js';
import updateConfluenceAccessId from '../../public/Database/set/updateConfluenceAccessId.js';
import checkNecessaryScopesConfluence from './checkNecessaryScopesConfluence.js';
import checkNecessaryScopesJira from './checkNecessaryScopesJira.js';

export default async function accessResourse(accessToken, type){

    let res = await fetch('https://api.atlassian.com/oauth/token/accessible-resources', {
        headers:{
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
        }
    })
    
    let datas = await res.json();
    
    if(type === 'jira'){

        updateJiraAccessId(datas, accessToken);

        updateUrlJira(datas, accessToken);
        
        checkNecessaryScopesJira(datas[0].scopes, accessToken);
    }

    if(type === 'confluence'){

        updateConfluenceAccessId(datas, accessToken);

        checkNecessaryScopesConfluence(datas[0].scopes, accessToken);
    }
   
    return datas[0].id;
}