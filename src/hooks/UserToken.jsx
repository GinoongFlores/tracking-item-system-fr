import { useAuth } from "../store/StoreAuth";

export const UserToken = () => {
  const userToken = useAuth.getState().token;
  // cosnt userToken = localStorage.getItem("token")
  return userToken;
};
