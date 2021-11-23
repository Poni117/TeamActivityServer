import connectDatebase from '../connectToDatebase.js';
import isBasicTokenExist from '../isExist/isAccountExist.js';

export default async function getConfluenceRefreshToken(basicToken){

    const connect = connectDatebase();

    let status = isBasicTokenExist(basicToken);
    
    if (status === 404) {
        return
    }

    let getRefreshToken = `SELECT refresh_access_token_Confluence FROM TeamActivityDB WHERE basicToken='${basicToken}'`;

    let [rows] = await connect.query(getRefreshToken);

    return JSON.parse(JSON.stringify(rows[0].refresh_access_token_Confluence));
}