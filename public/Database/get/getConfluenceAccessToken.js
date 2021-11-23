import dotenv from 'dotenv';
import refreshConfluenceAccessToken from '../../../src/authorizationsAtlassian/refreshConfluenceAccessToken.js';
import connectDatebase from '../connectToDatebase.js';
import getConfluenceRefreshToken from './getConfluenceRefreshToken.js';
import getState from './getState.js';
dotenv.config();

export default async function getConfluenceAccessToken(basicToken){

    const connect = connectDatebase();

    const state = await getState(basicToken);

    const refreshToken = await getConfluenceRefreshToken(basicToken);
    
    await refreshConfluenceAccessToken(refreshToken, state);

    let accessToken = `SELECT accessToken_Confluence FROM TeamActivityDB WHERE basicToken='${basicToken}'`;
    
    const[rows, fields] = await connect.query(accessToken);
    
    const res = JSON.parse(JSON.stringify(rows));

    return res[0].accessToken_Confluence;
}