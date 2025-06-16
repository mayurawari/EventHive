import sessionIdModel from "../models/sessionIdmodel";
import jwt from "jsonwebtoken"

const Authenticate = async(req,res,next) =>{

    const header = req.headers.authorization;

try {
    if(!token){
        res.status(400).send("Token not provided try to login again");
    }

    const token = header.split(' ')[1];
    const decoded= jwt.decode(token);
    const checkId = await sessionIdModel.findOne({sessionId : decoded.sessionId });

    if(!checkId){
        res.status(400).send(async)
    }

    const checkauthenticity = jwt.verify(token, process.env.ACCESS_KEY, (err, result) =>{
        if(err){
            console.log("error in token authentication middleware");
        }

        req.user = decoded;
     });


     next();
    

} catch (error) {
    console.log("Error in token authnetication mkiddleware", error);
}
}


export default Authenticate;