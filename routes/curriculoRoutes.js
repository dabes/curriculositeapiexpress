const Model = require("../models/curriculo");
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

const getItembyId = async (query) => {
  try {
    const result = await Model.findById(query.id);
    if (result === null) {
      throw { message: "Data is empty!" };
    } else return result;
  } catch (err) {
    throw { message: err.message };
  }
};

const postItem = async (req) => {
  const result = new Model({
    name: req.body.name,
    title: req.body.title,
    description: req.body.description,
    facebook: req.body.facebook,
    linkedin: req.body.linkedin,
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

  if (req.body.title != null) {
    data.title = req.body.title;
  }

  if (req.body.description != null) {
    data.description = req.body.description;
  }

  if (req.body.facebook != null) {
    data.facebook = req.body.facebook;
  }

  if (req.body.linkedin != null) {
    data.linkedin = req.body.linkedin;
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
    return { message: "Curriculo deleted!" };
  } catch (err) {
    throw { message: err.message };
  }
};

module.exports = (app) => {
  app.get(path.CURRICULO + "/", bodyParser.json(), (request, response) => {
    getItem()
      .then((result) => {
        response.status(200).json(result);
      })
      .catch((error) => {
        response.status(500).json(error);
      });
  });

  app.get(path.CURRICULO + "/:id", bodyParser.json(), (request, response) => {
    getItembyId(request.params)
      .then((result) => {
        response.status(200).json(result);
      })
      .catch((error) => {
        response.status(500).json(error);
      });
  });

  app.post(path.CURRICULO + "/", (request, response) => {
    postItem(request)
      .then((result) => {
        response.status(201).json(result);
      })
      .catch((error) => {
        response.status(500).json(error);
      });
  });

  app.patch(path.CURRICULO + "/:id", (request, response) => {
    patchItem(request)
      .then((result) => {
        response.status(200).json(result);
      })
      .catch((error) => {
        response.status(500).json(error);
      });
  });

  app.delete(path.CURRICULO + "/:id", (request, response) => {
    deleteItem(request.params)
      .then((result) => {
        response.status(200).json(result);
      })
      .catch((error) => {
        response.status(500).json(error);
      });
  });
};
