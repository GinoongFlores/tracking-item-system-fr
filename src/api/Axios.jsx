import axios from "axios";

const AxiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:8000/api",
  baseURL: import.meta.env.VITE_REACT_APP_BASE_URL + "/api",
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export default AxiosInstance;
