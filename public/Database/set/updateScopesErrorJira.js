import connectDatebase from "../connectToDatebase.js";
import dotenv from 'dotenv';
dotenv.config();

export default async function updateScopesErrorJira(scopes, accessToken){

    const connect = connectDatebase();

    let update = `UPDATE TeamActivityDB SET 
    scopes_error_Jira='${scopes}'
    WHERE accessToken_Jira='${accessToken}'`;
    
    try {
        connect.query(update);
        
    } catch (error) {
        console.log(error)
    }
}