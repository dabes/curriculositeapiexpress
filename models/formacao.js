const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  curso: {
    type: String,
    required: true,
  },
  grau: {
    type: String,
    required: true,
  },
  instituicao: {
    type: String,
    required: true,
  },
  inicio: {
    type: String,
    required: true,
  },
  estado: {
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
  Model = mongoose.model("Formacao");
} catch {
  Model = mongoose.model("Formacao", schema);
}

module.exports = Model;
