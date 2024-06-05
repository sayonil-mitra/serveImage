const express = require("express");
const mongoose = require("mongoose");

const emailClickTrackingRouter = express.Router();
const emailInteractionDataModel = require("../models/emailDataModel");

// Record which email has been sent.
emailClickTrackingRouter.get(
  "/record_click/:Id/:clickable_link",
  async (req, res) => {
    try {
      let uniqueId = decodeURI(req.params?.Id);
      let clickable_link = decodeURIComponent(req.params?.clickable_link);
      console.log(
        `Click on link: ${clickable_link} for Email with uniqueId: ${uniqueId}`
      );
      let email_data_entry = await emailInteractionDataModel.findOne({
        unique_id: uniqueId,
      });

      email_data_entry.links_in_email.map((item) => {
        if (item.url === clickable_link) {
          item.clicked = true;
        }
        return item;
      });
      await email_data_entry.save();
      res.redirect(clickable_link);
      //   res.end();
    } catch (error) {
      console.log(error);
      res.end(JSON.stringify(error));
    }
  }
);

module.exports = emailClickTrackingRouter;
