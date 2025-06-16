import { model, Schema } from "mongoose";

const userschema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "organizer", "consumer"],
    default: "consumer",
    required: false,
  },

  //Not Required Field
  resetToken: { type: String , required : false}, 
  resetTokenExpire: { type: Date , required : false }, 
});

const usermodel = model("userCredentilas", userschema);
export default usermodel;
