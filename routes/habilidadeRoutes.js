const Model = require("../models/habilidade");
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
    name: req.body.name,
    type: req.body.type,
    percent: req.body.percent,
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
  if (req.body.name != null) {
    data.name = req.body.name;
  }

  if (req.body.type != null) {
    data.type = req.body.type;
  }

  if (req.body.percent != null) {
    data.percent = req.body.percent;
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
  app.get(path.HABILIDADE + "/", bodyParser.json(), (request, response) => {
    getItem()
      .then((result) => {
        response.status(200).json(result);
      })
      .catch((error) => {
        response.status(500).json(error);
      });
  });

  app.get(path.HABILIDADE + "/:id", bodyParser.json(), (request, response) => {
    getItembyCurriculo(request.params)
      .then((result) => {
        response.status(200).json(result);
      })
      .catch((error) => {
        response.status(500).json(error);
      });
  });

  app.post(path.HABILIDADE + "/", (request, response) => {
    postItem(request)
      .then((result) => {
        response.status(201).json(result);
      })
      .catch((error) => {
        response.status(500).json(error);
      });
  });

  app.patch(path.HABILIDADE + "/:id", (request, response) => {
    patchItem(request)
      .then((result) => {
        response.status(200).json(result);
      })
      .catch((error) => {
        response.status(500).json(error);
      });
  });

  app.delete(path.HABILIDADE + "/:id", (request, response) => {
    deleteItem(request.params)
      .then((result) => {
        response.status(200).json(result);
      })
      .catch((error) => {
        response.status(500).json(error);
      });
  });
};
