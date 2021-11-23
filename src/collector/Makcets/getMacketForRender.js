
export default function getMacketForRender() {

    let info = {
        numOfActions: 0,
        comments:{
            numOfComments: 0,
            projects: []
        },
        commits: {
            numOfCommits: 0,
            workspaces: []
        },
        pullRequests: {
            numOfPullRequests: 0,
            workspaces: []
        },
        commentsOfPullRequests: {
            numCommentsOfPullRequests: 0,
            workspaces: []
        },
        commentsOfCommits: {
            numCommentsOfCommits: 0,
            workspaces: []
        },
        commentsPages:{
            numOfCommentsPages: 0,
            spaces: []
        }  ,
        commentsBlogPosts:{
            numOfCommentsBlogPosts: 0,
            spaces: []
        },
        editsBlogPosts: {
            numOfEditsBlogPosts: 0,
            spaces: []
        },
        editsPages: {
            numOfEditsPages: 0,
            spaces: []
        }
    }

    return info;
}