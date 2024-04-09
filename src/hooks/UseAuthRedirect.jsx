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
      navigate("/");
    } else if (!token && location.pathname !== "/register") {
      navigate("/login");
    }
  }, [getUser, token, location.pathname, navigate]);
};
