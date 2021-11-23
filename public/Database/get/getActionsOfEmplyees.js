import dotenv from 'dotenv';
import connectDatebase from '../connectToDatebase.js';
import isBasicTokenExist from '../isExist/isAccountExist.js';
dotenv.config();

export default async function getActionsOfEmplyees(basicToken){

    const connect = connectDatebase();

    const datas = {
        status: null,
        actions: null
    }
    
    let getUrlJira = `SELECT actionsOfEmployees FROM TeamActivityDB WHERE basicToken='${basicToken}'`;

    const[rows, fields] = await connect.query(getUrlJira);
    
    const res = JSON.parse(JSON.stringify(rows));
    
    const teamActivity = JSON.parse(res[0].actionsOfEmployees.replace(/\n+/g, ''));

    if(teamActivity.users === null || teamActivity.issues === null || teamActivity.codes === null ||  teamActivity.docs === null){
        datas.status = 204;
        return datas;
    }

    if(teamActivity.users === "null" || teamActivity.issues === "null" || teamActivity.codes === "null" ||  teamActivity.docs === "null"){
        datas.status = 204;
        return datas;
    }

    datas.status = 200;
    datas.actions = res[0].actionsOfEmployees;

    return datas;
}