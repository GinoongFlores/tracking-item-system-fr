import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useAuth } from "../store";
import { Routes, Route } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { UserToken } from "./userToken";

export const useAuthRedirect = () => {
  const token = UserToken();
  const loading = useAuth((state) => state.loading);
  const getUser = useAuth((state) => state.getUser);
  const userStatus = useAuth((state) => state.userStatus);
  const location = useLocation();
  const navigate = useNavigate();

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (token) {
      getUser().finally(() => setIsInitialized(true));
    } else {
      setIsInitialized(true);
    }
  }, [getUser, token, userStatus, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      if (!token && location.pathname !== "/register") {
        navigate("/login");
      } else if (!userStatus && location.pathname !== "/register") {
        navigate("/login");
      } else if (token && location.pathname === "/login") {
        navigate("/");
      }
    }
  }, [location.pathname, navigate, loading, token, userStatus, isInitialized]);
};
