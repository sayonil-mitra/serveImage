const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 5000;
const emailOpenRecords = new Map();

// {
//     "email": "email id",
//     "id": "0000-0000-0000-0000-00000",
//     "email_opened": true/false,
//     "links_in_email": [
//         {
//             "url": "https://abc.xyz.com/",
//             "clicked": true/false
//         }
//     ]
// }

app.use(cors());
app.use(express.json());
// Middleware to serve static files from the current directory
app.use(express.static(__dirname));

// serve static image
app.get("/image", (req, res) => {
  res.sendFile(path.join(__dirname, "tracker.jpg"));
});

// Record which email has been sent.
app.post("/record_email_send", async (req, res) => {
  let reqBody = req?.body;
  let recipient_email = reqBody?.recipient_email;
  let uniqueId = reqBody?.unique_id;
  let campaignId = reqBody?.campaign_id;
  let links_in_email = reqBody?.links_in_email?.map((item) => {
    return {
      url: item,
      clicked: false,
    };
  });

  if (!emailOpenRecords.has(uniqueId)) {
    emailOpenRecords.set(uniqueId, {
      recipient_email: recipient_email,
      email_opened: false,
      campaign_id: campaignId,
      links_in_email: links_in_email,
    });
  }

  // generate encrypted token
  let encryptedToken = await encryptToken();
  res.end(encryptedToken);
});

// check email with specific id has been opened by specific user
app.get("/email_opened/:uniqueId/:recipient_email", (req, res) => {
  let uniqueId = decodeURI(req.params?.uniqueId);
  let recipient_email = decodeURI(req.params?.recipient_email);
  console.log(
    `Email opened. Unique id: ${uniqueId}, Email id: ${recipient_email}`
  );

  res.sendFile(path.join(__dirname, "tracker.jpg"));
  if (emailOpenRecords.has(uniqueId)) {
    emailOpenRecords.set(uniqueId, {
      ...emailOpenRecords.get(uniqueId),
      email_opened: true,
    });
  }
  res.end();
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

// check status of all emails sent
app.get("/check/open", (req, res) => {
  let responseArray = [];

  emailOpenRecords.forEach((value, key) => {
    let formattedData = {
      email: value?.recipient_email,
      id: key,
      campaign_id: value?.campaign_id,
      email_opened: value?.email_opened,
      links_in_email: value?.links_in_email,
    };
    responseArray.push(formattedData);
  });

  // Send API response.
  res.json(responseArray);
});

app.listen(port, () => console.log("backend running on port:", port));
