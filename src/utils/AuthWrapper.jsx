import { useAuth } from "../store";
import PulseLoader from "react-spinners/PulseLoader";
import { UserToken } from "../hooks/userToken";

export const AuthWrapper = ({ children }) => {
  // const { getUser, userStatus, loading } = useAuth();
  const token = UserToken();
  const loading = useAuth((state) => state.loading);
  // const token = localStorage.getItem("token");

  if (loading || !token) {
    return (
      <div className="h-screen bg:dark-gray-9000 dar:text-white flex justify-center items-center">
        <PulseLoader
          color="#2563EB"
          loading={true}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return children;
};
