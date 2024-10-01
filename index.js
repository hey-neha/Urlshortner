// const express = require('express');
// const mongoose = require('mongoose');

import express from "express";
import mongoose from "mongoose";

import userRoute from "./routes/user.js";
import urlRoute from "./routes/url.js";

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/testUrl")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Use routes
app.use("/api", userRoute);
app.use("/url", urlRoute);

app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

// Start the server
// const PORT = process.env.PORT || 8000;
app.listen(8080, (req, res) => {
  console.log(`Server running on port 8080`);
});
