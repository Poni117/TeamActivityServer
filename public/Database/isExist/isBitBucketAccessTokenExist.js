import dotenv from 'dotenv';
import connectDatebase from '../connectToDatebase.js';
import isBasicTokenExist from './isAccountExist.js';
dotenv.config();

export default async function isBitBucketAccessTokenExist(basicToken){

    const connect = connectDatebase();

    let status = await isBasicTokenExist(basicToken);
    
    if (status === 401) {
        return status;
    }
    
    let getAccessTokenBitbucket = `SELECT accessToken_BitBucket FROM TeamActivityDB WHERE basicToken='${basicToken}'`;
    
    let[accessTokenRows] = await connect.query(getAccessTokenBitbucket);
    
    const accessToken = JSON.parse(JSON.stringify(accessTokenRows));
    
    if(accessToken[0].accessToken_BitBucket === null || accessToken[0].accessToken_BitBucket === 'undefined'){
        
        return 204;
    }

    return 200;
}
