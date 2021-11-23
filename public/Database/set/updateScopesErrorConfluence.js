import connectDatebase from "../connectToDatebase.js";
import dotenv from 'dotenv';
dotenv.config();

export default async function updateScopesErrorConfluence(scopes, accessToken){

    const connect = connectDatebase();

    let update = `UPDATE TeamActivityDB SET 
    scopes_error_Confluence='${scopes}'
    WHERE accessToken_Confluence='${accessToken}'`;
    
   
    try {
        connect.query(update);
        
    } catch (error) {
        console.log(error)
    }
}