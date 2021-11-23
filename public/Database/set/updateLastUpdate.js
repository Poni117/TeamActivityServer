import connectDatebase from "../connectToDatebase.js";
import dotenv from 'dotenv';
import { getDates } from "../../../src/collector/GetInfo/Tools/tools.js";
dotenv.config();

export default async function updateLastUpdate(basicToken, lastUpdate){

    const connect = connectDatebase();

    let update = `UPDATE TeamActivityDB SET 
    last_update='${JSON.stringify(lastUpdate)}'
    WHERE basicToken='${basicToken}'`;

    connect.query(update);
}