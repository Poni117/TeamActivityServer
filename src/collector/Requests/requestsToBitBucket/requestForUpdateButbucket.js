import fetch from "node-fetch";
export default async function RequestForUpdateButbucket(url, accessToken, determinant, lastUpdates){
    // console.log(`===============================${determinant}===============================`)

    const datas = {
        updated: [],
        new: []
    }
    
    const res = await fetch(url, {
        
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    
    const response = await res.json();

    await Promise.all(response.values.map(async value => {
         
        let data = {};

        if(determinant === 'workspace'){

            data.workspace = value.slug;
            
            data.repositories = await RequestForUpdateButbucket(value.links.repositories.href, accessToken, 'repositories', lastUpdates);
            
            datas.updated.push(data);
        }

        if(determinant === 'repositories'){

            let isRepositoryExist = false;

            await Promise.all(lastUpdates.repositories.map(async repository => {

                if (repository.id !== value.slug){
                    return;
                }

                isRepositoryExist = true;

                if (repository.updated >= value.updated_on) {
                    return;
                }
                 
                data.repository = value.slug;
    
                data.updated = value.updated_on;
    
                data.updatedPullRequests = await RequestForUpdateButbucket(`${value.links.pullrequests.href}?state=MERGED,SUPERSEDED,OPEN,DECLINED`, accessToken, 'pullRequests', lastUpdates);

                data.updatedCommits = await RequestForUpdateButbucket(`${value.links.commits.href}`, accessToken, 'commits', lastUpdates);
                
                datas.updated.push(data);


            }));

            if(isRepositoryExist === false){
               
                data.created = value.created_on,

                data.updated = value.updated_on;

                data.repository = value.slug

                data.author = {

                    accountId: value.owner.account_id,

                    accountName: value.owner.nickname
                }

                data.pullRequests = await RequestsToBitBucket(`${value.links.pullrequests.href}?state=MERGED`, accessToken, 'pullRequests');
                
                data.commits = await  RequestsToBitBucket(value.links.commits.href, accessToken, 'commits');

                datas.new.push(data);
            }
        }

        if (determinant === 'pullRequests') {

            let isPullrequestExist = false;

            await Promise.all(lastUpdates.pullRequests.map(async pullRequest => {

                if (pullRequest.id !== value.id){
                    return;
                }

                isPullrequestExist = true;

                if (pullRequest.updated >= value.updated_on) {
                    return;
                }
                
                data.id = value.id

                data.title = value.title;

                data.brunch = value.destination.branch;

                data.created = value.created_on;

                data.updated = value.updated_on;

                data.author = {

                    accountId: value.author.account_id,

                    accountName: value.author.nickname
                }

                data.updatedComments = await RequestForUpdateButbucket(`${value.links.comments.href}`, accessToken, 'comments', lastUpdates);
                
                datas.updated.push(data);
            }));
            
            if (isPullrequestExist === false) {
                
                data.id = value.id
    
                data.title = value.title;
    
                data.brunch = value.destination.branch;
    
                data.created = value.created_on;
    
                data.updated = value.updated_on;
    
                data.author = {
    
                    accountId: value.author.account_id,
    
                    accountName: value.author.nickname
                }
    
                data.comments = await RequestForUpdateButbucket(value.links.comments.href, accessToken, 'comments');
    
                datas.new.push(data);
            }
        }

        if(determinant === 'commits'){

            data.id = value.id;

            data.created = value.created_on;

            data.author = {

                accountId: value.author.account_id,

                accountName: value.author.nickname
            }

            datas.new.push(data)
        }

        if (determinant === 'comments') {

            
            if (value.user.account_id === undefined) {
                return;
            }

            data.comment = value.content.raw;

            data.updated = value.updated_on;

            data.author = {
                
                accountId: value.user.account_id,

                accountName: value.user.nickname
            }

            datas.new.push(data);
        }
    }));

    return datas;
}