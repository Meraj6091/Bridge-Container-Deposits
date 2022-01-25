import { apiEndPoint } from "../../apiEndPoints";
const axios = require("axios").default;
export const changeLogin = (data) => {
  debugger;
  return axios.put(`${apiEndPoint()}/app/changePasscode`, data);
};
