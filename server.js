import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbconnect from "./src/config/db.js";


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
app.use(express.static("public"));
dbconnect();



app.get('/user/logout', (req, res)=>{
  res.clearCookie('access_token')
  return res.json({message : 'Logged Out!'})
})


app.listen(port, () => {
  console.log(`Server is listenning on port ${port}`);
});
