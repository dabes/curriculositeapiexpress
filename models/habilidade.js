const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  percent: {
    type: String,
    required: true,
  },
  curriculo: { type: mongoose.Schema.Types.ObjectId, ref: "Curriculo" },
});
let Model;

try {
  // Trying to get the existing model to avoid OverwriteModelError
  Model = mongoose.model("Habilidade");
} catch {
  Model = mongoose.model("Habilidade", schema);
}

module.exports = Model;
