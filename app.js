import express from "express";
import getRoutes from "./src/routes/getRoutes/getRoutes.js";
import postRoutes from "./src/routes/postRoutes/postRoutes.js";
import path from 'path'
import http from "http";
import os from 'os';
import cors from 'cors'
import bodyParser from "body-parser";

import dotenv from 'dotenv';
dotenv.config();
import DeleteRoutes from "./src/routes/delete/deleteRoutes.js";
import collectInformation from "./src/collector/GetInfo/collectInformation.js";
import getBasicTokens from "./public/Database/get/getBasicTokens.js";


const app = express();

const port = process.env.PORT || 9900;
const host = os.hostname();

const __dirname = path.resolve(path.dirname(''));
const viewsDir = path.join(__dirname, 'views');
const staticDir = path.join(__dirname, 'public');

app.use(cors());
app.use(express.static(staticDir));
app.use(bodyParser.json());

app.set('views', viewsDir);
app.set("view engine", 'hbs');

getRoutes(app);
postRoutes(app);
DeleteRoutes(app);

// const server = http.createServer(app).listen(port, () => {
//     console.log('server running at http://' + host + ':' + port);
// }) ;

app.listen(port, () => {
    console.log(`Server has been runing on ${port} port`);
})
