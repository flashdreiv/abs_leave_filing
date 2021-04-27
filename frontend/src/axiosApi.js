import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/",
  timeout: 5000,
  headers: {
    // Authorization: "JWT " + localStorage.getItem("access_token"),
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
