const Model = require("../models/carreira");
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
    company: req.body.company,
    timefrom: req.body.timefrom,
    timeto: req.body.timeto,
    position: req.body.position,
    description: req.body.description,
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
  if (req.body.company != null) {
    data.company = req.body.company;
  }

  if (req.body.timefrom != null) {
    data.timefrom = req.body.timefrom;
  }

  if (req.body.timeto != null) {
    data.timeto = req.body.timeto;
  }

  if (req.body.position != null) {
    data.position = req.body.position;
  }

  if (req.body.description != null) {
    data.description = req.body.description;
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
  app.get(path.CARREIRA + "/", bodyParser.json(), (request, response) => {
    getItem()
      .then((result) => {
        response.status(200).json(result);
      })
      .catch((error) => {
        response.status(500).json(error);
      });
  });

  app.get(path.CARREIRA + "/:id", bodyParser.json(), (request, response) => {
    getItembyCurriculo(request.params)
      .then((result) => {
        response.status(200).json(result);
      })
      .catch((error) => {
        response.status(500).json(error);
      });
  });

  app.post(path.CARREIRA + "/", (request, response) => {
    postItem(request)
      .then((result) => {
        response.status(201).json(result);
      })
      .catch((error) => {
        response.status(500).json(error);
      });
  });

  app.patch(path.CARREIRA + "/:id", (request, response) => {
    patchItem(request)
      .then((result) => {
        response.status(200).json(result);
      })
      .catch((error) => {
        response.status(500).json(error);
      });
  });

  app.delete(path.CARREIRA + "/:id", (request, response) => {
    deleteItem(request.params)
      .then((result) => {
        response.status(200).json(result);
      })
      .catch((error) => {
        response.status(500).json(error);
      });
  });
};
