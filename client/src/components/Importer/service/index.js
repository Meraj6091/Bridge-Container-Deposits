import { apiEndPoint } from "../../apiEndPoints";
const axios = require("axios").default;
export const importer = (data) => {
  return axios.post(`${apiEndPoint()}/app/importer`, data);
};

export const getImporter = (data) => {
  return axios.get(`${apiEndPoint()}/app/getImporter`, data);
};

export const updateImporter = (data) => {
  return axios.put(`${apiEndPoint()}/app/updateImporter`, data);
};
export const deleteImporter = (data) => {
  return axios.post(`${apiEndPoint()}/app/deleteImporter`, data);
};
