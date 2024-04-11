import { create } from "zustand";
import { toast } from "react-hot-toast";
import AxiosInstance from "../api/Axios";

export const useItems = create((set, get) => ({
  itemData: [],
  itemTrashedData: [],
  itemAdded: false,

  addItem: async (values) => {
    try {
      const response = await AxiosInstance.post("item/add", {
        ...values,
      });
      set({
        itemData: [...get().itemData, response.data.data],
        itemAdded: true,
      });
      toast.success("Item added successfully");
    } catch (error) {
      console.log(error.response);
      // toast.error(error.response.data.message.error, {
      //   position: "top-center",
      // });
    }
  },

  fetchUserItem: async () => {
    try {
      const response = await AxiosInstance.get(`item/user`);
      set({
        itemData: response.data.data,
        itemAdded: true,
      });
    } catch (error) {
      if (error.response.status) {
        set({ itemAdded: false });
        toast.error("No items yet on this user.", {
          id: "no-item",
        });
      }
    }
  },

  fetchTrashedItem: async () => {
    try {
      const response = await AxiosInstance.get(`item/user/trashed`);
      set({ itemTrashedData: response.data.data, itemAdded: true });
    } catch (error) {
      console.log(error.response);
      set({ itemAdded: false });
    }
  },

  restoreUserTrashedItem: async (itemId) => {
    try {
      const response = await AxiosInstance.post(`item/${itemId}/user/restore`);
      set((state) => {
        const restoredItem = state.itemTrashedData.find(
          (item) => item.id === itemId
        );
        return {
          itemData: [...state.itemData, restoredItem].filter(Boolean),
          itemTrashedData: state.itemTrashedData.filter(
            (item) => item.id !== itemId
          ),
        };
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
