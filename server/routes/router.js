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

module.exports = router;
