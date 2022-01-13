const axios = require("axios").default;
import { heroku } from "../../apiEndPoints";

export const saveContainerDeposits = (data) => {
  return axios.post(`${heroku}/app/containerDeposits`, data);
};

export const getContainerDeposits = (data) => {
  return axios.get(`${heroku}/app/getContainerDeposits`, data);
};

export const updateContainerDeposits = (data) => {
  return axios.put(`${heroku}/app/updateContainerDeposits`, data);
};
export const deleteContainerDeposits = (data) => {
  return axios.post(`${heroku}/app/deleteContainerDeposits`, data);
};

//load entities

export const getEntities = (data) => {
  return axios.get(`${heroku}/app/getEntities`, data);
};
