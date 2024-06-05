const express = require("express");

const complexQueriesRouter = express.Router();
const {
  getEmailOpenRate,
  getEmailClickRate,
} = require("../helperFunctions/calculateRates");

complexQueriesRouter.get("/evaluate", async (req, res) => {
  let results = {};

  let open_rates = await getEmailOpenRate();
  let click_rates = await getEmailClickRate();

  results = {
    open_rates: [...open_rates],
    click_rates: [...click_rates],
  };

  res.send(results);
});

module.exports = complexQueriesRouter;
