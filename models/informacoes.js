const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  idade: {
    type: String,
    required: true,
  },
  dataNascimento: {
    type: String,
  },
  sexo: {
    type: String,
    required: true,
  },
  estadoCivil: {
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
  Model = mongoose.model("Informacoes");
} catch {
  Model = mongoose.model("Informacoes", schema);
}

module.exports = Model;
