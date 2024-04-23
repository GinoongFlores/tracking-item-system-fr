import { useAuth } from "../store";
import { UserToken } from "../hooks/userToken";
import { Loader } from "./Loader";

export const AuthWrapper = ({ children }) => {
  // const { getUser, userStatus, loading } = useAuth();
  const token = UserToken();
  const loading = useAuth((state) => state.loading);
  // const token = localStorage.getItem("token");

  if (loading || !token) {
    return <Loader />;
  }

  return children;
};
