import connectDatebase from "../connectToDatebase.js";
import dotenv from 'dotenv';
import isBasicTokenExist from "../isExist/isAccountExist.js";
dotenv.config();

export default async function DeleteAccount(basicToken){

    const connect = connectDatebase();

    let status = isBasicTokenExist(basicToken);

    if (status === 404) {
        return 404
    }

    let update = `DELETE FROM TeamActivityDB WHERE 
    basicToken='${basicToken}'`;
    
    try {
        connect.query(update);
    } catch (error) {
        console.log(error)        
    }

    return 200;
}