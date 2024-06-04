const express = require("express");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const path = require("path");

const { sendEmail } = require("../helperFunctions/gmailApis");
const { ensureAccessToken } = require("../helperFunctions/generateToken");
const emailInteractionDataModel = require("../models/emailDataModel");

const emailOpenTrackingRouter = express.Router();

// Record which email has been sent.
emailOpenTrackingRouter.post("/record_email_send", async (req, res) => {
  // parsing request body
  let reqBody = req?.body;
  let recipient_email = reqBody?.recipient_email;
  let uniqueId = uuidv4();
  let campaignId = reqBody?.campaign_id;
  let links_in_email = reqBody?.links_in_email?.map((item) => {
    return {
      url: item,
      clicked: false,
    };
  });

  // get token
  let access_token = await ensureAccessToken();

  try {
    // sendingn email via gmail api
    await sendEmail(
      recipient_email,
      access_token,
      uniqueId,
      reqBody?.links_in_email
    );

    // record details of email sent in database
    let newDataEntry = new emailInteractionDataModel({
      email: recipient_email,
      unique_id: uniqueId,
      campaign_id: campaignId,
      links_in_email: [...links_in_email],
    });

    await newDataEntry.save();
    res.status(200).send("Email sent successfully");
  } catch (error) {
    // handle error
    console.log(error);
    res.status(500).send("Sending email failed");
  }
});

// check email with specific id has been opened by specific user
emailOpenTrackingRouter.get("/email_opened/:uniqueId", async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "../tracker.jpg"));

    let uniqueId = decodeURI(req.params?.uniqueId);
    console.log(`Email opened. Unique id: ${uniqueId}`);

    let email_entry_with_current_id = await emailInteractionDataModel.findOne({
      unique_id: uniqueId,
    });
    email_entry_with_current_id.email_opened = true;
    email_entry_with_current_id.email_open_time = Date.now();

    await email_entry_with_current_id.save();

    res.end();
  } catch (error) {
    console.log(error);
  }
});

// check status of all emails sent
emailOpenTrackingRouter.get("/check/all", async (req, res) => {
  let responseArray = [];

  responseArray = await emailInteractionDataModel.find();

  // Send API response.
  res.json(responseArray);
});

module.exports = emailOpenTrackingRouter;
