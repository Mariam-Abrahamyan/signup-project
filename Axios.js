import axios from "axios";
export const Axios = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5001",
});
