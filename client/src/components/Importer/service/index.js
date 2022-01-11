const axios = require("axios").default;

export const importer = (data) => {
  return axios.post("http://localhost:4000/app/importer", data);
};

export const getImporter = (data) => {
  return axios.get("http://localhost:4000/app/getImporter", data);
};
