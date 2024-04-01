import { create } from "zustand";
import AxiosInstance from "../api/Axios";
import { toast } from "react-hot-toast";
import { UserToken } from "../hooks/UserToken";

export const useUser = create((set, get) => ({
  users: [],
  totalPages: 0,
  search: "",
  currentPage: 1,

  fetchUsers: async (page = 1) => {
    const token = UserToken();
    // console.log("fetchUser ", token);
    try {
      const response = await AxiosInstance.get(`/user/list?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ users: response.data.data, totalPages: response.data.last_page });
      return response;
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

  toggleActivation: async (userId) => {
    const token = UserToken();
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
      activation
        ? toast.success("User activated")
        : toast.error("User deactivated");
      return response;
    } catch (error) {
      console.log(error.response);
    }
  },

  handleToggleActivation: async (userId) => {
    const response = await get().toggleActivation(userId);

    if (response.status === 200) {
      set({
        users: get().users.map((user) =>
          user.id === userId
            ? {
                ...user,
                is_activated: +!user.is_activated,
              }
            : user
        ),
      });
    }
  },

  handleSearch: (search) => {
    set({ search });
  },

  setCurrentPage: (page) => {
    set({ currentPage: page });
  },

  filterUsers: (search) => {
    return get().users.filter(
      (user) =>
        user.first_name.toLowerCase().includes(search.toLowerCase()) ||
        user.last_name.toLowerCase().includes(search.toLowerCase())
    );
  },
}));
