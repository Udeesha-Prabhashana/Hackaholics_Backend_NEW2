import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import teamRoute from "./Routes/team.js";

import cookieParser from "cookie-parser";
dotenv.config();

const ORIGIN = process.env.ORIGIN;
const PORT = process.env.PORT;;


const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(cookieParser());
app.use(express.json());

app.get("/", (req ,res) => {
  res.send("Hackaholics API is running");
});

app.use("/api/teamregi", teamRoute);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connect to mongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});


app.listen(PORT, () => {
  connect();
  console.log("Server running on port " + PORT);
});
