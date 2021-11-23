import connectDatebase from "../connectToDatebase.js";
import dotenv from 'dotenv';
dotenv.config();

export default async function isPasswordExist(email){
    
    const connect = connectDatebase();

    const queryString = `SELECT password FROM TeamActivityDB WHERE email='${email}'`;
    
    const [rows] = await connect.query(queryString)
    
    if (rows.length === 0) {
        return 404;
    }

    return 200;
}