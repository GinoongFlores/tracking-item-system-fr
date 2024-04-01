import { create } from "zustand";
import AxiosInstance from "../api/Axios";
import { toast } from "react-hot-toast";

export const useAuth = create((set, get) => ({
  token: null,
  currentUser: null,
  userStatus: null,
  userRole: null,
  loading: false,
  isActive: false,

  getUser: async () => {
    set({ loading: true });
    try {
      const token = localStorage.getItem("token");
      /*
      ? In JavaScript, when the property name is the same as the variable name, you can use shorthand property names. So, set({ token: token }) can be simplified to set({ token }).
      */
      set({ token });

      const response = await AxiosInstance.get("user/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(token);
      set({
        currentUser: response.data.data.is_activated
          ? response.data.data
          : null,
        userStatus: response.data.data.is_activated,
        userRole: response.data.data.role,
        loading: false,
      });
      return response.data;
    } catch (error) {
      console.log(error.response);
      toast.error("An error occurred while fetching user data");
      set({ loading: false });
    }
  },

  login: async ({ ...data }) => {
    set({ loading: true });
    try {
      const response = await AxiosInstance.post("/login", {
        ...data,
      });
      const userToken = response.data.token;
      localStorage.setItem("token", userToken);

      // get user data through the getUser method
      const userData = await get().getUser();
      if (userData && userData.data.is_activated && userData.data.role) {
        toast.success("Login successful", {
          position: "top-center",
          id: "login-toast",
        });
        set({ isActive: true });
      } else {
        localStorage.removeItem("token");
        toast.error("Account activation is pending");
        set({ token: null });
      }
      set({ loading: false, isActive: false });

      return response;
    } catch (error) {
      // console.log(error.response.data.message);
      const unauthorized = error.response.data.message === "Unauthorized";
      const generalError = "An error occurred while logging in";
      toast.error(unauthorized ? unauthorized : generalError);
      localStorage.removeItem("token");
      set({ token: null, loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await AxiosInstance.post(
        "/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(get().token);
      localStorage.removeItem("token");
      set({ token: null, currentUser: null, userStatus: null, loading: false });
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error.response);
    }
  },
}));
