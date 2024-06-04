const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

const emailOpenTrackingRouter = require("./routers/emailOpen");

const app = express();
const port = 5000;

const emailOpenRecords = new Map();

app.use(cors());
app.use(express.json());
app.use(emailOpenTrackingRouter);
// Middleware to serve static files from the current directory
app.use(express.static(__dirname));

// serve static image
app.get("/image", (req, res) => {
  res.sendFile(path.join(__dirname, "tracker.jpg"));
});

// Record which email has been sent.
app.get("/record_click/:Id/:clickable_link", (req, res) => {
  let uniqueId = decodeURI(req.params?.Id);
  let clickable_link = decodeURIComponent(req.params?.clickable_link);

  let email = emailOpenRecords.get(uniqueId)?.recipient_email;

  if (emailOpenRecords.has(uniqueId)) {
    console.log(`click on link recorded. Email: ${email}, Id: ${uniqueId}`);

    emailOpenRecords.set(uniqueId, {
      ...emailOpenRecords.get(uniqueId),
      links_in_email: emailOpenRecords
        .get(uniqueId)
        ?.links_in_email?.map((item) => {
          if (item?.url === clickable_link) {
            return {
              url: clickable_link,
              clicked: true,
            };
          } else {
            return item;
          }
        }),
    });
  }
  res.redirect(clickable_link);
  //   res.end("===");
});

// connect with database
try {
  mongoose.connect(process.env.DATABASE_URL);
} catch (error) {
  console.log(error);
}

app.listen(port, () => console.log("backend running on port:", port));
