// [BE/backend.md > Expansion Areas > Event CRUD]: Event controller for event management endpoints
import eventmodel from "../models/eventmodel.js";

// Create Event
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, location, bannerUrl } = req.body;
    const organizer = req.user && req.user._id; // Set by auth middleware
    if (!title || !description || !date || !location) {
      // [BE/backend.md > Best Practices > Error Handling]: Fallback for missing fields
      return res.status(400).json({ error: "All fields except bannerUrl are required." });
    }
    const event = new eventmodel({ title, description, date, location, bannerUrl, organizer });
    await event.save();
    return res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    // [BE/backend.md > Best Practices > Error Handling]: General fallback for event creation
    console.error("Error creating event", error);
    return res.status(500).json({ error: "Internal server error during event creation" });
  }
};

// Get All Events
export const getEvents = async (req, res) => {
  try {
    const events = await eventmodel.find().populate("organizer", "username email");
    return res.status(200).json({ events });
  } catch (error) {
    console.error("Error fetching events", error);
    return res.status(500).json({ error: "Internal server error fetching events" });
  }
};

// Get Single Event
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await eventmodel.findById(id).populate("organizer", "username email");
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    return res.status(200).json({ event });
  } catch (error) {
    console.error("Error fetching event", error);
    return res.status(500).json({ error: "Internal server error fetching event" });
  }
};

// Update Event
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const event = await eventmodel.findByIdAndUpdate(id, updates, { new: true });
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    return res.status(200).json({ message: "Event updated successfully", event });
  } catch (error) {
    console.error("Error updating event", error);
    return res.status(500).json({ error: "Internal server error updating event" });
  }
};

// Delete Event
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await eventmodel.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event", error);
    return res.status(500).json({ error: "Internal server error deleting event" });
  }
};