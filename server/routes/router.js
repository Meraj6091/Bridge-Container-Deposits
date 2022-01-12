const express = require("express");
const router = express.Router();
const signUpTemplate = require("../models/signUpModel");
const importerTemplate = require("../models/importer");
const { response } = require("express");
router.post("/signup", (request, response) => {
  const signUpUser = new signUpTemplate({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
  });
  signUpUser
    .save()
    .then((data) => {
      return response.json(data);
    })
    .catch((err) => {
      return response.json(err);
    });
});

router.post("/login", async (request, response) => {
  const findAllSignUpData = await signUpTemplate.find({});

  try {
    if (findAllSignUpData) {
      const isEqual = findAllSignUpData.some(
        (data) =>
          data.firstName === request.body.firstName &&
          data.password === request.body.password
      );
      if (isEqual) {
        return response.json("matched");
      } else {
        return response.json("UnMatched");
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/importer", (request, response) => {
  const importer = new importerTemplate({
    importerName: request.body.importerName,
    entity: request.body.entity,
  });
  importer
    .save()
    .then((data) => {
      return response.json(data);
    })
    .catch((err) => {
      return response.json(err);
    });
});
router.get("/getImporter", async (request, response) => {
  const importer = await importerTemplate.find({});
  try {
    if (importer) {
      return response.json(importer);
    }
  } catch (err) {
    return response.json(err);
  }
});
router.put("/updateImporter", async (request, response) => {
  console.log(request.body._id);
  try {
    const importer = await importerTemplate
      .updateOne({
        importerName: request.body.importerName,
        entity: request.body.entity,
      })
      .where({ _id: request.body._id });
    if (importer) {
      return response.json(importer);
    }
  } catch (e) {
    response.json(e);
  }
});

router.post("/deleteImporter", async (request, response) => {
  console.log("meraj");
  console.log(request);
  try {
    const importer = await importerTemplate
      .deleteOne()
      .where({ _id: request.body._id });
    if (importer) {
      return response.json(importer);
    }
  } catch (e) {
    response.json(e);
  }
});

module.exports = router;
