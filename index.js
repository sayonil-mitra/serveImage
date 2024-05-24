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
app.get("/opened/:uniqueId", (req, res) => {
  let uniqueId = decodeURI(req.params?.uniqueId);
  console.log(`Email opened. Unique id: ${uniqueId}`);

  res.sendFile(path.join(__dirname, "tracker.jpg"));
  if (emailOpenRecords.has(uniqueId)) {
    emailOpenRecords.set(uniqueId, true);
  }
  res.end();
});

// serve static image
app.get("/opened", (req, res) => {
  res.sendFile(path.join(__dirname, "tracker.jpg"));
});

// check status of all emails sent
app.get("/check/open", (req, res) => {
  let responseArray = [];

  emailOpenRecords.forEach((value, key) => {
    let tempstring = key?.split("__");
    responseArray.push({
      email: tempstring[0],
      id: tempstring[1],
      emailOpened: value,
    });
  });

  // Send API response.
  res.json(responseArray);
});

// Record which email has been sent.
app.get("/record_send/:uniqueId", (req, res) => {
  let uniqueId = decodeURI(req.params?.uniqueId);
  if (!emailOpenRecords.has(uniqueId)) {
    console.log("unique id recorded: ", uniqueId);
    emailOpenRecords.set(`${uniqueId}`, false);
  }
  res.end("New entry added");
});

// Record which email has been sent.
app.get("/record_click/:uniqueId", (req, res) => {
  let uniqueId = decodeURI(req.params?.uniqueId);
  let link = uniqueId.split("__")[2];
  res.redirect(link);
  if (!emailOpenRecords.has(uniqueId)) {
    console.log("unique id recorded: ", uniqueId);
    emailOpenRecords.set(`${uniqueId}`, false);
  }
});

app.listen(port, () => console.log("backend running"));
