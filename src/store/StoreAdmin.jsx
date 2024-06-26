import { create } from "zustand";
import AxiosInstance from "../api/Axios";
import { toast } from "react-hot-toast";

export const useAdmin = create((set, get) => ({
  users: [],
  totalPages: 0,
  currentPage: 0,
  search: "",

  fetchUsers: async (page = 1) => {
    try {
      const response = await AxiosInstance.get(`/user/admin/list?page=${page}`);
      set({ users: response.data.data, totalPages: response.data.last_page });
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  toggleActivation: async (userId) => {
    try {
      const response = await AxiosInstance.post(`/user/${userId}/activation`);
      const activation = response.data.data.is_activated;
      activation
        ? toast.success("User activated")
        : toast.error("User deactivated");

      // update user in users array
      set((state) => ({
        users: state.users.map((user) =>
          user.id === userId
            ? {
                ...user,
                is_activated: activation,
              }
            : user
        ),
      }));
      return response;
    } catch (error) {
      console.log(error.response);
    }
  },
}));
