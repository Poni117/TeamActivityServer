import { getComments } from "./requestsToConfluence/getContents.js";
import { getContentsEdits } from "./requestsToConfluence/getContentsEdits.js";
import getContentsMainInfo from "./requestsToConfluence/getContentsMainInfo.js";

export default async function RequestsToConfluence(jiraAccessId, accessToken){

    // const contentInfo = {
        // pages: await getContentsMainInfo(jiraAccessId, accessToken),
    // }

    // await Promise.all(contentInfo.pages.map(async page => {

    //    page.edits = await getContentsEdits(jiraAccessId, accessToken, page),
    //    page.comments = await getComments(jiraAccessId, accessToken, page)
    // }))

    
    // await Promise.all(contentInfo.blogs.map(async blogs => {

    //     blogs.edits = await getContentsEdits(jiraAccessId, accessToken, blogs),
    //     blogs.comments = await getComments(jiraAccessId, accessToken, blogs)
    // }))

    return contentInfo;
}