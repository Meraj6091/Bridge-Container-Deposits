const mongoose = require("mongoose");

const importerTemplate = new mongoose.Schema({
  importerName: {
    type: String,
    required: true,
  },
  entity: {
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

module.exports = mongoose.model("importer", importerTemplate);
