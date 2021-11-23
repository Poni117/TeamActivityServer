import connectDatebase from "../connectToDatebase.js";
import dotenv from 'dotenv';
dotenv.config();

export default async function updateActionsOfEmployees(actionsOfEmployees, basicToken){

    const connect = connectDatebase();
    
    let update = `UPDATE TeamActivityDB SET 
    actionsOfEmployees='${JSON.stringify(actionsOfEmployees)}',
    sizeOfDatas='${ConvertSize(JSON.stringify(actionsOfEmployees).length)}'
    WHERE basicToken='${basicToken}'`
    
    try {
        connect.query(update);
        
    } catch (error) {
        console.log(error)
    }
}

function ConvertSize(charsLength){

    return Math.ceil(charsLength / 1000000);
}