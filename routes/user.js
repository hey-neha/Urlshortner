import express from "express";
import { signup, signin } from "../controllers/user.js";

const router = express.Router();

//Define the routes and map them to the controller functions

router.post("/signup", signup);
router.post("/signin", signin);

export default router;
