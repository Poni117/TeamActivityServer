import DeleteAccount from "../../../public/Database/remove/deleteAccount.js";


export default async function DeleteRoutes(app){

    app.delete('/account', async ({headers: {authorization}}, response) => {

        const status = await DeleteAccount(authorization);

        response.status(status).send();
    });
}