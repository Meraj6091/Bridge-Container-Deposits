const axios = require("axios").default;
import { heroku } from "../../apiEndPoints";
export const importer = (data) => {
  return axios.post(`${heroku}/app/importer`, data);
};

export const getImporter = (data) => {
  return axios.get(`${heroku}/app/getImporter`, data);
};

export const updateImporter = (data) => {
  return axios.put(`${heroku}/app/updateImporter`, data);
};
export const deleteImporter = (data) => {
  return axios.post(`${heroku}/app/deleteImporter`, data);
};
