import { Router } from "express";
import {
 getOneService,
    getServices,
    deleteService,
    updateService,
    createService

} from "../controllers/serviceController.js";
import upload from "../middlewares/multer.js";
export const serviceRouter = Router();

serviceRouter.get("/", getServices);
serviceRouter.get("/get-one-service/:id", getOneService);
serviceRouter.post("/create", upload.single('image'), createService);
serviceRouter.patch("/update/:id", upload.single('image'), updateService);
serviceRouter.delete("/delete/:id", deleteService);
