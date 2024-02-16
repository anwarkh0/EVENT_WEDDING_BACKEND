import { Router } from "express";
import {
    updateEvent,
    deleteEvent,
    createEvent,
    getEvents
} from "../controllers/eventController.js";

export const eventRouter = Router();

eventRouter.get("/", getEvents);
eventRouter.post("/create", createEvent);
eventRouter.patch("/update", updateEvent);
eventRouter.get("/delete", deleteEvent);
