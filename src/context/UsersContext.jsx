import { useState, useEffect, useCallback } from "react";
import { useContext, createContext } from "react";
import AxiosInstance from "../api/Axios";
import { toast } from "react-hot-toast";
import { useAuthContext } from "./AuthContext";
import { UserRole } from "../hooks/UserRole";

const UsersDataContext = createContext();

export const UserProvider = ({ children }) => {
  const { token } = useAuthContext();
  const [users, setUsers] = useState([]);

  const fetchUsers = useCallback(async () => {
    let response;
    try {
      // check if the data is in local storage
      response = await AxiosInstance.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("all users ", response.data);
      setUsers(response.data.data);
      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      // toast.error(
      //   typeof errorMessage === "object"
      //     ? JSON.stringify(errorMessage)
      //     : errorMessage
      // );
      // console.log(error);
    }
  }, [token]);

  const toggleActivation = async (userId) => {
    try {
      const response = await AxiosInstance.post(
        `/user/${userId}/activation`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const activation = response.data.data.is_activated;
      // console.log(response.data.data.is_activated);
      activation
        ? toast.success("User activated")
        : toast.error("User deactivated");
      return response;
    } catch (error) {
      console.log(error.response);
    }
  };

  // const assignRole = async (userId, role) => {
  //   try {
  //     const response = await AxiosInstance.post(`/user/${userId}assign_role`)
  //   }
  // }

  return (
    <UsersDataContext.Provider
      value={{ fetchUsers, users, toggleActivation, setUsers }}
    >
      {children}
    </UsersDataContext.Provider>
  );
};

export const useUserContext = () => useContext(UsersDataContext);
