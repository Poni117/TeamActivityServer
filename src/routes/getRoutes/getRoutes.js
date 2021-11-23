import getBitBucketAccessToken from "../../../public/Database/get/getBitbucketAccessToken.js";
import getJiraAccessToken from "../../../public/Database/get/getJiraAccessToken.js";

import getAccesses from "../../../public/Database/authorize.js";
import getState from "../../../public/Database/get/getState.js";

import isBitBucketAccessTokenExist from "../../../public/Database/isExist/isBitBucketAccessTokenExist.js";
import isJiraAccessTokenExist from "../../../public/Database/isExist/isJiraAccessTokenExist.js";

import authorizationOnBitbucket from "../../authorizationsAtlassian/authorizationOnBitbucket.js";
import authorizationOnJira from "../../authorizationsAtlassian/authorizationOnJira.js";

import isBasicTokenExist from "../../../public/Database/isExist/isAccountExist.js";
import dotenv from 'dotenv';
import getActionsOfEmplyees from "../../../public/Database/get/getActionsOfEmplyees.js";
import getDomen from "../../../public/Database/get/getDomen.js";
import isContentExist from "../../../public/Database/isExist/isActionsOfEmployeesExist.js";
import authorizationOnConfluence from "../../authorizationsAtlassian/authorizationOnConfluence.js";
import getConfluenceAccessToken from "../../../public/Database/get/getConfluenceAccessToken.js";
import isConfluenceAccessTokenExist from "../../../public/Database/isExist/isConfluenceAccessTokenExist.js";
import isAccessesExist from "../../../public/Database/isExist/isAccessesExist.js";
import getAccountOwner from "../../../public/Database/get/getAccountOwner.js";
import getAccountOwnerAvatar from "../../../public/Database/get/getAccountOwnerAvatar.js";
import getScopesError from "../../../public/Database/get/getScopesError.js";
import Verefication from "../../../public/Database/get/verefication.js";
dotenv.config();

export default async function getRoutes(app){
    
    app.get("/", function(request, response){
        response.render('registrationForm');
    });

    app.get('/access', (request, response) => {
        response.render('AccessForm');
    });
    
    app.get("/access_bitbucket", function({query: {state}}, response){

        response.redirect(`https://bitbucket.org/site/oauth2/authorize?client_id=${process.env.BITBUCKET_CLIENT_ID}&state=${state}&response_type=code`);
    });


    app.get("/access_confluence", function({query: {state}}, response){
        
        response.redirect(`https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=UUx6vFZICsrsR35S0zlfqnbnDCi1VN6O&scope=read%3Aconfluence-content.summary%20read%3Aconfluence-space.summary%20read%3Aconfluence-props%20read%3Aconfluence-content.all%20read%3Aconfluence-content.permission%20read%3Aconfluence-user%20read%3Aconfluence-groups%20search%3Aconfluence%20offline_access&&redirect_uri=https%3A%2F%2Fteamactivity.herokuapp.com%2Fcallback_jira&state=${state}&response_type=code&prompt=consent`);
    });

    app.get('/access_jira', function({query: {state}}, response){

        response.redirect(`https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=UUx6vFZICsrsR35S0zlfqnbnDCi1VN6O&scope=read%3Ajira-work%20read%3Ajira-user%20read%3Ame%20read%20offline_access&redirect_uri=https%3A%2F%2Fteamactivity.herokuapp.com%2Fcallback_jira&state=${state}&response_type=code&prompt=consent`)
    });
    
    app.get('/authorize', (request, response) => {
        response.render('loginForm');
    });

    app.get('/callback_bitbucket', async ({query: {code, state}}, res) => {

        res.send("<script>window.close();</script>");
        
        if (code === undefined) {
            return;
        }

        res.status(200).send();

        authorizationOnBitbucket(code, state);

    })

    app.get('/callback_jira', ({query: {code, state}}, res) => {
        
        res.send("<script>window.close();</script>");
        
        if (code === undefined) {
            return;
        }

        if(state[0] === 'J'){

            authorizationOnJira(code, state.slice(2));
        }

        if(state[0] === 'C'){

            authorizationOnConfluence(code, state.slice(2));
        }
    })

    app.get('/get_bitbucket_access_token', ({headers: {authorization}}, response) =>{

        getBitBucketAccessToken(response, authorization);
    });

    app.get('/get_jira_access_token', ({headers: {authorization}}, response) =>{

        getJiraAccessToken(response, authorization);
    });


    app.get('/get_confluence_access_token', ({headers: {authorization}}, response) =>{

        getConfluenceAccessToken(response, authorization);
    });

    app.get('/getAccesses', ({headers: {authorization}}, response) => {

        getAccesses(response, authorization);
    });

    app.get('/get_state', async ({headers: {authorization}}, response) => {

        response.json(await getState(authorization));
    });

    app.get('/is_bitbucket_accessToken_exist', async ({headers: {authorization}}, response) => {

        const status = await isBitBucketAccessTokenExist(authorization);

        response.status(status).send();
    });

    app.get('/is_jira_accessToken_exist', async ({headers: {authorization}}, response) => {

        const status = await isJiraAccessTokenExist(authorization);

        response.status(status).send();
    });

    app.get("/is_accesses_exist", async ({headers: {authorization}}, response) => {

        response.json(await isAccessesExist(authorization));
    });

    app.get('/is_confluence_accessToken_exist', async ({headers: {authorization}}, response) => {

        const status = await isConfluenceAccessTokenExist(authorization);

        response.status(status).send();
    });

    app.get('/is_account_exist', async ({headers: {authorization}}, response) => {
        
        let status = await isBasicTokenExist(authorization);

        response.status(status).send();
    });

    app.get('/contacts', async (request, response) => {
        
        response.status(200).send();
    });

 
   

    app.get('/get_actions_of_employees', async ({headers: {authorization}}, response) => {

        let status = await isBasicTokenExist(authorization);
        
        if (status === 401) {
            response.status(status).send();
            return;
        }
        
        
        const data = await getActionsOfEmplyees(authorization);
        
        if (data.status === 204) {
            response.status(data.status).send();
            return;
        }

        response.json(data.actions);

    })

    app.get('/account_owner', async ({headers: {authorization}}, response) => {

        let status = await isBasicTokenExist(authorization);
        
        if (status === 401) {
            response.status(status).send();
            return;
        }
        
        const data = await getAccountOwner(authorization);

        response.json(data);

    })

    app.get('/account_owner_avatar', async ({headers: {authorization}}, response) => {

        let status = await isBasicTokenExist(authorization);
        
        if (status === 401) {
            response.status(status).send();
            return;
        }
        
        
        const data = await getAccountOwnerAvatar(authorization);
        
        if (data.status === 204) {
            response.status(data.status).send();
            return;
        }

        response.json(data.actions);

    })
    
    app.get('/is_content_exist', async ({headers: {authorization}}, response) => {

        let status = await isBasicTokenExist(authorization);

        if (status === 401) {
            response.status(status).send();
            return;
        }

        let statusContent = await isContentExist(authorization);

        response.status(statusContent).send();
    });

    app.get('/scopes_error', async ({headers: {authorization}}, response) => {

        let status = await isBasicTokenExist(authorization);
        
        if (status === 401) {
            response.status(status).send();
            return;
        }
        
        const data = await getScopesError(authorization);
        
        if (data === 401) {
            response.status(data).send();
            return;
        }

        response.json(data);

    })

    app.get('/domen', async ({headers: {authorization}}, response) => {

        let status = await isBasicTokenExist(authorization);

        if (status === 401) {
            response.status(status).send();
            return;
        }

        let domen = await getDomen(authorization);
        
        response.json(domen);
    });

    app.get('/hook', async (requests,  response) => {

        console.log('hook', requests)
    });

    app.get('/privacy', async (request, response) => {
        
        response.render('privacy');
    });
}
