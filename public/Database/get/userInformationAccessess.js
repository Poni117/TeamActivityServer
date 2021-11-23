import dotenv from 'dotenv';
import refreshBitBucketAcesssToken from '../../../src/authorizationsAtlassian/refreshBitBucketAcesssToken.js';
import refreshConfluenceAccessToken from '../../../src/authorizationsAtlassian/refreshConfluenceAccessToken.js';
import refreshJiraAccessToken from '../../../src/authorizationsAtlassian/refreshJiraAccessToken.js';
import connectDatebase from '../connectToDatebase.js';
import isBasicTokenExist from '../isExist/isAccountExist.js';
dotenv.config();

export default async function  UserInformationAccessess(basicToken){

    const connect = connectDatebase();

    let getRefreshToken = `SELECT 
    state,
    accessToken_BitBucket,
    accessToken_Jira,
    accessToken_Confluence,
    refresh_access_token_Bitbucket,
    refresh_access_token_Jira,
    refresh_access_token_Confluence,
    actionsOfEmployees,
    url_Jira,
    access_id_Jira,
    access_id_Confluence,
    account_owner, 
    account_owner_avatar,
    last_update
    FROM TeamActivityDB WHERE basicToken='${basicToken}'`;
    
    let [rows] = await connect.query(getRefreshToken);

    const res = JSON.parse(JSON.stringify(rows[0]));
        
    const userInformationAccessess = {
        status: 200,
        state: res.state,
        accessTokens: {
            jira: await refreshJiraAccessToken(res.refresh_access_token_Jira, res.state),
            confluence: await refreshConfluenceAccessToken(res.refresh_access_token_Confluence, res.state),
            bitbucket: await refreshBitBucketAcesssToken(res.refresh_access_token_Bitbucket, res.state),
        },
        jiraId: res.access_id_Jira,
        confluenceId: res.access_id_Confluence,
        actionsOfEmployees: JSON.parse(res.actionsOfEmployees.replace(/\n+/g, '')),
        urlAtlassian: res.url_Jira,
        accountOwner: res.account_owner,
        accountAvatar: res.account_owner_avatar,
        lastUpdate: JSON.parse(res.last_update)
    }

    return userInformationAccessess;
}