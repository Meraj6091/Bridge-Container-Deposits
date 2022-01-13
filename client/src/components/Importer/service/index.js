const axios = require("axios").default;

export const importer = (data) => {
  return axios.post("http://localhost:4000/app/importer", data);
};

export const getImporter = (data) => {
  return axios.get("http://localhost:4000/app/getImporter", data);
};

export const updateImporter = (data) => {
  return axios.put("http://localhost:4000/app/updateImporter", data);
};
export const deleteImporter = (data) => {
  return axios.post("http://localhost:4000/app/deleteImporter", data);
};
