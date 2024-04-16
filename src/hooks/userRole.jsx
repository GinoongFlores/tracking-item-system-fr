import { useAuth } from "../store";

export const UserRole = () => {
  const userRole = useAuth((state) => state.userRole);
  return userRole;
};
