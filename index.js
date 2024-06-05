const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

const emailOpenTrackingRouter = require("./routers/emailOpen");
const emailClickTrackingRouter = require("./routers/emailClick");

const app = express();
const port = 5000;

const emailOpenRecords = new Map();

app.use(cors());
app.use(express.json());
app.use(emailOpenTrackingRouter);
app.use(emailClickTrackingRouter);
// Middleware to serve static files from the current directory
app.use(express.static(__dirname));

// serve static image
app.get("/image", (req, res) => {
  res.sendFile(path.join(__dirname, "tracker.jpg"));
});

// connect with database
try {
  mongoose.connect(process.env.DATABASE_URL);
} catch (error) {
  console.log(error);
}

app.listen(port, () => console.log("backend running on port:", port));
