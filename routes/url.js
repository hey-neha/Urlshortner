import express from "express";
// const urlController = require("../controllers/url");
import { shortUrl, redirectUrl } from "../controllers/url.js";

const router = express.Router();

// Route for shortening the URL
router.post("/shorten", shortUrl);

// Route for redirecting to the original URL
router.get("/:urlCode", redirectUrl);

export default router;
