import getBasicTokens from "./public/Database/get/getBasicTokens.js";
import collectInformation from "./src/collector/GetInfo/collectInformation.js";
import { getDates } from "./src/collector/GetInfo/Tools/tools.js";

export default async function startRequests(){
    
    setInterval(async () => {
        
        const basicTokens = await getBasicTokens();
    
        const dates = getDates();
        
        basicTokens.map(async (basicToken) => {
            collectInformation(dates, basicToken.basicToken);
        });
    
    }, 5000);
}
