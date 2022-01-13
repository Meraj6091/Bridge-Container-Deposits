const axios = require("axios").default;

export const login = (data) => {
  return axios.post("http://localhost:4000/app/login", data);
};
