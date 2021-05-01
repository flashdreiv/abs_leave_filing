import axios from "axios";

const dataToken = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : "";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/",
  timeout: 5000,
  headers: {
    Authorization: "JWT " + dataToken.access,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});
const axiosSignup = axios.create({
  baseURL: "http://localhost:8000/api/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});
let axiosActions = [axiosInstance, axiosSignup];
export default axiosActions;
