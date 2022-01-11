const mongoose = require("mongoose");

const importerTemplate = new mongoose.Schema({
  importerName: {
    type: String,
    required: true,
  },
  entity: {
    type: String,
  },
});

module.exports = mongoose.model("importer", importerTemplate);
