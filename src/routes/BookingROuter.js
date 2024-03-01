import { Router } from "express";
import {
    createBooking,
    getOneBooking,
    getAllbook,

} from "../controllers/bokkingController.js";

export const bookingRouter = Router();

bookingRouter.get("/", getAllbook);
bookingRouter.post("/create", createBooking);
bookingRouter.get("/get-one-book/:id", getOneBooking);
// bookingRouter.patch("/update/:id", updateBooking);
// bookingRouter.delete("/delete/:id", deleteBooking);
