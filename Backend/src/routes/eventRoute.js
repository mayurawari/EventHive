// [BE/backend.md > Expansion Areas > Event CRUD]: Event routes for event management endpoints
import { Router } from "express";
import * as eventController from "../controllers/eventController.js";
import Authenticate from "../middlewares/auth.js";

const eventRoute = Router();

// All event routes require authentication
// [BE/backend.md > Best Practices > Authentication]: Protect event routes

// Create Event
eventRoute.post("/events", Authenticate, eventController.createEvent);
// Get All Events
eventRoute.get("/events", eventController.getEvents);
// Get Single Event
eventRoute.get("/events/:id", eventController.getEventById);
// Update Event
eventRoute.put("/events/:id", Authenticate, eventController.updateEvent);
// Delete Event
eventRoute.delete("/events/:id", Authenticate, eventController.deleteEvent);

export default eventRoute;