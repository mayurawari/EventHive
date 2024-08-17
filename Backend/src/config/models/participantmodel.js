import { model, Schema } from "mongoose";

const participantchema=new Schema({
    fullname:{type:String,required:true},
    emailaddress:{type:String,required:true},
    phonenumber:{type:Number,required:true}
})
const participantmodel= model("participants",participantchema);

export default participantmodel;