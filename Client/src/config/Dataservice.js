import axios from "axios";
const getToken = () => {
  return localStorage.getItem("token");
};
console.log(process.env.REACT_APP_API_ENDPOINT, "portrtr");
export const DataService = () => {
  return axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    headers: {
      auth: getToken(),
    },
  });
};
