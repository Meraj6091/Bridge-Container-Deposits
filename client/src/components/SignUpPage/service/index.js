import { apiEndPoint } from "../../apiEndPoints";
const axios = require("axios").default;
export const createAccount = (data) => {
  return axios.post(`${apiEndPoint}/app/signup`, data);
};
