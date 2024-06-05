const express = require("express");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

const emailClickTrackingRouter = express.Router();
const emailInteractionDataModel = require("../models/emailDataModel");

// Record which email has been sent.
emailClickTrackingRouter.get(
  "/record_click/:Id/:clickable_link",
  async (req, res) => {
    let uniqueId = decodeURI(req.params?.Id);
    let clickable_link = decodeURIComponent(req.params?.clickable_link);

    let email_data_entry = await emailInteractionDataModel.findOne({
      unique_id: uniqueId,
    });

    email_data_entry.links_in_email.map((item) => {
      if (item.url === clickable_link) {
        item.clicked = true;
      }
    });

    await email_data_entry.save();
    res.redirect(clickable_link);
  }
);

module.exports = emailClickTrackingRouter;
