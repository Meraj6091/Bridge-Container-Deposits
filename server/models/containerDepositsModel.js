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
  ataDate: {
    type: Date,
  },
  docReceivedDate: {
    type: Date,
  },
  docSubmittedDate: {
    type: Date,
  },
  depositedAmount: {
    type: Date,
  },
  status: {
    type: String,
  },
  remarks: {
    type: String,
  },
  //recovery details
  chequeNo: {
    type: Number,
  },
  receivedDate: {
    type: Date,
  },
  refundAmount: {
    type: Number,
  },
  deductAmount: {
    type: Number,
  },
  reason: {
    type: String,
  },
  settleDate: {
    type: Date,
  },
  unRecoveredAmount: {
    type: Date,
  },
});

module.exports = mongoose.model("containerDeposits", containerDeposits);
