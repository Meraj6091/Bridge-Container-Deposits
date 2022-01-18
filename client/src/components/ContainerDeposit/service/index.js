import { apiEndPoint } from "../../apiEndPoints";
const axios = require("axios").default;

export const saveContainerDeposits = (data) => {
  return axios.post(`${apiEndPoint()}/app/containerDeposits`, data);
};

export const getContainerDeposits = (data) => {
  return axios.get(`${apiEndPoint()}/app/getContainerDeposits`, data);
};

export const updateContainerDeposits = (data) => {
  return axios.put(`${apiEndPoint()}/app/updateContainerDeposits`, data);
};
export const deleteContainerDeposits = (data) => {
  return axios.post(`${apiEndPoint()}/app/deleteContainerDeposits`, data);
};

//load entities

export const getEntities = (data) => {
  return axios.get(`${apiEndPoint()}/app/getEntities`, data);
};
