const axios = require("axios").default;
import { heroku } from "../../apiEndPoints";
export const login = (data) => {
  return axios.post(`${heroku}/app/login`, data);
};
