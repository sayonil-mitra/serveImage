const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const emailOpenRecords = new Map();
const path = require("path");

app.use(cors());
// Middleware to serve static files from the current directory
app.use(express.static(__dirname));

// check email with specific id has been opened by specific user
app.get("/opened/:email/:uniqueId", (req, res) => {
  let emailId = decodeURI(req.params?.email);
  let uniqueId = decodeURI(req.params?.uniqueId);
  console.log(`Email opened. Email: ${emailId}, unique id: ${uniqueId}`);

  res.sendFile(path.join(__dirname, "tracker.jpg"));

  let emailIdentifer = `${emailId}-${uniqueId}`;
  if (emailOpenRecords.has(emailIdentifer)) {
    emailOpenRecords.set(emailIdentifer, true);
  }
});

// serve static image
app.get("/opened", (req, res) => {
  res.sendFile(path.join(__dirname, "tracker.jpg"));
});

// check status of all emails sent
app.get("/check/open", (req, res) => {
  res.json(Object.fromEntries(emailOpenRecords));
  res.end();
});

// record which email has been sent
app.get("/record_send/:email/:uniqueId", (req, res) => {
  let uniqueId = req.params.uniqueId;
  let email = decodeURI(req.params.email);
  if (!emailOpenRecords.has(uniqueId)) {
    emailOpenRecords.set(`${email}-${uniqueId}`, false);
  }
});

app.listen(port, () => console.log("backend running"));
