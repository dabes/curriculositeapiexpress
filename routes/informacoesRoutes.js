const Model = require("../models/informacoes");
const path = require("../constants/paths");
const bodyParser = require("body-parser");

const getItem = async () => {
  try {
    const result = await Model.find();
    if (result === null) {
      throw { message: "Data is empty!" };
    } else return result;
  } catch (err) {
    throw { message: err.message };
  }
};

const getItembyCurriculo = async (query) => {
  try {
    const result = await Model.find({ curriculo: query.id });
    if (result === null) {
      throw { message: "Data not found!" };
    } else return result;
  } catch (err) {
    throw { message: err.message };
  }
};

const postItem = async (req) => {
  const result = new Model({
    email: req.body.email,
    idade: req.body.idade,
    dataNascimento: req.body.dataNascimento,
    sexo: req.body.sexo,
    estadoCivil: req.body.estadoCivil,
    curriculo: req.body.curriculo,
  });

  try {
    const newResult = await result.save();
    return newResult;
  } catch (err) {
    return err.message;
  }
};

const patchItem = async (req) => {
  let data = {};
  if (req.body.email != null) {
    data.email = req.body.email;
  }

  if (req.body.idade != null) {
    data.idade = req.body.idade;
  }

  if (req.body.dataNascimento != null) {
    data.dataNascimento = req.body.dataNascimento;
  }

  if (req.body.sexo != null) {
    data.sexo = req.body.sexo;
  }

  if (req.body.estadoCivil != null) {
    data.estadoCivil = req.body.estadoCivil;
  }

  if (req.body.curriculo != null) {
    data.curriculo = req.body.curriculo;
  }

  try {
    await Model.findByIdAndUpdate(req.params.id, data);
    const updatedData = await Model.findById(req.params.id);
    return updatedData;
  } catch (err) {
    throw { message: err.message };
  }
};

const deleteItem = async (query) => {
  try {
    await Model.findByIdAndDelete(query.id);
    return { message: "Data deleted!" };
  } catch (err) {
    throw { message: err.message };
  }
};

module.exports = (app) => {
  app.get(path.INFORMACOES + "/", bodyParser.json(), (request, response) => {
    getItem()
      .then((result) => {
        response.status(200).json(result);
      })
      .catch((error) => {
        response.status(500).json(error);
      });
  });

  app.get(path.INFORMACOES + "/:id", bodyParser.json(), (request, response) => {
    getItembyCurriculo(request.params)
      .then((result) => {
        response.status(200).json(result);
      })
      .catch((error) => {
        response.status(500).json(error);
      });
  });

  app.post(path.INFORMACOES + "/", (request, response) => {
    postItem(request)
      .then((result) => {
        response.status(201).json(result);
      })
      .catch((error) => {
        response.status(500).json(error);
      });
  });

  app.patch(path.INFORMACOES + "/:id", (request, response) => {
    patchItem(request)
      .then((result) => {
        response.status(200).json(result);
      })
      .catch((error) => {
        response.status(500).json(error);
      });
  });

  app.delete(path.INFORMACOES + "/:id", (request, response) => {
    deleteItem(request.params)
      .then((result) => {
        response.status(200).json(result);
      })
      .catch((error) => {
        response.status(500).json(error);
      });
  });
};
