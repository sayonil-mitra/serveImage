const mongoose = require("mongoose");

let emailInteractionDataSchema = mongoose.Schema({
  email: String,
  unique_id: String,
  campaign_id: String,
  email_opened: { type: Boolean, default: false },
  email_open_time: [{ type: String }],
  links_in_email: [
    {
      url: String,
      clicked: Boolean,
    },
  ],
});

let emailInteractionDataModel = mongoose.model(
  "Email_interactions_1",
  emailInteractionDataSchema
);

module.exports = emailInteractionDataModel;
