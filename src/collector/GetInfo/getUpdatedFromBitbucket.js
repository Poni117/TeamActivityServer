
export default function getUpdatedFromBitbucket(bitbucket){

    if (bitbucket === null) {
        return;
    }
    const lastUpdate = {
        repositories: [],
        pullRequests:[],
    }
    
    bitbucket.map(workspace => {

        workspace.repositories.forEach(repository => {

            lastUpdate.repositories.push({uuid: repository.repository, updated: repository.updated});

            // repository.commits.forEach( commit => {

            //     lastUpdate.commits.push({id: commit.id, updated: commit.updated});

            //     commit.comments.forEach( comment => {
            //     })
            // });

            repository.pullRequests.forEach( pullRequests => {
  

                lastUpdate.pullRequests.push({id: pullRequests.id, updated: pullRequests.updated})

                // pullRequests.comments.forEach( comment => {
                    
                //     // lastUpdate.commentsPullRequests.push({ id: comment.id, lastUpdate: comment.lastUpdate});
                // })
            });
        });
   })
   
   return lastUpdate;
}