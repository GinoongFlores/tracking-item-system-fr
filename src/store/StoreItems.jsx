import { create } from "zustand";
import { toast } from "react-hot-toast";
import AxiosInstance from "../api/Axios";

export const useItems = create((set) => ({
  itemData: [],
  itemTrashedData: [],
  clearItems: () => set(() => ({ itemData: [], itemTrashedData: [] })),
  totalItems: 0,
  itemAdded: false,
  loading: false,
  setLoading: (loading) => set(() => ({ loading })),

  // paginate
  totalPages: 0,
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),

  addItem: async (values) => {
    set({ loading: true, itemAdded: false });
    try {
      const response = await AxiosInstance.post("item/add", {
        ...values,
      });
      set((state) => ({
        itemData: [...state.itemData, response.data.data],
        itemAdded: true,
        loading: false,
      }));
      toast.success("Item added successfully");
    } catch (error) {
      console.log(error.response);
      set({ loading: false });
      const errors = error.response.data.message.error;
      for (const field in errors) {
        errors[field].forEach((errorMessage) => {
          toast.error(`${errorMessage}`);
        });
      }
    }
  },

  fetchUserItem: async (page = 1) => {
    set({ loading: true });
    try {
      const response = await AxiosInstance.get(`item/list?page${page}`);
      set({
        itemData: response.data.data,
        itemAdded: true,
        totalItems: response.data.data.length,
        loading: false,
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

  filterUserItem: async (search) => {
    set({ loading: true });
    try {
      let response;

      if (search) {
        response = await AxiosInstance.get(
          `/item/list?search=${encodeURIComponent(search)}`
        );
      } else {
        response = await AxiosInstance.get("/item/list");
      }
      set({
        itemData: response.data.data,
        totalPages: response.data.last_page,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      console.log(error.response);
    }
  },

  updateUserItem: async (itemId, values) => {
    set({ loading: true });
    try {
      const response = await AxiosInstance.post(`item/${itemId}/user/update`, {
        ...values,
      });
      set((state) => ({
        itemData: state.itemData.map((item) =>
          item.id === itemId ? response.data.data : item
        ),
        loading: false,
      }));
      toast.success("Item updated successfully");
    } catch (error) {
      // console.log(error.response);
      set({ loading: false });
      const errors = error.response.data.message.error;
      for (const field in errors) {
        errors[field].forEach((errorMessage) => {
          toast.error(`${errorMessage}`);
        });
      }
    }
  },

  fetchTrashedItem: async () => {
    set({ loading: true });
    try {
      const response = await AxiosInstance.get(`item/user/trashed`);
      set({
        itemTrashedData: response.data.data,
        itemAdded: true,
        loading: false,
      });
    } catch (error) {
      console.log(error.response);
      set({ itemAdded: false, loading: true });
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
      set((state) => {
        const deletedItem = state.itemData.find((item) => item.id === itemId);
        return {
          itemData: state.itemData.filter((item) => item.id !== itemId),
          itemTrashedData: [...state.itemTrashedData, deletedItem].filter(
            Boolean
          ),
        };
      });
      toast.success("Item deleted successfully");
      return response;
    } catch (error) {
      console.log(error.response);
    }
  },
}));
