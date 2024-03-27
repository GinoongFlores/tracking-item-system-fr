import { useState, useEffect, useCallback } from "react";
import { useContext, createContext } from "react";
import AxiosInstance from "../api/Axios";
import { toast } from "react-hot-toast";
import { useAuthContext } from "./AuthContext";
import { UserRole } from "../hooks/UserRole";

// create a context
const CompanyContext = createContext();

// create a provider for the context

export const CompanyProvider = ({ children }) => {
  const { token } = useAuthContext();
  const [companies, setCompanies] = useState([]);

  const userRole = UserRole();
  // console.log(userRole);

  const fetchCompany = useCallback(async () => {
    let response;
    try {
      // check if the data is in local storage
      const cacheData = localStorage.getItem("companies");
      if (cacheData) {
        // if the data is in local storage, use it
        setCompanies(JSON.parse(cacheData));
      } else {
        response = await AxiosInstance.get("/company", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        localStorage.setItem("companies", JSON.stringify(response.data.data));
        setCompanies(response.data.data);
      }

      if (response) {
        return response;
      }

      // console.log(response.data.data);
      // return response;
    } catch (error) {
      const errorMessage = error.response.data.message.error;
      toast.error(
        typeof errorMessage === "object"
          ? JSON.stringify(errorMessage)
          : errorMessage
      );
      // console.log(error);
    }
  }, [token]);

  const addCompany = async (values) => {
    try {
      const response = await AxiosInstance.post(
        "/company",
        {
          ...values,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (token) {
        toast.success(response.data.message, {
          position: "top-center",
        });
      }
      return response;
    } catch (error) {
      // console.log("add company error: ", error.response.data.message.error);
      toast.error(error.response.data.message.error, {
        position: "top-center",
      });
    }
  };

  const deleteCompany = async (id) => {
    try {
      const response = await AxiosInstance.delete(`/company/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <CompanyContext.Provider
      value={{ addCompany, deleteCompany, fetchCompany, companies }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

// create a custom hook to use the context
export const useCompanyContext = () => useContext(CompanyContext);
