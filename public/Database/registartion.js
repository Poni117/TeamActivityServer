import connectDatebase from './connectToDatebase.js';
import isAccountIdExist from './isExist/isAccountIdExist.js';
import btoa from 'btoa'
import dotenv from 'dotenv';
dotenv.config();

export default async function registartion(accountId){

    console.log(accountId)
    const connect = connectDatebase();

    const status = await isAccountIdExist(accountId);    

    if(status === 200){
        
        return status;
    }
    
    
    const lastUpdate = {
        code: {
            workspaces: [{uuid: null}],
            repositories: [{uuid: null, updated: new Date(0)}], 
            pullRequests: [{id: null, updated: new Date(0)}] 
        },
        issues: [{
            id: null,  updated: new Date(0)
        }]
    }
    
    const actionsOfEmployees = {
        users: null,
        issues: null,
        codes: null,
        docs: null
    }
    
    let state = '';
    
    
    for (var i = 0; i !== 10; i++) {
        
        state += accountId.charAt(Math.floor(Math.random() * accountId.length));
    }
    
    let basicToken = "Basic " + btoa(`${accountId}:${process.env.SECRETKEY}`);

    const query = `INSERT INTO TeamActivityDB (state, accountId, basicToken, last_update, actionsOfEmployees) VALUES ('${state}', '${accountId}', '${basicToken}', '${JSON.stringify(lastUpdate)}', '${JSON.stringify(actionsOfEmployees)}')`;

    try {
        console.log(await connect.query(query));
        return 201;
        
    } catch (error) {
        console.log(error)
    }
}