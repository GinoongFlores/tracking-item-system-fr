import { useAuthContext } from "../context/AuthContext";

export const UserRole = () => {
  const { currentUser } = useAuthContext();
  return currentUser?.role;
};
