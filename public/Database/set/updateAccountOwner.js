import connectDatebase from "../connectToDatebase.js";
import dotenv from 'dotenv';
dotenv.config();

export default async function updateAccountOwner(datas, accessToken_Jira){

    const connect = connectDatebase();

    let update = `UPDATE TeamActivityDB SET 
    account_owner='${datas.name}'
    WHERE accessToken_Jira='${accessToken_Jira}'`;
    
    try {
        connect.query(update);
        
    } catch (error) {
        console.log(error)
    }
}