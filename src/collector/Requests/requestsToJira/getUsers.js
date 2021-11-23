import fetch from "node-fetch"; 

export default async function getUsers(accessToken, key, accessId){

    let usersInfo = {
        projectName: key,
        datas: null
    }

    let url = '/rest/api/2/user/assignable/search?project=' + key;

    const res = await fetch(`https://api.atlassian.com/ex/jira/${accessId}${url}`, {
        headers:{
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const data = await res.json();
    usersInfo.datas = data;

    return usersInfo;
}