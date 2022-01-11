const express = require("express");
const router = express.Router();
const signUpTemplate = require("../models/signUpModel");

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
  console.log(request);
  const findAllSignUpData = await signUpTemplate.find({});
  console.log(findAllSignUpData);
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

module.exports = router;
