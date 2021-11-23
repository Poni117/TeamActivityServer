import dotenv from 'dotenv';
import connectDatebase from '../connectToDatebase.js';
import isBasicTokenExist from '../isExist/isAccountExist.js';
dotenv.config();

export default async function getAccountOwner(basicToken){

    const connect = connectDatebase();

    const status = await isBasicTokenExist(basicToken);
    if(status === 404){
        return status;
    }

    const datas = {
        info: {
            accountAvatar: null,
            accountName: null,        }
    }
    
    let getUrlJira = `SELECT account_owner, account_owner_avatar FROM TeamActivityDB WHERE basicToken='${basicToken}'`;

    const[rows, fields] = await connect.query(getUrlJira);
    
    const res = JSON.parse(JSON.stringify(rows));
    
    if(res[0].account_owner === 'null' || res[0].account_owner === 'undefined'){

        datas.status = 204;
        return datas;
    }

    datas.info.accountAvatar = res[0].account_owner_avatar;
    datas.info.accountName = res[0].account_owner;

    return datas;
}