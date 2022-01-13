import { heroku } from "../../apiEndPoints";
const axios = require("axios").default;
export const login = (data) => {
  return axios.post(`${heroku}/app/login`, data);
};
