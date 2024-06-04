const express = require("express");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

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

    // record details of email sent
    let newDataEntry = new emailInteractionDataModel({
      email: recipient_email,
      unique_id: uniqueId,
      campaign_id: campaignId,
      email_opened: false,
      links_in_email: [...links_in_email],
    });

    await newDataEntry.save();
    // if (!emailOpenRecords.has(uniqueId)) {
    //   emailOpenRecords.set(uniqueId, {
    //     recipient_email: recipient_email,
    //     email_opened: false,
    //     campaign_id: campaignId,
    //     links_in_email: links_in_email,
    //   });
    // }
    res.status(200).send("Email sent successfully");
  } catch (error) {
    // handle error
    console.log(error);
    res.status(500).send("Sending email failed");
  }
});

module.exports = emailOpenTrackingRouter;
