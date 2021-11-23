import updateScopesErrorJira from "../../public/Database/set/updateScopesErrorJira.js";

export default function checkNecessaryScopesJira(userScopes, accessToken_Jira){
    const jiraScopes = [
        'read:jira-work', 'read:jira-user'
    ]
    
    const unExistingScopes = [];

    userScopes.map(userScope => {
    
        let isScopeExist = false;
    
        jiraScopes.map(scope => {
    
            if(userScope === scope){
    
                isScopeExist = true;
            }
        })
        
        if(isScopeExist === false){

            unExistingScopes.push(scope);
        }

    })
    
    if (unExistingScopes.length === 0) {

        updateScopesErrorJira(false, accessToken_Jira);

        return;
    }
    
    updateScopesErrorJira(unExistingScopes, accessToken);
}
