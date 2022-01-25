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
    type: Number,
  },
  ataDate: {
    type: String,
  },
  docReceivedDate: {
    type: String,
  },
  docSubmittedDate: {
    type: String,
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
    type: String,
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
    type: String,
  },
  unRecoveredAmount: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },

  createdBy: {
    type: String,
  },
  updatedBy: {
    type: String,
  },
  deletedBy: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
  },
});

module.exports = mongoose.model("containerDeposits", containerDeposits);
