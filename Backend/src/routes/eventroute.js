import { Router } from "express";
import role from "../middlewares/role.js";
import eventmodel from "../config/models/eventmodel.js";
import participantmodel from "../config/models/participantmodel.js";
const Eventroute = Router();

Eventroute.get("/events", async(req, res) => {
  try {
    let events=await eventmodel.find();

    return res.json({events:events});
  } catch (error) {
    console.log(error);
  }
});
// poster:{type:Image,required:true},
//     tagname:{type:String,required:true},
//     description:{type:String,required:true},
//     organizers:{type:String,required:true},
//     guests:{type:String,reuired:true},
//     date:{type:Date,required:true},
//     location:{type:String,required:true}
Eventroute.post("/create", role("admin"),async (req, res) => {
    const {poster,tagname,description,organizers,guests,date,location}=req.body;
  try {
    let existevent=await eventmodel.findOne({tagname});
    if(existevent){
    return res.send("event already created by admin");
    }
    
    let newevent= new eventmodel({poster,tagname,description,organizers,guests,date,location});
    
    await newevent.save();

    res.send("event created successfully");

  } catch (error) {
    console.log(error);
  }
});

Eventroute.post("/enroll", role("admin", "user"),async (req, res) => {
    const{fullname,emailaddress,phonenumber}=req.body;
  try {
    const existuser=await participantmodel.findOne({phonenumber});
    if(existuser){
        return res.send('already enrolled in event see you in the event 🙋‍♂️ thankyou');
    } 

    let newparticipant=new participantmodel({fullname,emailaddress,phonenumber});
    await newparticipant.save();
    res.send("Hurray! enrolled successfully see you in the event 🙋‍♂️ thankyou");
  } catch (error) {
    console.log(error);
  }
});

Eventroute.delete("/DelEvent", role("admin"),async (req, res) => {
    const {tagname}=req.body;
  try {
    let existevent=await eventmodel.findOne({tagname});

    if(!existevent){
        return res.send("this event doesn't exist");
    }
    
    let event=await eventmodel.deleteOne({tagname});

    res.send("event deleted");
  } catch (error) {
    console.log(error);
  }
});
export default Eventroute;
