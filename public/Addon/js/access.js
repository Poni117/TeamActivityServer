let state = localStorage.getItem('state');

let bitbucketAccess = document.querySelector('.access-successful-bitbucket');
let jiraAccess = document.querySelector('.access-successful-jira');

if(bitbucketAccess === null){

    let resB = await fetch(`/is_bitbucket_accessToken_exist`,{
        headers:{
            "Authorization": localStorage.getItem('basicToken')
        }
    });

    if(resB.status === 200){

        let bitbucket = document.querySelector('.no-access-bitbucket');

        bitbucket.classList.remove('no-access-bitbucket');
        bitbucket.classList.add('access-successful-bitbucket');
        bitbucket.innerText = 'access-successful';
    }
}

if(jiraAccess === null){

    let resJ = await fetch(`/is_jira_accessToken_exist`,{
        headers:{
            "Authorization": localStorage.getItem('basicToken')
        }
    });

    if(resJ.status === 200){

        let jira = document.querySelector('.no-access-jira');

        jira.classList.remove('no-access-jira');
        jira.classList.add('access-successful-jira');
        jira.innerText = 'access-successful';
    }
}

document.getElementById('btn-bitBucket').onclick = async () =>{
    window.open(`/access_bitbucket?state=${state}`);
}

document.getElementById('btn-jira').onclick = async () =>{
    window.open(`/access_jira?state=${state}`);
}
