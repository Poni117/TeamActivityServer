export default function CountActions(users, projects, workspaces, spaces, date){

    const issues = {

        totalIssues: 0,
        issues: {
            numOfIssues: 0,
            numOfEditsIssue: 0,
            numOfIssuesComments: 0
        }
    }

    const codes = {

        totalCodes: 0,
        commits: {
            numOfCommits: 0,
            numOfCommitsComments: 0
        },
        pullRequests: {
            numOfPullRequests: 0,
            numOfPullRequestsComments: 0
        }
    }

    const docs = {

        totalDocs: 0,
        pages: {
            numOfPagesEdits: 0,
            numOfPagesComments: 0
        },
        blogs: {
            numOfBlogsEdits: 0,
            numOfBlogsComments: 0
        },
    }

    users.forEach(async user => {
        
        projects.forEach(async project => {

            project.issues.forEach(async issue => { //count jira issues 

                if(issue.author.accountId === user.accountId && issue.created >= date.start && issue.created <= date.end) {
                    
                    user.actions.issues.actions.numOfCreatedIssues ++;

                    user.actions.issues.numOfIssues ++;

                    user.actions.numOfActions ++;

                    issues.issues.numOfIssues ++

                    issues.totalIssues ++;
                }
                
                issue.comments.forEach(async comment => {

                    if(comment.author.accountId === user.accountId && comment.created >= date.start && comment.created <= date.end) {

                        user.actions.issues.actions.numOfCommentsIssues ++;
                        
                        user.actions.issues.numOfIssues ++;

                        user.actions.numOfActions ++;

                        issues.issues.numOfIssuesComments++;

                        issues.totalIssues++
                    }
                });

                issue.edits.forEach(async edit => {
           
                    if(edit.author.accountId === user.accountId && edit.created >= date.start && edit.created <= date.end) {

                        user.actions.issues.actions.numOfEditsIssue ++;
                        
                        user.actions.issues.numOfIssues++;

                        user.actions.numOfActions ++;

                        issues.issues.numOfIssuesComments++;

                        issues.totalIssues++
                    }
                });
            })
        });

        workspaces.map(async workspace => {

            workspace.repositories.map(async repository => {
    
                repository.pullRequests.map(async pullRequest => {
                    
                    if(pullRequest.author.accountId === user.accountId && pullRequest.created >= date.start && pullRequest.created <= date.end) {

                        user.actions.codes.actions.pullRequests.numOfPullRequests ++;

                        user.actions.codes.numOfCodes ++;

                        user.actions.numOfActions ++;
                        
                        codes.pullRequests.numOfPullRequests++;

                        codes.totalCodes ++;
                    }
                    
                    pullRequest.comments.map(async comment => {
                        
                        if(comment.author.accountId === user.accountId && comment.created >= date.start && comment.created <= date.end) {

                            user.actions.codes.actions.pullRequests.numOfPullRequestsComments ++;

                            user.actions.codes.numOfCodes ++;

                            user.actions.numOfActions ++;

                            codes.pullRequests.numOfPullRequestsComments++;

                            codes.totalCodes ++;
                        }
                    });
                });

                repository.commits.map(async commit => {

                    if(commit.author.accountId === user.accountId && commit.created >= date.start && commit.created <= date.end) {

                        user.actions.codes.actions.commits.numOfCommits ++;
                        
                        user.actions.codes.numOfCodes ++;

                        user.actions.numOfActions ++;

                        codes.commits.numOfCommits ++;

                        codes.totalCodes ++;
                    }
                    
                    commit.comments.map(async comment => {
                        
                     
                        if(comment.author.accountId === user.accountId && comment.created >= date.start &&  comment.created <= date.end) {

                            user.actions.codes.actions.commits.numOfCommitsComments ++;

                            user.actions.codes.numOfCodes ++;

                            user.actions.numOfActions ++;

                            codes.commits.numOfCommitsComments ++;

                            codes.totalCodes ++;
                        }
                    });
                });
            });
        });

        spaces.forEach(space => {

            space.pages.forEach(async page => {

                if(page.author.accountId === user.accountId && page.created >= date.start &&  page.created <= date.end) {
                    
                    user.actions.docs.actions.pages.numOfCreatedPages ++;
                }    
    
                page.edits.forEach(edit => {
                   
                    if(edit.author.accountId === user.accountId && edit.created >= date.start &&  edit.created <= date.end) {
    
                        user.actions.docs.actions.pages.numOfEditsPeges ++;
    
                        user.actions.docs.numOfDocs ++;
    
                        user.actions.numOfActions ++;
    
                        docs.pages.numOfPagesEdits ++;
    
                        docs.totalDocs ++;
                    }
                });
    
                page.comments.forEach(async comment => {
    
                    if(comment.author.accountId === user.accountId && comment.created >= date.start &&  comment.created <= date.end) {
    
                        user.actions.docs.actions.pages.numOfCommentsPeges ++;
    
                        user.actions.docs.numOfDocs ++;
    
                        user.actions.numOfActions ++;
    
                        docs.pages.numOfPagesComments ++;
    
                        docs.totalDocs++;
                    }
                });
            });
    
            space.blogs.forEach(async blog => {
    
                if(blog.author.accountId === user.accountId && blog.created >= date.start &&  blog.created <= date.end) {
    
                    user.actions.docs.actions.blogs.numOfCreatedBlogs ++;
                }
    
                blog.edits.map(edit => {
    
                    if(edit.author.accountId === user.accountId && edit.created >= date.start &&  edit.created <= date.end) {
    
                        user.actions.docs.actions.blogs.numOfEditsBlogs ++;
    
                        user.actions.docs.numOfDocs ++;
    
                        user.numOfActions ++;
    
                        docs.blogs.numOfBlogsEdits ++;
    
                        docs.blogs.totalDocs ++;
                    }
                });
    
                blog.comments.forEach(async comment => {
    
                    if(comment.author.accountId === user.accountId && comment.created >= date.start &&  comment.created <= date.end) {
    
                        user.actions.docs.actions.blogs.numOfCommentsBlogs ++;
    
                        user.actions.docs.numOfDocs ++;
                        
                        user.numOfActions ++;
    
                        docs.blogs.numOfBlogsComments ++;
                        
                        docs.blogs.totalDocs ++;
                    }
                });
            });
        });
    })

    return {
        users,
        actions: {
            issues,
            codes,
            docs
        }
    }
}
