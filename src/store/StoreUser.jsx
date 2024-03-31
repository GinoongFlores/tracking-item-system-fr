import { create } from "zustand";
import AxiosInstance from "../api/Axios";
import { toast } from "react-hot-toast";

export const useUser = create((set, get) => ({
  users: [],
  fetchUsers: async (token) => {
    try {
      const response = await AxiosInstance.get("/user/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ users: response.data.data });
    } catch (error) {
      console.log(error);
      const errorMessage = error.response.data.message.error;
      toast.error(
        typeof errorMessage === "object"
          ? JSON.stringify(errorMessage)
          : errorMessage
      );
    }
  },
}));
