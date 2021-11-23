import dotenv from 'dotenv';
import connectDatebase from '../connectToDatebase.js';
import isBasicTokenExist from '../isExist/isAccountExist.js';
dotenv.config();

export default async function getAccountOwnerAvatar(basicToken){

    const connect = connectDatebase();

    const status = await isBasicTokenExist(basicToken);
    if(status === 404){
        return status;
    }

    const datas = {
        status: null,
        actions: null
    }
    
    let getUrlJira = `SELECT account_owner_avatar FROM TeamActivityDB WHERE basicToken='${basicToken}'`;

    const[rows, fields] = await connect.query(getUrlJira);
    
    const res = JSON.parse(JSON.stringify(rows));
    
    if(res[0].account_owner_avatar === 'null' || res[0].account_owner_avatar === 'undefined'){

        datas.status = 204;
        return datas;
    }

    datas.status == 200;
    
    datas.actions = res[0].account_owner_avatar;

    return datas;
}