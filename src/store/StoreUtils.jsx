import { create } from "zustand";
import AxiosInstance from "../api/Axios";

export const useUtils = create((set) => ({
  isOpen: false,
  filteredNames: [],
  setFilteredNames: (names) => set({ filteredNames: names }),

  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  closeSidebar: () => set({ isOpen: false }),
  searchUser: async (value) => {
    if (value !== "") {
      try {
        const response = await AxiosInstance.get(`/user/search?query=${value}`);
        set({ filteredNames: response.data.data.slice(0, 5) });
      } catch (error) {
        console.log(error);
      }
    } else {
      set({ filteredNames: [] });
    }
  },
}));
