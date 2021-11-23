export default function UpdateCode(code, updatedCode, lastUpdates){
    
    if(code === null){
        return updatedCode;
    }


    updatedCode.forEach(updatedWorkspace => {

        let isNewWorkSpaceExist = true;

        code.forEach(workspace => {

            lastUpdates.workspaces.map((lastUpdatedWorkspace, index) => {
                    
                if(workspace.uuid === lastUpdatedWorkspace.uuid && lastUpdatedWorkspace.isExist === false) {
                    code.splice(index, 1);
                }
            });
            
            if (workspace.uuid !== updatedWorkspace.uuid) {
                return;
            }

            workspace.repositories.forEach((repository, index) => {     // remove deleted Repository
                lastUpdates.repositories.map((lastUpdatedRepository) => {
                    
                    if(repository.uuid === lastUpdatedRepository.uuid && lastUpdatedRepository.isExist === false) {
                        workspace.repositories.splice(index, 1);
                    }
                });
            })

            updatedWorkspace.repositories.forEach(updatedRepository => {
                
                let isNewRepositoryExist = true;

                workspace.repositories.forEach(repository => {

                    if(repository.uuid !== updatedRepository.uuid) {
                        return;
                    }

                    repository.updated = updatedRepository.updated;

                    updatedRepository.pullRequests.forEach(updatedPullRequest => {

                        let isNewPullRequestsExist = true;

                        repository.pullRequests.forEach(pullRequest => {

                            if (updatedPullRequest.id !== pullRequest.id) {
                                return;
                            }

                            pullRequest.updated = updatedPullRequest.updated;
                            
                            pullRequest.commits = updatedPullRequest.commits;

                            pullRequest.comments = updatedPullRequest.comments;

                            pullRequest.state = updatedPullRequest.state;

                            isNewPullRequestsExist = false;
                        });

                        if (isNewPullRequestsExist === false) {
                            return;
                        }
                        
                        repository.pullRequests.push(updatedPullRequest);
                        
                    });
                    
                    repository.commits = updatedRepository.commits;
                    
                    isNewRepositoryExist = false;
                })

                if (isNewRepositoryExist === false) {
                    return;
                }

                workspace.repositories.push(updatedRepository);
            });

            isNewWorkSpaceExist = false;
        });

        if (isNewWorkSpaceExist === false) {
            return;
        }

        userAccessesInformation.actionsOfEmployees.codes.push(updatedWorkspace);
    })

    return code;
}