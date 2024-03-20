import AxiosInstance from "../api/Axios";

import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const authContext = createContext({});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const login = async ({ ...data }) => {
    try {
      const response = await AxiosInstance.post("/login", data);
      console.log(response.data);

      const userToken = response.data.data.token;
      localStorage.setItem("userToken", userToken);

      if (userToken) {
        navigate("/");
      } else {
        localStorage.clear();
        console.log("unauthorized");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const register = async ({ ...data }) => {
    try {
      const response = await AxiosInstance.post("/register", {
        ...data,
      });
      console.log(response.data);

      const userToken = response.data.data.token;
      localStorage.setItem("token", userToken);
      if (userToken) {
        navigate("/", { replace: true });
      } else {
        navigate("/register");
      }
      return response;
    } catch (error) {
      console.log("error " + error);
    }
  };

  return (
    <authContext.Provider value={{ login, register }}>
      {children}
    </authContext.Provider>
  );
};

export default function UseAuthContext() {
  return useContext(authContext);
}
