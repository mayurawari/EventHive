import { Schema, model } from "mongoose";


const userschema=new Schema({
    username:{type : String , required :true},
    email:{type : String , required :true},
    password:{type :String , required:true},
    role:{type:String,enum:['admin','user'],default:'user'}
})

const usermodel= model("users" , userschema);
export default usermodel;