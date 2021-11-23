import dotenv from 'dotenv';
import connectDatebase from '../connectToDatebase.js';
import isBasicTokenExist from '../isExist/isAccountExist.js';
dotenv.config();

export default async function Verefication(basicToken){

    const connect = connectDatebase();

    const status = await isBasicTokenExist(basicToken);
    
    if(status === 404){
        return status;
    }

    let getRefreshToken = `SELECT 
    state, 
    account_owner, 
    account_owner_avatar, 
    accessToken_Jira, 
    accessToken_BitBucket, 
    accessToken_Confluence,
    
    FROM TeamActivityDB WHERE basicToken='${basicToken}'`;

    const[rows, fields] = await connect.query(getRefreshToken);
    
    const res = JSON.parse(JSON.stringify(rows));

    return res[0];
}