const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const emailOpenRecords = new Map();
const path = require("path");

app.use(cors());
// Middleware to serve static files from the current directory
app.use(express.static(__dirname));

app.get("/check/open", (req, res) => {
  res.json(Object.fromEntries(emailOpenRecords));
});

app.get("/opened", (req, res) => {
  //   let messageId = req.params?.msgId;
  //   if (!emailOpenRecords.has(messageId)) {
  //     emailOpenRecords.set(messageId, 1);
  //   } else {
  //     emailOpenRecords.set(messageId, emailOpenRecords.get(messageId) + 1);
  //   }
  //   console.log(emailOpenRecords);
  //   res.json(Object.fromEntries(emailOpenRecords));
  res.sendFile(path.join(__dirname, "tracker.jpg"));
});

app.get("/check/open/:id", (req, res) => {
  let messageId = req.params.id;
  if (emailOpenRecords.has(messageId)) {
    emailOpenRecords.get(messageId);
  }
});

app.listen(port, () => console.log("backend running"));
