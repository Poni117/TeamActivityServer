import connectDatebase from "../connectToDatebase.js";
import dotenv from 'dotenv';
import isJiraAccessTokenExist from "../isExist/isJiraAccessTokenExist.js";
dotenv.config();

export default async function updateUrlJira(datas, accessToken_Jira){

    const connect = connectDatebase();

    let update = `UPDATE TeamActivityDB SET 
    url_Jira='${datas[0].url}'
    WHERE accessToken_Jira='${accessToken_Jira}'`
    
    try {
        connect.query(update);
        
    } catch (error) {
        console.log(error)
    }
}