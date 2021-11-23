import { jiraProjectNames } from "./getMacketForJira.js";

function GetMacketInfo () {
    
    return jiraInformation();
}

function jiraInformation() {

    let jiraInformation = {

        accountName: null,
        accountId: null,
        projectName: null,
        info: {
            jira: [
                jiraProjectNames()
            ],

            bitBucket: [
                bitBucketWorkspaces()
            ]
            
        }
    }

    return jiraInformation;
}

export function userLabel(){

    let userLabel = {

        accountAvatar: null,
        accountName: null,
        accountId: null,
        emailAddress: null,

        statusInformation: {

            numOfAssigned: 0,
            numOfInProgress: 0,
            numOfDone: 0
        },
        actions: {  
            
            numOfActions: 0,

            codes: {

                numOfCodes: 0,

                actions: {

                    pullRequests: {
                        numOfPullRequests: 0,
                        numOfPullRequestsComments: 0,
                        numOfOpened: 0,
                        numOfMerged: 0,
                        numOfDeclined: 0,
                        numOfSupersed: 0,
                        numOfCommits: 0
                    },
    
                    commits: {
                        numOfCommits: 0,
                        numOfCommitsComments: 0
                    }
                }
            },

            issues: {

                numOfIssues: 0,

                actions: {

                    numOfCreatedIssues: 0,
                    numOfEditsIssue: 0,
                    numOfCommentsIssues: 0
                }
            },

            docs: {

                numOfDocs: 0,

                actions: {
                    pages: {
                        numOfCreatedPages: 0,
                        numOfEditsPages: 0,
                        numOfCommentsPages: 0
                    },
                    blogs: {
                        numOfCreatedBlogs: 0,
                        numOfEditsBlogs: 0,
                        numOfCommentsBlogs: 0
                    }
                }
            }
        }
    }

    return userLabel;
}


export function bitBucketWorkspaces() {

    let workspaces =  {
        workspaceName: null,
        repositories: bitBucketRepositories()
    }

    return workspaces;
}

export function bitBucketInfoCount() {
    
    let infoCount = {
        numOfCommits: 0,
        numOfPullRequests: 0
    }

    return infoCount;
}

export function bitBucketRepositories(){

    let repositories = {
        repositoryName: null,
        infoCount: bitBucketInfoCount()
    }

    return repositories;
}


export default GetMacketInfo;