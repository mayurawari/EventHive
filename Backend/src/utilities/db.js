import { connect } from "mongoose";

const connectDB=async(url)=>{
try {
    await connect(url);
} catch (error) {
    console.log("error in db",error);
}
}
export default connectDB;