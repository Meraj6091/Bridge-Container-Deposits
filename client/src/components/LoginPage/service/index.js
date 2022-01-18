import { apiEndPoint } from "../../apiEndPoints";
const axios = require("axios").default;
export const login = (data) => {
  return axios.post(`${apiEndPoint()}/app/login`, data);
};
