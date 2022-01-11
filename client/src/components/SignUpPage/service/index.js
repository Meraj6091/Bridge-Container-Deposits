const axios = require("axios").default;

export const createAccount = (data) => {
  return axios.post("http://localhost:4000/app/signup", data);
};
