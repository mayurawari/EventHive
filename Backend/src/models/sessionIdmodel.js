import mongoose, { model, Schema } from "mongoose";


const sessionIdschema = new Schema({
    userID:{type : mongoose.Schema.Types.ObjectId, ref : "User" , required :true},
    sessionId:{type : String, required : true},
    expiresAt:{type:Date}
})

const sessionIdModel = model("sessionIds",sessionIdschema);
export default sessionIdModel;