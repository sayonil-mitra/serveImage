const emailInteractionDataModel = require("../models/emailDataModel");

async function getEmailOpenRate() {
  const result = await emailInteractionDataModel.aggregate([
    {
      $group: {
        _id: "$campaign_id",
        totalEmails: { $sum: 1 },
        openedEmails: {
          $sum: { $cond: ["$email_opened", 1, 0] },
        },
      },
    },
    {
      $project: {
        _id: 0,
        campaign_id: "$_id",
        openRate: {
          $multiply: [{ $divide: ["$openedEmails", "$totalEmails"] }, 100],
        },
      },
    },
  ]);

  return result;
}

async function getEmailClickRate() {
  const result = await emailInteractionDataModel.aggregate([
    {
      $group: {
        _id: "$campaign_id",
        totalEmails: { $sum: 1 },
        clickedEmails: {
          $sum: {
            $cond: [
              {
                $gt: [
                  {
                    $size: {
                      $filter: {
                        input: "$links_in_email",
                        as: "link",
                        cond: { $eq: ["$$link.clicked", true] },
                      },
                    },
                  },
                  0,
                ],
              },
              1,
              0,
            ],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        campaign_id: "$_id",
        clickRate: {
          $multiply: [{ $divide: ["$clickedEmails", "$totalEmails"] }, 100],
        },
      },
    },
  ]);

  return result;
}

module.exports = { getEmailOpenRate, getEmailClickRate };
