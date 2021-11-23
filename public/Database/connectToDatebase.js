import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const connect = mysql.createPool({
    connectionLimit: 10000,
    queueLimit: 1000,
    host: process.env.HOST,
    user: process.env.USER_ID,
    database: process.env.DATEBASE,
    password: process.env.PASSWORD
});

const promisePool = connect.promise();

const selectDatabase = `USE ${process.env.DATEBASE}`;

connect.query(selectDatabase, (err, res) => {

    if(err){
        console.log(err);
    }
    else{
        console.log('Datebase selected |TeamActivityDB|');
    }
    
});

export default function connectDatebase(){
    
    return promisePool;
}