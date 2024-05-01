import { create } from "zustand";
import AxiosInstance from "../api/Axios";
import { toast } from "react-hot-toast";

export const useCompany = create((set) => ({
  companies: [],
  totalPages: 0,
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  search: "",
  loading: false,
  // skeletonLoading: false,

  fetchCompany: async (page = 1) => {
    set({ loading: true });
    try {
      const response = await AxiosInstance.get(`/company/list?page=${page}`);
      set({
        companies: response.data.data,
        loading: false,
      });
    } catch (error) {
      console.log(error);
      set({ loading: false });
      const errorMessage = error.response.data.message.error;
      toast.error(
        typeof errorMessage === "object"
          ? JSON.stringify(errorMessage)
          : errorMessage
      );
    }
  },

  filterCompany: async (search) => {
    // set({ loading: true });
    try {
      let response;

      if (search) {
        response = await AxiosInstance.get(
          `/company/list?search=${encodeURIComponent(search)}`
        );
      } else {
        response = await AxiosInstance.get("/company/list"); // fetch all companies
      }
      set({
        companies: response.data.data,
        totalPages: response.data.last_page,
        // loading: false,
      });
    } catch (error) {
      // set({ loading: false });
      console.log(error.response);
    }
  },

  addCompany: async (values) => {
    try {
      const response = await AxiosInstance.post("/company/add", {
        ...values,
      });
      set((state) => ({
        companies: [...state.companies, response.data.data],
      }));
      toast.success("Company added successfully", {
        position: "top-center",
      });
    } catch (error) {
      const errors = error.response.data.message.error;
      for (const field in errors) {
        errors[field].forEach((errorMessage) => {
          toast.error(`${errorMessage}`);
        });
      }
    }
  },

  deleteCompany: async (id) => {
    try {
      await AxiosInstance.delete(`/company/${id}`, {});

      set((state) => ({
        companies: [...state.companies.filter((company) => company.id !== id)],
      }));
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.message.error, {
        position: "top-center",
      });
    }
  },
}));
