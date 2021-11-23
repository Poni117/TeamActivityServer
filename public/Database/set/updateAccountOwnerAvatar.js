import connectDatebase from "../connectToDatebase.js";
import dotenv from 'dotenv';
dotenv.config();

export default async function updateAccountOwnerAvatar(datas, accessToken_Jira){

    const connect = connectDatebase();

    let update = `UPDATE TeamActivityDB SET 
    account_owner_avatar='${datas.picture}'
    WHERE accessToken_Jira='${accessToken_Jira}'`;
    
    try {
        connect.query(update);
        
    } catch (error) {
        console.log(error)
    }
}