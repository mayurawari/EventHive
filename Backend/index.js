import express from "express";
import { config } from "dotenv";
import connectdb from "./src/config/databases/db.js";
import userroute from "./src/routes/userroute.js";
import auth from "./src/middlewares/auth.js";
import Eventroute from "./src/routes/eventroute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
config();

const port=process.env.PORT || 8080;
const url=process.env.URL;

const server=express();
server.use(express.json());
server.use(cookieParser());
server.use(cors());

server.use("/api",userroute);
server.use("/api/get",auth,Eventroute);


server.get("/",(req,res)=>{
        res.send("this is home route");
})
server.listen(port,async()=>{
    try {
        await connectdb(url);
        console.log("connected to dbs");
        console.log(`server is running on port :${port}`);
    } catch (error) {
        console.log(error);
    }
})