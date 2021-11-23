import isBasicTokenExist from "../../../public/Database/isExist/isAccountExist.js";
import registartion from "../../../public/Database/registartion.js";
import collectInformation from "../../collector/GetInfo/collectInformation.js";

export default async function postRoutes(app){

    app.post('/registration', async ({body: {accountId}}, response) => {
        console.log('==========================')

        console.log(accountId)
        console.log('==========================')
        try{
            const status = await registartion(accountId);
            response.status(status).send();

        }
        catch(err){
            response.status(500).send();
            console.log(err);

        }
    });

    app.post('/collect_information', async ({headers:{authorization}}, response) => {

        response.status(201).send();
        
        collectInformation(authorization);
    })
}