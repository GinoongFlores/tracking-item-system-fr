import { create } from "zustand";
import AxiosInstance from "../api/Axios";
import { toast } from "react-hot-toast";

export const useAdmin = create((set) => ({
  users: [],
  loading: false,
  // paginate & search
  search: "",
  totalPages: 0,
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),

  fetchUsers: async (page = 1) => {
    set({ loading: true });
    try {
      const response = await AxiosInstance.get(`/user/admin/list?page=${page}`);

      set({
        users: response.data.data,
        totalPages: response.data.last_page,
        loading: false,
      });
      return response;
    } catch (error) {
      set({ loading: false });
      console.log(error);
    }
  },

  filterUsers: async (search) => {
    try {
      let response;

      if (search) {
        response = await AxiosInstance.get(
          `/user/admin/list?search=${encodeURIComponent(search)}`
        );
        console.log("filter user ", response.data.data);
      } else {
        response = await AxiosInstance.get("/user/admin/list");
      }
      set({
        users: response.data.data,
        totalPages: response.data.last_page,
      });
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
