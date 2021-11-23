import dotenv from 'dotenv';
import refreshBitBucketAcesssToken from '../../../src/authorizationsAtlassian/refreshBitBucketAcesssToken.js';
import connectDatebase from '../connectToDatebase.js';
import isBasicTokenExist from '../isExist/isAccountExist.js';
import getState from './getState.js';
dotenv.config();

export default async function getJiraRefreshToken(basicToken){

    const connect = connectDatebase();

    let status = isBasicTokenExist(basicToken);
    
    if (status === 404) {
        return
    }

    let getRefreshToken = `SELECT refresh_access_token_Jira FROM TeamActivityDB WHERE basicToken='${basicToken}'`;

    let [rows] = await connect.query(getRefreshToken);

    return JSON.parse(JSON.stringify(rows[0].refresh_access_token_Jira));
}