import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbconnect from "./src/config/db.js";
import { eventRouter } from "./src/routes/EventRouter.js"
import { bookingRouter } from "./src/routes/BookingROuter.js";
import { serviceRouter } from "./src/routes/ServiceRouter.js";
import { packageRouter } from "./src/routes/PackageRouter.js";

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(cookieParser());
app.use("/images",express.static("images"));
dbconnect();

app.use("/booking", bookingRouter);
app.use("/event", eventRouter);
app.use("/package", packageRouter);
app.use("/service", serviceRouter);
app.get('/user/logout', (req, res) => {
  res.clearCookie('access_token')
  return res.json({ message: 'Logged Out!' })
})

app.listen(port, () => {
  console.log(`Server is listenning on port ${port}`);
});

