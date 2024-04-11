import axios from "axios";

const AxiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:8000/api",
  baseURL: import.meta.env.VITE_REACT_APP_BASE_URL + "/api",
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

AxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default AxiosInstance;
