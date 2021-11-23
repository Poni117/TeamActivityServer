import dotenv from 'dotenv';
import connectDatebase from '../connectToDatebase.js';
import isBasicTokenExist from '../isExist/isAccountExist.js';
dotenv.config();

export default async function getJiraUrl(basicToken){

    const connect = connectDatebase();

    const status = await isBasicTokenExist(basicToken);
    if(status === 404){
        return status;
    }

    let getUrlJira = `SELECT url_Jira FROM TeamActivityDB WHERE basicToken='${basicToken}'`;

    const[rows, fields] = await connect.query(getUrlJira);
    
    const res = JSON.parse(JSON.stringify(rows));
    
    if(res[0].url_Jira === null || res[0].url_Jira === undefined){

        return 404;
    }

    return res[0].url_Jira;
}