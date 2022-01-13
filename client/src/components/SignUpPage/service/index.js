import { heroku } from "../../apiEndPoints";
const axios = require("axios").default;
export const createAccount = (data) => {
  return axios.post(`${heroku}/app/signup`, data);
};
