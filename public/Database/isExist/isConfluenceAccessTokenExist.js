import dotenv from 'dotenv';
import connectDatebase from '../connectToDatebase.js';
import isBasicTokenExist from './isAccountExist.js';
dotenv.config();

export default async function isConfluenceAccessTokenExist(basicToken){

    const connect = connectDatebase();

    let status = await isBasicTokenExist(basicToken);
    
    if (status === 401) {
        
        return status;
    }

    let getAccessTokenJira = `SELECT accessToken_Confluence FROM TeamActivityDB WHERE basicToken='${basicToken}'`;
    
    
    try{
        let[accessTokenRows] = await connect.query(getAccessTokenJira);
        
            const accessToken = JSON.parse(JSON.stringify(accessTokenRows));
            
            if(accessToken[0].accessToken_Confluence === null || accessToken[0].accessToken_Confluence === 'undefined'){
            
                return 204;
            }

    }
    catch(err){
        console.log(err);
    }

    return 200;
}
