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

  const getToken = localStorage.getItem("token");

  // show loading screen while fetching user data
  useEffect(() => {
    if (getToken) {
      getUser().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [getToken]);

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      setToken(token);

      const response = await AxiosInstance.get("user/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCurrentUser(response.data.data);
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
      setToken(userToken);

      const userData = await getUser();
      if (userData && userData.data.is_activated && userData.data.role) {
        navigate("/", { replace: true });
        toast.success("Logged in successfully", {
          position: "top-center",
        });
      } else {
        localStorage.removeItem("token");
        toast.error("Account activation is pending");
        // if (!userData.data.role) {
        //   toast.error("no role assigned");
        // }
        // navigate("/login");
      }
      return response;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
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
      setToken(userToken);
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
      const response = await AxiosInstance.post(
        "/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
