import request from 'request';
import dotenv from 'dotenv';
import updateBitBucketAccessToken from '../../public/Database/set/updateBitBucketAccessToken.js';
import fetch from 'node-fetch';
import FormData from 'form-data';

export default async function refreshBitBucketAcesssToken(refreshAccessToken, state) {

    let formData = new FormData();

    formData.append('client_id', `${process.env.BITBUCKET_CLIENT_ID}`);
    formData.append('client_secret', `${process.env.BITBUCKET_SECRET}`);
    formData.append('grant_type', 'refresh_token');
    formData.append('refresh_token', `${refreshAccessToken}`);

    const promise = await fetch('https://bitbucket.org/site/oauth2/access_token', {

        method: "POST",

        body: formData
    });

    const datas = await promise.json();

    updateBitBucketAccessToken(datas, state);

    return datas['access_token'];
}