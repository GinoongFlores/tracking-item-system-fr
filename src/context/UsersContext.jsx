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
      const cacheData = localStorage.getItem("usersData");
      if (cacheData) {
        // if the data is in local storage, use it
        setUsers(JSON.parse(cacheData));
      } else {
        response = await AxiosInstance.get("/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        localStorage.setItem("usersData", JSON.stringify(response.data.data));
        setUsers(response.data.data);
      }

      if (response) {
        return response;
      }

      // console.log(response.data.data);
      // return response;
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

  return (
    <UsersDataContext.Provider value={{ fetchUsers, users }}>
      {children}
    </UsersDataContext.Provider>
  );
};

export const useUserContext = () => useContext(UsersDataContext);
