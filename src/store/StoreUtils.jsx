import { create } from "zustand";

export const useUtils = create((set) => ({
  isOpen: false,

  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  closeSidebar: () => set({ isOpen: false }),
}));
