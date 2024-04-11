import { create } from "zustand";
import { toast } from "react-hot-toast";
import AxiosInstance from "../api/Axios";

export const useItems = create((set, get) => ({
  itemData: [],
  itemTrashedData: [],
  isEmptyItem: false,

  addItem: async (values) => {
    try {
      const response = await AxiosInstance.post("item/add", {
        ...values,
      });
      set({ itemData: [...get().itemData, response.data.data] });
      toast.success("Item added successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message.error, {
        position: "top-center",
      });
    }
  },

  fetchUserItem: async () => {
    try {
      const response = await AxiosInstance.get(`item/user`);
      set({ itemData: response.data.data, isEmptyItem: false });
    } catch (error) {
      if (error.response.status) {
        set({ isEmptyItem: true });
        toast.error("No items yet on this user.", {
          id: "no-item",
        });
      }
    }
  },

  fetchTrashedItem: async () => {
    try {
      const response = await AxiosInstance.get(`item/user/trashed`);
      set({ itemTrashedData: response.data.data, isEmptyItem: false });
    } catch (error) {
      console.log(error.response);
      set({ isEmpty: true });
    }
  },

  restoreUserTrashedItem: async (itemId) => {
    try {
      const response = await AxiosInstance.post(`item/${itemId}/user/restore`);
      set({
        itemTrashedData: get().itemTrashedData.filter(
          (item) => item.id !== itemId
        ),
        itemData: [...get().itemData, response.data.data],
      });
      toast.success("Item restored successfully");
      return response;
    } catch (error) {
      console.log(error.response);
    }
  },

  deleteUserItem: async (itemId) => {
    try {
      const response = await AxiosInstance.delete(`item/${itemId}/delete`);
      set({ itemData: get().itemData.filter((item) => item.id !== itemId) });
      toast.success("Item deleted successfully");
      return response;
    } catch (error) {
      console.log(error.response);
    }
  },
}));
