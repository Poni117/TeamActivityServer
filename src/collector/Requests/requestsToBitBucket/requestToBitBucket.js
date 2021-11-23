import fetch from "node-fetch";

export default async function RequestToBitBucket(url, accessToken, determinant, lastUpdates){
    // console.log(`===============================${determinant}===============================`)
   
    let datas = [];
    
    const res = await fetch(url, {
        
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    
    const response = await res.json();

    await Promise.all(response.values.map(async value => {
        
        let data = {};
        
        if(determinant === 'workspace'){
            
            lastUpdates.workspaces.map(workspace => {

                if (workspace.isExist === undefined) {

                    workspace.isExist = false;
                }

                if (workspace.uuid === value.uuid) {

                    workspace.isExist = true;
                }
         
            });

            data.workspace = value.slug;
            
            data.uuid = value.uuid;
            
            data.repositories = await RequestToBitBucket(value.links.repositories.href, accessToken, 'repositories', lastUpdates);
            
            datas.push(data);
        }
        
        if(determinant === 'repositories'){
            
            let isRepositoryExist = false;

            let isUpdateExist = false;

            lastUpdates.repositories.map(repository => {
                
                if (repository.uuid === value.uuid) {

                    repository.isExist = true;
                }

                if (repository.uuid === value.uuid && repository.updated !== value.updated_on) {
                    isUpdateExist = true;
                    isRepositoryExist = true; 
                }

                if (repository.uuid === value.uuid && repository.updated === value.updated_on) {

                    isRepositoryExist = true; 
                }

                if (repository.isExist === undefined) {

                    repository.isExist = false;
                }
            });

          
            if(isRepositoryExist && isUpdateExist == false){
                return;
            }

            data.uuid = value.uuid;

            data.created = value.created_on

            data.updated = value.updated_on;

            data.repository = value.slug

            data.author = {

                accountId: value.owner.account_id,

                accountName: value.owner.nickname
            }
            
            data.branches = await RequestToBitBucket(`${value.links.branches.href}`, accessToken, 'branches', lastUpdates);
            
            data.pullRequests = await RequestToBitBucket(`${value.links.pullrequests.href}?state=MERGED,SUPERSEDED,OPEN,DECLINED`, accessToken, 'pullRequests', lastUpdates);
            
            data.commits = await  RequestToBitBucket(`${value.links.commits.href}`, accessToken, 'commits', lastUpdates);

            datas.push(data);
        }

        if (determinant === 'branches') {
  
            data.name = value.name;

            data.hash = value.target.hash;

            data.created = value.target.date;

            data.author = {

                accountId: value.target.author.user.account_id,

                accountName: value.target.author.user.display_name
            }

            // data.comments = await RequestToBitBucket(value.target.links.comments.href, accessToken, 'comments');

            datas.push(data);
        }

        if (determinant === 'pullRequests') {

            let isPullrequestExist = false;

            let isUpdateExist = false;

            lastUpdates.pullRequests.map(pullRequest => {
                
                if (pullRequest.id === value.id && pullRequest.updated !== value.updated_on){

                    isPullrequestExist = true;
                    isUpdateExist = true;
                    return;
                }

                if (pullRequest.uuid === value.uuid && pullRequest.updated === value.updated_on) {

                    isPullrequestExist = true; 
                    return;
                }
            });
            
            if(isPullrequestExist && isUpdateExist == false){
                return;
            }


            data.id = value.id

            data.title = value.title;

            data.state = value.state,

            data.destination = {
                uuid: value.destination.repository.uuid,
                repository: value.destination.repository.name,
                branch: value.destination.branch.name
            }

            data.branch = value.destination.branch.name;

            data.created = value.created_on

            data.updated = value.updated_on;

            data.author = {

                accountId: value.author.account_id,

                accountName: value.author.nickname
            }

            data.commits = await RequestToBitBucket(value.links.commits, accessToken, 'commits', lastUpdates);
            
            data.comments = await RequestToBitBucket(value.links.comments.href, accessToken, 'comments');

            datas.push(data);
        }

        if(determinant === 'commits'){

            data.hash = value.hash;

            data.created = value.date;

            data.author = {

                accountId: value.author.user.account_id,

                accountName: value.author.user.nickname
            }

            datas.push(data)
        }

        if (determinant === 'comments') {

            
            if (value.user.account_id === undefined) {
                return;
            }

            data.comment = value.content.raw;

            data.created = value.created_on;

            data.author = {
                
                accountId: value.user.account_id,

                accountName: value.user.nickname
            }

            datas.push(data);
        }
    }));

    if(response.next !== undefined) {
        const nextPages = await RequestToBitBucket(response.next, accessToken, determinant, lastUpdates);
        nextPages.forEach(page => {
            datas.push(page);
        });
    }

    return datas;
}