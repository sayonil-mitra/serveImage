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
    let formattedData = {
      email: tempstring[0],
      id: tempstring[1],
      emailOpened: value,
    };
    if (tempstring?.length > 2) {
      formattedData;
    }
    responseArray.push(formattedData);
  });

  // Send API response.
  res.json(responseArray);
});

// Record which email has been sent.
app.get("/record_send/:uniqueId", (req, res) => {
  let uniqueId = decodeURI(req.params?.uniqueId);
  if (!emailOpenRecords.has(uniqueId)) {
    console.log("unique id recorded: ", uniqueId);
    emailOpenRecords.set(`${uniqueId}`, {
      emailOpened: false,
      hasLink: false,
      link: link,
      linkClicked: false,
    });
  }
  res.end("New entry added");
});

// Record which email has been sent.
app.get("/record_click/:Id", (req, res) => {
  let parsedData = decodeURI(req.params?.Id).split("__"); // id will be like: email__uniqueId__url

  let email = parsedData[0];
  let uniqueId = parsedData[1];
  let link = parsedData[2];

  if (emailOpenRecords.has(`${email}__${uniqueId}`)) {
    console.log(`click on link recorded. Email: ${email}, Id: ${uniqueId}`);
    emailOpenRecords.set(`${email}__${uniqueId}`, {
      emailOpened: true,
      hasLink: true,
      link: link,
      linkClicked: false,
    });
  }

  res.redirect(link);
});

app.get("/test", (req, res) => {
  console.log("script in email working");
});

app.listen(port, () => console.log("backend running"));
