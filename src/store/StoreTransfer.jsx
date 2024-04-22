import { create } from "zustand";
import AxiosInstance from "../api/Axios";
import { toast } from "react-hot-toast";

export const useTransfer = create((set) => ({
  transferItems: [],

  transferItem: async (data) => {
    try {
      const response = await AxiosInstance.post("/item/transfer", data);
      set((state) => ({
        transferItems: [...state.transferItems, response.data.data],
      }));
      toast.success("Item is pending for transfer");
    } catch (error) {
      //   console.log("Failed to transfer items: ", error);
      const errorMessage = error.response.data.message.error;
      toast.error(`${errorMessage}`);
    }
  },
}));
