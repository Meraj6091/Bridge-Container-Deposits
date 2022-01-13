const axios = require("axios").default;
import { heroku } from "../../apiEndPoints";
export const createAccount = (data) => {
  return axios.post(`${heroku}/app/signup`, data);
};
