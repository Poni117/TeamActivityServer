import dotenv from 'dotenv';
import connectDatebase from '../connectToDatebase.js';
dotenv.config();

export default async function getBasicTokens(){

    const connect = connectDatebase();

    let getRefreshToken = `SELECT basicToken FROM TeamActivityDB`;

    let [rows] = await connect.query(getRefreshToken);

    return JSON.parse(JSON.stringify(rows));
}