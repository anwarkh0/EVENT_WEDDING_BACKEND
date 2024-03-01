import { Router } from "express";
import {
    createPackage,
    getOnePackage,
    getPackages,
    deletePackage,
    updatePackage,

} from "../controllers/packageController.js";
import upload from "../middlewares/multer.js";
export const packageRouter = Router();

packageRouter.get("/", getPackages);
packageRouter.get("/get-one-package/:id", getOnePackage);
packageRouter.post("/create", upload.single('image'), createPackage);
packageRouter.patch("/update/:id", upload.single('image'), updatePackage);
packageRouter.delete("/delete/:id", deletePackage);
