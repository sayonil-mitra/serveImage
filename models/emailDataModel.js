const mongoose = require("mongoose");

let emailInteractionDataSchema = mongoose.Schema({
  email: String,
  id: String,
  campaign_id: String,
  email_opened: Boolean,
  links_in_email: [
    {
      url: String,
      clicked: Boolean,
    },
  ],
});

let emailInteractionDataModel = mongoose.model(
  "email_interactions",
  emailInteractionDataSchema
);

module.exports = emailInteractionDataModel;
