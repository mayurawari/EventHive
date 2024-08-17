import { model, Schema } from "mongoose";


const blacklistSchema = new Schema({
  token: { type: String, required: true },
});

const blacklistModel = model("blacklist", blacklistSchema);

export default blacklistModel;
