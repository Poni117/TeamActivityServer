import request from 'request';
import fetch from 'node-fetch'
import updateJiraAccessId from '../../public/Database/set/updateJiraAccessId.js';
import updateUrlJira from '../../public/Database/set/updateUrlJira.js';
import updateAccountOwner from '../../public/Database/set/updateAccountOwner.js';
import updateAccountOwnerAvatar from '../../public/Database/set/updateAccountOwnerAvatar.js';

export default async function getAccountOwnerOfAccessToken(accessToken){

    let res = await fetch('https://api.atlassian.com/me', {
            headers:{
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json',
            }
    })

    
    let datas = await res.json();

    updateAccountOwner(datas, accessToken);

    updateAccountOwnerAvatar(datas, accessToken);
    
    return datas;
}