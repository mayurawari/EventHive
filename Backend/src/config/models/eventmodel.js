import { model, Schema } from "mongoose";

const eventschema=new Schema({
    poster:{type:String,required:true},
    tagname:{type:String,required:true},
    description:{type:String,required:true},
    organizers:{type:String,required:true},
    guests:{type:String,reuired:true},
    date:{type:Date,required:true},
    location:{type:String,required:true}
})
const eventmodel= model("events",eventschema);

export default eventmodel;