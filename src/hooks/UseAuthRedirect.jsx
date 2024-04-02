import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useAuth } from "../store/StoreAuth";
import { Routes, Route } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { UserToken } from "./UserToken";

export const useAuthRedirect = () => {
  const token = UserToken();
  const loading = useAuth((state) => state.loading);
  const getUser = useAuth((state) => state.getUser);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [getUser, token]);

  useEffect(() => {
    if (!loading && token) {
      navigate("/", { replace: true });
    } else if (!token && location.pathname !== "/register") {
      navigate("/login");
    }
  }, [location.pathname, navigate, loading, token]);
};
