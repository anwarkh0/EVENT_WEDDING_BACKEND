import { Router } from "express";
import {
    updateEvent,
    deleteEvent,
    createEvent,
    getEvents,
    getOneEvent
} from "../controllers/eventController.js";
import upload from "../middlewares/multer.js";
export const eventRouter = Router();

eventRouter.get("/", getEvents);
eventRouter.post("/create", upload.single('image'), createEvent);
eventRouter.get("/get-one-event/:id", getOneEvent);
eventRouter.patch("/update/:id",upload.single('image'), updateEvent);
eventRouter.delete("/delete/:id", deleteEvent);
