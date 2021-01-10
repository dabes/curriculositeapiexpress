const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  timefrom: {
    type: String,
    required: true,
  },
  timeto: {
    type: String,
  },
  position: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  curriculo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Curriculo",
    required: true,
  },
});

let Model;

try {
  // Trying to get the existing model to avoid OverwriteModelError
  Model = mongoose.model("Carreira");
} catch {
  Model = mongoose.model("Carreira", schema);
}

module.exports = Model;
