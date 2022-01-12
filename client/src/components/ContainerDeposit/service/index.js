const axios = require("axios").default;

export const saveContainerDeposits = (data) => {
  debugger;
  return axios.post("http://localhost:4000/app/containerDeposits", data);
};

export const getContainerDeposits = (data) => {
  return axios.get("http://localhost:4000/app/getContainerDeposits", data);
};

export const updateContainerDeposits = (data) => {
  return axios.put("http://localhost:4000/app/updateContainerDeposits", data);
};
export const deleteContainerDeposits = (data) => {
  debugger;
  return axios.post("http://localhost:4000/app/deleteContainerDeposits", data);
};

//load entities

export const getEntities = (data) => {
  return axios.get("http://localhost:4000/app/getEntities", data);
};
