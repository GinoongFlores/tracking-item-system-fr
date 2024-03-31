import { useAuthContext } from "../context/AuthContext";

export const UserToken = () => {
  const { token } = useAuthContext();
  return token;
};
