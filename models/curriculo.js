const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  facebook: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  carreira: [{ type: mongoose.Schema.Types.ObjectId, ref: "Carreira" }],
});

let Model;

try {
  // Trying to get the existing model to avoid OverwriteModelError
  Model = mongoose.model("Curriculo");
} catch {
  Model = mongoose.model("Curriculo", schema);
}

module.exports = Model;
