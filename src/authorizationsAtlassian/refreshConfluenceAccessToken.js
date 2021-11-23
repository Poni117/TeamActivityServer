import fetch from 'node-fetch';
import dotenv from 'dotenv';
import updateJiraAccessToken from '../../public/Database/set/updateJiraAccessToken.js';
import updateJiraAccessId from '../../public/Database/set/updateJiraAccessId.js';
import updateConfluenceAccessToken from '../../public/Database/set/updateConfluenceAccessToken.js';

export default async function refreshConfluenceAccessToken(refreshAccessToken, state){

    const promise = await fetch('https://auth.atlassian.com/oauth/token', {

        method: "POST",

        headers:{
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            client_id: process.env.JIRA_CLIENT_ID,
            client_secret: process.env.JIRA_SECRET,
            "grant_type": "refresh_token",
            "refresh_token": refreshAccessToken,
        })
    });

    const datas = await promise.json();

    updateConfluenceAccessToken(datas, state);

    return datas['access_token'];
}