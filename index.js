const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

const emailOpenTrackingRouter = require("./routers/emailOpen");
const emailClickTrackingRouter = require("./routers/emailClick");
const complexQueriesRouter = require("./routers/complexQueries");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(emailOpenTrackingRouter);
app.use(emailClickTrackingRouter);
app.use(complexQueriesRouter);
// Middleware to serve static files from the current directory
app.use(express.static(__dirname));

// serve static image
app.get("/test", (req, res) => {
  res.end("Backend service running");
});

// connect with database
try {
  mongoose.connect(process.env.DATABASE_URL);
} catch (error) {
  console.log(error);
}

app.listen(port, () => console.log("backend running on port:", port));
