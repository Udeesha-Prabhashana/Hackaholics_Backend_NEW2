import express from "express";
import { register , count } from "./../Controllers/teamRegi.js";

const router = express.Router();

router.get("/count", count);

export default router;