// const mongoose = require("mongoose");
import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  urlCode: { type: String, required: true, unique: true, trim: true },
  longUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
});

const Url = mongoose.model("Url", urlSchema);
export default Url;
