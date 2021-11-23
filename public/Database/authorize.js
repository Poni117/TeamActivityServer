import connectDatebase from "./connectToDatebase.js";
import request from 'request';
import dotenv from 'dotenv';
import btoa from 'btoa'
dotenv.config();

export default async function authorize(response, basicToken){
    
    const connect = connectDatebase();

    const queryString = `SELECT basicToken FROM TeamActivityDB WHERE basicToken='${basicToken}'`;
    

    connect.query(queryString, (err, res) => {
        
        if(err){
            console.log(err);
        }

        if(res.length === 0){
            response.sendStatus(401);
            return;
        }
        
        let getRefreshToken = `SELECT refresh_access_token_Bitbucket FROM TeamActivityDB WHERE basicToken='${basicToken}'`;

        connect.query(getRefreshToken, (err, res) => {
            
            request.post('https://bitbucket.org/site/oauth2/access_token', {
                form:{
                    client_id: process.env.BITBUCKET_CLIENT_ID,
                    client_secret: process.env.BITBUCKET_SECRET,
                    "grant_type": "refresh_token",
                    "refresh_token": res[0].refresh_access_token_Bitbucket,
                }
            },
            function(error, meta, body){
                
                let data = JSON.parse(body);
                
                // response.send(data['access_token']);
                
                let query = `UPDATE TeamActivityDB SET 
                accessToken_BitBucket='${data['access_token']}', 
                refresh_access_token_Bitbucket='${data['refresh_token']}'
                WHERE basicToken='${basicToken}'`
                
                connect.query(query, (err, res) => {
                    
                    if(err){
                       console.log(err);
                    }
                    else{
                        // response.sendStatus(204);
                    }
                })


                let getAccessesTokens = `SELECT accessToken_BitBucket accessToken_Jira FROM TeamActivityDB WHERE basicToken='${basicToken}'`

                connect.query(getAccessesTokens, (err, res) => {
                    
                    if(err){
                        console.log(err);
                    }
                    else{
                    }
                })
            });
        })
    });
}