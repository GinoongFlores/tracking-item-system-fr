import { create } from "zustand";
import { persist } from "zustand/middleware";
import AxiosInstance from "../api/Axios";
import { toast } from "react-hot-toast";

export const useAuth = create(
  persist(
    (set, get) => ({
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

          set({ token });

          const response = await AxiosInstance.get("user/current", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const userStatus = response.data.data.is_activated;
          set({
            currentUser: userStatus ? response.data.data : null,
            userStatus,
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
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);
