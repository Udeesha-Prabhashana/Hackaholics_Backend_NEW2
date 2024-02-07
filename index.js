import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import teamRoute from "./Routes/team.js";
import Team from "../Models/TeamRegistration.js";


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

// app.use("/api/teamregi", teamRoute);

app.post("/api/teamregi/register", async (req, res) => {
  try {
    // Validate request body
    const requiredFields = [
      "teamName",
      "university",
      "leaderName",
      "leaderEmail",
    ];
    const missingFields = requiredFields.filter(
      (field) => !(field in req.body)
    );

    if (missingFields.length > 0) {
      return res
        .status(400)
        .json({
          success: false,
          message: `Missing required fields: ${missingFields.join(", ")}`,
        });
    }

    // Create a new team instance
    const newTeam = new Team({
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

    // Save the new team to the database
    await newTeam.save();

    // Send success response
    res.status(200).json({
      success: true,
      message: "Team Registered Successfully",
    });
  } catch (err) {
    // Log the error for debugging purposes
    console.error(err);
    // Send an error response
    res.status(500).json({ success: false, message: "Internal Server Error" });
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
