import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // change if backend URL differs
  withCredentials: true, // if you’re using cookies for auth
});

export default api;
