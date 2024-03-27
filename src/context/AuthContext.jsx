import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import AxiosInstance from "../api/Axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
const authContext = createContext({});

export const UserAuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const getToken = localStorage.getItem("token");

  // show loading screen while fetching user data
  useEffect(() => {
    if (getToken) {
      getUser().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [getToken]);

  // prevent user from accessing the login page if already logged in
  useEffect(() => {
    if (location.pathname === "/login" && currentUser) {
      navigate("/", { replace: true });
    }
  }, [currentUser, location.pathname, navigate]);

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      setToken(token);

      // check if the user data is in local storage
      // const cachedUser = localStorage.getItem("currentUser");
      // if (cachedUser) {
      //   setCurrentUser(JSON.parse(cachedUser));
      //   return JSON.parse(cachedUser);
      // }

      const response = await AxiosInstance.get("/current-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // store user data in local storage
      // localStorage.setItem("currentUser", JSON.stringify(response.data));

      // console.log(response);
      setCurrentUser(response.data.data);
      // console.log(response.data.data);
      return response.data;
    } catch (error) {
      console.log("get user error: ", error.response);
      // throw error;
    }
  };

  const login = async ({ ...data }) => {
    try {
      const response = await AxiosInstance.post("/login", {
        ...data,
      });
      // console.log(response);
      const userToken = response.data.token;
      localStorage.setItem("token", userToken);
      if (userToken) {
        await navigate("/", { replace: true });
        toast.success("Logged in successfully", {
          position: "top-center",
        });
      } else {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      // console.log(error.response.data.message);
      // toast.error(error.response.data.message);
    }
  };

  // first register
  const register = async ({ ...data }) => {
    try {
      const response = await AxiosInstance.post("/register", {
        ...data,
      });
      const userToken = response.data.token;
      localStorage.setItem("token", userToken);
      if (userToken) {
        await getUser();
        navigate("/", { replace: true });
        toast.success("Logged in successfully", {
          position: "top-center",
        });
      } else {
        navigate("/register");
      }
      return response;
    } catch (error) {
      // console.log(error);
      const errors = error.response.data.message.error;
      for (const field in errors) {
        errors[field].forEach((errorMessage) => {
          toast.error(`${errorMessage}`);
        });
      }
      // toast.error(error.response.data.message);
      // toast.error(
      //   typeof errorMessage === "object"
      //     ? JSON.stringify(errorMessage)
      //     : errorMessage
      // );
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await AxiosInstance.post(
        "/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // localStorage.removeItem("token");
      // localStorage.removeItem("user");
      localStorage.clear();
      setCurrentUser(null);
      navigate("/login", { replace: true });
      toast.success("Logged out successfully");

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <authContext.Provider
      value={{
        loading,
        currentUser,
        login,
        logout,
        register,
        getUser,
        token,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

// export default function useAuthContext() {
//   return useContext(authContext);
// }

export const useAuthContext = () => useContext(authContext);
