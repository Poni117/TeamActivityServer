import dotenv from 'dotenv';
import connectDatebase from '../connectToDatebase.js';
import isBasicTokenExist from '../isExist/isAccountExist.js';
dotenv.config();

export default async function getScopesError(basicToken){

    const connect = connectDatebase();

    const status = await isBasicTokenExist(basicToken);
    if(status === 404){
        return status;
    }

    let getUrlJira = `SELECT scopes_error_Jira, scopes_error_Confluence FROM TeamActivityDB WHERE basicToken='${basicToken}'`;

    const[rows, fields] = await connect.query(getUrlJira);
    
    const res = JSON.parse(JSON.stringify(rows));
    
    if(res[0].scopes_error_Jira === null || res[0].scopes_error_Jira === undefined){

        return 404;
    }

    if(res[0].scopes_error_Confluence === null || res[0].scopes_error_Confluence === undefined){

        return 404;
    }

    const scopesError = {

        scopesErrorJira: res[0].scopes_error_Jira,
        
        scopesErrorConfluence: res[0].scopes_error_Confluence
    }

    return scopesError;
}