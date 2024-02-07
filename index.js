const express = require("express");
import cors from "cors";
import mongoose from "mongoose";
require("dotenv").config();
// import teamRoute from "./Routes/team.js";
// import Team from "../Models/TeamRegistration.js";
const Team = require("../Models/TeamRegistration.js");


import cookieParser from "cookie-parser";

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

// app.use("/api/teamregi", teamRoute);

app.post("/api/teamregi/register", async (req, res) => {
  try {
    const newSession = new Team({
      teamName: req.body.teamName,
      university: req.body.university,
      other: req.body.other,
      leaderName: req.body.leaderName,
      leaderYear: req.body.leaderYear,
      leaderWhatsapp: req.body.leaderWhatsapp,
      leaderEmail: req.body.leaderEmail,
      leaderNIC: req.body.leaderNIC,
      member1Name: req.body.member1Name,
      member1Year: req.body.member1Year,
      member1Whatsapp: req.body.member1Whatsapp,
      member1Email: req.body.member1Email,
      member1NIC: req.body.member1NIC,
      member2Name: req.body.member2Name,
      member2Year: req.body.member2Year,
      member2Whatsapp: req.body.member2Whatsapp,
      member2Email: req.body.member2Email,
      member2NIC: req.body.member2NIC,
    });
    await newSession.save();

    res.status(200).json({
      success: true,
      message: "Team Registered Successfully",
    });
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});

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
