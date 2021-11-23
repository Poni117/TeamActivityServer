import updateScopesErrorConfluence from "../../public/Database/set/updateScopesErrorConfluence.js";

export default function checkNecessaryScopesConfluence(userScopes, accessToken){
    
    const confluenceScopes = [
           
        'search:confluence',
        'read:confluence-props',
        'read:confluence-space.summary',
        'read:confluence-content.summary',
        'read:confluence-content.all',
        'read:confluence-groups',
        'read:confluence-user',
        'read:confluence-content.permission'
    ]
    
    const unExistingScopes = [];

    userScopes.map(userScope => {
    
        let isScopeExist = false;
    
        confluenceScopes.map(scope => {
    
            if(userScope === scope){
    
                isScopeExist = true;
            }
        })
        
        if(isScopeExist === false){

            unExistingScopes.push(scope);
        }

    })

    if (unExistingScopes.length === 0) {

        updateScopesErrorConfluence(false, accessToken);
        return;
        
    }
    updateScopesErrorConfluence(unExistingScopes, accessToken);
}
