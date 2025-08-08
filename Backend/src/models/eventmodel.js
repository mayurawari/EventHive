// [BE/backend.md > Expansion Areas > Event CRUD]: Event model for event management endpoints
import { model, Schema } from "mongoose";

const eventschema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  organizer: { type: Schema.Types.ObjectId, ref: "userCredentilas", required: true },
  location: { type: String, required: true },
  bannerUrl: { type: String }, // For banner generator integration
}, { timestamps: true });

const eventmodel = model("events", eventschema);
export default eventmodel;