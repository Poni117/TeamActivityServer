import dotenv from 'dotenv';
import refreshBitBucketAcesssToken from '../../../src/authorizationsAtlassian/refreshBitBucketAcesssToken.js';
import connectDatebase from '../connectToDatebase.js';
import isBasicTokenExist from '../isExist/isAccountExist.js';
import updateBitBucketAccessToken from '../set/updateBitBucketAccessToken.js';
import getBitBucketRefreshToken from './getBitbucketRefreshToken.js';
import getState from './getState.js';
dotenv.config();

export default async function getBitBucketAccessToken(basicToken){

    const state = await getState(basicToken);
    
    const refreshToken = await getBitBucketRefreshToken(basicToken);

    await refreshBitBucketAcesssToken(refreshToken, state);

    const connect = connectDatebase();

    let status = isBasicTokenExist(basicToken);
    if (status === 404) {
        return
    }

    let getRefreshToken = `SELECT accessToken_BitBucket FROM TeamActivityDB WHERE basicToken='${basicToken}'`;

    let [rows] = await connect.query(getRefreshToken);
    return JSON.parse(JSON.stringify(rows[0].accessToken_BitBucket));
            
}