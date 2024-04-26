import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AxiosInstance from "../api/Axios";
import { toast } from "react-hot-toast";

export const useAuth = create((set, get) => ({
  token: null,
  currentUser: null,
  userFirstName: null,
  userEmail: null,
  userStatus: null,
  userRole: null,
  loading: false,

  getUser: async () => {
    set({ loading: true });
    try {
      const response = await AxiosInstance.get("/user/current");

      if (response.data && response.data.data) {
        const { data } = response.data;
        const userStatus = data.is_activated;
        set({
          currentUser: userStatus ? data : null,
          userStatus,
          userFirstName: data.first_name,
          userEmail: data.email,
          userRole: data.role,
          loading: false,
        });
      } else {
        console.log("Unexpected response structure");
        set({ loading: false });
      }

      return response.data;
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while fetching user data");
      const errors = error.response.data.message.error;
      console.log(errors);
      for (const field in errors) {
        errors[field].forEach((errorMessage) => {
          toast.error(`${errorMessage}`);
        });
      }
      set({ loading: false });
    }
  },

  login: async ({ ...data }) => {
    set({ loading: true });
    try {
      const response = await AxiosInstance.post("/login", {
        ...data,
      });
      console.log("api ", response.data);
      const userToken = response.data.token;
      localStorage.setItem("token", userToken);

      // get user data through the getUser method
      const userData = await get().getUser();
      if (userData && userData.data.is_activated && userData.data.role) {
        toast.success("Login successful", {
          position: "top-center",
          id: "login-toast",
        });
      } else {
        localStorage.removeItem("token");
        toast.error("Account activation is pending");
        set({ token: null });
      }
      set({ loading: false });

      return response;
    } catch (error) {
      set({ loading: true });
      localStorage.removeItem("token");
      // console.log(error);
      // const unauthorized = error.response.data.message;
      // const generalError = "An error occurred while logging in";
      // toast.error(unauthorized ? unauthorized : generalError);
      set({ token: null, loading: false });
    }
  },

  register: async ({ ...data }) => {
    set({ loading: true });
    try {
      await AxiosInstance.post("/register", {
        ...data,
      });
      // const userToken = response.data.token;
      // localStorage.setItem("token", userToken);
      toast.success("Account created, Please wait for activation", {
        position: "top-center",
      });
      set({ loading: false });
    } catch (error) {
      console.log(error.response);
      set({ loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await AxiosInstance.post("/user/logout");
      // console.log(get().token);
      localStorage.removeItem("token");
      localStorage.removeItem("auth-storage");
      set({
        token: null,
        currentUser: null,
        userStatus: null,
        loading: false,
      });
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error.response);
    }
  },
}));
