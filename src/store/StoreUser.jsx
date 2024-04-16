import { create } from "zustand";
import AxiosInstance from "../api/Axios";
import { toast } from "react-hot-toast";
import { UserToken } from "../hooks/userToken";

export const useUser = create((set, get) => ({
  users: [],
  totalPages: 0,
  search: "",
  currentPage: 1,
  // attach role to user
  selectedRole: "",
  handleRoleChange: (event) => {
    set({ selectedRole: event.target.value });
  },
  submitRole: async (userId, role) => {
    const response = await get().attachRole(userId, role);
    console.log(response);

    if (response.status === 200) {
      toast.success("Role assigned successfully");
    } else {
      toast.error("Role assignment failed");
    }
  },

  fetchUsers: async (page = 1) => {
    // console.log("fetchUser ", token);
    try {
      const response = await AxiosInstance.get(`/user/list?page=${page}`);
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

  attachRole: async (userId, role) => {
    try {
      const response = await AxiosInstance.post(`/user/${userId}/assign-role`, {
        role,
      });
      return response;
    } catch (error) {
      console.log(error.response);
    }
  },

  toggleActivation: async (userId) => {
    try {
      const response = await AxiosInstance.post(`/user/${userId}/activation`);
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

  filterUsers: async (search) => {
    try {
      const response = await AxiosInstance.get(
        `/user/list?search=${encodeURIComponent(search)}`
      );
      set({
        users: response.data.data,
        totalPages: response.data.last_page,
      });
      return response;
    } catch (error) {
      console.log(error.response);
      set({ loading: false });
    }
    // return get().users.filter(
    //   (user) =>
    //     user.first_name.toLowerCase().includes(search.toLowerCase()) ||
    //     user.last_name.toLowerCase().includes(search.toLowerCase())
    // );
  },
}));
