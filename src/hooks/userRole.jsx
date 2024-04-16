import { useAuth } from "../store/StoreAuth";

export const UserRole = () => {
  const userRole = useAuth((state) => state.userRole);
  return userRole;
};
