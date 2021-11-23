export default function UpdateIssues(projects, updatedIssues) {

    if (projects === null) {
        return updatedIssues;
    }
    
    updatedIssues.forEach(updatedIssue => {

        let isNewProjectExist = true;

        projects.forEach(project => {

            if (updatedIssue.id !== project.id) {
                return;
            }

            updatedIssue.issues.forEach(updatedIssue => {

                let isNewIssueExist = true;

                project.issues.forEach(issue => {

                    if (updatedIssue.id !== issue.id) {
                        return;
                    }
                    
                    issue.updated = updatedIssue.updated;

                    issue.comments = updatedIssue.comments;

                    issue.edits = updatedIssue.edits;

                    isNewIssueExist = false;
                });

                if (isNewIssueExist == false) {
                    return;
                }

                project.issues.push(updatedIssue);
            });

            isNewProjectExist = false;
        })

        if (isNewProjectExist === false) {
            return;
        }

        projects.push(updatedIssue);
    })

    return projects;
}