
export function isAccountIdExistInList(listOfUsers, user){

    let isAccountIdExist = false;

    if(listOfUsers.length == 0){

        return isAccountIdExist;
    }

    listOfUsers.map(currentUser => {

        if(currentUser.accountId == user.accountId){
            isAccountIdExist = true;
        }
    });

    return isAccountIdExist;
}

export function getUsers(macketOfUsers){

    let users = [];
    
    macketOfUsers.map(macketOfUser => {
         if(isAccountIdExistInList(users, macketOfUser) === false){

            users.push(JSON.parse(JSON.stringify(macketOfUser)));

            return;
        }
    });

    return users;
}
export function showUserInfo(user){
     
    user.workspaces.map(workspace => {
        workspace.repositoriesName.map(repositoryName => {
        })
    });
}

export function showUsersInfo(users){

users.map(user => {
    showUserInfo(user);
});
}

export function getIdenticalAndUnIndenticalUsers(searchedListOfUsers, listOfUsers){
    
    let users = {
        existingUsers: null,
        unExistingUsers: null
    }

    let existingUsers = [];
    let unExistingUsers = [];
    
    listOfUsers.map(currentUser => {
        
        let isUserExist = false;
        
            searchedListOfUsers.map(user => {

            if(user.user.accountId == currentUser.user.accountId){
                isUserExist = true;
            }
        })

        if(isUserExist == true){
            existingUsers.push(JSON.parse(JSON.stringify(currentUser)));
        }
        else{
            unExistingUsers.push(JSON.parse(JSON.stringify(currentUser)));
        }
    });

    users.existingUsers = existingUsers;
    users.unExistingUsers = unExistingUsers;
    
    return users;
}

export function getAllUsers(infoUsersJira){

    let allUsers = [];

    infoUsersJira.users.map(curentUser => {

        allUsers.push(JSON.parse(JSON.stringify(curentUser)));
    })

    return allUsers;

}

export function countActionsbyUser(user, determinate){

    let num = 0;

    if (determinate === 'commits' || determinate === 'pullRequests' || determinate === 'commentsOfCommits' || determinate === 'commentsOfPullRequests') {
        num = countActionsCommitsOrPullRequests(user, determinate);
    }

    if (determinate === 'commentsJira') {
        num = countActionJiraComments(user, determinate);
    }

    if (determinate === 'commentsPages' || determinate === 'commentsBlogs') {
        num = countActionConfluence(user, determinate)
    }

    if (determinate === 'editsPages' || determinate === 'editsBlogs') {
        num = countActionConfluence(user, determinate)
    }


    return num;
}

function initializeMacketForRender(){

    let macketForRender

}

function countActionJiraComments(user){

    let num = 0;
    
        user.projects.map(project => {
            project.issues.map(issue => {

                let numOfCommentsIssue = 0;

                issue.actions.map(action =>{
                    
                    num = num + action.numOfComments;
                    numOfCommentsIssue++;
                })
                issue.numOfComments = numOfCommentsIssue;
            })
        });
    
    return num;
}

function countActionConfluence(user, determinate){

    let num = 0;
    
    user.spaces.map(space => {
        
        let currentAction = null;
        
        if(determinate === "commentsBlogs"){
            
            currentAction = space.action.numOfCommentsBlogPosts
        }
        
        if(determinate === "commentsPages"){
            
            currentAction = space.action.numOfCommentsPages;
        }
        
        if(determinate === "editsPages"){
            
            currentAction = space.action.numOfEditsPages;
          
        }

        if(determinate === "editsBlogs"){
            
            currentAction = space.action.numOfEditsBlogPosts;
        }

        num = num + currentAction;

    });

    return num;
}
export function countActionsCommitsOrPullRequests(user, determinate){

    let typeOfAction = null;
  
    let num = 0;

    
    user.workspaces.map(workspace => {
        workspace.repositoriesName.map(repository => {
            repository.actions.map(action => {
                
                if(determinate == 'pullRequests'){
                    typeOfAction = action.numOfPullRequests;
                }

                if(determinate == 'commits'){
                    typeOfAction = action.numOfCommits;
                }

                if(determinate == 'commentsOfCommits'){
                    typeOfAction = action.numCommentsOfCommits;
                }

                if (determinate == 'commentsOfPullRequests') {
                
                    typeOfAction = action.numCommentsOfPullRequests;
                }

                num = num + typeOfAction;
            });
        });
    });

    return num;
}

function getAllUsersInfoFromJira(allUsers, infoUsersJira){


    infoUsersJira.comments.map(user => {
       
        allUsers.map(currentUser => {

            if(currentUser.user.accountId == user.user.accountId){
                
                currentUser.jira = [];
                currentUser.jira.push({

                    projects: user.projects,
                    comments: user.commentInfo
                });
            }
        });

    });

    return allUsers;
}

export function isSpacesExist(users, space){
    
    let isExist = false;

    users.map(user.spaces.map(space => {

        if (space === this.space) {
            isExist = true;
        }
    }));

    return isExist;
}
export function getIsExistInfo(comparedUser, soughtUser) {

    let isExistInfo = {
         isAccountIdExist: false,
         isWorkspaceExist: false,
         isRepositoryNameExist: false,
    }

    soughtUser.workspaces.map(sougthWorkspace => {
         sougthWorkspace.repositoriesName.map(sougthRepositoryName => {

              comparedUser.workspaces.map(currentComparedWorkspace => {
                   currentComparedWorkspace.repositoriesName.map(currentComparedRepositoryName => {

                        if(soughtUser.user.accountId == comparedUser.user.accountId){
                             isExistInfo.isAccountIdExist = true;

                             if(sougthWorkspace.workspaceName == currentComparedWorkspace.workspaceName){
                                  isExistInfo.isWorkspaceExist = true;

                                  if(sougthRepositoryName.repositoryName == currentComparedRepositoryName.repositoryName){
                                       isExistInfo.isRepositoryNameExist = true;
                                  }
                             }
                        }
                   });
              });
         });
    });
        
    return isExistInfo;
}

export function getDates(){

    let date = new Date();
    
    let year = date.getFullYear()
    let month = date.getMonth();
    
    if(month < 10){
        month =  month + 1;
        month = '0' + month
    }

    let endDay = null;

    if(month == '02' || month == '04' || month == '07' || month == '09' || month == '11'){

        endDay = '30';
    }
    else{
        endDay = '31';
    }
    

    let dates = {
        start: year + '-' + month + '-' + '01',
        end: year + '-' + month + '-' + endDay
    }

    return dates;
}
