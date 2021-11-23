import connectDatebase from "../connectToDatebase.js";
import dotenv from 'dotenv';
dotenv.config();

export default async function updateCurrentActionsOfEmplyees(actionsOfEmployess, basicToken){

    const connect = connectDatebase();

    let update = `UPDATE TeamActivityDB SET 
    currentActionsOfEmployees='${JSON.stringify(actionsOfEmployess)}'
    WHERE basicToken='${basicToken}'`
    
    try {
        connect.query(update);
        
    } catch (error) {
        console.log(error)
    }
}