import { create } from "zustand";
import { toast } from "react-hot-toast";
import { UserToken } from "../hooks/UserToken";
import AxiosInstance from "../api/Axios";

export const useItems = create((set, get) => ({
  itemData: [],
  isEmptyItem: false,

  addItem: async (values) => {
    const token = UserToken();
    try {
      const response = await AxiosInstance.post(
        "item/add",
        {
          ...values,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
    const token = UserToken();
    try {
      const response = await AxiosInstance.get(`item/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

  deleteUserItem: async (itemId) => {
    const token = UserToken();
    try {
      const response = await AxiosInstance.delete(`item/${itemId}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ itemData: get().itemData.filter((item) => item.id !== itemId) });
      toast.success("Item deleted successfully");
      return response;
    } catch (error) {
      console.log(error.response);
    }
  },
}));
