import connectDatebase from "../connectToDatebase.js";
import dotenv from 'dotenv';
import isStateExist from "../isExist/isStateExist.js";
dotenv.config();

export default async function updateJiraAccessToken(datas, state){

    const connect = connectDatebase();

    // const status = await isStateExist(state);
    
    // if(status === 404){
    //     return status;
    // }

    let update = '';

    if (datas['refresh_token'] === undefined) {
        update = `UPDATE TeamActivityDB SET 
        accessToken_Jira='${datas['access_token']}'
        WHERE state='${state}'`
    }
    else{
        update = `UPDATE TeamActivityDB SET 
        accessToken_Jira='${datas['access_token']}',
        refresh_access_token_Jira='${datas['refresh_token']}'
        WHERE state='${state}'`
    }
    
    try {
        console.log(await connect.query(update));
        
    } catch (error) {
        console.log(error)
    }
}