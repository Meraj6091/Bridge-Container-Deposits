const mongoose = require("mongoose");

const containerDeposits = new mongoose.Schema({
  entity: {
    type: String,
  },
  department: {
    type: String,
  },
  blType: {
    type: String,
  },
  billOfLandingNo: {
    type: String,
  },
  shipmentNo: {
    type: String,
  },
  poNo: {
    type: String,
  },
  clientPoNo: {
    type: String,
  },
  shipmentVol: {
    type: String,
  },
  carrier: {
    type: String,
  },
  customerHouseAgent: {
    type: String,
  },
  currency: {
    type: String,
  },
  depositedAmount: {
    type: String,
  },
});

module.exports = mongoose.model("containerDeposits", containerDeposits);
