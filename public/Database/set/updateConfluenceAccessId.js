import connectDatebase from "../connectToDatebase.js";
import dotenv from 'dotenv';
dotenv.config();

export default async function updateConfluenceAccessId(datas, accessToken_Confluence){

    const connect = connectDatebase();

    let update = `UPDATE TeamActivityDB SET 
    access_id_Confluence='${datas[0].id}'
    WHERE accessToken_Confluence='${accessToken_Confluence}'`;


    try {
        connect.query(update);
        
    } catch (error) {
        console.log(error)
    }
}