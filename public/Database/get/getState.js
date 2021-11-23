import dotenv from 'dotenv';
import connectDatebase from '../connectToDatebase.js';
import isBasicTokenExist from '../isExist/isAccountExist.js';
dotenv.config();

export default async function getState(basicToken){

    const connect = connectDatebase();

    const status = await isBasicTokenExist(basicToken);
    if(status === 404){
        return status;
    }

    let getRefreshToken = `SELECT state FROM TeamActivityDB WHERE basicToken='${basicToken}'`;

    const[rows, fields] = await connect.query(getRefreshToken);
    
    const res = JSON.parse(JSON.stringify(rows));

    if(res[0].state === null || res[0].state === undefined){

        return 404;
    }

    return res[0].state;
}