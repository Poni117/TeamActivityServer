import dotenv from 'dotenv';
import connectDatebase from '../connectToDatebase.js';
dotenv.config();

export default async function isContentExist(basicToken){

    const connect = connectDatebase();

    const queryString = `SELECT actionsOfEmployees FROM TeamActivityDB WHERE basicToken='${basicToken}'`;
    
    try{
        const [textRow] = await connect.query(queryString)
        
        if (textRow[0].actionsOfEmployees === null || textRow[0].actionsOfEmployees === "undefined") {
            return 404;
        }
        
        return 200;
    }
    catch(err){
        return 500;
    }
}