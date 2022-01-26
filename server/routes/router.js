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
    email: request.body.email,
  });
  signUpUser
    .save()
    .then((data) => {
      return response.json(data);
    })
    .catch((err) => {
      // return response.json(err);
    });
});

router.post("/login", async (request, response) => {
  const findAllSignUpData = await signUpTemplate.find({});
  let obj = {
    admin: "",
    match: "",
    unMatch: "",
    firstName: "",
    password: "",
  };
  try {
    if (findAllSignUpData) {
      if (request.body.firstName === "Admin") {
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
        obj.firstName = request.body.firstName;
        obj.password = request.body.password;
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
    createdBy: request.body.createdBy,
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
        updatedBy: request.body.updatedBy,
        updatedDate: request.body.updatedDate,
      })
      .where({ _id: request.body._id });
    if (importer) {
      return response.json(importer);
    }
  } catch (e) {
    response.json(e);
  }
});

router.put("/deleteImporter", async (request, response) => {
  console.log("meraj");
  console.log(request);
  try {
    const importer = await importerTemplate
      .updateOne({
        isDeleted: true,
        deletedBy: request.body.deletedBy,
      })
      .where({ _id: request.body.id });
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
  const getContainerDeposits = await containerDepositsModel
    .find({})
    .sort({ createdDate: -1 });
  try {
    if (getContainerDeposits) {
      return response.json(getContainerDeposits);
    }
  } catch (err) {
    return response.json(err);
  }
});

router.put("/updateContainerDeposits", async (request, response) => {
  console.log(request.body);
  try {
    const updateContainerDeposits = await containerDepositsModel
      .updateOne(request.body)
      .where({ _id: request.body.uuid });
    if (updateContainerDeposits) {
      return response.json(updateContainerDeposits);
    }
  } catch (e) {
    response.json(e);
  }
});

router.put("/deleteContainerDeposits", async (request, response) => {
  console.log("meraj");
  console.log(request);
  try {
    const deleteContainerDeposits = await containerDepositsModel
      .updateOne({
        isDeleted: true,
        deletedBy: request.body.deletedBy,
      })
      .where({ _id: request.body.id });
    if (deleteContainerDeposits) {
      return response.json(deleteContainerDeposits);
    }
  } catch (e) {
    response.json(e);
  }
});

//entities

router.get("/getEntities", async (request, response) => {
  const getEntities = await importerTemplate
    .find({})
    .where({ isDeleted: false });
  try {
    if (getEntities) {
      console.log(getEntities);
      return response.json(getEntities);
    }
  } catch (err) {
    return response.json(err);
  }
});

//filter
router.post("/getContainerDepositsFilters", async (request, response) => {
  console.log(request);
  const getContainerDepositsFilters = await containerDepositsModel
    .find()
    .where({
      [request.body.select]: {
        $regex: `.*${request.body.value}.*`, //like query
        $options: "i", //for case sensitive
      },
    });

  try {
    if (getContainerDepositsFilters) {
      return response.json(getContainerDepositsFilters);
    }
  } catch (err) {
    return response.json(err);
  }
});

//get all users

router.get("/getAllUsers", async (request, response) => {
  try {
    const getAllUsers = await signUpTemplate.find({});
    if (getAllUsers) {
      console.log(getAllUsers);
      return response.json(getAllUsers);
    }
  } catch (err) {
    return response.json(err);
  }
});

//change Password
router.put("/changePasscode", async (request, response) => {
  console.log(request.body);
  try {
    const changePassword = await signUpTemplate
      .updateOne({
        password: request.body.newPassword,
        updatedBy: request.body.currentUser,
        updatedDate: request.body.updatedDate,
      })
      .where({ firstName: request.body.currentUser });
    if (changePassword) {
      const getLatestUserDetails = await signUpTemplate
        .find({})
        .select("password")
        .where({ firstName: request.body.currentUser });
      if (getLatestUserDetails) {
        console.log("meraj");
        console.log(getLatestUserDetails);
        return response.json(getLatestUserDetails);
      }
    }
  } catch (e) {
    response.json(e);
  }
});

module.exports = router;
