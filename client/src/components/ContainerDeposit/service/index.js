import { apiEndPoint } from "../../apiEndPoints";
const axios = require("axios").default;

export const saveContainerDeposits = (data) => {
  return axios.post(`${apiEndPoint()}/app/containerDeposits`, data);
};

export const getContainerDeposits = (data) => {
  return axios.get(`${apiEndPoint()}/app/getContainerDeposits`, data);
};

export const updateContainerDeposits = (data) => {
  debugger;
  let postData = data;
  if (data._id) {
    postData.uuid = data._id;
  }
  return axios.put(`${apiEndPoint()}/app/updateContainerDeposits`, postData);
};
export const deleteContainerDeposits = (data) => {
  return axios.post(`${apiEndPoint()}/app/deleteContainerDeposits`, data);
};

//load entities

export const getEntities = (data) => {
  return axios.get(`${apiEndPoint()}/app/getEntities`, data);
};

export const getFilterContainerDeposits = (data) => {
  return axios.post(`${apiEndPoint()}/app/getContainerDepositsFilters`, data);
};
