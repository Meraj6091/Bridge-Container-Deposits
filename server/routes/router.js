const express = require("express");
const router = express.Router();
const signUpTemplate = require("../models/signUpModel");
const importerTemplate = require("../models/importer");
const { response } = require("express");
const containerDepositsModel = require("../models/containerDepositsModel");
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
  let obj = {
    admin: "",
    match: "",
    unMatch: "",
  };
  try {
    if (findAllSignUpData) {
      if (
        request.body.firstName === "Admin" &&
        request.body.password === "123"
      ) {
        const isAdmin = findAllSignUpData.some(
          (data) =>
            data.firstName === request.body.firstName &&
            data.password === request.body.password
        );
        if (isAdmin) {
          obj.admin = true;
        } else {
          obj.admin = false;
        }
      }
      const isEqual = findAllSignUpData.some(
        (data) =>
          data.firstName === request.body.firstName &&
          data.password === request.body.password
      );
      if (isEqual) {
        obj.match = true;
      } else {
        obj.unMatch = true;
      }
      return response.json(obj);
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

//container routes

router.post("/containerDeposits", (request, response) => {
  const containerDeposits = new containerDepositsModel(request.body);
  containerDeposits
    .save()
    .then((data) => {
      return response.json(data);
    })
    .catch((err) => {
      return response.json(err);
    });
});

router.get("/getContainerDeposits", async (request, response) => {
  const getContainerDeposits = await containerDepositsModel.find({});
  try {
    if (getContainerDeposits) {
      return response.json(getContainerDeposits);
    }
  } catch (err) {
    return response.json(err);
  }
});

router.put("/updateContainerDeposits", async (request, response) => {
  console.log(request.body._id);
  try {
    const updateContainerDeposits = await containerDepositsModel
      .updateOne(request.body)
      .where({ _id: request.body._id });
    if (updateContainerDeposits) {
      return response.json(updateContainerDeposits);
    }
  } catch (e) {
    response.json(e);
  }
});

router.post("/deleteContainerDeposits", async (request, response) => {
  console.log("meraj");
  console.log(request);
  try {
    const deleteContainerDeposits = await containerDepositsModel
      .deleteOne()
      .where({ _id: request.body._id });
    if (deleteContainerDeposits) {
      return response.json(deleteContainerDeposits);
    }
  } catch (e) {
    response.json(e);
  }
});

//entities

router.get("/getEntities", async (request, response) => {
  const getEntities = await importerTemplate.find({});
  try {
    if (getEntities) {
      console.log(getEntities);
      return response.json(getEntities);
    }
  } catch (err) {
    return response.json(err);
  }
});

module.exports = router;
