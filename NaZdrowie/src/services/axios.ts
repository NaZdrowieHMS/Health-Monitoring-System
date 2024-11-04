import axios from "axios";

import { API_URL } from "./config";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "Access-Control-Allow-Origin": "*", // Allow CORS - to be changed when deployment is
  },
});

// Add a request interceptor to include the token in requests
axiosInstance.interceptors.request.use((config) => {
  // login token can be added here
  return config;
});

// Add a response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

// Return the custom Axios instance
export default axiosInstance;
