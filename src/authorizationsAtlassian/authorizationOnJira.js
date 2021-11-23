import request from 'request';
import dotenv from 'dotenv';
import updateJiraAccessToken from '../../public/Database/set/updateJiraAccessToken.js';
import updateUrlJira from '../../public/Database/set/updateUrlJira.js'
import accessResourse from './accessResourese.js';
import getAccountOwnerOfAccessToken from './getAccountOwnerOfAccessToken.js';

export default async function authorizationOnJira(code, state){

    request.post('https://auth.atlassian.com/oauth/token', {
        form:{
            client_id: process.env.JIRA_CLIENT_ID,
            client_secret: process.env.JIRA_SECRET,
            "code": code,
            "grant_type": "authorization_code",
            "redirect_uri": `https://${process.env.DOMEN}/authorize` 
        }
    },
    async function(error, meta, body){

        let datas = JSON.parse(body);

        updateJiraAccessToken(datas, state);
        
        getAccountOwnerOfAccessToken(datas['access_token']);

        accessResourse(datas['access_token'], 'jira');
    })
}