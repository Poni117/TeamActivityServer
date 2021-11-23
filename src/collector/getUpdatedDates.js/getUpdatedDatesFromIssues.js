export default function GetUpdatedDatesFromIssues(projects){

    const lastUpdateIssues = [];

    projects.forEach(project => {

        project.issues.forEach(issue => {

            lastUpdateIssues.push({id: issue.id, updated: issue.updated});
        });
    });

    console.log(lastUpdateIssues)
    return lastUpdateIssues;
    // console.log(lastUpdateIssues)
}