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
  let uniqueId = decodeURI(req.params?.emailMessageId);
  console.log("image fetched on message: ", uniqueId);

  res.sendFile(path.join(__dirname, "tracker.jpg"));

  if (emailOpenRecords.has(uniqueId)) {
    emailOpenRecords.set(uniqueId, true);
  }
});

app.get("/opened", (req, res) => {
  res.sendFile(path.join(__dirname, "tracker.jpg"));
});

app.get("/check/open", (req, res) => {
  res.json(Object.fromEntries(emailOpenRecords));
  res.end();
});

app.get("/record_send/:email/:uniqueId", (req, res) => {
  let uniqueId = req.params.uniqueId;
  let email = decodeURI(req.params.email);
  if (!emailOpenRecords.has(uniqueId)) {
    emailOpenRecords.set(`${email}-${uniqueId}`, false);
  }
});

app.listen(port, () => console.log("backend running"));
