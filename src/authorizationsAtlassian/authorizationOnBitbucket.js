import request from 'request';
import dotenv from 'dotenv';
import updateBitBucketAccessToken from '../../public/Database/set/updateBitBucketAccessToken.js';

export default async function authorizationOnBitbucket(code, state){

    request.post('https://bitbucket.org/site/oauth2/access_token', {
        form:{
            client_id: process.env.BITBUCKET_CLIENT_ID,
            client_secret: process.env.BITBUCKET_SECRET,
            "code": code,
            "grant_type": "authorization_code",
        }
    },
    function(error, meta, body){

        updateBitBucketAccessToken(JSON.parse(body), state)
        return
    })

}