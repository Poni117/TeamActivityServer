export function jiraProjectNames(){

    const projectNames =  {

        projectName: null,

        datas: [
            jiraMacketProjectNameInfo()
        ]
    }
    
    return projectNames;
}

export function jiraMacketProjectNameInfo(){

    let jiraInfoProject = [{
        
        projectName: null,
        datas: jiraMacketProjectKeyInfo()
        }]

    return jiraInfoProject
}

export function jiraMacketProjectKeyInfo(){z
    let prijectKeyInfo = []

    return prijectKeyInfo;
}
export function jiraProjectKeyData(){

    let datas = {
            projectKey: null,
            numOfComments: 0
    }

    return datas
}
