import { create } from "zustand";
import AxiosInstance from "../api/Axios";
import { toast } from "react-hot-toast";

export const useCompany = create((set, get) => ({
  companies: [],
  fetchCompany: async (token) => {
    try {
      const response = await AxiosInstance.get("/company/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ companies: response.data.data });
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

  addCompany: async (values, token) => {
    try {
      const response = await AxiosInstance.post(
        "/company/add",
        {
          ...values,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ companies: [...get().companies, response.data.data] });
      toast.success("Company added successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.message.error, {
        position: "top-center",
      });
    }
  },

  deleteCompany: async (id, token) => {
    try {
      await AxiosInstance.delete(`/company/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // after deleting a company, update the companies list
      set({
        companies: get().companies.filter((company) => company.id !== id),
      });
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.message.error, {
        position: "top-center",
      });
    }
  },
}));

// export const useAddCompany = create((set) => ({
//   addCompany: async (values, token) => {
//     try {
//       const response = await AxiosInstance.post(
//         "/company/add",
//         {
//           ...values,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       toast.success(response.data.message, {
//         position: "top-center",
//       });
//     } catch (error) {
//       toast.error(error.response.data.message.error, {
//         position: "top-center",
//       });
//     }
//   },
// }));
