import dotenv from 'dotenv';
import refreshJiraAcesssToken from '../../../src/authorizationsAtlassian/refreshJiraAccessToken.js';
import refreshJiraAcessToken from '../../../src/authorizationsAtlassian/refreshJiraAccessToken.js';
import connectDatebase from '../connectToDatebase.js';
import getJiraRefreshToken from './getJiraRefreshAccessToken.js';
import getState from './getState.js';
dotenv.config();

export default async function getJiraAccessToken(basicToken){

    const connect = connectDatebase();

    const state = await getState(basicToken);

    const refreshToken = await getJiraRefreshToken(basicToken);
    
    await refreshJiraAcesssToken(refreshToken, state);

    let accessToken = `SELECT accessToken_Jira FROM TeamActivityDB WHERE basicToken='${basicToken}'`;
    
    const[rows, fields] = await connect.query(accessToken);
    
    const res = JSON.parse(JSON.stringify(rows));

    return res[0].accessToken_Jira;
}