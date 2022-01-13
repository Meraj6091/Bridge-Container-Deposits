const axios = require("axios").default;

export const getUsers = (data) => {
  return axios.get("http://localhost:4000/app/getUsers", data);
};
