import express from "express";
import { config } from "dotenv";
import connectdb from "./src/config/databases/db.js";
import userroute from "./src/routes/userroute.js";
import productroute from "./src/routes/productroute.js";
import auth from "./src/middlewares/auth.js";
import tokengenrater from "./src/routes/refreshtoken.js";
config();

const port=process.env.PORT || 8080;
const url=process.env.URL;

const server=express();
server.use(express.json());

server.use("/api",userroute);
server.use("/api/products",auth,productroute);
server.use("/api/token",tokengenrater);


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