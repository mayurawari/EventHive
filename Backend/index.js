import express from "express";
import { config } from "dotenv";
import connectDB from "./src/utilities/db.js";
config();
import cors from "cors";
import Authroute from "./src/routes/authroute.js";
import cookieParser from "cookie-parser";

const server = express();
// mongodb+srv://mayur:mayur@cluster0.oul5ack.mongodb.net/EventHive?retryWrites=true&w=majority&appName=Cluster0

server.use(express.json());
server.use(cookieParser());
server.use(cors());
server.use("/api",Authroute);

let port = process.env.PORT || 5050;
let url = process.env.DB_URL;
server.get("/",(req,res)=>{
  res.send("This Is Home route server successfully Targetted");
})

server.listen(port,async(req,res)=>{
  try {
    await connectDB(url);
    console.log(`Connected to EventHive DB`);
    console.log(`Server started on ${port}`);
  } catch (error) {
    console.log("Error",error);
  }
})

