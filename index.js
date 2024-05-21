const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const emailOpenRecords = new Map();
const path = require("path");

app.use(cors());
// Middleware to serve static files from the current directory
app.use(express.static(__dirname));

app.get("/opened/:emailMessageId", (req, res) => {
  let uniqueId = req.params?.emailMessageId;
  console.log("image fetched on message: ", uniqueId);

  res.sendFile(path.join(__dirname, "tracker.jpg"));
  console.log("emailOpened", emailOpened);

  if (!emailOpenRecords.has(uniqueId)) {
    emailOpenRecords.set(uniqueId, true);
  }
});

app.get("/check/open", (req, res) => {
  res.json(Object.fromEntries(emailOpenRecords));
  res.end();
});

app.listen(port, () => console.log("backend running"));
