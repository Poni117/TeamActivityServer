import dotenv from 'dotenv';
import request from 'request';
import connectDatebase from '../connectToDatebase.js';
import isStateExist from '../isExist/isStateExist.js';

dotenv.config();

export default async function updateBitBucketAccessToken(datas, state){

    const connect = connectDatebase();

    // const status = await isStateExist(state);
    
    // if(status === 401){
    //     return status;
    // }
    
    let update = `UPDATE TeamActivityDB SET 
    accessToken_BitBucket='${datas['access_token']}', 
    refresh_access_token_Bitbucket='${datas['refresh_token']}'
    WHERE state='${state}'`

    try {
        connect.query(update);
        
    } catch (error) {
        console.log(error)
    }
}