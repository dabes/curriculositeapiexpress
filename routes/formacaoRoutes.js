const Model = require("../models/formacao");
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
    curso: req.body.curso,
    grau: req.body.grau,
    instituicao: req.body.instituicao,
    inicio: req.body.inicio,
    estado: req.body.estado,
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
  if (req.body.curso != null) {
    data.curso = req.body.curso;
  }

  if (req.body.grau != null) {
    data.grau = req.body.grau;
  }

  if (req.body.instituicao != null) {
    data.instituicao = req.body.instituicao;
  }

  if (req.body.inicio != null) {
    data.inicio = req.body.inicio;
  }

  if (req.body.estado != null) {
    data.estado = req.body.estado;
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
  app.get(path.FORMACAO + "/", bodyParser.json(), (request, response) => {
    getItem()
      .then((result) => {
        response.status(200).json(result);
      })
      .catch((error) => {
        response.status(500).json(error);
      });
  });

  app.get(path.FORMACAO + "/:id", bodyParser.json(), (request, response) => {
    getItembyCurriculo(request.params)
      .then((result) => {
        response.status(200).json(result);
      })
      .catch((error) => {
        response.status(500).json(error);
      });
  });

  app.post(path.FORMACAO + "/", (request, response) => {
    postItem(request)
      .then((result) => {
        response.status(201).json(result);
      })
      .catch((error) => {
        response.status(500).json(error);
      });
  });

  app.patch(path.FORMACAO + "/:id", (request, response) => {
    patchItem(request)
      .then((result) => {
        response.status(200).json(result);
      })
      .catch((error) => {
        response.status(500).json(error);
      });
  });

  app.delete(path.FORMACAO + "/:id", (request, response) => {
    deleteItem(request.params)
      .then((result) => {
        response.status(200).json(result);
      })
      .catch((error) => {
        response.status(500).json(error);
      });
  });
};
