import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useAuth } from "../store/StoreAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { UserToken } from "./UserToken";

export const UseAuthRedirect = () => {
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
    if (!token && location.pathname !== "/register") {
      navigate("/login");
    }
  }, [location.pathname, navigate, loading, token]);

  useEffect(() => {
    if (token && location.pathname === "/login") {
      navigate("/");
    }
  });
};
