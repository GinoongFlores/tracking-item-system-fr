import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useAuth } from "./store/StoreAuth";
import { Routes, Route } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

// components
import { SuperAdminLayout, CompanyLayout } from "./layouts";
import { Admin, Users, Home, Items } from "./pages/super_admin";
import Login from "./components/Login";
import Register from "./components/Register";
import {
  AddCompanyPage,
  ViewCompanyPage,
  EditCompanyPage,
} from "./pages/company";

function App() {
  const token = localStorage.getItem("token");
  const loading = useAuth((state) => state.loading);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !token && location.pathname !== "/login") {
      navigate("/login", { replace: true });
    } else if (!loading && location.pathname === "/login" && token) {
      navigate("/", { replace: true });
    }
  }, [location.pathname, navigate, token, loading]); //

  const RequireAuth = ({ children }) => {
    if (!token) {
      return <div>Loading...</div>;
    }
    return children;
  };

  if (loading) {
    return (
      <div className="h-screen bg:dark-gray-9000 dar:text-white flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div>
        <Toaster position="bottom-center" reverseOrder={false} />
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <SuperAdminLayout />
              </RequireAuth>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/items" element={<Items />} />
            <Route path="/users" element={<Users />} />
            <Route path="/admin" element={<Admin />} />
            {/* <Route path="/test-zustand" element={<TestZustand />} /> */}
            <Route path="/company" element={<CompanyLayout />}>
              <Route path="/company" element={<ViewCompanyPage />} />
              <Route path="add" element={<AddCompanyPage />} />
              <Route path="edit" element={<EditCompanyPage />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
