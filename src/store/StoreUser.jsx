import { create } from "zustand";
import AxiosInstance from "../api/Axios";
import { toast } from "react-hot-toast";

export const useUser = create((set) => ({
  users: [],
  // pagination
  totalPages: 0,
  search: "",
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  // attach role to user
  selectedRole: "",
  loading: false,

  handleRoleChange: (userId, role) => {
    set({ selectedRole: role });
  },

  attachRole: async (userId, role) => {
    try {
      const response = await AxiosInstance.post(`/user/${userId}/assign-role`, {
        role,
      });
      if (response && response.status === 200) {
        toast.success("Role assigned successfully");
        set((state) => {
          const users = state.users.map((user) =>
            user.id === userId ? { ...user, role: role } : user
          );
          return { users: users, selectedRole: "" };
        });
      } else {
        toast.error("Role assignment failed");
      }
      return response;
    } catch (error) {
      console.log(error.response);
    }
  },

  fetchUsers: async (page = 1) => {
    set({ loading: true });
    try {
      const response = await AxiosInstance.get(`/user/list?page=${page}`);
      console.log(response.data);
      set({
        users: response.data.data,
        loading: false,
      });
      return response;
    } catch (error) {
      set({ loading: false });
      console.log(error);
      const errorMessage = error.response.data.message.error;
      toast.error(
        typeof errorMessage === "object"
          ? JSON.stringify(errorMessage)
          : errorMessage
      );
    }
  },

  filterUsers: async (search) => {
    try {
      let response;

      if (search) {
        response = await AxiosInstance.get(
          `/user/list?search=${encodeURIComponent(search)}`
        );
      } else {
        response = await AxiosInstance.get("/user/list");
      }
      set({
        users: response.data.data,
        totalPages: response.data.last_page,
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
